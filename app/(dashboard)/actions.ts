import { BASE_URL } from '@/lib/constant';
import { GetVacantesResponse, TVacante } from '@/lib/models';

const next = { tags: ['vacantes'] };

// ✅ CREATE
export async function createVacante(formData: FormData) {
  const payload = {
    titulo: formData.get('titulo'),
    descripcion: formData.get('descripcion'),
    estado_id: Number(formData.get('estado_id')),
    salario: Number(formData.get('salario')),
    ubicacion: formData.get('ubicacion'),
    fecha_publication: new Date().toISOString(),
    tecnologia_id: formData
      .getAll('tecnologia_id[]')
      .filter((v) => v !== 'null')
  };

  try {
    const res = await fetch(`${BASE_URL}/api/vacantes`, {
      next,
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

// ✅ GET
export async function getVacantes(
  search: string,
  offset: number,
  pageSize: number
): Promise<GetVacantesResponse> {
  try {
    const response = await fetch(`${BASE_URL}/api/vacantes`, {
      next
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
