import React, { useMemo } from "react";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Wrapper from "@/Layouts/Wrapper";
import { Head, router } from "@inertiajs/react";

import OrganizationTable from "./OrganizationTable";

export default function Index({ auth, bidang, periods, selectedPeriodId }) {
  function handlePeriodChange(e) {
    const periodId = e.target.value;
    router.get(route("bidang.index", { period_id: periodId }));
  }

  const selectedPeriod = useMemo(
    () => periods?.find((p) => p.id === selectedPeriodId) || periods?.[0],
    [periods, selectedPeriodId],
  );

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="font-secondary font-semibold text-xl text-gray-800 leading-tight">
          Bidang Pelayanan
        </h2>
      }
    >
      <Head title="Bidang Pelayanan" />
      <Wrapper>
        <div className="mb-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-secondary text-gray-600">Periode:</span>
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
          </div>
          <span className="text-sm font-secondary text-gray-500">
            {selectedPeriod ? `Periode Aktif` : ""}
          </span>
        </div>

        <OrganizationTable bidang={bidang} />
      </Wrapper>
    </AuthenticatedLayout>
  );
}
