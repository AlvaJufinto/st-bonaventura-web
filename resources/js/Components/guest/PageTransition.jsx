// resources/js/Components/PageTransitionWrapper.jsx
import React, { useEffect, useState } from "react";

import { router } from "@inertiajs/react";

export default function PageTransitionWrapper({ children }) {
  const [transitioning, setTransitioning] = useState(false);
  const [currentPageKey, setCurrentPageKey] = useState(Date.now()); // Gunakan kunci unik untuk setiap halaman

  useEffect(() => {
    const handleStart = () => {
      setTransitioning(true);
    };
    const handleFinish = () => {
      // Beri sedikit waktu untuk animasi keluar sebelum menghapus konten lama
      setTimeout(() => {
        setTransitioning(false);
        // Perbarui kunci setelah transisi selesai untuk me-mount konten baru
        setCurrentPageKey(Date.now()); // Atau gunakan props.initialPage.url jika tersedia/berubah
      }, 300); // Sesuaikan durasi timeout dengan durasi animasi CSS Anda
    };

    router.on("start", handleStart);
    router.on("finish", handleFinish);

    return () => {
      router.off("start", handleStart);
      router.off("finish", handleFinish);
    };
  }, []);

  // Penting: Gunakan kunci pada elemen yang membungkus children
  // Ini memberi tahu React (atau library animasi) bahwa konten berubah
  // dan perlu di-mount/unmount ulang, memicu transisi.
  // Menggunakan `Date.now()` sederhana atau url halaman Inertia adalah cara umum.
  const transitionClassName = transitioning ? "page-leaving" : "page-entering";

  return (
    <div
      className={`page-transition-container ${transitionClassName}`}
      key={currentPageKey}
    >
      {/* Konten children (halaman Inertia saat ini) akan di sini */}
      {children}
    </div>
  );
}
