import { BASE_URL } from '@/lib/constant';

// ✅ UPDATE
export async function updateProducto(formData: FormData) {
  const id = formData.get('id');

  const payload = {
    categoría: formData.get('categoría'),
    nombre: formData.get('nombre'),
    descripción: formData.get('descripción'),
    imagen_principal: formData.get('imagen_principal'),
    imagen_nombre_principal: formData.get('imagen_nombre_principal'),
    estado_id: Number(formData.get('estado_id')),
    carasteristicas: formData
      .getAll('carasteristicas[]')
      .filter((v) => v !== 'null')
  };

  try {
    const res = await fetch(`${BASE_URL}/api/productos/${id}`, {
      next: { tags: [`producto-${id}`] },
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || 'Error al actualizar el producto');
    }

    await fetch('/api/revalidate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tag: 'productos' })
    });
  } catch (error) {
    console.error('Error en updateProducto:', error);
    throw error;
  }
}
