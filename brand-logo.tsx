import { Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'

export function BrandLogo({ className, compact = false }: { className?: string; compact?: boolean }) {
  return (
    <div className={cn('flex items-center gap-2.5', className)}>
      <span className="relative flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-[oklch(0.45_0.2_265)] shadow-lg shadow-primary/30">
        <Sparkles className="size-4.5 text-primary-foreground" aria-hidden="true" />
      </span>
      {!compact && (
        <span className="text-lg font-bold tracking-tight text-foreground">
          IA <span className="text-primary">Vendedor</span>
        </span>
      )}
    </div>
  )
}
