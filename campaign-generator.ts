import type { Company } from '@/lib/data/catalog'
import type { Product } from '@/lib/demo-data'
import { formatBRL } from '@/lib/demo-data'
import type { GeneratedCampaign, ValidCampaignInput } from '@/lib/campaigns/types'

export type CampaignContext = {
  input: ValidCampaignInput
  product: Product
  company: Company
}

export type CampaignContent = Omit<GeneratedCampaign, 'id' | 'createdAt' | 'input' | 'product'>

/**
 * Contract for any campaign generator. To connect a real AI later, implement this
 * interface (e.g. with the AI SDK's generateObject) and return it from getCampaignGenerator().
 */
export interface CampaignGenerator {
  generate(context: CampaignContext): Promise<CampaignContent>
}

const pick = <T,>(options: readonly T[], variation: number) => options[variation % options.length]

function toHashtag(value: string) {
  const clean = value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9 ]/g, '')
    .split(' ')
    .filter(Boolean)
    .map((w) => w[0].toUpperCase() + w.slice(1).toLowerCase())
    .join('')
  return clean ? `#${clean}` : ''
}

function buildContent({ input, product, company }: CampaignContext): CampaignContent {
  const v = input.variation
  const price = formatBRL(input.price)
  const name = product.name
  const offer = input.offer?.trim()
  const offerLine = offer ? ` ${offer}.` : ''
  const city = company.city

  const titles: Record<ValidCampaignInput['objective'], string[]> = {
    vendas: [`${name} por apenas ${price}`, `Peça já: ${name}`, `${name}: o favorito da casa`],
    clientes: [`Conheça a ${company.name}`, `Novo por aqui? Comece pelo ${name}`, `O segredo de ${city} tem nome`],
    lancamento: [`Chegou: ${name}`, `Novidade na ${company.name}`, `Lançamento: ${name}`],
    promocao: [`Só hoje: ${name} por ${price}`, `Oferta relâmpago: ${name}`, `Últimas unidades: ${name}`],
  }

  const salesTexts: Record<ValidCampaignInput['objective'], string[]> = {
    vendas: [
      `${product.description} Na ${company.name}, cada pedido é preparado com cuidado para chegar perfeito até você. Garanta o seu ${name} por ${price}.${offerLine} Faça seu pedido agora e surpreenda quem você ama.`,
      `Quer acertar em cheio? O ${name} é um dos queridinhos dos nossos clientes. ${product.description} Tudo isso por ${price}.${offerLine} Peça hoje mesmo pelo WhatsApp.`,
    ],
    clientes: [
      `Ainda não conhece a ${company.name}? Somos uma ${company.segment.toLowerCase()} em ${city} e queremos te conquistar com o ${name}: ${product.description.charAt(0).toLowerCase()}${product.description.slice(1)} Experimente por ${price}.${offerLine}`,
      `Tem gente em ${city} que já não vive sem o nosso ${name}. ${product.description} Prove por ${price} e descubra por que nossos clientes sempre voltam.${offerLine}`,
    ],
    lancamento: [
      `É oficial: o ${name} acaba de chegar na ${company.name}! ${product.description} Disponível a partir de hoje por ${price}.${offerLine} Seja um dos primeiros a experimentar.`,
      `Preparamos algo novo com muito carinho. Apresentamos o ${name}: ${product.description.charAt(0).toLowerCase()}${product.description.slice(1)} Lançamento por ${price}.${offerLine}`,
    ],
    promocao: [
      `Promoção relâmpago na ${company.name}! O ${name} sai por apenas ${price}, mas só enquanto durar o estoque.${offerLine} ${product.description} Corra e garanta o seu antes que acabe.`,
      `Atenção: oferta por tempo limitado! ${name} por ${price}.${offerLine} ${product.description} Depois que acabar, só na próxima.`,
    ],
  }

  const captionHooks: Record<ValidCampaignInput['objective'], string[]> = {
    vendas: ['Já escolheu o seu?', 'Esse aqui não fica muito tempo na vitrine.', 'Pedido feito, sorriso garantido.'],
    clientes: ['Prazer, somos a ' + company.name + '.', 'Se você é de ' + city + ', precisa conhecer.', 'Vem provar com a gente.'],
    lancamento: ['Novidade fresquinha chegando!', 'A espera acabou.', 'Lançamento que vocês pediram.'],
    promocao: ['Corre que é por pouco tempo!', 'Oferta relâmpago no ar.', 'Só hoje, só aqui.'],
  }

  const ctaByChannel = {
    instagram: 'Peça pelo link na bio ou chame no direct.',
    facebook: 'Clique em "Enviar mensagem" e faça seu pedido.',
    whatsapp: `Chame no WhatsApp: ${company.whatsapp}.`,
  } as const

  const hashtags = Array.from(
    new Set(
      [toHashtag(product.category), toHashtag(name), toHashtag(company.name), toHashtag(city), toHashtag(company.segment)].filter(Boolean),
    ),
  )

  const captionText = [
    pick(captionHooks[input.objective], v),
    '',
    `${name} por ${price}.${offerLine}`,
    product.description,
    '',
    `Entrega em ${city} e região.`,
    ctaByChannel[input.channel],
  ].join('\n')

  const hooks = [
    `Você ainda não provou o ${name}?`,
    `Para tudo! Olha o que acabou de sair aqui na ${company.name}.`,
    `3 motivos para pedir o ${name} hoje.`,
  ]

  const reelCta =
    input.channel === 'whatsapp' ? 'Peça agora pelo WhatsApp.' : input.channel === 'facebook' ? 'Mande uma mensagem na página.' : 'Link na bio!'

  const hook = pick(hooks, v)

  const whatsappMessages = [
    `Oi! Aqui é da ${company.name}. Passando para te contar que o ${name} está saindo por ${price}.${offerLine} Quer que eu separe o seu? É só responder esta mensagem.`,
    `Olá! Tudo bem? Temos uma novidade especial para você: ${name} por ${price}.${offerLine} ${product.description} Posso anotar o seu pedido?`,
  ]

  return {
    title: pick(titles[input.objective], v),
    salesText: pick(salesTexts[input.objective], v),
    instagramCaption: { text: captionText, hashtags },
    reelScript: {
      duration: '30 segundos',
      hook,
      scenes: [
        { time: '0–3s', visual: `Close de impacto no ${name}.`, narration: `"${hook}"` },
        { time: '3–12s', visual: 'Bastidores: mãos preparando e finalizando o produto.', narration: `"${product.description}"` },
        { time: '12–22s', visual: 'Produto embalado sendo entregue a um cliente sorrindo.', narration: `"Feito com carinho pela ${company.name}, aqui em ${city}."` },
        { time: '22–30s', visual: `Logo da loja com o preço ${price} em destaque.`, narration: `"Por apenas ${price}.${offerLine} ${reelCta}"` },
      ],
      cta: reelCta,
    },
    whatsappMessage: pick(whatsappMessages, v),
  }
}

const mockCampaignGenerator: CampaignGenerator = {
  async generate(context) {
    return buildContent(context)
  },
}

export function getCampaignGenerator(): CampaignGenerator {
  return mockCampaignGenerator
}
