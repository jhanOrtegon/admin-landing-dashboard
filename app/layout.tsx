import './globals.css';
import { Toaster } from 'react-hot-toast';
import { Analytics } from '@vercel/analytics/react';
import GlobalLoadingOverlay from '@/components/ui/loading-overlay';

export const metadata = {
  title: 'Panel de Administración',
  description:
    'Aplicación interna para la gestión de vacantes laborales, administración de productos con sus respectivos detalles y organización del equipo de trabajo. Todo desde un panel centralizado, intuitivo y fácil de usar.'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex min-h-screen w-full flex-col">
        <Toaster />
        {children}
        <GlobalLoadingOverlay />
      </body>
      <Analytics />
    </html>
  );
}
