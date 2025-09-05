import { solveOptimalExchange } from './coinExchange'
import type {
  TestCase,
  OptimalExchangeResult,
  TestCaseResult,
  ProcessedResults,
} from '../types/optimalExchange'

// Parses an input line and extracts the test case

const parseTestCase = (line: string): TestCase => {
  const parts = line.split(' ').map(Number)
  const N = parts[0]
  const K = parts[1]
  const denominations = parts.slice(2, 2 + K)

  return {
    N,
    K,
    denominations,
  }
}

// Formats the result of a test case
const formatResult = (result: OptimalExchangeResult): string => {
  return `${result.average.toFixed(2)} ${result.maximum}`
}

// Processes test cases with detailed results
export const processTestCasesDetailed = (input: string): ProcessedResults => {
  const lines = input.trim().split('\n')
  const numTestCases = parseInt(lines[0])
  const results: TestCaseResult[] = []
  const summary: string[] = []

  for (let i = 1; i <= numTestCases; i++) {
    const testCase = parseTestCase(lines[i])
    const result = solveOptimalExchange(testCase.N, testCase.denominations)

    const formattedOutput = result ? formatResult(result) : 'Error'

    results.push({
      testCase,
      result,
      formattedOutput,
    })

    summary.push(formattedOutput)
  }

  return {
    results,
    summary,
  }
}
