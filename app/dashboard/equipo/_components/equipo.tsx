'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MoreHorizontal, GripVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TableCell, TableRow } from '@/components/ui/table';
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

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

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

  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition
  } = useSortable({ id: miembro.id.toString() });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };

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
      <TableRow
        ref={setNodeRef}
        style={style}
        {...attributes}
        className="border-b transition-colors hover:bg-muted/50"
      >
        <TableCell>
          <button
            {...listeners}
            ref={setActivatorNodeRef}
            className="cursor-move text-muted-foreground hover:text-foreground"
            title="Reordenar"
          >
            <GripVertical className="w-4 h-4" />
          </button>
        </TableCell>

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
              <Button
                aria-haspopup="true"
                size="icon"
                variant="ghost"
                onPointerDown={(e) => e.stopPropagation()}
              >
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
      </TableRow>

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
