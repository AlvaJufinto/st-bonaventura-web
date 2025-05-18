import { Link } from "@inertiajs/react";

import Button from "../Button/Button";

export default function ArticleCard({ type = "primary" }) {
  if (type === "primary") {
    return (
      <div className="flex bg-b100">
        <img
          src="https://res.cloudinary.com/di0dpswey/image/upload/v1742568986/st-bonaventura/khdo1jf6ygrmtbouldsu.png"
          className="w-[720px] object-cover object-center"
          alt=""
        />
        <div className="p-8 flex flex-col gap-4">
          <p className="text-b200 font-secondary font-semibold text-sm">
            20 Okt 2024
          </p>
          <h1 className="text-b300 text-3xl">
            RAKA Paroki Pulomas: Sinergi Seksi dan Subseksi untuk Anggaran 2025
            RAKA (Rapat Karya)
          </h1>
          <p className="font-secondary font-bold">BERITA - PAROKI</p>
          <div className="flex flex-col gap-4 h-full justify-end">
            <p className="font-secondary">
              Hai Bonavers! Minggu, 20 Oktober 2024 kemarin, Paroki Pulomas
              mengadakan RAKA yang dihadiri Hai Bonavers! Minggu, 20 Oktober
              2024 kemarin, Paroki Pulomas mengadakan RAKA yang dihadiri...
            </p>
            <Link className="w-full" href="/">
              <Button className="w-full">Baca</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
  if (type === "secondary") {
    return (
      <div className="flex flex-col bg-b100">
        <img
          src="https://res.cloudinary.com/di0dpswey/image/upload/v1742568986/st-bonaventura/khdo1jf6ygrmtbouldsu.png"
          className="w-full"
          alt=""
        />
        <div className="p-5 flex flex-col gap-5">
          <p className="text-b200 font-secondary font-semibold text-sm">
            20 Okt 2024
          </p>
          <h1 className="text-b300 text-3xl">
            RAKA Paroki Pulomas: Sinergi Seksi dan Subseksi untuk Anggaran 2025
            RAKA (Rapat Karya)
          </h1>
          <p className="font-secondary font-bold">BERITA - PAROKI</p>
          <div className="flex flex-col gap-4 h-full justify-end">
            <p className="font-secondary">
              Hai Bonavers! Minggu, 20 Oktober 2024 kemarin, Paroki Pulomas
              mengadakan RAKA yang dihadiri Hai Bonavers! Minggu, 20 Oktober
              2024 kemarin, Paroki Pulomas mengadakan RAKA yang dihadiri...
            </p>
            <Link className="w-full" href="/">
              <Button className="w-full">Baca</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
