import { Button } from "@/components/ui/button"
import { ArrowRight, Zap, CheckCircle2, TrendingUp } from 'lucide-react'

interface HeroSectionProps {
  title: string
  subtitle: string
  description: string
  primaryCTA: {
    text: string
    onClick: () => void
  }
  secondaryCTA?: {
    text: string
    onClick: () => void
  }
  features?: string[]
  backgroundGradient?: boolean
}

/**
 * Premium hero section component with improved UX/UI
 * Features typography hierarchy, CTAs, and optional features
 */
export function HeroSection({
  title,
  subtitle,
  description,
  primaryCTA,
  secondaryCTA,
  features = [],
  backgroundGradient = true,
}: HeroSectionProps) {
  return (
    <section className={`relative overflow-hidden py-20 sm:py-32 ${backgroundGradient ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900' : 'bg-slate-900'}`}>
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-500/20 rounded-full blur-3xl opacity-50" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-teal-500/20 rounded-full blur-3xl opacity-50" />
        <div className="absolute top-1/2 left-1/2 w-full h-full bg-grid-pattern opacity-5" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Subtitle badge */}
        {subtitle && (
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 mb-6 sm:mb-8">
            <Zap className="w-4 h-4 text-emerald-400" />
            <span className="text-sm font-semibold text-emerald-300">{subtitle}</span>
          </div>
        )}

        {/* Main title */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6 sm:mb-8 leading-tight">
          {title.split('\n').map((line, i) => (
            <span key={i} className="block">
              {i === 0 ? (
                <>
                  {line.split(' ').map((word, j) => (
                    <span
                      key={j}
                      className={j === 0 ? 'bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent' : ''}
                    >
                      {word}{' '}
                    </span>
                  ))}
                </>
              ) : (
                line
              )}
            </span>
          ))}
        </h1>

        {/* Description */}
        <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mb-8 sm:mb-12 leading-relaxed">
          {description}
        </p>

        {/* Features list */}
        {features.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-8 sm:mb-12 max-w-2xl">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                <span className="text-sm sm:text-base text-slate-300">{feature}</span>
              </div>
            ))}
          </div>
        )}

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <Button
            size="lg"
            className="w-full sm:w-auto bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group"
            onClick={primaryCTA.onClick}
          >
            {primaryCTA.text}
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>

          {secondaryCTA && (
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto border-slate-600 text-slate-200 hover:bg-slate-800/50 font-semibold"
              onClick={secondaryCTA.onClick}
            >
              {secondaryCTA.text}
            </Button>
          )}
        </div>

        {/* Stats row */}
        <div className="mt-16 sm:mt-20 pt-12 sm:pt-16 border-t border-slate-700/50">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 sm:gap-12">
            <div>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-3xl sm:text-4xl font-bold text-white">$2.5B+</span>
                <TrendingUp className="w-5 h-5 text-emerald-400" />
              </div>
              <p className="text-sm text-slate-400">Total Tokens</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-bold text-white mb-2">150K+</p>
              <p className="text-sm text-slate-400">Active Users</p>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <p className="text-3xl sm:text-4xl font-bold text-white mb-2">6 Categories</p>
              <p className="text-sm text-slate-400">Investment Types</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
