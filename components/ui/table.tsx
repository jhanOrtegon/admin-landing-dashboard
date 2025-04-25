import * as React from 'react';
import {
  useSortable,
  SortableContext,
  verticalListSortingStrategy
} from '@dnd-kit/sortable';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { cn } from '@/lib/utils';

// 🧱 Tabla base
const Table = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => (
  <div className="relative w-full max-h-[calc(100vh-20rem)] overflow-auto rounded-xl">
    <div className="w-full overflow-x-auto">
      <table
        ref={ref}
        className={cn('w-full caption-bottom text-sm', className)}
        {...props}
      />
    </div>
  </div>
));

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead ref={ref} className={cn('[&_tr]:border-b', className)} {...props} />
));
TableHeader.displayName = 'TableHeader';

const TableBody = ({
  items,
  onReorder,
  children
}: {
  items: string[];
  onReorder: (items: string[]) => void;
  children: React.ReactNode;
}) => (
  <DndContext
    collisionDetection={closestCenter}
    onDragEnd={(event) => {
      const { active, over } = event;
      if (active.id !== over?.id) {
        const oldIndex = items.indexOf(active.id as string);
        const newIndex = items.indexOf(over?.id as string);
        const newItems = [...items];
        newItems.splice(oldIndex, 1);
        newItems.splice(newIndex, 0, active.id as string);
        onReorder(newItems);
      }
    }}
  >
    <SortableContext items={items} strategy={verticalListSortingStrategy}>
      <tbody>{children}</tbody>
    </SortableContext>
  </DndContext>
);

// 🎯 Fila ordenable
const SortableRow = ({
  id,
  children
}: {
  id: string;
  children: React.ReactNode;
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };

  return (
    <tr
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="border-b transition-colors hover:bg-muted/50 cursor-move"
    >
      {children}
    </tr>
  );
};

const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      'border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted',
      className
    )}
    {...props}
  />
));
TableRow.displayName = 'TableRow';

const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn(
      'border-t bg-muted/50 font-medium [&>tr]:last:border-b-0',
      className
    )}
    {...props}
  />
));
TableFooter.displayName = 'TableFooter';

const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      'h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0',
      className
    )}
    {...props}
  />
));
TableHead.displayName = 'TableHead';

const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn('p-4 align-middle [&:has([role=checkbox])]:pr-0', className)}
    {...props}
  />
));
TableCell.displayName = 'TableCell';

const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn('mt-4 text-sm text-muted-foreground', className)}
    {...props}
  />
));
TableCaption.displayName = 'TableCaption';

const SortableTableBody = ({
  items,
  onReorder,
  children
}: {
  items: string[];
  onReorder: (items: string[]) => void;
  children: React.ReactNode;
}) => {
  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragEnd={({ active, over }) => {
        if (active.id !== over?.id) {
          const oldIndex = items.indexOf(active.id as string);
          const newIndex = items.indexOf(over?.id as string);
          const newItems = [...items];
          newItems.splice(oldIndex, 1);
          newItems.splice(newIndex, 0, active.id as string);
          onReorder(newItems);
        }
      }}
    >
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        <tbody>{children}</tbody>
      </SortableContext>
    </DndContext>
  );
};

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableCell,
  TableCaption,
  SortableRow,
  TableRow,
  SortableTableBody
};
