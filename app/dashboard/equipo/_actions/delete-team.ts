import { BASE_URL } from '@/lib/constant';

// ✅ DELETE EQUIPO
export async function deleteEquipo(formData: FormData) {
  const id = formData.get('id');

  try {
    const res = await fetch(`${BASE_URL}/api/equipo/${id}`, {
      next: { tags: [`equipo-${id}`, 'equipo'] },
      method: 'DELETE'
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || 'Error al eliminar el miembro');
    }
  } catch (error) {
    console.error('Error en deleteEquipo:', error);
    throw error;
  }
}
