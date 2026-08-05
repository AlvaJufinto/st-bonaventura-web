import React, { useState, useMemo } from "react";

import DetailSidebar, {
  DetailSidebarProvider,
} from "@/Components/admin/DetailSidebar";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Wrapper from "@/Layouts/Wrapper";
import { Head, router } from "@inertiajs/react";

import CreateTeritorial from "./CreateTeritorial";
import ParentTable from "./ParentTable";

export default function Index({ auth, territories, periods, selectedPeriodId }) {
  const [expandedTerritories, setExpandedTerritories] = useState({});

  function handlePeriodChange(e) {
    const periodId = e.target.value;
    router.get(route("teritorial.index", { period_id: periodId }));
  }

  const selectedPeriod = useMemo(
    () => periods?.find((p) => p.id === selectedPeriodId) || periods?.[0],
    [periods, selectedPeriodId],
  );

  return (
    <DetailSidebarProvider>
      <AuthenticatedLayout
        user={auth.user}
        header={
          <h2 className="font-secondary font-semibold text-xl text-gray-800 leading-tight">
            Wilayah & Lingkungan
          </h2>
        }
      >
        <Head title="Wilayah & Lingkungan" />
        <Wrapper>
          <DetailSidebar />

          <div className="overflow-x-auto pb-32">
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

            <ParentTable
              territories={territories}
              expandedTerritories={expandedTerritories}
              setExpandedTerritories={setExpandedTerritories}
              selectedPeriodId={selectedPeriodId}
            />
            <CreateTeritorial type="wilayah" selectedPeriodId={selectedPeriodId} />
          </div>
        </Wrapper>
      </AuthenticatedLayout>
    </DetailSidebarProvider>
  );
}