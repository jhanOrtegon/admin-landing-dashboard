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
        ARRAY_AGG(t.nombre) AS tecnologias
      FROM 
        Vacantes v
      LEFT JOIN 
        Vacantes_Tecnologias vt ON v.id = vt.vacante_id
      LEFT JOIN 
        Tecnologias t ON vt.tecnologia_id = t.id
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
      tecnologia_id, // string[] o number[]
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
    const result = await sql`
      INSERT INTO Vacantes (
        titulo,
        descripcion,
        salario,
        ubicacion,
        lang
      ) VALUES (
        ${titulo},
        ${descripcion},
        ${salario},
        ${ubicacion},
        ${lang}
      )
      RETURNING id;
    `;

    const vacanteId = result[0]?.id;

    // 2. Insertar tecnologías
    if (Array.isArray(tecnologia_id) && tecnologia_id.length > 0 && vacanteId) {
      const values: any[] = [];
      const placeholders: string[] = [];

      tecnologia_id.forEach((techId, index) => {
        values.push(vacanteId, Number(techId));
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
