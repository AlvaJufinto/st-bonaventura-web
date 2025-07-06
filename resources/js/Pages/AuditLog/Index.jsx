import Pagination from "@/Components/admin/Pagination";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Wrapper from "@/Layouts/Wrapper";
import { Head, router } from "@inertiajs/react";

import Table from "./Table";

export default function Index({ auth, logs }) {
  const goToPage = (page) => {
    if (page >= 1 && page <= logs.last_page) {
      router.visit(route("audit.index", { page }));
    }
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="font-semibold text-xl text-gray-800 leading-tight font-secondary">
          Audit Log
        </h2>
      }
    >
      <Head title="Audit Log" />
      <Wrapper>
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-secondary">Audit Log</h1>
        </div>
        <div className="pt-8 pb-32">
          <Table logs={logs.data} />
        </div>
        <Pagination
          currentPage={logs.current_page}
          totalPages={logs.last_page}
          goToPage={goToPage}
        />
      </Wrapper>
    </AuthenticatedLayout>
  );
}
