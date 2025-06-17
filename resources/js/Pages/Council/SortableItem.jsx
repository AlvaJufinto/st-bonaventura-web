import { GripVertical } from "lucide-react";

import PlaceHolderImg from "@/assets/img/placeholder.png";
import LazyImage from "@/Components/guest/LazyImage";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function SortableItem({ item }) {
  const ASSET_URL = import.meta.env.VITE_PUBLIC_ASSET_URL;

  const { id, title, user } = item;

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className="p-4 mb-4 bg-white rounded shadow cursor-move flex gap-4"
    >
      <GripVertical />
      <LazyImage
        src={
          user.profile_picture
            ? `${ASSET_URL}/uploads/${user.profile_picture}`
            : PlaceHolderImg
        }
        className="!w-48 aspect-square"
      />
      <div className="space-y-4">
        <h1 className="font-secondary text-2xl">{user.name}</h1>
        <p className="font-secondary">{title}</p>
        <p className="font-secondary">{user.email}</p>
      </div>
    </div>
  );
}
