'use client'

import { useEffect, useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Check,
  Camera,
  Megaphone,
  MessageCircle,
  Package,
  ShoppingBag,
  Sparkles,
  ThumbsUp,
  Users,
  WandSparkles,
  Zap,
  type LucideIcon,
} from 'lucide-react'
import { FormField } from '@/components/form-field'
import { generateCampaign } from '@/app/(app)/criar-campanha/actions'
import { campaignStore } from '@/lib/campaigns/campaign-store'
import {
  campaignChannels,
  campaignObjectives,
  type CampaignChannel,
  type CampaignFieldErrors,
  type CampaignObjective,
} from '@/lib/campaigns/types'
import { formatBRL, type Product } from '@/lib/demo-data'
import { cn } from '@/lib/utils'

const objectiveIcons: Record<CampaignObjective, LucideIcon> = {
  vendas: ShoppingBag,
  clientes: Users,
  lancamento: Megaphone,
  promocao: Zap,
}

const channelIcons: Record<CampaignChannel, LucideIcon> = {
  instagram: Camera,
  facebook: ThumbsUp,
  whatsapp: MessageCircle,
}

const steps = ['Produto e preço', 'Objetivo e canal']

const loadingMessages = [
  'Analisando seu produto e público...',
  'Escrevendo o texto de venda...',
  'Criando a legenda para Instagram...',
  'Montando o roteiro do Reel...',
  'Preparando a mensagem de WhatsApp...',
]

function priceToInput(value: number) {
  return value.toFixed(2).replace('.', ',')
}

function parsePrice(raw: string) {
  const normalized = raw.includes(',') ? raw.replace(/\./g, '').replace(',', '.') : raw
  const value = Number.parseFloat(normalized.replace(/[^\d.]/g, ''))
  return Number.isFinite(value) ? value : Number.NaN
}

type CampaignWizardProps = {
  products: Product[]
  initialProductId?: string
}

export function CampaignWizard({ products, initialProductId }: CampaignWizardProps) {
  const router = useRouter()
  const availableProducts = products.filter((p) => p.status !== 'Rascunho')
  const firstProduct = availableProducts.find((p) => p.id === initialProductId) ?? availableProducts[0]

  const [step, setStep] = useState(0)
  const [productId, setProductId] = useState(firstProduct?.id ?? '')
  const [price, setPrice] = useState(firstProduct ? priceToInput(firstProduct.price) : '')
  const [objective, setObjective] = useState<CampaignObjective>('vendas')
  const [channel, setChannel] = useState<CampaignChannel>('instagram')
  const [offer, setOffer] = useState('')
  const [errors, setErrors] = useState<CampaignFieldErrors>({})
  const [formError, setFormError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()
  const [msgIndex, setMsgIndex] = useState(0)

  useEffect(() => {
    if (!isPending) return
    setMsgIndex(0)
    const interval = setInterval(() => setMsgIndex((i) => Math.min(i + 1, loadingMessages.length - 1)), 450)
    return () => clearInterval(interval)
  }, [isPending])

  const selectedProduct = availableProducts.find((p) => p.id === productId)
  const parsedPrice = parsePrice(price)

  function selectProduct(product: Product) {
    setProductId(product.id)
    setPrice(priceToInput(product.price))
    setErrors((e) => ({ ...e, productId: undefined, price: undefined }))
  }

  function validateFirstStep() {
    const next: CampaignFieldErrors = {}
    if (!productId) next.productId = 'Selecione um produto.'
    if (!(parsedPrice > 0)) next.price = 'Informe um preço maior que zero.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setFormError(null)
    if (step === 0) {
      if (validateFirstStep()) setStep(1)
      return
    }

    startTransition(async () => {
      const result = await generateCampaign({
        productId,
        price: parsedPrice,
        objective,
        channel,
        offer: offer.trim() || undefined,
        variation: 0,
      })
      if (!result.ok) {
        setErrors(result.fieldErrors ?? {})
        setFormError(result.message)
        if (result.fieldErrors?.productId || result.fieldErrors?.price) setStep(0)
        return
      }
      await campaignStore.save(result.campaign)
      router.push(`/campanha/resultado?id=${result.campaign.id}`)
    })
  }

  if (isPending) {
    return (
      <div className="panel flex min-h-[60dvh] flex-col items-center justify-center p-8 text-center" aria-live="polite">
        <div className="relative flex size-24 items-center justify-center">
          <span className="absolute inset-0 animate-ping rounded-full bg-primary/20" />
          <span className="absolute inset-2 animate-pulse rounded-full bg-primary/25" />
          <span className="relative flex size-16 items-center justify-center rounded-2xl bg-primary shadow-xl shadow-primary/40">
            <Sparkles className="size-7 text-primary-foreground" aria-hidden="true" />
          </span>
        </div>
        <h2 className="mt-8 text-xl font-bold">A IA está criando sua campanha</h2>
        <p className="mt-2 text-sm text-muted-foreground">{loadingMessages[msgIndex]}</p>
        <div className="mt-6 h-1.5 w-full max-w-xs overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-primary transition-all duration-500"
            style={{ width: `${((msgIndex + 1) / loadingMessages.length) * 100}%` }}
          />
        </div>
      </div>
    )
  }

  if (availableProducts.length === 0) {
    return (
      <div className="panel flex flex-col items-center gap-3 p-8 text-center">
        <Package className="size-8 text-muted-foreground" aria-hidden="true" />
        <h2 className="font-semibold">Nenhum produto ativo</h2>
        <p className="text-sm text-muted-foreground">Cadastre um produto em Minha loja para criar sua primeira campanha.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
      <ol className="grid grid-cols-2 gap-2" aria-label="Etapas">
        {steps.map((s, i) => (
          <li key={s} className="flex flex-col gap-2" aria-current={i === step ? 'step' : undefined}>
            <div className={cn('h-1.5 rounded-full transition-colors', i <= step ? 'bg-primary' : 'bg-muted')} />
            <span className={cn('text-xs font-medium', i === step ? 'text-foreground' : 'text-muted-foreground')}>
              {i + 1}. {s}
            </span>
          </li>
        ))}
      </ol>

      {formError && (
        <div role="alert" className="flex items-start gap-2 rounded-xl border border-destructive/40 bg-destructive/10 p-3 text-sm">
          <AlertCircle className="mt-0.5 size-4 shrink-0 text-destructive" aria-hidden="true" />
          {formError}
        </div>
      )}

      {step === 0 && (
        <div className="flex flex-col gap-6">
          <fieldset className="panel p-5 sm:p-6" aria-describedby={errors.productId ? 'err-product' : undefined}>
            <legend className="sr-only">Produto</legend>
            <h2 className="font-semibold">Qual produto você quer divulgar?</h2>
            <p className="mt-1 mb-4 text-sm text-muted-foreground">Escolha um produto cadastrado na sua loja.</p>
            <div className="grid gap-2 sm:grid-cols-2">
              {availableProducts.map((p) => {
                const active = productId === p.id
                return (
                  <label
                    key={p.id}
                    className={cn(
                      'flex cursor-pointer items-center gap-3 rounded-xl border p-3.5 transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring',
                      active ? 'border-primary bg-primary/10' : 'border-border hover:border-input',
                    )}
                  >
                    <input type="radio" name="product" value={p.id} checked={active} onChange={() => selectProduct(p)} className="sr-only" />
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary">
                      <Package className="size-4.5" aria-hidden="true" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-medium">{p.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {p.category} · {formatBRL(p.price)}
                        {p.status === 'Esgotado' && ' · Esgotado'}
                      </span>
                    </span>
                    {active && <Check className="size-4 shrink-0 text-primary" aria-hidden="true" />}
                  </label>
                )
              })}
            </div>
            {errors.productId && (
              <p id="err-product" className="mt-3 text-sm text-destructive">
                {errors.productId}
              </p>
            )}
          </fieldset>

          <div className="panel p-5 sm:p-6">
            <h2 className="font-semibold">Preço da campanha</h2>
            <p className="mt-1 mb-4 text-sm text-muted-foreground">
              Use o preço normal ou informe um valor promocional para esta campanha.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <FormField label="Preço (R$)" htmlFor="w-price" hint={selectedProduct ? `Preço cadastrado: ${formatBRL(selectedProduct.price)}` : undefined}>
                <div className="relative">
                  <span className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-sm text-muted-foreground">R$</span>
                  <input
                    id="w-price"
                    name="price"
                    inputMode="decimal"
                    autoComplete="off"
                    className={cn('field pl-10', errors.price && 'border-destructive')}
                    value={price}
                    onChange={(e) => {
                      setPrice(e.target.value.replace(/[^\d.,]/g, ''))
                      setErrors((er) => ({ ...er, price: undefined }))
                    }}
                    aria-invalid={Boolean(errors.price)}
                    aria-describedby={errors.price ? 'err-price' : undefined}
                    placeholder="0,00"
                  />
                </div>
                {errors.price && (
                  <p id="err-price" className="text-sm text-destructive">
                    {errors.price}
                  </p>
                )}
              </FormField>
              <FormField label="Oferta ou diferencial (opcional)" htmlFor="w-offer" hint="Ex.: frete grátis, 10% OFF no Pix">
                <input
                  id="w-offer"
                  name="offer"
                  maxLength={120}
                  className="field"
                  value={offer}
                  onChange={(e) => setOffer(e.target.value)}
                  placeholder="Entrega grátis em BH"
                />
              </FormField>
            </div>
          </div>
        </div>
      )}

      {step === 1 && (
        <div className="flex flex-col gap-6">
          <fieldset className="panel p-5 sm:p-6">
            <legend className="sr-only">Objetivo</legend>
            <h2 className="mb-4 font-semibold">Qual é o objetivo da campanha?</h2>
            <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
              {campaignObjectives.map((o) => {
                const Icon = objectiveIcons[o.id]
                const active = objective === o.id
                return (
                  <label
                    key={o.id}
                    className={cn(
                      'flex cursor-pointer flex-col gap-3 rounded-xl border p-4 transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring',
                      active ? 'border-primary bg-primary/10' : 'border-border hover:border-input',
                    )}
                  >
                    <input type="radio" name="objective" value={o.id} checked={active} onChange={() => setObjective(o.id)} className="sr-only" />
                    <Icon className={cn('size-5', active ? 'text-primary' : 'text-muted-foreground')} aria-hidden="true" />
                    <span>
                      <span className="block text-sm font-semibold">{o.label}</span>
                      <span className="text-xs text-muted-foreground">{o.description}</span>
                    </span>
                  </label>
                )
              })}
            </div>
          </fieldset>

          <fieldset className="panel p-5 sm:p-6">
            <legend className="sr-only">Canal</legend>
            <h2 className="font-semibold">Qual canal principal?</h2>
            <p className="mt-1 mb-4 text-sm text-muted-foreground">A IA adapta a chamada para o canal escolhido.</p>
            <div className="grid grid-cols-3 gap-2">
              {campaignChannels.map((c) => {
                const Icon = channelIcons[c.id]
                const active = channel === c.id
                return (
                  <label
                    key={c.id}
                    className={cn(
                      'flex cursor-pointer flex-col items-center gap-2 rounded-xl border p-4 text-sm font-medium transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring',
                      active ? 'border-primary bg-primary/10' : 'border-border text-muted-foreground hover:border-input',
                    )}
                  >
                    <input type="radio" name="channel" value={c.id} checked={active} onChange={() => setChannel(c.id)} className="sr-only" />
                    <Icon className={cn('size-6', active && 'text-primary')} aria-hidden="true" />
                    {c.label}
                  </label>
                )
              })}
            </div>
          </fieldset>

          {selectedProduct && (
            <p className="text-center text-sm text-muted-foreground">
              Campanha para <span className="font-medium text-foreground">{selectedProduct.name}</span> por{' '}
              <span className="font-medium text-foreground">{formatBRL(parsedPrice)}</span>
            </p>
          )}
        </div>
      )}

      <div className="sticky bottom-20 z-10 flex gap-3 rounded-2xl border border-border bg-card/95 p-3 backdrop-blur-xl lg:bottom-4">
        {step > 0 && (
          <button type="button" onClick={() => setStep(step - 1)} className="btn-outline">
            <ArrowLeft className="size-4" aria-hidden="true" />
            <span className="hidden sm:inline">Voltar</span>
            <span className="sr-only sm:hidden">Voltar</span>
          </button>
        )}
        <button type="submit" className="btn-primary ml-auto flex-1 sm:flex-none">
          {step === 0 ? (
            <>
              Continuar <ArrowRight className="size-4" aria-hidden="true" />
            </>
          ) : (
            <>
              <WandSparkles className="size-4" aria-hidden="true" /> Gerar campanha
            </>
          )}
        </button>
      </div>
    </form>
  )
}
