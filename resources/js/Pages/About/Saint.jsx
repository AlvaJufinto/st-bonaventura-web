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
        <div className="inner-wrapper !items-start !pt-40 !pb-20">
          <p className="small-title">SANTO PELINDUNG</p>
          <h1 className="text-b300 section-title">Tentang Santo Bonaventura</h1>

          <div className="flex gap-5 w-3/4">
            <LazyImage
              src={Hero}
              className="!w-auto object-cover object-center"
              alt="hero-img"
            />
            <p className="font-secondary text-2xl">
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
        className="outer-wrapper bg-cover bg-center bg-no-repeat h-[400px] gap-5 mb-20"
        style={{
          backgroundImage: `url(${Wide})`,
        }}
      >
        <h1 className="text-n100 text-6xl">"O Buona ventura!”</h1>
        <p className="text-n100 text-3xl">“Oh good fortune!”</p>
      </div>
      <div className="outer-wrapper">
        <div className="inner-wrapper gap-24 !items-start">
          <div className="grid grid-cols-3 gap-14">
            {BIOGRAPHY.map((bio, index) => (
              <div className="flex flex-col gap-5 justify-between">
                <div className="flex flex-col gap-5">
                  <h1 className="text-2xl text-b300">{bio.title}</h1>
                  <p className="font-secondary text-justify">
                    {bio.description}
                  </p>
                </div>
                <LazyImage
                  src={bio.img}
                  className="mt-10 !h-96 !w-full object-cover"
                  alt={bio.title}
                />
              </div>
            ))}
          </div>
          <div className="mb-80">
            <h1 className="text-3xl text-b300 mb-8">
              Pengakuan Sebagai Santo dan Pengaruhnya
            </h1>
            <div className="flex gap-10 w-3/4">
              <LazyImage className="!w-auto" src={biography4} alt="Biography" />
              <p className="font-secondary text-xl">
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
