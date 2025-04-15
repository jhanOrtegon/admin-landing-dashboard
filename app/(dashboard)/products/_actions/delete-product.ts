import { BASE_URL } from '@/lib/constant';

// ✅ DELETE
export async function deleteProducto(formData: FormData) {
  const id = formData.get('id');

  try {
    const res = await fetch(`${BASE_URL}/api/productos/${id}`, {
      next: { tags: [`producto-${id}`] },
      method: 'DELETE'
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || 'Error al eliminar el producto');
    }
  } catch (error) {
    console.error('Error en deleteProducto:', error);
    throw error;
  }
}
