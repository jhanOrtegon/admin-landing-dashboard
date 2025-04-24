import { sql } from '@/lib/db';
import { revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(req: NextRequest, context: any): Promise<Response> {
  try {
    const id = Number(context?.params?.id);
    const body = await req.json();

    const {
      titulo,
      descripcion,
      salario,
      ubicacion,
      tecnologia_id,
      modalidad,
      lang // nuevo campo a soportar
    } = body;

    // Validar lang si viene
    if (lang && !['ES', 'EN'].includes(lang)) {
      return NextResponse.json(
        { status: 'error', message: 'Idioma no válido. Solo ES o EN' },
        { status: 400 }
      );
    }

    // 1. Actualizar vacante
    await sql`
      UPDATE vacantes SET
        titulo = ${titulo},
        descripcion = ${descripcion},
        salario = ${salario},
        modalidad = ${modalidad},
        ubicacion = ${ubicacion},
        tecnologias = ${tecnologia_id}::text[],
        lang = ${lang ?? 'ES'}
      WHERE id = ${id};
    `;

    // 4. Revalidar caché
    revalidateTag(`vacante-${id}-${lang}`);
    revalidateTag(`vacantes-${lang}`);

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
