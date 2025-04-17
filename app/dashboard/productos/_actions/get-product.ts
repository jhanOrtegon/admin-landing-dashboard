import { BASE_URL } from '@/lib/constant';
import { GetProductosResponse, nextProductos, TProducto } from '../types';

// ✅ GET
export async function getProductos(
  search: string
): Promise<GetProductosResponse> {
  try {
    const response = await fetch(`${BASE_URL}/api/productos`, {
      next: nextProductos
    });

    const data: { data: TProducto[] } = await response.json();

    const filtered = data.data.filter((p) =>
      p.nombre.toLowerCase().includes(search.toLowerCase())
    );

    return {
      productos: filtered.map((producto) => ({
        ...producto,
        slug: producto.nombre.toLowerCase().replaceAll(/\s+/g, '-')
      }))
    };
  } catch (error) {
    console.error('Error al consultar productos:', error);

    return {
      productos: []
    };
  }
}
