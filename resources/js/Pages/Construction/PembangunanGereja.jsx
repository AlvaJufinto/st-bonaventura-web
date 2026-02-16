import { useState } from "react";

import Footer from "@/Components/guest/Footer/Footer";
import Navbar from "@/Components/guest/Navbar/Navbar";
import { Head } from "@inertiajs/react";

const FUND_TARGET = 75000000000; // 75 billion IDR
const FUND_COLLECTED = 12500000000; // 12.5 billion IDR (mockup - ~16.67%)
const FUND_PERCENTAGE = (FUND_COLLECTED / FUND_TARGET) * 100;

const TIMELINE_PHASES = [
  {
    phase: "Fase 1",
    period: "Bulan 1-12",
    tasks: ["Persiapan dan perizinan", "Rekrutmen kontraktor", "Pembiayaan"],
    status: "in-progress",
  },
  {
    phase: "Fase 2",
    period: "Bulan 13-24",
    tasks: [
      "Pembongkaran struktur lama",
      "Fondasi baru",
      "Pembangunan dinding",
    ],
    status: "pending",
  },
  {
    phase: "Fase 3",
    period: "Bulan 25-36",
    tasks: ["Finishing interior", "Instalasi sistem", "Dedikasi gereja"],
    status: "pending",
  },
];

const BEFORE_PHOTOS = [
  {
    id: 1,
    title: "Banjir Ruang Altar",
    description: "Genangan air hingga ke area utama altar",
  },
  {
    id: 2,
    title: "Kerusakan Dinding",
    description: "Dinding menunjukkan tanda-tanda kerusakan serius",
  },
  {
    id: 3,
    title: "Lantai Rusak",
    description: "Lantai gereja mengalami kerusakan parah akibat banjir",
  },
];

const DESIGN_PHOTOS = [
  {
    id: 1,
    title: "Tampak Depan Gereja Baru",
    description: "Desain modern dengan tetap mempertahankan nilai spiritual",
  },
  {
    id: 2,
    title: "Interior Ruang Altar",
    description: "Ruang altar yang lebih luas dan terang",
  },
  {
    id: 3,
    title: "Area Taman Gereja",
    description: "Taman yang indah dan asri di sekitar gereja",
  },
];

export default function PembangunanGereja() {
  const [expandedReason, setExpandedReason] = useState(null);
  const [activePhase, setActivePhase] = useState(0);
  const [showDonationModal, setShowDonationModal] = useState(false);

  return (
    <>
      <Head title="Pembangunan Gereja" />
      <Navbar />

      {/* Hero Header with Call-to-Action */}
      <div className="relative outer-wrapper overflow-hidden py-16 md:py-28 border-b-4 border-b300 bg-gradient-to-b from-gray-50 to-white">
        <div className="inner-wrapper !items-start !justify-start px-4 md:px-0 relative z-10">
          <div className="w-full max-w-5xl">
            <div className="mb-4 md:mb-6">
              <span className="inline-block px-4 py-2 bg-b300 text-white text-xs md:text-sm font-secondary font-semibold uppercase tracking-widest border-2 border-b300">
                Proyek Pembangunan
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight font-serif">
              Renovasi & Pembangunan
              <span className="block text-b300">Gereja St. Bonaventura</span>
            </h1>

            <p className="text-base md:text-lg text-gray-700 font-secondary mb-6 md:mb-10 max-w-3xl leading-relaxed">
              Tantangan banjir berulang telah merusak struktur gereja kami.
              Dengan dukungan umat dan donasi yang tulus, kami akan membangun
              gereja yang lebih kuat, aman, dan layak menjadi rumah ibadah bagi
              generasi mendatang.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
              <div className="border-l-4 border-b300 pl-3 md:pl-4">
                <p className="text-xs text-gray-600 font-secondary uppercase tracking-wide mb-1">
                  Target Dana
                </p>
                <p className="text-xl md:text-2xl font-bold text-gray-900 font-serif">
                  Rp 75 M
                </p>
              </div>
              <div className="border-l-4 border-gray-300 pl-3 md:pl-4">
                <p className="text-xs text-gray-600 font-secondary uppercase tracking-wide mb-1">
                  Durasi
                </p>
                <p className="text-xl md:text-2xl font-bold text-gray-900 font-serif">
                  2-3 Tahun
                </p>
              </div>
              <div className="border-l-4 border-green-600 pl-3 md:pl-4">
                <p className="text-xs text-gray-600 font-secondary uppercase tracking-wide mb-1">
                  Terkumpul
                </p>
                <p className="text-xl md:text-2xl font-bold text-green-600 font-serif">
                  Rp 12,5 M
                </p>
              </div>
              <div className="border-l-4 border-b300 pl-3 md:pl-4">
                <p className="text-xs text-gray-600 font-secondary uppercase tracking-wide mb-1">
                  Progress
                </p>
                <p className="text-xl md:text-2xl font-bold text-b300 font-serif">
                  {FUND_PERCENTAGE.toFixed(1)}%
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative frame elements (retro style) */}
        <div className="absolute top-4 right-4 w-20 h-20 border-4 border-b300/20 opacity-30"></div>
        <div className="absolute bottom-6 left-6 w-32 h-32 border-2 border-gray-300/30 opacity-20"></div>
      </div>

      {/* Quick Stats & Progress */}
      <div className="outer-wrapper py-10 md:py-16 bg-gray-50 border-b border-gray-200">
        <div className="inner-wrapper !items-start !justify-start gap-6 md:gap-12 px-4 md:px-0">
          <div className="w-full">
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-2 font-serif">
              Status Dana Pembangunan
            </h2>
            <p className="text-gray-600 font-secondary text-sm md:text-base">
              Setiap sumbangan membantu mewujudkan gereja impian kita
            </p>
          </div>

          <div className="w-full bg-white border-2 border-gray-300 p-6 md:p-8 shadow-basic">
            <div className="grid grid-cols-3 md:grid-cols-3 gap-4 md:gap-8 mb-8">
              <div>
                <p className="text-xs text-gray-500 font-secondary uppercase tracking-wide mb-2">
                  Target
                </p>
                <p className="text-lg md:text-2xl font-bold text-gray-900 font-serif">
                  Rp 75 M
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500 font-secondary uppercase tracking-wide mb-2">
                  Terkumpul
                </p>
                <p className="text-lg md:text-2xl font-bold text-green-600 font-serif">
                  Rp 12,5 M
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500 font-secondary uppercase tracking-wide mb-2">
                  Sisa Dana
                </p>
                <p className="text-lg md:text-2xl font-bold text-b300 font-serif">
                  Rp 62,5 M
                </p>
              </div>
            </div>

            {/* Progress Bar with visual indicator */}
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-secondary text-gray-700">
                  Progress Pengumpulan Dana
                </span>
                <span className="text-lg font-bold text-b300 font-serif">
                  {FUND_PERCENTAGE.toFixed(2)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 h-6 border-2 border-gray-400 overflow-hidden relative">
                <div
                  className="bg-b300 h-full transition-all duration-700 ease-out flex items-center justify-end pr-2"
                  style={{ width: `${FUND_PERCENTAGE}%` }}
                >
                  {FUND_PERCENTAGE > 5 && (
                    <span className="text-white text-xs font-bold font-serif">
                      {FUND_PERCENTAGE.toFixed(1)}%
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-4 border-t border-gray-200">
              <div className="text-center">
                <p className="text-xs text-gray-600 font-secondary mb-1">
                  Donasi Masuk
                </p>
                <p className="text-sm font-bold text-gray-900">
                  ±{Math.ceil(FUND_COLLECTED / 1000)} Pendonasi
                </p>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-600 font-secondary mb-1">
                  Periode Pengumpulan
                </p>
                <p className="text-sm font-bold text-gray-900">2024 - 2026</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-600 font-secondary mb-1">
                  Transparansi
                </p>
                <p className="text-sm font-bold text-green-600">
                  Laporan Berkala
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline Section */}
      <div className="outer-wrapper py-12 md:py-20">
        <div className="inner-wrapper !items-start !justify-start gap-8 md:gap-12 px-4 md:px-0">
          <div className="w-full">
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-3 font-serif">
              Tahapan Pembangunan
            </h2>
            <p className="text-gray-600 font-secondary">
              Proyek renovasi gereja dibagi menjadi 3 fase utama selama 2-3
              tahun
            </p>
          </div>

          <div className="w-full">
            <div className="space-y-4 md:space-y-6">
              {TIMELINE_PHASES.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white border-l-4 border-b300 p-6 md:p-8 cursor-pointer transition-all hover:shadow-basic"
                  onClick={() => setActivePhase(activePhase === idx ? -1 : idx)}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg md:text-xl font-bold text-gray-900 font-serif">
                        {item.phase}
                      </h3>
                      <p className="text-sm text-gray-600 font-secondary">
                        {item.period}
                      </p>
                    </div>
                    <div
                      className={`px-3 py-1 text-xs font-secondary font-semibold border ${
                        item.status === "in-progress"
                          ? "bg-yellow-50 border-yellow-400 text-yellow-700"
                          : "bg-gray-50 border-gray-400 text-gray-700"
                      }`}
                    >
                      {item.status === "in-progress" ? "BERJALAN" : "RENCANA"}
                    </div>
                  </div>

                  {activePhase === idx && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <p className="text-sm font-secondary text-gray-700 mb-3 font-semibold">
                        Kegiatan Utama:
                      </p>
                      <ul className="space-y-2">
                        {item.tasks.map((task, taskIdx) => (
                          <li
                            key={taskIdx}
                            className="flex gap-3 text-sm text-gray-600 font-secondary"
                          >
                            <span className="text-b300 font-bold">▪</span>
                            <span>{task}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Why Renovation - Challenges Section */}
      <div className="outer-wrapper py-12 md:py-20 bg-gray-50 border-y border-gray-200">
        <div className="inner-wrapper !items-start !justify-start gap-8 md:gap-12 px-4 md:px-0">
          <div className="w-full">
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-3 font-serif">
              Mengapa Gereja Ini Perlu Direnovasi?
            </h2>
            <p className="text-gray-600 font-secondary">
              Tantangan struktural dan keselamatan yang perlu ditangani dengan
              segera
            </p>
          </div>

          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {/* Challenge 1 */}
            <div className="bg-white border-l-4 border-red-500 p-6 md:p-8 hover:shadow-basic transition-all">
              <div className="flex items-start gap-4 mb-4">
                <span className="text-4xl font-serif text-red-500 font-bold flex-shrink-0">
                  !
                </span>
                <h3 className="text-lg md:text-xl font-bold text-gray-900">
                  Banjir Berulang
                </h3>
              </div>
              <p className="text-gray-600 font-secondary text-sm md:text-base leading-relaxed">
                Gereja kami telah mengalami banjir berkali-kali yang menyebabkan
                kerusakan serius pada struktur bangunan, termasuk lantai,
                dinding, dan peralatan gereja.
              </p>
              <div className="mt-4 pt-4 border-t border-gray-200 space-y-2">
                <div className="text-sm text-gray-600 font-secondary flex gap-2">
                  <span className="text-red-500 font-bold">▬</span>
                  <span>Kerusakan lantai dan fondasi</span>
                </div>
                <div className="text-sm text-gray-600 font-secondary flex gap-2">
                  <span className="text-red-500 font-bold">▬</span>
                  <span>Peralatan dan dekorasi rusak</span>
                </div>
              </div>
            </div>

            {/* Challenge 2 */}
            <div className="bg-white border-l-4 border-orange-500 p-6 md:p-8 hover:shadow-basic transition-all">
              <div className="flex items-start gap-4 mb-4">
                <span className="text-4xl font-serif text-orange-500 font-bold flex-shrink-0">
                  ⚙
                </span>
                <h3 className="text-lg md:text-xl font-bold text-gray-900">
                  Standar Keselamatan
                </h3>
              </div>
              <p className="text-gray-600 font-secondary text-sm md:text-base leading-relaxed">
                Bangunan gereja tidak memenuhi standar keselamatan dan
                arsitektur yang ditetapkan pemerintah serta tidak aksesibel bagi
                penyandang disabilitas.
              </p>
              <div className="mt-4 pt-4 border-t border-gray-200 space-y-2">
                <div className="text-sm text-gray-600 font-secondary flex gap-2">
                  <span className="text-orange-500 font-bold">▬</span>
                  <span>Struktur bangunan yang lemah</span>
                </div>
                <div className="text-sm text-gray-600 font-secondary flex gap-2">
                  <span className="text-orange-500 font-bold">▬</span>
                  <span>Sistem drainase tidak optimal</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Current Conditions Gallery */}
      <div className="outer-wrapper py-12 md:py-20">
        <div className="inner-wrapper !items-start !justify-start gap-8 md:gap-12 px-4 md:px-0">
          <div className="w-full">
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-3 font-serif">
              Dokumentasi Kondisi Saat Ini
            </h2>
            <p className="text-gray-600 font-secondary">
              Foto-foto menunjukkan kerusakan yang telah terjadi akibat banjir
            </p>
          </div>

          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {BEFORE_PHOTOS.map((photo) => (
              <div
                key={photo.id}
                className="overflow-hidden shadow-basic hover:shadow-lg transition-all group border-2 border-gray-300 hover:-translate-y-2"
              >
                <div className="w-full h-48 bg-gradient-to-br from-red-100 to-red-50 flex items-center justify-center overflow-hidden relative">
                  <div className="text-center">
                    <span className="text-5xl font-serif text-gray-400">
                      📷
                    </span>
                    <p className="text-xs text-gray-500 font-secondary mt-2">
                      Foto Dokumentasi
                    </p>
                  </div>
                </div>
                <div className="p-4 md:p-6 bg-white border-t-2 border-gray-300">
                  <h3 className="font-bold text-gray-900 mb-2 text-sm md:text-base font-serif">
                    {photo.title}
                  </h3>
                  <p className="text-xs md:text-sm text-gray-600 font-secondary leading-relaxed">
                    {photo.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="outer-wrapper py-12 md:py-20 bg-gray-50">
        <div className="inner-wrapper !items-start !justify-start gap-8 md:gap-12 px-4 md:px-0">
          <div className="w-full">
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-3">
              Dana Pembangunan
            </h2>
            <p className="text-gray-600 font-secondary">
              Status pengumpulan sumbangan untuk proyek renovasi
            </p>
          </div>

          <div className="w-full bg-white border-2 border-gray-300 p-6 md:p-8 shadow-basic">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-8 pb-8 border-b-2 border-gray-300">
              <div className="flex flex-col gap-2">
                <p className="text-xs md:text-sm text-gray-600 font-secondary uppercase tracking-wide font-bold">
                  Target Dana
                </p>
                <p className="text-2xl md:text-3xl font-bold text-gray-900 font-serif">
                  Rp 75 M
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-xs md:text-sm text-gray-600 font-secondary uppercase tracking-wide font-bold">
                  Dana Terkumpul
                </p>
                <p className="text-2xl md:text-3xl font-bold text-green-600 font-serif">
                  Rp 12,5 M
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-xs md:text-sm text-gray-600 font-secondary uppercase tracking-wide font-bold">
                  Sisa Dana Dibutuhkan
                </p>
                <p className="text-2xl md:text-3xl font-bold text-b300 font-serif">
                  Rp 62,5 M
                </p>
              </div>
            </div>

            {/* Progress Indicator with milestones */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-secondary text-gray-700 font-bold">
                  Target Pembangunan
                </span>
                <span className="text-lg font-bold text-b300 font-serif">
                  {FUND_PERCENTAGE.toFixed(2)}% Tercapai
                </span>
              </div>
              <div className="w-full bg-gray-300 h-8 border-2 border-gray-400 overflow-hidden relative">
                <div
                  className="bg-b300 h-full transition-all duration-700 ease-out flex items-center justify-end pr-3"
                  style={{ width: `${FUND_PERCENTAGE}%` }}
                >
                  {FUND_PERCENTAGE > 8 && (
                    <span className="text-white text-xs font-bold font-serif">
                      {FUND_PERCENTAGE.toFixed(1)}%
                    </span>
                  )}
                </div>
              </div>
              <div className="mt-2 text-xs text-gray-600 font-secondary">
                Sisa dana yang dibutuhkan:{" "}
                <span className="font-bold">Rp 62,5 Miliar</span>
              </div>
            </div>

            {/* Pledge Information */}
            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 md:p-6 rounded-none">
              <h4 className="font-bold text-gray-900 mb-3 text-sm md:text-base font-serif">
                Komitmen Kami untuk Transparansi
              </h4>
              <ul className="text-xs md:text-sm text-gray-700 font-secondary space-y-2">
                <li className="flex gap-2">
                  <span className="text-yellow-600 font-bold flex-shrink-0">
                    ✓
                  </span>
                  <span>
                    Laporan keuangan terperinci dipublikasikan setiap kuartal
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-yellow-600 font-bold flex-shrink-0">
                    ✓
                  </span>
                  <span>
                    Setiap kontribusi akan dicatat dan disertai dengan
                    sertifikat penghargaan
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-yellow-600 font-bold flex-shrink-0">
                    ✓
                  </span>
                  <span>
                    Progres pembangunan didokumentasikan dan dibagikan kepada
                    umat
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Design Vision Section */}
      <div className="outer-wrapper py-12 md:py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="inner-wrapper !items-start !justify-start gap-8 md:gap-12 px-4 md:px-0">
          <div className="w-full">
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-3 font-serif">
              Visi Desain Gereja Baru
            </h2>
            <p className="text-gray-600 font-secondary">
              Konsep arsitektur modern yang tetap mempertahankan nilai-nilai
              spiritual
            </p>
          </div>

          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {DESIGN_PHOTOS.map((photo, idx) => (
              <div
                key={photo.id}
                className="overflow-hidden shadow-basic hover:shadow-lg transition-all group border-2 border-b300/30 hover:-translate-y-2"
              >
                <div className="w-full h-48 bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center overflow-hidden relative">
                  <div className="text-center">
                    <span className="text-5xl font-serif text-blue-300">⌂</span>
                    <p className="text-xs text-gray-500 font-secondary mt-2">
                      Konsep Desain
                    </p>
                  </div>
                </div>
                <div className="p-4 md:p-6 bg-white border-t-2 border-b300/30">
                  <div className="mb-2">
                    <span className="text-xs font-bold text-b300 font-secondary bg-blue-50 px-2 py-1 border border-b300">
                      Opsi {idx + 1}
                    </span>
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2 text-sm md:text-base font-serif">
                    {photo.title}
                  </h3>
                  <p className="text-xs md:text-sm text-gray-600 font-secondary leading-relaxed">
                    {photo.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Donation Methods - Enhanced */}
      <div className="outer-wrapper py-12 md:py-20 bg-gray-50 border-t border-gray-200">
        <div className="inner-wrapper !items-start !justify-start gap-8 md:gap-12 px-4 md:px-0">
          <div className="w-full">
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-3 font-serif">
              Cara Mendukung Pembangunan
            </h2>
            <p className="text-gray-600 font-secondary">
              Ada beberapa cara untuk berkontribusi dalam proyek pembangunan
              gereja kami
            </p>
          </div>

          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {/* Bank Transfer */}
            <div className="bg-white border-3 border-b300 p-6 md:p-8 shadow-basic hover:shadow-lg transition-all">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-4xl font-serif">🏦</span>
                <h3 className="text-lg md:text-xl font-bold text-gray-900 font-serif">
                  Transfer Bank
                </h3>
              </div>
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 border-2 border-gray-300">
                  <p className="text-xs text-gray-600 font-secondary uppercase tracking-wide mb-1 font-bold">
                    Nama Bank
                  </p>
                  <p className="font-bold text-gray-900 text-base md:text-lg font-serif">
                    BCA
                  </p>
                </div>
                <div className="p-4 bg-gray-50 border-2 border-gray-300">
                  <p className="text-xs text-gray-600 font-secondary uppercase tracking-wide mb-1 font-bold">
                    Nomor Rekening
                  </p>
                  <p className="font-bold text-gray-900 text-lg md:text-xl font-mono">
                    1234567890
                  </p>
                </div>
                <div className="p-4 bg-gray-50 border-2 border-gray-300">
                  <p className="text-xs text-gray-600 font-secondary uppercase tracking-wide mb-1 font-bold">
                    Atas Nama
                  </p>
                  <p className="font-bold text-gray-900 font-serif">
                    GEREJA ST. BONAVENTURA
                  </p>
                </div>
                <div className="bg-blue-50 border-l-4 border-b300 p-3">
                  <p className="text-xs text-gray-700 font-secondary">
                    ✓ Sertakan nama pendonasi di catatan transfer
                  </p>
                </div>
              </div>
            </div>

            {/* Digital Payment */}
            <div className="bg-white border-3 border-green-600 p-6 md:p-8 shadow-basic hover:shadow-lg transition-all">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-4xl font-serif">⊞</span>
                <h3 className="text-lg md:text-xl font-bold text-gray-900 font-serif">
                  QRIS / E-Wallet
                </h3>
              </div>
              <div className="flex flex-col items-center gap-6">
                <div className="w-48 h-48 bg-gray-200 flex items-center justify-center border-4 border-dashed border-gray-400">
                  <div className="text-center">
                    <span className="text-5xl font-serif text-gray-400">⊞</span>
                    <p className="text-xs text-gray-600 font-secondary mt-3">
                      QR Code
                    </p>
                  </div>
                </div>
                <div className="w-full">
                  <p className="text-sm text-gray-600 font-secondary text-center mb-4">
                    Scan dengan aplikasi pembayaran Anda
                  </p>
                  <div className="grid grid-cols-3 gap-2 text-center text-xs font-secondary text-gray-600">
                    <div>GCash</div>
                    <div>GoPay</div>
                    <div>OVO</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact & CTA */}
          <div className="w-full bg-white border-2 border-gray-300 p-6 md:p-8 shadow-basic">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-center">
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-3 font-serif">
                  Ada Pertanyaan?
                </h3>
                <p className="text-gray-600 font-secondary text-sm md:text-base mb-4 leading-relaxed">
                  Hubungi sekretariat gereja untuk informasi lebih lanjut
                  tentang pembangunan, transparansi keuangan, dan cara
                  memberikan sumbangan.
                </p>
                <a
                  href="https://api.whatsapp.com/send?phone=6287704825850"
                  target="_blank"
                  className="inline-flex items-center gap-2 bg-b300 text-white px-6 py-3 border-2 border-b300 font-secondary font-semibold hover:bg-white hover:text-b300 transition-all"
                >
                  <span>↗</span> Hubungi via WhatsApp
                </a>
              </div>
              <div className="bg-blue-50 border-l-4 border-b300 p-4 md:p-6">
                <p className="text-xs text-gray-600 font-secondary uppercase tracking-wide mb-3 font-bold">
                  Info Penting
                </p>
                <ul className="space-y-2 text-xs md:text-sm text-gray-700 font-secondary">
                  <li className="flex gap-2">
                    <span className="text-b300 font-bold flex-shrink-0">▪</span>
                    <span>Laporan keuangan dipublikasikan berkala</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-b300 font-bold flex-shrink-0">▪</span>
                    <span>Setiap sumbangan dicatat dengan baik</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-b300 font-bold flex-shrink-0">▪</span>
                    <span>Transparansi adalah prioritas kami</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
