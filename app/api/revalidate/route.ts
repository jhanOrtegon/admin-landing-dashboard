import { revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { tag } = await req.json();

    if (!tag) {
      return NextResponse.json({ error: 'Tag es requerido' }, { status: 400 });
    }

    revalidateTag(tag);
    return NextResponse.json({ status: 'ok', revalidated: tag });
  } catch (error) {
    console.error('Error al revalidar tag:', error);
    return NextResponse.json(
      { error: 'Error en revalidación' },
      { status: 500 }
    );
  }
}
