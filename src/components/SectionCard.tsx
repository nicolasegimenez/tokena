import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronDown } from 'lucide-react'
import { useState } from 'react'
import { cn } from "@/lib/utils"

interface SectionCardProps {
  title: string
  description?: string
  icon?: React.ReactNode
  children: React.ReactNode
  collapsible?: boolean
  defaultOpen?: boolean
  footer?: React.ReactNode
  className?: string
  highlight?: boolean
}

/**
 * Reusable section card component with optional collapse
 */
export function SectionCard({
  title,
  description,
  icon,
  children,
  collapsible = false,
  defaultOpen = true,
  footer,
  className,
  highlight = false,
}: SectionCardProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <Card
      className={cn(
        'overflow-hidden transition-all duration-300',
        highlight &&
          'border-emerald-500/50 dark:border-emerald-400/50 shadow-lg shadow-emerald-500/10',
        className
      )}
    >
      <CardHeader
        className={cn(
          'cursor-pointer select-none transition-colors',
          collapsible && 'hover:bg-slate-50 dark:hover:bg-slate-800/50'
        )}
        onClick={() => collapsible && setIsOpen(!isOpen)}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3 flex-1">
            {icon && <div className="text-emerald-600 dark:text-emerald-400 mt-1">{icon}</div>}
            <div className="space-y-1">
              <CardTitle className="text-lg">{title}</CardTitle>
              {description && <CardDescription>{description}</CardDescription>}
            </div>
          </div>
          {collapsible && (
            <ChevronDown
              className={cn(
                'w-5 h-5 text-slate-600 dark:text-slate-400 transition-transform duration-300 flex-shrink-0 mt-1',
                isOpen && 'rotate-180'
              )}
            />
          )}
        </div>
      </CardHeader>

      {(!collapsible || isOpen) && (
        <>
          <CardContent className="space-y-4">{children}</CardContent>
          {footer && (
            <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
              {footer}
            </div>
          )}
        </>
      )}
    </Card>
  )
}

/**
 * Info box component for important information
 */
interface InfoBoxProps {
  type: 'info' | 'warning' | 'success' | 'error'
  title: string
  message: string
  action?: {
    label: string
    onClick: () => void
  }
}

export function InfoBox({ type, title, message, action }: InfoBoxProps) {
  const config = {
    info: {
      bgColor: 'bg-blue-50 dark:bg-blue-950/30',
      borderColor: 'border-blue-200 dark:border-blue-800/50',
      titleColor: 'text-blue-900 dark:text-blue-100',
      messageColor: 'text-blue-800 dark:text-blue-200',
      icon: '💡',
    },
    warning: {
      bgColor: 'bg-yellow-50 dark:bg-yellow-950/30',
      borderColor: 'border-yellow-200 dark:border-yellow-800/50',
      titleColor: 'text-yellow-900 dark:text-yellow-100',
      messageColor: 'text-yellow-800 dark:text-yellow-200',
      icon: '⚠️',
    },
    success: {
      bgColor: 'bg-emerald-50 dark:bg-emerald-950/30',
      borderColor: 'border-emerald-200 dark:border-emerald-800/50',
      titleColor: 'text-emerald-900 dark:text-emerald-100',
      messageColor: 'text-emerald-800 dark:text-emerald-200',
      icon: '✅',
    },
    error: {
      bgColor: 'bg-red-50 dark:bg-red-950/30',
      borderColor: 'border-red-200 dark:border-red-800/50',
      titleColor: 'text-red-900 dark:text-red-100',
      messageColor: 'text-red-800 dark:text-red-200',
      icon: '❌',
    },
  }

  const { bgColor, borderColor, titleColor, messageColor, icon } = config[type]

  return (
    <div className={cn('rounded-lg border p-4 sm:p-6 space-y-3', bgColor, borderColor)}>
      <div className="flex gap-3">
        <span className="text-xl flex-shrink-0">{icon}</span>
        <div className="flex-1 space-y-1">
          <h4 className={cn('font-semibold', titleColor)}>{title}</h4>
          <p className={cn('text-sm', messageColor)}>{message}</p>
        </div>
      </div>
      {action && (
        <Button size="sm" variant="outline" onClick={action.onClick} className="w-full sm:w-auto">
          {action.label}
        </Button>
      )}
    </div>
  )
}

/**
 * Feature list component
 */
interface FeatureListProps {
  items: {
    icon?: React.ReactNode
    title: string
    description: string
  }[]
  columns?: 1 | 2 | 3
}

export function FeatureList({ items, columns = 2 }: FeatureListProps) {
  return (
    <div
      className={cn(
        'grid gap-6',
        columns === 1 && 'grid-cols-1',
        columns === 2 && 'grid-cols-1 md:grid-cols-2',
        columns === 3 && 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
      )}
    >
      {items.map((item, index) => (
        <div key={index} className="flex gap-4 p-4 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-emerald-300 dark:hover:border-emerald-600 transition-colors">
          {item.icon && <div className="text-emerald-600 dark:text-emerald-400 flex-shrink-0">{item.icon}</div>}
          <div className="space-y-1">
            <h4 className="font-semibold text-slate-900 dark:text-white">{item.title}</h4>
            <p className="text-sm text-slate-600 dark:text-slate-400">{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
