import Poster from "@/assets/img/temp/poster-p2a.jpg";
import Button from "@/Components/guest/Button/Button";

export default function InstagramReel() {
  return (
    <section id="p2a-short-movie" className="outer-wrapper mb-16 lg:mb-32">
      <div className="inner-wrapper !items-start">
        <h1 className="section-title mb-6 lg:mb-10 text-2xl lg:text-4xl self-center text-center">
          P2A JP2CUP Short Movie:
          <br />
          "Langkah Kecil Michael"
        </h1>

        <div
          className="
            w-full
            bg-b100
            p-6
            lg:p-10
            flex
            flex-col
            lg:flex-row
            gap-8
            lg:gap-12
            items-center
          "
        >
          <div className="w-full lg:w-[380px] shrink-0">
            <img
              src={Poster}
              alt="Langkah Kecil Michael"
              className="w-full shadow-basic object-cover"
            />
          </div>

          <div className="flex flex-col gap-5">
            <h2 className="text-xl lg:text-3xl text-b200 leading-tight">
              Sebuah Cerita Kecil tentang Kepedulian terhadap Bumi.
            </h2>

            <p className="font-secondary text-sm lg:text-base leading-relaxed">
              Pernah bertemu dengan orang yang masih kurang peduli terhadap
              lingkungan? Mulai dari boros listrik, membuang sampah sembarangan,
              hingga mengabaikan kebiasaan kecil yang berdampak bagi bumi.
              <br />
              <br />
              Melalui film pendek ini, kita diajak melihat perjalanan Michael
              yang perlahan belajar memahami arti pertobatan ekologis. Dari
              tindakan sederhana seperti menghemat energi, menjaga kebersihan,
              dan merawat lingkungan sekitar, perubahan kecil dapat membawa
              dampak yang besar.
            </p>

            <p className="font-secondary text-sm lg:text-base italic text-gray-600">
              Yuk saksikan kisah Michael dan temukan pesan di balik langkah
              kecilnya.
            </p>

            <Button
              type="primary"
              className="w-fit px-8"
              onClick={() =>
                window.open(
                  "https://www.instagram.com/p/DZkS_GdPIcY/",
                  "_blank",
                )
              }
            >
              Tonton di Instagram
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
