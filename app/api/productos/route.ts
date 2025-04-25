import { sql } from '@/lib/db';
import { revalidateTag } from 'next/cache';
import { NextResponse } from 'next/server';

function toPgTextArray(arr: string[]): string {
  return `{${arr.map((item) => `"${item.replace(/"/g, '\\"')}"`).join(',')}}`;
}

export async function GET() {
  try {
    const result = await sql`
      SELECT 
        p.id,
        p.lang,
        p."categoría",
        p.nombre,
        p.titulo,
        p."descripción",
        p.imagen_principal,
        p.imagen_nombre_principal,
        p.carasteristicas,
        p.fecha_creacion
      FROM productos p
      ORDER BY p.orden ASC
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
      lang,
      categoría,
      nombre,
      titulo,
      descripción,
      imagen_principal,
      imagen_nombre_principal,
      carasteristicas // array de strings
    } = body;

    if (!Array.isArray(carasteristicas)) {
      throw new Error('carasteristicas debe ser un array');
    }

    const carasteristicasPgArray = toPgTextArray(carasteristicas);

    await sql`
      INSERT INTO productos (
        categoría,
        nombre,
        titulo,
        descripción,
        imagen_principal,
        imagen_nombre_principal,
        carasteristicas,
        lang
      ) VALUES (
        ${categoría},
        ${nombre},
        ${titulo},
        ${descripción},
        ${imagen_principal},
        ${imagen_nombre_principal},
        ${carasteristicasPgArray}::text[],
        ${lang}
      );
    `;

    revalidateTag(`productos-${lang}`);

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
        (id, index) =>
          sql`UPDATE productos SET orden = ${index} WHERE id = ${id};`
      );

      await Promise.all(updates);

      revalidateTag(`productos`);
    }

    return NextResponse.json({
      status: 'ok',
      message: 'Orden de productos actualizados ✅'
    });
  } catch (error) {
    console.error('Error al hacer PATCH a productos:', error);
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
