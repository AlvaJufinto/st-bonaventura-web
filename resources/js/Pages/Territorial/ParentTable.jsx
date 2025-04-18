import React, { useState } from "react";

import Button from "@/Components/admin/Button";
import { useDetailSidebar } from "@/Components/admin/DetailSidebar";
import Dropdown from "@/Components/admin/Dropdown";
import { statusColors } from "@/utils";
import { useForm, usePage } from "@inertiajs/react";

import ChildrenTable from "./ChildrenTable";
import DetailSidebarInfo from "./DetailSidebarInfo";

export default function ParentTable({
  territories,
  expandedTerritories,
  setExpandedTerritories,
}) {
  const {
    props: { statuses: rawStatuses },
  } = usePage();
  const statuses = Object.values(rawStatuses);
  const [editingParentId, setEditingParentId] = useState(null);
  const { data, setData, patch } = useForm({});

  const { openDetailSidebar } = useDetailSidebar();

  const toggleExpansion = (territoryId) => {
    setExpandedTerritories((prev) => ({
      ...prev,
      [territoryId]: !prev[territoryId],
    }));
  };

  const startEditing = (territory) => {
    setEditingParentId(territory.id);
    setData({
      name: territory.name,
      alternate_name: territory.alternate_name,
      address: territory.address,
      status_id: territory.status_id,
    });
  };

  const saveEdit = (id) => {
    patch(route("teritorial.update", id), {
      preserveScroll: true,
    });
    setEditingParentId(null);
  };

  const cancelEdit = () => {
    setEditingParentId(null);
  };

  const handleDetailClick = (territory) => {
    openDetailSidebar(<DetailSidebarInfo territory={territory} />);
  };

  const approveItem = (id) => {
    patch(route("teritorial.approve", id), {
      preserveScroll: true,
    });
  };

  const revertItem = (id) => {
    patch(route("teritorial.revert", id), {
      preserveScroll: true,
    });
  };

  return (
    <table className="w-full border-collapse">
      <thead>
        <tr className="bg-slate-800 text-white">
          <th className="p-2 text-left font-secondary text-xs uppercase font-semibold w-1"></th>
          <th className="p-3 text-left font-secondary text-xs uppercase font-semibold w-[120px]">
            Nama Lingkungan
          </th>
          <th className="p-3 text-left font-secondary text-xs uppercase font-semibold w-[200px]">
            Nama Lingkungan Kedua
          </th>
          <th className="p-3 text-left font-secondary text-xs uppercase font-semibold w-[150px]">
            Alamat
          </th>
          <th className="p-3 text-left font-secondary text-xs uppercase font-semibold w-[150px]">
            Status
          </th>
          <th className="p-3 text-left font-secondary text-xs uppercase font-semibold w-[300px]">
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
              } hover:bg-gray-200 transition duration-300 ease-in-out cursor-pointer`}
            >
              <td className="px-3 py-3 text-center">
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
              </td>

              <td className="p-3 text-sm font-secondary">
                {editingParentId === territory.id ? (
                  <input
                    type="text"
                    value={data.name}
                    onChange={(e) => setData("name", e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md font-secondary"
                  />
                ) : (
                  territory.name
                )}
              </td>

              <td className="p-3 text-sm font-secondary">
                {editingParentId === territory.id ? (
                  <input
                    type="text"
                    value={data.alternate_name}
                    onChange={(e) => setData("alternate_name", e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md font-secondary"
                  />
                ) : (
                  territory.alternate_name
                )}
              </td>

              <td className="p-3 text-sm font-secondary truncate">
                {editingParentId === territory.id ? (
                  <input
                    type="text"
                    value={data.address}
                    onChange={(e) => setData("address", e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md font-secondary"
                  />
                ) : (
                  territory.address
                )}
              </td>

              <td
                className={`p-3 ${
                  statusColors[territory.status_id]
                } text-sm font-secondary uppercase font-bold tracking-wider`}
              >
                {editingParentId === territory.id ? (
                  <Dropdown>
                    <Dropdown.Trigger>
                      <button className="uppercase tracking-wider font-semibold w-full border bg-white rounded-md p-2 font-secondary text-sm">
                        {territory.status_id
                          ? statuses.find(
                              (status) => status.id === data.status_id
                            )?.name
                          : "Select Status"}
                      </button>
                    </Dropdown.Trigger>
                    <Dropdown.Content>
                      {statuses.map((status) => (
                        <Dropdown.Link
                          key={status.id}
                          className="capitalize font-secondary font-normal text-sm"
                          onClick={(e) => {
                            e.preventDefault();
                            setData("status_id", status.id);
                          }}
                        >
                          {status.name}
                        </Dropdown.Link>
                      ))}
                    </Dropdown.Content>
                  </Dropdown>
                ) : (
                  <span className="font-secondary text-sm uppercase tracking-wider font-semibold">
                    {territory.status.name}
                  </span>
                )}
              </td>

              <td className="p-3 text-sm flex flex-wrap gap-2">
                {editingParentId === territory.id ? (
                  <>
                    <Button
                      type="success"
                      size="sm"
                      onClick={() => saveEdit(territory.id)}
                    >
                      Save
                    </Button>
                    <Button type="danger" size="sm" onClick={cancelEdit}>
                      Cancel
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      type="default"
                      size="sm"
                      onClick={() => startEditing(territory)}
                    >
                      Edit
                    </Button>
                    {territory.status_id === 2 && (
                      <Button
                        type="success"
                        size="sm"
                        onClick={() => approveItem(territory.id)}
                      >
                        Approve
                      </Button>
                    )}
                    {territory.status_id === 3 && (
                      <Button
                        type="warning"
                        size="sm"
                        onClick={() => revertItem(territory.id)}
                      >
                        Revert
                      </Button>
                    )}
                    <Button
                      type="primary"
                      onClick={() => handleDetailClick(territory)}
                    >
                      Detail
                    </Button>
                  </>
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
