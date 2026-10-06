import { getCampaignGenerator } from '@/lib/ai/campaign-generator'
import { getCompany, getProductById } from '@/lib/data/catalog'
import { campaignInputSchema, type CampaignFieldErrors, type CampaignInput, type GenerateCampaignResult } from '@/lib/campaigns/types'

export async function createCampaign(rawInput: CampaignInput): Promise<GenerateCampaignResult> {
  const parsed = campaignInputSchema.safeParse(rawInput)
  if (!parsed.success) {
    const fieldErrors: CampaignFieldErrors = {}
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as keyof CampaignInput
      if (key && !fieldErrors[key]) fieldErrors[key] = issue.message
    }
    return { ok: false, message: 'Revise os campos destacados.', fieldErrors }
  }

  const input = parsed.data
  const [product, company] = await Promise.all([getProductById(input.productId), getCompany()])
  if (!product) {
    return { ok: false, message: 'Produto não encontrado.', fieldErrors: { productId: 'Produto não encontrado.' } }
  }

  try {
    const content = await getCampaignGenerator().generate({ input, product, company })
    return {
      ok: true,
      campaign: {
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
        input,
        product: { id: product.id, name: product.name, category: product.category },
        ...content,
      },
    }
  } catch {
    return { ok: false, message: 'Não foi possível gerar a campanha agora. Tente novamente.' }
  }
}
