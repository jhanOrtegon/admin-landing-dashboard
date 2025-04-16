import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import VacanteForm from '@/components/forms/vacante-form';
import { getVacantes } from '../actions';
import { getOpciones, TOpcion } from '../options';
import { VacantesTable } from '../VacantesTable';
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

  const estados = getOpciones<TOpcion>('estados');

  return (
    <Tabs defaultValue="all">
      <div className="flex items-center">
        <div className="ml-auto flex items-center gap-2">
          <ProductForm
            estados={(await estados).data}
            onSubmit={async (formData) => {
              'use server';
              await createProducto(formData);
            }}
          >
            <Button size="sm" className="h-8 gap-1">
              <PlusCircle className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Agregar producto
              </span>
            </Button>
          </ProductForm>
        </div>
      </div>

      <TabsContent value="all">
        <ProductsTable data={productos} estados={(await estados).data} />
      </TabsContent>
    </Tabs>
  );
}
