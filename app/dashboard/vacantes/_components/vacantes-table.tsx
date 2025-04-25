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
  vacantes
}: {
  lang?: TLang;
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
              <TableHead>Habilidades</TableHead>
              <TableHead>Modalidad</TableHead>
              <TableHead>Descripción</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>
                <span className="sr-only">Acciones</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <tbody>
            {vacantes.map((vacante) => (
              <Vacante lang={lang} key={vacante.id} vacante={vacante} />
            ))}
          </tbody>
        </Table>
      </CardContent>
    </Card>
  );
}
