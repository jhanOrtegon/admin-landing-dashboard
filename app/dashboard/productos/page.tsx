import { getProductos } from './_actions/get-product';
import { ProductClientPage } from './_components/product-client-page';

export default async function ProductPage() {
  const { productos } = await getProductos();

  return <ProductClientPage productos={productos} />;
}
