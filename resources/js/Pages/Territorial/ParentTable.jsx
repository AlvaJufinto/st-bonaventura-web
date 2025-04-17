import React from "react";

import Button from "@/Components/admin/Button";
import { statusColors } from "@/utils";

import ChildrenTable from "./ChildrenTable";

export default function ParentTable({
  territories,
  expandedTerritories,
  setExpandedTerritories,
}) {
  const toggleExpansion = (territoryId) => {
    setExpandedTerritories((prev) => ({
      ...prev,
      [territoryId]: !prev[territoryId],
    }));
  };

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
            <tr
              className={`${
                index % 2 === 0 ? "bg-gray-100" : "bg-white"
              } hover:bg-gray-200 transition duration-300 ease-in-out`}
            >
              <td className="px-3 py-3 text-center">
                {true && (
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
              <td className="p-3 text-sm font-secondary">{territory.name}</td>
              <td className="p-3 text-sm font-secondary">
                {territory?.alternate_name}
              </td>
              <td className="p-3 text-sm font-secondary truncate">
                {territory.address}
              </td>
              <td
                className={`p-3 ${
                  statusColors[territory.status_id]
                } text-sm font-secondary uppercase  font-bold tracking-wider`}
              >
                {territory.status.name}
              </td>
              <td className="p-3 text-sm flex flex-wrap gap-2">
                <Button type="default" onClick={() => startEditing(territory)}>
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

            <ChildrenTable
              territory={territory}
              expandedTerritories={expandedTerritories}
            />
          </React.Fragment>
        ))}
      </tbody>
    </table>
  );
}
