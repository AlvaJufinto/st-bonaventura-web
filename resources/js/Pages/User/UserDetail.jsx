import { useState } from "react";

import Button from "@/Components/admin/Button";
import { useForm } from "@inertiajs/react";

import ProfilePictureUpload from "./ProfilePictureUpload";

export default function UserDetail({ user, roles, statuses, organizations }) {
  const { data, setData, put, processing, errors } = useForm({
    name: user.name || "",
    username: user.username || "",
    email: user.email || "",
    role_id: user.role_id || "",
    status_id: user.status_id || "",
    organizations: user.organizations?.map((org) => org.id) || [],
  });

  console.log("🚀 ~ Edit ~ organizations:", organizations);

  const [selectedOrganizations, setSelectedOrganizations] = useState(
    user.organizations?.map((org) => org.id) || []
  );

  const [refreshKey, setRefreshKey] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    put(route("user.update", user.id), {
      ...data,
      organizations: selectedOrganizations,
    });
  };

  const handleOrganizationChange = (orgId) => {
    const org = organizations.find((o) => o.id === orgId);
    if (org?.is_occupied && !org?.is_current_user) {
      return;
    }

    const updated = selectedOrganizations.includes(orgId)
      ? selectedOrganizations.filter((id) => id !== orgId)
      : [...selectedOrganizations, orgId];

    setSelectedOrganizations(updated);
    setData("organizations", updated);
  };

  const handleProfilePictureUpdate = () => {
    setRefreshKey((prev) => prev + 1);
    window.location.reload();
  };

  return (
    <div className="space-y-6">
      {/* Profile Picture Upload Section */}
      <ProfilePictureUpload
        key={refreshKey}
        user={user}
        onUploadSuccess={handleProfilePictureUpdate}
      />

      {/* User Details Form */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-medium text-gray-900 mb-4 font-secondary">
          User Details
        </h3>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 font-secondary"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                value={data.name}
                onChange={(e) => setData("name", e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 font-secondary"
              />
              {errors.name && (
                <div className="text-red-600 text-sm mt-1 font-secondary">
                  {errors.name}
                </div>
              )}
            </div>

            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700 font-secondary"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                value={data.username}
                onChange={(e) => setData("username", e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 font-secondary"
              />
              {errors.username && (
                <div className="text-red-600 text-sm mt-1">
                  {errors.username}
                </div>
              )}
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 font-secondary"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={data.email}
                onChange={(e) => setData("email", e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 font-secondary"
              />
              {errors.email && (
                <div className="text-red-600 text-sm mt-1 font-secondary">
                  {errors.email}
                </div>
              )}
            </div>

            <div>
              <label
                htmlFor="role_id"
                className="block text-sm font-medium text-gray-700 font-secondary"
              >
                Role
              </label>
              <select
                id="role_id"
                value={data.role_id}
                onChange={(e) => setData("role_id", e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 font-secondary font-secondary"
              >
                <option value="">Select Role</option>
                {roles.map((role) => (
                  <option key={role.id} value={role.id}>
                    {role.name}
                  </option>
                ))}
              </select>
              {errors.role_id && (
                <div className="text-red-600 text-sm mt-1 font-secondary">
                  {errors.role_id}
                </div>
              )}
            </div>

            <div>
              <label
                htmlFor="status_id"
                className="block text-sm font-medium text-gray-700 font-secondary"
              >
                Status
              </label>
              <select
                id="status_id"
                value={data.status_id}
                onChange={(e) => setData("status_id", e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 font-secondary"
              >
                <option value="">Select Status</option>
                {statuses.map((status) => (
                  <option
                    key={status.id}
                    value={status.id}
                    className="font-secondary"
                  >
                    {status.name}
                  </option>
                ))}
              </select>
              {errors.status_id && (
                <div className="text-red-600 text-sm mt-1 font-secondary">
                  {errors.status_id}
                </div>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2 font-secondary">
                Organizations
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {organizations.map((org) => {
                  const isDisabled = org.is_occupied && !org.is_current_user;
                  return (
                    <label
                      key={org.id}
                      className={`flex items-center ${
                        isDisabled
                          ? "opacity-50 cursor-not-allowed"
                          : "cursor-pointer"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={selectedOrganizations.includes(org.id)}
                        onChange={() => handleOrganizationChange(org.id)}
                        disabled={isDisabled}
                        className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed font-secondary"
                      />
                      <span
                        className={`font-secondary ml-2 text-sm ${
                          isDisabled ? "text-gray-400" : "text-gray-700"
                        }`}
                      >
                        {org.name}
                        {org.is_occupied && !org.is_current_user && (
                          <span className="text-xs text-red-500 ml-1 font-secondary">
                            (Occupied)
                          </span>
                        )}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end mt-6 gap-2">
            <Button type="danger" onClick={() => window.history.back()}>
              Cancel
            </Button>
            <Button type="primary" disabled={processing}>
              {processing ? "Updating..." : "Update User"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
