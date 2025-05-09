import { dateFormatter } from "@/utils";

import Button from "../Button/Button";

export default function NewsCard({ data }) {
  const formattedDate = dateFormatter(data.created_at);

  const ASSET_URL = import.meta.env.VITE_PUBLIC_ASSET_URL;

  return (
    <div className="border border-neutral-300 border-x-0 w-full flex justify-between items-center h-20">
      <p className="font-secondary pl-4">{formattedDate}</p>
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl">{data.title}</h1>
        <h3 className="text-b200 uppercase font-semibold tracking-wider font-secondary">
          {data.alternate_title}
        </h3>
      </div>

      <Button
        className="w-60 h-full"
        onClick={() =>
          window.open(`${ASSET_URL}/uploads/${data.document_name}`, "_blank")
        }
      >
        Baca
      </Button>
    </div>
  );
}
