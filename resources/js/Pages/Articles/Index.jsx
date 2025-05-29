import Pagination from "@/Components/admin/Pagination";
import PrimaryButton from "@/Components/admin/PrimaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Wrapper from "@/Layouts/Wrapper";
import { Head, router } from "@inertiajs/react";

import Table from "./Table";

export default function Index({ auth, articles, statuses }) {
  const goToPage = (page) => {
    if (page >= 1 && page <= news.last_page) {
      router.visit(route("article.index", { page }));
    }
  };

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
          <Table articles={articles.data} statuses={statuses} />
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
