import { useMemo } from "react";

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
          data.profile_picture
            ? `${ASSET_URL}/${data.profile_picture}`
            : PlaceHolderImg
        }
        className={`disabled !h-60 object-cover !w-48 sm:!w-52 md:!w-60 ${
          data.profile_picture ? "" : "border"
        }`}
        alt="profile-picture"
        onError={(e) => {
          e.currentTarget.src = PlaceHolderImg;
        }}
      />

      <h2 className="text-center text-sm sm:text-lg md:text-xl font-secondary font-semibold text-b300 px-2 mt-2">
        {data.role}
      </h2>

      <p className="text-center text-base sm:text-xl md:text-2xl px-2">
        {data.name}
      </p>
    </div>
  );
}

function CouncilGrid({ councils = [] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8 sm:gap-12 md:gap-16 lg:gap-20 xl:gap-24 w-full">
      {councils
        .sort((a, b) => a.order - b.order)
        .flatMap((council) =>
          (council.members || []).map((member) => (
            <CouncilCard
              key={`${council.id}-${member.id}`}
              data={{
                ...member,
                role: council.role,
              }}
            />
          )),
        )}
    </div>
  );
}

function CouncilGroup({ title, councils, className = "" }) {
  if (!councils?.length) return null;

  return (
    <section className={className}>
      {title && (
        <h2 className="small-title text-b100 font-secondary">{title}</h2>
      )}

      <CouncilGrid councils={councils} />
    </section>
  );
}

function OrgCard({ org }) {
  const ASSET_URL = import.meta.env.VITE_PUBLIC_AWS_URL || "";

  const member = org?.members?.[0];

  if (!member) return null;

  const roleLabel = titleName[org.organization_type_id] || "Ketua";

  const displayTitle = org.name
    ? `${roleLabel} ${org.name}`
    : `${roleLabel} ${org.alternate_name}`;

  return (
    <div className="flex flex-col items-center">
      <LazyImage
        src={
          member.profile_picture
            ? `${ASSET_URL}/${member.profile_picture}`
            : PlaceHolderImg
        }
        className={`disabled !h-60 object-cover !w-48 sm:!w-52 md:!w-60 ${
          member.profile_picture ? "" : "border"
        }`}
        alt="profile-picture"
        onError={(e) => {
          e.currentTarget.src = PlaceHolderImg;
        }}
      />

      <h2 className="text-center text-sm sm:text-lg md:text-xl font-secondary font-semibold text-b300 px-2 mt-2">
        {displayTitle}
      </h2>

      <p className="text-center text-base sm:text-xl md:text-2xl px-2">
        {member.name}
      </p>
    </div>
  );
}

export default function Council({ dph, plenoGroups, periods }) {
  const isBlocked = usePageBlock();

  const params = new URLSearchParams(window.location.search);

  const currentPeriodId = params.get("period") || "";

  const activePeriod = periods?.find((p) => p.is_active) || periods?.[0];
  console.log("🚀 ~ Council ~ activePeriod:", activePeriod);

  const selectedPeriod =
    periods?.find((p) => p.id == currentPeriodId) || activePeriod;
  console.log("🚀 ~ Council ~ selectedPeriod:", selectedPeriod);

  const allCouncils = dph?.members || [];

  const { executiveCouncil, fieldCoordinators } = useMemo(() => {
    return allCouncils.reduce(
      (acc, council) => {
        if (
          !council.role.startsWith("Bidang") &&
          council.role !== "Pendampingan Bagian"
        ) {
          acc.executiveCouncil.push(council);
        } else {
          acc.fieldCoordinators.push(council);
        }
        return acc;
      },
      { executiveCouncil: [], fieldCoordinators: [] },
    );
  }, [allCouncils]);

  function handlePeriodChange(e) {
    const period = e.target.value;

    if (period) {
      router.get(`/tentang/dewan-paroki?period=${period}`);
    } else {
      router.get("/tentang/dewan-paroki");
    }
  }

  const PeriodFilter = () => (
    <div className="mb-4 flex flex-wrap items-center justify-between gap-4 rounded-lg border border-b100/20 bg-b100/5 px-4 py-3">
      <p className="small-title text-b100 font-secondary">
        {selectedPeriod ? `Periode ${selectedPeriod.name}` : "Pilih Periode"}
      </p>

      <select
        value={currentPeriodId}
        onChange={handlePeriodChange}
        className="min-w-[180px] rounded-lg border border-b100/30 bg-white px-3 py-2 text-sm text-gray-700 shadow-sm transition-all duration-200 font-secondary focus:border-b100 focus:outline-none focus:ring-2 focus:ring-b100/20"
      >
        {periods?.map((period) => (
          <option key={period.id} value={period.id}>
            {period.name}
          </option>
        ))}
      </select>
    </div>
  );

  return (
    <div className={`relative ${isBlocked ? "blackout" : ""}`}>
      <Head title="Dewan Paroki" />

      {isBlocked ? (
        <div className="fixed inset-0 bg-black z-50" />
      ) : (
        <>
          <Navbar />

          <div className="disabled mt-20 lg:mt-0">
            {/* DPH */}

            <div className="outer-wrapper !py-20 sm:!py-32 md:!py-40 !justify-start min-h-svh">
              <div className="inner-wrapper !items-start !justify-start relative px-4 sm:px-6 lg:px-8">
                {/*<PeriodFilter />*/}
                <p className="small-title text-b100 font-secondary">
                  {selectedPeriod ? `Periode ${selectedPeriod.name}` : ""}
                </p>
                <h1 className="section-title mb-12">Dewan Paroki Harian</h1>

                <CouncilGroup councils={executiveCouncil} />

                <CouncilGroup
                  className="mt-24"
                  title="Koordinator Bidang"
                  councils={fieldCoordinators}
                />
              </div>
            </div>

            {/* DPP */}
            <div className="outer-wrapper !py-20 sm:!py-32 md:!py-40 !justify-start min-h-svh">
              <div className="inner-wrapper !items-start !justify-start relative px-4 sm:px-6 lg:px-8">
                <h1 className="section-title mb-12">Dewan Paroki Pleno</h1>

                <div className="flex flex-col gap-12 sm:gap-16 md:gap-20 w-full">
                  {(plenoGroups || []).map((group) => (
                    <div key={group.key}>
                      <h2 className="small-title text-b100 font-secondary mb-6">
                        {group.title}
                      </h2>

                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8 sm:gap-12 md:gap-16 lg:gap-20 xl:gap-24 w-full">
                        {(group.items || []).map((org) => (
                          <OrgCard key={org.id} org={org} />
                        ))}
                      </div>
                    </div>
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
