import PlaceholderImg from '@/assets/img/placeholder.png';
import ArticleCard from '@/Components/guest/ArticleCard/ArticleCard';
import Button from '@/Components/guest/Button/Button';
import Footer from '@/Components/guest/Footer/Footer';
import LazyImage from '@/Components/guest/LazyImage';
import Navbar from '@/Components/guest/Navbar/Navbar';
import {
  Head,
  Link,
} from '@inertiajs/react';

export default function Map({ territory, articles }) {
  console.log("🚀 ~ Map ~ territory:", territory);
  console.log("🚀 ~ Map ~ articles:", articles);
  const type = territory?.organization_type_id === 1 ? "wilayah" : "lingkungan";
  const ASSET_URL = import.meta.env.VITE_PUBLIC_ASSET_URL;

  return (
    <div>
      <Head title={territory.name} />
      <Navbar />
      <div className="outer-wrapper !py-40 !pb-20 !justify-start min-h-[300px] img-background">
        <div className="inner-wrapper !flex-row !justify-between relative">
          <div>
            <div className="space-y-4 mb-16">
              <p className="font-secondary font-semibold text-xl">
                {territory.address}
              </p>
              <h1 className="text-5xl">{territory.name}</h1>
              <p className="text-b200 font-secondary font-semibold text-lg">
                {territory.alternate_name}
              </p>
            </div>
            {territory.children.length > 0 && (
              <ul className="list-decimal space-y-2 pl-6 mb-5 font-secondary">
                {territory.children.map((child, index) => (
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

      {territory.head && (
        <div className="outer-wrapper !py-20 !justify-start min-h-[300px]">
          <div className="inner-wrapper !items-start gap-10 relative">
            <h1 className="tracking-wider text-4xl capitalize">
              {territory?.organization_type_id === 1
                ? "Koordinator Wilayah"
                : "Ketua Lingkungan"}
            </h1>
            <div className="w-40 space-y-4">
              <LazyImage
                src={
                  territory.head.profile_picture
                    ? `${ASSET_URL}/uploads/${territory.head.profile_picture}`
                    : PlaceholderImg
                }
                alt={territory.head + " img"}
                className="!w-full object-cover object-center border"
              />
              <h1 className="text-2xl text-center">{territory.head.name}</h1>
            </div>
          </div>
        </div>
      )}

      {territory.description && (
        <div className="outer-wrapper !py-20 !justify-start min-h-[300px]">
          <div className="inner-wrapper !items-start gap-10 relative">
            <h1 className="tracking-wider text-4xl">Profil territory</h1>
            <p className="font-secondary text-lg w-3/4">
              {territory.description}
            </p>
          </div>
        </div>
      )}

      {territory.children.length > 0 && (
        <div className="outer-wrapper !py-20 !justify-start min-h-[300px]">
          <div className="inner-wrapper !items-start gap-4 relative">
            <h1 className="tracking-wider text-4xl">Lingkungan</h1>
            <div className="w-full grid grid-cols-4 gap-10 mt-10">
              {territory.children.map((child) => (
                <div
                  key={child.id}
                  className="flex flex-col shadow-basic p-3 pt-6 items-center text-center h-full"
                >
                  <h1 className="font-secondary font-semibold text-xl">
                    {territory.name}
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

      <div className="py-24 outer-wrapper !justify-start min-h-svh">
        <div className="inner-wrapper gap-5 min-h-[600px]">
          {articles.data.length > 0 ? (
            <>
              <h1 className="tracking-wider text-4xl w-full text-left mb-10 capitalize">
                Kegiatan {type}
              </h1>
              <ArticleCard data={articles.data[0]} />
              <div className="w-full grid grid-cols-3 gap-5">
                {articles.data.slice(1).map((article, index) => (
                  <ArticleCard key={index} type="secondary" data={article} />
                ))}
              </div>
            </>
          ) : (
            <div className="w-full min-h-80 flex justify-center items-center text-2xl font-secondary font-semibold text-gray-800 leading-tight">
              Tidak Ada Berita & Kegiatan
            </div>
          )}
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
      <Footer />
    </div>
  );
}
