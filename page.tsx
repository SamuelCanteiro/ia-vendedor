import { PageHeader } from '@/components/page-header'
import { StoreTabs } from '@/components/store/store-tabs'
import { ProductManager } from '@/components/store/product-manager'

export default function ProdutosPage() {
  return (
    <>
      <PageHeader
        eyebrow="Minha loja"
        title="Cadastro de produtos"
        description="Cadastre o que você vende para a IA criar campanhas focadas em cada produto."
      />
      <StoreTabs />
      <ProductManager />
    </>
  )
}
