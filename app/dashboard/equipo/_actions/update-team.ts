import { BASE_URL } from '@/lib/constant';
import { TLang } from '@/lib/models';

// ✅ UPDATE EQUIPO
export async function updateEquipo(formData: FormData, lang: TLang = 'ES') {
  const id = formData.get('id');

  const payload = {
    lang,
    url_image: formData.get('url_image'),
    nombre: formData.get('nombre'),
    descripcion: formData.get('descripcion'),
    cargo: formData.get('cargo')
  };

  try {
    const res = await fetch(`${BASE_URL}/api/equipo/${id}`, {
      next: { tags: [`equipo-${id}`] },
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || 'Error al actualizar el miembro');
    }

    // ✅ Revalidar equipo general si tienes una API interna como esta
    await fetch('/api/revalidate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tag: 'equipo' })
    });
  } catch (error) {
    console.error('Error en updateEquipo:', error);
    throw error;
  }
}
