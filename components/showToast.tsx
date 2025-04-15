'use client';

import { toast as hotToast } from 'react-hot-toast';
import { CheckCircle, AlertCircle, Loader2, Info } from 'lucide-react';
import { ReactNode } from 'react';

export type ToastType = 'success' | 'error' | 'loading' | 'info';

const iconMap: Record<ToastType, ReactNode> = {
  success: <CheckCircle className="text-green-500 w-5 h-5" />,
  error: <AlertCircle className="text-red-500 w-5 h-5" />,
  loading: <Loader2 className="animate-spin text-blue-500 w-5 h-5" />,
  info: <Info className="text-blue-400 w-5 h-5" />
};

export const showToast = (
  message: string,
  type: ToastType = 'info',
  options?: {
    id?: string;
    duration?: number;
  }
) => {
  const content = (
    <div className="flex items-center gap-2">
      {iconMap[type]}
      <span className="text-sm font-medium">{message}</span>
    </div>
  );

  if (type === 'loading') {
    return hotToast.loading(content, options);
  } else {
    return hotToast.custom(
      (t) => (
        <div
          className={`transform transition-all duration-300 ease-in-out opacity-0 scale-95
          ${
            t.visible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          } max-w-md w-full bg-white dark:bg-zinc-900 shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5 px-4 py-3`}
        >
          {content}
        </div>
      ),
      options
    );
  }
};
