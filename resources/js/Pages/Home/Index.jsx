import AsakIcon from "@/assets/icon/home/asak-icon.svg";
import CategorialIcon from "@/assets/icon/home/categorial-icon.svg";
import EucharistIcon from "@/assets/icon/home/eucharist-icon.svg";
import HealthIcon from "@/assets/icon/home/health-icon.svg";
import KaritatifIcon from "@/assets/icon/home/karitatif-icon.svg";
import PrayIcon from "@/assets/icon/home/pray-icon.svg";
import BonaImg from "@/assets/img/st-bonaventura-home.png";
import BonaLogo from "@/assets/logo/logo-bonaventura.png";
import ArticleCard from "@/Components/guest/ArticleCard/ArticleCard";
import Button from "@/Components/guest/Button/Button";
import Footer from "@/Components/guest/Footer/Footer";
import LazyImage from "@/Components/guest/LazyImage";
import Navbar from "@/Components/guest/Navbar/Navbar";
import NewsCard from "@/Components/guest/NewsCard/NewsCard";
import { Head, Link, router } from "@inertiajs/react";

import ShortcutCard from "./ShortcutCard";
import Slider from "./Slider";
import Statistics from "./Statistics";

const WeeklyMass = [
  {
    day: "Sabtu",
    data: [
      {
        time: "16.30",
        type: "offline",
      },
    ],
  },
  {
    day: "Minggu",
    data: [
      {
        time: "06.30",
        type: "offline",
      },
      {
        time: "08.30",
        type: "offline & online",
      },
      {
        time: "16.30",
        type: "offline",
      },
      {
        time: "18.30",
        type: "offline",
      },
    ],
  },
];

const DailyMass = [
  {
    day: "Senin - Sabtu",
    data: [
      {
        time: "06.30",
        type: "offline & online",
      },
    ],
  },
];

const FirstFridayMass = [
  {
    data: [
      {
        time: "06.30",
        type: "offline",
      },
      {
        time: "12.00",
        type: "offline",
      },
      {
        time: "19.00",
        type: "offline & online",
      },
    ],
  },
];

const SERVICES = [
  {
    logo: EucharistIcon,
    name: "Ekaristi",
    description:
      "Perayaan Ekaristi, Devosi dan Doa menjadi dasar kehiudpan umat beriman untuk menjadi semakin serupa dengan Kristus di dunia",
    url: { name: "communion.guest.index" },
  },
  {
    logo: PrayIcon,
    name: "Komunitas Doa",
    description:
      "Sebab di mana dua atau tiga orang berkumpul dalam nama-Ku, di situ Tuhan hadir di tengah-tengah mereka dan membawa Sukacita",
    url: {
      name: "bidang.guest.show",
      slugs: { bidang: "persekutuan-pendampingan-territorial-dan-kategorial" },
    },
  },
  {
    logo: CategorialIcon,
    name: "Karya Kategorial",
    description:
      "Karya Kategorial menjadi sarana untuk mewujud-nyatakan Kasih Allah yang semakin konkret dalam kehidupan masyarakat",
    url: {
      name: "bidang.guest.show",
      slugs: { bidang: "persekutuan-pendampingan-territorial-dan-kategorial" },
    },
  },
  {
    logo: HealthIcon,
    name: "Pelayanan Kesehatan",
    description:
      "Memiliki Tubuh dan Jiwa yang sehat menjadi kebutuhan dasar manusia yang menjadi perhatian khusus bagi Gereja St. Bonaventura",
    url: {
      name: "bidang.guest.detail",
      slugs: {
        bidang: "pelayanan-tim-khusus",
        bidangDetailSlug: "seksi-kesehatan",
      },
    },
  },
  {
    logo: AsakIcon,
    name: "Pelayanan ASAK",
    description:
      "Pendidikan menjadi dasar bagi setiap pribadi manusia untuk menjadi manusia yang mandiri dan fondasi bagi pribadi untuk menjadi manusia yang sejahtera",
    url: {
      name: "bidang.guest.detail",
      slugs: {
        bidang: "pelayanan-tim-khusus",
        bidangDetailSlug: "tim-khusus-asak",
      },
    },
  },
  {
    logo: KaritatifIcon,
    name: "Pelayanan Karitatif",
    description:
      "Pelayanan Karitatif menjadi bukti nyata dari pelaksanaan Kasih Kristus kepada sesama, terutama mereka yang miskin, difabel dan tersingkir",
    url: {
      name: "bidang.guest.detail",
      slugs: {
        bidang: "persekutuan-pendampingan-territorial-dan-kategorial",
        bidangDetailSlug: "komunitas-kategorial-kerabat-kerja-ibu-teresa-kkit",
      },
    },
  },
];

const Shortcuts = [
  {
    type: "artikel",
    name: "Berita dan Kegiatan",
    description:
      "Jangan ketinggalan! Tetap update dengan informasi kegiatan dan berita terbaru seputar Paroki Pulomas. Klik link di bawah ini:",
    urlName: "article.guest.index",
  },
  {
    type: "informasi",
    name: "Sakramen",
    description:
      "Dapatkan segala informasi terbaru tentang syarat, ketentuan, dan pendaftaran kegiatan sakramental dapat ditemukan di link berikut:",
    urlName: "baptism.guest.index",
  },
  {
    type: "informasi",
    name: "Warta Minggu",
    description:
      "Jangan ketinggalan! Tetap update dengan informasi kegiatan dan berita terbaru seputar Paroki Pulomas. Klik link di bawah ini:",
    urlName: "news.guest.index",
  },
];

function MassInformationSection({ title, data }) {
  return (
    <div>
      <div className="py-3 border border-black border-x-0">
        <h1 className="border-top uppercase tracking-widest text-lg md:text-xl">
          {title}
        </h1>
      </div>
      <div className="flex flex-col gap-4 mt-8">
        {data.map((mass, index) => (
          <div key={index}>
            {mass.day && (
              <h1 className="font-secondary text-lg md:text-xl font-bold mb-3">
                {mass.day}
              </h1>
            )}
            <div className="flex flex-col gap-2">
              {mass.data.map((data, dataIndex) => (
                <div
                  key={dataIndex}
                  className="font-secondary flex justify-between"
                >
                  <p className="font-secondary text-base md:text-lg">
                    {data.time}
                  </p>
                  <p
                    className={`font-secondary text-base md:text-lg uppercase ${
                      data.type.includes("online") ? "text-b200 font-bold" : ""
                    }`}
                  >
                    {data.type}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function IntroductionLeft() {
  return (
    <div className="bg-white h-full flex-1 shadow-basic flex flex-col lg:flex-row items-stretch gap-4 lg:gap-10 p-6 lg:p-0">
      <LazyImage
        src={BonaImg}
        className="!h-3/4 lg:!h-auto !w-full lg:!w-[310px] object-cover rounded lg:rounded-none"
        alt="Bonaventura Image"
      />
      <div className="py-4 lg:py-12 flex-1">
        <p className="font-secondary text-sm font-bold mb-2">
          Tentang Paroki Pulomas
        </p>
        <h1 className="text-b200 text-xl md:text-2xl lg:text-3xl leading-tight mb-4">
          Selamat Datang di Gereja Santo Bonaventura Paroki Pulo Mas
        </h1>
        <p className="text-sm md:text-base lg:text-lg font-secondary leading-relaxed">
          Gereja Santo Bonaventura adalah Gereja Katolik yang terletak di Pulo
          Mas, Jakarta Timur. Gereja St. Bonaventura berdiri sejak tahun 1977
          dan saat ini dilayani oleh imam Diosesan Jakarta (KAJ). Gereja St.
          Bonaventura hadir sebagai "Oase" yang menemani perjalanan rohani umat
          Katolik dan tempat menimba sisi spiritual kristiani bagi umat Katolik
          di mana saja.
        </p>
      </div>
      <div className="flex justify-center lg:justify-start lg:items-start lg:pt-2">
        <img className="w-16" src={BonaLogo} alt="Logo Bonaventura" />
      </div>
    </div>
  );
}

function IntroductionRight() {
  return (
    <div className="bg-white !h-auto w-full lg:w-[380px] lg:grow-0 shadow-basic">
      <div className="p-6 lg:p-[40px] flex flex-col justify-between w-full">
        <h1 className="text-b200 text-xl md:text-2xl lg:text-3xl mb-6">
          Jadwal Perayaan Ekaristi
        </h1>
        <MassInformationSection title="Misa Mingguan" data={WeeklyMass} />
        <Button
          className="w-full mt-8 lg:mt-10"
          onClick={() => router.replace("#jadwal-misa")}
        >
          Selengkapnya
        </Button>
      </div>
    </div>
  );
}

export default function Index({ news, articles }) {
  return (
    <div>
      <Head title="Beranda" />
      <Navbar />
      {/* Hero Section with full height */}
      <div className="h-screen flex items-center justify-center">
        <Slider />
      </div>

      {/* Introduction Section - Responsive */}
      <div className="w-full outer-wrapper relative mb-20 lg:mb-0">
        {/* Mobile: Normal flow, Desktop: Absolute positioning */}
        <div className="inner-wrapper !items-stretch flex-col lg:!flex-row gap-5 lg:absolute lg:top-[-120px]">
          <IntroductionLeft />
          <IntroductionRight />
        </div>
      </div>

      {/* Only add spacing on desktop */}
      <div className="hidden md:block section-absolute"></div>
      <Statistics />

      {/* Services Section - Responsive Grid */}
      <div className="outer-wrapper !mb-16 lg:!mb-32">
        <div className="inner-wrapper">
          <h1 className="text-center section-title mb-10 lg:mb-20 text-2xl lg:text-4xl">
            Karya Pelayanan Santo Bonaventura Pulo Mas
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 lg:gap-20">
            {SERVICES.map((service, index) => (
              <Link
                key={index}
                target="_blank"
                href={route(service.url.name, service.url.slugs ?? {})}
                className="p-6 lg:p-10 flex flex-col gap-4 lg:gap-6 items-start bg-b100 hover:shadow-lg transition-shadow"
              >
                <img
                  src={service.logo}
                  alt={service.name}
                  className="h-12 lg:h-16"
                />
                <div className="flex flex-col gap-2">
                  <h1 className="text-xl lg:text-2xl">{service.name}</h1>
                  <p className="font-secondary text-sm lg:text-base">
                    {service.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Shortcuts Section - Responsive */}
      <div className="outer-wrapper bg-b100 mb-16 lg:mb-32">
        <div className="inner-wrapper !items-center !lg:items-start">
          <div className="py-6 lg:py-10 flex flex-col h-full gap-8 lg:flex-row lg:gap-20 w-full">
            {Shortcuts.map((shortcut, index) => (
              <ShortcutCard key={index} data={shortcut} />
            ))}
          </div>
        </div>
      </div>

      {/* News Section - Responsive */}
      <div className="outer-wrapper mb-16 lg:mb-32">
        <div className="inner-wrapper !items-start">
          <h1 className="text-center w-full section-title text-2xl lg:text-4xl">
            Warta Minggu
          </h1>
          <div className="py-6 lg:py-10 w-full flex flex-col gap-5">
            {news?.length > 0 ? (
              news.map((newsItem, index) => (
                <NewsCard key={index} data={newsItem} />
              ))
            ) : (
              <div className="w-full min-h-60 lg:min-h-80 flex justify-center items-center text-xl lg:text-2xl font-secondary font-semibold text-gray-800 leading-tight text-center px-4">
                Tidak Ada Warta Minggu
              </div>
            )}
          </div>
          {news.length > 0 && (
            <Button
              className="h-16 lg:h-20 px-6 lg:px-10"
              onClick={() => router.visit(route("news.guest.index"))}
            >
              Baca Warta Minggu Lain
            </Button>
          )}
        </div>
      </div>

      {/* Articles Section - Responsive */}
      <div className="outer-wrapper mb-16 lg:mb-32 gap-6 lg:gap-10">
        <h1 className="text-center section-title text-2xl lg:text-4xl">
          Berita & Kegiatan
        </h1>
        <div className="inner-wrapper gap-5 min-h-[400px] lg:min-h-[600px] !items-start">
          {articles?.length > 0 ? (
            <>
              <ArticleCard data={articles[0]} />
              <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {articles.slice(1).map((article, index) => (
                  <ArticleCard key={index} type="secondary" data={article} />
                ))}
              </div>
              <div className="mt-5 flex">
                <Button
                  className="h-16 lg:h-20 px-6 lg:px-10"
                  onClick={() => router.visit(route("article.guest.index"))}
                >
                  Baca Artikel Lain
                </Button>
              </div>
            </>
          ) : (
            <div className="w-full min-h-60 lg:min-h-80 flex justify-center items-center text-xl lg:text-2xl font-secondary font-semibold text-gray-800 leading-tight text-center px-4">
              Tidak Ada Berita & Kegiatan
            </div>
          )}
        </div>
      </div>

      {/* Mass Schedule Section - Responsive */}
      <div className="h-16 lg:h-32" id="jadwal-misa"></div>
      <div className="outer-wrapper mb-16 lg:mb-32 bg-b100">
        <div className="inner-wrapper !py-6 lg:!py-10">
          <h1 className="section-title mb-6 lg:mb-10 text-2xl lg:text-4xl">
            Jadwal Perayaan Ekaristi
          </h1>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-10">
            <div className="order-2 lg:order-1">
              <ol className="list-decimal pl-4 space-y-2">
                <li className="text-sm lg:text-base">
                  Datang lebih awal, sekitar 10-15 menit sebelum misa dimulai.
                </li>
                <li className="text-sm lg:text-base">
                  Berpakaian sopan dan rapi.
                </li>
                <li className="text-sm lg:text-base">
                  Disediakan area khusus bagi pengguna kursi roda di dekat
                  tempat duduk lansia.
                </li>
                <li className="text-sm lg:text-base">
                  Untuk misa online bisa mengunjungi Channel Youtube Komsos
                  Santo Bonaventura Pulo Mas.
                </li>
              </ol>
              <Button
                className="w-full mt-5 py-6 lg:py-10 text-sm lg:text-base"
                onClick={() =>
                  window.open(
                    "https://www.youtube.com/@KomsosBonaventura/streams",
                    "_blank"
                  )
                }
              >
                Tonton Misa Live Streaming
              </Button>
            </div>
            <div className="order-1 lg:order-2">
              <MassInformationSection title="Misa mingguan" data={WeeklyMass} />
            </div>
            <div className="flex flex-col gap-6 lg:gap-10 order-3">
              <MassInformationSection title="Misa harian" data={DailyMass} />
              <MassInformationSection
                title="Jumat Pertama"
                data={FirstFridayMass}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
