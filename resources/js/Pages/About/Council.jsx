import PlaceHolderImg from "@/assets/img/placeholder.png";
import Footer from "@/Components/guest/Footer/Footer";
import LazyImage from "@/Components/guest/LazyImage";
import Navbar from "@/Components/guest/Navbar/Navbar";
import { titleName } from "@/utils";
import { Head, router } from "@inertiajs/react";

import { usePageBlock } from "./usePageBlock";

function CouncilCard({ data }) {
  if (!data) return null;

  const ASSET_URL = import.meta.env.VITE_PUBLIC_AWS_URL || "";

  return (
    <div className="flex flex-col items-center">
      <LazyImage
        src={
          data?.profile_picture
            ? `${ASSET_URL}/${data.profile_picture}`
            : PlaceHolderImg
        }
        className={`disabled !h-60 object-cover !w-48 sm:!w-52 md:!w-60 ${
          data?.profile_picture ? "" : "border"
        }`}
        alt="profile-picture"
        onError={(e) => {
          e.currentTarget.src = PlaceHolderImg;
        }}
      />

      <h1 className="text-center text-sm sm:text-lg md:text-xl font-secondary font-semibold text-b300 px-2 mt-2">
        {data.title}
      </h1>

      <h1 className="text-center text-base sm:text-xl md:text-2xl px-2">
        {data.name}
      </h1>
    </div>
  );
}

export default function Council({ councils, councilsSecond, periods }) {
  const isBlocked = usePageBlock();

  const params = new URLSearchParams(window.location.search);
  const currentPeriodId = params.get("period") || "";

  const activePeriod = periods?.find((p) => p.is_active) || periods?.[0];

  const selectedPeriod =
    periods?.find((p) => p.id == currentPeriodId) || activePeriod;

  function handlePeriodChange(e) {
    const period = e.target.value;

    if (period) {
      router.get(`/tentang/dewan-paroki?period=${period}`);
    } else {
      router.get("/tentang/dewan-paroki");
    }
  }

  // Flatten council users menjadi individual card
  const councilUsers = (councils || []).flatMap((council) =>
    (council.users || []).map((user) => ({
      ...user,
      title: council.title,
    })),
  );

  const councilSecondUsers = (councilsSecond || []).flatMap((council) =>
    (council.members || []).map((user) => ({
      ...user,
      title: `${
        titleName[council.organization_type_id] || "Ketua"
      } ${council.name || ""}`,
    })),
  );

  return (
    <div className={`relative ${isBlocked ? "blackout" : ""}`}>
      <Head title="Dewan Paroki" />

      {isBlocked ? (
        <div className="fixed inset-0 bg-black z-50"></div>
      ) : (
        <>
          <Navbar />

          <div className="disabled mt-20 lg:mt-0">
            <div className="outer-wrapper !py-20 sm:!py-32 md:!py-40 !justify-start min-h-svh">
              <div className="inner-wrapper !items-start !justify-start relative px-4 sm:px-6 lg:px-8">
                <div className="absolute inset-0 bg-transparent pointer-events-none"></div>

                <div className="mb-4 flex flex-wrap items-center justify-between gap-4 rounded-lg border border-b100/20 bg-b100/5 px-4 py-3">
                  <p className="small-title text-b100 font-secondary">
                    {selectedPeriod
                      ? `Periode ${selectedPeriod.name}`
                      : "Pilih Periode"}
                  </p>

                  <select
                    value={currentPeriodId}
                    onChange={handlePeriodChange}
                    className="min-w-[180px] rounded-lg border border-b100/30 bg-white px-3 py-2 text-sm text-gray-700 shadow-sm transition-all duration-200 font-secondary focus:border-b100 focus:outline-none focus:ring-2 focus:ring-b100/20"
                  >
                    {periods?.map((p) => (
                      <option
                        key={p.id}
                        className="font-secondary"
                        value={p.id}
                      >
                        {p.name}
                      </option>
                    ))}
                  </select>
                </div>

                <h1 className="section-title">Dewan Paroki Pleno</h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 sm:gap-12 md:gap-16 lg:gap-20 xl:gap-24 w-full">
                  {councilUsers.map((user) => (
                    <CouncilCard key={user.id} data={user} />
                  ))}
                </div>
              </div>
            </div>

            <div className="outer-wrapper !py-20 sm:!py-32 md:!py-40 !justify-start min-h-svh">
              <div className="inner-wrapper !items-start !justify-start relative px-4 sm:px-6 lg:px-8">
                <div className="absolute inset-0 bg-transparent pointer-events-none"></div>

                <div className="mb-8 sm:mb-10 md:mb-12">
                  <p className="small-title text-center lg:text-left">
                    {selectedPeriod
                      ? `Periode ${selectedPeriod.name}`
                      : "Pilih Periode"}
                  </p>

                  <h1 className="section-title">Dewan Paroki Pleno</h1>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 sm:gap-12 md:gap-16 lg:gap-20 xl:gap-24 w-full">
                  {councilSecondUsers.map((user) => (
                    <CouncilCard key={user.id} data={user} />
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
