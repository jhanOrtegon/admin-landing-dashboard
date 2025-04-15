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
      estado_id,
      tecnologia_id // debe ser un array de ids: string[] o number[]
    } = body;

    // 1. Actualizar la vacante
    await sql`
      UPDATE Vacantes SET
        titulo = ${titulo},
        descripcion = ${descripcion},
        salario = ${salario},
        ubicacion = ${ubicacion},
        estado_id = ${estado_id}
      WHERE id = ${id};
    `;

    // 2. Eliminar tecnologías actuales asociadas
    await sql`
      DELETE FROM vacantes_tecnologias
      WHERE vacante_id = ${id};
    `;

    // 3. Insertar nuevas tecnologías (si hay)
    if (Array.isArray(tecnologia_id) && tecnologia_id.length > 0) {
      const values: any[] = [];
      const placeholders: string[] = [];

      tecnologia_id.forEach((techId, index) => {
        values.push(id, Number(techId));
        placeholders.push(`($${index * 2 + 1}, $${index * 2 + 2})`);
      });

      await sql.query(
        `
          INSERT INTO vacantes_tecnologias (vacante_id, tecnologia_id)
          VALUES ${placeholders.join(', ')}
       `,
        values
      );
    }

    // 4. Revalidar caché
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
