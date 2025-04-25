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
import { z } from 'zod';
import { TOpcion, TOpcionResponse } from 'selects/options';
import { Badge } from '@/components/ui/badge';
import { useGlobalStore } from 'store/global-store';
import { showToast } from '@/components/showToast';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem
} from '@/components/ui/command';
import { useRouter } from 'next/navigation';

export const VacanteSchema = z.object({
  titulo: z.string().min(3, 'El nombre es obligatorio'),
  descripcion: z.string().min(10, 'La descripción es obligatoria'),
  salario: z.string().min(1, 'El salario es obligatorio'),
  modalidad: z.string().min(1, 'La modalidad es obligatorio'),
  tecnologia_id: z.array(z.string()).min(1, 'Seleccione al menos una habilidad')
});

type Mode = 'create' | 'edit';

type Props = {
  defaultValues?: {
    id?: number;
    titulo: string;
    descripcion: string;
    salario: string;
    ubicacion: string;
    modalidad: string;
    tecnologia_id: string[];
  };
  onSubmit: (formData: FormData) => Promise<void>;
  children?: React.ReactNode;
  mode?: Mode;
  open?: boolean;
  setOpen?: (value: boolean) => void;
};

export default function VacanteForm({
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

  const [titulo, setTitulo] = useState(defaultValues?.titulo || '');

  const [newHabilidad, setNewHabilidad] = useState('');

  const [descripcion, setDescripcion] = useState(
    defaultValues?.descripcion || ''
  );

  const [salario, setSalario] = useState(
    defaultValues?.salario?.toString() || ''
  );

  const [ubicacion, setUbicacion] = useState(
    defaultValues?.ubicacion || 'Barranquilla'
  );

  const [tecnologiaId, setTecnologiaId] = useState<string[]>(
    defaultValues?.tecnologia_id || []
  );

  const [modalidad, setModalidad] = useState<string>(
    defaultValues?.modalidad?.toString() || ''
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && newHabilidad.trim() !== '') {
      e.preventDefault();
      if (!tecnologiaId.includes(newHabilidad.trim())) {
        setTecnologiaId([...tecnologiaId, newHabilidad.trim()]);
      }
      setNewHabilidad('');
    }
  };

  const handleRemoveCarasteristica = (index: number) => {
    const updated = [...tecnologiaId];
    updated.splice(index, 1);
    setTecnologiaId(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setIsLoading(true);

    const values = {
      titulo,
      descripcion,
      salario,
      ubicacion,
      modalidad,
      tecnologia_id: tecnologiaId
    };

    const validation = VacanteSchema.safeParse(values);

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

    formData.append('titulo', titulo);
    formData.append('descripcion', descripcion);
    formData.append('salario', salario);
    formData.append('ubicacion', ubicacion);
    formData.append('modalidad', modalidad);

    // Array manual
    tecnologiaId.forEach((tec) => {
      if (tecnologiaId.includes(tec)) {
        formData.append('tecnologia_id[]', tec);
      }
    });

    try {
      await onSubmit(formData);
      showToast(
        mode === 'edit' ? 'Vacante actualizada' : 'Vacante creada',
        'success'
      );
      router.refresh();
      setLoading(false);
      setModalOpen(false);
    } catch (error) {
      showToast('Error al guardar la vacante', 'error');
    } finally {
      setLoading(false);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (modalOpen) {
      // Rellenar si hay datos de edición
      if (defaultValues) {
        setTitulo(defaultValues.titulo || '');
        setDescripcion(defaultValues.descripcion || '');
        setSalario(defaultValues.salario?.toString() || '');
        setModalidad(defaultValues.modalidad?.toString() || '');
        setUbicacion(defaultValues.ubicacion || '');
        setTecnologiaId(defaultValues.tecnologia_id || []);
      }
    } else {
      // Limpiar al cerrar
      setTitulo('');
      setDescripcion('');
      setSalario('');
      setModalidad('');
      setUbicacion('');
      setTecnologiaId([]);
    }
  }, [modalOpen, defaultValues]);

  return (
    <>
      {children && <span onClick={() => setModalOpen(true)}>{children}</span>}

      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {mode === 'edit' ? 'Editar vacante' : 'Agregar vacante'}
            </DialogTitle>
            <DialogDescription>
              {mode === 'edit'
                ? 'Modifica los campos de la vacante.'
                : 'Completa la información para crear una nueva vacante.'}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <Input
              required
              label="Nombre"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
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
              label="Salario"
              inputMode="text"
              value={salario}
              onChange={(e) => {
                const value = e.target.value;
                setSalario(value);
              }}
            />

            <Input
              required
              label="Modalidad"
              inputMode="text"
              value={modalidad}
              onChange={(e) => {
                const value = e.target.value;
                setModalidad(value);
              }}
            />

            <div>
              <label className="text-sm font-medium mb-1 block">
                Habilidades <span className="text-red-500">*</span>
              </label>
              <Input
                value={newHabilidad}
                onKeyDown={handleKeyDown}
                placeholder="Escribe y presiona Enter"
                onChange={(e) => setNewHabilidad(e.target.value)}
              />
              {tecnologiaId.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {tecnologiaId.map((c, index) => (
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
