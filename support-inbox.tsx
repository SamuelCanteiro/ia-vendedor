'use client'

import { useState } from 'react'
import { ArrowLeft, Bot, Send } from 'lucide-react'
import { conversations } from '@/lib/demo-data'
import { cn } from '@/lib/utils'

type Message = { from: 'cliente' | 'ia'; text: string }

const initialThread: Message[] = [
  { from: 'cliente', text: 'Oi! Vocês entregam no Buritis?' },
  {
    from: 'ia',
    text: 'Olá, Juliana! Entregamos sim no Buritis 💙 A taxa é R$ 8 e as entregas acontecem de terça a sábado. Posso ajudar com alguma encomenda?',
  },
  { from: 'cliente', text: 'Quero a caixa de brigadeiros pro dia dos namorados' },
]

export function SupportInbox() {
  const [active, setActive] = useState<string | null>('m1')
  const [aiOn, setAiOn] = useState(true)
  const [thread, setThread] = useState(initialThread)
  const [draft, setDraft] = useState('')
  const current = conversations.find((c) => c.id === active)

  function send(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!draft.trim()) return
    setThread((t) => [...t, { from: 'ia', text: draft.trim() }])
    setDraft('')
  }

  return (
    <div className="panel grid h-[calc(100dvh-15rem)] min-h-[460px] overflow-hidden lg:h-[calc(100dvh-12rem)] lg:grid-cols-[320px_1fr]">
      <aside className={cn('flex flex-col border-r border-border', active && 'hidden lg:flex')} aria-label="Conversas">
        <div className="flex items-center justify-between border-b border-border p-4">
          <span className="text-sm font-semibold">Respostas automáticas</span>
          <button
            type="button"
            role="switch"
            aria-checked={aiOn}
            onClick={() => setAiOn(!aiOn)}
            className={cn('relative h-6 w-11 rounded-full transition-colors', aiOn ? 'bg-primary' : 'bg-muted')}
          >
            <span className={cn('absolute top-0.5 size-5 rounded-full bg-white transition-all', aiOn ? 'left-5.5' : 'left-0.5')} />
            <span className="sr-only">Ativar IA</span>
          </button>
        </div>
        <ul className="flex-1 overflow-y-auto">
          {conversations.map((c) => (
            <li key={c.id}>
              <button
                type="button"
                onClick={() => setActive(c.id)}
                className={cn(
                  'flex w-full items-center gap-3 border-b border-border p-4 text-left transition-colors hover:bg-accent/50',
                  active === c.id && 'bg-accent/70',
                )}
              >
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-secondary text-sm font-semibold">
                  {c.name.split(' ').map((n) => n[0]).join('')}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-center justify-between gap-2">
                    <span className="truncate text-sm font-medium">{c.name}</span>
                    <span className="text-[11px] text-muted-foreground">{c.time}</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    {c.ai && <Bot className="size-3 shrink-0 text-primary" aria-label="Respondido pela IA" />}
                    <span className="truncate text-xs text-muted-foreground">{c.last}</span>
                  </span>
                </span>
                {c.unread > 0 && (
                  <span className="flex size-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                    {c.unread}
                  </span>
                )}
              </button>
            </li>
          ))}
        </ul>
      </aside>

      <section className={cn('flex min-h-0 flex-col', !active && 'hidden lg:flex')} aria-label="Conversa">
        {current ? (
          <>
            <header className="flex items-center gap-3 border-b border-border p-4">
              <button
                type="button"
                onClick={() => setActive(null)}
                className="flex size-8 items-center justify-center rounded-lg hover:bg-accent lg:hidden"
              >
                <ArrowLeft className="size-4" aria-hidden="true" />
                <span className="sr-only">Voltar</span>
              </button>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold">{current.name}</p>
                <p className="text-xs text-muted-foreground">via WhatsApp</p>
              </div>
              <span className="flex items-center gap-1.5 rounded-full bg-primary/12 px-2.5 py-1 text-[11px] font-medium text-primary">
                <Bot className="size-3" aria-hidden="true" />
                {aiOn ? 'IA ativa' : 'IA pausada'}
              </span>
            </header>
            <div className="flex flex-1 flex-col gap-3 overflow-y-auto p-4">
              {thread.map((m, i) => (
                <div
                  key={i}
                  className={cn(
                    'max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed',
                    m.from === 'cliente' ? 'self-start rounded-bl-sm bg-secondary' : 'self-end rounded-br-sm bg-primary text-primary-foreground',
                  )}
                >
                  {m.text}
                </div>
              ))}
              {aiOn && (
                <div className="self-end rounded-xl border border-dashed border-primary/40 px-3 py-2 text-xs text-muted-foreground">
                  Sugestão da IA: {'"'}Perfeito! A caixa custa R$ 54. Para qual endereço envio?{'"'}
                </div>
              )}
            </div>
            <form onSubmit={send} className="flex gap-2 border-t border-border p-3">
              <label htmlFor="reply" className="sr-only">
                Mensagem
              </label>
              <input
                id="reply"
                className="field flex-1"
                placeholder="Escreva uma resposta..."
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
              />
              <button type="submit" className="btn-primary w-11 px-0">
                <Send className="size-4" aria-hidden="true" />
                <span className="sr-only">Enviar</span>
              </button>
            </form>
          </>
        ) : (
          <p className="m-auto text-sm text-muted-foreground">Selecione uma conversa</p>
        )}
      </section>
    </div>
  )
}
