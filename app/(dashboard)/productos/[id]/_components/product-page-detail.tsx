'use client';

import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { showToast } from '@/components/showToast';
import { useGlobalStore } from 'store/global-store';
import { z } from 'zod';
import { getProductosDetalle } from '../_actions/get-product-detail';
import { createProductoDetail } from '../_actions/create-product-detail';
import { updateProductoDetail } from '../_actions/update-product-detail';
import { deleteProductoDetail } from '../_actions/delete-product-detail';
import { useRouter } from 'next/navigation';
import { dataIniital, emptyProductDetailSections } from './types';
import { getProductos } from '../../_actions/get-product';

const TabSchema = z.object({
  titulo: z.string().min(1),
  texto: z.string().min(1),
  carasteristicas: z.array(z.string().min(1))
});

const ArticuloSchema = z.object({
  nombre: z.string().min(1),
  texto: z.string().min(1),
  url_imagen: z.string().min(1)
});

const BannerSchema = z.object({
  nombre: z.string().min(1),
  texto: z.string().min(1),
  url_imagen: z.string().min(1).url(),
  url_logotipo: z.string().min(1).url(),
  carasteristicas: z.array(z.string().min(1))
});

const PrimeraSeccionSchema = z.object({
  nombre: z.string().min(1),
  texto: z.string().min(1),
  primera_url_imagen: z.string().min(1).url(),
  segunda_url_imagen: z.string().min(1).url()
});

const SegundaSeccionSchema = z.object({
  categoria: z.string().min(1),
  nombre: z.string().min(1),
  artículos: z.array(ArticuloSchema)
});

const TerceraSeccionSchema = z.object({
  categoria: z.string().min(1),
  nombre: z.string().min(1),
  url_imagen: z.string().min(1).url(),
  carasteristicas: z.array(z.string().min(1))
});

const CuartaYQuintaSeccionSchema = z.object({
  categoria: z.string().min(1),
  nombre: z.string().min(1),
  texto: z.string().min(1),
  url_imagen: z.string().min(1).url(),
  tabs: z.array(TabSchema)
});

const PreguntasSeccionSchema = z.object({
  categoria: z.string().min(1),
  nombre: z.string().min(1),
  tabs: z.array(TabSchema.omit({ carasteristicas: true }))
});

const ApoyoSeccionSchema = z.object({
  categoria: z.string().min(1),
  nombre: z.string().min(1),
  urls: z.array(z.string().min(1).url())
});

export const sectionSchemas = {
  banner: BannerSchema,
  primer_bloque: PrimeraSeccionSchema,
  segundo_bloque: SegundaSeccionSchema,
  tercer_bloque: TerceraSeccionSchema,
  cuarto_bloque: CuartaYQuintaSeccionSchema,
  quinto_bloque: CuartaYQuintaSeccionSchema,
  preguntas: PreguntasSeccionSchema,
  apoyo: ApoyoSeccionSchema
};

export function ProductPageDetail({ id }: { id: string }) {
  const router = useRouter();
  const [detalle, setDetalle] = useState<any>(null);
  const [formState, setFormState] = useState<Record<string, string>>({});
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});
  const [globalErrors, setGlobalErrors] = useState<Record<string, string>>({});

  const setLoading = useGlobalStore((state) => state.setLoading);

  const fields = [
    'banner',
    'primer_bloque',
    'segundo_bloque',
    'tercer_bloque',
    'cuarto_bloque',
    'quinto_bloque',
    'preguntas',
    'apoyo',
    'product_id'
  ];

  const fetchDetalle = async () => {
    setLoading(true);
    try {
      const response = await getProductosDetalle('');
      const product = await getProductos('');
      const existing = product.productos.find(
        (d) => d.id.toString() === id.toString()
      );

      if (!existing) {
        router.push(`/productos`);
        throw new Error('Producto no encontrado');
      }
      const current = response.data.find((d) => d.product_id === id);
      if (current) {
        setDetalle(current);
        const mapped: Record<string, string> = {};
        fields.forEach((f) => (mapped[f] = JSON.stringify(current[f] || {})));
        setFormState({ ...mapped, product_id: id });
      } else {
        const mapped: Record<string, string> = {};
        const current = emptyProductDetailSections as any;
        // const current = dataIniital as any;

        fields.forEach((f) => (mapped[f] = JSON.stringify(current[f] || {})));
        setFormState({ ...mapped, product_id: id });
        // setFormState({ ...dataIniital });
      }
    } catch {
      showToast('Error al consultar el detalle', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDetalle();
  }, [id]);

  useEffect(() => {
    const stored = localStorage.getItem('openSections');
    if (stored) {
      try {
        setOpenSections(JSON.parse(stored));
      } catch (e) {
        console.warn('Error parsing openSections from localStorage');
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('openSections', JSON.stringify(openSections));
  }, [openSections]);

  const handleChange = (section: string, field: string, value: any) => {
    const current = JSON.parse(formState[section] || '{}');
    const updated = { ...current, [field]: value };
    setFormState((prev) => ({ ...prev, [section]: JSON.stringify(updated) }));
  };

  const validateAllSections = (): boolean => {
    const errors: Record<string, string> = {};
    for (const key of fields.slice(0, -1)) {
      try {
        const schema = sectionSchemas[key as keyof typeof sectionSchemas];
        schema.parse(JSON.parse(formState[key] || '{}'));
      } catch (e: any) {
        errors[key] = 'Sección inválida';
      }
    }
    setGlobalErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const renderSectionCard = (sectionKey: string, title: string) => {
    let parsed: any = {};
    let rawValue = formState[sectionKey] || '{}';

    try {
      parsed = JSON.parse(rawValue);
    } catch {
      parsed = { error: 'JSON inválido', fallback: rawValue };
    }

    return (
      <details
        key={sectionKey}
        className="w-full rounded-md border p-4 bg-white"
        open={openSections[sectionKey] ?? sectionKey === fields[0]}
        onToggle={(e) => {
          if (!(e.currentTarget instanceof HTMLDetailsElement)) return;
          const isOpen = e.currentTarget.open;
          setOpenSections((prev) => ({ ...prev, [sectionKey]: isOpen }));
        }}
      >
        <summary className="cursor-pointer text-lg font-semibold mb-2">
          {title}
        </summary>
        {globalErrors[sectionKey] && (
          <p className="text-red-500 text-sm mt-2">
            ⚠️ {globalErrors[sectionKey]}
          </p>
        )}
        <Card className="w-full pt-6 border-0">
          <CardContent className="space-y-4">
            {parsed?.error && (
              <div className="text-red-500">
                {parsed.error}
                {parsed.fallback && (
                  <pre className="bg-gray-100 p-2 mt-2 text-xs overflow-auto rounded">
                    {parsed.fallback}
                  </pre>
                )}
              </div>
            )}
            {Object.entries(parsed)
              .filter(([key]) => key !== 'id')
              .map(([key, value]: [string, any]) => {
                if (key === 'texto') {
                  return (
                    <div key={key}>
                      <Textarea
                        value={value}
                        withAsterisk
                        label={key.replace(/_/g, ' ')}
                        onChange={(e) =>
                          handleChange(sectionKey, key, e.target.value)
                        }
                      />
                    </div>
                  );
                }

                if (typeof value === 'string') {
                  return (
                    <div key={key}>
                      <Input
                        withAsterisk
                        label={key.replace(/_/g, ' ')}
                        value={value}
                        onChange={(e) =>
                          handleChange(sectionKey, key, e.target.value)
                        }
                      />
                    </div>
                  );
                }

                if (Array.isArray(value) && typeof value[0] === 'string') {
                  return (
                    <div
                      key={key}
                      className="flex gap-4 flex-col border rounded-sm p-4"
                    >
                      {value.map((v, i) => (
                        <Input
                          key={i}
                          withAsterisk
                          label={
                            key.replace(/_/g, ' ').slice(0, -1) + ' ' + (i + 1)
                          }
                          value={v}
                          onChange={(e) => {
                            const updated = [...value];
                            updated[i] = e.target.value;
                            handleChange(sectionKey, key, updated);
                          }}
                        />
                      ))}
                    </div>
                  );
                }

                if (key === 'tabs') {
                  return (
                    <div key={key} className="space-y-6">
                      {(value as any[]).map((tab, tabIndex) => (
                        <div
                          key={tabIndex}
                          className="flex flex-col gap-4 rounded-md border p-4 bg-white"
                        >
                          <Input
                            withAsterisk
                            label="Título"
                            value={tab.titulo}
                            onChange={(e) => {
                              const tabs = [...value];
                              tabs[tabIndex] = {
                                ...tabs[tabIndex],
                                titulo: e.target.value
                              };
                              handleChange(sectionKey, key, tabs);
                            }}
                          />

                          <Textarea
                            withAsterisk
                            label="Texto"
                            value={tab.texto}
                            onChange={(e) => {
                              const tabs = [...value];
                              tabs[tabIndex] = {
                                ...tabs[tabIndex],
                                texto: e.target.value
                              };
                              handleChange(sectionKey, key, tabs);
                            }}
                          />

                          {(tab.carasteristicas || []).map(
                            (car: string, carIndex: number) => (
                              <Input
                                key={carIndex}
                                withAsterisk
                                label={`carasterística ${carIndex + 1}`}
                                value={car}
                                onChange={(e) => {
                                  const tabs = [...value];
                                  const updatedCar = [
                                    ...(tabs[tabIndex].carasteristicas || [])
                                  ];
                                  updatedCar[carIndex] = e.target.value;
                                  tabs[tabIndex] = {
                                    ...tabs[tabIndex],
                                    carasteristicas: updatedCar
                                  };
                                  handleChange(sectionKey, key, tabs);
                                }}
                              />
                            )
                          )}
                        </div>
                      ))}
                    </div>
                  );
                }

                if (
                  Array.isArray(value) &&
                  typeof value[0]?.url_imagen === 'string'
                ) {
                  return (
                    <div key={key} className="flex gap-4 flex-col">
                      {value.map((v, i) => (
                        <div
                          key={i}
                          className="flex gap-4 flex-col border p-2 rounded-md"
                        >
                          <Input
                            withAsterisk
                            label={`nombre ${i + 1}`}
                            value={v.url_imagen}
                            onChange={(e) => {
                              const updated = [...value];
                              updated[i] = {
                                ...updated[i],
                                url_imagen: e.target.value
                              };
                              handleChange(sectionKey, key, updated);
                            }}
                          />
                          <Textarea
                            withAsterisk
                            label={`texto ${i + 1}`}
                            value={v.texto}
                            onChange={(e) => {
                              const updated = [...value];
                              updated[i] = {
                                ...updated[i],
                                texto: e.target.value
                              };
                              handleChange(sectionKey, key, updated);
                            }}
                          />
                          <Input
                            withAsterisk
                            label={`url_imagen ${i + 1}`}
                            value={v.nombre}
                            onChange={(e) => {
                              const updated = [...value];
                              updated[i] = {
                                ...updated[i],
                                nombre: e.target.value
                              };
                              handleChange(sectionKey, key, updated);
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  );
                }

                return null;
              })}
          </CardContent>
        </Card>
      </details>
    );
  };

  const handleSubmit = async (action: 'create' | 'update') => {
    if (!validateAllSections()) {
      showToast('Todos los campos son obligatorios', 'error');
      return;
    }
    // 1. Parsear los artículos del segundo bloque
    const segundoBloqueParsed = JSON.parse(formState.segundo_bloque);

    // 2. Intercambiar nombre y url_imagen en cada artículo
    const articulosFormateados = segundoBloqueParsed.artículos.map(
      (a: any) => ({
        ...a,
        url_imagen: a.nombre,
        nombre: a.url_imagen
      })
    );

    // 3. Reemplazar el segundo_bloque con la nueva estructura formateada
    const newFormState = {
      ...formState,
      segundo_bloque: JSON.stringify({
        ...segundoBloqueParsed,
        artículos: articulosFormateados
      })
    } as any;

    // 4. Preparar formData si lo necesitas
    const formData = new FormData();
    // Aquí puedes seguir agregando campos a formData si es necesario

    try {
      fields.forEach((f) => formData.append(f, newFormState[f]));
      formData.append('id', detalle?.id || '');

      setLoading(true);
      if (action === 'create') await createProductoDetail(formData);
      else await updateProductoDetail(formData);

      await fetchDetalle();
      showToast(
        `Detalle ${action === 'create' ? 'creado' : 'actualizado'} correctamente`,
        'success'
      );

      router.push(`/productos`);
    } catch {
      showToast(
        `Error al ${action === 'create' ? 'crear' : 'actualizar'} el detalle`,
        'error'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 relative">
      <div className="sticky top-0 flex flex-col rounded-md p-4 bg-[#f5f9fc] mb-6">
        <h1 className="text-2xl font-bold">Detalle del Producto #{id}</h1>
      </div>

      <div className="flex flex-col gap-6">
        {fields
          .slice(0, -1)
          .map((field) => renderSectionCard(field, field.replace(/_/g, ' ')))}
      </div>

      <div className="sticky bottom-0 flex flex-col gap-4 py-4 rounded-md bg-[#f5f9fc]">
        <div className="flex gap-4 pt-4">
          <Button onClick={() => handleSubmit(detalle ? 'update' : 'create')}>
            {detalle ? 'Actualizar Detalle' : 'Crear Detalle'}
          </Button>
          {detalle && (
            <Button
              variant="destructive"
              onClick={async () => {
                try {
                  const formData = new FormData();
                  formData.append('id', detalle.id);
                  setLoading(true);
                  await deleteProductoDetail(formData);
                  setDetalle(null);
                  showToast('Detalle eliminado correctamente', 'success');
                  router.push(`/productos`);
                } catch {
                  showToast('Error al eliminar el detalle', 'error');
                } finally {
                  setLoading(false);
                }
              }}
            >
              Eliminar Detalle
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
