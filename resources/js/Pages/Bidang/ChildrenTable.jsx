import { useState } from "react";

import Button from "@/Components/admin/Button";
import Profile from "@/Components/admin/Profile";
import { statusColors } from "@/utils";
import { useForm } from "@inertiajs/react";

export default function ChildrenTable({ children }) {
  const [editingChildId, setEditingChildId] = useState(null);
  const { data, setData, patch, reset, processing } = useForm({});

  // const { openDetailSidebar } = useDetailSidebar();

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

  return (
    <tr className="border-b border-gray-200">
      <td colSpan={5} className="p-0 pb-10">
        <div className="py-2 pl-10 bg-gray-50">
          <table className="w-full table-fixed">
            <thead>
              <tr className="bg-slate-600 text-white">
                <th className="p-2 text-left font-secondary text-xs uppercase font-semibold w-1"></th>
                <th className="p-3 text-left font-secondary text-xs uppercase font-semibold">
                  Nama Seksi/Bidang/Komunitas/Tim
                </th>
                <th className="p-3 text-left font-secondary text-xs uppercase font-semibold w-[350px]">
                  Deskripsi
                </th>
                <th className="p-3 text-left font-secondary text-xs uppercase font-semibold w-[150px]">
                  Penanggung Jawab
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
              {children.map((child, childIndex) => (
                <tr
                  key={child.id}
                  className={`${
                    childIndex % 2 === 0 ? "bg-gray-100" : "bg-white"
                  } hover:bg-gray-200 transition-colors duration-200 border-l-2 border-blue-400`}
                >
                  <td className="py-2"></td>
                  <td className="py-1 px-3 text-sm font-secondary">
                    {child.name}
                  </td>
                  <td className="p-3 font-secondary text-sm">
                    {child.description || "-"}
                  </td>

                  <td className="p-3 text-sm font-secondary">
                    {editingChildId === child.id && (
                      <SelectHead
                        data={data}
                        setData={setData}
                        currentHead={child.head}
                      />
                    )}

                    {child?.head && editingChildId !== child.id && (
                      <Profile user={child.head} />
                    )}

                    {editingChildId !== child.id && !child.head && (
                      <span className="text-sm font-secondary text-gray-500">
                        Tidak ada
                      </span>
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
                    <Button
                      disabled={processing}
                      type="default"
                      size="sm"
                      // onClick={() => handleEdit(child.id)}
                    >
                      Edit
                    </Button>

                    {child.status_id === 2 && (
                      <Button
                        disabled={processing}
                        type="success"
                        size="sm"
                        onClick={() => approveItem(child.id)}
                      >
                        Approve
                      </Button>
                    )}

                    {child.status_id === 3 && (
                      <Button
                        disabled={processing}
                        type="warning"
                        size="sm"
                        onClick={() => revertItem(child.id)}
                      >
                        Revert
                      </Button>
                    )}

                    <Button
                      disabled={processing}
                      type="primary"
                      size="sm"
                      // onClick={() => handleDetail(child)}
                    >
                      Detail
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </td>
    </tr>
  );
}
