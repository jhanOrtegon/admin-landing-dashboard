import { BASE_URL } from '@/lib/constant';

export async function deleteProductoDetail(formData: FormData) {
  const id = formData.get('id');

  if (!id || id === 'null') {
    throw new Error('El campo "id" del detalle es obligatorio');
  }

  try {
    const res = await fetch(`${BASE_URL}/api/productos-detalle/${id}`, {
      next: { tags: [`producto-detalle-${id}`] },
      method: 'DELETE'
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(
        error.message || 'Error al eliminar el detalle del producto'
      );
    }
  } catch (error) {
    console.error('Error en deleteProductoDetail:', error);
    throw error;
  }
}
