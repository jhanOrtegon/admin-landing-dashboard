'use client';

import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';
import { TableCell, TableRow } from '@/components/ui/table';
import { deleteVacante, updateVacante } from './actions';
import { useRouter } from 'next/navigation';
import { TVacante } from '@/lib/models';
import { showToast } from '@/components/showToast';
import { useGlobalStore } from '@/lib/global-store';
import VacanteForm from '@/components/forms/vacante-form';

export function Vacante({
  vacante,
  listEstados,
  listTecnologias
}: {
  vacante: TVacante;
  listEstados: { id: number; nombre: string }[];
  listTecnologias: { id: number; nombre: string }[];
}) {
  const router = useRouter();
  const setLoading = useGlobalStore((state) => state.setLoading);
  const [showEditModal, setShowEditModal] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append('id', String(vacante.id));

      await deleteVacante(formData);

      showToast('Vacante eliminada correctamente', 'success');
      router.refresh();
    } catch (err) {
      showToast('Error al eliminar vacante', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <TableRow>
        <TableCell className="font-medium">{vacante.id}</TableCell>
        <TableCell className="font-medium">{vacante.titulo}</TableCell>
        <TableCell className="font-medium">
          <div className="flex gap-2 items-center max-w-sm flex-wrap">
            {vacante.tecnologias.map((tecnologia) => (
              <Badge key={tecnologia} variant="outline" className="capitalize">
                {tecnologia}
              </Badge>
            ))}
          </div>
        </TableCell>
        <TableCell className="font-medium max-w-md">
          {vacante.descripcion}
        </TableCell>
        <TableCell>
          <Badge variant="outline" className="capitalize">
            {vacante.estado}
          </Badge>
        </TableCell>
        <TableCell>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button aria-haspopup="true" size="icon" variant="ghost">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Acciones</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => setShowEditModal(true)}>
                Editar
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleDelete}>Borrar</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </TableCell>
      </TableRow>

      <VacanteForm
        open={showEditModal}
        setOpen={setShowEditModal}
        mode="edit"
        defaultValues={{
          id: vacante.id,
          titulo: vacante.titulo,
          descripcion: vacante.descripcion,
          salario: vacante.salario,
          ubicacion: vacante.ubicacion,
          estado_id: String(vacante.estado_id),
          tecnologia_id: vacante.tecnologias.length
            ? vacante.tecnologias.map((t) => String(t))
            : []
        }}
        estados={listEstados}
        tecnologias={listTecnologias}
        onSubmit={async (formData) => {
          await updateVacante(formData);
        }}
      />
    </>
  );
}
