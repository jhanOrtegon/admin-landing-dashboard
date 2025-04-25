import { sql } from '@/lib/db';
import { revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

// ✅ PATCH: Actualizar un miembro del equipo o el orden
export async function PATCH(req: NextRequest, context: any): Promise<Response> {
  try {
    const id = context?.params?.id ? Number(context.params.id) : null;
    const body = await req.json();

    // 🧩 Caso 1: Actualizar orden global (viene un array)
    if (Array.isArray(body.orden)) {
      const orden = body.orden as number[];

      if (orden.some((id) => typeof id !== 'number')) {
        return NextResponse.json(
          { status: 'error', message: 'Formato inválido del orden' },
          { status: 400 }
        );
      }

      // Actualiza orden por posición
      const updates = orden.map(
        (id, index) => sql`UPDATE equipo SET orden = ${index} WHERE id = ${id};`
      );

      await Promise.all(updates);

      revalidateTag(`equipo`); // o global, si manejas múltiples idiomas

      return NextResponse.json({
        status: 'ok',
        message: 'Orden del equipo actualizado ✅'
      });
    }

    // 🧩 Caso 2: Actualizar un miembro específico por id
    if (!id || Number.isNaN(id)) {
      return NextResponse.json(
        { status: 'error', message: 'ID inválido' },
        { status: 400 }
      );
    }

    const { url_image, nombre, descripcion, cargo, lang } = body;

    await sql`
      UPDATE equipo SET
        url_image = ${url_image},
        nombre = ${nombre},
        lang = ${lang},
        descripcion = ${descripcion},
        cargo = ${cargo}
      WHERE id = ${id};
    `;

    revalidateTag(`equipo-${id}-${lang}`);
    revalidateTag(`equipo-${lang}`);

    return NextResponse.json({
      status: 'ok',
      message: 'Miembro del equipo actualizado ✅'
    });
  } catch (error) {
    console.error('Error al hacer PATCH a equipo:', error);
    return NextResponse.json(
      {
        status: 'error',
        message: 'Error al procesar la solicitud',
        error: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}

// ✅ DELETE: Eliminar un miembro del equipo
export async function DELETE(
  req: NextRequest,
  context: any
): Promise<Response> {
  try {
    const id = Number(context?.params?.id);

    await sql`
      DELETE FROM equipo
      WHERE id = ${id};
    `;

    revalidateTag(`equipo-${id}`);
    revalidateTag('equipo');

    return NextResponse.json({
      status: 'ok',
      message: 'Miembro del equipo eliminado ✅'
    });
  } catch (error) {
    console.error('Error al eliminar miembro del equipo:', error);
    return NextResponse.json(
      {
        status: 'error',
        message: 'Error al eliminar miembro',
        error: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}
