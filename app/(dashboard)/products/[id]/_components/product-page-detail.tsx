'use client';

import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { showToast } from '@/components/showToast';
import { useGlobalStore } from '@/lib/global-store';
import { z } from 'zod';
import { getProductosDetalle } from '../_actions/get-product-detail';
import { createProductoDetail } from '../_actions/create-product-detail';
import { updateProductoDetail } from '../_actions/update-product-detail';
import { deleteProductoDetail } from '../_actions/delete-product-detail';
import { useRouter } from 'next/navigation';
import { emptyProductDetailSections } from './types';

const TabSchema = z.object({
  id: z.number(),
  titulo: z.string(),
  texto: z.string(),
  carasteristicas: z.array(z.string())
});

const ArticuloSchema = z.object({
  id: z.number(),
  nombre: z.string(),
  texto: z.string(),
  url_imagen: z.string().url()
});

const PrimeraSeccionSchema = z.object({
  id: z.number(),
  nombre: z.string(),
  texto: z.string(),
  primera_url_imagen: z.string().url(),
  segunda_url_imagen: z.string().url()
});

const SegundaSeccionSchema = z.object({
  id: z.number(),
  categoria: z.string(),
  nombre: z.string(),
  artículos: z.array(ArticuloSchema)
});

const TerceraSeccionSchema = z.object({
  id: z.number(),
  categoria: z.string(),
  nombre: z.string(),
  url_imagen: z.string().url(),
  carasteristicas: z.array(z.string())
});

const CuartaYQuintaSeccionSchema = z.object({
  id: z.number(),
  categoria: z.string(),
  nombre: z.string(),
  texto: z.string(),
  url_imagen: z.string().url(),
  tabs: z.array(TabSchema)
});

const PreguntasSeccionSchema = z.object({
  id: z.number(),
  categoria: z.string(),
  nombre: z.string(),
  tabs: z.array(TabSchema.omit({ carasteristicas: true }))
});

const ApoyoSeccionSchema = z.object({
  id: z.number(),
  categoria: z.string(),
  nombre: z.string(),
  urls: z.array(z.string().url())
});

export const sectionSchemas = {
  primera_seccion: PrimeraSeccionSchema,
  segunda_seccion: SegundaSeccionSchema,
  tercera_seccion: TerceraSeccionSchema,
  cuarta_seccion: CuartaYQuintaSeccionSchema,
  quinta_seccion: CuartaYQuintaSeccionSchema,
  seccion_preguntas: PreguntasSeccionSchema,
  seccion_apoyo: ApoyoSeccionSchema
};

// ... importaciones y esquemas arriba (ya definidos)

export function ProductPageDetail({ id }: { id: string }) {
  const router = useRouter();
  const [detalle, setDetalle] = useState<any>(null);
  const [formState, setFormState] = useState<Record<string, string>>({});
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});
  const [globalErrors, setGlobalErrors] = useState<Record<string, string>>({});

  const setLoading = useGlobalStore((state) => state.setLoading);

  const fields = [
    'primera_seccion',
    'segunda_seccion',
    'tercera_seccion',
    'cuarta_seccion',
    'quinta_seccion',
    'seccion_preguntas',
    'seccion_apoyo',
    'product_id'
  ];

  const fetchDetalle = async () => {
    setLoading(true);
    try {
      const response = await getProductosDetalle('');
      const current = response.data.find((d) => d.product_id === id);
      if (current) {
        setDetalle(current);
        const mapped: Record<string, string> = {};
        fields.forEach((f) => (mapped[f] = JSON.stringify(current[f] || {})));
        setFormState({ ...mapped, product_id: id });
      } else {
        const mapped: Record<string, string> = {};
        const current = emptyProductDetailSections as any;
        console.log(current, 'current');
        fields.forEach((f) => (mapped[f] = JSON.stringify(current[f] || {})));
        setFormState({ ...mapped, product_id: id });
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
              .map(([key, value]) =>
                typeof value === 'string' ? (
                  <div key={key}>
                    <Input
                      placeholder={key.replace(/_/g, ' ')}
                      value={value}
                      onChange={(e) =>
                        handleChange(sectionKey, key, e.target.value)
                      }
                    />
                  </div>
                ) : Array.isArray(value) && typeof value[0] === 'string' ? (
                  <div key={key} className="flex gap-4 flex-col">
                    {value.map((v, i) => (
                      <Input
                        key={i}
                        placeholder={
                          key.replace(/_/g, ' ').slice(0, -1) + ' ' + (i + 1)
                        }
                        value={v}
                        onChange={(e) =>
                          handleChange(
                            sectionKey,
                            key,
                            e.target.value.split('\n')
                          )
                        }
                      />
                    ))}
                  </div>
                ) : Array.isArray(value) &&
                  typeof value[0]?.url_imagen === 'string' ? (
                  <div key={key} className="flex gap-4 flex-col">
                    {value.map((v, i) => (
                      <div
                        key={i}
                        className="flex gap-4 flex-col border p-2 rounded-md"
                      >
                        <Input
                          placeholder={`nombre ${i + 1}`}
                          value={v.url_imagen}
                          onChange={(e) =>
                            handleChange(
                              sectionKey,
                              key,
                              e.target.value.split('\n')
                            )
                          }
                        />
                        <Textarea
                          placeholder={`texto ${i + 1}`}
                          value={v.texto}
                          onChange={(e) =>
                            handleChange(
                              sectionKey,
                              key,
                              e.target.value.split('\n')
                            )
                          }
                        />

                        <Input
                          placeholder={`url_imagen ${i + 1}`}
                          value={v.nombre}
                          onChange={(e) =>
                            handleChange(
                              sectionKey,
                              key,
                              e.target.value.split('\n')
                            )
                          }
                        />
                      </div>
                    ))}
                  </div>
                ) : null
              )}
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

    const formData = new FormData();
    try {
      fields.forEach((f) => formData.append(f, formState[f]));
      formData.append('id', detalle?.id || '');

      setLoading(true);
      if (action === 'create') await createProductoDetail(formData);
      else await updateProductoDetail(formData);

      await fetchDetalle();
      showToast(
        `Detalle ${action === 'create' ? 'creado' : 'actualizado'} correctamente`,
        'success'
      );

      router.push(`/products`);
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
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-bold">Detalle del Producto #{id}</h1>
      {fields
        .slice(0, -1)
        .map((field) => renderSectionCard(field, field.replace(/_/g, ' ')))}
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
                router.push(`/products`);
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
  );
}
