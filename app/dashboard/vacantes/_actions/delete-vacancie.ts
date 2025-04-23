import { BASE_URL } from '@/lib/constant';
import { TLang } from '@/lib/models';

// ✅ DELETE
export async function deleteVacante(formData: FormData) {
  const id = formData.get('id');

  try {
    const res = await fetch(`${BASE_URL}/api/vacantes/${id}`, {
      next: { tags: [`vacante-${id}`] },
      method: 'DELETE'
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || 'Error al eliminar la vacante');
    }

    // revalidateTag('vacantes');
    // revalidateTag(`vacante-${id}`);
  } catch (error) {
    console.error('Error en deleteVacante:', error);
    throw error;
  }
}
