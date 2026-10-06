import { z } from 'zod'

export const campaignObjectives = [
  { id: 'vendas', label: 'Aumentar vendas', description: 'Ofertas e chamadas diretas para compra' },
  { id: 'clientes', label: 'Atrair clientes', description: 'Alcançar novas pessoas na sua região' },
  { id: 'lancamento', label: 'Lançar produto', description: 'Gerar expectativa e novidade' },
  { id: 'promocao', label: 'Promoção relâmpago', description: 'Oferta com prazo curto e urgência' },
] as const

export const campaignChannels = [
  { id: 'instagram', label: 'Instagram' },
  { id: 'facebook', label: 'Facebook' },
  { id: 'whatsapp', label: 'WhatsApp' },
] as const

export type CampaignObjective = (typeof campaignObjectives)[number]['id']
export type CampaignChannel = (typeof campaignChannels)[number]['id']

const objectiveIds = campaignObjectives.map((o) => o.id) as [CampaignObjective, ...CampaignObjective[]]
const channelIds = campaignChannels.map((c) => c.id) as [CampaignChannel, ...CampaignChannel[]]

export const campaignInputSchema = z.object({
  productId: z.string().min(1, 'Selecione um produto.'),
  price: z
    .number({ error: 'Informe um preço válido.' })
    .positive('O preço precisa ser maior que zero.')
    .max(1_000_000, 'Preço muito alto.'),
  objective: z.enum(objectiveIds, { error: 'Escolha um objetivo.' }),
  channel: z.enum(channelIds, { error: 'Escolha um canal.' }),
  offer: z.string().trim().max(120, 'Use no máximo 120 caracteres.').optional(),
  variation: z.number().int().min(0).max(50).default(0),
})

export type CampaignInput = z.input<typeof campaignInputSchema>
export type ValidCampaignInput = z.output<typeof campaignInputSchema>

export type ReelScene = {
  time: string
  visual: string
  narration: string
}

export type GeneratedCampaign = {
  id: string
  createdAt: string
  input: ValidCampaignInput
  product: { id: string; name: string; category: string }
  title: string
  salesText: string
  instagramCaption: { text: string; hashtags: string[] }
  reelScript: { duration: string; hook: string; scenes: ReelScene[]; cta: string }
  whatsappMessage: string
}

export type CampaignFieldErrors = Partial<Record<keyof CampaignInput, string>>

export type GenerateCampaignResult =
  | { ok: true; campaign: GeneratedCampaign }
  | { ok: false; message: string; fieldErrors?: CampaignFieldErrors }

export function objectiveLabel(id: CampaignObjective) {
  return campaignObjectives.find((o) => o.id === id)?.label ?? id
}

export function channelLabel(id: CampaignChannel) {
  return campaignChannels.find((c) => c.id === id)?.label ?? id
}
