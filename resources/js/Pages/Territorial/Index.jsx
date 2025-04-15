import React, { useState } from "react";

import Button from "@/Components/admin/Button";
import PrimaryButton from "@/Components/admin/PrimaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Wrapper from "@/Layouts/Wrapper";
import { statusColors } from "@/utils";
import { Head, router } from "@inertiajs/react";

export default function Index({ auth, territories }) {
  const [expandedTerritories, setExpandedTerritories] = useState({}); // Track expanded rows

  const toggleExpansion = (territoryId) => {
    setExpandedTerritories((prev) => ({
      ...prev,
      [territoryId]: !prev[territoryId], // Toggle the visibility
    }));
  };

  // Add functions for actions
  const startEditing = (territory) => {
    router.visit(route("territorial.edit", territory.id));
  };

  const approveItem = (id) => {
    router.post(route("territorial.approve", id));
  };

  const revertItem = (id) => {
    router.post(route("territorial.revert", id));
  };

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
            + Buat Territorial Baru
          </PrimaryButton>
        </div>

        <div className="overflow-x-auto pb-32">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-800 text-white">
                <th className="p-3 text-left font-secondary text-sm uppercase font-semibold w-10"></th>
                <th className="p-3 text-left font-secondary text-sm uppercase font-semibold w-[100px]">
                  Nama Wilayah
                </th>
                <th className="p-3 text-left font-secondary text-sm uppercase font-semibold w-[250px]">
                  Nama Wilayah Kedua
                </th>
                <th className="p-3 text-left font-secondary text-sm uppercase font-semibold w-[250px]">
                  Alamat
                </th>
                <th className="p-3 text-left font-secondary text-sm uppercase font-semibold w-[100px]">
                  Status
                </th>
                <th className="p-3 text-left font-secondary text-sm uppercase font-semibold w-[150px]">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {territories.map((territory, index) => (
                <React.Fragment key={territory.id}>
                  {/* Territorial Row */}
                  <tr
                    className={`${
                      index % 2 === 0 ? "bg-gray-100" : "bg-white"
                    } hover:bg-gray-200 transition duration-300 ease-in-out`}
                  >
                    <td className="px-3 py-3 text-center">
                      {territory.children && territory.children.length > 0 && (
                        <button
                          className="w-6 h-6 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400"
                          onClick={() => toggleExpansion(territory.id)}
                          title="Toggle Lingkungan"
                          aria-expanded={expandedTerritories[territory.id]}
                        >
                          <span
                            className={`transform transition-transform duration-300 ease-out ${
                              expandedTerritories[territory.id]
                                ? "rotate-180"
                                : "rotate-0"
                            } text-gray-600`}
                          >
                            ▼
                          </span>
                        </button>
                      )}
                    </td>
                    <td className="p-3 text-sm font-secondary">
                      {territory.name}
                    </td>
                    <td className="p-3 text-sm font-secondary">
                      {territory?.alternate_name}
                    </td>
                    <td className="p-3 text-sm font-secondary truncate">
                      {territory.address}
                    </td>
                    <td
                      className={`p-3 ${
                        statusColors[territory.status_id]
                      } text-sm font-secondary`}
                    >
                      {territory.status.name}
                    </td>
                    <td className="p-3 text-sm flex flex-wrap gap-2">
                      <Button
                        type="default"
                        onClick={() => startEditing(territory)}
                      >
                        Edit
                      </Button>
                      {territory.status_id === 2 && (
                        <Button
                          type="success"
                          onClick={() => approveItem(territory.id)}
                        >
                          Approve
                        </Button>
                      )}
                      {territory.status_id === 3 && (
                        <Button
                          type="warning"
                          onClick={() => revertItem(territory.id)}
                        >
                          Revert
                        </Button>
                      )}
                    </td>
                  </tr>

                  {territory.children && territory.children.length > 0 && (
                    <tr className="border-b border-gray-200">
                      <td colSpan={6} className="p-0">
                        <div
                          className={`overflow-hidden transition-all duration-500 ease-in-out ${
                            expandedTerritories[territory.id]
                              ? "max-h-96 opacity-100 mb-20"
                              : "max-h-0 opacity-0"
                          }`}
                        >
                          <div className="py-2 pl-10 bg-gray-50">
                            <table className="w-full table-fixed">
                              <tbody>
                                <tr className="bg-slate-600 text-white">
                                  <th className="p-3 text-left font-secondary text-xs uppercase font-semibold w-10"></th>
                                  <th className="p-3 text-left font-secondary text-xs uppercase font-semibold w-[200px]">
                                    Nama Lingkungan
                                  </th>
                                  <th className="p-3 text-left font-secondary text-xs uppercase font-semibold w-[150px]">
                                    Nama Lingkungan Kedua
                                  </th>
                                  <th className="p-3 text-left font-secondary text-xs uppercase font-semibold w-[250px]">
                                    Alamat
                                  </th>
                                  <th className="p-3 text-left font-secondary text-xs uppercase font-semibold w-[100px]">
                                    Status
                                  </th>
                                  <th className="p-3 text-left font-secondary text-xs uppercase font-semibold w-[150px]">
                                    Actions
                                  </th>
                                </tr>
                                {territory.children.map((child, childIndex) => (
                                  <tr
                                    key={child.id}
                                    className={`${
                                      childIndex % 2 === 0
                                        ? "bg-gray-100"
                                        : "bg-white"
                                    } hover:bg-gray-200 transition-colors duration-200 border-l-2 border-blue-400`}
                                  >
                                    <td className="py-2"></td>
                                    <td className="py-1 px-3 text-sm font-secondary">
                                      {child?.name}
                                    </td>
                                    <td className="py-2 px-3 text-sm font-secondary">
                                      {child?.alternate_name}
                                    </td>
                                    <td className="py-2 px-3 text-sm font-secondary">
                                      {child?.address}
                                    </td>
                                    <td
                                      className={`py-2 px-3 ${
                                        statusColors[child.status_id]
                                      } text-sm font-secondary`}
                                    >
                                      {child.status.name}
                                    </td>
                                    <td className="space-x-2 py-2 px-3 text-sm">
                                      <Button
                                        type="default"
                                        size="sm"
                                        onClick={() => startEditing(child)}
                                      >
                                        Edit
                                      </Button>
                                      <Button
                                        type="warning"
                                        size="sm"
                                        onClick={() => startEditing(child)}
                                      >
                                        Edit
                                      </Button>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </Wrapper>
    </AuthenticatedLayout>
  );
}
