import React from 'react'
import { XCircle, AlertTriangle } from 'lucide-react'

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
          <XCircle className="stroke-current shrink-0 h-6 w-6" />
          <span>
            {error.line && <strong>Line {error.line}:</strong>} {error.message}
          </span>
        </div>
      ))}

      {warnings.map((warning, index) => (
        <div key={`warning-${index}`} className="alert alert-warning">
          <AlertTriangle className="stroke-current shrink-0 h-6 w-6" />
          <span>
            {warning.line && <strong>Line {warning.line}:</strong>}{' '}
            {warning.message}
          </span>
        </div>
      ))}
    </div>
  )
}
