import React from 'react'

interface ValidationError {
  line?: number
  message: string
  code: string
}

interface ValidationMessageProps {
  errors: ValidationError[]
  warnings: ValidationError[]
}

export const ValidationMessage: React.FC<ValidationMessageProps> = ({
  errors,
  warnings,
}) => {
  if (errors.length === 0 && warnings.length === 0) {
    return null
  }

  return (
    <div className="space-y-2">
      {errors.map((error, index) => (
        <div key={`error-${index}`} className="alert alert-error">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>
            {error.line && <strong>Line {error.line}:</strong>} {error.message}
          </span>
        </div>
      ))}

      {warnings.map((warning, index) => (
        <div key={`warning-${index}`} className="alert alert-warning">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
          <span>
            {warning.line && <strong>Line {warning.line}:</strong>}{' '}
            {warning.message}
          </span>
        </div>
      ))}
    </div>
  )
}
