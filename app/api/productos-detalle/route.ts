import { sql } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const result = await sql`
      SELECT 
        pd.id,
        pd.primera_seccion,
        pd.segunda_seccion,
        pd.tercera_seccion,
        pd.cuarta_seccion,
        pd.quinta_seccion,
        pd.seccion_preguntas,
        pd.seccion_apoyo,
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
      primera_seccion,
      segunda_seccion,
      tercera_seccion,
      cuarta_seccion,
      quinta_seccion,
      seccion_preguntas,
      seccion_apoyo,
      product_id
    } = body;

    await sql`
      INSERT INTO productos_detalle (
        primera_seccion,
        segunda_seccion,
        tercera_seccion,
        cuarta_seccion,
        quinta_seccion,
        seccion_preguntas,
        seccion_apoyo,
        product_id
      ) VALUES (
        ${JSON.stringify(primera_seccion)}::jsonb,
        ${JSON.stringify(segunda_seccion)}::jsonb,
        ${JSON.stringify(tercera_seccion)}::jsonb,
        ${JSON.stringify(cuarta_seccion)}::jsonb,
        ${JSON.stringify(quinta_seccion)}::jsonb,
        ${JSON.stringify(seccion_preguntas)}::jsonb,
        ${JSON.stringify(seccion_apoyo)}::jsonb,
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
