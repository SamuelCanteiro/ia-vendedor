import { demoCompany, demoProducts, type Product } from '@/lib/demo-data'

export type Company = typeof demoCompany

// Data access layer: swap these demo implementations for database queries later.
export async function getProducts(): Promise<Product[]> {
  return demoProducts
}

export async function getProductById(id: string): Promise<Product | null> {
  return demoProducts.find((p) => p.id === id) ?? null
}

export async function getCompany(): Promise<Company> {
  return demoCompany
}
