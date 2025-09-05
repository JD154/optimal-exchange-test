import { useState, useCallback } from 'react'

interface ValidationError {
  line?: number
  message: string
  code: string
}

interface ValidationResult {
  isValid: boolean
  errors: ValidationError[]
  warnings: ValidationError[]
}

interface UseValidationReturn {
  validationResult: ValidationResult
  validateInput: (input: string) => ValidationResult
}

export const useValidation = (): UseValidationReturn => {
  const [validationResult, setValidationResult] = useState<ValidationResult>({
    isValid: true,
    errors: [],
    warnings: [],
  })

  const validateInput = useCallback((input: string): ValidationResult => {
    const errors: ValidationError[] = []
    const warnings: ValidationError[] = []

    if (!input.trim()) {
      const result = {
        isValid: false,
        errors: [{ message: 'Input cannot be empty', code: 'EMPTY_INPUT' }],
        warnings: [],
      }
      setValidationResult(result)
      return result
    }

    const lines = input.trim().split('\n')

    if (lines.length === 0) {
      errors.push({
        line: 1,
        message: 'First line must contain the number of test cases',
        code: 'MISSING_CASE_COUNT',
      })
    } else {
      const numCases = parseInt(lines[0])
      if (isNaN(numCases) || numCases <= 0) {
        errors.push({
          line: 1,
          message: 'First line must be a positive integer',
          code: 'INVALID_CASE_COUNT',
        })
      } else if (lines.length - 1 !== numCases) {
        errors.push({
          message: `Expected ${numCases} test cases, but found ${
            lines.length - 1
          }`,
          code: 'CASE_COUNT_MISMATCH',
        })
      }
    }

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim()
      if (!line) continue

      const parts = line.split(' ').map(Number)
      const lineNum = i + 1

      if (parts.some(isNaN)) {
        errors.push({
          line: lineNum,
          message: 'All values must be numbers',
          code: 'INVALID_NUMBER',
        })
        continue
      }

      if (parts.length < 3) {
        errors.push({
          line: lineNum,
          message: 'Format: N K [denominations...] (minimum 3 values)',
          code: 'INSUFFICIENT_VALUES',
        })
        continue
      }

      const [N, K, ...denominations] = parts

      // Validate N
      if (N < 1 || N > 100) {
        errors.push({
          line: lineNum,
          message: 'N must be between 1 and 100',
          code: 'INVALID_N',
        })
      }

      // Validate K
      if (K < 1 || K > 10) {
        errors.push({
          line: lineNum,
          message: 'K must be between 1 and 10',
          code: 'INVALID_K',
        })
      }

      // Validate that we have exactly K denominations
      if (denominations.length !== K) {
        errors.push({
          line: lineNum,
          message: `Expected ${K} denominations, but found ${denominations.length}`,
          code: 'DENOMINATION_COUNT_MISMATCH',
        })
        continue
      }

      // Validate denominations
      if (denominations.some(d => d <= 0)) {
        errors.push({
          line: lineNum,
          message: 'All denominations must be positive',
          code: 'INVALID_DENOMINATION',
        })
      }

      // Validate unique denominations
      const uniqueDenominations = new Set(denominations)
      if (uniqueDenominations.size !== denominations.length) {
        errors.push({
          line: lineNum,
          message: 'Denominations must be unique',
          code: 'DUPLICATE_DENOMINATIONS',
        })
      }

      // Validate if denomination 1 is included
      if (!denominations.includes(1)) {
        warnings.push({
          line: lineNum,
          message:
            'Consider including denomination 1 to ensure all amounts can be paid',
          code: 'MISSING_DENOMINATION_1',
        })
      }
    }

    const result = {
      isValid: errors.length === 0,
      errors,
      warnings,
    }

    setValidationResult(result)
    return result
  }, [])

  return {
    validationResult,
    validateInput,
  }
}
