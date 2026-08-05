import { GripVertical } from "lucide-react";

import PlaceHolderImg from "@/assets/img/placeholder.png";
import LazyImage from "@/Components/guest/LazyImage";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function SortableItem({ item }) {
  const ASSET_URL = import.meta.env.VITE_PUBLIC_AWS_URL;

  const { id, title, users } = item;

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  if (!users || users.length === 0) return null;

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className="p-4 mb-4 bg-white rounded shadow cursor-move flex items-center gap-4"
    >
      <GripVertical className="flex-shrink-0 text-gray-400" />
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 flex-1 min-w-0">
        {users.map((user) => (
          <div key={user.id} className="flex items-center gap-2 flex-shrink-0">
            <LazyImage
              src={
                user.profile_picture
                  ? `${ASSET_URL}/${user.profile_picture}`
                  : PlaceHolderImg
              }
              className="!w-10 !h-10 rounded-full"
              alt={user.name}
            />
            <span className="font-medium text-sm truncate max-w-[150px]" title={user.name}>
              {user.name}
            </span>
          </div>
        ))}
      </div>
      <div className="flex-shrink-0 border-l border-gray-200 pl-4 ml-2">
        <p className="font-secondary text-sm text-gray-600 whitespace-nowrap">
          {title}
        </p>
      </div>
    </div>
  );
}
