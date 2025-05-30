import { MoveLeft } from "lucide-react";

import PlaceholderImg from "@/assets/img/placeholder.png";
import Footer from "@/Components/guest/Footer/Footer";
import LazyImage from "@/Components/guest/LazyImage";
import Navbar from "@/Components/guest/Navbar/Navbar";
import { articleDateFormatter } from "@/utils";
import { Head, router } from "@inertiajs/react";

export default function Article({ article }) {
  const ASSET_URL = import.meta.env.VITE_PUBLIC_ASSET_URL;

  const { day, month, year } = articleDateFormatter(article.created_at);

  const handleBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      router.visit(route("article.guest.index")); // Ganti dengan route default
    }
  };
  return (
    <div>
      <Head title={article.title} />
      <Navbar />

      <div className="pt-40 pb-80 outer-wrapper">
        <div className="inner-wrapper !items-start space-y-8">
          <button onClick={handleBack} className="flex gap-4 items-center">
            <MoveLeft size={40} className="text-b300" />
            <p className="font-secondary uppercase text-xl font-bold text-b300">
              Kembali
            </p>
          </button>
          {article.main_image_name && (
            <LazyImage
              src={
                article.main_image_name
                  ? `${ASSET_URL}/uploads/${article.main_image_name}`
                  : PlaceholderImg
              }
              className="w-full !max-h-[800px]"
            />
          )}
          <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-8 !mt-12">
            <div className="flex flex-col items-center">
              <h1 className="text-7xl font-secondary font-semibold text-b300">
                {day}
              </h1>
              <p className="text-2xl font-secondary text-b300 uppercase">
                {month}
              </p>
              <p className="text-2xl font-secondary text-b300">{year}</p>
            </div>
            <div className="space-y-8">
              <p className="text-xl font-secondary text-b200 font-bold uppercase">
                BERITA — {article.publisher.name}
              </p>
              <h1 className="text-5xl">{article.title}</h1>
              <div
                className="markdown"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
