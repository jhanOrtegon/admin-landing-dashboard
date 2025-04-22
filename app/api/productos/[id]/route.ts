import { sql } from '@/lib/db';
import { revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

function toPgTextArray(arr: string[]) {
  return `{${arr.map((item) => `"${item}"`).join(',')}}`;
}

export async function PATCH(req: NextRequest, context: any): Promise<Response> {
  try {
    const id = Number(context?.params?.id);
    const body = await req.json();

    const {
      categoría,
      nombre,
      titulo,
      descripción,
      imagen_principal,
      imagen_nombre_principal,
      carasteristicas
    } = body;

    if (!Array.isArray(carasteristicas)) {
      throw new Error('carasteristicas debe ser un array de strings');
    }

    const carasteristicasPgArray = toPgTextArray(carasteristicas);

    await sql`
      UPDATE productos SET
        "categoría" = ${categoría},
        nombre = ${nombre},
        titulo = ${titulo},
        "descripción" = ${descripción},
        imagen_principal = ${imagen_principal},
        imagen_nombre_principal = ${imagen_nombre_principal},
        carasteristicas = ${carasteristicasPgArray}::text[]
      WHERE id = ${id};
    `;

    revalidateTag(`producto-${id}`);
    revalidateTag('productos');

    return NextResponse.json({ status: 'ok', message: 'Producto actualizado' });
  } catch (error) {
    console.error('Error al actualizar producto:', error);
    return NextResponse.json(
      {
        status: 'error',
        message: 'Error al actualizar producto',
        error: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  context: any
): Promise<Response> {
  try {
    const id = Number(context?.params?.id);

    await sql`DELETE FROM productos WHERE id = ${id};`;

    revalidateTag(`producto-${id}`);
    revalidateTag('productos');

    return NextResponse.json({ status: 'ok', message: 'Producto eliminado' });
  } catch (error) {
    console.error('Error al eliminar producto:', error);
    return NextResponse.json(
      {
        status: 'error',
        message: 'Error al eliminar producto',
        error: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}
