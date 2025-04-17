'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { useAuthStore } from 'store/auth-store';
import { LogOut } from 'lucide-react';
import { ConfirmDialog } from './ConfirmDialog';

export function User() {
  const { logout } = useAuthStore((state) => state);
  const [showDialog, setShowDialog] = useState(false);

  const handleLogout = () => {
    document.cookie = 'logged_in=; path=/; max-age=0';
    logout();
    window.location.href = '/';
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="overflow-hidden rounded-full"
          >
            <Image
              src="/placeholder-user.jpg"
              width={36}
              height={36}
              alt="Avatar"
              className="rounded-full"
            />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuLabel>Mi cuenta</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setShowDialog(true)}>
            <LogOut className="mr-2 h-4 w-4 text-red-500" />
            Cerrar sesión
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <ConfirmDialog
        open={showDialog}
        onConfirm={handleLogout}
        onOpenChange={setShowDialog}
        description="Si cierras sesión, necesitarás ingresar tu usuario y contraseña nuevamente para acceder."
      />
    </>
  );
}
