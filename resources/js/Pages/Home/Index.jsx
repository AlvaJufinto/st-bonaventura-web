import AsakIcon from "@/assets/icon/home/asak-icon.svg";
import CategorialIcon from "@/assets/icon/home/categorial-icon.svg";
import EucharistIcon from "@/assets/icon/home/eucharist-icon.svg";
import HealthIcon from "@/assets/icon/home/health-icon.svg";
import KaritatifIcon from "@/assets/icon/home/karitatif-icon.svg";
import PrayIcon from "@/assets/icon/home/pray-icon.svg";
import BonaImg from "@/assets/img/st-bonaventura-home.png";
import BonaLogo from "@/assets/logo/logo-bonaventura.png";
import Button from "@/Components/guest/shared/Button/Button";
import Navbar from "@/Components/guest/shared/Navbar/Navbar";
import { Head, router } from "@inertiajs/react";

const MassInformation = [
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

const ChurchStatistic = [
  {
    name: "Daya Tampung Umat",
    data: 500,
  },
  {
    name: "Jumlah Lingkungan",
    data: 49,
  },
  {
    name: "Usia Paroki Pulomas",
    data: 46,
  },
  {
    name: "Komunitas & Kategorial",
    data: 21,
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
    url: "/berita-kegiatan",
  },
  {
    type: "informasi",
    name: "Sakramen",
    description:
      "Dapatkan segala informasi terbaru tentang syarat, ketentuan, dan pendaftaran kegiatan sakramental dapat ditemukan di link berikut:",
    url: "/sakramen/baptis",
  },
  {
    type: "informasi",
    name: "Warta Minggu",
    description:
      "Jangan ketinggalan! Tetap update dengan informasi kegiatan dan berita terbaru seputar Paroki Pulomas. Klik link di bawah ini:",
    url: "/warta-minggu",
  },
];

function IntroductionLeft() {
  return (
    <div className="bg-white h-full flex-1 shadow-basic flex  items-stretch gap-[52px]">
      <img
        src={BonaImg}
        className="h-auto w-[310px] object-cover"
        alt="Bonaventura Image"
      />
      <div className="py-[40px]">
        <p className="font-secondary text-xs font-bold">
          Tentang Paroki Pulomas
        </p>
        <h1 className="mt-[6px] text-b200 text-3xl">
          Selamat Datang di Gereja Santo Bonaventura Pulo Mas
        </h1>
        <p className="pt-[20px] text-lg font-secondary">
          Gereja Santo Bonaventura adalah Gereja Katolik yang terletak di Pulo
          Mas, Jakarta Timur. Gereja St. Bonaventura berdiri sejak tahun 1977
          dan saat ini dilayani oleh imam Diosesan Jakarta (KAJ). Gereja St.
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
      <div className="p-[40px]">
        <h1 className="mt-[6px] text-b200 text-3xl">
          Jadwal Perayaan Ekaristi
        </h1>
        <div className="mt-6 py-3 border border-black border-x-0">
          <h1 className="border-top tracking-widest text-xl">MISA MINGGUAN</h1>
        </div>
        <div className="flex flex-col gap-8 mt-10">
          {MassInformation.map((mass, index) => (
            <div key={index}>
              <h1 className="font-secondary text-xl font-bold mb-3">
                {mass.day}
              </h1>
              <div className="flex flex-col gap-2">
                {mass.data.map((data, dataIndex) => (
                  <div
                    key={dataIndex}
                    className="font-secondary flex justify-between"
                  >
                    <p className="font-secondary text-lg">{data.time}</p>
                    <p
                      className={`font-secondary text-lg uppercase ${
                        data.type.includes("online")
                          ? "text-b200 font-bold"
                          : ""
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
    </div>
  );
}

export default function Index() {
  return (
    <div>
      <Head title="Home" />
      <Navbar />
      <div className="outer-wrapper h-[600px] w-full bg-slate-200 ">
        <div className="inner-wrapper">asdasd</div>
      </div>
      <div className="w-full relative outer-wrapper">
        <div className="inner-wrapper !items-stretch !flex-row absolute top-[-80px] flex gap-[20px] min-h-[580px]">
          {/* LEFT */}
          <IntroductionLeft />
          {/* RIGHT */}
          <IntroductionRight />
        </div>
      </div>
      <div className="section-absolute"></div>
      <div className="outer-wrapper mb-32">
        <div className="inner-wrapper !flex-row">
          {ChurchStatistic.map((stat, index) => (
            <div
              key={index}
              className={`grow flex flex-col items-center gap-2 ${
                index !== ChurchStatistic.length - 1
                  ? "border-r border-gray-300"
                  : ""
              }`}
            >
              <p className="text-8xl">{stat.data}</p>
              <p className="font-secondary text-b200">{stat.name}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="outer-wrapper !mb-32">
        <div className="inner-wrapper">
          <h1 className="text-center section-title mb-20">
            Karya Pelayanan St. Bonaventura Pulomas
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
        <div className="inner-wrapper">
          <div className="py-10 flex gap-20">
            {Shortcuts.map((shortcut, index) => (
              <div
                key={index}
                className="flex flex-col gap-6 items-start justify-stretch"
              >
                <p className="font-secondary uppercase font-bold">
                  {shortcut.type}
                </p>
                <h1 className="text-3xl text-b200">{shortcut.name}</h1>
                <p className="font-secondary">{shortcut.description}</p>

                <Button
                  className="w-full"
                  onClick={() => router.visit(shortcut.url)}
                >
                  Baca
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
