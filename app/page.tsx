'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { showToast } from '@/components/showToast';
import { useRouter } from 'next/navigation';
import { useAuthStore } from 'store/auth-store';
import { useGlobalStore } from 'store/global-store';
import { BASE_URL, PASSWORD_LOGIN, USER_LOGIN } from '@/lib/constant';
import { ThemeToggle } from '@/components/ThemeToggle';

export default function LoginPage() {
  const router = useRouter();
  const setLoading = useGlobalStore((state) => state.setLoading);
  const { login, isLoggedIn } = useAuthStore((state) => state);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (username === USER_LOGIN && password === PASSWORD_LOGIN) {
      setLoading(true);
      document.cookie = 'logged_in=true; path=/; max-age=86400';
      setTimeout(() => {
        login();
        router.push('/dashboard');
        setLoading(false);
      }, 2000);
    } else {
      showToast('Usuario o contraseña incorrectos', 'error');
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center px-4 bg-white dark:bg-gray-900 transition-colors">
      {/* Toggle opcional */}
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      <Card className="w-full max-w-sm shadow-2xl border-none bg-white dark:bg-gray-800 backdrop-blur-md transition-colors">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl text-gray-900 dark:text-white">
            Iniciar Sesión
          </CardTitle>
          <CardDescription className="text-gray-500 dark:text-white/70">
            Administra tu página
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleLogin} className="px-6 space-y-4">
          <Input
            placeholder="Usuario"
            className="bg-gray-100 dark:bg-white/10 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-white/50"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Contraseña"
            className="bg-gray-100 dark:bg-white/10 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-white/50"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" disabled={isLoggedIn} className="w-full mt-2">
            Entrar
          </Button>
        </form>
        <CardFooter className="justify-center text-sm text-gray-500 dark:text-white/50 mt-2">
          Acceso restringido
        </CardFooter>
      </Card>
    </div>
  );
}
