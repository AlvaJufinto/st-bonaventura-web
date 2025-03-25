import Footer from "@/Components/guest/shared/Footer/Footer";
import Navbar from "@/Components/guest/shared/Navbar/Navbar";
import NewsCard from "@/Components/guest/shared/NewsCard/NewsCard";
import { Head } from "@inertiajs/react";

const NewsData = [
  {
    date: "28 January 2024",
    title: "Warta Minggu Paroki Pulomas",
    subtitle: "Hari Minggu Biasa IV",
    link: "https://res.cloudinary.com/di0dpswey/image/upload/v1742524732/st-bonaventura/ku421vx2hc8ooesnlu4c.pdf",
  },
  {
    date: "4 February 2024",
    title: "Warta Minggu Paroki Pulomas",
    subtitle: "Hari Minggu Biasa V",
    link: "https://res.cloudinary.com/di0dpswey/image/upload/v1742524732/st-bonaventura/ku421vx2hc8ooesnlu4c.pdf",
  },
  {
    date: "11 February 2024",
    title: "Warta Minggu Paroki Pulomas",
    subtitle: "Hari Minggu Biasa VI",
    link: "https://res.cloudinary.com/di0dpswey/image/upload/v1742524732/st-bonaventura/ku421vx2hc8ooesnlu4c.pdf",
  },
  {
    date: "18 February 2024",
    title: "Warta Minggu Paroki Pulomas",
    subtitle: "Hari Minggu Biasa VII",
    link: "https://res.cloudinary.com/di0dpswey/image/upload/v1742524732/st-bonaventura/ku421vx2hc8ooesnlu4c.pdf",
  },
];

export default function News() {
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
      <div className="py-20 outer-wrapper !justify-start min-h-svh">
        <div className="inner-wrapper gap-5">
          {NewsData.map((news, index) => (
            <NewsCard data={news} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
