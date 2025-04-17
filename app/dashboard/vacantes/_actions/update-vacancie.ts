import { BASE_URL } from '@/lib/constant';

// ✅ UPDATE
export async function updateVacante(formData: FormData) {
  const id = formData.get('id');

  const payload = {
    titulo: formData.get('titulo'),
    descripcion: formData.get('descripcion'),
    estado_id: Number(formData.get('estado_id')),
    salario: Number(formData.get('salario')),
    ubicacion: formData.get('ubicacion'),
    tecnologia_id: formData
      .getAll('tecnologia_id[]')
      .filter((v) => v !== 'null')
  };

  try {
    const res = await fetch(`${BASE_URL}/api/vacantes/${id}`, {
      next: { tags: [`vacante-${id}`] },
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || 'Error al actualizar la vacante');
    }

    await fetch('/api/revalidate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tag: 'vacantes' })
    });
  } catch (error) {
    console.error('Error en updateVacante:', error);
    throw error;
  }
}
