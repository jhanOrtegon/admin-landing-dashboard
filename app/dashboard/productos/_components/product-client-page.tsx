'use client';

import { Tabs, TabsContent } from '@/components/ui/tabs';
import ProductForm from './product-form';
import { createProducto } from '../_actions/create-product';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { ProductsTable } from './products-table';
import { TProducto } from '../types';
import { TLang } from '@/lib/models';
import { useMemo, useState } from 'react';

interface Props {
  productos: TProducto[];
}

export function ProductClientPage({ productos }: Props) {
  const [lang, setLang] = useState<TLang>('ES');

  const productosFilter = useMemo(() => {
    return productos.filter((v) => v.lang === lang);
  }, [lang, productos]);

  return (
    <Tabs defaultValue="all">
      <div className="flex items-center gap-4">
        <Button
          size="sm"
          className="h-8 gap-1 my-2 ml-auto"
          onClick={() => setLang((prev) => (prev === 'ES' ? 'EN' : 'ES'))}
        >
          {lang === 'ES' ? 'EN' : 'ES'}
        </Button>
        <div className="flex items-center gap-2">
          <ProductForm
            onSubmit={async (formData) => {
              await createProducto(formData, lang);
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
        <ProductsTable data={productosFilter} lang={lang} />
      </TabsContent>
    </Tabs>
  );
}
