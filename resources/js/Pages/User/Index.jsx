import { useState } from "react";

import Button from "@/Components/admin/Button";
import Pagination from "@/Components/admin/Pagination";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Wrapper from "@/Layouts/Wrapper";
import { Head, router } from "@inertiajs/react";

import Table from "./Table";

export default function Dashboard({ auth, users }) {
  const [searchTerm, setSearchTerm] = useState("");

  const goToPage = (page) => {
    router.visit(route("user.index", { page }));
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    router.visit(route("user.index", { search: searchTerm }), {
      preserveState: true,
      preserveScroll: true,
    });
  };

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
        <form onSubmit={handleSearchSubmit} className="mb-4 flex space-x-2">
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="font-secondary px-4 py-2 border rounded-md w-full sm:w-1/3"
          />
          <Button type="primary">Cari</Button>
        </form>

        <Table users={users.data} searchTerm={searchTerm} />
        <Pagination
          currentPage={users.current_page}
          totalPages={users.last_page}
          goToPage={goToPage}
        />
      </Wrapper>
    </AuthenticatedLayout>
  );
}
