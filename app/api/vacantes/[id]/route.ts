import { sql } from '@/lib/db';
import { revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(req: NextRequest, context: any): Promise<Response> {
  try {
    const id = Number(context?.params?.id);
    const body = await req.json();

    await sql`
      UPDATE Vacantes SET
        titulo = ${body.titulo},
        descripcion = ${body.descripcion},
        salario = ${body.salario},
        ubicacion = ${body.ubicacion},
        estado_id = ${body.estado_id}
      WHERE id = ${id};
    `;

    revalidateTag(`vacante-${id}`);
    revalidateTag('vacantes');

    return NextResponse.json({ status: 'ok', message: 'Vacante actualizada' });
  } catch (error) {
    console.error('Error al actualizar vacante:', error);
    return NextResponse.json(
      {
        status: 'error',
        message: 'Error al actualizar vacante',
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

    // Primero eliminar las relaciones en la tabla intermedia
    await sql`DELETE FROM Vacantes_Tecnologias WHERE vacante_id = ${id};`;

    // Luego eliminar la vacante principal
    await sql`DELETE FROM Vacantes WHERE id = ${id};`;

    revalidateTag(`vacante-${id}`);
    revalidateTag('vacantes');

    return NextResponse.json({ status: 'ok', message: 'Vacante eliminada' });
  } catch (error) {
    console.error('Error al eliminar vacante:', error);
    return NextResponse.json(
      {
        status: 'error',
        message: 'Error al eliminar vacante',
        error: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest, context: any): Promise<Response> {
  try {
    const id = Number(context?.params?.id);
    const result = await sql`
      SELECT 
        v.id, 
        v.titulo, 
        v.descripcion, 
        v.salario, 
        v.ubicacion, 
        e.nombre AS estado, 
        ARRAY_AGG(t.nombre) AS tecnologias,
        v.fecha_publication,
        v.estado_id
      FROM Vacantes v
      JOIN Estados e ON v.estado_id = e.id
      LEFT JOIN Vacantes_Tecnologias vt ON v.id = vt.vacante_id
      LEFT JOIN Tecnologias t ON vt.tecnologia_id = t.id
      WHERE v.id = ${id}
      GROUP BY v.id, e.nombre;
    `;

    if (result.length === 0) {
      return NextResponse.json(
        { status: 'error', message: 'Vacante no encontrada' },
        { status: 404 }
      );
    }

    return NextResponse.json({ status: 'ok', data: result[0] });
  } catch (error) {
    console.error('Error al obtener vacante:', error);
    return NextResponse.json(
      {
        status: 'error',
        message: 'Error al obtener vacante',
        error: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}
