'use client';

import { useRouter } from 'next/navigation';
import { useAuthStore } from './auth-store';

export function handleLogout() {
  const router = useRouter();

  // Borrar la cookie
  document.cookie = 'logged_in=; path=/; max-age=0';

  // Actualizar Zustand
  useAuthStore.getState().logout();

  // Redireccionar
  router.push('/');
}
