This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Sessão de autenticação pelo BFF

O navegador chama somente rotas same-origin `/api/...`. O cookie de sessão chama-se `moveplus_session`; é host-only na origem Next (sem `Domain`), `Path=/`, `HttpOnly`, `SameSite=Lax`, dura 15 minutos e recebe `Secure` em produção. O JavaScript não lê o cookie nem recebe o JWT. O BFF remove os cookies e `Authorization` recebidos e encaminha ao backend somente `Cookie: moveplus_session=<JWT>`; respostas `Set-Cookie` do backend, inclusive a expiração no logout, são repassadas ao navegador.

Contrato do frontend:

- `POST /api/users/login` com `{ "identifier": "email", "password": "..." }` retorna `200` com `{ "user": { "name": "...", "email": "..." } }` e define o cookie. A resposta não contém `id`, `role` ou token.
- `GET /api/auth/me` retorna o perfil autenticado: `{ "name": "...", "email": "...", "phone": "...", "cpf": "...", "createdAt": "...", "capabilities": { "manageAdmin": false } }`. O perfil e a capacidade são derivados do JWT validado; `manageAdmin` serve apenas para exibição e não autoriza operações.
- `POST /api/auth/logout` retorna `{ "success": true }`, revoga a sessão no backend e expira o cookie.
- `PATCH /api/users/me` atualiza o perfil próprio com `name`, `email` e/ou `phone`.
- Chamadas protegidas usam a mesma origem `/api/...`; o BFF encaminha o cookie e o backend valida sessão e permissões em cada operação.

O `AuthContext` hidrata a sessão por `/api/auth/me`; não armazene JWT nem trate dados locais como autorização. Para validar o fluxo do proxy via servidor Next e upstream HTTP de contrato, execute `npm run test:auth-proxy`.
