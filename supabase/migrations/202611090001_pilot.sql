-- One-school pilot. Apply with Supabase migrations, then insert one school as
-- described in README.md. Never put the invite code or service-role key in Expo.
create table if not exists public.schools (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 1 and 120),
  invite_hash text not null unique check (char_length(invite_hash) = 64)
);

create table if not exists public.school_memberships (
  user_id uuid primary key references auth.users(id) on delete cascade,
  school_id uuid not null references public.schools(id) on delete cascade,
  joined_at timestamptz not null default now()
);

create table if not exists public.profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null check (char_length(trim(display_name)) between 1 and 80),
  birth_year integer not null check (birth_year between 1900 and extract(year from current_date)::integer),
  rank_code text not null check (rank_code ~ '^(gub|dan)-(10|[1-9])$'),
  guardian_confirmed boolean not null default false,
  updated_at timestamptz not null default now(),
  constraint guardian_for_minor check (
    extract(year from current_date)::integer - birth_year >= 18 or guardian_confirmed
  )
);

create table if not exists public.favorites (
  user_id uuid not null references auth.users(id) on delete cascade,
  movement_id text not null check (char_length(movement_id) between 1 and 80),
  primary key (user_id, movement_id)
);

alter table public.schools enable row level security;
alter table public.school_memberships enable row level security;
alter table public.profiles enable row level security;
alter table public.favorites enable row level security;

revoke all on public.schools from anon, authenticated;
grant select on public.school_memberships to authenticated;
grant select, insert, update on public.profiles to authenticated;
grant select, insert, delete on public.favorites to authenticated;

create policy "members read own membership" on public.school_memberships
  for select to authenticated using (user_id = (select auth.uid()));

create policy "members read own profile" on public.profiles
  for select to authenticated using (user_id = (select auth.uid()));
create policy "members insert own profile" on public.profiles
  for insert to authenticated with check (
    user_id = (select auth.uid()) and exists (
      select 1 from public.school_memberships m where m.user_id = (select auth.uid())
    )
  );
create policy "members update own profile" on public.profiles
  for update to authenticated using (user_id = (select auth.uid()))
  with check (
    user_id = (select auth.uid()) and exists (
      select 1 from public.school_memberships m where m.user_id = (select auth.uid())
    )
  );

create policy "members read own favorites" on public.favorites
  for select to authenticated using (user_id = (select auth.uid()));
create policy "members insert own favorites" on public.favorites
  for insert to authenticated with check (
    user_id = (select auth.uid()) and exists (
      select 1 from public.school_memberships m where m.user_id = (select auth.uid())
    )
  );
create policy "members delete own favorites" on public.favorites
  for delete to authenticated using (user_id = (select auth.uid()));

create or replace function public.join_school(invite_code text)
returns uuid
language plpgsql
security definer
set search_path = ''
as $$
declare selected_school_id uuid;
begin
  if (select auth.uid()) is null then
    raise exception 'Sign in first';
  end if;
  select s.id into selected_school_id from public.schools s
  where s.invite_hash = encode(sha256(convert_to(trim(invite_code), 'UTF8')), 'hex');
  if selected_school_id is null then
    raise exception 'Invalid invite code';
  end if;
  insert into public.school_memberships (user_id, school_id)
  values ((select auth.uid()), selected_school_id)
  on conflict (user_id) do update set school_id = excluded.school_id;
  return selected_school_id;
end;
$$;

revoke all on function public.join_school(text) from public;
revoke all on function public.join_school(text) from anon;
grant execute on function public.join_school(text) to authenticated;
