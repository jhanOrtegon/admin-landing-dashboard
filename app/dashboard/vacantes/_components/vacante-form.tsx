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
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
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

export const VacanteSchema = z.object({
  titulo: z.string().min(3, 'El título es obligatorio'),
  descripcion: z.string().min(10, 'La descripción es obligatoria'),
  salario: z.string().regex(/^\d+$/, 'El salario debe ser un número entero'),
  ubicacion: z.string().min(2, 'La ubicación es obligatoria'),
  estado_id: z.string().min(1, 'Seleccione un estado'),
  tecnologia_id: z
    .array(z.string())
    .min(1, 'Seleccione al menos una tecnología')
});

type Mode = 'create' | 'edit';

type Props = {
  defaultValues?: {
    id?: number;
    titulo: string;
    descripcion: string;
    salario: number;
    ubicacion: string;
    estado_id: string;
    tecnologia_id: string[];
  };
  estados: TOpcionResponse<TOpcion>['data'];
  tecnologias: TOpcionResponse<TOpcion>['data'];
  onSubmit: (formData: FormData) => Promise<void>;
  children?: React.ReactNode;
  mode?: Mode;
  open?: boolean;
  setOpen?: (value: boolean) => void;
};

export default function VacanteForm({
  defaultValues,
  estados,
  tecnologias,
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
  const [descripcion, setDescripcion] = useState(
    defaultValues?.descripcion || ''
  );
  const [salario, setSalario] = useState(
    defaultValues?.salario?.toString() || ''
  );
  const [ubicacion, setUbicacion] = useState(defaultValues?.ubicacion || '');
  const [estadoId, setEstadoId] = useState(defaultValues?.estado_id || '1');
  const [tecnologiaId, setTecnologiaId] = useState<string[]>(
    defaultValues?.tecnologia_id || []
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setIsLoading(true);

    const cleanSalario = salario.replace(/[^0-9]/g, '');

    const values = {
      titulo,
      descripcion,
      salario: cleanSalario,
      ubicacion,
      estado_id: estadoId,
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
    formData.append('salario', cleanSalario);
    formData.append('ubicacion', ubicacion);
    formData.append('estado_id', estadoId);

    // Array manual
    tecnologiaId.forEach((id) => {
      formData.append('tecnologia_id[]', id);
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
        setUbicacion(defaultValues.ubicacion || '');
        setEstadoId(defaultValues.estado_id || '1');
        setTecnologiaId(defaultValues.tecnologia_id || []);
      }
    } else {
      // Limpiar al cerrar
      setTitulo('');
      setDescripcion('');
      setSalario('');
      setUbicacion('');
      setEstadoId('1');
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
              label="Título"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
            />
            <Textarea
              label="Descripción"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              className="min-h-[100px]"
            />

            <div>
              <label className="text-sm font-medium">Salario</label>
              <Input
                inputMode="numeric"
                pattern="[0-9]*"
                value={salario}
                onChange={(e) => {
                  const clean = e.target.value.replace(/[^0-9]/g, '');
                  setSalario(clean);
                }}
              />
              {salario && (
                <p className="text-xs text-muted-foreground mt-1 ml-1">
                  {new Intl.NumberFormat('es-CO', {
                    style: 'currency',
                    currency: 'COP',
                    minimumFractionDigits: 0
                  }).format(Number(salario))}
                </p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium">Ubicación</label>
              <Input
                value={ubicacion}
                onChange={(e) => setUbicacion(e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm font-medium">Estado</label>
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
                Tecnologías
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    className="w-full justify-between"
                  >
                    {tecnologiaId.length > 0
                      ? `${tecnologiaId.length} seleccionadas`
                      : 'Seleccionar tecnologías'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[400px] p-0">
                  <Command>
                    <CommandInput placeholder="Buscar tecnología..." />
                    <CommandGroup>
                      {tecnologias.map((tecnologia) => {
                        const id = String(tecnologia.id);
                        const checked = tecnologiaId.includes(id);
                        return (
                          <CommandItem
                            key={id}
                            onSelect={() => {
                              setTecnologiaId((prev) =>
                                prev.includes(id)
                                  ? prev.filter((v) => v !== id)
                                  : [...prev, id]
                              );
                            }}
                            className="flex items-center justify-between"
                          >
                            <span>{tecnologia.nombre}</span>
                            <input
                              type="checkbox"
                              checked={checked}
                              readOnly
                              className="rounded border-muted"
                            />
                          </CommandItem>
                        );
                      })}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>

              {tecnologiaId.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {tecnologiaId.map((id) => {
                    const tech = tecnologias.find((t) => String(t.id) === id);
                    return (
                      <Badge key={id} variant="outline" className="capitalize">
                        {tech?.nombre}
                      </Badge>
                    );
                  })}
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
