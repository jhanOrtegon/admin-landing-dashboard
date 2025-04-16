import { ProductPageDetail } from './_components/product-page-detail';

export default function Page({ params }: { params: { id: string } }) {
  return <ProductPageDetail id={params.id} />;
}
