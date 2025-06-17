import Footer from "@/Components/guest/Footer/Footer";
import Navbar from "@/Components/guest/Navbar/Navbar";
import NewsCard from "@/Components/guest/NewsCard/NewsCard";
import { Head, Link } from "@inertiajs/react";

export default function News({ news }) {
  return (
    <div>
      <Head title="Warta Minggu" />
      <Navbar />
      <div className="outer-wrapper pt-10 h-[60vh] md:h-[70vh] img-background">
        <div className="inner-wrapper !items-start !justify-start px-4 md:px-0">
          <p className="small-title">Informasi</p>
          <h1 className="section-title !mb-4">Warta Minggu</h1>
          <p className="w-full md:w-3/4 lg:w-1/2">
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
      <div className="py-12 md:py-24 outer-wrapper !justify-start min-h-svh">
        <div className="inner-wrapper gap-3 md:gap-5 min-h-[600px] px-4 md:px-0">
          {news.data.length > 0 ? (
            news.data.map((news, index) => <NewsCard key={index} data={news} />)
          ) : (
            <div className="w-full min-h-80 flex justify-center items-center text-2xl font-secondary font-semibold text-gray-800 leading-tight text-center px-4">
              Tidak Ada Warta Minggu
            </div>
          )}
        </div>
        <div className="flex flex-wrap justify-center my-16 md:my-32 space-x-1 md:space-x-2 px-4">
          {news.links.map((link, index) => (
            <Link
              key={index}
              href={`${link.url}#data`}
              className={` ${link.active ? "underline" : ""}`}
            >
              <span
                className="px-2 md:px-4 text-xl font-secondary py-1 md:py-2 text-b300 rounded mb-2"
                dangerouslySetInnerHTML={{ __html: link.label }}
              />
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
