import { BASE_URL } from '@/lib/constant';
import { nextProductos } from '../types';

// ✅ CREATE
export async function createProducto(formData: FormData) {
  const payload = {
    categoría: formData.get('categoría'),
    nombre: formData.get('nombre'),
    titulo: formData.get('titulo'),
    descripción: formData.get('descripción'),
    imagen_principal: formData.get('imagen_principal'),
    imagen_nombre_principal: formData.get('imagen_nombre_principal'),
    estado_id: Number(formData.get('estado_id')),
    carasteristicas: formData
      .getAll('carasteristicas[]')
      .filter((v) => v !== 'null')
  };

  try {
    const res = await fetch(`${BASE_URL}/api/productos`, {
      next: nextProductos,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || 'Error al crear el producto');
    }
  } catch (error) {
    console.error('Error en createProducto:', error);
    throw error;
  }
}
