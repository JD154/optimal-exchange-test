import React from 'react'
import {
  XCircle,
  BarChart3,
  Download,
  FileText,
  TrendingUp,
  ArrowUp,
} from 'lucide-react'
import type { TestCaseResult } from '../../../types/optimalExchange'
import { StatCard, ResultsTable } from './components'

interface ResultsSectionProps {
  results: TestCaseResult[]
  error: string | null
  onExport: () => void
  onClear: () => void
}

export const ResultsSection: React.FC<ResultsSectionProps> = ({
  results,
  error,
  onExport,
  onClear,
}) => {
  if (error) {
    return (
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <div className="alert alert-error">
            <XCircle className="stroke-current shrink-0 h-6 w-6" />
            <span>{error}</span>
          </div>
        </div>
      </div>
    )
  }

  if (results.length === 0) {
    return null
  }

  const totalCases = results.length
  const validResults = results.filter(r => r.result !== null)
  const overallAverage =
    validResults.length > 0
      ? validResults.reduce((sum, r) => sum + r.result!.average, 0) /
        validResults.length
      : 0
  const globalMaximum =
    validResults.length > 0
      ? Math.max(...validResults.map(r => r.result!.maximum))
      : 0

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <h2 className="card-title text-3xl">
            <BarChart3 className="h-8 w-8" />
            Results
          </h2>

          <div className="flex gap-3">
            <button className="btn btn-outline btn-sm gap-2" onClick={onExport}>
              <Download className="h-4 w-4" />
              Export JSON
            </button>
            <button className="btn btn-ghost btn-sm" onClick={onClear}>
              Clear Results
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
          <StatCard
            title="Total Cases"
            value={totalCases}
            subtitle="processed"
            icon={<FileText className="w-6 h-6" />}
            variant="primary"
          />

          <StatCard
            title="Overall Average"
            value={overallAverage.toFixed(2)}
            subtitle="coins needed"
            icon={<TrendingUp className="w-6 h-6" />}
            variant="secondary"
          />

          <StatCard
            title="Global Maximum"
            value={globalMaximum}
            subtitle="worst case"
            icon={<ArrowUp className="w-6 h-6" />}
            variant="accent"
          />
        </div>

        <ResultsTable results={results} />
      </div>
    </div>
  )
}
