import { sql } from '@/lib/db';
import { revalidateTag } from 'next/cache';
import { NextResponse } from 'next/server';

function toPgTextArray(arr: string[]): string {
  return `{${arr.map((item) => `"${item}"`).join(',')}}`;
}

export async function GET() {
  try {
    const result = await sql`
      SELECT 
        p.id,
        p."categoría",
        p.nombre,
        p."descripción",
        p.imagen_principal,
        p.imagen_nombre_principal,
        p.carasteristicas,
        p.estado_id,
        e.nombre AS estado,
        p.fecha_creacion
      FROM productos p
      JOIN estados e ON p.estado_id = e.id
      ORDER BY p.fecha_creacion DESC
      LIMIT 100;
    `;

    return NextResponse.json({
      status: 'ok',
      data: result
    });
  } catch (error) {
    console.error('Error al consultar productos:', error);
    return NextResponse.json(
      {
        status: 'error',
        message: 'Falló la consulta de productos ❌',
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
      categoría,
      nombre,
      descripción,
      imagen_principal,
      imagen_nombre_principal,
      carasteristicas, // array de strings
      estado_id
    } = body;

    if (!Array.isArray(carasteristicas)) {
      throw new Error('carasteristicas debe ser un array');
    }

    const carasteristicasPgArray = toPgTextArray(carasteristicas);

    await sql`
      INSERT INTO productos (
        "categoría",
        nombre,
        "descripción",
        imagen_principal,
        imagen_nombre_principal,
        carasteristicas,
        estado_id
      ) VALUES (
        ${categoría},
        ${nombre},
        ${descripción},
        ${imagen_principal},
        ${imagen_nombre_principal},
        ${carasteristicasPgArray}::text[],
        ${estado_id}
      );
    `;

    revalidateTag('productos');

    return NextResponse.json({ status: 'ok', message: 'Producto creado' });
  } catch (error) {
    console.error('Error al crear producto:', error);
    return NextResponse.json(
      {
        status: 'error',
        message: 'Error al crear producto',
        error: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}
