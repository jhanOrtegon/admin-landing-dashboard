'use client';

import Link from 'next/link';
import { Briefcase, Package, Users } from 'lucide-react';

export default function DashboardPage() {
  const modules = [
    {
      title: 'Vacantes',
      description: 'Administra las vacantes disponibles y su información.',
      href: '/dashboard/vacantes',
      icon: <Briefcase className="h-8 w-8 text-primary" />
    },
    {
      title: 'Productos',
      description: 'Gestiona productos y su detalle de forma sencilla.',
      href: '/dashboard/productos',
      icon: <Package className="h-8 w-8 text-primary" />
    },
    {
      title: 'Equipo',
      description: 'Consulta y organiza los miembros del equipo.',
      href: '/dashboard/equipo',
      icon: <Users className="h-8 w-8 text-primary" />
    }
  ];

  return (
    <div
      style={{ minHeight: 'calc(100vh - 50px)' }}
      className="bg-background flex flex-col items-center justify-center"
    >
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-2">Módulos del sistema</h1>
        <p className="text-muted-foreground text-lg">
          Bienvenido a la página principal de tu sistema
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
        {modules.map((module) => (
          <Link
            key={module.title}
            href={module.href}
            className="group rounded-2xl border border-border p-6 shadow-md hover:shadow-xl transition-all bg-card hover:-translate-y-1"
          >
            <div className="flex flex-col items-center gap-4 text-center">
              <div className="bg-primary/10 rounded-full p-4">
                {module.icon}
              </div>
              <h2 className="text-xl font-semibold group-hover:text-primary transition-colors">
                {module.title}
              </h2>
              <p className="text-muted-foreground">{module.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
