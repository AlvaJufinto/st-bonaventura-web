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
import { Head, router } from "@inertiajs/react";

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

const Services = [
  {
    logo: EucharistIcon,
    name: "Ekaristi",
    description:
      "Perayaan Ekaristi, Devosi dan Doa menjadi dasar kehiudpan umat beriman untuk menjadi semakin serupa dengan Kristus di dunia",
  },
  {
    logo: PrayIcon,
    name: "Komunitas Doa",
    description:
      "Sebab di mana dua atau tiga orang berkumpul dalam nama-Ku, di situ Tuhan hadir di tengah-tengah mereka dan membawa Sukacita",
  },
  {
    logo: CategorialIcon,
    name: "Karya Kategorial",
    description:
      "Karya Kategorial menjadi sarana untuk mewujud-nyatakan Kasih Allah yang semakin konkret dalam kehidupan masyarakat",
  },
  {
    logo: HealthIcon,
    name: "Pelayanan Kesehatan",
    description:
      "Memiliki Tubuh dan Jiwa yang sehat menjadi kebutuhan dasar manusia yang menjadi perhatian khusus bagi Gereja St. Bonaventura",
  },
  {
    logo: AsakIcon,
    name: "Pelayanan ASAK",
    description:
      "Pendidikan menjadi dasar bagi setiap pribadi manusia untuk menjadi manusia yang mandiri dan fondasi bagi pribadi untuk menjadi manusia yang sejahtera",
  },
  {
    logo: KaritatifIcon,
    name: "Pelayanan Karitatif",
    description:
      "Pelayanan Karitatif menjadi bukti nyata dari pelaksanaan Kasih Kristus kepada sesama, terutama mereka yang miskin, difabel dan tersingkir",
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
        <h1 className="border-top uppercase tracking-widest text-xl">
          {title}
        </h1>
      </div>
      <div className="flex flex-col gap-4 mt-8">
        {data.map((mass, index) => (
          <div key={index}>
            {mass.day && (
              <h1 className="font-secondary text-xl font-bold mb-3">
                {mass.day}
              </h1>
            )}
            <div className="flex flex-col gap-2">
              {mass.data.map((data, dataIndex) => (
                <div
                  key={dataIndex}
                  className="font-secondary flex justify-between"
                >
                  <p className="font-secondary text-lg">{data.time}</p>
                  <p
                    className={`font-secondary text-lg uppercase ${
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
    <div className="bg-white h-full flex-1 shadow-basic flex  items-stretch gap-10">
      <LazyImage
        src={BonaImg}
        className="!h-auto !w-[310px] object-cover"
        alt="Bonaventura Image"
      />
      <div className="py-12">
        <p className="font-secondary text-sm font-bold">
          Tentang Paroki Pulomas
        </p>
        <h1 className="mt-[6px] text-b200 text-3xl">
          Selamat Datang di Gereja Santo Bonaventura Paroki Pulo Mas
        </h1>
        <p className="pt-[20px] text-lg font-secondary">
          Gereja Santo Bonaventura adalah Gereja Katolik yang terletak di Pulo
          Mas, Jakarta Timur. Gereja St. Bonaventura berdiri sejak tahun 1977
          dan saat ini dilayani oleh imam Diosesan Jakarta (KAJ). Gereja St.
          Bonaventura hadir sebagai "Oase" yang menemani perjalanan rohani umat
          Katolik dan tempat menimba sisi spiritual kristiani bagi umat Katolik
          di mana saja.
        </p>
      </div>
      <img
        className="pt-[8px] pr-[8px] w-[80px] h-[80px]"
        src={BonaLogo}
        alt="Logo Bonaventura"
      />
    </div>
  );
}

function IntroductionRight() {
  return (
    <div className="bg-white !h-auto w-[380px] grow-0 shadow-basic flex gap-[40px]">
      <div className="p-[40px] flex flex-col justify-between">
        <h1 className="mt-3 text-b200 text-3xl">Jadwal Perayaan Ekaristi</h1>
        <MassInformationSection title="Misa Mingguan" data={WeeklyMass} />
        <Button
          className="w-full mt-10"
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
      <Slider />
      <div className="w-full relative outer-wrapper">
        <div className="inner-wrapper !items-stretch !flex-row absolute top-[-80px] flex gap-[20px] min-h-[580px]">
          {/* LEFT */}
          <IntroductionLeft />
          {/* RIGHT */}
          <IntroductionRight />
        </div>
      </div>
      <div className="section-absolute"></div>
      <Statistics />
      <div className="outer-wrapper !mb-32">
        <div className="inner-wrapper">
          <h1 className="text-center section-title mb-20">
            Karya Pelayanan Santo Bonaventura Pulo Mas
          </h1>
          <div className="grid grid-cols-3 gap-20">
            {Services.map((service, index) => (
              <div
                key={index}
                className="p-10 flex flex-col gap-6 items-start bg-b100"
              >
                <img src={service.logo} alt={service.name} className="h-16" />
                <div className="flex flex-col gap-2">
                  <h1 className="text-2xl">{service.name}</h1>
                  <p className="font-secondary">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="outer-wrapper  bg-b100 mb-32">
        <div className="inner-wrapper !items-start">
          <div className="py-10 flex gap-20">
            {Shortcuts.map((shortcut, index) => (
              <ShortcutCard key={index} data={shortcut} />
            ))}
          </div>
        </div>
      </div>
      <div className="outer-wrapper mb-32">
        <div className="inner-wrapper !items-start">
          <h1 className="text-center w-full section-title">Warta Minggu</h1>
          <div className="py-10 w-full flex flex-col gap-5">
            {news?.length > 0 ? (
              news.map((news, index) => <NewsCard key={index} data={news} />)
            ) : (
              <div className="w-full min-h-80 flex justify-center items-center text-2xl font-secondary font-semibold text-gray-800 leading-tight">
                Tidak Ada Warta Minggu
              </div>
            )}
          </div>
          {news.length > 0 && (
            <Button
              className="h-20 px-10"
              onClick={() => router.visit(route("news.guest.index"))}
            >
              Baca Warta Minggu Lain
            </Button>
          )}
        </div>
      </div>
      <div className="outer-wrapper mb-32 gap-10">
        <h1 className="text-center section-title">Berita & Kegiatan</h1>
        <div className="inner-wrapper gap-5 min-h-[600px] !items-start">
          {articles?.length > 0 ? (
            <>
              <ArticleCard data={articles[0]} />
              <div className="w-full grid grid-cols-3 gap-5">
                {articles.slice(1).map((article, index) => (
                  <ArticleCard key={index} type="secondary" data={article} />
                ))}
              </div>
              <div className="mt-5 flex">
                <Button
                  className="h-20 px-10"
                  onClick={() => router.visit(route("article.guest.index"))}
                >
                  Baca Artikel Lain
                </Button>
              </div>
            </>
          ) : (
            <div className="w-full min-h-80 flex justify-center items-center text-2xl font-secondary font-semibold text-gray-800 leading-tight">
              Tidak Ada Berita & Kegiatan
            </div>
          )}
        </div>
      </div>

      <div className="h-32" id="jadwal-misa"></div>
      <div className="outer-wrapper mb-32 bg-b100">
        <div className="inner-wrapper !py-10">
          <h1 className="section-title mb-10">Jadwal Perayaan Ekaristi</h1>
          <div className="grid grid-cols-3 gap-10">
            <div>
              <ol className="list-decimal">
                <li>
                  Datang lebih awal, sekitar 10-15 menit sebelum misa dimulai.
                </li>
                <li>Berpakaian sopan dan rapi.</li>
                <li>
                  Disediakan area khusus bagi pengguna kursi roda di dekat
                  tempat duduk lansia.
                </li>
                <li>
                  Untuk misa online bisa mengunjungi Channel Youtube Komsos
                  Santo Bonaventura Pulo Mas.
                </li>
              </ol>
              <Button
                className="w-full mt-5 py-10"
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
            <MassInformationSection title="Misa mingguan" data={WeeklyMass} />
            <div className="flex flex-col gap-10">
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
