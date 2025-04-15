'use client';

import { use, useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { showToast } from '@/components/showToast';
import { useGlobalStore } from '@/lib/global-store';
import { z } from 'zod';
import { getProductosDetalle } from './_actions/get-product-detail';
import { createProductoDetail } from './_actions/create-product-detail';
import { updateProductoDetail } from './_actions/update-product-detail';
import { deleteProductoDetail } from './_actions/delete-product-detail';

const jsonSchema = z.object({
  id: z.number().optional(),
  nombre: z.string().optional(),
  texto: z.string().optional(),
  categoria: z.string().optional(),
  primera_url_imagen: z.string().url().optional(),
  segunda_url_imagen: z.string().url().optional(),
  url_imagen: z.string().url().optional(),
  tabs: z
    .array(
      z.object({
        id: z.number().optional(),
        titulo: z.string().optional(),
        texto: z.string().optional(),
        carasteristicas: z.array(z.string()).optional()
      })
    )
    .optional(),
  artículos: z
    .array(
      z.object({
        id: z.number().optional(),
        nombre: z.string().optional(),
        texto: z.string().optional(),
        url_imagen: z.string().url().optional()
      })
    )
    .optional(),
  carasteristicas: z.array(z.string()).optional(),
  urls: z.array(z.string().url()).optional()
});

export default function ProductPageDetail({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [detalle, setDetalle] = useState<any>(null);
  const [formState, setFormState] = useState<Record<string, string>>({});
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
      const current = response.data.find((d) => d.product_id === Number(id));
      if (current) {
        setDetalle(current);
        const mapped: Record<string, string> = {};
        fields.forEach((f) => (mapped[f] = JSON.stringify(current[f] || {})));
        setFormState({ ...mapped, product_id: id });
      }
    } catch (issue) {
      showToast('Error al consultar el detalle', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (action: 'create' | 'update') => {
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
    } catch (issue) {
      showToast(
        `Error al ${action === 'create' ? 'crear' : 'actualizar'} el detalle`,
        'error'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      const formData = new FormData();
      formData.append('id', detalle.id);
      setLoading(true);
      await deleteProductoDetail(formData);
      setDetalle(null);
      showToast('Detalle eliminado correctamente', 'success');
    } catch (issue) {
      showToast('Error al eliminar el detalle', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDetalle();
  }, [id]);

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-bold">Detalle del Producto #{id}</h1>

      {fields.map((field) => {
        let parsed: any = {};
        try {
          parsed = jsonSchema.parse(JSON.parse(formState[field] || '{}'));
        } catch (e) {
          parsed = { error: 'JSON inválido' };
        }

        return (
          <Card key={field} className="w-full">
            <CardHeader>
              <CardTitle className="capitalize">
                {field.replace(/_/g, ' ')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Textarea
                className="w-full"
                rows={6}
                value={formState[field] || ''}
                onChange={(e) => handleChange(field, e.target.value)}
              />
              {parsed && typeof parsed === 'object' && !parsed.error && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  {Object.entries(parsed).map(([key, value]) => (
                    <div key={key}>
                      <strong className="capitalize block">
                        {key.replace(/_/g, ' ')}:
                      </strong>
                      {typeof value === 'string' && value.startsWith('http') ? (
                        <img
                          src={value}
                          alt={key}
                          className="w-full max-w-xs rounded-md border"
                        />
                      ) : Array.isArray(value) ? (
                        <ul className="list-disc ml-5">
                          {value.map((item, idx) => (
                            <li key={idx}>
                              {typeof item === 'string'
                                ? item
                                : JSON.stringify(item)}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p>{JSON.stringify(value)}</p>
                      )}
                    </div>
                  ))}
                </div>
              )}
              {parsed?.error && <p className="text-red-500">{parsed.error}</p>}
            </CardContent>
          </Card>
        );
      })}

      <div className="flex gap-4 pt-4">
        <Button onClick={() => handleSubmit(detalle ? 'update' : 'create')}>
          {detalle ? 'Actualizar Detalle' : 'Crear Detalle'}
        </Button>
        {detalle && (
          <Button variant="destructive" onClick={handleDelete}>
            Eliminar Detalle
          </Button>
        )}
      </div>
    </div>
  );
}
