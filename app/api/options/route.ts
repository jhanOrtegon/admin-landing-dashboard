import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type');

  try {
    if (type === 'estados') {
      const result = await sql`SELECT id, nombre FROM estados ORDER BY id`;
      return NextResponse.json({ data: result });
    }

    if (type === 'tecnologias') {
      const result = await sql`SELECT id, nombre FROM tecnologias ORDER BY id`;
      return NextResponse.json({ data: result });
    }

    return NextResponse.json(
      { error: 'Tipo inválido. Usa ?type=estados o ?type=tecnologias' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Error al consultar opciones:', error);
    return NextResponse.json(
      {
        error: 'Error en el servidor',
        detail: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}
