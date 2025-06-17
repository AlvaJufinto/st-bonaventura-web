import PlaceHolderImg from "@/assets/img/placeholder.png";
import Footer from "@/Components/guest/Footer/Footer";
import LazyImage from "@/Components/guest/LazyImage";
import Navbar from "@/Components/guest/Navbar/Navbar";
import { titleName } from "@/utils";
import { Head } from "@inertiajs/react";

import { usePageBlock } from "./usePageBlock";

function CouncilCard({ type = "primary", data }) {
  const ASSET_URL = import.meta.env.VITE_PUBLIC_ASSET_URL;

  const title =
    type == "primary"
      ? data?.title
      : `${titleName[data.organization_type_id]} ${data.name}`;

  const profilePicture =
    type == "primary"
      ? data?.user?.profile_picture
      : data?.head?.profile_picture;

  const name = type == "primary" ? data.user.name : data?.head?.name;

  return (
    <div className="w-full flex flex-col gap-2 items-center">
      <LazyImage
        src={
          profilePicture
            ? `${ASSET_URL}/uploads/${profilePicture}`
            : PlaceHolderImg
        }
        className={`disabled !h-36 md:!h-60 object-cover !w-48 sm:!w-52 md:!w-60 ${
          profilePicture ? "" : "border"
        }`}
        alt="name"
      />
      <h1 className="text-center text-sm sm:text-lg md:text-xl font-secondary font-semibold text-b300 px-2">
        {title}
      </h1>
      <h1 className="text-center text-base sm:text-xl md:text-2xl px-2">
        {name}
      </h1>
    </div>
  );
}

export default function Council({ councils, councilsSecond }) {
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
          <div className="disabled mt-20 lg:mt-0">
            <div className="outer-wrapper !py-20 sm:!py-32 md:!py-40 !justify-start min-h-svh">
              <div className="inner-wrapper !items-start !justify-start relative px-4 sm:px-6 lg:px-8">
                <div className="absolute inset-0 bg-transparent pointer-events-none"></div>
                <div className="mb-8 md:mb-12">
                  <p className="small-title text-center lg:text-left">
                    periode 2023 - 2026
                  </p>
                  <h1 className="section-title">Dewan Paroki Harian</h1>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 sm:gap-12 md:gap-16 lg:gap-20 xl:gap-24 w-full">
                  {councils.map((council, i) => (
                    <CouncilCard key={i} data={council} />
                  ))}
                </div>
              </div>
            </div>
            <div className="outer-wrapper !py-20 sm:!py-32 md:!py-40 !justify-start min-h-svh">
              <div className="inner-wrapper !items-start !justify-start relative px-4 sm:px-6 lg:px-8">
                <div className="absolute inset-0 bg-transparent pointer-events-none"></div>
                <div className="mb-8 sm:mb-10 md:mb-12">
                  <p className="small-title text-center lg:text-left">
                    periode 2023 - 2026
                  </p>
                  <h1 className="section-title">Dewan Paroki Pleno</h1>
                </div>
                <div className="grid grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-8 sm:gap-12 md:gap-16 lg:gap-20 xl:gap-24 w-full">
                  {councilsSecond.map((council, i) => (
                    <CouncilCard type="secondary" key={i} data={council} />
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
