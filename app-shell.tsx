'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Bell, Menu, X } from 'lucide-react'
import { BrandLogo } from '@/components/brand-logo'
import { cn } from '@/lib/utils'
import { SidebarNav } from './sidebar-nav'
import { isActivePath, mobileNavItems } from './nav-items'

export function AppShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <div className="min-h-dvh bg-background">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 border-r border-sidebar-border bg-sidebar lg:block">
        <SidebarNav />
      </aside>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Menu">
          <button
            type="button"
            className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in"
            onClick={() => setOpen(false)}
            aria-label="Fechar menu"
          />
          <div className="absolute inset-y-0 left-0 w-72 max-w-[85vw] border-r border-sidebar-border bg-sidebar animate-in slide-in-from-left duration-200">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute top-4 right-3 flex size-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-sidebar-accent"
            >
              <X className="size-4.5" aria-hidden="true" />
              <span className="sr-only">Fechar menu</span>
            </button>
            <SidebarNav onNavigate={() => setOpen(false)} />
          </div>
        </div>
      )}

      <div className="lg:pl-64">
        <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-border bg-background/80 px-4 backdrop-blur-xl sm:px-6 lg:px-8">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="flex size-10 items-center justify-center rounded-lg border border-border bg-card lg:hidden"
          >
            <Menu className="size-5" aria-hidden="true" />
            <span className="sr-only">Abrir menu</span>
          </button>
          <Link href="/inicio" className="lg:hidden" aria-label="IA Vendedor — Início">
            <BrandLogo />
          </Link>
          <div className="ml-auto flex items-center gap-2">
            <Link href="/criar-campanha" className="btn-primary hidden h-10 sm:inline-flex">
              Nova campanha
            </Link>
            <button
              type="button"
              className="relative flex size-10 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground hover:text-foreground"
            >
              <Bell className="size-4.5" aria-hidden="true" />
              <span className="absolute top-2 right-2.5 size-2 rounded-full bg-primary ring-2 ring-card" />
              <span className="sr-only">Notificações</span>
            </button>
          </div>
        </header>

        <main className="mx-auto w-full max-w-7xl px-4 pt-6 pb-28 sm:px-6 lg:px-8 lg:pb-12">{children}</main>
      </div>

      <nav
        aria-label="Navegação rápida"
        className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-sidebar/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl lg:hidden"
      >
        <ul className="grid grid-cols-5">
          {mobileNavItems.map((item) => {
            const active = isActivePath(pathname, item.href)
            const Icon = item.icon
            const isCreate = item.href === '/criar-campanha'
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active ? 'page' : undefined}
                  className={cn(
                    'flex flex-col items-center gap-1 px-1 py-2.5 text-[10px] font-medium',
                    active ? 'text-primary' : 'text-muted-foreground',
                  )}
                >
                  {isCreate ? (
                    <span className="-mt-6 flex size-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/40 ring-4 ring-background">
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                  ) : (
                    <Icon className="size-5" aria-hidden="true" />
                  )}
                  <span className="truncate">{isCreate ? 'Criar' : item.label}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </div>
  )
}
