'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SortableRow, TableCell, TableRow } from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';
import { showToast } from '@/components/showToast';
import { useGlobalStore } from 'store/global-store';

import { TEquipo } from '../types';
import { deleteEquipo } from '../_actions/delete-team';
import EquipoForm from './equipo-form';
import { updateEquipo } from '../_actions/update-team';
import { TLang } from '@/lib/models';

export function Equipo({
  miembro,
  lang = 'ES'
}: {
  miembro: TEquipo;
  lang?: TLang;
}) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const setLoading = useGlobalStore((state) => state.setLoading);
  const router = useRouter();

  const handleDelete = async () => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append('id', String(miembro.id));

      await deleteEquipo(formData);

      showToast('Miembro eliminado correctamente', 'success');
      router.refresh();
    } catch (err) {
      showToast('Error al eliminar miembro', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SortableRow id={miembro.id.toString()}>
        <TableCell>{miembro.id}</TableCell>
        <TableCell>{miembro.nombre}</TableCell>
        <TableCell>{miembro.cargo}</TableCell>
        <TableCell>{miembro.descripcion}</TableCell>
        <TableCell>
          <img
            alt={miembro.nombre}
            src={miembro.url_image || ''}
            className="h-10 w-10 rounded-full object-cover"
          />
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
              <DropdownMenuItem onClick={() => setShowDeleteModal(true)}>
                Borrar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </TableCell>
      </SortableRow>

      <ConfirmDialog
        open={showDeleteModal}
        onConfirm={handleDelete}
        onOpenChange={setShowDeleteModal}
        description="Esta acción no se puede deshacer"
        confirmText="Borrar"
        cancelText="Cancelar"
      />

      <EquipoForm
        open={showEditModal}
        setOpen={setShowEditModal}
        mode="edit"
        defaultValues={{
          id: miembro.id,
          nombre: miembro.nombre,
          descripcion: miembro.descripcion,
          cargo: miembro.cargo,
          url_image: miembro.url_image
        }}
        onSubmit={async (formData) => {
          await updateEquipo(formData, lang);
        }}
      />
    </>
  );
}
