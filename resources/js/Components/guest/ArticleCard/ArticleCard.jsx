import PlaceholderImg from "@/assets/img/placeholder.png";
import { articleDateFormatter } from "@/utils";
import { Link } from "@inertiajs/react";

import Button from "../Button/Button";
import LazyImage from "../LazyImage";

export default function ArticleCard({ type = "primary", data }) {
  const ASSET_URL = import.meta.env.VITE_PUBLIC_ASSET_URL;

  const { day, month, year } = articleDateFormatter(data.created_at);

  if (type === "primary") {
    return (
      <div className="flex flex-col md:flex-row bg-b100 w-full">
        <LazyImage
          src={
            data.main_image_name
              ? `${ASSET_URL}/uploads/${data.main_image_name}`
              : PlaceholderImg
          }
          alt={data.title + " img"}
          className="w-full md:!w-[720px] !h-[250px] md:!h-[500px] object-cover object-center border-r-0"
        />
        <div className="p-4 md:p-8 flex flex-col gap-4 w-full">
          <p className="text-b200 font-secondary font-semibold text-sm">
            {day} {month} {year}
          </p>
          <h1 className="text-b300 text-xl md:text-3xl">{data.title}</h1>
          <p className="font-secondary font-bold uppercase text-sm md:text-base">
            {data.article_type.name} — {data.publisher.name}
          </p>
          <div className="flex flex-col gap-4 h-full justify-end">
            <p className="font-secondary text-sm md:text-base">
              {data.preview}
            </p>
            <Link
              className="w-full"
              href={route("article.guest.show", { slug: data.slug })}
            >
              <Button className="w-full">Baca</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
  if (type === "secondary") {
    return (
      <div className="flex flex-col bg-b100">
        <LazyImage
          src={
            data.main_image_name
              ? `${ASSET_URL}/uploads/${data.main_image_name}`
              : PlaceholderImg
          }
          alt={data.title + " img"}
          className="w-full !h-[150px] lg:!h-[250px] object-cover object-center border border-b-0"
        />
        <div className="p-2 md:p-5 flex flex-col gap-4 md:gap-5 h-full">
          <p className="text-b200 font-secondary font-semibold text-sm">
            {day} {month} {year}
          </p>
          <h1 className="text-b300 text-xl lg:text-3xl">{data.title}</h1>
          <p className="font-secondary text-xs lg:text-base font-bold uppercase">
            {data.article_type.name} — {data.publisher.name}
          </p>
          <div className="flex flex-col gap-4 h-full justify-end">
            <p className="font-secondary text-sm lg:text-base">
              {data.preview}
            </p>
            <Link
              className="w-full"
              href={route("article.guest.show", { slug: data.slug })}
            >
              <Button className="w-full">Baca</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
