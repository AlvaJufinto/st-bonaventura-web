import { useState } from "react";

import {
  closestCenter,
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import SortableItem from "./SortableItem";

export default function CouncilList({ items }) {
  const [councilList, setCouncilList] = useState(
    items.map((item) => ({ id: item.id, ...item }))
  );

  const sensors = useSensors(useSensor(PointerSensor));

  async function updateCouncilOrder(newOrderIds) {
    try {
      const response = await fetch("dph/reorder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": document
            .querySelector('meta[name="csrf-token"]')
            .getAttribute("content"),
        },
        body: JSON.stringify({
          ordered_ids: newOrderIds,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
    } catch (error) {
      console.error("Gagal update urutan:", error);
    }
  }

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const oldIndex = councilList.findIndex((item) => item.id === active.id);
    const newIndex = councilList.findIndex((item) => item.id === over.id);
    const newList = arrayMove(councilList, oldIndex, newIndex);
    setCouncilList(newList);

    updateCouncilOrder(newList.map((item) => item.id));
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={councilList.map((item) => item.id)}
        strategy={verticalListSortingStrategy}
      >
        {councilList.map((item) => (
          <SortableItem key={item.id} item={item} />
        ))}
      </SortableContext>
    </DndContext>
  );
}
