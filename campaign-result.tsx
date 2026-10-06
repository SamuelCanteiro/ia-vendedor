'use client'

import { useState, useTransition } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Camera, Clapperboard, FileText, Loader2, MessageCircle, Plus, RefreshCw, Sparkles, Type } from 'lucide-react'
import { CopyButton } from '@/components/copy-button'
import { BrandLogo } from '@/components/brand-logo'
import { generateCampaign } from '@/app/(app)/criar-campanha/actions'
import { campaignStore, useCampaign } from '@/lib/campaigns/campaign-store'
import { channelLabel, objectiveLabel, type GeneratedCampaign } from '@/lib/campaigns/types'
import { demoCompany, formatBRL } from '@/lib/demo-data'
import { cn } from '@/lib/utils'

export function StoredCampaignResult({ id }: { id: string }) {
  const { data, isLoading } = useCampaign(id)

  if (isLoading) {
    return (
      <div className="panel flex min-h-[40dvh] items-center justify-center" aria-live="polite">
        <Loader2 className="size-6 animate-spin text-primary" aria-hidden="true" />
        <span className="sr-only">Carregando campanha</span>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="panel flex flex-col items-center gap-3 p-8 text-center">
        <h1 className="text-lg font-semibold">Campanha não encontrada</h1>
        <p className="max-w-sm text-sm text-muted-foreground">
          Nesta versão de demonstração as campanhas ficam salvas apenas durante a sessão do navegador.
        </p>
        <Link href="/criar-campanha" className="btn-primary mt-2">
          <Plus className="size-4" aria-hidden="true" />
          Criar campanha
        </Link>
      </div>
    )
  }

  return <CampaignResultView campaign={data} />
}

export function CampaignResultView({ campaign, isSample = false }: { campaign: GeneratedCampaign; isSample?: boolean }) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)

  function regenerate() {
    setError(null)
    startTransition(async () => {
      const result = await generateCampaign({ ...campaign.input, variation: campaign.input.variation + 1 })
      if (!result.ok) {
        setError(result.message)
        return
      }
      await campaignStore.save(result.campaign)
      router.replace(`/campanha/resultado?id=${result.campaign.id}`)
    })
  }

  const caption = `${campaign.instagramCaption.text}\n\n${campaign.instagramCaption.hashtags.join(' ')}`
  const script = [
    `Gancho: ${campaign.reelScript.hook}`,
    ...campaign.reelScript.scenes.map((s) => `${s.time} | ${s.visual} | ${s.narration}`),
    `CTA: ${campaign.reelScript.cta}`,
  ].join('\n')

  return (
    <div className="flex flex-col gap-6">
      <header className="panel relative overflow-hidden p-5 sm:p-6">
        <div aria-hidden="true" className="pointer-events-none absolute -top-20 -right-10 size-56 rounded-full bg-primary/25 blur-[80px]" />
        <div className="relative flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-3">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-success/15 text-success">
              <Sparkles className="size-5" aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <p className="text-sm text-success">{isSample ? 'Exemplo de campanha' : 'Campanha pronta!'}</p>
              <h1 className="text-xl font-bold tracking-tight text-balance sm:text-2xl">{campaign.title}</h1>
              <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="Resumo da campanha">
                {[
                  campaign.product.name,
                  formatBRL(campaign.input.price),
                  objectiveLabel(campaign.input.objective),
                  channelLabel(campaign.input.channel),
                ].map((tag) => (
                  <li key={tag} className="rounded-full border border-border bg-background/60 px-2.5 py-1 text-xs text-muted-foreground">
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row lg:shrink-0">
            <button type="button" onClick={regenerate} disabled={isPending} className="btn-outline">
              <RefreshCw className={cn('size-4', isPending && 'animate-spin')} aria-hidden="true" />
              {isPending ? 'Gerando...' : 'Gerar outra versão'}
            </button>
            <Link href="/criar-campanha" className="btn-primary">
              <Plus className="size-4" aria-hidden="true" />
              Nova campanha
            </Link>
          </div>
        </div>
        {error && (
          <p role="alert" className="relative mt-4 text-sm text-destructive">
            {error}
          </p>
        )}
      </header>

      <div className={cn('grid gap-4 transition-opacity lg:grid-cols-2', isPending && 'pointer-events-none opacity-50')} aria-busy={isPending}>
        <ResultCard icon={Type} title="Título" copyText={campaign.title} className="lg:col-span-2">
          <p className="text-lg font-bold text-balance">{campaign.title}</p>
        </ResultCard>

        <ResultCard icon={FileText} title="Texto de venda" copyText={campaign.salesText} className="lg:col-span-2">
          <p className="text-sm leading-relaxed text-muted-foreground">{campaign.salesText}</p>
        </ResultCard>

        <ResultCard
          icon={Camera}
          title="Legenda para Instagram"
          copyText={caption}
          highlight={campaign.input.channel === 'instagram'}
        >
          <div className="overflow-hidden rounded-xl border border-border bg-background/40">
            <div className="flex items-center gap-3 border-b border-border p-3">
              <BrandLogo compact />
              <p className="text-sm font-semibold">{demoCompany.instagram}</p>
            </div>
            <div className="p-3">
              <p className="text-sm leading-relaxed whitespace-pre-line">{campaign.instagramCaption.text}</p>
              <p className="mt-3 text-sm break-words text-primary">{campaign.instagramCaption.hashtags.join(' ')}</p>
            </div>
          </div>
        </ResultCard>

        <ResultCard icon={MessageCircle} title="Mensagem para WhatsApp" copyText={campaign.whatsappMessage} highlight={campaign.input.channel === 'whatsapp'}>
          <div className="rounded-xl bg-background/40 p-3">
            <p className="ml-auto max-w-[90%] rounded-2xl rounded-tr-sm bg-primary/20 px-3.5 py-2.5 text-sm leading-relaxed">
              {campaign.whatsappMessage}
            </p>
          </div>
        </ResultCard>

        <ResultCard icon={Clapperboard} title={`Roteiro de Reel · ${campaign.reelScript.duration}`} copyText={script} className="lg:col-span-2">
          <ol className="relative flex flex-col gap-4 border-l border-border pl-5">
            {campaign.reelScript.scenes.map((scene) => (
              <li key={scene.time} className="relative">
                <span className="absolute top-1 -left-[25px] size-2.5 rounded-full bg-primary ring-4 ring-card" aria-hidden="true" />
                <p className="font-mono text-xs font-semibold text-primary">{scene.time}</p>
                <p className="mt-1 text-sm">{scene.visual}</p>
                <p className="mt-0.5 text-sm text-muted-foreground italic">{scene.narration}</p>
              </li>
            ))}
          </ol>
          <p className="mt-4 rounded-lg bg-primary/10 px-3 py-2 text-sm">
            <span className="font-semibold">Chamada final:</span> {campaign.reelScript.cta}
          </p>
        </ResultCard>
      </div>
    </div>
  )
}

type ResultCardProps = {
  icon: typeof Type
  title: string
  copyText: string
  highlight?: boolean
  className?: string
  children: React.ReactNode
}

function ResultCard({ icon: Icon, title, copyText, highlight, className, children }: ResultCardProps) {
  return (
    <section className={cn('panel flex flex-col p-5', highlight && 'border-primary/50', className)}>
      <div className="mb-4 flex items-center justify-between gap-2">
        <h2 className="flex min-w-0 items-center gap-2 text-sm font-semibold">
          <Icon className="size-4 shrink-0 text-primary" aria-hidden="true" />
          <span className="truncate">{title}</span>
          {highlight && <span className="shrink-0 rounded-full bg-primary/15 px-2 py-0.5 text-[10px] font-medium text-primary">Canal principal</span>}
        </h2>
        <CopyButton text={copyText} />
      </div>
      {children}
    </section>
  )
}
