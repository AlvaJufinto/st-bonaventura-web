import ArticleCard from "@/Components/guest/shared/ArticleCard/ArticleCard";
import Button from "@/Components/guest/shared/Button/Button";
import Footer from "@/Components/guest/shared/Footer/Footer";
import Navbar from "@/Components/guest/shared/Navbar/Navbar";
import { Head } from "@inertiajs/react";

export default function Map({ wilayah }) {
  return (
    <div>
      <Head title={wilayah.name} />
      <Navbar />
      <div className="outer-wrapper !py-40 !pb-20 !justify-start min-h-[300px] img-background">
        <div className="inner-wrapper !flex-row !justify-between relative">
          <div>
            <div className="space-y-4 mb-16">
              <p className="font-secondary font-semibold text-xl">
                {wilayah.address}
              </p>
              <h1 className="text-5xl">{wilayah.name}</h1>
              <p className="text-b200 font-secondary font-semibold text-lg">
                {wilayah.alternate_name}
              </p>
            </div>
            <ul className="list-decimal space-y-2 pl-6 mb-5 font-secondary">
              {wilayah.children.map((child, index) => (
                <li key={index} className="font-secondary font-medium">
                  {child.name} — {child.address}
                </li>
              ))}
            </ul>
          </div>
          {/* <LazyImage
            className="!h-auto !w-2/5 object-cover"
            src="https://www.rafflespaint.com/cdn/shop/products/PURE_BLACK_RP0-1_69e69038-13dc-4241-8b7f-a52ad6a2ca1e.jpg?v=1566778789"
            alt="Hello"
          /> */}
        </div>
      </div>
      {wilayah.description && (
        <div className="outer-wrapper !py-20 !justify-start min-h-[300px]">
          <div className="inner-wrapper !items-start gap-10 relative">
            <h1 className="tracking-wider text-4xl">Profil Wilayah</h1>
            <p className="font-secondary text-lg w-3/4">
              {wilayah.description}
            </p>
          </div>
        </div>
      )}
      <div className="outer-wrapper !py-20 !justify-start min-h-[300px]">
        <div className="inner-wrapper !items-start gap-4 relative">
          <h1 className="tracking-wider text-4xl">Lingkungan</h1>
          <div className="w-full grid grid-cols-4 gap-10 mt-10">
            {wilayah.children.map((child, index) => (
              <div className="flex flex-col shadow-basic p-3 pt-6 items-center text-center">
                <h1 className="font-secondary font-semibold text-xl">
                  {wilayah.name}
                </h1>
                <p className="text-b300 text-3xl my-2 ">{child.name}</p>
                <p className="mb-10">{child.address}</p>
                <Button className="mt-auto w-full !h-16">Detail</Button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="outer-wrapper !py-20 !justify-start min-h-[300px]">
        <div className="inner-wrapper !items-start gap-10 relative">
          <h1 className="tracking-wider text-4xl">Kegiatan Wilayah</h1>
          <div className="grid grid-cols-3 gap-10 mt-10">
            <ArticleCard type="secondary" />
            <ArticleCard type="secondary" />
            <ArticleCard type="secondary" />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
