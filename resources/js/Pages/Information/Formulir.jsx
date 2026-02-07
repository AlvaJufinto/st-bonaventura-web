import { useMemo, useState } from "react";

import DownloadIcon from "@/assets/icon/download.svg";
import Button from "@/Components/guest/Button/Button";
import Footer from "@/Components/guest/Footer/Footer";
import Navbar from "@/Components/guest/Navbar/Navbar";
import { Head } from "@inertiajs/react";

const ASSET_URL = import.meta.env.VITE_PUBLIC_ASSET_URL;

const FORMULIR_DATA = [
  {
    category: "Sakramen Baptis",
    description:
      "Formulir untuk permohonan sakramen baptis bayi, anak, dan dewasa",
    files: [
      {
        name: "FORMULIR BAPTIS BAYI / ANAK",
        url: "formulir-baptis-bayi-anak.pdf",
      },
      {
        name: "FORMULIR BAPTIS DEWASA",
        url: "formulir-baptis-remaja-atau-dewasa.pdf",
      },
    ],
  },
  {
    category: "Sakramen Komuni Pertama",
    description: "Formulir untuk persiapan dan permohonan komuni pertama",
    files: [
      {
        name: "FORMULIR KOMUNI PERTAMA",
        url: "formulir-komuni-pertama.pdf",
      },
    ],
  },
  {
    category: "Sakramen Krisma",
    description: "Formulir untuk permohonan sakramen krisma",
    files: [
      {
        name: "FORMULIR KRISMA",
        url: "formulir-krisma.pdf",
      },
    ],
  },
  {
    category: "Sakramen Perkawinan",
    description:
      "Formulir, surat pengantar, dan persiapan untuk sakramen perkawinan",
    files: [
      {
        name: "SURAT PENGANTAR & PENDAFTARAN PERKAWINAN",
        url: "formulir-surat-pengantar-lingkungan-dan-pendaftaran-perkawinan.pdf",
      },
      {
        name: "SURAT PENGANTAR & PERSIAPAN PERKAWINAN",
        url: "surat-pengantar-lingkungan-dan-persiapan-perkawinan.pdf",
      },
    ],
  },
  {
    category: "Surat Keterangan Umum",
    description: "Formulir untuk permohonan surat keterangan dari gereja",
    files: [
      {
        name: "FORMULIR SURAT KETERANGAN UMUM",
        url: "formulir-surat-keterangan-umum.pdf",
      },
    ],
  },
  {
    category: "Formulir Permohonan Kartu Keluarga",
    description: "Formulir untuk permohonan kartu keluarga baru",
    files: [
      {
        name: "PERMOHONAN KK 1A",
        url: "formulir-permohonan-KK-1a.pdf",
      },
      {
        name: "PERMOHONAN KK 1B",
        url: "formulir-permohonan-KK-1b.pdf",
      },
    ],
  },
  {
    category: "Formulir Perubahan KK",
    description: "Formulir untuk perubahan dan perbaikan kartu keluarga",
    files: [
      {
        name: "PERUBAHAN KK PINDAH DOMISILI",
        url: "formulir-perubahan-KK-domisili.pdf",
      },
      {
        name: "PERUBAHAN TAMBAH ANGGOTA",
        url: "formulir-perubahan-KK-tambah-anggota.pdf",
      },
      {
        name: "PERUBAHAN KK CETAK ULANG",
        url: "formulir-perubahan-KK-cetak-ulang.pdf",
      },
      {
        name: "PERUBAHAN BIODATA",
        url: "formulir-perubahan-KK-biodata.pdf",
      },
    ],
  },
];

export default function Formulir() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredData = useMemo(() => {
    if (!searchQuery.trim()) return FORMULIR_DATA;

    const query = searchQuery.toLowerCase();
    return FORMULIR_DATA.map((category) => ({
      ...category,
      files: category.files.filter(
        (file) =>
          file.name.toLowerCase().includes(query) ||
          category.category.toLowerCase().includes(query),
      ),
    })).filter((category) => category.files.length > 0);
  }, [searchQuery]);

  return (
    <>
      <Head title="Formulir" />
      <Navbar />

      {/* Header Section */}
      <div className="outer-wrapper pt-10 h-[50vh] md:h-[60vh] img-background">
        <div className="inner-wrapper !items-start !justify-start px-4 md:px-0">
          <p className="small-title">Informasi</p>
          <h1 className="section-title !mb-4">Formulir</h1>
          <p className="w-full md:w-3/4 lg:w-1/2 font-secondary">
            Unduh berbagai formulir yang diperlukan untuk mengajukan permohonan
            sakramen dan layanan gereja lainnya. Kami menyediakan semua dokumen
            yang Anda butuhkan dalam satu tempat untuk kemudahan Anda.
          </p>
        </div>
      </div>

      {/* Search Section */}
      <div className="outer-wrapper py-8 md:py-12 border-b border-gray-200">
        <div className="inner-wrapper !items-start !justify-start px-4 md:px-0">
          <div className="w-full max-w-3xl">
            <div className="relative">
              <input
                type="text"
                placeholder="Cari formulir atau kategori..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-5 md:px-6 py-3 md:py-4 border-2 border-gray-300 -lg focus:outline-none focus:border-b300 focus:ring-2 focus:ring-b300/20 transition-all text-sm md:text-base font-secondary"
              />
              {/*<span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg">
                🔍
              </span>*/}
            </div>
            {searchQuery && (
              <p className="text-sm text-gray-600 mt-3 font-secondary">
                Menampilkan{" "}
                <span className="font-semibold text-gray-900">
                  {filteredData.reduce(
                    (count, cat) => count + cat.files.length,
                    0,
                  )}
                </span>{" "}
                hasil dari pencarian
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-12 md:py-20 outer-wrapper !justify-start min-h-svh">
        <div className="inner-wrapper !items-start !justify-start gap-8 md:gap-12 px-4 md:px-0 w-full">
          {filteredData.length > 0 ? (
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
              {filteredData.map((category, categoryIndex) => (
                <div
                  key={categoryIndex}
                  className="flex flex-col gap-4 md:gap-6 bg-white border border-gray-200 p-6 md:p-8 hover:shadow-basic transition-all duration-200"
                >
                  {/* Category Header */}
                  <div className="flex flex-col gap-2 pb-4 border-b border-gray-200">
                    <h2 className="text-lg md:text-xl font-bold text-gray-900">
                      {category.category}
                    </h2>
                    <p className="text-xs md:text-sm text-gray-600 font-secondary">
                      {category.description}
                    </p>
                  </div>

                  {/* Files List */}
                  <div className="flex flex-col gap-3 md:gap-4">
                    {category.files.map((file, fileIndex) => (
                      <Button
                        key={fileIndex}
                        className="gap-3 md:gap-4 !justify-start !px-4 md:!px-6 !text-left text-xs md:text-sm !py-3 group"
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
                          className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0 group-hover:scale-110 transition-transform"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-secondary truncate group-hover:text-white transition-colors">
                            {file.name}
                          </p>
                        </div>
                        <span className="text-xs font-secondary opacity-75 group-hover:opacity-100 flex-shrink-0">
                          PDF
                        </span>
                      </Button>
                    ))}
                  </div>

                  {/* File Count */}
                  <div className="pt-4 border-t border-gray-200">
                    <p className="text-xs text-gray-500 font-secondary">
                      {category.files.length}{" "}
                      {category.files.length === 1 ? "formulir" : "formulir"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="w-full min-h-80 flex flex-col justify-center items-center gap-4 text-center">
              <p className="text-2xl font-secondary font-semibold text-gray-800">
                Tidak Ada Hasil
              </p>
              <p className="text-gray-600 font-secondary">
                Formulir yang Anda cari tidak ditemukan. Coba dengan kata kunci
                yang berbeda.
              </p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}
