import { BASE_URL } from '@/lib/constant';
import { TLang } from '@/lib/models';

export const nextEquipo = {
  tags: ['equipo']
};

// ✅ CREATE EQUIPO
export async function createEquipo(formData: FormData, lang: TLang = 'ES') {
  const payload = {
    lang,
    url_image: formData.get('url_image'),
    nombre: formData.get('nombre'),
    descripcion: formData.get('descripcion'),
    cargo: formData.get('cargo')
  };

  try {
    const res = await fetch(`${BASE_URL}/api/equipo`, {
      next: nextEquipo,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || 'Error al crear miembro del equipo');
    }
  } catch (error) {
    console.error('Error en createEquipo:', error);
    throw error;
  }
}
