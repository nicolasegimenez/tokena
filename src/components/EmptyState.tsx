import { Button } from "@/components/ui/button"
import type { LucideIcon } from 'lucide-react'
import { Search, BarChart3, Wifi } from 'lucide-react'
import { cn } from "@/lib/utils"

interface EmptyStateProps {
  icon: LucideIcon
  title: string
  description: string
  action?: {
    label: string
    onClick: () => void
  }
  secondaryAction?: {
    label: string
    onClick: () => void
  }
  className?: string
}

/**
 * Empty state component for when there's no content to display
 */
export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  secondaryAction,
  className,
}: EmptyStateProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center py-12 sm:py-20 px-4', className)}>
      {/* Icon */}
      <div className="mb-6 p-4 bg-slate-100 dark:bg-slate-800 rounded-full">
        <Icon className="w-8 h-8 sm:w-10 sm:h-10 text-slate-600 dark:text-slate-400" />
      </div>

      {/* Content */}
      <div className="text-center max-w-md space-y-3 sm:space-y-4">
        <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">{title}</h3>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">{description}</p>
      </div>

      {/* Actions */}
      {(action || secondaryAction) && (
        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-3 items-center">
          {action && (
            <Button
              size="lg"
              className="w-full sm:w-auto bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
              onClick={action.onClick}
            >
              {action.label}
            </Button>
          )}
          {secondaryAction && (
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto"
              onClick={secondaryAction.onClick}
            >
              {secondaryAction.label}
            </Button>
          )}
        </div>
      )}
    </div>
  )
}

/**
 * Empty state variations
 */

interface NoResultsProps {
  searchTerm?: string
  onClear?: () => void
}

export function NoResultsState({ searchTerm, onClear }: NoResultsProps) {
  return (
    <EmptyState
      icon={Search}
      title="No results found"
      description={
        searchTerm
          ? `We couldn't find any results for "${searchTerm}". Try adjusting your search terms.`
          : 'No items match your current filters.'
      }
      action={
        onClear ? { label: 'Clear filters', onClick: onClear } : undefined
      }
    />
  )
}

export function NoDataState() {
  return (
    <EmptyState
      icon={BarChart3}
      title="No data available"
      description="There's no data to display yet. Come back later or check your settings."
    />
  )
}

export function NoConnectionState({ onRetry }: { onRetry?: () => void }) {
  return (
    <EmptyState
      icon={Wifi}
      title="Connection lost"
      description="We're having trouble connecting to the server. Please check your internet connection and try again."
      action={onRetry ? { label: 'Retry', onClick: onRetry } : undefined}
    />
  )
}
