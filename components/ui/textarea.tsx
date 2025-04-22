import * as React from 'react';
import { cn } from '@/lib/utils';

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  withAsterisk?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, id, label, withAsterisk, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1">
        {label && (
          <label htmlFor={id} className="text-sm font-medium text-foreground">
            {label} {withAsterisk && <span className="text-red-500">*</span>}
          </label>
        )}
        <textarea
          id={id}
          maxLength={500}
          placeholder="Escribir..."
          className={cn(
            'flex w-full rounded-md border border-input bg-white dark:bg-zinc-900 text-gray-900 dark:text-gray-100 px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm min-h-[10px] max-h-[200px]',
            className
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);
Textarea.displayName = 'Textarea';

export { Textarea };
