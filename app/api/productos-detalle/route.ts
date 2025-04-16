import { sql } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const result = await sql`
      SELECT 
        pd.id,
        pd.banner,
        pd.primer_bloque,
        pd.segundo_bloque,
        pd.tercer_bloque,
        pd.cuarto_bloque,
        pd.quinto_bloque,
        pd.preguntas,
        pd.apoyo,
        pd.product_id,
        p.nombre AS producto_nombre,
        pd.fecha_creacion
      FROM productos_detalle pd
      JOIN productos p ON pd.product_id = p.id
      ORDER BY pd.fecha_creacion DESC
      LIMIT 100;
    `;

    return NextResponse.json({
      status: 'ok',
      data: result
    });
  } catch (error) {
    console.error('Error al consultar productos_detalle:', error);
    return NextResponse.json(
      {
        status: 'error',
        message: 'Falló la consulta de detalles ❌',
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
      banner,
      primer_bloque,
      segundo_bloque,
      tercer_bloque,
      cuarto_bloque,
      quinto_bloque,
      preguntas,
      apoyo,
      product_id
    } = body;

    await sql`
      INSERT INTO productos_detalle (
        banner,
        primer_bloque,
        segundo_bloque,
        tercer_bloque,
        cuarto_bloque,
        quinto_bloque,
        preguntas,
        apoyo,
        product_id
      ) VALUES (
        ${JSON.stringify(banner)}::jsonb,
        ${JSON.stringify(primer_bloque)}::jsonb,
        ${JSON.stringify(segundo_bloque)}::jsonb,
        ${JSON.stringify(tercer_bloque)}::jsonb,
        ${JSON.stringify(cuarto_bloque)}::jsonb,
        ${JSON.stringify(quinto_bloque)}::jsonb,
        ${JSON.stringify(preguntas)}::jsonb,
        ${JSON.stringify(apoyo)}::jsonb,
        ${product_id}
      );
    `;

    return NextResponse.json({
      status: 'ok',
      message: 'Detalle de producto creado'
    });
  } catch (error) {
    console.error('Error al crear detalle:', error);
    return NextResponse.json(
      {
        status: 'error',
        message: 'Error al crear detalle de producto',
        error: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}
