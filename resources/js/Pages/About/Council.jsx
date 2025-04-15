import Footer from "@/Components/guest/shared/Footer/Footer";
import Navbar from "@/Components/guest/shared/Navbar/Navbar";
import { Head } from "@inertiajs/react";

import { usePageBlock } from "./usePageBlock";

const COUNCIL_DATA = [
  { title: "Ketua Umum DP / PGDP", name: "Romo Stephanus Royke Djakarya Pr" },
  { title: "Ketua I DP / PGDP", name: "Antonius Arfin Samosir, Pr." },
  { title: "Wakil Ketua I DP / PGDP", name: "Hubertus Hartono Sondakh" },
  { title: "Wakil Ketua II DP / PGDP", name: "Thomas Lim Kian Heng" },
  { title: "Sekretaris I DP / PGDP", name: "Ivon Sri Darmayanti" },
  {
    title: "Sekretaris II DP / PGDP",
    name: "Andreas Henry Mixson Lumban Batu",
  },
  { title: "Sekretaris III DP / PGDP", name: "Maria Odilia Damayanti" },
  { title: "Bendahara I DP / PGDP", name: "Caecilia Supojo Niniek Dhamayanti" },
  { title: "Bendahara II DP / PGDP", name: "Marcelina Felicia Linda Wiryadi" },
  { title: "Bendahara III DP / PGDP", name: "Carolus Boromeus Dedi" },
  { title: "Bidang Peribadatan", name: "Stephanus Pudji Ludianto" },
  { title: "Bidang Pewartaan", name: "Fransiskus Xaverius Yanuar Ekaputra" },
  { title: "Bidang Pewartaan", name: "Maria Mili Fonge" },
  {
    title: "Bidang Persekutuan & Pendampingan Teritorial dan Kategorial",
    name: "Martinus Robert Polana",
  },
  {
    title: "Bidang Persekutuan & Pendampingan Teritorial dan Kategorial",
    name: "Ferry Olin Binsar",
  },
  { title: "Bidang Pelayanan & Team Khusus", name: "Theresia Ferrania" },
  { title: "Bidang Pelayanan & Team Khusus", name: "Agnes Amelia Yowanda" },
  { title: "Bidang Kesaksian", name: "Fransiskus Xaverius Adviadi Nugroho" },
  {
    title: "Bidang Pelatihan dan Pengembangan Paroki",
    name: "Marianus Ari Winarto",
  },
  {
    title: "Bidang Perencanaan & Evaluasi",
    name: "Yohanes Bambang Kristianto",
  },
  { title: "Bidang Perencanaan & Evaluasi", name: "Bernadus Wibisanto" },
  { title: "Pendampingan Bagian", name: "Fredericus Sugiarso Budihardjo" },
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
      <Head title="Dewan Paroki">
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
          <div className="disabled">
            <div className="outer-wrapper !py-40 !justify-start min-h-svh">
              <div className="inner-wrapper !items-start !justify-start relative">
                <div className="absolute inset-0 bg-transparent pointer-events-none"></div>
                <div className="mb-5">
                  <p className="small-title">periode 2023 - 2026</p>
                  <h1 className="section-title">Dewan Paroki Harian</h1>
                </div>
                <div className="grid grid-cols-4 gap-24">
                  {COUNCIL_DATA.map((council, i) => (
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
                  {COUNCIL_DATA.map((council, i) => (
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
