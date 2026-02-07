import DownloadIcon from "@/assets/icon/download.svg";
import WhatsappIcon from "@/assets/icon/whatsapp.svg";
import Baptism from "@/assets/img/sacrament/baptism.png";
import Communion from "@/assets/img/sacrament/communion.png";
import Confirmation from "@/assets/img/sacrament/confirmation.png";
import HeaderImg from "@/assets/img/sacrament/header.png";
import Marriage from "@/assets/img/sacrament/marriage.png";
import Reconciliation from "@/assets/img/sacrament/reconciliation.png";
import Sick from "@/assets/img/sacrament/sick.png";
import Button from "@/Components/guest/Button/Button";
import Footer from "@/Components/guest/Footer/Footer";
import LazyImage from "@/Components/guest/LazyImage";
import Navbar from "@/Components/guest/Navbar/Navbar";
import { Head, Link, usePage } from "@inertiajs/react";

const PREFIX = "/sakramen";

const ASSET_URL = import.meta.env.VITE_PUBLIC_ASSET_URL;

const DATA = [
  {
    name: "Sakramen Baptis",
    url: PREFIX + "/baptis",
    content: {
      img: Baptism,
      title: "Sakramen Baptis",
      description:
        `"Jika seseorang tidak dilahirkan dari air dan Roh, ia tidak dapat masuk ke dalam Kerajaan Allah." (Yoh 3:5)\n\n` +
        `Baptis adalah sakramen pertama yang membawa kita ke dalam kehidupan Kristen. Melalui Baptis, kita diterima menjadi anak-anak Allah dan anggota keluarga besar Gereja. Kami di Gereja St. Bonaventura dengan senang hati menyambut setiap individu yang ingin menerima rahmat sakramen ini.`,
      files: [
        {
          name: "DOWNLOAD FORMULIR BAPTIS BAYI / ANAK",
          url: "formulir-baptis-bayi-anak.pdf",
        },
        {
          name: "DOWNLOAD FORMULIR BAPTIS DEWASA",
          url: "formulir-baptis-remaja-atau-dewasa.pdf",
        },
      ],
    },
  },
  {
    name: "Komuni Pertama",
    url: PREFIX + "/komuni-pertama",
    content: {
      img: Communion,
      title: "Sakramen Komuni Pertama",
      description:
        `"Akulah roti hidup yang telah turun dari surga; barangsiapa makan roti ini, ia akan hidup selama-lamanya." (Yoh 6:51)\n\n` +
        `Komuni Pertama adalah momen istimewa ketika seseorang untuk pertama kalinya menerima Tubuh dan Darah Kristus dalam Ekaristi. Sakramen ini memperkuat persatuan kita dengan Tuhan dan Gereja-Nya.`,
      files: [
        {
          name: "DOWNLOAD FORMULIR KOMUNI PERTAMA",
          url: "formulir-komuni-pertama.pdf",
        },
      ],
    },
  },
  {
    name: "Sakramen Krisma",
    url: PREFIX + "/krisma",
    content: {
      img: Confirmation,
      title: "Sakramen Krisma",
      description:
        `"Tetapi kamu akan menerima kuasa, kalau Roh Kudus turun ke atas kamu, dan kamu akan menjadi saksi-Ku." (Kis 1:8)\n\n` +
        `Sakramen Krisma meneguhkan dan menguatkan umat dalam iman melalui pencurahan Roh Kudus. Dengan Krisma, kita dipanggil untuk menjadi saksi Kristus dalam kehidupan sehari-hari.`,
      files: [{ name: "DOWNLOAD FORMULIR KRISMA", url: "formulir-krisma.pdf" }],
    },
  },
  {
    name: "Sakramen Rekonsiliasi",
    url: PREFIX + "/rekonsiliasi",
    content: {
      img: Reconciliation,
      title: "Sakramen Rekonsiliasi",
      description:
        `"Jika kita mengakui dosa kita, maka Ia adalah setia dan adil, sehingga Ia akan mengampuni segala dosa kita dan menyucikan kita dari segala kejahatan." (1 Yoh 1:9)\n\n` +
        `Sakramen Tobat adalah kesempatan bagi umat untuk menerima rahmat pengampunan Tuhan dan memperbaiki hubungan dengan-Nya. Dalam pengakuan dosa, kita bertobat dan berkomitmen untuk hidup lebih baik.`,
    },
  },
  {
    name: "Sakramen Perminyakan",
    url: PREFIX + "/perminyakan",
    content: {
      img: Sick,
      title: "Sakramen Perminyakan",
      description:
        `"Adakah seorang di antara kamu yang sakit? Baiklah ia memanggil para penatua jemaat, supaya mereka mendoakan dia serta mengolesnya dengan minyak dalam nama Tuhan." (Yakobus 5:14)\n\n` +
        `Sakramen Perminyakan Orang Sakit adalah sakramen penyembuhan yang diberikan kepada mereka yang sakit serius, lanjut usia, atau menghadapi operasi besar. Melalui pengurapan dengan minyak suci dan doa imam, sakramen ini memberikan kekuatan rohani, kedamaian, pengampunan dosa, dan, jika Tuhan menghendaki, kesembuhan fisik.\n\n` +
        `Sakramen ini dapat diterima lebih dari sekali dan bukan hanya bagi yang mendekati ajal, tetapi juga bagi siapa saja yang membutuhkan pemulihan.`,
    },
  },
  {
    name: "Sakramen Perkawinan",
    url: PREFIX + "/perkawinan",
    content: {
      img: Marriage,
      title: "Sakramen Perkawinan",
      description:
        `"Demikianlah mereka bukan lagi dua, melainkan satu. Karena itu, apa yang telah dipersatukan Allah, tidak boleh diceraikan manusia." (Mat 19:6)\n\n` +
        `Perkawinan adalah sakramen yang menyatukan pasangan pria dan wanita dalam ikatan suci yang diberkati oleh Tuhan. Dalam pernikahan Katolik, pasangan dipanggil untuk hidup dalam kasih, kesetiaan, dan komitmen.`,
      files: [
        {
          name: "SURAT PENGANTAR & PENDAFTARAN PERKAWINAN",
          url: "formulir-surat-pengantar-lingkungan-dan-pendaftaran-perkawinan.pdf",
        },
        {
          name: "SURAT PENGANTAR & PERSIAPAN PERKAWINAN",
          url: "surat-pengantar-lingkungan-dan-persiapan-perkawinan.pdf",
        },
        //{ name: "FORMULIR BOOKING GEREJA (PERKAWINAN)", url: "" },
      ],
    },
  },
];

export default function Header({ children, type = "Baptis" }) {
  const { url } = usePage();

  const PAGE_DATA = DATA.find((data) => data.url === url);

  return (
    <div>
      <Head title={`Sakramen ${type}`}></Head>
      <Navbar />
      <div
        className="relative outer-wrapper bg-cover bg-center bg-no-repeat h-[60vh] md:h-[75vh] gap-5 mb-12 md:mb-20"
        style={{
          backgroundImage: `url(${HeaderImg})`,
        }}
      >
        <div className="inner-wrapper !items-start gap-3 md:gap-5 px-4 md:px-0">
          <h1 className="text-n100 text-3xl md:text-6xl">Sakramen</h1>
          <p className="text-n100 text-base md:text-xl font-light w-full md:w-1/2">
            Sakramen adalah tanda kasih dan rahmat Tuhan yang menguatkan iman
            kita. Melalui sakramen, kita dipanggil untuk semakin dekat dengan
            Tuhan dan hidup dalam kasih-Nya. Di Gereja St. Bonaventura, kami
            menyambut Anda untuk menerima sakramen-sakramen yang membawa
            perubahan dalam hidup rohani Anda.
          </p>
        </div>
        <div className="!py-3 md:!py-6 !px-4 md:!px-14 md:!pr-4 inner-wrapper absolute -bottom-6 md:-bottom-12 bg-n100 w-full shadow-basic !grid grid-cols-2 md:grid-cols-6 gap-2 md:gap-20">
          {DATA.map((route, i) => (
            <Link
              className={`text-xs md:text-base ${
                url === route.url ? "text-b300 font-semibold" : ""
              }`}
              key={i}
              href={route.url}
              preserveScroll
            >
              {route.name}
            </Link>
          ))}
        </div>
      </div>
      <div className="outer-wrapper py-6 md:py-10 pb-20 md:pb-40">
        <div className="inner-wrapper !items-start !justify-start gap-10 md:gap-20 px-4 md:px-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-10">
            <LazyImage
              src={PAGE_DATA.content.img}
              alt={PAGE_DATA.name + "Image"}
              className="w-full"
            />
            <div className="flex flex-col gap-4 md:gap-8">
              <h1 className="text-2xl md:text-4xl">
                {PAGE_DATA.content.title}
              </h1>
              <div className="flex flex-col gap-2">
                {PAGE_DATA.content.description
                  .split("\n")
                  .map((line, index) => (
                    <p key={index} className="text-sm md:text-base">
                      {line}
                    </p>
                  ))}
              </div>
              {PAGE_DATA.content.files && (
                <div className="flex flex-col gap-3 md:gap-5 w-full md:w-3/4 mt-3 md:mt-5">
                  {PAGE_DATA.content.files.map((file, i) => (
                    <Button
                      key={i}
                      className="gap-3 md:gap-5 !justify-start !px-4 md:!px-8 !text-left text-xs md:text-base"
                      onClick={() =>
                        window.open(
                          `${ASSET_URL}/uploads/${file.url}`,
                          "_blank",
                        )
                      }
                    >
                      <img
                        src={DownloadIcon}
                        alt="download-icon"
                        className="w-4 h-4 md:w-6 md:h-6"
                      />
                      {file.name}
                    </Button>
                  ))}
                </div>
              )}
              <a
                href="https://api.whatsapp.com/send?phone=6287704825850"
                target="_blank"
                className="flex gap-2 md:gap-4 items-center text-xs md:text-sm font-secondary bg-b300 py-2 px-3 md:px-4 w-full md:w-3/4 text-n100 uppercase font-bold"
              >
                <img
                  src={WhatsappIcon}
                  className="w-6 h-6 md:w-8 md:h-8"
                  alt="Icon"
                />
                Hubungi Sekretariat +6287704825850
              </a>
            </div>
          </div>
          <div>{children}</div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
