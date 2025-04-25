'use client';

import {
  TableHead,
  TableRow,
  TableHeader,
  Table,
  TableCell,
  SortableRow
} from '@/components/ui/table';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';

import { TEquipo } from '../types';
import { TLang } from '@/lib/models';
import { useEffect, useState } from 'react';

import { DndContext, closestCenter, type DragEndEvent } from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy
} from '@dnd-kit/sortable';
import { Equipo } from './equipo';
import { updateEquipo } from '../_actions/update-team';

export function EquipoTable({
  equipo,
  lang = 'ES',
  orden: { orden, setOrden }
}: {
  lang?: TLang;
  equipo: TEquipo[];
  orden: { orden: string[]; setOrden: (orden: string[]) => void };
}) {
  // console.log({ equipo, orden }, 'equipoxxxxxx');

  const equipoOrdenado = orden
    .map((id) => equipo.find((m) => m.id.toString() === id))
    .filter(Boolean) as TEquipo[];

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
      await updateEquipo(updated, lang);
      console.log(updated);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Equipo</CardTitle>
        <CardDescription>
          Administra los miembros del equipo y edítalos cuando lo necesites.
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
                      <TableHead>Id</TableHead>
                      <TableHead>Nombre</TableHead>
                      <TableHead>Cargo</TableHead>
                      <TableHead>
                        <span className="sr-only">Acciones</span>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <tbody>
                    {equipoOrdenado.map((miembro) => (
                      <Equipo key={miembro.id} lang={lang} miembro={miembro} />
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
