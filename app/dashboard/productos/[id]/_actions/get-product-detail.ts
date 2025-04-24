import { BASE_URL } from '@/lib/constant';
import { TLang } from '@/lib/models';

export async function getProductosDetalle(
  lang: TLang
): Promise<{ data: any[] }> {
  try {
    const response = await fetch(`${BASE_URL}/api/productos-detalle`, {
      cache: 'no-store' // o `next: { revalidate: 0 }` si usas Next.js app dir
    });

    const data: { data: any[] } = await response.json();

    const filtered = data.data.filter((p) => p.lang === lang);

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
