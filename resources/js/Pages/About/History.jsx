import Img1976 from "@/assets/img/history/1976.png";
import Img1978 from "@/assets/img/history/1978.png";
import Img1981 from "@/assets/img/history/1981.png";
import MainHero from "@/assets/img/history/main-hero-history.png";
import Footer from "@/Components/guest/shared/Footer/Footer";
import Navbar from "@/Components/guest/shared/Navbar/Navbar";
import { Head } from "@inertiajs/react";

import GallerySlider from "./GallerySlider";
import VideoContainer from "./VideoContainer";

const TIMELINE = [
  {
    year: "1965",
    title: "Kondisi Awal Pulomas",
    description:
      "Pulomas masih sangat sepi dengan banyak rawa dan empang. Rumah-rumah berkelompok dan dihubungkan oleh jalan tanah yang becek serta banyak genangan saat hujan. Penduduk Katolik berjumlah sekitar 10 keluarga yang tinggal terpencar, dan pelayanan pastoral diberikan oleh Pastor-pastor Ordo Fransiskan (OFM) dari Paroki Kramat, seperti Pastor Van Genuchten OFM, Pastor Soetoyo OFM, Pastor Leo Derksen OFM, dan Pastor J. Patosudarmo OFM.",
  },
  {
    year: "1970",
    title: "Perkembangan Pendidikan dan Ibadat",
    description:
      "Pastor J. Wahyosudibyo OFM, pimpinan Ordo Fransiskan, berinisiatif membangun sarana pendidikan di Kampung Ambon, didukung oleh Mgr. A. Djajaseputra SJ. Sekolah TK dan SD awalnya dikelola oleh Ibu Srigiati Baroto dan Ibu Anton Setu, kemudian menjadi TK dan SD Fransiskus. Ibadat Minggu yang semula diadakan di rumah Bapak Mukidjo di Rawasari berpindah ke ruang kelas seiring bertambahnya umat.",
  },
  {
    year: "1976",
    title: "Rencana Pembangunan Gereja",
    description:
      "Pastor J. Wahyosudibyo OFM, pimpinan Ordo Fransiskan, berinisiatif membangun sarana pendidikan di Kampung Ambon, didukung oleh Mgr. A. Djajaseputra SJ. Sekolah TK dan SD awalnya dikelola oleh Ibu Srigiati Baroto dan Ibu Anton Setu, kemudian menjadi TK dan SD Fransiskus. Ibadat Minggu yang semula diadakan di rumah Bapak Mukidjo di Rawasari berpindah ke ruang kelas seiring bertambahnya umat.",
    img: Img1976,
  },

  {
    year: "1977",
    title: "Pendirian Paroki Pulomas",
    description:
      "Pada 20 Agustus 1977, Uskup Agung Jakarta, Mgr. Leo Soekoto SJ, meresmikan pendirian Paroki Pulomas dengan pelindung Santo Bonaventura. Pada 5 Juni 1978, Mgr. Leo Soekoto SJ menyatakan berdirinya Pengurus Dewan Paroki/PGDP dengan Pastor J. Patosudarmo OFM sebagai ketua.",
  },
  {
    year: "1978",
    title: "Pembangunan Gereja",
    description:
      "Peletakan batu pertama dilakukan pada 15 Agustus 1978 oleh Mgr. Leo Soekoto SJ. Pembangunan fisik gereja dimulai pada 10 Maret 1979, di bawah Panitia Pelaksana Fisik yang dipimpin Ir. J. Adi Taruli. Izin Mendirikan Bangunan (IMB) diperoleh pada 14 Maret 1979 setelah diurus oleh Romo Yoseph Wiyanto Hardjopranoto, Pr. ",
    img: Img1978,
  },
  {
    year: "1981",
    title: "Peresmian Gereja",
    description:
      "Gereja mulai digunakan pada 24 Desember 1979, diberkati pada 20 April 1980, dan diresmikan oleh Gubernur DKI Jakarta, Tjokropranolo, pada 12 Desember 1981.",
    img: Img1981,
  },
];

export default function History() {
  return (
    <div>
      <Head title="Sejarah" />
      <Navbar />
      <div className="img-background outer-wrapper">
        <div className="inner-wrapper !pt-40 !pb-20">
          <h1 className="text-b300 section-title w-3/4">
            Perjalanan Panjang Gereja Santo Bonaventura Pulo Mas
          </h1>
          <img src={MainHero} alt="main-hero" />
        </div>
      </div>
      <div className="outer-wrapper bg-b100">
        <div className="inner-wrapper !py-20 !items-start gap-7">
          <h1 className="text-4xl ">Lini Masa Paroki Pulomas</h1>
          <p className="font-secondary text-md w-3/4">
            Gereja Santo Bonaventura Pulomas, yang dilindungi oleh St.
            Bonaventura, menyimpan sejarah panjang yang sarat dengan dinamika
            dan perkembangan seiring perjalanan waktu. Paroki ini resmi
            didirikan pada 20 Agustus 1977 oleh Uskup Agung Jakarta, Mgr. Leo
            Soekoto SJ, dan memulai pembangunan fisiknya dengan peletakan batu
            pertama pada 15 Agustus 1978. Kisah perkembangan paroki ini penuh
            dengan momen-momen penting dan cerita menarik yang mencerminkan
            pertumbuhan komunitas Katolik di kawasan tersebut. Mari kita
            jelajahi sejarah dan kisah yang menyertai Gereja Santo Bonaventura
            Pulomas.
          </p>
          <VideoContainer />
          <div className="my-40">
            <h1 className="mb-20 text-b300 font-semibold flex items-center gap-2 font-secondary tracking-wider uppercase text-2xl">
              Sejarah Singkat
            </h1>
            <div className="grid grid-cols-3 gap-10 gap-y-20">
              {TIMELINE.map((data, i) => (
                <div
                  key={i}
                  className="flex flex-col gap-5 px-8 py-4 border border-l-blue-800 border-y-0 border-r-0"
                >
                  <h1 className="text-7xl font-semibold">{data.year}</h1>
                  <p className="font-secondary text-xl font-bold text-b200">
                    {data.title}
                  </p>
                  <p className="font-secondary">{data.description}</p>
                  {data.img && <img src={data.img} alt={data.title} />}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <GallerySlider />
      <Footer />
    </div>
  );
}
