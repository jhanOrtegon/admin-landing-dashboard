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
import { MoreHorizontal, GripVertical } from 'lucide-react';
import { TableCell, TableRow } from '@/components/ui/table';
import { useRouter } from 'next/navigation';

import { showToast } from '@/components/showToast';
import { useGlobalStore } from 'store/global-store';

import { TProducto } from '../types';
import { deleteProducto } from '../_actions/delete-product';
import ProductForm from './product-form';
import { updateProducto } from '../_actions/update-product';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';
import { TLang } from '@/lib/models';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export function Product({
  product,
  lang = 'ES'
}: {
  product: TProducto;
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
  } = useSortable({ id: product.id.toString() });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };

  const handleDelete = async () => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append('id', String(product.id));

      await deleteProducto(formData);

      showToast('producto eliminado correctamente', 'success');
      router.refresh();
    } catch (err) {
      showToast('Error al eliminar producto', 'error');
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

        <TableCell className="font-medium">{product.id}</TableCell>
        <TableCell className="font-medium">{product.nombre}</TableCell>
        <TableCell className="font-medium">{product.categoría}</TableCell>
        <TableCell className="font-medium">
          <div className="flex gap-2 items-center justify-center">
            <img
              width={100}
              height={100}
              alt={product.nombre}
              src={product.imagen_nombre_principal}
            />
          </div>
        </TableCell>
        <TableCell className="font-medium">
          <div className="flex gap-2 items-center justify-center">
            <img
              width={100}
              height={100}
              alt={product.nombre}
              src={product.imagen_principal}
            />
          </div>
        </TableCell>

        <TableCell>
          <Badge variant="outline" className="capitalize">
            {'Activo'}
          </Badge>
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
              <DropdownMenuItem
                onClick={() =>
                  router.push(
                    `/dashboard/productos/${product.slug}?lang=${lang}`
                  )
                }
              >
                Detalle
              </DropdownMenuItem>
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

      <ProductForm
        open={showEditModal}
        setOpen={setShowEditModal}
        mode="edit"
        defaultValues={{
          id: product.id,
          categoría: product.categoría,
          nombre: product.nombre,
          titulo: product.titulo,
          descripción: product.descripción,
          imagen_principal: product.imagen_principal,
          imagen_nombre_principal: product.imagen_nombre_principal,
          carasteristicas: product.carasteristicas.length
            ? product.carasteristicas.map((c) => String(c))
            : []
        }}
        onSubmit={async (formData) => {
          await updateProducto(formData, lang);
        }}
      />
    </>
  );
}
