'use client';

import {
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  Table
} from '@/components/ui/table';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Equipo } from './equipo';
import { TEquipo } from '../types';
import { TLang } from '@/lib/models';

export function EquipoTable({
  equipo,
  lang = 'ES'
}: {
  lang?: TLang;
  equipo: TEquipo[];
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Equipo</CardTitle>
        <CardDescription>
          Administra los miembros del equipo y edítalos cuando lo necesites.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Id</TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead>Cargo</TableHead>
              <TableHead>Descripción</TableHead>
              <TableHead>Imagen</TableHead>
              <TableHead>
                <span className="sr-only">Acciones</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {equipo.map((miembro) => (
              <Equipo key={miembro.id} lang={lang} miembro={miembro} />
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
