import Footer from "@/Components/guest/shared/Footer/Footer";
import Navbar from "@/Components/guest/shared/Navbar/Navbar";
import { Head } from "@inertiajs/react";

import { usePageBlock } from "./usePageBlock";

const CouncilData = [
  ...Array.from({ length: 22 }, (_, i) => ({
    title: "KETUA I Ketua I DP / PGDP",
    name: "Romo Stephanus Royke Djakarya Pr,",
  })),
];

function CouncilCard({ data }) {
  return (
    <div className="w-100 flex flex-col gap-2 items-center">
      <img
        src="https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg"
        className="disabled h-40 object-cover w-auto"
        alt=""
      />
      <h1 className="text-center text-xl font-secondary font-semibold text-b300">
        {data.title}
      </h1>
      <h1 className="text-center text-2xl">{data.name}</h1>
    </div>
  );
}

export default function Council() {
  const isBlocked = usePageBlock();

  return (
    <div className={`relative ${isBlocked ? "blackout" : ""}`}>
      <Head title="Santo Bonaventura">
        {/* Prevent screen recording on mobile */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, user-scalable=no"
        />
        <meta name="mobile-web-app-capable" content="yes" />
      </Head>
      {isBlocked ? (
        <div className="fixed inset-0 bg-black z-50"></div>
      ) : (
        <>
          <Navbar />
          <div className="disabled ">
            <div className="outer-wrapper !py-40 !justify-start img-background min-h-svh">
              <div className="inner-wrapper !items-start !justify-start relative">
                <div className="absolute inset-0 bg-transparent pointer-events-none"></div>
                <div className="mb-5">
                  <p className="small-title">periode 2023 - 2026</p>
                  <h1 className="section-title">Dewan Paroki Harian</h1>
                </div>
                <div className="grid grid-cols-4 gap-24">
                  {CouncilData.map((council, i) => (
                    <CouncilCard key={i} data={council} />
                  ))}
                </div>
              </div>
            </div>
            <div className="outer-wrapper !py-40 !justify-start  min-h-svh">
              <div className="inner-wrapper !items-start !justify-start relative">
                <div className="absolute inset-0 bg-transparent pointer-events-none"></div>
                <div className="mb-5">
                  <p className="small-title">periode 2023 - 2026</p>
                  <h1 className="section-title">Dewan Paroki Pleno</h1>
                </div>
                <div className="grid grid-cols-4 gap-10">
                  {CouncilData.map((council, i) => (
                    <CouncilCard key={i} data={council} />
                  ))}
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </>
      )}
    </div>
  );
}
