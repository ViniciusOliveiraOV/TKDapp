# TKDapp: demo de uma escola de Taekwondo

App Expo/React Native em português para apresentar técnicas e poomsae ao mestre e validar um serviço mensal de cerca de R$200. O preço é uma proposta comercial; não há cobrança dentro do app.

## Estado atual

- 15 técnicas em cinco categorias, cada uma com vídeo demonstrativo público identificado por título e canal. Há busca, detalhes e abertura no YouTube quando o vídeo incorporado falha.
- Oito Taegeuk e nove poomsae Dan com demonstrações públicas do Kukkiwon.
- Tabela de faixas e zonas etárias de **competição Kyorugui CBTKD 2026**. A idade considera 2026 menos o ano de nascimento; algumas zonas se sobrepõem. A tabela oficial não define o currículo de aulas do mestre.
- Com Supabase configurado: cadastro e login por e-mail, convite para uma escola, perfil privado do praticante e favoritos por conta. Para menores, o adulto responsável usa a própria conta e confirma essa condição no perfil.
- Sem Supabase configurado: catálogo de prévia rotulado; login, perfil e favoritos privados ficam indisponíveis.

O mapeamento das técnicas e poomsae por idade e graduação aguarda o currículo do mestre. Os vídeos públicos são provisórios e precisam da revisão dele. Não use dados reais de menores antes de revisar o aviso de privacidade e o fluxo do responsável.

## Rodar a prévia

Requer Node 20 ou mais e Expo Go ou um emulador Android/iOS.

```bash
npm ci
npm start
```

## Ativar contas para o piloto

1. Crie um projeto Supabase, habilite autenticação por e-mail e configure confirmação de e-mail. Guarde a chave **publishable**; nunca coloque uma chave `service_role` no app.
2. Aplique [a migração SQL](supabase/migrations/202611090001_pilot.sql) no projeto. Ela cria escolas, vínculos, perfis e favoritos, com políticas de acesso por usuário e uma função para validar convites.
3. Gere um código de convite aleatório de pelo menos 24 bytes, por exemplo com `openssl rand -hex 24`. No SQL Editor do Supabase, crie a escola com o hash do código:

   ```sql
   insert into public.schools (name, invite_hash)
   values ('Nome da escola', encode(sha256(convert_to('COLE_O_CODIGO_AQUI', 'UTF8')), 'hex'));
   ```

   Entregue o código apenas ao mestre. O código em texto não fica no banco nem no app.
4. Copie `.env.example` para `.env` e preencha `EXPO_PUBLIC_SUPABASE_URL` e `EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY`. Reinicie o Expo. Esses valores são públicos por definição; o convite e chaves administrativas continuam privados.
5. Use contas fictícias no primeiro teste: crie uma conta, confirme o e-mail, entre, informe o convite, complete o perfil e salve um favorito. Teste uma segunda conta para conferir o isolamento de dados.

Este repositório ainda não tem projeto Supabase conectado, pacote de loja assinado, plano de cobrança, política de privacidade aprovada ou teste em dispositivo físico. A migração foi exercitada em PostgreSQL local; a integração real com Supabase precisa ser validada quando houver credenciais.

Uma auditoria de dependências de produção após atualizações compatíveis ainda apontou **2 avisos altos** em ferramentas transitivas (`image-size` e `postcss`); a correção automática restante pede atualização grande do Expo. Revisar isso antes de uma publicação ampla.

## Verificação

```bash
npm test
npm run test:ui
npx tsc --noEmit
npx expo export --platform android
```

## Fontes de conteúdo

- [Regulamento Técnico Nacional de Kyorugui CBTKD 2026](https://firebasestorage.googleapis.com/v0/b/sg-cbtkd.appspot.com/o/anexos%2F7a10ead6-187d-09f8-0e47-d8249b1e1cf1.pdf?alt=media&token=6ea84381-d72d-4da4-aa2c-163bd353329b): idades e cores de faixa.
- [Lista de demonstrações do Kukkiwon reunida pela British Taekwondo](https://www.britishtaekwondo.org.uk/taekwondo-poomsae-demonstration-videos-from-the-kukkiwon-world-taekwondo-headquarters/) e [lista complementar](https://jno-tkd.com/kukkiwon-poomsae): referências de poomsae. A primeira lista repete o link do 6º Taegeuk no 7º; o app usa um link separado, verificado no canal do Kukkiwon.
- Os IDs, títulos e canais dos vídeos estão em [videoSources.ts](src/data/videoSources.ts); substitua cada vídeo quando o mestre enviar e aprovar sua gravação.

## Próximas decisões com o mestre

1. Entregar a matriz **zona etária × graduação × técnicas/poomsae** e revisar os nomes e instruções existentes.
2. Enviar os vídeos próprios de chutes, socos, bloqueios, posturas, defesas, técnicas especiais e poomsae, indicando a técnica exata de cada arquivo.
3. Confirmar nome da escola, convite, identidade visual, texto de privacidade e condições do serviço de R$200/mês.
