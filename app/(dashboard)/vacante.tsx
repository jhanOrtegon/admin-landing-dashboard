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
import { MoreHorizontal, Loader2 } from 'lucide-react';
import { TableCell, TableRow } from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { BASE_URL, deleteVacante, updateVacante } from './actions';
import { useRouter } from 'next/navigation';
import { TVacante } from '@/lib/models';
import { showToast } from '@/components/showToast';
import LoadingOverlay from '@/components/ui/loading-overlay';
import { useGlobalStore } from '@/lib/global-store';

export function Vacante({ vacante }: { vacante: TVacante }) {
  const router = useRouter();
  const setLoading = useGlobalStore((state) => state.setLoading);

  const [open, setOpen] = useState(false);
  const [titulo, setTitulo] = useState(vacante.titulo);
  const [descripcion, setDescripcion] = useState(vacante.descripcion);

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('id', String(vacante.id));
      formData.append('titulo', titulo);
      formData.append('descripcion', descripcion);
      formData.append('estado_id', String(vacante.estado_id));
      formData.append('salario', String(vacante.salario));
      formData.append('ubicacion', vacante.ubicacion);

      await updateVacante(formData);

      showToast('Vacante actualizada correctamente', 'success');
      setOpen(false);
      router.refresh();
    } catch (err) {
      showToast('Error al actualizar vacante', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append('id', String(vacante.id));

      await deleteVacante(formData);

      showToast('Vacante eliminada correctamente', 'success');

      setOpen(false);
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
        <TableCell className="font-medium flex gap-x-2 max-w-sm wrap">
          {vacante.tecnologias.map((tecnologia) => (
            <Badge key={tecnologia} variant="outline" className="capitalize">
              {tecnologia}
            </Badge>
          ))}
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
              <DropdownMenuItem onClick={() => setOpen(true)}>
                Editar
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleDelete}>Borrar</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </TableCell>
      </TableRow>

      {/* Modal de edición */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar vacante</DialogTitle>
            <DialogDescription>
              Aquí puedes modificar los datos de la vacante.
            </DialogDescription>
          </DialogHeader>

          <form className="space-y-4" onSubmit={handleSave}>
            <div>
              <label className="block text-sm font-medium mb-1">Título</label>
              <input
                className="w-full border px-3 py-2 rounded-md"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Descripción
              </label>
              <textarea
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                className="w-full border px-3 py-2 rounded-md max-h-72 min-h-32"
              />
            </div>

            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                Cancelar
              </Button>
              <Button type="submit">'Guardar'</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
