import Placeholder from "@/assets/img/placeholder.png";
import Footer from "@/Components/guest/Footer/Footer";
import LazyImage from "@/Components/guest/LazyImage";
import Navbar from "@/Components/guest/Navbar/Navbar";
import { Head, Link } from "@inertiajs/react";

export default function Show({ bidang }) {
  return (
    <div>
      <Head title={bidang.name} />
      <Navbar />
      <div className="outer-wrapper min-h-[500px] bg-b100">
        <div className="inner-wrapper space-y-8">
          <h1 className="text-4xl text-center">Bidang {bidang.name}</h1>
          {bidang.description && (
            <p className="text-2xl text-center">{bidang.description}</p>
          )}
        </div>
      </div>
      <div className="outer-wrapper min-h-[500px]">
        <div className="inner-wrapper !py-36 !grid !grid-cols-4 !items-start gap-11 gap-y-32">
          {bidang.children.map((child) => (
            <Link
              href={route("bidang.guest.detail", {
                bidang: bidang.slug,
                bidangDetailSlug: child.slug,
              })}
              className="h-full w-[250px] flex flex-col justify-start hover:bg-b100 hover:bg-slate-100 transition-all cursor-pointer"
            >
              <LazyImage
                src={bidang.image_name || Placeholder}
                className={`w-full !h-[250px] ${
                  bidang.image_name ? "" : "border"
                }`}
              />
              <div className="space-y-4 h-full flex-1 flex flex-col grow p-4">
                <h1 className="text-2xl">{child.name}</h1>
                <div className="flex gap-2 items-center">
                  <LazyImage
                    src="https://fisika.uad.ac.id/wp-content/uploads/blank-profile-picture-973460_1280.png"
                    className="rounded-full !size-8"
                  />
                  <p className="font-secondary text-sm">{child.head.name}</p>
                </div>
                <p className="font-secondary text-sm">{child.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
