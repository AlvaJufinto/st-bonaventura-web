import React, { useState } from "react";

import PrimaryButton from "@/Components/admin/PrimaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Wrapper from "@/Layouts/Wrapper";
import { Head, router } from "@inertiajs/react";

import CreateTeritorial from "./CreateTeritorial";
import ParentTable from "./ParentTable";

export default function Index({ auth, territories }) {
  const [expandedTerritories, setExpandedTerritories] = useState({}); // Track expanded rows

  return (
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
        <div className="flex justify-between items-center mb-4">
          <PrimaryButton
            className="mb-4 !text-base font-secondary"
            onClick={() => router.visit(route("territorial.create"))}
          >
            + Buat Wilayah Baru
          </PrimaryButton>
        </div>

        <div className="overflow-x-auto pb-32">
          <ParentTable
            territories={territories}
            expandedTerritories={expandedTerritories}
            setExpandedTerritories={setExpandedTerritories}
          />
          <CreateTeritorial type="wilayah" />
        </div>
      </Wrapper>
    </AuthenticatedLayout>
  );
}
