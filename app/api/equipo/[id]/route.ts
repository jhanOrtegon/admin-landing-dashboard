import { sql } from '@/lib/db';
import { revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

type Context = {
  params: {
    id: string;
  };
};

// ✅ PATCH: Actualizar un miembro del equipo
export async function PATCH(req: NextRequest, context: any): Promise<Response> {
  try {
    const id = Number(context?.params?.id);
    const body = await req.json();

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
    console.error('Error al actualizar miembro del equipo:', error);
    return NextResponse.json(
      {
        status: 'error',
        message: 'Error al actualizar miembro',
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
