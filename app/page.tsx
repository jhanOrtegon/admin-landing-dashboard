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

const USER = 'jhan';
const PASSWORD = '1234';

export default function LoginPage() {
  const router = useRouter();
  const setLoading = useGlobalStore((state) => state.setLoading);

  const { login } = useAuthStore((state) => state);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (username === USER && password === PASSWORD) {
      setLoading(true);
      document.cookie = 'logged_in=true; path=/; max-age=86400';
      setTimeout(() => {
        setLoading(false);
        login();
        router.push('/vacantes');
      }, 2000);
    } else {
      showToast('Usuario o contraseña incorrectos', 'error');
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-gray-900 to-slate-800 px-4">
      <Card className="w-full max-w-sm shadow-2xl border-none bg-white/5 backdrop-blur-md">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl text-white">Iniciar Sesión</CardTitle>
          <CardDescription className="text-white/70">
            Administra tu pagina
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleLogin} className="px-6 space-y-4">
          <Input
            placeholder="Usuario"
            className="bg-white/10 text-white placeholder:text-white/50"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Contraseña"
            className="bg-white/10 text-white placeholder:text-white/50"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" className="w-full mt-2">
            Entrar
          </Button>
        </form>
        <CardFooter className="justify-center text-sm text-white/50 mt-2">
          Acceso restringido
        </CardFooter>
      </Card>
    </div>
  );
}
