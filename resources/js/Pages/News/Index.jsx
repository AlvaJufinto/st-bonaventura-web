import Pagination from "@/Components/admin/Pagination";
import PrimaryButton from "@/Components/admin/PrimaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Wrapper from "@/Layouts/Wrapper";
import { Head, router } from "@inertiajs/react";

import Table from "./Table";

export default function Index({ auth, news, statuses }) {
  const goToPage = (page) => {
    if (page >= 1 && page <= news.last_page) {
      router.visit(route("warta-minggu.index", { page }));
    }
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="font-secondary font-semibold text-xl text-gray-800 leading-tight">
          Warta Minggu
        </h2>
      }
    >
      <Head title="Warta Minggu" />
      <Wrapper>
        <div className="flex justify-between items-center mb-4">
          <PrimaryButton
            className="mb-4 !text-base"
            onClick={() => router.visit(route("warta-minggu.create"))}
          >
            + Buat Warta Minggu Baru
          </PrimaryButton>
        </div>

        <div className="overflow-x-auto pb-32">
          <Table news={news.data} />
        </div>
        <Pagination
          currentPage={news.current_page}
          totalPages={news.last_page}
          goToPage={goToPage}
        />
      </Wrapper>
    </AuthenticatedLayout>
  );
}
