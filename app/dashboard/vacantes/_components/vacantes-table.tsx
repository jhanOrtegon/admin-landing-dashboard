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
import { Vacante } from './vacante';
import { TVacante } from '../types';
import { TLang } from '@/lib/models';

export function VacantesTable({
  lang = 'ES',
  tecnologias,
  vacantes
}: {
  lang?: TLang;
  tecnologias: { id: number; nombre: string }[];
  vacantes: TVacante[];
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Vacantes</CardTitle>
        <CardDescription>
          Administra tus vacantes y modifica a tu necesidad.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Id</TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead>Tecnologías</TableHead>
              <TableHead>Descripción</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>
                <span className="sr-only">Acciones</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {vacantes.map((vacante) => (
              <Vacante
                lang={lang}
                key={vacante.id}
                vacante={vacante}
                listTecnologias={tecnologias}
              />
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
