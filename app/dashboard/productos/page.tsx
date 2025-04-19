import { Tabs, TabsContent } from '@/components/ui/tabs';
import { PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductsTable } from './_components/products-table';
import { getProductos } from './_actions/get-product';
import ProductForm from './_components/product-form';
import { createProducto } from './_actions/create-product';

export default async function VacantesPage(props: {
  searchParams: Promise<{ q: string; offset: string }>;
}) {
  const searchParams = await props.searchParams;
  const search = searchParams.q ?? '';

  const { productos } = await getProductos(search);

  return (
    <Tabs defaultValue="all">
      <div className="flex items-center">
        <div className="ml-auto flex items-center gap-2">
          <ProductForm
            onSubmit={async (formData) => {
              'use server';
              await createProducto(formData);
            }}
          >
            <Button size="sm" className="h-8 gap-1 my-2">
              <PlusCircle className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Agregar producto
              </span>
            </Button>
          </ProductForm>
        </div>
      </div>

      <TabsContent value="all">
        <ProductsTable data={productos} />
      </TabsContent>
    </Tabs>
  );
}
