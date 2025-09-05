interface MinCoinsFunction {
  (amount: number, coins: number[]): number
}

// Calculates the minimum number of coins needed
export const minCoins: MinCoinsFunction = (
  amount: number,
  coins: number[]
): number => {
  if (amount === 0) return 0

  // dp[i] = minimum number of coins for amount i
  const dp: number[] = new Array(amount + 1).fill(Infinity)
  dp[0] = 0

  for (let i = 1; i <= amount; i++) {
    for (const coin of coins) {
      if (coin <= i && dp[i - coin] !== Infinity) {
        dp[i] = Math.min(dp[i], dp[i - coin] + 1)
      }
    }
  }

  return dp[amount]
}

// Type for function that calculates minimum number of coins for payment
interface MinCoinsForPaymentFunction {
  (targetAmount: number, coins: number[], maxAmount: number): number
}

/*
  Calculates the minimum number of coins to pay an amount X
  considering both exact payment and payment with change
 */
export const minCoinsForPayment: MinCoinsForPaymentFunction = (
  targetAmount: number,
  coins: number[],
  maxAmount: number
): number => {
  let minTotal = Infinity

  for (let payAmount = targetAmount; payAmount <= maxAmount; payAmount++) {
    const coinsToPayAmount = minCoins(payAmount, coins)

    if (coinsToPayAmount === Infinity) continue

    const change = payAmount - targetAmount
    let coinsForChange = 0

    if (change > 0) {
      coinsForChange = minCoins(change, coins)
      if (coinsForChange === Infinity) continue
    }

    const totalCoins = coinsToPayAmount + coinsForChange
    minTotal = Math.min(minTotal, totalCoins)
  }

  return minTotal === Infinity ? -1 : minTotal
}

interface OptimalExchangeResult {
  // Average coins needed for range [1, N]
  average: number
  // Maximum number of coins needed in the range [1, N]
  maximum: number
  // Array with the number of coins needed for each amount
  details: number[]
}

interface SolveOptimalExchangeFunction {
  (N: number, denominations: number[]): OptimalExchangeResult | null
}

export const solveOptimalExchange: SolveOptimalExchangeFunction = (
  N: number,
  denominations: number[]
): OptimalExchangeResult | null => {
  const results: number[] = []
  const maxPayAmount = N + Math.max(...denominations)

  // Calculate for each amount from 1 to N
  for (let amount = 1; amount <= N; amount++) {
    const minCoinsNeeded = minCoinsForPayment(
      amount,
      denominations,
      maxPayAmount
    )

    if (minCoinsNeeded === -1) {
      console.error(`Cannot pay amount ${amount}`)
      return null
    }

    results.push(minCoinsNeeded)
  }

  const sum = results.reduce((acc, val) => acc + val, 0)
  const average = sum / N
  const maximum = Math.max(...results)

  return {
    average: Math.round(average * 100) / 100,
    maximum,
    details: results,
  }
}
