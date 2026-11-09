# TKDapp paid demo design

## Intent

Turn the existing Expo catalog into a usable, one-school Taekwondo learning product that the instructor can evaluate for a roughly R$200/month service arrangement. Students should see content relevant to their age and current graduation, save their own preferences, and return to a private profile. Public demonstration videos fill the content gap until the instructor supplies and approves his own recordings.

## Chosen approach

Keep the React Native/Expo app and use Supabase Auth plus Postgres for accounts and private profile data. The app remains a static, versioned catalog for the first school; a content management system and in-app billing would add maintenance work without helping this pilot. Firebase was considered, but Supabase's SQL schema and row-level security make one-school ownership and per-user records explicit. A device-only login was rejected because it cannot give students independent accounts across devices.

## Scope for the first pilot

- One school and an invite code. People register with email and password, confirm their email using Supabase's built-in flow, enter the school's invite code, and then complete a profile. A server-side join operation checks the code; it is never embedded in the app.
- Adult practitioners own their accounts. A guardian owns an account for a practitioner under 18; the child's profile holds only display name, birth year, graduation, and a guardian declaration. Language and theme remain device settings. No public student directory, chat, media uploads, weight, gender, or exact birth date. The guardian flow and privacy text require review before real minors are onboarded.
- Profile and favorites are stored per authenticated account with row-level security. Every read and write is scoped to that account. Local favorites from the old prototype must not leak between accounts.
- The catalog shows age-zone and graduation reference navigation. Age is calculated using 2026 minus birth year, per the CBTKD 2026 Kyorugui regulation. Official divisions overlap at age 17 and for adults/Masters, so the UI may show more than one eligible competition division. These divisions describe competition eligibility, not a teaching curriculum. Content filtering by zone/rank awaits instructor mapping.
- The graduation selector uses the 2026 CBTKD belt chart: 10º Gub white, 9º grey, 8º yellow, 7º orange, 6º green, 5º dark green, 4º light blue, 3º dark blue, 2º red, 1º dark red, then Dan black. Store the numeric rank as the source of truth. Do not present the prototype's technique-to-belt tags as CBTKD requirements.
- The catalog retains the 15 existing techniques and adds a poomsae section with the eight Taegeuk and the nine black-belt forms as reference demonstrations. Every video gets a source, title, publisher, demo status, and a replaceable YouTube ID. It is labeled as a public demo, not the school's approved technique curriculum.
- Video embeds keep YouTube attribution and controls. No download or offline caching of third-party videos. A fallback opens the video on YouTube if the embed fails.
- Navigation and favorites defects already identified in the prototype are corrected as part of the pilot. Portuguese is the default app language; existing English UI stays available, but technique prose is not claimed to be translated.

## Explicit boundaries

- The instructor remains responsible for deciding which movements and poomsae belong to each age and graduation at his school. The app does not infer that mapping from competition rules or from the prototype's arbitrary belt labels.
- The monthly charge is a service agreement outside the app. There is no payment gateway or recurring subscription implementation in this pilot.
- No instructor dashboard, promotion workflow, grading exam, progress scoring, or multi-school tenancy in the pilot. Catalog updates can be shipped as app content changes while the school is small.
- Production onboarding of minors waits for a reviewed guardian process and privacy notice. A demo may use fictional profiles.

## Technical shape

- Domain functions for year-based age eligibility, numeric belt catalog, profile validation, and pilot-stage selection are pure and tested with Node's built-in test runner. Content filtering awaits the school curriculum.
- React components consume those functions and keep screen state separate from Supabase calls.
- A small auth/profile repository wraps Supabase. The database owns invite validation and per-user authorization; the client key is publishable, while service-role credentials never enter the app.
- SQL migrations define `schools`, `school_memberships`, `profiles`, and `favorites` with row-level security. One school is seeded administratively after the Supabase project exists.
- The app shows a clearly labeled catalog demo when Supabase environment variables are absent, so the code remains reviewable without claiming that local demo mode is a real account.

## Acceptance criteria

1. The app compiles and exports an Android bundle; navigation and account state produce no TypeScript errors.
2. Age eligibility reflects CBTKD 2026 calendar-year rules and explicitly handles overlapping divisions.
3. The 2026 Gub color sequence is exact, and no unsupported technique-to-belt requirement is shown as official.
4. Every catalog item has at least one identified, directly relevant public video or an explicit awaiting-video state; the poomsae section uses attributable Kukkiwon reference videos.
5. The code and migration support email sign-up/sign-in, school invitation, isolated profiles/favorites, and sign-out. A second-account security test in a live Supabase project remains required before onboarding.
6. Without Supabase credentials, the UI labels account features unavailable and never pretends to authenticate.
7. Tests cover age boundaries, graduation data, content linkage, and authentication/profile contracts; a mobile bundle and typecheck run after the final edits.

## Sources and review limits

- [CBTKD 2026 National Competition Technical Regulation](https://firebasestorage.googleapis.com/v0/b/sg-cbtkd.appspot.com/o/anexos%2F7a10ead6-187d-09f8-0e47-d8249b1e1cf1.pdf?alt=media&token=6ea84381-d72d-4da4-aa2c-163bd353329b): calendar-year age calculation, age divisions, and the belt-color chart. It governs competition; it is not a lesson plan.
- [CBTKD General Belt Examination Regulation](https://fetesp.com.br/wp-content/uploads/2024/07/CBTKD_Regulamento-de-Exame-de-Faixa.pdf): examination authority and Gub/Dan context. Its date is older than the 2026 competition regulation.
- [British Taekwondo's Kukkiwon video list](https://www.britishtaekwondo.org.uk/taekwondo-poomsae-demonstration-videos-from-the-kukkiwon-world-taekwondo-headquarters/): official-form reference links. The page repeats the Taegeuk 6 link for Taegeuk 7; the latter needs a separately checked link.
- [Supabase React Native Auth guide](https://supabase.com/docs/guides/auth/quickstarts/react-native) and [RLS guide](https://supabase.com/docs/guides/database/postgres/row-level-security): mobile auth/session and per-row authorization patterns.
- [ANPD guidance on children's data](https://www.gov.br/anpd/pt-br/assuntos/noticias/anpd-divulga-enunciado-sobre-o-tratamento-de-dados-pessoais-de-criancas-e-adolescentes) and [YouTube embedding guidance](https://support.google.com/youtube/answer/171780?hl=en): the guardian and video experience need review before a live child-facing release.

## Open content dependency

The instructor still needs to provide his school-specific curriculum and videos. Until then, school-specific age/belt recommendations remain pending and are not represented as CBTKD mandates.
