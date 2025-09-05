import React from 'react'

interface StatCardProps {
  title: string
  value: string | number
  subtitle?: string
  icon: React.ReactNode
  variant?: 'primary' | 'secondary' | 'accent'
}

export const StatCard: React.FC<StatCardProps> = ({
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