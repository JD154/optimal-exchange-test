import { useState, useCallback } from 'react'
import { processTestCasesDetailed } from '../utils'
import type { ProcessedResults, TestCaseResult } from '../types/optimalExchange'

interface UseTestProcessorReturn {
  results: TestCaseResult[]
  isProcessing: boolean
  error: string | null
  processInput: (input: string) => Promise<void>
  clearResults: () => void
  exportResults: () => string
}

export const useTestProcessor = (): UseTestProcessorReturn => {
  const [results, setResults] = useState<TestCaseResult[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const processInput = useCallback(async (input: string) => {
    if (!input.trim()) {
      setError('Please enter test cases')
      return
    }

    setIsProcessing(true)
    setError(null)

    try {
      await new Promise(resolve => setTimeout(resolve, 100))

      const processedResults: ProcessedResults = processTestCasesDetailed(input)
      setResults(processedResults.results)

      if (processedResults.results.length === 0) {
        setError('No valid test cases found')
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to process test cases'
      setError(errorMessage)
      setResults([])
    } finally {
      setIsProcessing(false)
    }
  }, [])

  const clearResults = useCallback(() => {
    setResults([])
    setError(null)
  }, [])

  const exportResults = useCallback(() => {
    if (results.length === 0) return ''

    const exportData = {
      timestamp: new Date().toISOString(),
      totalCases: results.length,
      results: results.map(r => ({
        case: r.testCase,
        result: r.result,
        output: r.formattedOutput,
      })),
    }

    return JSON.stringify(exportData, null, 2)
  }, [results])

  return {
    results,
    isProcessing,
    error,
    processInput,
    clearResults,
    exportResults,
  }
}
