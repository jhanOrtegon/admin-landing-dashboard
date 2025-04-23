import { sql } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(req: NextRequest, context: any): Promise<Response> {
  try {
    const id = Number(context?.params?.id); // este es el ID del detalle, no del producto
    const body = await req.json();

    const {
      banner,
      primer_bloque,
      segundo_bloque,
      tercer_bloque,
      cuarto_bloque,
      quinto_bloque,
      preguntas
    } = body;

    await sql`
      UPDATE productos_detalle SET
        banner = ${JSON.stringify(banner)}::jsonb,
        primer_bloque = ${JSON.stringify(primer_bloque)}::jsonb,
        segundo_bloque = ${JSON.stringify(segundo_bloque)}::jsonb,
        tercer_bloque = ${JSON.stringify(tercer_bloque)}::jsonb,
        cuarto_bloque = ${JSON.stringify(cuarto_bloque)}::jsonb,
        quinto_bloque = ${JSON.stringify(quinto_bloque)}::jsonb,
        preguntas = ${JSON.stringify(preguntas)}::jsonb,
      WHERE id = ${id};
    `;

    return NextResponse.json({ status: 'ok', message: 'Detalle actualizado' });
  } catch (error) {
    console.error('Error al actualizar detalle:', error);
    return NextResponse.json(
      {
        status: 'error',
        message: 'Error al actualizar detalle de producto',
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
    const id = Number(context?.params?.id); // este es el ID del detalle

    await sql`DELETE FROM productos_detalle WHERE id = ${id};`;

    return NextResponse.json({ status: 'ok', message: 'Detalle eliminado' });
  } catch (error) {
    console.error('Error al eliminar detalle:', error);
    return NextResponse.json(
      {
        status: 'error',
        message: 'Error al eliminar detalle',
        error: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}
