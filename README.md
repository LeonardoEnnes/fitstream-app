[![React](https://img.shields.io/badge/React-19-61DAFB.svg?logo=react&logoColor=white)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-7-646CFF.svg?logo=vite&logoColor=white)](https://vite.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6.svg?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4.svg?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Vitest](https://img.shields.io/badge/Vitest-Enabled-6E9F18.svg?logo=vitest&logoColor=white)](https://vitest.dev/)
[![ESLint](https://img.shields.io/badge/ESLint-Enabled-4B32C3.svg?logo=eslint&logoColor=white)](https://eslint.org/)
[![Prettier](https://img.shields.io/badge/Prettier-Enabled-F7B93E.svg?logo=prettier&logoColor=white)](https://prettier.io/)
[![CI](https://img.shields.io/badge/CI-GitHub_Actions-2088FF.svg?logo=githubactions&logoColor=white)](https://github.com/)

### FitStream - Real-Time Fitness & Nutrition Dashboard

FitStream é uma aplicação web de monitoramento de fitness e nutrição em tempo real.

O front-end consome dados via REST e recebe atualizações instantâneas de eventos através de Server-Sent Events (SSE), integrados a uma arquitetura orientada a eventos no back-end.

---
### 🎥 Demonstração

![Demonstração da Aplicação](./src/app/assets/Demo.gif)

---
### 🛠️ Tecnologias Utilizadas

- **Core:** React, Vite, TypeScript
- **Estilização:** Tailwind CSS, Shadcn, Radix/Base UI, Lucide Icons
- **Gráficos e Visualização:** Recharts
- **Gerenciamento de Estado & Formulários:** React Hook Form, Zod
- **Comunicação em Tempo Real:** Server-Sent Events (SSE)
- **Testes:** Vitest, JSDOM, React Testing Library
- **Qualidade de Código:** ESLint, Prettier
- **CI/CD:** GitHub Actions

### Backend & Frontend

Este repositório contém exclusivamente o Front-end da aplicação.

[Repostiorio do Backend](https://github.com/LeonardoEnnes/fitstream-api) 

### 🚀 Como Acessar e Executar a Aplicação Localmente

### 📋 Pré-requisitos

- Node.js (versão 20 ou superior recomendada)
- pnpm

---
### 🔧 Passo a Passo

**1. Instale as dependências:**

```bash
pnpm install
```

**2. Inicie o servidor de desenvolvimento:**

```bash
pnpm dev
```

**3. Acesse a aplicação através de:**

```text
http://localhost:5173
```

### Comandos Úteis da CLI

**Rodar os testes unitários:**

```bash
pnpm test
```

**Validar tipos e gerar o build de produção:**

```bash
pnpm build
```

**Executar o linter:**

```bash
pnpm lint
```