import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Wrapper from "@/Layouts/Wrapper";
import { Head } from "@inertiajs/react";

import CouncilList from "./CouncilList";

export default function Index({ auth, councils }) {
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="font-secondary font-semibold text-xl text-gray-800 leading-tight">
          Dewan Paroki Harian
        </h2>
      }
    >
      <Head title="Dewan Paroki Harian" />
      <Wrapper>
        <CouncilList items={councils} />
      </Wrapper>
    </AuthenticatedLayout>
  );
}
