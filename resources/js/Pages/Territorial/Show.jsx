import PlaceholderImg from "@/assets/img/placeholder.png";
import ArticleCard from "@/Components/guest/ArticleCard/ArticleCard";
import Button from "@/Components/guest/Button/Button";
import Footer from "@/Components/guest/Footer/Footer";
import LazyImage from "@/Components/guest/LazyImage";
import Navbar from "@/Components/guest/Navbar/Navbar";
import { titleName } from "@/utils";
import { Head, Link } from "@inertiajs/react";

export default function Show({ data, articles }) {
  console.log("🚀 ~ Show ~ data:", data);
  const type = data?.name;
  const title = `${titleName[data?.organization_type_id]} ${type}`;
  const ASSET_URL = import.meta.env.VITE_PUBLIC_ASSET_URL;

  return (
    <div>
      <Head title={data.name} />
      <Navbar />
      <div className="outer-wrapper !py-40 !pb-20 !justify-start min-h-[300px] img-background">
        <div className="inner-wrapper !flex-row !justify-between relative">
          <div>
            <div className="space-y-4 mb-16">
              <p className="font-secondary font-semibold text-xl">
                {data.address}
              </p>
              <h1 className="text-5xl">{data.name}</h1>
              <p className="text-b200 font-secondary font-semibold text-lg">
                {data.alternate_name}
              </p>
              {(data.organization_type_id != 1 ||
                data.organization_type_id != 2) && (
                <p className="font-secondary text-lg w-3/5">
                  {data.description}
                </p>
              )}
            </div>
            {data.children.length > 0 && (
              <ul className="list-decimal space-y-2 pl-6 mb-5 font-secondary">
                {data.children.map((child, index) => (
                  <li key={index} className="font-secondary font-medium">
                    {child.name} — {child.address}
                  </li>
                ))}
              </ul>
            )}
          </div>
          {/* <LazyImage
            className="!h-auto !w-2/5 object-cover"
            src="https://www.rafflespaint.com/cdn/shop/products/PURE_BLACK_RP0-1_69e69038-13dc-4241-8b7f-a52ad6a2ca1e.jpg?v=1566778789"
            alt="Hello"
          /> */}
        </div>
      </div>

      {data.head && (
        <div className="outer-wrapper !py-20 !justify-start min-h-[300px]">
          <div className="inner-wrapper !items-start gap-10 relative">
            <h1 className="tracking-wider text-4xl capitalize">{title}</h1>
            <div className="w-40 space-y-4">
              <LazyImage
                src={
                  data.head.profile_picture
                    ? `${ASSET_URL}/uploads/${data.head.profile_picture}`
                    : PlaceholderImg
                }
                alt={data.head + " img"}
                className="!w-full object-cover object-center border"
              />
              <h1 className="text-2xl text-center">{data.head.name}</h1>
            </div>
          </div>
        </div>
      )}

      {(data.organization_type_id == 1 || data.organization_type_id == 2) &&
        data.description && (
          <div className="outer-wrapper !py-20 !justify-start min-h-[300px]">
            <div className="inner-wrapper !items-start gap-10 relative">
              <h1 className="tracking-wider text-4xl capitalize">
                Profil {type}
              </h1>
              <p className="font-secondary text-lg w-3/4">{data.description}</p>
            </div>
          </div>
        )}

      {data.children.length > 0 && (
        <div className="outer-wrapper !py-20 !justify-start min-h-[300px]">
          <div className="inner-wrapper !items-start gap-4 relative">
            <h1 className="tracking-wider text-4xl">Lingkungan</h1>
            <div className="w-full grid grid-cols-4 gap-10 mt-10">
              {data.children.map((child) => (
                <div
                  key={child.id}
                  className="flex flex-col shadow-basic p-3 pt-6 items-center text-center h-full"
                >
                  <h1 className="font-secondary font-semibold text-xl">
                    {data.name}
                  </h1>
                  <p className="text-b300 text-3xl my-2">{child.name}</p>
                  <p className="mb-10">{child.address}</p>
                  <Link
                    href={route("lingkungan.guest.show", child.slug)}
                    className="w-full mt-auto"
                  >
                    <Button className="w-full !h-16">Detail</Button>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {articles.data.length > 0 && (
        <div className="py-24 outer-wrapper !justify-start min-h-svh">
          <div className="inner-wrapper gap-5 min-h-[600px]">
            <h1 className="tracking-wider text-4xl w-full text-left mb-10 capitalize">
              Kegiatan {type}
            </h1>
            <>
              <ArticleCard data={articles.data[0]} />
              <div className="w-full grid grid-cols-3 gap-5">
                {articles.data.slice(1).map((article, index) => (
                  <ArticleCard key={index} type="secondary" data={article} />
                ))}
              </div>
            </>
          </div>
          <div className="flex justify-center my-32 space-x-2">
            {articles.links.map((link, index) => (
              <Link
                key={index}
                href={`${link.url}#data` || "#"}
                className={`px-4 text-xl font-secondary py-2 text-b300 rounded ${
                  link.active ? "underline" : ""
                } ${!link.url ? "pointer-events-none" : ""}`}
                dangerouslySetInnerHTML={{ __html: link.url ? link.label : "" }}
              />
            ))}
          </div>
        </div>
      )}
      <div className="py-40"></div>
      <Footer />
    </div>
  );
}
