import { getProductos } from './_actions/get-product';
import { ProductClientPage } from './_components/product-client-page';

export default async function ProductPage(props: {
  searchParams: Promise<{ q: string; offset: string }>;
}) {
  const searchParams = await props.searchParams;
  const search = searchParams.q ?? '';

  const { productos } = await getProductos(search);

  return <ProductClientPage productos={productos} />;
}
