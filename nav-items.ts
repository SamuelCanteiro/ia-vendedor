import {
  BarChart3,
  CalendarDays,
  FolderOpen,
  Home,
  MessageCircle,
  Settings,
  Store,
  WandSparkles,
} from 'lucide-react'

export const navItems = [
  { href: '/inicio', label: 'Início', icon: Home },
  { href: '/minha-loja', label: 'Minha loja', icon: Store },
  { href: '/criar-campanha', label: 'Criar campanha', icon: WandSparkles },
  { href: '/conteudo', label: 'Conteúdo', icon: FolderOpen },
  { href: '/atendimento', label: 'Atendimento IA', icon: MessageCircle },
  { href: '/calendario', label: 'Calendário', icon: CalendarDays },
  { href: '/estatisticas', label: 'Estatísticas', icon: BarChart3 },
  { href: '/configuracoes', label: 'Configurações', icon: Settings },
]

export const mobileNavItems = [navItems[0], navItems[1], navItems[2], navItems[3], navItems[6]]

export function isActivePath(pathname: string, href: string) {
  if (href === '/criar-campanha') return pathname.startsWith('/criar-campanha') || pathname.startsWith('/campanha')
  return pathname === href || pathname.startsWith(`${href}/`)
}
