import { useState } from 'react'
import { useTestProcessor } from './hooks/useTestProcessor'
import { useValidation } from './hooks/useValidation'
import { BatchInputForm } from './components/forms/BatchInputForm'
import { ResultsSection } from './components/sections/ResultsSection'
import './App.css'

function App() {
  const [input, setInput] = useState('')

  const {
    results,
    isProcessing,
    error,
    processInput,
    clearResults,
    exportResults,
  } = useTestProcessor()

  const { validationResult, validateInput } = useValidation()

  const handleInputChange = (value: string) => {
    setInput(value)
    if (value.trim()) {
      validateInput(value)
    }
  }

  const handleSubmit = async () => {
    const validation = validateInput(input)
    if (validation.isValid) {
      await processInput(input)
    }
  }

  const handleClear = () => {
    setInput('')
    clearResults()
  }

  const handleExport = () => {
    const exportData = exportResults()
    if (exportData) {
      const blob = new Blob([exportData], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `optimal-exchange-results-${Date.now()}.json`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    }
  }

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-primary mb-4">
            🪙 Optimal Exchange Tester
          </h1>
          <p className="text-xl text-base-content/70 max-w-2xl mx-auto">
            Test optimal coin exchange algorithms with custom denominations
          </p>
        </div>

        <div className="card bg-base-100 shadow-xl mb-12">
          <div className="card-body p-8">
            <h2 className="card-title text-3xl mb-6">Input Test Cases</h2>

            <BatchInputForm
              value={input}
              onChange={handleInputChange}
              onSubmit={handleSubmit}
              onClear={handleClear}
              validation={validationResult}
              isProcessing={isProcessing}
            />
          </div>
        </div>

        {(results.length > 0 || error) && (
          <ResultsSection
            results={results}
            error={error}
            onExport={handleExport}
            onClear={clearResults}
          />
        )}
      </div>
    </div>
  )
}

export default App
