import React from 'react'
import {
  Eye,
  XCircle,
  BarChart3,
  Download,
  FileText,
  TrendingUp,
  ArrowUp,
} from 'lucide-react'
import type { TestCaseResult } from '../../types/optimalExchange'

interface StatCardProps {
  title: string
  value: string | number
  subtitle?: string
  icon: React.ReactNode
  variant?: 'primary' | 'secondary' | 'accent'
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  icon,
  variant = 'primary',
}) => {
  const cardClass =
    variant === 'primary'
      ? 'bg-primary text-primary-content'
      : variant === 'secondary'
      ? 'bg-secondary text-secondary-content'
      : 'bg-accent text-accent-content'

  return (
    <div className={`card ${cardClass} shadow-lg`}>
      <div className="card-body items-center text-center py-4 px-4">
        <div className="mb-1 opacity-70">
          <div className="w-6 h-6">{icon}</div>
        </div>
        <h3 className="text-xs font-medium opacity-90 mb-1">{title}</h3>
        <div className="text-2xl font-bold">{value}</div>
        {subtitle && <p className="text-xs opacity-80">{subtitle}</p>}
      </div>
    </div>
  )
}

interface ResultsTableProps {
  results: TestCaseResult[]
}

const ResultsTable: React.FC<ResultsTableProps> = ({ results }) => {
  return (
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
                <div className="badge badge-outline badge-lg">{index + 1}</div>
              </td>
              <td>
                <span className="font-mono font-bold text-lg">
                  {result.testCase.N}
                </span>
              </td>
              <td>
                <div className="flex flex-wrap gap-1 max-w-xs">
                  {result.testCase.denominations.slice(0, 5).map((denom, i) => (
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
                <div className="dropdown dropdown-end">
                  <label tabIndex={0} className="btn btn-ghost btn-sm">
                    <Eye className="w-4 h-4" />
                    View
                  </label>
                  <div
                    tabIndex={0}
                    className="dropdown-content z-[1] card card-compact w-72 p-2 shadow-xl bg-base-100 border border-base-300"
                  >
                    <div className="card-body">
                      <h3 className="font-bold text-base mb-3">
                        Case {index + 1} Details
                      </h3>
                      <div className="text-sm space-y-2">
                        <div className="flex justify-between">
                          <span className="font-medium">N:</span>
                          <span className="font-mono">{result.testCase.N}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium">K:</span>
                          <span className="font-mono">{result.testCase.K}</span>
                        </div>
                        <div>
                          <span className="font-medium">Denominations:</span>
                          <div className="mt-1 text-xs font-mono bg-base-200 p-2 rounded">
                            [{result.testCase.denominations.join(', ')}]
                          </div>
                        </div>
                        <div className="flex justify-between pt-2 border-t">
                          <span className="font-medium text-primary">
                            Average:
                          </span>
                          <span className="font-mono font-bold">
                            {result.result?.average.toFixed(4) ?? 'N/A'}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium text-secondary">
                            Maximum:
                          </span>
                          <span className="font-mono font-bold">
                            {result.result?.maximum ?? 'N/A'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

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
