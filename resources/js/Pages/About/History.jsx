import Img1976 from "@/assets/img/history/1976.png";
import Img1978 from "@/assets/img/history/1978.png";
import Img1981 from "@/assets/img/history/1981.png";
import MainHero from "@/assets/img/history/main-hero-history.png";
import Footer from "@/Components/guest/Footer/Footer";
import LazyImage from "@/Components/guest/LazyImage";
import Navbar from "@/Components/guest/Navbar/Navbar";
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
      "Pada awal dekade 1970-an, di kawasan Kampung Ambon mulai muncul kesadaran kolektif bahwa penguatan komunitas Katolik tidak cukup hanya dengan ibadat di rumah-rumah umat. Atas dorongan Mgr. A. Djajaseputra SJ dan didukung oleh pimpinan Ordo Fransiskan, Pastor J. Wahyosudibyo OFM mengambil inisiatif untuk mendirikan fasilitas pendidikan di wilayah tersebut. Sekolah tingkat TK dan SD kemudian didirikan — awalnya dikelola oleh Ibu Srigiati Baroto dan Ibu Anton Setu — dan akhirnya berkembang menjadi TK dan SD Fransiskus yang dikelola oleh para suster Fransiskanes. Dengan berdirinya pendidikan formal ini, ruang ibadat Minggu yang sebelumnya digelar di rumah umat di Rawasari mulai dipindahkan ke ruang kelas sekolah, menandai pergeseran penting dari ruang informal ke fasilitas kelembagaan.",
  },
  {
    year: "1976",
    title: "Rencana Pembangunan Gereja",
    description:
      "Pada tahun 1976 muncul keputusan strategis oleh pimpinan wilayah—termasuk Ketua Wilayah X, Bapak Hadi Sutrisno—bahwa umat Katolik di kawasan Kampung Ambon dan sekitarnya memerlukan satu tempat ibadat permanen yang representatif, karena pada saat itu jumlah umat telah melampaui 500 orang. Usulan ini kemudian mengarah pada pembentukan Panitia Pembangunan Gereja pada 19 Juni 1977 dan akhirnya menjadi dasar administratif bagi pendirian resmi Paroki Pulomas pada 20 Agustus 1977.",
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
        <div className="inner-wrapper !pt-24 sm:!pt-32 md:!pt-40 !pb-12 sm:!pb-16 md:!pb-20 px-4 sm:px-6 lg:px-8">
          <h1 className="text-b300 section-title w-full sm:w-5/6 md:w-3/4 text-2xl sm:text-3xl lg:text-4xl xl:text-5xl">
            Perjalanan Panjang Gereja Santo Bonaventura Pulo Mas
          </h1>
          <LazyImage src={MainHero} alt="main-hero" className="w-full h-auto" />
        </div>
      </div>
      <div className="outer-wrapper bg-b100">
        <div className="inner-wrapper !py-12 sm:!py-16 md:!py-20 !items-start gap-4 sm:gap-6 md:gap-7 px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl">
            Lini Masa Paroki Pulomas
          </h1>
          <p className="font-secondary text-sm sm:text-base md:text-lg w-full sm:w-5/6 md:w-3/4">
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
          <div className="my-20 sm:my-32 md:my-40 w-full">
            <h1 className="mb-12 sm:mb-16 md:mb-20 text-b300 font-semibold flex items-center gap-2 font-secondary tracking-wider uppercase text-lg sm:text-xl md:text-2xl">
              Sejarah Singkat
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8 md:gap-10 gap-y-12 sm:gap-y-16 md:gap-y-20">
              {TIMELINE.map((data, i) => (
                <div
                  key={i}
                  className="flex flex-col gap-3 sm:gap-4 md:gap-5 px-4 sm:px-6 md:px-8 py-3 sm:py-4 border border-l-blue-800 border-y-0 border-r-0"
                >
                  <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold">
                    {data.year}
                  </h1>
                  <p className="font-secondary text-base sm:text-lg md:text-xl font-bold text-b200">
                    {data.title}
                  </p>
                  <p className="font-secondary text-sm sm:text-base">
                    {data.description}
                  </p>
                  {data.img && (
                    <img
                      src={data.img}
                      alt={data.title}
                      className="w-full h-auto"
                    />
                  )}
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
