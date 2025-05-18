import Footer from "@/Components/guest/Footer/Footer";
import Navbar from "@/Components/guest/Navbar/Navbar";
import NewsCard from "@/Components/guest/NewsCard/NewsCard";
import { Head, Link } from "@inertiajs/react";

export default function News({ news }) {
  return (
    <div>
      <Head title="Warta Minggu" />
      <Navbar />
      <div className="outer-wrapper pt-10 h-[70vh] img-background">
        <div className="inner-wrapper !items-start !justify-start">
          <p className="small-title">Informasi</p>
          <h1 className="section-title !mb-4">Warta Minggu</h1>
          <p className="w-1/2">
            Umat Allah yang terkasih, bersama-sama kita merayakan persekutuan
            iman melalui berbagai kegiatan di paroki kita. Warta mingguan ini
            hadir sebagai sarana untuk semakin terlibat dalam kehidupan gereja,
            membagikan kasih, serta melayani sesama. Melalui perayaan Ekaristi
            mingguan dan sakramen-sakramen yang kita terima, kita menemukan
            kekuatan dan sukacita dari Tuhan, yang memampukan kita untuk
            bertumbuh dalam iman dan kebersamaan.
          </p>
        </div>
      </div>
      <div id="data"></div>
      <div className="py-24 outer-wrapper !justify-start min-h-svh">
        <div className="inner-wrapper gap-5 h-[600px]">
          {news.data.length > 0 ? (
            news.data.map((news, index) => <NewsCard key={index} data={news} />)
          ) : (
            <div className="w-full min-h-80 flex justify-center items-center text-2xl font-secondary font-semibold text-gray-800 leading-tight">
              Tidak Ada Warta Minggu
            </div>
          )}
        </div>
        <div className="flex justify-center mt-10 space-x-2">
          {news.links.map((link, index) => (
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
