import { sql } from '@/lib/db';
import { revalidateTag } from 'next/cache';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const result = await sql`
      SELECT 
        v.id, 
        v.titulo, 
        v.descripcion, 
        v.salario, 
        v.ubicacion,
        v.lang,
        v.tecnologias,
        v.modalidad
      FROM 
        Vacantes v
      GROUP BY 
        v.id
      ORDER BY 
        v.fecha_publicacion DESC
      LIMIT 100;
    `;

    return NextResponse.json({
      status: 'ok',
      data: result
    });
  } catch (error) {
    console.error('Error al consultar:', error);
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

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      titulo,
      descripcion,
      salario,
      ubicacion,
      tecnologia_id,
      modalidad,
      lang = 'ES' // valor por defecto si no viene
    } = body;

    // ✅ Validación de lang
    if (!['ES', 'EN'].includes(lang)) {
      return NextResponse.json(
        { status: 'error', message: 'Idioma no válido. Solo ES o EN' },
        { status: 400 }
      );
    }

    // 1. Insertar vacante
    await sql`
      INSERT INTO Vacantes (
        titulo,
        descripcion,
        salario,
        ubicacion,
        ubicacion,
        tecnologias,
        modalidad,
        lang
      ) VALUES (
        ${titulo},
        ${descripcion},
        ${salario},
        ${ubicacion},
        ${tecnologia_id},
        ${modalidad},
        ${lang}
      )
      RETURNING id;
    `;

    // 3. Revalidar caché
    revalidateTag(`vacantes-${lang}`);

    return NextResponse.json({ status: 'ok', message: 'Vacante creada' });
  } catch (error) {
    console.error('Error al crear vacante:', error);
    return NextResponse.json(
      {
        status: 'error',
        message: 'Error al crear vacante',
        error: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}
