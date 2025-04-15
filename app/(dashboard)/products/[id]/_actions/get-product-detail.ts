import { BASE_URL } from '@/lib/constant';

export async function getProductosDetalle(
  search: string
): Promise<{ data: any[] }> {
  try {
    const response = await fetch(`${BASE_URL}/api/productos-detalle`, {
      cache: 'no-store' // o `next: { revalidate: 0 }` si usas Next.js app dir
    });

    const data: { data: any[] } = await response.json();

    const filtered = data.data.filter((detalle) =>
      detalle?.producto_nombre?.toLowerCase?.().includes(search.toLowerCase())
    );

    return {
      data: filtered
    };
  } catch (error) {
    console.error('Error al consultar productos_detalle:', error);

    return {
      data: []
    };
  }
}
