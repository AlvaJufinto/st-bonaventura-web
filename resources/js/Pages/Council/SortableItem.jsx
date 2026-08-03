import { GripVertical } from "lucide-react";

import PlaceHolderImg from "@/assets/img/placeholder.png";
import LazyImage from "@/Components/guest/LazyImage";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function SortableItem({ item }) {
  const ASSET_URL = import.meta.env.VITE_PUBLIC_AWS_URL;

  const { id, title, users } = item;
  const firstUser = users?.[0];

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  if (!firstUser) return null;

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
          firstUser.profile_picture
            ? `${ASSET_URL}/${firstUser.profile_picture}`
            : PlaceHolderImg
        }
        className="!w-48 aspect-square"
      />
      <div className="space-y-4">
        <h1 className="font-secondary text-2xl">{firstUser.name}</h1>
        <p className="font-secondary">{title}</p>
        <p className="font-secondary">{firstUser.email}</p>
        {users.length > 1 && (
          <p className="font-secondary text-gray-500">+{users.length - 1} others</p>
        )}
      </div>
    </div>
  );
}
