'use client';

import { AlertCircle } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ReactNode } from 'react';

interface ConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  description: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
}

export const ConfirmDialog = ({
  open,
  onOpenChange,
  description,
  onConfirm,
  confirmText = 'Confirmar',
  cancelText = 'Cancelar'
}: ConfirmDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md rounded-2xl shadow-xl p-6">
        <DialogHeader className="flex flex-col items-center text-center">
          <AlertCircle className="text-red-400 size-12" />
          <DialogTitle className="text-3xl font-bold text-gray-700 mb-6">
            ¿Estás seguro?
          </DialogTitle>
          <DialogDescription className="text-gray-600 mt-10 text-center">
            {description}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex justify-center items-center mt-4 gap-4">
          <Button
            variant="outline"
            className="w-32"
            onClick={() => onOpenChange(false)}
          >
            {cancelText}
          </Button>
          <Button variant="secondary" className="w-32" onClick={onConfirm}>
            {confirmText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
