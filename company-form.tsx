'use client'

import { useState } from 'react'
import { Check, ImagePlus, Loader2 } from 'lucide-react'
import { FormField, FormSection } from '@/components/form-field'
import { demoCompany } from '@/lib/demo-data'
import { cn } from '@/lib/utils'

const tones = ['Acolhedor', 'Profissional', 'Divertido', 'Sofisticado', 'Direto']
const segments = [
  'Confeitaria artesanal',
  'Moda e acessórios',
  'Beleza e estética',
  'Alimentação',
  'Serviços',
  'Pet shop',
  'Outro',
]

export function CompanyForm() {
  const [tone, setTone] = useState(demoCompany.tone)
  const [state, setState] = useState<'idle' | 'saving' | 'saved'>('idle')

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setState('saving')
    setTimeout(() => {
      setState('saved')
      setTimeout(() => setState('idle'), 2000)
    }, 800)
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-6 lg:grid-cols-3">
      <div className="flex flex-col gap-6 lg:col-span-2">
        <FormSection title="Informações básicas" description="Esses dados aparecem nas artes e textos gerados pela IA.">
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField label="Nome da empresa" htmlFor="c-name">
              <input id="c-name" className="field" defaultValue={demoCompany.name} required />
            </FormField>
            <FormField label="Segmento" htmlFor="c-segment">
              <select id="c-segment" className="field" defaultValue={demoCompany.segment}>
                {segments.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </FormField>
            <FormField label="Cidade" htmlFor="c-city">
              <input id="c-city" className="field" defaultValue={demoCompany.city} />
            </FormField>
            <FormField label="Estado" htmlFor="c-state">
              <input id="c-state" className="field" defaultValue={demoCompany.state} maxLength={2} />
            </FormField>
            <FormField label="WhatsApp" htmlFor="c-whats">
              <input id="c-whats" type="tel" className="field" defaultValue={demoCompany.whatsapp} />
            </FormField>
            <FormField label="Instagram" htmlFor="c-insta">
              <input id="c-insta" className="field" defaultValue={demoCompany.instagram} />
            </FormField>
            <FormField label="Sobre o negócio" htmlFor="c-desc" className="sm:col-span-2">
              <textarea id="c-desc" className="field-area" rows={4} defaultValue={demoCompany.description} />
            </FormField>
          </div>
        </FormSection>

        <FormSection title="Público e tom de voz" description="Ajuda a IA a escrever do jeito que seus clientes gostam.">
          <div className="flex flex-col gap-5">
            <FormField label="Quem é seu cliente ideal?" htmlFor="c-audience">
              <textarea id="c-audience" className="field-area" rows={3} defaultValue={demoCompany.audience} />
            </FormField>
            <fieldset>
              <legend className="mb-2 text-sm font-medium">Tom de voz</legend>
              <div className="flex flex-wrap gap-2">
                {tones.map((t) => (
                  <button
                    key={t}
                    type="button"
                    aria-pressed={tone === t}
                    onClick={() => setTone(t)}
                    className={cn(
                      'rounded-full border px-4 py-2 text-sm font-medium transition-colors',
                      tone === t
                        ? 'border-primary bg-primary/15 text-foreground'
                        : 'border-border text-muted-foreground hover:text-foreground',
                    )}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </fieldset>
          </div>
        </FormSection>
      </div>

      <div className="flex flex-col gap-6">
        <FormSection title="Identidade visual">
          <div className="flex flex-col gap-5">
            <button
              type="button"
              className="flex aspect-square w-full flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-input bg-background/50 text-sm text-muted-foreground transition-colors hover:border-primary hover:text-foreground"
            >
              <ImagePlus className="size-6" aria-hidden="true" />
              Enviar logotipo
              <span className="text-xs">PNG ou SVG até 2 MB</span>
            </button>
            <div>
              <p className="mb-2 text-sm font-medium">Cores da marca</p>
              <div className="flex gap-2">
                {['#2563eb', '#0f172a', '#f8fafc', '#38bdf8'].map((c) => (
                  <span key={c} className="size-9 rounded-lg border border-border" style={{ backgroundColor: c }} title={c} />
                ))}
              </div>
            </div>
          </div>
        </FormSection>

        <div className="lg:sticky lg:top-24">
          <button type="submit" disabled={state === 'saving'} className="btn-primary h-12 w-full">
            {state === 'saving' && <Loader2 className="size-4 animate-spin" aria-hidden="true" />}
            {state === 'saved' && <Check className="size-4" aria-hidden="true" />}
            {state === 'saved' ? 'Dados salvos!' : 'Salvar alterações'}
          </button>
          <p className="mt-2 text-center text-xs text-muted-foreground" aria-live="polite">
            Modo demonstração — nada é salvo de verdade.
          </p>
        </div>
      </div>
    </form>
  )
}
