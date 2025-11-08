# 🪙 Desafio 02 — Coin Change

## 📘 Descrição

Este desafio implementa a solução para o problema **Coin Change**, que consiste em determinar o menor número de moedas necessário para somar um determinado valor (`amount`), a partir de uma lista de denominações (`coins`).

A solução foi desenvolvida em **Node.js**, seguindo o contrato de entrada/saída especificado, com suporte a execução via **Docker** e **runner.yml**.

---

## 🧠 Lógica da Solução

A abordagem utiliza **Programação Dinâmica (Bottom-Up)**.

- Um vetor `dp` de tamanho `amount + 1` é criado, onde `dp[i]` representa o número mínimo de moedas necessárias para formar o valor `i`.
- Inicialmente, `dp[0] = 0` (zero moedas para formar zero).
- Para cada moeda disponível, o algoritmo percorre todos os valores possíveis até `amount`, atualizando `dp[a]` com o menor número possível de moedas.

### 🧩 Pseudocódigo Simplificado

```javascript
dp[0] = 0
para cada moeda c:
  para a de c até amount:
    dp[a] = min(dp[a], dp[a - c] + 1)
```

### ⚙️ Complexidade

| Tipo  | Valor         |
|-------|--------------|
| Tempo | O(n × amount) |
| Espaço| O(amount)     |

---

## ⚙️ Execução Local

### 1️⃣ Rodar localmente (sem Docker)

```bash
npm install
npm test
```

### 2️⃣ Executar manualmente

```bash
echo '{ "coins": [1, 2, 5], "amount": 11 }' | node index.js
# Saída: {"minCoins":3}
```

### 🐳 Execução via Docker

#### 🧱 Build da imagem

```bash
docker build -t coin-change .
```

#### ▶️ Rodar o container

```bash
echo '{ "coins": [1, 2, 5], "amount": 11 }' | docker run -i coin-change
# Saída: {"minCoins":3}
```

### 📂 Estrutura do Projeto

```plaintext
02-coin-change/
├── index.js          # Implementação principal
├── runner.yml        # Comando padrão para execução
├── Dockerfile        # Imagem configurada para execução via CLI
├── package.json
└── tests/
    ├── harness.js
    └── cases.json
```

### 🧪 Casos de Teste

Todos os casos fornecidos em `tests/cases.json` foram executados e aprovados com sucesso ✅

---

✨ **Autor**

Desenvolvido por Warley Vieira — 2025