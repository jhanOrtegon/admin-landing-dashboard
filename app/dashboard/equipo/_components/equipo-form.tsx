'use client';

import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { showToast } from '@/components/showToast';
import { useGlobalStore } from 'store/global-store';

const EquipoSchema = z.object({
  nombre: z.string().min(2, 'El nombre es obligatorio'),
  descripcion: z.string().min(5, 'La descripción es obligatoria'),
  cargo: z.string().min(2, 'El cargo es obligatorio'),
  url_image: z
    .string()
    .url('Debe ser una URL válida')
    .optional()
    .or(z.literal(''))
});

type Mode = 'create' | 'edit';

type Props = {
  defaultValues?: {
    id?: number;
    nombre: string;
    descripcion: string;
    cargo: string;
    url_image: string;
  };
  onSubmit: (formData: FormData) => Promise<void>;
  children?: React.ReactNode;
  mode?: Mode;
  open?: boolean;
  setOpen?: (value: boolean) => void;
};

export default function EquipoForm({
  defaultValues,
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

  const [nombre, setNombre] = useState(defaultValues?.nombre || '');
  const [descripcion, setDescripcion] = useState(
    defaultValues?.descripcion || ''
  );
  const [cargo, setCargo] = useState(defaultValues?.cargo || '');
  const [urlImage, setUrlImage] = useState(defaultValues?.url_image || '');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setIsLoading(true);

    const values = {
      nombre,
      descripcion,
      cargo,
      url_image: urlImage
    };

    const validation = EquipoSchema.safeParse(values);

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
    formData.append('nombre', nombre);
    formData.append('descripcion', descripcion);
    formData.append('cargo', cargo);
    formData.append('url_image', urlImage);

    try {
      await onSubmit(formData);
      showToast(
        mode === 'edit'
          ? 'Miembro del equipo actualizado'
          : 'Miembro del equipo creado',
        'success'
      );
      router.refresh();
      setModalOpen(false);
    } catch (error) {
      showToast('Error al guardar el miembro', 'error');
    } finally {
      setLoading(false);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (modalOpen) {
      if (defaultValues) {
        setNombre(defaultValues.nombre || '');
        setDescripcion(defaultValues.descripcion || '');
        setCargo(defaultValues.cargo || '');
        setUrlImage(defaultValues.url_image || '');
      }
    } else {
      setNombre('');
      setDescripcion('');
      setCargo('');
      setUrlImage('');
    }
  }, [modalOpen, defaultValues]);

  return (
    <>
      {children && <span onClick={() => setModalOpen(true)}>{children}</span>}

      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {mode === 'edit' ? 'Editar miembro' : 'Agregar miembro'}
            </DialogTitle>
            <DialogDescription>
              {mode === 'edit'
                ? 'Modifica la información del miembro del equipo.'
                : 'Completa la información para agregar un nuevo integrante.'}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <Input
              required
              label="Nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />

            <Input
              required
              label="Cargo"
              value={cargo}
              onChange={(e) => setCargo(e.target.value)}
            />

            <Textarea
              required
              label="Descripción"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              className="min-h-[100px]"
            />

            <Input
              required
              label="URL de la imagen"
              value={urlImage}
              onChange={(e) => setUrlImage(e.target.value)}
            />

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
