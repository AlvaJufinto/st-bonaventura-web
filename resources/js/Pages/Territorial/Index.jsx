import React, { useState } from "react";

import DetailSidebar, {
  DetailSidebarProvider,
} from "@/Components/admin/DetailSidebar";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Wrapper from "@/Layouts/Wrapper";
import { Head } from "@inertiajs/react";

import CreateTeritorial from "./CreateTeritorial";
import ParentTable from "./ParentTable";

export default function Index({ auth, territories }) {
  const [expandedTerritories, setExpandedTerritories] = useState({}); // Track expanded rows

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
            <ParentTable
              territories={territories}
              expandedTerritories={expandedTerritories}
              setExpandedTerritories={setExpandedTerritories}
            />
            <CreateTeritorial type="wilayah" />
          </div>
        </Wrapper>
      </AuthenticatedLayout>
    </DetailSidebarProvider>
  );
}
