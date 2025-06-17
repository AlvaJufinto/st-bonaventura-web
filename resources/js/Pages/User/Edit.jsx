import Button from "@/Components/admin/Button";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

import UserDetail from "./UserDetail";

export default function Edit({ auth, user, roles, statuses, organizations }) {
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="font-semibold font-secondary text-xl text-gray-800 leading-tight">
          Edit User : {user.name}
        </h2>
      }
    >
      <Head title="Edit User" />

      <div className="py-12 max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
          <div className="p-6 bg-white border-b border-gray-200">
            <Button
              type="primary"
              className="mb-10"
              onClick={() => window.history.back()}
            >
              Kembali
            </Button>
            <UserDetail
              user={user}
              roles={roles}
              statuses={statuses}
              organizations={organizations}
            />
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
