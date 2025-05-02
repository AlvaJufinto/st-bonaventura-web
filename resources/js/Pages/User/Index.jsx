import Pagination from "@/Components/admin/Pagination";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Wrapper from "@/Layouts/Wrapper";
import { Head, router } from "@inertiajs/react";

import Table from "./Table";

export default function Dashboard({ auth, users }) {
  const goToPage = (page) => {
    router.visit(route("user.index", { page }));
  };

  console.log("🚀 ~ Dashboard ~ users:", users);
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="font-secondary font-semibold text-xl text-gray-800 leading-tight">
          Pengurus
        </h2>
      }
    >
      <Head title="Pengurus" />

      <Wrapper>
        <Table users={users} />
        <Pagination
          currentPage={users.current_page}
          totalPages={users.last_page}
          goToPage={goToPage}
        />
      </Wrapper>
    </AuthenticatedLayout>
  );
}
