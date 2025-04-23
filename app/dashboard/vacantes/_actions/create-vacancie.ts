import { BASE_URL } from '@/lib/constant';
import { nextVancies } from '../types';
import { TLang } from '@/lib/models';

// ✅ CREATE
export async function createVacante(formData: FormData, lang: TLang = 'ES') {
  const payload = {
    lang,
    titulo: formData.get('titulo'),
    descripcion: formData.get('descripcion'),
    salario: Number(formData.get('salario')),
    ubicacion: formData.get('ubicacion'),
    fecha_publication: new Date().toISOString(),
    tecnologia_id: formData
      .getAll('tecnologia_id[]')
      .filter((v) => v !== 'null')
  };

  try {
    const res = await fetch(`${BASE_URL}/api/vacantes`, {
      next: nextVancies,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || 'Error al crear la vacante');
    }
  } catch (error) {
    console.error('Error en createVacante:', error);
    throw error;
  }
}
