export interface OptimalExchangeResult {
  average: number
  maximum: number
  details: number[]
}

export interface TestCase {
  N: number
  K: number
  denominations: number[]
}

export interface TestCaseResult {
  testCase: TestCase
  result: OptimalExchangeResult | null
  formattedOutput: string
}

export interface ProcessedResults {
  results: TestCaseResult[]
  summary: string[]
}

export type MinCoinsFunction = (amount: number, coins: number[]) => number

export type MinCoinsForPaymentFunction = (
  targetAmount: number,
  coins: number[],
  maxAmount: number
) => number

export type SolveOptimalExchangeFunction = (
  N: number,
  denominations: number[]
) => OptimalExchangeResult | null
