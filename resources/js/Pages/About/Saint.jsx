import biography1 from "@/assets/img/saint/1.png";
import biography2 from "@/assets/img/saint/2.png";
import biography3 from "@/assets/img/saint/3.png";
import biography4 from "@/assets/img/saint/4.png";
import Wide from "@/assets/img/saint/st-bona-wide.png";
import Hero from "@/assets/img/saint/st-bonaventura.png";
import Footer from "@/Components/guest/Footer/Footer";
import LazyImage from "@/Components/guest/LazyImage";
import Navbar from "@/Components/guest/Navbar/Navbar";
import { Head } from "@inertiajs/react";

const BIOGRAPHY = [
  {
    title: "Awal Kehidupan dan Pendidikan",
    description:
      "Pada usia muda, Bonaventura jatuh sakit parah, dan menurut cerita tradisional, ia disembuhkan oleh St. Fransiskus dari Assisi. Setelah kesembuhannya, ia terinspirasi untuk mengikuti jalan hidup religius. Bonaventura kemudian bergabung dengan Ordo Fransiskan dan belajar di Universitas Paris, di mana ia mendalami filsafat dan teologi.",
    img: biography1,
  },
  {
    title: "Karier Akademik dan Kontribusi Intelektual",
    description:
      "Di Universitas Paris, Bonaventura menjadi seorang dosen dan akhirnya menjadi Profesor Teologi. Karyanya yang terkenal, Itinerarium Mentis in Deum (Perjalanan Jiwa Menuju Tuhan), menjadi salah satu kontribusi pentingnya, menguraikan bagaimana manusia dapat mencapai persatuan dengan Tuhan melalui tahapan kontemplatif. Bonaventura menggabungkan pemikiran St. Agustinus dan Aristoteles dengan pandangan mistik.",
    img: biography2,
  },
  {
    title: "Kepemimpinan dalam Ordo Fransiskan",
    description:
      "Pada 1257, Bonaventura diangkat sebagai Menteri Jenderal Ordo Fransiskan. Dalam peran ini, ia menghadapi konflik dalam ordo terkait interpretasi aturan kemiskinan yang diajarkan oleh St. Fransiskus. Bonaventura berhasil mempersatukan ordo dan menuliskan biografi resmi tentang St. Fransiskus dari Assisi, yang menjadi standar bagi komunitas Fransiskan",
    img: biography3,
  },
];

export default function Saint() {
  return (
    <div>
      <Head title="Santo Pelindung"></Head>
      <Navbar />
      <div className="img-background outer-wrapper">
        <div className="inner-wrapper !items-start !pt-40 sm:!pt-32 !pb-12 sm:!pb-16 md:!pb-20 px-4 sm:px-6 lg:px-8">
          <p className="small-title w-full text-center lg:text-left">
            SANTO PELINDUNG
          </p>
          <h1 className="text-b300 section-title text-2xl sm:text-3xl lg:text-4xl xl:text-5xl">
            Tentang Santo Bonaventura
          </h1>

          <div className="flex flex-col md:flex-row gap-4 sm:gap-6 md:gap-8 w-full lg:w-3/4">
            <LazyImage
              src={Hero}
              className="!w-full md:!w-auto object-cover object-center max-w-sm mx-auto md:mx-0"
              alt="hero-img"
            />
            <p className="font-secondary text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl">
              Santo Bonaventura, yang dikenal juga sebagai "Doktor Seraphik,"
              adalah seorang teolog, filsuf, dan biarawan Fransiskan yang hidup
              pada abad ke-13. Nama aslinya adalah Giovanni di Fidanza, dan dia
              lahir sekitar tahun 1221 di wilayah Bagnoregio, Italia.
              Bonaventura dikenal sebagai salah satu tokoh penting dalam Ordo
              Fransiskan dan dianggap sebagai salah satu teolog besar dalam
              Gereja Katolik.
            </p>
          </div>
        </div>
      </div>
      <div
        className="outer-wrapper bg-cover bg-center bg-no-repeat h-48 sm:h-64 md:h-80 lg:h-96 xl:h-[400px] gap-3 sm:gap-4 md:gap-5 mb-12 sm:mb-16 md:mb-20 px-4 sm:px-6 lg:px-8"
        style={{
          backgroundImage: `url(${Wide})`,
        }}
      >
        <h1 className="text-n100 text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-center">
          "O Buona ventura!"
        </h1>
        <p className="text-n100 text-lg sm:text-xl md:text-2xl lg:text-3xl text-center">
          "Oh good fortune!"
        </p>
      </div>
      <div className="outer-wrapper">
        <div className="inner-wrapper gap-12 sm:gap-16 md:gap-20 lg:gap-24 !items-start px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 sm:gap-10 md:gap-12 lg:gap-14">
            {BIOGRAPHY.map((bio, index) => (
              <div
                key={index}
                className="flex flex-col gap-4 sm:gap-5 justify-between"
              >
                <div className="flex flex-col gap-4 sm:gap-5">
                  <h1 className="text-lg sm:text-xl md:text-2xl text-b300">
                    {bio.title}
                  </h1>
                  <p className="font-secondary text-sm sm:text-base text-justify">
                    {bio.description}
                  </p>
                </div>
                <LazyImage
                  src={bio.img}
                  className="mt-6 sm:mt-8 md:mt-10 !h-48 sm:!h-64 md:!h-80 lg:!h-96 !w-full object-cover"
                  alt={bio.title}
                />
              </div>
            ))}
          </div>
          <div className="mb-40 sm:mb-60 md:mb-80 w-full">
            <h1 className="text-xl sm:text-2xl md:text-3xl text-b300 mb-4 sm:mb-6 md:mb-8">
              Pengakuan Sebagai Santo dan Pengaruhnya
            </h1>
            <div className="flex flex-col md:flex-row gap-6 sm:gap-8 md:gap-10 w-full lg:w-3/4">
              <LazyImage
                className="!w-full md:!w-auto max-w-sm mx-auto md:mx-0"
                src={biography4}
                alt="Biography"
              />
              <p className="font-secondary text-sm sm:text-base md:text-lg lg:text-xl">
                Bonaventura diangkat menjadi Kardinal oleh Paus Gregorius X pada
                1273 dan menghadiri Konsili Lyon II pada tahun 1274. Namun,
                tidak lama setelah itu, ia meninggal pada usia 53 tahun.
                Bonaventura dikanonisasi sebagai santo pada 1482 oleh Paus
                Sixtus IV dan diangkat sebagai Doktor Gereja pada 1588 oleh Paus
                Sixtus V. Bonaventura meninggalkan pengaruh besar dalam tradisi
                Katolik, terutama dalam spiritualitas Fransiskan dan pemikiran
                mistik. Tulisannya masih dipelajari hingga saat ini dan sering
                kali disebut sebagai inspirasi dalam pendekatan kontemplatif
                kepada Tuhan.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
