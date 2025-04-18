// app/not-found.tsx
'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground px-4">
      <div className="text-center space-y-6">
        <h1 className="text-6xl font-bold tracking-tight">404</h1>
        <p className="text-xl">Oops! La página que buscas no existe.</p>
        <Link
          href="/"
          className="inline-flex items-center px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-md shadow hover:bg-primary/90 transition"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Volver al inicio
        </Link>
      </div>
    </main>
  );
}
