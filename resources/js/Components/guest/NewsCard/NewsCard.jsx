import { dateFormatter } from "@/utils";

import Button from "../Button/Button";

export default function NewsCard({ data }) {
  const formattedDate = dateFormatter(data.created_at);

  const ASSET_URL = import.meta.env.VITE_PUBLIC_ASSET_URL;

  return (
    <div className="border border-neutral-300 border-x-0 w-full flex flex-col md:flex-row justify-between items-start md:items-center h-auto md:h-20 py-4 md:py-0">
      <p className="font-secondary pl-4 mb-2 md:mb-0 text-sm md:text-base">
        {formattedDate}
      </p>
      <div className="flex flex-col mb-8 md:mb-0 gap-1 px-4 md:px-0 flex-1 md:flex-initial">
        <h1 className="text-xl md:text-3xl">{data.title}</h1>
        <h3 className="text-b200 uppercase font-semibold tracking-wider font-secondary text-sm md:text-base">
          {data.alternate_title}
        </h3>
      </div>

      <Button
        className="w-full md:w-60"
        onClick={() =>
          window.open(`${ASSET_URL}/uploads/${data.document_name}`, "_blank")
        }
      >
        Baca
      </Button>
    </div>
  );
}
