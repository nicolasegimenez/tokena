import { ChevronRight, Home } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface BreadcrumbItem {
  label: string
  href?: string
  onClick?: () => void
  icon?: React.ReactNode
}

interface PageHeaderProps {
  title: string
  description?: string
  breadcrumbs?: BreadcrumbItem[]
  actions?: React.ReactNode
  className?: string
}

/**
 * Premium page header with breadcrumbs and actions
 */
export function PageHeader({
  title,
  description,
  breadcrumbs,
  actions,
  className,
}: PageHeaderProps) {
  return (
    <div className={cn('space-y-4 sm:space-y-6', className)}>
      {/* Breadcrumbs */}
      {breadcrumbs && breadcrumbs.length > 0 && (
        <nav className="flex items-center gap-1 text-sm" aria-label="Breadcrumb">
          <Button
            variant="ghost"
            size="sm"
            className="h-7 gap-1 px-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
            onClick={() => (window.location.href = '/')}
          >
            <Home className="w-4 h-4" />
            <span className="sr-only">Home</span>
          </Button>

          {breadcrumbs.map((item, index) => (
            <div key={index} className="flex items-center gap-1">
              <ChevronRight className="w-4 h-4 text-slate-400" />
              {item.href ? (
                <a
                  href={item.href}
                  className="text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                >
                  {item.label}
                </a>
              ) : item.onClick ? (
                <button
                  onClick={item.onClick}
                  className="text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                >
                  {item.label}
                </button>
              ) : (
                <span className="text-slate-900 dark:text-white font-medium">{item.label}</span>
              )}
            </div>
          ))}
        </nav>
      )}

      {/* Title and description */}
      <div className="space-y-2">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">{title}</h1>
        {description && (
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl">{description}</p>
        )}
      </div>

      {/* Actions */}
      {actions && <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">{actions}</div>}
    </div>
  )
}

/**
 * Compact page header for sub-sections
 */
interface CompactPageHeaderProps {
  title: string
  subtitle?: string
  actions?: React.ReactNode
}

export function CompactPageHeader({ title, subtitle, actions }: CompactPageHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div className="space-y-1">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">{title}</h2>
        {subtitle && <p className="text-sm text-slate-600 dark:text-slate-400">{subtitle}</p>}
      </div>
      {actions && <div className="flex gap-2">{actions}</div>}
    </div>
  )
}
