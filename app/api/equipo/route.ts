import { sql } from '@/lib/db';
import { revalidateTag } from 'next/cache';
import { NextResponse } from 'next/server';

// ✅ GET: Obtener todos los miembros del equipo
export async function GET() {
  try {
    const result = await sql`
      SELECT id, url_image, nombre, descripcion, cargo, lang
      FROM equipo
      ORDER BY orden ASC
      LIMIT 100;
    `;

    return NextResponse.json({
      status: 'ok',
      data: result
    });
  } catch (error) {
    console.error('Error al consultar equipo:', error);
    return NextResponse.json(
      {
        status: 'error',
        message: 'Falló la consulta ❌',
        error: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}

// ✅ POST: Crear un nuevo miembro del equipo
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { url_image, nombre, descripcion, cargo, lang } = body;

    if (!nombre || !cargo) {
      return NextResponse.json(
        {
          status: 'error',
          message: 'Faltan campos obligatorios: nombre y cargo'
        },
        { status: 400 }
      );
    }

    await sql`
      INSERT INTO equipo (
        url_image,
        nombre,
        descripcion,
        cargo,
        lang
      ) VALUES (
        ${url_image},
        ${nombre},
        ${descripcion},
        ${cargo},
        ${lang}
      );
    `;

    revalidateTag(`equipo-${lang}`);

    return NextResponse.json({
      status: 'ok',
      message: 'Miembro del equipo creado correctamente ✅'
    });
  } catch (error) {
    console.error('Error al crear miembro del equipo:', error);
    return NextResponse.json(
      {
        status: 'error',
        message: 'Error al crear miembro',
        error: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request) {
  try {
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
    }

    return NextResponse.json({
      status: 'ok',
      message: 'Orden del equipo actualizado ✅'
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
