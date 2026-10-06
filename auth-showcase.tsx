import { CheckCircle2, TrendingUp, WandSparkles } from 'lucide-react'
import { BrandLogo } from '@/components/brand-logo'

const benefits = [
  'Artes, textos e roteiros prontos em minutos',
  'Legendas otimizadas para Instagram, WhatsApp e Facebook',
  'Atendimento com IA que responde seus clientes 24h',
]

export function AuthShowcase() {
  return (
    <div className="relative hidden overflow-hidden border-r border-border bg-sidebar lg:flex lg:flex-col lg:justify-between lg:p-12">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 -left-40 size-[36rem] rounded-full bg-primary/25 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,oklch(1_0_0/4%)_1px,transparent_1px),linear-gradient(to_bottom,oklch(1_0_0/4%)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_at_top_left,black,transparent_70%)]"
      />

      <BrandLogo className="relative" />

      <div className="relative max-w-lg">
        <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
          <WandSparkles className="size-3.5" aria-hidden="true" />
          Marketing com inteligência artificial
        </p>
        <h2 className="text-4xl leading-tight font-bold tracking-tight text-balance">
          Seu vendedor que nunca dorme, cria campanhas e atrai clientes.
        </h2>
        <ul className="mt-8 flex flex-col gap-3">
          {benefits.map((b) => (
            <li key={b} className="flex items-center gap-3 text-sm text-muted-foreground">
              <CheckCircle2 className="size-4.5 shrink-0 text-primary" aria-hidden="true" />
              {b}
            </li>
          ))}
        </ul>

        <div className="mt-10 grid grid-cols-2 gap-4">
          <div className="panel p-5">
            <p className="text-xs text-muted-foreground">Vendas no mês</p>
            <p className="mt-1 text-2xl font-bold">R$ 18.940</p>
            <p className="mt-1 flex items-center gap-1 text-xs font-medium text-success">
              <TrendingUp className="size-3.5" aria-hidden="true" />
              +32% com IA
            </p>
          </div>
          <div className="panel p-5">
            <p className="text-xs text-muted-foreground">Campanhas criadas</p>
            <p className="mt-1 text-2xl font-bold">+12 mil</p>
            <p className="mt-1 text-xs text-muted-foreground">por pequenos negócios</p>
          </div>
        </div>
      </div>

      <p className="relative text-xs text-muted-foreground">© 2026 IA Vendedor. Feito para quem empreende no Brasil.</p>
    </div>
  )
}
