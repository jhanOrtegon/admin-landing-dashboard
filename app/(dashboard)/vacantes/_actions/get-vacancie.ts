import { BASE_URL } from '@/lib/constant';
import { GetVacantesResponse, nextVancies, TVacante } from '../types';

// ✅ GET
export async function getVacantes(
  search: string,
  offset: number,
  pageSize: number
): Promise<GetVacantesResponse> {
  try {
    const response = await fetch(`${BASE_URL}/api/vacantes`, {
      next: nextVancies
    });
    const data: { data: TVacante[] } = await response.json();

    const filtered = data.data.filter((p) =>
      p.titulo.toLowerCase().includes(search.toLowerCase())
    );

    const paginated = filtered.slice(offset, offset + pageSize);

    const newOffset =
      offset + pageSize < filtered.length ? offset + pageSize : null;

    return {
      newOffset,
      vacantes: paginated,
      totalVacantes: filtered.length
    };
  } catch (error) {
    console.error('Error al consultar:', error);

    return {
      newOffset: null,
      vacantes: [],
      totalVacantes: 0
    };
  }
}
