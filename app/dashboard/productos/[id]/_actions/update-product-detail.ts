import { BASE_URL } from '@/lib/constant';
import { TLang } from '@/lib/models';

export async function updateProductoDetail(formData: FormData, lang: TLang) {
  const id = formData.get('id');

  if (!id || id === 'null') {
    throw new Error('El campo "id" es obligatorio para actualizar el detalle');
  }

  const requiredFields = [
    'banner',
    'primer_bloque',
    'segundo_bloque',
    'tercer_bloque',
    'cuarto_bloque',
    'quinto_bloque',
    'preguntas',
    'product_id'
  ];

  const payload: Record<string, any> = {};

  for (const field of requiredFields) {
    const value = formData.get(field);
    if (!value || value === 'null') {
      throw new Error(`El campo "${field}" es obligatorio`);
    }

    if (field === 'product_id') {
      payload[field] = Number(value);
      if (isNaN(payload[field])) {
        throw new Error(`El campo "product_id" debe ser un número válido`);
      }
    } else {
      try {
        payload[field] = JSON.parse(value as string);
      } catch {
        throw new Error(`El campo "${field}" debe ser un JSON válido`);
      }
    }
  }

  try {
    const res = await fetch(`${BASE_URL}/api/productos-detalle/${id}`, {
      next: { tags: [`producto-detalle-${id}`] },
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...payload, lang })
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || 'Error al actualizar el detalle');
    }

    await fetch('/api/revalidate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tag: `producto-detalle-${id}` })
    });
  } catch (error) {
    console.error('Error en updateProductoDetail:', error);
    throw error;
  }
}
