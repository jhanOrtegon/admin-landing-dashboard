import { sql } from '@/lib/db';
import { NextResponse } from 'next/server';

// export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const result = await sql`
      SELECT 
        v.id, 
        v.titulo, 
        v.descripcion, 
        v.salario, 
        v.ubicacion, 
        v.estado_id,
        e.nombre AS estado,
        ARRAY_AGG(t.nombre) AS tecnologias
      FROM 
          Vacantes v
      JOIN 
          Estados e ON v.estado_id = e.id
      LEFT JOIN 
          Vacantes_Tecnologias vt ON v.id = vt.vacante_id
      LEFT JOIN 
          Tecnologias t ON vt.tecnologia_id = t.id
      GROUP BY 
          v.id, e.nombre
      LIMIT 5;
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
