# 🧭 Desafio 01 — Interface de Talentos

Projeto: **Leapy Talents**

Interface de listagem, busca e filtragem de talentos construída em Next.js + TypeScript + Tailwind, consumindo dados do Directus + PostgreSQL via Docker. O objetivo é oferecer uma experiência completa de busca, filtros e paginação sobre a base de talentos.

## 🎯 Objetivo

Implementar uma aplicação que:

- Liste talentos armazenados no banco PostgreSQL via Directus.
- Permita:
  - Busca por `directus_users.email` (join com `talents.user_id -> directus_users.id`).
  - Filtros:
	 - `department`, `current_status`, `pdi_plan_ready`, `orchestrator_state`.
	 - Intervalo de `start_date / end_date`.
	 - `leader_id`, `target_role_id`.
  - Paginação server-side.
  - Ordenação por `date_updated` DESC.
- Exiba:
  - Contagem total de resultados.
  - Estado de carregamento.
  - Mensagem para estados vazios.
- Seja responsiva, acessível e visualmente consistente (dark theme).

## ⚙️ Stack utilizada

### Backend (dados)

- PostgreSQL (armazenamento).
- Directus CMS (API REST/GraphQL).
- Docker + Docker Compose.

### Frontend

- Next.js (App Router).
- TypeScript.
- Tailwind CSS.
- SSR (Server-Side Rendering).
- Debounce na busca.
- Filtros persistentes via querystring.

### Testes

- Vitest + Testing Library (unit tests para funções e componentes).

## 🏗️ Estrutura do projeto

```text
📦 leapy-talents/
├── directus/            # Backend: PostgreSQL + Directus (via docker-compose)
│   ├── docker-compose.yml
│   ├── .env.example
│   ├── seed/
│   │   ├── schema.sql   # Estrutura do banco
│   │   └── seed.sql     # Geração dos dados iniciais (~100 talentos)
│   └── ...
├── web/                 # Frontend (Next.js + TypeScript)
│   ├── src/
│   │   ├── app/
│   │   │   ├── layout.tsx   # Layout global (tema e estrutura de colunas)
│   │   │   └── page.tsx     # Página principal (SSR + filtros)
│   │   ├── components/      # Sidebar, TalentCard, EmailSearchInput
│   │   └── lib/
│   │       └── directus.ts  # Lógica de fetch e joins (users, leaders, roles)
│   ├── tests/               # Testes unitários (Vitest)
│   ├── public/images/       # Logo Leapy Talents
│   ├── vitest.config.ts     # Configuração do Vitest
│   ├── vitest.setup.ts      # Setup global de testes
│   └── .env.local           # Variáveis do frontend
└── README.md                # Documentação completa
```

## 🐘 Como rodar o backend (Directus + Postgres)

### Pré-requisitos

- Docker.
- Docker Compose.

### Passos

1. Copie o arquivo de variáveis de ambiente:
	```sh
	cp directus/.env.example directus/.env
	```
2. Suba os containers:
	```sh
	docker compose -f directus/docker-compose.yml up -d --build
	```
3. Acesse o painel do Directus: [http://localhost:8055](http://localhost:8055)
4. Crie o primeiro usuário administrador (o Directus solicitará isso automaticamente).

### Estrutura do banco

As tabelas são criadas a partir do `schema.sql`:

- `public.talents`.
- `public.internship_leaders`.
- `public.target_roles`.
- (`directus_users` é criada automaticamente pelo Directus.)

A `seed.sql` popula o banco com dados fictícios (100 talentos e relacionamentos válidos). As associações (`user_id`, `leader_id`, `target_role_id`) foram inseridas manualmente via terminal, garantindo integridade entre as tabelas e o Directus.

### Token de autenticação

Para o frontend acessar a API:

1. No painel do Directus → **Settings** → **Access Control** → **Admin** → **Tokens**.
2. Clique em “Generate Token” e copie o valor.
3. Cole no `.env.local` do frontend como `NEXT_PUBLIC_DIRECTUS_STATIC_TOKEN`.

## 💻 Como rodar o frontend (Next.js + TypeScript)

### Pré-requisitos

- Node.js 18+.
- npm (ou pnpm).

### Passos

1. Vá até a pasta do frontend:
	```sh
	cd web
	```
2. Copie o arquivo de exemplo e preencha as variáveis:
	```sh
	cp .env.local.example .env.local
	```
	Exemplo de `.env.local`:
	```env
	NEXT_PUBLIC_DIRECTUS_URL=http://localhost:8055
	NEXT_PUBLIC_DIRECTUS_STATIC_TOKEN=SEU_TOKEN_DO_DIRECTUS
	```
3. Instale as dependências:
	```sh
	npm install
	```
4. Execute o servidor local:
	```sh
	npm run dev
	```

Acesse: [http://localhost:3000](http://localhost:3000)

## 🧩 Funcionalidades implementadas

### 🔍 Busca com debounce

- Campo de busca por email (`directus_users.email`).
- Delay de 250 ms para evitar múltiplas requisições.
- Persistência na URL (`?q=email@teste.com`).

### 🎚️ Filtros

- Department.
- Current Status.
- Orchestrator State.
- Período (`start_date / end_date`).
- Leader.
- Cargo (`target_role_id`).
- PDI Pronto (toggle animado).

Todos os filtros:

- São persistentes na URL.
- Podem ser combinados livremente.
- Têm botão “Limpar período” e “Limpar todos os filtros”.

### 📄 Paginação

- Lógica server-side.
- Controle de página via `?page=`.
- Botões “Anterior” e “Próxima” com estados desativados quando aplicável.

### 🧭 Estados visuais

- Carregando, vazio e erro tratados.
- Contador total de resultados exibido.

### 🎨 UX/UI

- Tema escuro (`#0e0f11`, `#1b1d21`).
- Sidebar rolável independente do corpo.
- Layout limitado a 4 cards por tela (sem scroll vertical na listagem).
- Transições suaves e componentes com feedback visual.

## 🧪 Testes unitários (Vitest)

### Estrutura

Os testes estão localizados em `web/tests/`, com suporte configurado em:

- `vitest.config.ts`.
- `vitest.setup.ts`.

### Executando os testes

A partir da pasta `/web`, execute:

```sh
npm run test
```

### O que é testado

- Funções utilitárias (`directus.ts`, formatadores, paginação).
- Componentes principais (`TalentCard`, `EmailSearchInput`).
- Validação e consistência de filtros.

## ⚡ Quickstart — Execução completa

```sh
# 🐘 Backend
cp directus/.env.example directus/.env
docker compose -f directus/docker-compose.yml up -d --build
# Acesse http://localhost:8055 e crie o primeiro usuário

# 💻 Frontend
cd web
cp .env.local.example .env.local
npm install
npm run dev
# Acesse http://localhost:3000

# 🧪 Testes unitários
npm run test
```

## 🧠 Decisões técnicas e trade-offs

- Join manual (REST) — controla melhor os relacionamentos (user, leader, role), evitando N+1 queries.
- Server Components (Next.js App Router) — garante SSR, SEO e sincronização automática com filtros.
- Debounce no client + SSR render — otimiza performance e experiência de busca.
- UX-first design — layout fixo de 4 cards por tela, scroll independente na sidebar, componentes acessíveis.
- Vitest para estabilidade — testes unitários leves e rápidos garantem segurança de refatorações.

## 🏁 Conclusão

O projeto Leapy Talents cumpre integralmente os requisitos do desafio:

- ✅ Busca com debounce.
- ✅ Filtros completos e persistentes.
- ✅ Paginação server-side.
- ✅ Ordenação por `date_updated` DESC.
- ✅ Tratamento de estados vazios e erros.
- ✅ Layout responsivo e moderno.
- ✅ Testes unitários com Vitest.
- ✅ Documentação completa de execução (back + front).

💬 Desenvolvido por Warley Vieira  
Teste técnico — Desafio “Interface de Talentos”