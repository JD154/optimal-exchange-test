import React from 'react'
import { ValidationMessage } from './ValidationMessage'

interface ValidationResult {
  isValid: boolean
  errors: Array<{ line?: number; message: string; code: string }>
  warnings: Array<{ line?: number; message: string; code: string }>
}

interface BatchInputFormProps {
  value: string
  onChange: (value: string) => void
  onSubmit: () => void
  onClear: () => void
  validation: ValidationResult
  isProcessing: boolean
}

export const BatchInputForm: React.FC<BatchInputFormProps> = ({
  value,
  onChange,
  onSubmit,
  onClear,
  validation,
  isProcessing,
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validation.isValid && !isProcessing) {
      onSubmit()
    }
  }

  const placeholder = `Enter test cases in the format:
3
100 6 1 2 5 10 20 50
100 6 1 3 10 15 51 84
100 6 1 4 9 16 25 36

Format: First line = number of test cases
Each case: N K [K denominations]
- N: range [1, N] (max 100)
- K: number of denominations (max 10)
- Denominations: positive unique numbers`

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="form-control">
        <label className="label">
          <span className="label-text text-lg font-medium">Test Cases</span>
          <span className="label-text-alt">
            {
              value
                .trim()
                .split('\n')
                .filter(line => line.trim()).length
            }{' '}
            lines
          </span>
        </label>
        <textarea
          className={`textarea textarea-bordered h-64 font-mono text-sm leading-relaxed ${
            validation.errors.length > 0 ? 'textarea-error' : ''
          }`}
          placeholder={placeholder}
          value={value}
          onChange={e => onChange(e.target.value)}
          disabled={isProcessing}
        />
      </div>

      <ValidationMessage
        errors={validation.errors}
        warnings={validation.warnings}
      />

      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div className="flex flex-wrap gap-3">
          <button
            type="submit"
            className={`btn btn-primary min-w-[140px] ${
              isProcessing ? 'loading' : ''
            }`}
            disabled={!validation.isValid || isProcessing || !value.trim()}
          >
            {isProcessing ? (
              <>
                <span className="loading loading-spinner loading-sm"></span>
                Processing...
              </>
            ) : (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Process Cases
              </>
            )}
          </button>

          <button
            type="button"
            className="btn btn-outline min-w-[100px]"
            onClick={onClear}
            disabled={isProcessing}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
            Clear
          </button>
        </div>

        <div className="flex items-center">
          {validation.isValid && value.trim() && (
            <div className="badge badge-success gap-2 px-4 py-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Valid Format
            </div>
          )}
        </div>
      </div>
    </form>
  )
}
