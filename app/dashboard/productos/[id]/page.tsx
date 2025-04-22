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
import { dataInitial, emptyProductDetailSections } from './_components/types';
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
      if (current) {
        setDetalle(current);
        const mapped: Record<string, string> = {};
        fields.forEach((f) => (mapped[f] = JSON.stringify(current[f] || {})));
        setFormState({ ...mapped, product_id: product?.id.toString() });
      } else {
        const mapped: Record<string, string> = {};
        // const current = emptyProductDetailSections as any;
        const current = dataInitial as any;

        fields.forEach((f) => (mapped[f] = JSON.stringify(current[f] || {})));
        // setFormState({ ...mapped, product_id: product?.id.toString() });
        setFormState({ ...dataInitial });
      }
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
        className="w-full rounded-md border p-4 bg-white dark:bg-zinc-900 border-gray-200 dark:border-gray-700 shadow-sm"
        open={openSections[sectionKey] ?? sectionKey === fields[0]}
        onToggle={(e) => {
          if (!(e.currentTarget instanceof HTMLDetailsElement)) return;
          const isOpen = e.currentTarget.open;
          setOpenSections((prev) => ({ ...prev, [sectionKey]: isOpen }));
        }}
      >
        <summary className="cursor-pointer text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100 hover:underline transition-colors">
          {title}
        </summary>
        {globalErrors[sectionKey] && (
          <p className="text-red-500 text-sm mt-2">
            ⚠️ {globalErrors[sectionKey]}
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
                          className="flex flex-col gap-4 rounded-md border p-4 bg-white dark:bg-zinc-900"
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
        ...a
        // url_imagen: a.nombre,
        // nombre: a.url_imagen
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

      router.push(`/dashboard/productos`);
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
      router.push(`/dashboard/productos`);
    } catch {
      showToast('Error al eliminar el detalle', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="p-6 pt-0 relative">
        <div className="flex flex-col rounded-md p-4 pl-0 pt-2 mb-6">
          <h1 className="text-2xl font-bold">
            Detalle del Producto {product?.nombre}
          </h1>
        </div>

        <div className="flex flex-col gap-6">
          {fields
            .slice(0, -1)
            .map((field) => renderSectionCard(field, field.replace(/_/g, ' ')))}
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
