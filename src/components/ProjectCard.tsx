import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TrendingUp, Clock, DollarSign, Users, Star } from 'lucide-react'
import { cn } from "@/lib/utils"

interface ProjectCardProps {
  id: number
  title: string
  description: string
  image?: string
  category: string
  roi: number
  duration: number
  minInvestment: string
  status: 'available' | 'sold_out' | 'coming_soon'
  progress: number
  raised: string
  goal: string
  investors: number
  featured?: boolean
  onInvest: () => void
  onViewDetails: () => void
}

/**
 * Modern project card with improved visual hierarchy and UX
 */
export function ProjectCard({
  title,
  description,
  image,
  category,
  roi,
  duration,
  minInvestment,
  status,
  progress,
  raised,
  goal,
  investors,
  featured = false,
  onInvest,
  onViewDetails,
}: ProjectCardProps) {
  const statusConfig = {
    available: { label: 'Available', color: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800' },
    sold_out: { label: 'Sold Out', color: 'bg-slate-500/10 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800' },
    coming_soon: { label: 'Coming Soon', color: 'bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800' },
  }

  const statusInfo = statusConfig[status]

  return (
    <Card
      className={cn(
        'group overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border-2',
        featured
          ? 'border-emerald-500/50 bg-gradient-to-br from-emerald-50/50 to-teal-50/50 dark:from-emerald-950/20 dark:to-teal-950/20'
          : 'border-slate-200 dark:border-slate-700 hover:border-emerald-400 dark:hover:border-emerald-600'
      )}
    >
      {/* Featured badge */}
      {featured && (
        <div className="absolute top-4 right-4 z-10">
          <Badge className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white gap-1 shadow-lg">
            <Star className="w-3 h-3" />
            Featured
          </Badge>
        </div>
      )}

      {/* Image */}
      {image && (
        <div className="relative h-48 overflow-hidden bg-slate-100 dark:bg-slate-800">
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Status badge */}
          <div className="absolute top-4 left-4">
            <Badge className={cn('border', statusInfo.color)}>
              {statusInfo.label}
            </Badge>
          </div>

          {/* Category badge */}
          <div className="absolute bottom-4 left-4">
            <Badge variant="secondary" className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm">
              {category}
            </Badge>
          </div>
        </div>
      )}

      {/* Header */}
      <CardHeader>
        <div className="space-y-2">
          <CardTitle className="text-xl group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors line-clamp-2">
            {title}
          </CardTitle>
          <CardDescription className="line-clamp-2">
            {description}
          </CardDescription>
        </div>
      </CardHeader>

      {/* Content */}
      <CardContent className="space-y-6">
        {/* ROI Highlight */}
        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 rounded-lg p-4 border border-emerald-200/50 dark:border-emerald-800/50">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-600 dark:text-slate-400 font-medium">Expected Return</span>
            <div className="flex items-center gap-1">
              <TrendingUp className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{roi}%</span>
            </div>
          </div>
        </div>

        {/* Key metrics grid */}
        <div className="grid grid-cols-2 gap-4">
          {/* Duration */}
          <div className="space-y-1">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-4 h-4 text-slate-500 dark:text-slate-400" />
              <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">Duration</span>
            </div>
            <p className="text-lg font-bold text-slate-900 dark:text-white">{duration}m</p>
            <p className="text-xs text-slate-500">months</p>
          </div>

          {/* Min Investment */}
          <div className="space-y-1">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="w-4 h-4 text-slate-500 dark:text-slate-400" />
              <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">Minimum</span>
            </div>
            <p className="text-lg font-bold text-slate-900 dark:text-white">{minInvestment}</p>
            <p className="text-xs text-slate-500">investment</p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Funding Progress</span>
            <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">{progress}%</span>
          </div>
          <div className="h-2.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400">
            <span>{raised} raised</span>
            <span>{goal} goal</span>
          </div>
        </div>

        {/* Investors info */}
        <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-lg border border-slate-200 dark:border-slate-700">
          <Users className="w-4 h-4 text-slate-500" />
          <span className="font-medium">{investors.toLocaleString()}</span>
          <span>investors backing this project</span>
        </div>
      </CardContent>

      {/* Footer */}
      <CardFooter className="gap-2 pt-4 border-t border-slate-200 dark:border-slate-700">
        {status === 'sold_out' ? (
          <Button className="w-full" disabled variant="secondary">
            Sold Out
          </Button>
        ) : status === 'coming_soon' ? (
          <Button className="w-full" disabled variant="secondary">
            Coming Soon
          </Button>
        ) : (
          <>
            <Button
              variant="outline"
              className="flex-1 border-emerald-300 dark:border-emerald-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/30"
              onClick={onViewDetails}
            >
              Details
            </Button>
            <Button
              className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold shadow-md hover:shadow-lg transition-all"
              onClick={onInvest}
            >
              Invest Now
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  )
}

/**
 * Loading skeleton for ProjectCard
 */
export function ProjectCardSkeleton() {
  return (
    <Card className="overflow-hidden">
      {/* Image skeleton */}
      <div className="h-48 bg-slate-200 dark:bg-slate-800 animate-pulse" />

      {/* Content skeleton */}
      <CardHeader>
        <div className="space-y-2">
          <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded animate-pulse w-3/4" />
          <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded animate-pulse w-full" />
          <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded animate-pulse w-1/2" />
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* ROI skeleton */}
        <div className="h-20 bg-slate-200 dark:bg-slate-800 rounded-lg animate-pulse" />

        {/* Metrics skeleton */}
        <div className="grid grid-cols-2 gap-4">
          <div className="h-16 bg-slate-200 dark:bg-slate-800 rounded animate-pulse" />
          <div className="h-16 bg-slate-200 dark:bg-slate-800 rounded animate-pulse" />
        </div>

        {/* Progress skeleton */}
        <div className="space-y-2">
          <div className="h-2.5 bg-slate-200 dark:bg-slate-800 rounded-full animate-pulse" />
          <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded animate-pulse w-1/3" />
        </div>
      </CardContent>

      <CardFooter className="gap-2 pt-4">
        <div className="h-10 bg-slate-200 dark:bg-slate-800 rounded animate-pulse flex-1" />
        <div className="h-10 bg-slate-200 dark:bg-slate-800 rounded animate-pulse flex-1" />
      </CardFooter>
    </Card>
  )
}
