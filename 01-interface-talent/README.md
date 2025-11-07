# 🧭 Desafio 01 — Interface de Talentos

Projeto **Leapy Talents**: interface de listagem, busca e filtragem de talentos construída com Next.js, TypeScript e Tailwind. A aplicação consome dados de um Directus + PostgreSQL containerizado em Docker e entrega uma experiência completa de exploração da base (busca, filtros e paginação).

---

## 📐 Arquitetura

```
01-interface-talent/
├── api/
│   └── rest.http                # Coleção de chamadas para inspeção rápida da API
├── directus/
│   ├── docker-compose.yml       # Orquestra Directus + PostgreSQL
│   ├── .env                     # Variáveis necessárias para subir os serviços
│   ├── extensions/              # Lugar para extensões/customizações do Directus
│   └── seed/
│       ├── schema.sql           # Criação de tabelas
│       └── seed.sql             # Dados fictícios (~100 talentos)
├── web/
│   ├── public/
│   ├── src/
│   │   ├── app/                 # Rotas (App Router) e SSR
│   │   ├── components/          # UI reutilizável (Sidebar, Cards, Inputs...)
│   │   └── lib/directus.ts      # Clientes e utilitários de integração
│   ├── package.json             # Scripts de desenvolvimento
│   ├── tsconfig.json            # Configuração TypeScript + Vitest
│   ├── vitest.config.ts         # Test runner
│   └── vitest.setup.ts          # Mocks globais de testes
└── README.md                    # Este guia
```

- **Backend:** Directus exposto em `http://localhost:8055`, com PostgreSQL acoplado.
- **Frontend:** Next.js 16 (App Router), SSR, Tailwind 4 e componentes client-side para filtros.
- **Testes:** Vitest + Testing Library (components) + vi mocks (fetch / timers).

---

## ⚙️ Stack

| Camada     | Tecnologias principais                                                            |
|------------|------------------------------------------------------------------------------------|
| Backend    | Directus, PostgreSQL 15, Docker, Docker Compose                                    |
| Frontend   | Next.js 16, React 19, TypeScript 5, Tailwind CSS 4                                 |
| Tooling    | ESLint 9, Vitest 2, Testing Library, jsdom                                        |

---

## ✅ Pré-requisitos

| Ferramenta      | Versão recomendada | Observações                                 |
|-----------------|--------------------|----------------------------------------------|
| Docker & Compose| Docker Desktop 4+  | Necessários para subir Directus e PostgreSQL |
| Node.js         | 18 LTS ou 20 LTS   | Utilizado pelo frontend (Next.js)            |
| npm             | 9+                 | Gerenciador de pacotes padrão                |

---

## 🔐 Variáveis de ambiente

Os arquivos de exemplo já estão incluídos no repositório para facilitar a configuração.  
Nenhum deles contém credenciais sensíveis — apenas placeholders seguros.

### 📁 Backend (`directus/.env.example`)

Copie o arquivo de exemplo e renomeie para `.env` antes de subir o Directus:

```bash
cp directus/.env.example directus/.env
```

**Conteúdo padrão:**

```env
PORT=8055
PUBLIC_URL=http://localhost:8055
KEY=replace-with-secure-key
SECRET=replace-with-secure-secret

ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=admin

POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=leapy
POSTGRES_PORT=5432

EXTENSIONS_AUTO_RELOAD=true
DIRECTUS_EXPERIMENTAL_GRAPHQL_INTROSPECTION=true
```

🟢 Esse arquivo define as variáveis essenciais para subir o Directus e o PostgreSQL via Docker.  
Nenhuma credencial real é incluída — todos os valores são exemplos.

### 💻 Frontend (`web/.env.local.example`)

Copie o arquivo de exemplo e renomeie para `.env.local` antes de rodar o Next.js:

```bash
cp web/.env.local.example web/.env.local
```

**Conteúdo padrão:**

```env
NEXT_PUBLIC_DIRECTUS_URL=http://localhost:8055
NEXT_PUBLIC_DIRECTUS_TOKEN=<INSIRA_SEU_TOKEN_STATICO_DO_DIRECTUS>
```

- `NEXT_PUBLIC_DIRECTUS_URL`: URL base da instância Directus local.
- `NEXT_PUBLIC_DIRECTUS_TOKEN`: token estático de leitura, gerado no painel Directus em **Settings → Access Control → Admin → Tokens → Generate Token**.

### 🧩 Gitignore atualizado

Para permitir o versionamento dos arquivos de exemplo, o `.gitignore` foi ajustado para:

```bash
# ignore only real env files, not examples
.env
.env.local
.env.production
```

Isso garante que:

- ✅ Os arquivos reais (`.env` e `.env.local`) continuam protegidos.
- ✅ Os exemplos (`.env.example` e `.env.local.example`) são versionados e visíveis no PR.

---

## 🚀 Passo a passo de setup

### 1. Clonar o repositório

```sh
# a partir da raiz onde deseja trabalhar
cd desafio-estag-leapy/01-interface-talent
```

### 2. Backend (Directus + PostgreSQL)

1. Configure o arquivo `directus/.env` (use o exemplo já disponível como base).
2. Suba os serviços Docker:
	 ```sh
	 docker compose -f directus/docker-compose.yml up -d --build
	 ```
3. Aguarde a inicialização. As migrations (`schema.sql`) e seeds (`seed.sql`) são aplicadas automaticamente na primeira subida.
4. Acesse [http://localhost:8055](http://localhost:8055) e crie o primeiro usuário administrador (caso solicitado).
5. Após logado, gere um **Static Token** (User Directory → Administrator → Admin User → Token) e guarde o valor para o frontend.

> Para derrubar os serviços, execute `docker compose -f directus/docker-compose.yml down`.

### 3. Frontend (Next.js)

1. Entre na pasta `web`:
	 ```sh
	 cd web
	 ```
2. Crie `.env.local` com os valores descritos anteriormente.
3. Instale as dependências:
	 ```sh
	 npm install
	 ```
4. Rode o servidor de desenvolvimento:
	 ```sh
	 npm run dev
	 ```
5. Acesse a aplicação em [http://localhost:3000](http://localhost:3000).

> O frontend realiza SSR, portanto as consultas ao Directus acontecem no servidor Next. Certifique-se de que o backend esteja rodando antes de abrir a interface.

---

## 🧪 Testes e qualidade

- **Testes unitários:**
	```sh
	npm run test
	```
	Executa Vitest em modo headless, com suporte a jsdom e Testing Library. Cobrem componentes críticos (cards, filtros, busca) e utilitários (`lib/directus`).

- **Lint:**
	```sh
	npm run lint
	```

- **Build de produção:**
	```sh
	npm run build teste
	```

> Todos os scripts devem ser executados dentro da pasta `web`.

---

## 🔍 Principais funcionalidades

- **Busca com debounce (250 ms)**: digite um e-mail para filtrar talentos (`directus_users.email`).
- **Filtros combináveis**: departamento, status, orchestrator state, líder, cargo, PDI pronto e intervalo de datas.
- **Persistência na URL**: filtros e página atual ficam refletidos em query strings.
- **Paginação server-side**: controle via `?page=` com botões "Anterior"/"Próxima".
- **Estados visuais**: carregando, vazio, erro e contagem total de resultados.
- **UI responsiva (dark)**: sidebar independente, cards com micro interações e acessibilidade básica.

---

## � Decisões de engenharia

- **Directus + PostgreSQL via Docker**: provisionamento rápido, dados fake via seeds e administração via painel.
- **Next.js App Router com Server Components**: SSR imediato e sincronização automática dos filtros com a rota.
- **Tailwind 4 + design tokens internos**: facilitar consistência visual em dark mode.
- **Vitest + Testing Library**: feedback rápido em nível de componente, com mocks de browser (`jsdom`).
- **Query strings como fonte única da verdade**: compatível com compartilhamento de filtros e recarregamentos.

---

## 🆘 Troubleshooting

| Sintoma                                        | Possível causa / solução                                                      |
|-----------------------------------------------|-------------------------------------------------------------------------------|
| `npm run dev` não encontra a API               | Certifique-se de que `NEXT_PUBLIC_DIRECTUS_URL` aponta para o Directus rodando |
| Erro de autenticação na API                    | Gere um novo Static Token e atualize `NEXT_PUBLIC_DIRECTUS_TOKEN`             |
| Seeds não carregaram                           | Derrube os containers (`down -v`) e suba novamente para reaplicar o `seed.sql`|
| Porta 8055 ocupada                             | Ajuste `PORT`/`PUBLIC_URL` em `directus/.env` e mapeamento em `docker-compose.yml` |

---

## 🏁 Conclusão

Com este guia você consegue:

1. Subir o ecossistema Directus + PostgreSQL (com dados prontos).
2. Configurar o frontend Next.js com as variáveis adequadas.
3. Executar a aplicação em desenvolvimento e rodar os testes.

💬 Desenvolvido por **Warley Vieira** — Teste técnico “Interface de Talentos”.