'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowRight, Eye, EyeOff, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

type Mode = 'login' | 'cadastro'

export function AuthForm() {
  const router = useRouter()
  const [mode, setMode] = useState<Mode>('login')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => router.push(mode === 'login' ? '/inicio' : '/minha-loja'), 700)
  }

  return (
    <div className="w-full max-w-md">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          {mode === 'login' ? 'Bem-vindo de volta' : 'Crie sua conta grátis'}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {mode === 'login'
            ? 'Entre para continuar criando campanhas que vendem.'
            : 'Comece em menos de 2 minutos. Sem cartão de crédito.'}
        </p>
      </div>

      <div role="tablist" aria-label="Acesso" className="mb-6 grid grid-cols-2 rounded-xl border border-border bg-card p-1">
        {(['login', 'cadastro'] as const).map((m) => (
          <button
            key={m}
            type="button"
            role="tab"
            aria-selected={mode === m}
            onClick={() => setMode(m)}
            className={cn(
              'h-10 rounded-lg text-sm font-semibold transition-colors',
              mode === m ? 'bg-primary text-primary-foreground shadow' : 'text-muted-foreground hover:text-foreground',
            )}
          >
            {m === 'login' ? 'Entrar' : 'Cadastrar'}
          </button>
        ))}
      </div>

      <form key={mode} onSubmit={handleSubmit} className="flex flex-col gap-4">
        {mode === 'cadastro' && (
          <>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="name" className="text-sm font-medium">
                Seu nome
              </label>
              <input id="name" name="name" className="field" placeholder="Mariana Souza" autoComplete="name" required />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="business" className="text-sm font-medium">
                Nome do negócio
              </label>
              <input id="business" name="business" className="field" placeholder="Doces da Mari" required />
            </div>
          </>
        )}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="text-sm font-medium">
            E-mail
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className="field"
            placeholder="voce@seunegocio.com.br"
            autoComplete="email"
            defaultValue={mode === 'login' ? 'mariana@docesdamari.com.br' : undefined}
            required
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="text-sm font-medium">
              Senha
            </label>
            {mode === 'login' && (
              <button type="button" className="text-xs font-medium text-primary hover:underline">
                Esqueci minha senha
              </button>
            )}
          </div>
          <div className="relative">
            <input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              className="field pr-11"
              placeholder="Mínimo de 8 caracteres"
              autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
              defaultValue={mode === 'login' ? 'demonstracao' : undefined}
              minLength={8}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute inset-y-0 right-0 flex w-11 items-center justify-center text-muted-foreground hover:text-foreground"
            >
              {showPassword ? <EyeOff className="size-4" aria-hidden="true" /> : <Eye className="size-4" aria-hidden="true" />}
              <span className="sr-only">{showPassword ? 'Ocultar senha' : 'Mostrar senha'}</span>
            </button>
          </div>
        </div>

        {mode === 'cadastro' && (
          <label className="flex items-start gap-2.5 text-xs leading-relaxed text-muted-foreground">
            <input type="checkbox" required className="mt-0.5 size-4 accent-[var(--primary)]" />
            <span>
              Concordo com os <span className="text-foreground underline">Termos de uso</span> e a{' '}
              <span className="text-foreground underline">Política de privacidade</span>.
            </span>
          </label>
        )}

        <button type="submit" disabled={loading} className="btn-primary mt-2 h-12 w-full">
          {loading ? (
            <Loader2 className="size-4 animate-spin" aria-hidden="true" />
          ) : (
            <>
              {mode === 'login' ? 'Entrar na plataforma' : 'Criar minha conta'}
              <ArrowRight className="size-4" aria-hidden="true" />
            </>
          )}
        </button>

        <div className="relative my-2 text-center text-xs text-muted-foreground">
          <span className="relative z-10 bg-background px-3">ou</span>
          <span className="absolute inset-x-0 top-1/2 h-px bg-border" aria-hidden="true" />
        </div>

        <button type="button" onClick={() => router.push('/inicio')} className="btn-outline h-12 w-full">
          Explorar a demonstração
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        {mode === 'login' ? 'Ainda não tem conta? ' : 'Já tem uma conta? '}
        <button
          type="button"
          onClick={() => setMode(mode === 'login' ? 'cadastro' : 'login')}
          className="font-semibold text-primary hover:underline"
        >
          {mode === 'login' ? 'Cadastre-se grátis' : 'Entrar'}
        </button>
      </p>
    </div>
  )
}
