import React from 'react'
import { X } from 'lucide-react'
import type { TestCaseResult } from '../../../../types/optimalExchange'

interface DetailModalProps {
  result: TestCaseResult
  caseIndex: number
  isOpen: boolean
  onClose: () => void
}

export const DetailModal: React.FC<DetailModalProps> = ({
  result,
  caseIndex,
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null

  return (
    <div className="modal modal-open">
      <div className="modal-box relative max-w-md">
        <button
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          onClick={onClose}
        >
          <X className="w-4 h-4" />
        </button>

        <h3 className="font-bold text-lg mb-4">Case {caseIndex + 1} Details</h3>

        <div className="space-y-3">
          <div className="flex justify-between items-center py-2 border-b border-base-300">
            <span className="font-medium">N:</span>
            <span className="font-mono font-bold">{result.testCase.N}</span>
          </div>

          <div className="flex justify-between items-center py-2 border-b border-base-300">
            <span className="font-medium">K:</span>
            <span className="font-mono font-bold">{result.testCase.K}</span>
          </div>

          <div className="py-2 border-b border-base-300">
            <span className="font-medium block mb-2">Denominations:</span>
            <div className="text-sm font-mono bg-base-200 p-3 rounded-lg break-all">
              [{result.testCase.denominations.join(', ')}]
            </div>
          </div>

          <div className="flex justify-between items-center py-2 border-b border-base-300">
            <span className="font-medium text-primary">Average:</span>
            <span className="font-mono font-bold text-primary">
              {result.result?.average.toFixed(4) ?? 'N/A'}
            </span>
          </div>

          <div className="flex justify-between items-center py-2">
            <span className="font-medium text-secondary">Maximum:</span>
            <span className="font-mono font-bold text-secondary">
              {result.result?.maximum ?? 'N/A'}
            </span>
          </div>
        </div>
      </div>
      <div className="modal-backdrop" onClick={onClose}></div>
    </div>
  )
}
