import PlaceHolderImg from "@/assets/img/placeholder.png";
import Footer from "@/Components/guest/Footer/Footer";
import LazyImage from "@/Components/guest/LazyImage";
import Navbar from "@/Components/guest/Navbar/Navbar";
import { titleName } from "@/utils";
import { Head } from "@inertiajs/react";

import { usePageBlock } from "./usePageBlock";

function CouncilCard({ type = "primary", data }) {
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
    <div className="w-100 flex flex-col gap-2 items-center">
      <LazyImage
        src={profilePicture || PlaceHolderImg}
        className={`disabled !h-60 object-cover !w-60 ${
          profilePicture ? "" : "border"
        }`}
        alt="name"
      />
      <h1 className="text-center text-xl font-secondary font-semibold text-b300">
        {title}
      </h1>
      <h1 className="text-center text-2xl">{name}</h1>
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
          <div className="disabled">
            <div className="outer-wrapper !py-40 !justify-start min-h-svh">
              <div className="inner-wrapper !items-start !justify-start relative">
                <div className="absolute inset-0 bg-transparent pointer-events-none"></div>
                <div className="mb-5">
                  <p className="small-title">periode 2023 - 2026</p>
                  <h1 className="section-title">Dewan Paroki Harian</h1>
                </div>
                <div className="grid grid-cols-4 gap-24">
                  {councils.map((council, i) => (
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
                <div className="grid grid-cols-4 gap-24">
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
