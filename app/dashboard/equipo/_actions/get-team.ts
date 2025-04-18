import { BASE_URL } from '@/lib/constant';
import { TEquipo, nextEquipo } from '../types';

// ✅ GET EQUIPO (sin paginación)
export async function getEquipo(search: string): Promise<TEquipo[]> {
  try {
    const response = await fetch(`${BASE_URL}/api/equipo`, {
      next: nextEquipo
    });

    const data: { data: TEquipo[] } = await response.json();

    const filtered = data.data.filter((p) =>
      p.nombre.toLowerCase().includes(search.toLowerCase())
    );

    return filtered;
  } catch (error) {
    console.error('Error al consultar equipo:', error);
    return [];
  }
}
