import UnderConstruction from "@/assets/img/under-construction.png";
import Button from "@/Components/guest/shared/Button/Button";
import Footer from "@/Components/guest/shared/Footer/Footer";
import Navbar from "@/Components/guest/shared/Navbar/Navbar";
import { Head, router } from "@inertiajs/react";

export default function Page503() {
  return (
    <div>
      <Head title="Halaman Tidak Tersedia"></Head>
      <Navbar />
      <div className="min-h-svh outer-wrapper pt-20 pb-40">
        <div className="inner-wrapper gap-4">
          <img src={UnderConstruction} alt="under-construction" />
          <h1 className="text-4xl font-secondary tracking-wider uppercase">
            Halaman Tidak Ditemukan
          </h1>
          <p className="font-secondary text-xl text-center w-1/2">
            Halaman ini sedang dalam tahap pengembangan atau memang tidak
            tersedia. Kembali ke beranda dan kunjungi lain waktu.
          </p>
          <Button
            className="mt-10 h-20 px-10"
            onClick={() => router.visit(route("home.guest.index"))}
          >
            Kembali ke beranda
          </Button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
