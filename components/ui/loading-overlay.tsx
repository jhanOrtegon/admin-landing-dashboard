'use client';

import { Loader2 } from 'lucide-react';
import { useGlobalStore } from 'store/global-store';

export default function GlobalLoadingOverlay() {
  const isLoading = useGlobalStore((state) => state.isLoading);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center transition-opacity duration-300">
      <div className="flex flex-col items-center gap-3 bg-white dark:bg-zinc-900 p-6 rounded-lg shadow-lg">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
        <p className="text-sm font-medium text-zinc-700 dark:text-zinc-200">
          Procesando solicitud...
        </p>
      </div>
    </div>
  );
}
