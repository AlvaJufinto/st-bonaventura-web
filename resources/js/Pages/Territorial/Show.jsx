import PlaceholderImg from "@/assets/img/placeholder.png";
import ArticleCard from "@/Components/guest/ArticleCard/ArticleCard";
import Button from "@/Components/guest/Button/Button";
import Footer from "@/Components/guest/Footer/Footer";
import LazyImage from "@/Components/guest/LazyImage";
import Navbar from "@/Components/guest/Navbar/Navbar";
import { titleName } from "@/utils";
import { Head, Link, router } from "@inertiajs/react";

export default function Show({ data, articles, periods, selectedPeriodId }) {
  const type = data?.name;
  const title = `${titleName[data?.organization_type_id]} ${type}`;
  const ASSET_URL = import.meta.env.VITE_PUBLIC_AWS_URL;

  function handlePeriodChange(e) {
    const periodId = e.target.value;
    const routeName =
      data.organization_type_id === 1
        ? "wilayah.guest.show"
        : "lingkungan.guest.show";
    router.get(
      route(routeName, { territorial: data.slug, period_id: periodId }),
    );
  }

  const selectedPeriod =
    periods?.find((p) => p.id === selectedPeriodId) || periods?.[0];

  return (
    <div>
      <Head title={data.name} />
      <Navbar />
      <div className="outer-wrapper !py-20 md:!py-40 !pb-10 md:!pb-20 !justify-start min-h-[300px] img-background">
        <div className="inner-wrapper !flex-col md:!flex-row !justify-between relative">
          <div className="w-full md:w-auto">
            <div className="space-y-4 mb-8 md:mb-16">
              <p className="font-secondary font-semibold text-lg md:text-xl">
                {data.address}
              </p>
              <h1 className="text-3xl md:text-5xl">{data.name}</h1>
              <p className="text-b200 font-secondary font-semibold text-base md:text-lg">
                {data.alternate_name}
              </p>
              {(data.organization_type_id != 1 ||
                data.organization_type_id != 2) && (
                <p className="font-secondary text-base md:text-lg w-full md:w-3/5">
                  {data.description}
                </p>
              )}
            </div>
            {data.children.length > 0 && (
              <ul className="list-decimal space-y-2 pl-6 mb-5 font-secondary">
                {data.children.map((child, index) => (
                  <li
                    key={index}
                    className="font-secondary font-medium text-sm md:text-base"
                  >
                    {child.name} — {child.address}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/*<div className="mb-4 flex items-center gap-3">
            <span className="text-sm font-secondary text-gray-500">Periode:</span>
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
          </div>*/}
        </div>
      </div>

      {data.members && data.members.length > 0 && (
        <div className="outer-wrapper !py-10 md:!py-20 !justify-start min-h-[300px]">
          <div className="inner-wrapper !items-start gap-6 md:gap-10 relative">
            <h1 className="tracking-wider text-2xl md:text-4xl capitalize">
              {title}
            </h1>
            <div className="flex flex-wrap gap-6">
              {data.members.map((member, idx) => (
                <div key={idx} className="w-32 md:w-40 space-y-4">
                  <LazyImage
                    src={
                      member.profile_picture
                        ? `${ASSET_URL}/${member.profile_picture}`
                        : PlaceholderImg
                    }
                    alt={member.name + " img"}
                    onError={(e) => {
                      e.currentTarget.src = PlaceholderImg;
                    }}
                    className="!w-full object-cover object-center border"
                  />
                  <h1 className="text-xl md:text-2xl text-center">
                    {member.name}
                  </h1>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {(data.organization_type_id == 1 || data.organization_type_id == 2) &&
        data.description && (
          <div className="outer-wrapper !py-10 md:!py-20 !justify-start min-h-[300px]">
            <div className="inner-wrapper !items-start gap-6 md:gap-10 relative">
              <h1 className="tracking-wider text-2xl md:text-4xl capitalize">
                Profil {type}
              </h1>
              <p className="font-secondary text-base md:text-lg w-full md:w-3/4">
                {data.description}
              </p>
            </div>
          </div>
        )}

      {data.children.length > 0 && (
        <div className="outer-wrapper !py-10 md:!py-20 !justify-start min-h-[300px]">
          <div className="inner-wrapper !items-start gap-4 relative">
            <h1 className="tracking-wider text-2xl md:text-4xl">Lingkungan</h1>
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-10 mt-6 md:mt-10">
              {data.children.map((child) => (
                <div
                  key={child.id}
                  className="flex flex-col shadow-basic p-3 pt-6 items-center text-center h-full"
                >
                  <h1 className="font-secondary font-semibold text-lg md:text-xl">
                    {data.name}
                  </h1>
                  <p className="text-b300 text-2xl md:text-3xl my-2">
                    {child.name}
                  </p>
                  <p className="mb-6 md:mb-10 text-sm md:text-base">
                    {child.address}
                  </p>
                  <Link
                    href={
                      route("lingkungan.guest.show", {
                        territorial: child.slug,
                      }) +
                      (selectedPeriodId ? `?period_id=${selectedPeriodId}` : "")
                    }
                    className="w-full mt-auto"
                  >
                    <Button className="w-full !h-12 md:!h-16">Detail</Button>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {articles.data.length > 0 && (
        <div className="py-12 md:py-24 outer-wrapper !justify-start min-h-svh">
          <div className="inner-wrapper gap-5 min-h-[600px]">
            <h1 className="tracking-wider text-2xl md:text-4xl w-full text-left mb-6 md:mb-10 capitalize">
              Kegiatan {type}
            </h1>
            <>
              <ArticleCard data={articles.data[0]} />
              <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {articles.data.slice(1).map((article, index) => (
                  <ArticleCard key={index} type="secondary" data={article} />
                ))}
              </div>
            </>
          </div>
          <div className="flex justify-center my-16 md:my-32 space-x-2">
            {articles.links.map((link, index) => (
              <Link
                key={index}
                href={`${link.url}#data` || "#"}
                className={`px-3 md:px-4 text-base md:text-xl font-secondary py-2 text-b300 rounded ${
                  link.active ? "underline" : ""
                } ${!link.url ? "pointer-events-none" : ""}`}
                dangerouslySetInnerHTML={{ __html: link.url ? link.label : "" }}
              />
            ))}
          </div>
        </div>
      )}
      <div className="py-20 md:py-40"></div>
      <Footer />
    </div>
  );
}
