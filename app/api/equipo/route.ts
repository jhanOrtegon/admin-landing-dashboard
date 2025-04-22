import { sql } from '@/lib/db';
import { revalidateTag } from 'next/cache';
import { NextResponse } from 'next/server';

// ✅ GET: Obtener todos los miembros del equipo
export async function GET() {
  try {
    const result = await sql`
      SELECT id, url_image, nombre, descripcion, cargo
      FROM equipo
      ORDER BY id ASC
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
    const { url_image, nombre, descripcion, cargo } = body;

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
        cargo
      ) VALUES (
        ${url_image},
        ${nombre},
        ${descripcion},
        ${cargo}
      );
    `;

    revalidateTag('equipo');

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
