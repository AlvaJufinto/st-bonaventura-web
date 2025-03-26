import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Wrapper from "@/Layouts/Wrapper";
import { Head } from "@inertiajs/react";

export default function Dashboard({ auth }) {
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="font-secondary font-semibold text-xl text-gray-800 leading-tight">
          Dashboard
        </h2>
      }
    >
      <Head title="Dashboard" />

      <Wrapper>
        <div className="p-6 text-gray-900 font-secondary">
          Halo, {auth.user.username}!
        </div>
      </Wrapper>
    </AuthenticatedLayout>
  );
}
