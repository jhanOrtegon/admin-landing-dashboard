import { closestCenter, DndContext } from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy
} from '@dnd-kit/sortable';

export const SortableTableBody = ({
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
