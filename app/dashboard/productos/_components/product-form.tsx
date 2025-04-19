'use client';

import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { set, z } from 'zod';
import { TOpcion, TOpcionResponse } from 'selects/options';
import { Badge } from '@/components/ui/badge';
import { useGlobalStore } from 'store/global-store';
import { showToast } from '@/components/showToast';

const ProductSchema = z.object({
  categoría: z.string().min(1, 'La categoría es obligatoria'),
  nombre: z.string().min(1, 'El nombre es obligatorio'),
  titulo: z.string().min(1, 'El titulo es obligatorio'),
  descripción: z
    .string()
    .min(10, 'La descripción debe tener al menos 10 caracteres'),
  imagen_principal: z.string().url('La URL de la imagen no es válida'),
  imagen_nombre_principal: z
    .string()
    .min(1, 'El nombre de la imagen es obligatorio'),
  estado_id: z.string().min(1, 'Seleccione un estado'),
  carasteristicas: z
    .array(z.string().min(1))
    .min(1, 'Debe agregar al menos una característica')
});

type Mode = 'create' | 'edit';

type Props = {
  defaultValues?: {
    id?: number;
    categoría: string;
    nombre: string;
    titulo: string;
    descripción: string;
    imagen_principal: string;
    imagen_nombre_principal: string;
    estado_id: string;
    carasteristicas: string[];
  };
  estados: TOpcionResponse<TOpcion>['data'];
  onSubmit: (formData: FormData) => Promise<void>;
  children?: React.ReactNode;
  mode?: Mode;
  open?: boolean;
  setOpen?: (value: boolean) => void;
};

export default function ProductForm({
  defaultValues,
  estados,
  onSubmit,
  children,
  mode = 'create',
  open,
  setOpen
}: Props) {
  const setLoading = useGlobalStore((state) => state.setLoading);
  const [internalOpen, setInternalOpen] = useState(false);
  const modalOpen = open ?? internalOpen;
  const setModalOpen = setOpen ?? setInternalOpen;
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const [categoria, setCategoria] = useState(defaultValues?.categoría || '');
  const [nombre, setNombre] = useState(defaultValues?.nombre || '');
  const [titulo, setTitulo] = useState(defaultValues?.titulo || '');
  const [descripcion, setDescripcion] = useState(
    defaultValues?.descripción || ''
  );
  const [imagenPrincipal, setImagenPrincipal] = useState(
    defaultValues?.imagen_principal || ''
  );
  const [imagenNombre, setImagenNombre] = useState(
    defaultValues?.imagen_nombre_principal || ''
  );
  const [estadoId, setEstadoId] = useState(defaultValues?.estado_id || '1');
  const [carasteristicas, setCarasteristicas] = useState<string[]>(
    defaultValues?.carasteristicas || []
  );
  const [newCarasteristica, setNewCarasteristica] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setIsLoading(true);

    const values = {
      categoría: categoria,
      nombre,
      titulo,
      descripción: descripcion,
      imagen_principal: imagenPrincipal,
      imagen_nombre_principal: imagenNombre,
      estado_id: estadoId,
      carasteristicas
    };

    const validation = ProductSchema.safeParse(values);

    if (!validation.success) {
      validation.error.issues.forEach((issue) => {
        showToast(issue.message, 'error');
      });
      setLoading(false);
      setIsLoading(false);
      return;
    }

    const formData = new FormData();

    if (defaultValues?.id) {
      formData.append('id', String(defaultValues.id));
    }

    formData.append('categoría', categoria);
    formData.append('nombre', nombre);
    formData.append('titulo', titulo);
    formData.append('descripción', descripcion);
    formData.append('imagen_principal', imagenPrincipal);
    formData.append('imagen_nombre_principal', imagenNombre);
    formData.append('estado_id', estadoId);

    carasteristicas.forEach((c) => {
      formData.append('carasteristicas[]', c);
    });

    try {
      await onSubmit(formData);
      showToast(
        mode === 'edit' ? 'Producto actualizado' : 'Producto creado',
        'success'
      );
      router.refresh();
      setModalOpen(false);
    } catch (error) {
      showToast('Error al guardar el producto', 'error');
    } finally {
      setLoading(false);
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setCategoria('');
    setNombre('');
    setTitulo('');
    setDescripcion('');
    setImagenPrincipal('');
    setImagenNombre('');
    setEstadoId('1');
    setCarasteristicas([]);
    setNewCarasteristica('');
  };

  useEffect(() => {
    if (!defaultValues?.id) {
      resetForm();
    }
  }, [modalOpen]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && newCarasteristica.trim() !== '') {
      e.preventDefault();
      if (!carasteristicas.includes(newCarasteristica.trim())) {
        setCarasteristicas([...carasteristicas, newCarasteristica.trim()]);
      }
      setNewCarasteristica('');
    }
  };

  const handleRemoveCarasteristica = (index: number) => {
    const updated = [...carasteristicas];
    updated.splice(index, 1);
    setCarasteristicas(updated);
  };

  return (
    <>
      {children && <span onClick={() => setModalOpen(true)}>{children}</span>}

      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {mode === 'edit' ? 'Editar producto' : 'Agregar producto'}
            </DialogTitle>
            <DialogDescription>
              {mode === 'edit'
                ? 'Modifica los campos del producto.'
                : 'Completa la información para crear un nuevo producto.'}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <Input
              required
              withAsterisk
              label="Nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
            <Input
              required
              withAsterisk
              label="Categoría"
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
            />
            <Input
              required
              withAsterisk
              label="Titulo"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
            />
            <Textarea
              required
              withAsterisk
              label="Descripción"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
            />
            <Input
              required
              withAsterisk
              label="Imagen principal (URL)"
              value={imagenPrincipal}
              onChange={(e) => setImagenPrincipal(e.target.value)}
            />
            <Input
              required
              withAsterisk
              label="Nombre del archivo"
              value={imagenNombre}
              onChange={(e) => setImagenNombre(e.target.value)}
            />

            <div>
              <label className="text-sm font-medium">
                Estado <span className="text-red-500">*</span>
              </label>
              <Select value={estadoId} onValueChange={setEstadoId}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccione estado" />
                </SelectTrigger>
                <SelectContent>
                  {estados.map((estado) => (
                    <SelectItem key={estado.id} value={String(estado.id)}>
                      {estado.nombre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-1 block">
                Características <span className="text-red-500">*</span>
              </label>
              <Input
                placeholder="Escribe y presiona Enter"
                value={newCarasteristica}
                onChange={(e) => setNewCarasteristica(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              {carasteristicas.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {carasteristicas.map((c, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="flex items-center gap-1"
                    >
                      {c}
                      <X
                        className="w-3 h-3 cursor-pointer"
                        onClick={() => handleRemoveCarasteristica(index)}
                      />
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            <div className="flex justify-end">
              <Button variant={'outline'} type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                {mode === 'edit' ? 'Actualizar' : 'Guardar'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
