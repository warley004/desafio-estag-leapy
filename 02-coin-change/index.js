const fs = require("fs");

function coinChange(coins, amount) {
  const INF = amount + 1; // "infinito" prático
  const dp = new Array(amount + 1).fill(INF);

  dp[0] = 0; // 0 moedas pra fazer 0

  // programação dinâmica: para cada moeda, tenta usá-la
  for (const coin of coins) {
    for (let a = coin; a <= amount; a++) {
      dp[a] = Math.min(dp[a], dp[a - coin] + 1);
    }
  }

  // se não conseguiu chegar exatamente em 'amount'
  return dp[amount] === INF ? -1 : dp[amount];
}

function main() {
  const inputStr = fs.readFileSync(0, "utf8").trim();
  const { coins, amount } = JSON.parse(inputStr);

  const minCoins = coinChange(coins, amount);

  console.log(JSON.stringify({ minCoins }));
}

main();
