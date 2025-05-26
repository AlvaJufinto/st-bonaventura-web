import React, { useState } from "react";

import Button from "@/Components/admin/Button";
import { statusColors } from "@/utils";

import ChildrenTable from "./ChildrenTable";

export default function OrganizationTable({ bidang }) {
  const [expandedItems, setExpandedItems] = useState({});

  const organizations = bidang || [];

  const toggleExpansion = (orgId) => {
    setExpandedItems((prev) => ({
      ...prev,
      [orgId]: !prev[orgId],
    }));
  };

  const handleEdit = (id) => {
    console.log(`Edit organization with ID: ${id}`);
  };

  const handleApprove = (id) => {
    console.log(`Approve organization with ID: ${id}`);
  };

  const handleRevert = (id) => {
    console.log(`Revert organization with ID: ${id}`);
  };

  const handleDetail = (org) => {
    console.log(`View details for organization:`, org);
  };

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
                <Button onClick={() => handleEdit(org.id)}>Edit</Button>

                {org.status_id === 2 && (
                  <Button type="success" onClick={() => handleApprove(org.id)}>
                    Approve
                  </Button>
                )}

                {org.status_id === 3 && (
                  <Button type="warning" onClick={() => handleRevert(org.id)}>
                    Revert
                  </Button>
                )}

                <Button type="primary" onClick={() => handleDetail(org)}>
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
