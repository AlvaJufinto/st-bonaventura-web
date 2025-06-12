import React, { useState } from "react";

import Button from "@/Components/admin/Button";
import { statusColors } from "@/utils";
import { useForm } from "@inertiajs/react";

import ChildrenTable from "./ChildrenTable";

export default function OrganizationTable({ bidang }) {
  const [expandedItems, setExpandedItems] = useState({});

  const organizations = bidang || [];

  const { data, setData, patch, reset, processing } = useForm({});

  const toggleExpansion = (orgId) => {
    setExpandedItems((prev) => ({
      ...prev,
      [orgId]: !prev[orgId],
    }));
  };

  const handleEdit = (id) => {};
  const approveItem = (id) => {
    patch(route("bidang.approve", id), {
      preserveScroll: true,
    });
  };

  const revertItem = (id) => {
    patch(route("bidang.revert", id), {
      preserveScroll: true,
    });
  };

  const handleDetail = (org) => {};

  return (
    <table className="w-full border-collapse">
      <thead>
        <tr className="bg-slate-800 text-white">
          <th className="p-2 text-left font-secondary text-xs uppercase font-semibold w-1"></th>
          <th className="p-3 text-left font-secondary text-xs uppercase font-semibold">
            Nama Bidang
          </th>
          <th className="p-3 text-left font-secondary text-xs uppercase font-semibold w-[500px]">
            Deskripsi
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
        {organizations.map((org, index) => (
          <React.Fragment key={org.id}>
            {/* Parent Row */}
            <tr
              className={`${
                index % 2 === 0 ? "bg-gray-100" : "bg-white"
              } hover:bg-gray-200 transition duration-300 ease-in-out cursor-pointer`}
            >
              <td className="px-3 py-3 text-center">
                <button
                  className="w-6 h-6 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400"
                  onClick={() => toggleExpansion(org.id)}
                  title="Toggle Children"
                  aria-expanded={expandedItems[org.id]}
                >
                  <span
                    className={`transform transition-transform duration-300 ease-out ${
                      expandedItems[org.id] ? "rotate-180" : "rotate-0"
                    } text-gray-600`}
                  >
                    ▼
                  </span>
                </button>
              </td>
              <td className="p-3 text-sm font-secondary font-medium">
                {org.name}
              </td>
              <td className="p-3 text-sm font-secondary font-medium">
                {org?.description || "-"}
              </td>
              <td
                className={`p-3 ${
                  statusColors[org.status_id]
                } text-sm font-secondary uppercase font-bold tracking-wider`}
              >
                <span className="font-secondary text-sm uppercase tracking-wider font-semibold">
                  {org.status.name}
                </span>
              </td>
              <td className="p-3 text-sm flex flex-wrap gap-2">
                <Button
                  disabled={processing}
                  onClick={() => handleEdit(org.id)}
                >
                  Edit
                </Button>

                {org.status_id === 2 && (
                  <Button
                    disabled={processing}
                    type="success"
                    onClick={() => approveItem(org.id)}
                  >
                    Approve
                  </Button>
                )}

                {org.status_id === 3 && (
                  <Button
                    disabled={processing}
                    type="warning"
                    onClick={() => revertItem(org.id)}
                  >
                    Revert
                  </Button>
                )}

                <Button
                  disabled={processing}
                  type="primary"
                  onClick={() => handleDetail(org)}
                >
                  Detail
                </Button>
              </td>
            </tr>

            {expandedItems[org.id] && <ChildrenTable children={org.children} />}
          </React.Fragment>
        ))}
      </tbody>
    </table>
  );
}
