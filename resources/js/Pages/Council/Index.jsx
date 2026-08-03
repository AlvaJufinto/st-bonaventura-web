import { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Wrapper from "@/Layouts/Wrapper";
import { Head, usePage, router } from "@inertiajs/react";

import CouncilList from "./CouncilList";

export default function Index({ auth, councils, periods }) {
  const { url } = usePage();
  const params = new URLSearchParams(window.location.search);
  const currentPeriod = params.get("period") || "";

  function handlePeriodChange(e) {
    const period = e.target.value;
    if (period) {
      router.get(`/admin/dph?period=${period}`);
    } else {
      router.get("/admin/dph");
    }
  }

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex items-center gap-4">
          <h2 className="font-secondary font-semibold text-xl text-gray-800 leading-tight">
            Dewan Paroki Harian
          </h2>
          <select
            value={currentPeriod}
            onChange={handlePeriodChange}
            className="border-gray-300 rounded-md text-sm focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">Pilih Periode</option>
            {periods?.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </div>
      }
    >
      <Head title="Dewan Paroki Harian" />
      <Wrapper>
        <CouncilList items={councils} />
      </Wrapper>
    </AuthenticatedLayout>
  );
}
