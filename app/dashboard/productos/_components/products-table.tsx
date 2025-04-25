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
import { useState } from 'react';
import { closestCenter, DndContext, DragEndEvent } from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy
} from '@dnd-kit/sortable';
import { updateProducto } from '../_actions/update-product';

export function ProductsTable({
  data,
  lang = 'ES',
  orden: { orden, setOrden }
}: {
  lang?: TLang;
  data: TProducto[];
  orden: { orden: string[]; setOrden: (orden: string[]) => void };
}) {
  const productosOrdenados = orden
    .map((id) => data.find((m) => m.id.toString() === id))
    .filter(Boolean) as TProducto[];

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = orden.indexOf(active.id.toString());
    const newIndex = orden.indexOf(over.id.toString());

    const updated = [...orden];
    updated.splice(oldIndex, 1);
    updated.splice(newIndex, 0, active.id.toString());
    setOrden(updated);

    if (updated.length) {
      await updateProducto(updated, lang);
      console.log(updated);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Productos</CardTitle>
        <CardDescription>
          Administra tus productos y modifica a tu necesidad.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <DndContext
          autoScroll={false}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={orden} strategy={verticalListSortingStrategy}>
            <div className="relative w-full max-h-[calc(100vh-20rem)] overflow-auto rounded-xl">
              <div className="w-full overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead></TableHead>
                      <TableHead>Id</TableHead>
                      <TableHead>Nombre</TableHead>
                      <TableHead>Categoría</TableHead>
                      <TableHead className="text-center">
                        Imagen nombre (URL)
                      </TableHead>
                      <TableHead className="text-center">
                        Imagen principal (URL)
                      </TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead>
                        <span className="sr-only">Acciones</span>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <tbody>
                    {productosOrdenados.map((product) => (
                      <Product key={product.id} product={product} lang={lang} />
                    ))}
                  </tbody>
                </Table>
              </div>
            </div>
          </SortableContext>
        </DndContext>
      </CardContent>
    </Card>
  );
}
