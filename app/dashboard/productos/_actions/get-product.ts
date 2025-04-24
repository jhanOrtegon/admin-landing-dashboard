import { TLang } from '@/lib/models';
import { BASE_URL } from '@/lib/constant';
import { GetProductosResponse, nextProductos, TProducto } from '../types';

// ✅ GET
export async function getProductos(
  lang?: TLang
): Promise<GetProductosResponse> {
  try {
    const response = await fetch(`${BASE_URL}/api/productos`, {
      next: nextProductos
    });

    const data: { data: TProducto[] } = await response.json();

    let filtered = data.data;

    if (lang) {
      filtered = data.data.filter((p) => p.lang === lang);
    }

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
