'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Building2, Package } from 'lucide-react'
import { cn } from '@/lib/utils'

const tabs = [
  { href: '/minha-loja', label: 'Dados da empresa', icon: Building2 },
  { href: '/minha-loja/produtos', label: 'Produtos', icon: Package },
]

export function StoreTabs() {
  const pathname = usePathname()
  return (
    <nav aria-label="Seções da loja" className="mb-6 flex gap-1 overflow-x-auto rounded-xl border border-border bg-card p-1 sm:inline-flex">
      {tabs.map((t) => {
        const active = pathname === t.href
        const Icon = t.icon
        return (
          <Link
            key={t.href}
            href={t.href}
            aria-current={active ? 'page' : undefined}
            className={cn(
              'flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium whitespace-nowrap transition-colors sm:flex-none',
              active ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground',
            )}
          >
            <Icon className="size-4" aria-hidden="true" />
            {t.label}
          </Link>
        )
      })}
    </nav>
  )
}
