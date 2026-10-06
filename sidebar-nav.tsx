'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LogOut, Zap } from 'lucide-react'
import { BrandLogo } from '@/components/brand-logo'
import { cn } from '@/lib/utils'
import { demoUser, demoCompany } from '@/lib/demo-data'
import { isActivePath, navItems } from './nav-items'

export function SidebarNav({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname()

  return (
    <div className="flex h-full flex-col">
      <div className="flex h-16 items-center px-5">
        <Link href="/inicio" onClick={onNavigate} aria-label="IA Vendedor — Início">
          <BrandLogo />
        </Link>
      </div>

      <nav aria-label="Menu principal" className="flex-1 overflow-y-auto px-3 py-4">
        <ul className="flex flex-col gap-1">
          {navItems.map((item) => {
            const active = isActivePath(pathname, item.href)
            const Icon = item.icon
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={onNavigate}
                  aria-current={active ? 'page' : undefined}
                  className={cn(
                    'group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                    active
                      ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                      : 'text-sidebar-foreground/80 hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground',
                  )}
                >
                  <Icon
                    className={cn('size-4.5', active ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground')}
                    aria-hidden="true"
                  />
                  {item.label}
                  {item.href === '/atendimento' && (
                    <span className="ml-auto rounded-full bg-primary px-1.5 py-0.5 text-[10px] font-semibold leading-none text-primary-foreground">
                      3
                    </span>
                  )}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      <div className="flex flex-col gap-3 p-3">
        <div className="rounded-xl border border-primary/25 bg-gradient-to-br from-primary/20 to-transparent p-4">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <Zap className="size-4 text-primary" aria-hidden="true" />
            Plano Pro
          </div>
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
            {'Você usou 34 de 50 campanhas este mês.'}
          </p>
          <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-background/60">
            <div className="h-full w-[68%] rounded-full bg-primary" />
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-xl px-2 py-2">
          <span className="flex size-9 items-center justify-center rounded-full bg-secondary text-xs font-semibold">
            {demoUser.initials}
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium">{demoUser.fullName}</p>
            <p className="truncate text-xs text-muted-foreground">{demoCompany.name}</p>
          </div>
          <Link
            href="/"
            onClick={onNavigate}
            className="flex size-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-foreground"
          >
            <LogOut className="size-4" aria-hidden="true" />
            <span className="sr-only">Sair</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
