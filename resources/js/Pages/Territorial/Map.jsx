import MapImg from "@/assets/img/territorial/map.png";
import Footer from "@/Components/guest/Footer/Footer";
import LazyImage from "@/Components/guest/LazyImage";
import Navbar from "@/Components/guest/Navbar/Navbar";
import SectorCard from "@/Pages/Territorial/SectorCard";
import { Head, router } from "@inertiajs/react";

export default function Map({ wilayah, periods, selectedPeriodId }) {
  function handlePeriodChange(e) {
    const periodId = e.target.value;
    router.get(route("map.guest.index", { period_id: periodId }));
  }

  const selectedPeriod = periods?.find((p) => p.id === selectedPeriodId) || periods?.[0];

  return (
    <div>
      <Head title="Warta Minggu" />
      <Navbar />
      <div className="outer-wrapper !py-20 md:!py-40 !justify-start min-h-svh">
        <div className="inner-wrapper !items-start !justify-start relative">
          <div className="mb-5">
            <p className="small-title">teritorial</p>
            <h1 className="section-title">Peta Wilayah</h1>
          </div>

          <div className="mb-4 flex items-center gap-3">
            <span className="text-sm font-secondary text-gray-600">Periode:</span>
            <select
              value={selectedPeriodId || ""}
              onChange={handlePeriodChange}
              className="rounded-lg border border-gray-300 px-3 py-2 text-sm font-secondary focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-300"
            >
              {periods?.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
            {selectedPeriod && (
              <span className="text-sm font-secondary text-gray-500">
                {selectedPeriod.is_active ? "(Aktif)" : ""}
              </span>
            )}
          </div>

          <LazyImage src={MapImg} />
        </div>
        <div className="inner-wrapper !grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-10 gap-y-12 md:gap-y-24 my-16 md:my-32 !items-stretch">
          {wilayah.map((item, index) => (
            <SectorCard key={index} item={item} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}