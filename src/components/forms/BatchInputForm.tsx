import React from 'react'
import { CheckCircle, Trash2 } from 'lucide-react'
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
    <form onSubmit={handleSubmit} className="space-y-4 w-full">
      <div className="form-control w-full">
        <div className="flex justify-between items-center mb-2 w-full">
          <span className="text-lg font-medium">Test Cases</span>
          <span className="text-sm text-gray-500">
            {
              value
                .trim()
                .split('\n')
                .filter(line => line.trim()).length
            }{' '}
            lines
          </span>
        </div>
        <textarea
          className={`textarea textarea-bordered h-64 font-mono text-sm leading-relaxed w-full ${
            validation.errors.length > 0 ? 'textarea-error' : ''
          }`}
          placeholder={placeholder}
          value={value}
          onChange={e => onChange(e.target.value)}
          disabled={isProcessing}
        />

        <div className="mt-2">
          {validation.isValid && value.trim() && (
            <div className="badge badge-success gap-2 px-4 py-3">
              <CheckCircle className="h-4 w-4" />
              Valid Format
            </div>
          )}
        </div>
      </div>

      <ValidationMessage
        errors={validation.errors}
        warnings={validation.warnings}
      />

      <div className="flex justify-center sm:justify-end">
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            className="btn btn-outline min-w-[100px]"
            onClick={onClear}
            disabled={isProcessing}
          >
            <Trash2 className="h-5 w-5" />
            Clear
          </button>

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
                <CheckCircle className="h-5 w-5" />
                Process Cases
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  )
}
