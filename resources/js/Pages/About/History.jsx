import MainHero from "@/assets/img/main-hero-history.png";
import Navbar from "@/Components/guest/shared/Navbar/Navbar";
import { Head } from "@inertiajs/react";

export default function History() {
  return (
    <div>
      <Head title="Sejarah" />
      <Navbar />
      <div className="img-background outer-wrapper">
        <div className="inner-wrapper !pt-40 !pb-20">
          <h1 className="text-b300 section-title ">
            Perjalanan Panjang Gereja Santo Bonaventura Pulo Mas
          </h1>
          <img src={MainHero} alt="main-hero" />
        </div>
      </div>
      <div className="outer-wrapper bg-b100">
        <div className="inner-wrapper !py-20 !items-start gap-7">
          <h1 className="text-3xl ">Lini Masa Paroki Pulomas</h1>
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
        </div>
      </div>
    </div>
  );
}
