'use client';

import { TProducto } from '../types';
import {
  TableHead,
  TableRow,
  TableHeader,
  Table,
  TableBody
} from '@/components/ui/table';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Product } from './product';
import { TLang } from '@/lib/models';

export function ProductsTable({
  data,
  lang = 'ES'
}: {
  data: TProducto[];
  lang?: TLang;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Productos</CardTitle>
        <CardDescription>
          Administra tus productos y modifica a tu necesidad.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Id</TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead>Categoría</TableHead>
              <TableHead className="text-center">Imagen nombre (URL)</TableHead>
              <TableHead className="text-center">
                Imagen principal (URL)
              </TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>
                <span className="sr-only">Acciones</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((product) => (
              <Product key={product.id} product={product} lang={lang} />
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
