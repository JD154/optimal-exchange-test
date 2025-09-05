import React, { useState } from 'react'
import { Eye } from 'lucide-react'
import { DetailModal } from './DetailModal'
import type { TestCaseResult } from '../../../../types/optimalExchange'

interface ResultsTableProps {
  results: TestCaseResult[]
}

export const ResultsTable: React.FC<ResultsTableProps> = ({ results }) => {
  const [selectedCase, setSelectedCase] = useState<number | null>(null)

  const handleViewDetails = (index: number) => {
    setSelectedCase(index)
  }

  const handleCloseModal = () => {
    setSelectedCase(null)
  }

  return (
    <>
      <div className="overflow-x-auto bg-base-100 rounded-xl shadow-lg">
        <table className="table table-zebra w-full">
          <thead>
            <tr className="bg-base-200">
              <th className="font-bold">Case</th>
              <th className="font-bold">N</th>
              <th className="font-bold">Denominations</th>
              <th className="font-bold text-center">Average</th>
              <th className="font-bold text-center">Maximum</th>
              <th className="font-bold text-center">Details</th>
            </tr>
          </thead>
          <tbody>
            {results.map((result, index) => (
              <tr key={index} className="hover:bg-base-50">
                <td className="font-medium">
                  <div className="badge badge-outline badge-lg">
                    {index + 1}
                  </div>
                </td>
                <td>
                  <span className="font-mono font-bold text-lg">
                    {result.testCase.N}
                  </span>
                </td>
                <td>
                  <div className="flex flex-wrap gap-1 max-w-xs">
                    {result.testCase.denominations
                      .slice(0, 5)
                      .map((denom, i) => (
                        <span key={i} className="badge badge-sm badge-ghost">
                          {denom}
                        </span>
                      ))}
                    {result.testCase.denominations.length > 5 && (
                      <span className="badge badge-sm badge-outline">
                        +{result.testCase.denominations.length - 5}
                      </span>
                    )}
                  </div>
                </td>
                <td className="text-center">
                  <span className="font-mono text-primary font-bold text-lg">
                    {result.result?.average.toFixed(2) ?? 'N/A'}
                  </span>
                </td>
                <td className="text-center">
                  <span className="font-mono text-secondary font-bold text-lg">
                    {result.result?.maximum ?? 'N/A'}
                  </span>
                </td>
                <td className="text-center">
                  <button
                    className="btn btn-ghost btn-sm gap-2"
                    onClick={() => handleViewDetails(index)}
                  >
                    <Eye className="w-4 h-4" />
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedCase !== null && (
        <DetailModal
          result={results[selectedCase]}
          caseIndex={selectedCase}
          isOpen={selectedCase !== null}
          onClose={handleCloseModal}
        />
      )}
    </>
  )
}
