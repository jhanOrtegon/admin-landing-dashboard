'use client';

import { useEffect, useMemo, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { showToast } from '@/components/showToast';
import { useGlobalStore } from 'store/global-store';
import { getProductosDetalle } from './_actions/get-product-detail';
import { createProductoDetail } from './_actions/create-product-detail';
import { updateProductoDetail } from './_actions/update-product-detail';
import { deleteProductoDetail } from './_actions/delete-product-detail';
import { useParams, useRouter } from 'next/navigation';

import { getProductos } from '../_actions/get-product';
import { emptyProductDetailSections } from './_components/types';
import { sectionSchemas } from './_schemas/schemas';
import { TProducto } from '../types';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';

export default function ProductPageDetail() {
  const params = useParams();
  const slug = params?.id as string;
  const router = useRouter();
  const [detalle, setDetalle] = useState<any>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [formState, setFormState] = useState<Record<string, string>>({});
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});
  const [globalErrors, setGlobalErrors] = useState<Record<string, string>>({});

  const [product, setProduct] = useState<TProducto>();

  useMemo(async () => {
    const product = await getProductos('');
    setProduct(product.productos.find((d) => d.slug === slug));
  }, [slug]);

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
      if (!product?.id) {
        router.push(`/productos`);
        throw new Error('Producto no encontrado');
      }
      const current = response.data.find((d) => d.product_id === product?.id);
      const mapped: Record<string, string> = {};
      const source = current || emptyProductDetailSections;
      fields.forEach((f) => (mapped[f] = JSON.stringify(source[f] || {})));
      setFormState({ ...mapped, product_id: product?.id.toString() });
      setDetalle(current || null);
    } catch {
      showToast('Error al consultar el detalle', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (product?.id) fetchDetalle();
  }, [product?.id]);

  useEffect(() => {
    const stored = localStorage.getItem('openSections');
    if (stored) {
      try {
        setOpenSections(JSON.parse(stored));
      } catch {
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
      } catch {
        errors[key] = 'Sección inválida';
      }
    }
    setGlobalErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (action: 'create' | 'update') => {
    if (!validateAllSections()) {
      showToast('Todos los campos son obligatorios', 'error');
      return;
    }

    const segundoBloqueParsed = JSON.parse(formState.segundo_bloque);
    const articulosFormateados = segundoBloqueParsed.artículos.map(
      (a: any) => ({
        ...a,
        url_imagen: a.nombre,
        nombre: a.url_imagen
      })
    );

    const newFormState = {
      ...formState,
      segundo_bloque: JSON.stringify({
        ...segundoBloqueParsed,
        artículos: articulosFormateados
      })
    };

    const formData = new FormData();
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

  const handleDelete = async () => {
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
  };

  return (
    <>
      <div className="p-6  relative">
        <div className=" flex flex-col rounded-md p-4 pl-0 pt-2  mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Detalle del Producto {product?.nombre}
          </h1>
        </div>

        <div className="flex flex-col gap-6">
          {fields.slice(0, -1).map((field) => {
            let parsed: any = {};
            let rawValue = formState[field] || '{}';

            try {
              parsed = JSON.parse(rawValue);
            } catch {
              parsed = { error: 'JSON inválido', fallback: rawValue };
            }

            return (
              <details
                key={field}
                className="w-full rounded-md border border-gray-200 dark:border-gray-700 p-4 bg-white dark:bg-zinc-900 shadow-sm"
                open={openSections[field] ?? field === fields[0]}
                onToggle={(e) => {
                  if (!(e.currentTarget instanceof HTMLDetailsElement)) return;
                  setOpenSections((prev) => ({
                    ...prev,
                    [field]: e.currentTarget.open
                  }));
                }}
              >
                <summary className="cursor-pointer text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100 hover:underline transition-colors">
                  {field.replace(/_/g, ' ')}
                </summary>
                {globalErrors[field] && (
                  <p className="text-red-500 text-sm mt-2">
                    ⚠️ {globalErrors[field]}
                  </p>
                )}
                <Card className="w-full pt-6 border-0 bg-white dark:bg-zinc-900">
                  <CardContent className="space-y-4">
                    {parsed?.error && (
                      <div className="text-red-500">
                        {parsed.error}
                        {parsed.fallback && (
                          <pre className="bg-gray-100 dark:bg-zinc-800 text-gray-900 dark:text-gray-100 p-2 mt-2 text-xs overflow-auto rounded">
                            {parsed.fallback}
                          </pre>
                        )}
                      </div>
                    )}
                    {/* Aquí continuarías renderizando los campos */}
                  </CardContent>
                </Card>
              </details>
            );
          })}
        </div>

        <div className="flex flex-col gap-4 py-4 rounded-md">
          <div className="flex gap-4 pt-4">
            <Button onClick={() => handleSubmit(detalle ? 'update' : 'create')}>
              {detalle ? 'Actualizar Detalle' : 'Crear Detalle'}
            </Button>
            {detalle && (
              <Button
                variant="destructive"
                onClick={() => setShowDeleteModal(true)}
              >
                Eliminar Detalle
              </Button>
            )}
          </div>
        </div>
      </div>

      <ConfirmDialog
        open={showDeleteModal}
        onConfirm={handleDelete}
        onOpenChange={setShowDeleteModal}
        description="Esta acción no se puede deshacer"
        confirmText="Borrar"
        cancelText="Cancelar"
      />
    </>
  );
}
