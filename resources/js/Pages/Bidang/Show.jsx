import PlaceHolderImg from "@/assets/img/placeholder.png";
import Footer from "@/Components/guest/Footer/Footer";
import LazyImage from "@/Components/guest/LazyImage";
import Navbar from "@/Components/guest/Navbar/Navbar";
import { Head, Link } from "@inertiajs/react";

const ASSET_URL = import.meta.env.VITE_PUBLIC_AWS_URL || "";

function ChildCard({ child, bidangSlug }) {
  if (!child) return null;

  return (
    <Link
      href={route("bidang.guest.detail", {
        bidang: bidangSlug,
        bidangDetailSlug: child.slug,
      })}
      className="flex h-full flex-col items-center border border-gray-200 font-secondary p-5 shadow-sm transition-all hover:opacity-80 hover:shadow-md"
    >
      {/* Title */}
      <h1 className="mb-3 flex min-h-[62px] items-center justify-center text-center text-lg font-semibold text-b300 line-clamp-3 sm:text-xl font-secondary">
        {child.name}
      </h1>

      {/* Description */}
      <p className="mb-6 min-h-[72px] text-center text-sm leading-relaxed text-gray-600 line-clamp-3 font-secondary">
        {child.description || "-"}
      </p>

      {/* Head */}
      <div className="mt-auto flex flex-col items-center">
        <LazyImage
          src={
            child?.head?.profile_picture
              ? `${ASSET_URL}/${child.head.profile_picture}`
              : PlaceHolderImg
          }
          className="!h-38 aspect-4/5 object-cover"
          alt={child.head?.name || "head"}
          onError={(e) => {
            e.currentTarget.src = PlaceHolderImg;
          }}
        />
      </div>
      <p className="mt-3 h-12 text-center text-base font-semibold line-clamp-2 font-secondary">
        {child.head?.name || "-"}
      </p>
    </Link>
  );
}

export default function Show({ bidang }) {
  return (
    <div>
      <Head title={bidang.name} />

      <Navbar />

      {/* Header */}
      <section className="outer-wrapper !pt-32 !pb-20 bg-b100">
        <div className="inner-wrapper px-4 md:px-0">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="font-secondary text-3xl font-semibold md:text-5xl">
              {bidang.name}
            </h1>

            {bidang.description && (
              <p className="mt-5 text-base leading-relaxed md:text-xl">
                {bidang.description}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="outer-wrapper">
        <div className="inner-wrapper !py-16 md:!py-24">
          {/* Section Header */}
          <div className="mb-10">
            <h2 className="font-secondary text-xl font-semibold md:text-2xl text-center">
              Struktur Bidang
            </h2>

            <p className="mt-2 text-sm text-gray-600 md:text-base text-center font-secondary ">
              Daftar bidang yang berada dalam {bidang.name}
            </p>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:gap-8 items-stretch">
            {bidang.children.map((child) => (
              <ChildCard
                key={child.id}
                child={child}
                bidangSlug={bidang.slug}
              />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
