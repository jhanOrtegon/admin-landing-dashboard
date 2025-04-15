import { sql } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(req: NextRequest, context: any): Promise<Response> {
  try {
    const id = Number(context?.params?.id); // este es el ID del detalle, no del producto
    const body = await req.json();

    const {
      primera_seccion,
      segunda_seccion,
      tercera_seccion,
      cuarta_seccion,
      quinta_seccion,
      seccion_preguntas,
      seccion_apoyo
    } = body;

    await sql`
      UPDATE productos_detalle SET
        primera_seccion = ${JSON.stringify(primera_seccion)}::jsonb,
        segunda_seccion = ${JSON.stringify(segunda_seccion)}::jsonb,
        tercera_seccion = ${JSON.stringify(tercera_seccion)}::jsonb,
        cuarta_seccion = ${JSON.stringify(cuarta_seccion)}::jsonb,
        quinta_seccion = ${JSON.stringify(quinta_seccion)}::jsonb,
        seccion_preguntas = ${JSON.stringify(seccion_preguntas)}::jsonb,
        seccion_apoyo = ${JSON.stringify(seccion_apoyo)}::jsonb
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
