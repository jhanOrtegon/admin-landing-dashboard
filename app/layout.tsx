import './globals.css';
import { Toaster } from 'react-hot-toast';
import { Analytics } from '@vercel/analytics/react';
import GlobalLoadingOverlay from '@/components/ui/loading-overlay';

export const metadata = {
  title: 'panel de administración',
  description:
    'A user admin dashboard configured with Next.js, Postgres, NextAuth, Tailwind CSS, TypeScript, and Prettier.'
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
