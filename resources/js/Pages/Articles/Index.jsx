import Button from "@/Components/admin/Button";
import Pagination from "@/Components/admin/Pagination";
import PrimaryButton from "@/Components/admin/PrimaryButton";
import Table from "@/Components/admin/Table";
import ImagePreviewer from "@/Components/guest/ImagePreviewer";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Wrapper from "@/Layouts/Wrapper";
import { dateFormatter, statusColors } from "@/utils";
import { Head, router } from "@inertiajs/react";

export default function Index({ auth, articles, statuses }) {
  console.log("🚀 ~ Index ~ articles:", articles);
  const goToPage = (page) => {
    if (page >= 1 && page <= articles.last_page) {
      router.visit(route("article.index", { page }));
    }
  };

  const ASSET_URL = import.meta.env.VITE_PUBLIC_ASSET_URL;

  const columns = [
    {
      label: "Title",
      accessor: "title",
      render: (item) => <span className="font-secondary">{item.title}</span>,
    },
    {
      label: "Preview",
      render: (item) => (
        <span className="font-secondary text-sm line-clamp-2">
          {item.preview || "Tidak ada preview"}
        </span>
      ),
    },
    {
      label: "Image",
      render: (item) =>
        item.main_image_name ? (
          <div className="w-24 h-18 overflow-hidden rounded-md">
            <ImagePreviewer
              src={`${ASSET_URL}/uploads/${item.main_image_name}`}
              alt="Contoh Preview"
              className="w-full h-full"
            />
          </div>
        ) : (
          <span className="font-secondary text-sm text-gray-500">
            Tidak ada gambar
          </span>
        ),
    },
    {
      label: "Tanggal",
      render: (item) => dateFormatter(item.created_at),
    },
    {
      label: "Publisher",
      render: (item) => item.publisher?.name || "Tidak ada",
    },
    {
      label: "User",
      render: (item) => item.user?.name || "Tidak ada",
    },
    {
      label: "Tipe Artikel",
      render: (item) => item.article_type?.name || "Tidak ada",
    },
    ,
    {
      label: "Catatan",
      render: (item) => item?.note || "-",
    },
    {
      label: "Expired Date",
      render: (item) =>
        item.expired_date ? dateFormatter(item.expired_date) : "-",
    },
    {
      label: "Status",
      tdClassName: (item) => statusColors[item.status_id],
      render: (item) => (
        <span className="font-secondary text-sm uppercase tracking-wider font-semibold">
          {item.status?.name || "Tidak ada"}
        </span>
      ),
    },
    {
      label: "Actions",
      render: (item) => (
        <div className="flex flex-wrap gap-2">
          <Button
            type="default"
            onClick={() =>
              router.visit(route("article.edit", { article: item.id }))
            }
          >
            Edit
          </Button>
          <Button
            type="info"
            onClick={() =>
              window.open(
                route("article.guest.show", { slug: item.slug }),
                "_blank"
              )
            }
          >
            Preview
          </Button>
        </div>
      ),
    },
  ];

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="font-semibold text-xl text-gray-800 leading-tight font-secondary">
          Berita dan Kegiatan
        </h2>
      }
    >
      <Head title="Berita dan Kegiatan" />
      <Wrapper>
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-secondary">Berita dan Kegiatan</h1>
          <PrimaryButton onClick={() => router.visit(route("article.create"))}>
            Add Berita & Kegiatan
          </PrimaryButton>
        </div>
        <div className="pt-8 pb-32">
          <Table data={articles.data} columns={columns} />
        </div>
        <Pagination
          currentPage={articles.current_page}
          totalPages={articles.last_page}
          goToPage={goToPage}
        />
      </Wrapper>
    </AuthenticatedLayout>
  );
}
