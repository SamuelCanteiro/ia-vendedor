import { DollarSign, Eye, MousePointerClick, TrendingDown, TrendingUp, UserPlus } from 'lucide-react'
import { dashboardStats } from '@/lib/demo-data'
import { cn } from '@/lib/utils'

const icons = [Eye, MousePointerClick, UserPlus, DollarSign]

export function StatCards() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">
      {dashboardStats.map((stat, i) => {
        const Icon = icons[i]
        const Trend = stat.positive ? TrendingUp : TrendingDown
        return (
          <div key={stat.label} className="panel p-4 sm:p-5">
            <div className="flex items-center justify-between">
              <span className="flex size-9 items-center justify-center rounded-lg bg-primary/12 text-primary">
                <Icon className="size-4.5" aria-hidden="true" />
              </span>
              <span
                className={cn(
                  'inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold',
                  stat.positive ? 'bg-success/12 text-success' : 'bg-destructive/12 text-destructive',
                )}
              >
                <Trend className="size-3" aria-hidden="true" />
                {stat.delta}
              </span>
            </div>
            <p className="mt-4 text-xs text-muted-foreground sm:text-sm">{stat.label}</p>
            <p className="mt-0.5 text-xl font-bold tracking-tight sm:text-2xl">{stat.value}</p>
          </div>
        )
      })}
    </div>
  )
}
