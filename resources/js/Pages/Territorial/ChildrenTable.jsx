import { useState } from "react";

import Button from "@/Components/admin/Button";
import { useDetailSidebar } from "@/Components/admin/DetailSidebar";
import { statusColors } from "@/utils";
import { useForm } from "@inertiajs/react";

import CreateTeritorial from "./CreateTeritorial";
import DetailSidebarInfo from "./DetailSidebarInfo";

export default function ChildrenTable({ expandedTerritories, territory }) {
  const { openDetailSidebar } = useDetailSidebar();
  const [editingChildId, setEditingChildId] = useState(null);
  const { data, setData, patch } = useForm({
    name: "",
    alternate_name: "",
    address: "",
    status_id: 3,
  });

  const startEditing = (child) => {
    setEditingChildId(child.id);
    setData({
      name: child.name,
      alternate_name: child.alternate_name,
      address: child.address,
      status_id: child.status_id,
    });
  };

  const saveEdit = (id) => {
    patch(route("teritorial.update", id), {
      preserveScroll: true,
    });

    setEditingChildId(null);
  };

  const handleDetailClick = (territory) => {
    openDetailSidebar({ body: <DetailSidebarInfo territory={territory} /> });
  };

  const cancelEdit = () => {
    setEditingChildId(null);
  };

  return (
    <tr className="border-b border-gray-200">
      <td colSpan={7} className="p-0">
        <div
          className={`overflow-hidden transition-all duration-500 ease-in-out ${
            expandedTerritories[territory.id]
              ? "max-h-[1000px] opacity-100 mb-5"
              : "max-h-0 opacity-0"
          }`}
        >
          <div className="py-2 pl-10 bg-gray-50">
            <table className="w-full table-fixed">
              <tbody>
                <tr className="bg-slate-600 text-white">
                  <th className="p-2 text-left font-secondary text-xs uppercase font-semibold w-1"></th>
                  <th className="p-3 text-left font-secondary text-xs uppercase font-semibold w-[200px]">
                    Nama Lingkungan
                  </th>
                  <th className="p-3 text-left font-secondary text-xs uppercase font-semibold w-[200px]">
                    Nama Lingkungan Kedua
                  </th>
                  <th className="p-3 text-left font-secondary text-xs uppercase font-semibold w-[150px]">
                    Alamat
                  </th>
                  <th className="p-3 text-left font-secondary text-xs uppercase font-semibold w-[100px]">
                    Status
                  </th>
                  <th className="p-3 text-left font-secondary text-xs uppercase font-semibold w-[300px]">
                    Actions
                  </th>
                </tr>
                {territory.children.map((child, childIndex) => (
                  <tr
                    key={child.id}
                    className={`${
                      childIndex % 2 === 0 ? "bg-gray-100" : "bg-white"
                    } hover:bg-gray-200 transition-colors duration-200 border-l-2 border-blue-400`}
                  >
                    <td className="py-2"></td>
                    <td className="py-1 px-3 text-sm font-secondary">
                      {editingChildId === child.id ? (
                        <input
                          type="text"
                          value={data.name}
                          onChange={(e) => setData("name", e.target.value)}
                          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md font-secondary"
                        />
                      ) : (
                        child?.name
                      )}
                    </td>
                    <td className="py-2 px-3 text-sm font-secondary">
                      {editingChildId === child.id ? (
                        <input
                          type="text"
                          value={data.alternate_name}
                          onChange={(e) =>
                            setData("alternate_name", e.target.value)
                          }
                          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md font-secondary"
                        />
                      ) : (
                        child?.alternate_name
                      )}
                    </td>
                    <td className="py-2 px-3 text-sm font-secondary">
                      {editingChildId === child.id ? (
                        <input
                          type="text"
                          value={data.address}
                          onChange={(e) => setData("address", e.target.value)}
                          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md font-secondary"
                        />
                      ) : (
                        child?.address
                      )}
                    </td>
                    <td
                      className={`py-2 px-3 ${
                        statusColors[child.status_id]
                      } text-sm font-secondary uppercase font-bold tracking-wider`}
                    >
                      {child.status.name}
                    </td>
                    <td className="flex space-x-2 py-2 px-3 text-sm font-secondary">
                      {editingChildId === child.id ? (
                        <>
                          <Button
                            type="success"
                            size="sm"
                            onClick={() => saveEdit(child.id)}
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
                            onClick={() => startEditing(child)}
                          >
                            Edit
                          </Button>
                          <Button
                            type="warning"
                            size="sm"
                            onClick={() => startEditing(child)}
                          >
                            Revert
                          </Button>
                          <Button
                            type="primary"
                            onClick={() => handleDetailClick(child)}
                          >
                            Detail
                          </Button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <CreateTeritorial type="lingkungan" territoryId={territory.id} />
          </div>
        </div>
      </td>
    </tr>
  );
}
