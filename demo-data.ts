export const demoUser = {
  name: 'Mariana',
  fullName: 'Mariana Souza',
  email: 'mariana@docesdamari.com.br',
  initials: 'MS',
}

export const demoCompany = {
  name: 'Doces da Mari',
  segment: 'Confeitaria artesanal',
  city: 'Belo Horizonte',
  state: 'MG',
  whatsapp: '(31) 99876-5432',
  instagram: '@docesdamari',
  description:
    'Confeitaria artesanal especializada em bolos de festa, brigadeiros gourmet e doces finos para eventos. Ingredientes selecionados e receitas de família.',
  audience: 'Mulheres de 25 a 45 anos, mães e organizadoras de festas da região metropolitana de BH.',
  tone: 'Acolhedor',
}

export const dashboardStats = [
  { label: 'Visualizações', value: '24.580', delta: '+18,2%', positive: true },
  { label: 'Cliques', value: '3.412', delta: '+9,6%', positive: true },
  { label: 'Novos clientes', value: '187', delta: '+24,1%', positive: true },
  { label: 'Vendas', value: 'R$ 18.940', delta: '-2,3%', positive: false },
] as const

export const weeklyPerformance = [
  { day: 'Seg', views: 2800, clicks: 380 },
  { day: 'Ter', views: 3200, clicks: 420 },
  { day: 'Qua', views: 2900, clicks: 400 },
  { day: 'Qui', views: 4100, clicks: 610 },
  { day: 'Sex', views: 4600, clicks: 690 },
  { day: 'Sáb', views: 4300, clicks: 560 },
  { day: 'Dom', views: 2680, clicks: 352 },
]

export type Product = {
  id: string
  name: string
  category: string
  price: number
  stock: number
  status: 'Ativo' | 'Rascunho' | 'Esgotado'
  description: string
}

export const demoProducts: Product[] = [
  {
    id: 'p1',
    name: 'Bolo de Chocolate Belga',
    category: 'Bolos',
    price: 129.9,
    stock: 12,
    status: 'Ativo',
    description: 'Massa fofinha de cacau com recheio cremoso de chocolate belga 54%.',
  },
  {
    id: 'p2',
    name: 'Caixa com 12 Brigadeiros Gourmet',
    category: 'Docinhos',
    price: 54.0,
    stock: 40,
    status: 'Ativo',
    description: 'Seleção de sabores: tradicional, pistache, ninho com Nutella e café.',
  },
  {
    id: 'p3',
    name: 'Torta de Limão Siciliano',
    category: 'Tortas',
    price: 89.9,
    stock: 0,
    status: 'Esgotado',
    description: 'Base crocante amanteigada, creme de limão siciliano e merengue maçaricado.',
  },
  {
    id: 'p4',
    name: 'Kit Festa 50 pessoas',
    category: 'Kits',
    price: 459.0,
    stock: 5,
    status: 'Ativo',
    description: 'Bolo de 3kg, 100 docinhos e 50 mini bem-casados personalizados.',
  },
  {
    id: 'p5',
    name: 'Pão de Mel Artesanal',
    category: 'Docinhos',
    price: 8.5,
    stock: 60,
    status: 'Rascunho',
    description: 'Pão de mel com especiarias, recheado com doce de leite e banhado no chocolate.',
  },
]

export const recentCampaigns = [
  { id: 'c1', name: 'Dia das Mães Doce', channel: 'Instagram', status: 'Ativa', reach: '12,4 mil', date: '02/06' },
  { id: 'c2', name: 'Promo Brigadeiro Sexta', channel: 'WhatsApp', status: 'Concluída', reach: '3,1 mil', date: '28/05' },
  { id: 'c3', name: 'Lançamento Torta de Limão', channel: 'Facebook', status: 'Agendada', reach: '—', date: '15/06' },
]

export const aiSuggestions = [
  'Sexta-feira tem 32% mais cliques: agende sua próxima oferta para as 18h.',
  'Seus Reels com vídeo de preparo têm 2,4x mais alcance que fotos.',
  'O Dia dos Namorados está chegando — que tal uma campanha de caixa especial?',
]

export const campaignResult = {
  title: 'Dia dos Namorados Doce',
  product: 'Caixa com 12 Brigadeiros Gourmet',
  objective: 'Aumentar vendas',
  channels: ['Instagram', 'WhatsApp', 'Facebook'],
  arts: [
    {
      id: 'a1',
      format: 'Feed 1:1',
      headline: 'Amor que derrete',
      sub: 'Caixa com 12 brigadeiros gourmet',
      cta: 'Peça já · R$ 54',
      style: 'from-[oklch(0.45_0.2_262)] to-[oklch(0.25_0.1_262)]',
      ratio: 'aspect-square',
    },
    {
      id: 'a2',
      format: 'Stories 9:16',
      headline: 'Surpreenda quem você ama',
      sub: 'Entrega no dia 12 de junho',
      cta: 'Arraste para cima',
      style: 'from-[oklch(0.6_0.17_250)] to-[oklch(0.3_0.12_265)]',
      ratio: 'aspect-[9/16]',
    },
    {
      id: 'a3',
      format: 'Carrossel 4:5',
      headline: '4 sabores, 1 paixão',
      sub: 'Tradicional · Pistache · Ninho · Café',
      cta: 'Arraste para o lado',
      style: 'from-[oklch(0.35_0.15_270)] to-[oklch(0.18_0.05_262)]',
      ratio: 'aspect-[4/5]',
    },
  ],
  texts: [
    {
      id: 't1',
      label: 'Anúncio principal',
      content:
        'Neste Dia dos Namorados, diga "eu te amo" do jeito mais doce. 💙 Nossa caixa com 12 brigadeiros gourmet é feita à mão, com chocolate belga e muito carinho. Encomende até 10/06 e garanta a entrega no grande dia!',
    },
    {
      id: 't2',
      label: 'Mensagem para WhatsApp',
      content:
        'Oi! Aqui é da Doces da Mari 🍫 Separamos uma surpresa para o Dia dos Namorados: caixa com 12 brigadeiros gourmet por R$ 54. Quer reservar a sua? É só responder esta mensagem!',
    },
    {
      id: 't3',
      label: 'Título curto (anúncio)',
      content: 'Brigadeiros gourmet para o seu amor — R$ 54',
    },
  ],
  scripts: [
    {
      id: 'r1',
      label: 'Reels — 30 segundos',
      scenes: [
        { time: '0–3s', action: 'Close no brigadeiro sendo enrolado.', speech: '"Sabe qual é o presente que nunca erra?"' },
        { time: '3–10s', action: 'Mãos colocando confeitos e montando a caixa.', speech: '"Brigadeiro gourmet feito à mão, com chocolate belga."' },
        { time: '10–20s', action: 'Caixa fechada com laço azul, sendo entregue.', speech: '"12 sabores de carinho para o seu amor."' },
        { time: '20–30s', action: 'Logo da loja + preço na tela.', speech: '"Encomende até dia 10 pelo WhatsApp. Link na bio!"' },
      ],
    },
    {
      id: 'r2',
      label: 'Stories — 3 telas',
      scenes: [
        { time: 'Tela 1', action: 'Enquete: "Doce ou flores?"', speech: 'Gerar engajamento.' },
        { time: 'Tela 2', action: 'Vídeo da caixa abrindo.', speech: '"Por que não os dois? 😍"' },
        { time: 'Tela 3', action: 'Botão de link para o WhatsApp.', speech: '"Reserve a sua agora."' },
      ],
    },
  ],
  captions: [
    {
      id: 'l1',
      network: 'Instagram',
      content:
        'Amor que derrete na boca 💙🍫\n\nNossa caixa especial de Dia dos Namorados chegou: 12 brigadeiros gourmet feitos à mão com chocolate belga.\n\n📍 Entrega em BH\n📅 Encomendas até 10/06\n💬 Peça pelo link na bio',
      hashtags: '#DiaDosNamorados #BrigadeiroGourmet #DocesBH #PresenteCriativo #DocesDaMari',
    },
    {
      id: 'l2',
      network: 'Facebook',
      content:
        'Procurando um presente que vai fazer o seu amor sorrir? 💙 A Doces da Mari preparou uma caixa com 12 brigadeiros gourmet por apenas R$ 54. Encomende até 10/06 e receba em casa!',
      hashtags: '#DiaDosNamorados #BeloHorizonte #Confeitaria',
    },
  ],
}

export const calendarEvents = [
  { day: 3, title: 'Post: Bolo Belga', type: 'post' },
  { day: 7, title: 'Promo Sexta', type: 'campanha' },
  { day: 10, title: 'Prazo encomendas', type: 'lembrete' },
  { day: 12, title: 'Dia dos Namorados', type: 'campanha' },
  { day: 14, title: 'Reels bastidores', type: 'post' },
  { day: 19, title: 'Stories enquete', type: 'post' },
  { day: 24, title: 'São João: kit festa', type: 'campanha' },
  { day: 28, title: 'Relatório mensal', type: 'lembrete' },
] as const

export const conversations = [
  { id: 'm1', name: 'Juliana Prado', last: 'Vocês entregam no Buritis?', time: '10:42', unread: 2, ai: true },
  { id: 'm2', name: 'Carlos Henrique', last: 'Quero o kit festa para sábado', time: '09:15', unread: 0, ai: false },
  { id: 'm3', name: 'Fernanda Lima', last: 'Obrigada! Ficou lindo 😍', time: 'Ontem', unread: 0, ai: true },
  { id: 'm4', name: 'Rafael Costa', last: 'Qual o valor do bolo de 2kg?', time: 'Ontem', unread: 1, ai: true },
]

export const contentLibrary = [
  { id: 'k1', title: 'Amor que derrete', type: 'Arte', network: 'Instagram', date: '05/06' },
  { id: 'k2', title: 'Bastidores da confeitaria', type: 'Roteiro', network: 'Reels', date: '04/06' },
  { id: 'k3', title: 'Promo Brigadeiro Sexta', type: 'Texto', network: 'WhatsApp', date: '28/05' },
  { id: 'k4', title: 'Dia das Mães Doce', type: 'Legenda', network: 'Instagram', date: '02/05' },
  { id: 'k5', title: 'Torta de Limão chegou', type: 'Arte', network: 'Facebook', date: '30/04' },
  { id: 'k6', title: 'Kit Festa completo', type: 'Arte', network: 'Instagram', date: '22/04' },
]

export function formatBRL(value: number) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}
