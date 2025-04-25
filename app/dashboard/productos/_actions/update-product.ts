import { BASE_URL } from '@/lib/constant';
import { TLang } from '@/lib/models';

// ✅ UPDATE
export async function updateProducto(
  formDataOrOrden: FormData | number[] | string[],
  lang: TLang = 'ES'
) {
  let url = `${BASE_URL}/api/productos`;
  let payload: any;

  if (Array.isArray(formDataOrOrden)) {
    // 🧩 Caso: actualiza el orden global (array de IDs como number[] o string[])
    const orden = formDataOrOrden.map((id) => Number(id));

    if (orden.some((id) => Number.isNaN(id))) {
      throw new Error('Array de orden contiene valores no numéricos');
    }

    payload = { orden };
  } else {
    // 🧩 Caso: actualización individual
    const id = formDataOrOrden.get('id');
    url += `/${id}`;

    payload = {
      lang,
      categoría: formDataOrOrden.get('categoría'),
      nombre: formDataOrOrden.get('nombre'),
      titulo: formDataOrOrden.get('titulo'),
      descripción: formDataOrOrden.get('descripción'),
      imagen_principal: formDataOrOrden.get('imagen_principal'),
      imagen_nombre_principal: formDataOrOrden.get('imagen_nombre_principal'),
      carasteristicas: formDataOrOrden
        .getAll('carasteristicas[]')
        .filter((v) => v !== 'null')
    };
  }

  console.log({ formDataOrOrden, payload });

  try {
    const res = await fetch(url, {
      method: 'PATCH',
      body: JSON.stringify(payload),
      headers: { 'Content-Type': 'application/json' }
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || 'Error al actualizar los productos');
    }

    // ✅ Revalidar equipo general (puede ser más específico si manejas por lang)
    await fetch('/api/revalidate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tag: 'productos' })
    });
  } catch (error) {
    console.error('Error en updateProducto:', error);
    throw error;
  }
}
