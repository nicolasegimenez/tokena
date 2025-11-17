import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'
import { cn } from "@/lib/utils"

interface StatsCardProps {
  title: string
  value: string | number
  description?: string
  change?: {
    value: number
    type: 'up' | 'down' | 'neutral'
    period?: string
  }
  icon?: React.ReactNode
  gradient?: boolean
  className?: string
  highlight?: boolean
}

/**
 * Premium stats card component for key metrics display
 */
export function StatsCard({
  title,
  value,
  description,
  change,
  icon,
  gradient = false,
  className,
  highlight = false,
}: StatsCardProps) {
  const changeIcon =
    change?.type === 'up' ? (
      <TrendingUp className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
    ) : change?.type === 'down' ? (
      <TrendingDown className="w-4 h-4 text-red-600 dark:text-red-400" />
    ) : (
      <Minus className="w-4 h-4 text-slate-600 dark:text-slate-400" />
    )

  return (
    <Card
      className={cn(
        'overflow-hidden transition-all duration-300 hover:shadow-lg',
        gradient &&
          'bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 border-emerald-200/50 dark:border-emerald-800/50',
        highlight &&
          'border-2 border-emerald-500/50 dark:border-emerald-400/50 shadow-lg shadow-emerald-500/20',
        className
      )}
    >
      <CardHeader className="space-y-1">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">{title}</CardTitle>
          {icon && <div className="text-emerald-600 dark:text-emerald-400">{icon}</div>}
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        {/* Main value */}
        <div className="space-y-1">
          <p className="text-3xl font-bold text-slate-900 dark:text-white">{value}</p>
          {description && <CardDescription className="text-sm">{description}</CardDescription>}
        </div>

        {/* Change indicator */}
        {change && (
          <div className="flex items-center gap-2 pt-2 border-t border-slate-200 dark:border-slate-700">
            {changeIcon}
            <span
              className={cn(
                'text-sm font-semibold',
                change.type === 'up'
                  ? 'text-emerald-600 dark:text-emerald-400'
                  : change.type === 'down'
                    ? 'text-red-600 dark:text-red-400'
                    : 'text-slate-600 dark:text-slate-400'
              )}
            >
              {change.type === 'up' ? '+' : change.type === 'down' ? '-' : ''}
              {Math.abs(change.value)}%
            </span>
            {change.period && <span className="text-xs text-slate-500 dark:text-slate-400">{change.period}</span>}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

/**
 * Grid layout for multiple stats cards
 */
interface StatsGridProps {
  stats: StatsCardProps[]
  columns?: 2 | 3 | 4
  className?: string
}

export function StatsGrid({ stats, columns = 3, className }: StatsGridProps) {
  return (
    <div
      className={cn(
        'grid gap-4 sm:gap-6',
        columns === 2 && 'grid-cols-1 sm:grid-cols-2',
        columns === 3 && 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
        columns === 4 && 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
        className
      )}
    >
      {stats.map((stat, index) => (
        <StatsCard key={index} {...stat} />
      ))}
    </div>
  )
}

/**
 * Loading skeleton for StatsCard
 */
export function StatsCardSkeleton() {
  return (
    <Card>
      <CardHeader>
        <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/3 animate-pulse" />
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="h-8 bg-slate-200 dark:bg-slate-800 rounded w-1/2 animate-pulse" />
        <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-3/4 animate-pulse" />
        <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-1/3 animate-pulse" />
      </CardContent>
    </Card>
  )
}
