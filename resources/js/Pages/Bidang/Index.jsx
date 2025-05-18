import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Wrapper from "@/Layouts/Wrapper";
import { Head } from "@inertiajs/react";

import OrganizationTable from "./OrganizationTable";

export default function Index({ auth, bidang }) {
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
        <OrganizationTable bidang={bidang} />
      </Wrapper>
    </AuthenticatedLayout>
  );
}
