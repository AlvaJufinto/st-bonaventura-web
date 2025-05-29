import ArticleCard from "@/Components/guest/ArticleCard/ArticleCard";
import Footer from "@/Components/guest/Footer/Footer";
import Navbar from "@/Components/guest/Navbar/Navbar";
import { Head, Link } from "@inertiajs/react";

export default function ArticleIndex({ articles }) {
  return (
    <div>
      <Head title="Berita & Kegiatan" />
      <Navbar />
      <div className="outer-wrapper pt-10 h-[70vh] img-background">
        <div className="inner-wrapper !items-start !justify-start">
          <p className="small-title">Informasi</p>
          <h1 className="section-title !mb-4">Berita & Kegiatan</h1>
          <p className="w-1/2">
            Saudara-saudari umat Allah yang terkasih, kehidupan persekutuan dan
            gerakan umat Allah kita wujudkan dalam kehidupan Paroki. Setiap
            aktivitas yang kita lakukan di Paroki adalah kesempatan berharga
            untuk memperkuat kebersamaan, menumbuhkan semangat kepedulian, dan
            mempererat solidaritas antarumat,
          </p>
        </div>
      </div>
      <div id="data"></div>
      <div className="py-24 outer-wrapper !justify-start min-h-svh">
        <div className="inner-wrapper gap-5 min-h-[600px]">
          {articles.data.length > 0 ? (
            <>
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
