'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Package, Plus, Search, WandSparkles, X } from 'lucide-react'
import { FormField } from '@/components/form-field'
import { demoProducts, formatBRL, type Product } from '@/lib/demo-data'
import { cn } from '@/lib/utils'

const statusStyle: Record<Product['status'], string> = {
  Ativo: 'bg-success/12 text-success',
  Rascunho: 'bg-muted text-muted-foreground',
  Esgotado: 'bg-destructive/12 text-destructive',
}

export function ProductManager() {
  const [products, setProducts] = useState(demoProducts)
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)

  const filtered = products.filter((p) => p.name.toLowerCase().includes(query.toLowerCase()))

  function handleAdd(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const price = Number(String(data.get('price')).replace(',', '.')) || 0
    setProducts((prev) => [
      {
        id: crypto.randomUUID(),
        name: String(data.get('name')),
        category: String(data.get('category')),
        price,
        stock: Number(data.get('stock')) || 0,
        status: 'Ativo',
        description: String(data.get('description')),
      },
      ...prev,
    ])
    setOpen(false)
  }

  return (
    <>
      <div className="mb-4 flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
          <label htmlFor="product-search" className="sr-only">
            Buscar produto
          </label>
          <input
            id="product-search"
            className="field pl-10"
            placeholder="Buscar produto..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <button type="button" onClick={() => setOpen(true)} className="btn-primary">
          <Plus className="size-4" aria-hidden="true" />
          Novo produto
        </button>
      </div>

      <ul className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {filtered.map((p) => (
          <li key={p.id} className="panel flex flex-col p-5">
            <div className="flex items-start gap-3">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary/30 to-primary/5 text-primary">
                <Package className="size-5" aria-hidden="true" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate font-semibold">{p.name}</p>
                <p className="text-xs text-muted-foreground">{p.category}</p>
              </div>
              <span className={cn('rounded-full px-2.5 py-1 text-[11px] font-semibold', statusStyle[p.status])}>{p.status}</span>
            </div>
            <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-muted-foreground">{p.description}</p>
            <div className="mt-4 flex items-end justify-between border-t border-border pt-4">
              <div>
                <p className="text-lg font-bold">{formatBRL(p.price)}</p>
                <p className="text-xs text-muted-foreground">{p.stock} em estoque</p>
              </div>
              <Link
                href="/criar-campanha"
                className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-primary/12 px-3 text-xs font-semibold text-primary transition-colors hover:bg-primary/20"
              >
                <WandSparkles className="size-3.5" aria-hidden="true" />
                Divulgar
              </Link>
            </div>
          </li>
        ))}
      </ul>

      {filtered.length === 0 && (
        <p className="panel p-10 text-center text-sm text-muted-foreground">Nenhum produto encontrado.</p>
      )}

      {open && (
        <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-4" role="dialog" aria-modal="true" aria-labelledby="new-product-title">
          <button type="button" aria-label="Fechar" className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <form
            onSubmit={handleAdd}
            className="relative max-h-[92dvh] w-full overflow-y-auto rounded-t-2xl border border-border bg-popover p-5 animate-in slide-in-from-bottom-8 sm:max-w-lg sm:rounded-2xl sm:p-6"
          >
            <div className="mb-5 flex items-center justify-between">
              <h2 id="new-product-title" className="text-lg font-semibold">
                Cadastrar produto
              </h2>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="flex size-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-accent"
              >
                <X className="size-4" aria-hidden="true" />
                <span className="sr-only">Fechar</span>
              </button>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <FormField label="Nome do produto" htmlFor="p-name" className="sm:col-span-2">
                <input id="p-name" name="name" className="field" placeholder="Ex.: Bolo de Morango" required />
              </FormField>
              <FormField label="Categoria" htmlFor="p-cat">
                <select id="p-cat" name="category" className="field">
                  <option>Bolos</option>
                  <option>Docinhos</option>
                  <option>Tortas</option>
                  <option>Kits</option>
                </select>
              </FormField>
              <FormField label="Preço (R$)" htmlFor="p-price">
                <input id="p-price" name="price" inputMode="decimal" className="field" placeholder="0,00" required />
              </FormField>
              <FormField label="Estoque" htmlFor="p-stock">
                <input id="p-stock" name="stock" type="number" min={0} className="field" placeholder="0" />
              </FormField>
              <FormField label="Foto" htmlFor="p-photo">
                <input id="p-photo" type="file" accept="image/*" className="field pt-2.5 text-xs file:mr-2 file:rounded file:border-0 file:bg-secondary file:px-2 file:py-1 file:text-foreground" />
              </FormField>
              <FormField
                label="Descrição"
                htmlFor="p-desc"
                className="sm:col-span-2"
                hint="Dica: destaque ingredientes, diferenciais e para quem é o produto."
              >
                <textarea id="p-desc" name="description" className="field-area" rows={3} />
              </FormField>
            </div>
            <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <button type="button" onClick={() => setOpen(false)} className="btn-outline">
                Cancelar
              </button>
              <button type="submit" className="btn-primary">
                Salvar produto
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  )
}
