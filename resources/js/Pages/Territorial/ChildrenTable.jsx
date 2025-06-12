import { useState } from "react";

import Button from "@/Components/admin/Button";
import { useDetailSidebar } from "@/Components/admin/DetailSidebar";
import Dropdown from "@/Components/admin/Dropdown";
import Profile from "@/Components/admin/Profile";
import { statusColors } from "@/utils";
import { useForm, usePage } from "@inertiajs/react";

import CreateTeritorial from "./CreateTeritorial";
import DetailSidebarInfo from "./DetailSidebarInfo";
import SelectHead from "./SelectHead";

export default function ChildrenTable({ expandedTerritories, territory }) {
  const { openDetailSidebar } = useDetailSidebar();
  const [editingChildId, setEditingChildId] = useState(null);

  const {
    props: { statuses },
  } = usePage();

  const { data, setData, patch, reset, processing } = useForm({});

  const handleEditInit = (child) => {
    setEditingChildId(child.id);
    setData({
      name: child.name || "",
      alternate_name: child.alternate_name || "",
      address: child.address || "",
      status_id: child.status_id || 3,
    });
  };

  const saveEdit = (id) => {
    patch(route("teritorial.update", id), {
      data,
      preserveScroll: true,
      onSuccess: () => {
        setEditingChildId(null);
        reset();
      },
    });
  };

  const cancelEdit = () => {
    setEditingChildId(null);
    reset();
  };

  const handleDetailClick = (territory) => {
    openDetailSidebar({ body: <DetailSidebarInfo territory={territory} /> });
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
              <thead>
                <tr className="bg-slate-600 text-white">
                  <th className="p-2 w-1"></th>
                  <th className="p-3 w-[200px] text-left text-xs font-semibold uppercase font-secondary">
                    Nama Lingkungan
                  </th>
                  <th className="p-3 w-[200px] text-left text-xs font-semibold uppercase font-secondary">
                    Nama Lingkungan Kedua
                  </th>
                  <th className="p-3 w-[150px] text-left text-xs font-semibold uppercase font-secondary">
                    Alamat
                  </th>
                  <th className="p-3 w-[150px] max-w-[150px] text-left text-xs font-semibold uppercase font-secondary">
                    Ketua
                  </th>
                  <th className="p-3 w-[120px] text-left text-xs font-semibold uppercase font-secondary">
                    Status
                  </th>
                  <th className="p-3 w-[300px] text-left text-xs font-semibold uppercase font-secondary">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {territory.children.map((child, index) => {
                  const isEditing = editingChildId === child.id;
                  return (
                    <tr
                      key={child.id}
                      className={`${
                        index % 2 === 0 ? "bg-gray-100" : "bg-white"
                      } hover:bg-gray-200 transition-colors border-l-2 border-blue-400`}
                    >
                      <td className="py-2"></td>
                      <td className="py-1 px-3 text-sm font-secondary">
                        {isEditing ? (
                          <input
                            type="text"
                            value={data.name || ""}
                            onChange={(e) => setData("name", e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                          />
                        ) : (
                          child.name
                        )}
                      </td>
                      <td className="py-2 px-3 text-sm font-secondary">
                        {isEditing ? (
                          <input
                            type="text"
                            value={data.alternate_name || ""}
                            onChange={(e) =>
                              setData("alternate_name", e.target.value)
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                          />
                        ) : (
                          child.alternate_name
                        )}
                      </td>
                      <td className="py-2 px-3 text-sm font-secondary">
                        {isEditing ? (
                          <input
                            type="text"
                            value={data.address || ""}
                            onChange={(e) => setData("address", e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                          />
                        ) : (
                          child.address
                        )}
                      </td>
                      <td className="p-3 text-sm font-secondary max-w-[150px]">
                        {isEditing ? (
                          <SelectHead
                            data={data}
                            setData={(newData) => setData(newData)}
                            currentHead={child.head}
                          />
                        ) : child.head ? (
                          <Profile user={child.head} />
                        ) : (
                          <span className="text-sm text-gray-500">
                            Tidak ada ketua
                          </span>
                        )}
                      </td>
                      <td
                        className={`p-3 ${
                          statusColors[child.status_id]
                        } text-sm font-secondary uppercase font-bold tracking-wider`}
                      >
                        {isEditing ? (
                          <Dropdown>
                            <Dropdown.Trigger>
                              <button className="uppercase tracking-wider font-semibold w-full border bg-white rounded-md p-2 font-secondary text-sm">
                                {
                                  statuses.find(
                                    (status) => status.id === data.status_id
                                  )?.name
                                }
                              </button>
                            </Dropdown.Trigger>
                            <Dropdown.Content>
                              {statuses?.map((status) => (
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
                            {child.status.name}
                          </span>
                        )}
                      </td>

                      <td className="flex space-x-2 py-2 px-3 text-sm font-secondary">
                        {isEditing ? (
                          <>
                            <Button
                              type="success"
                              size="sm"
                              onClick={() => saveEdit(child.id)}
                              isLoading={processing}
                            >
                              Save
                            </Button>
                            <Button
                              type="danger"
                              size="sm"
                              onClick={cancelEdit}
                              disabled={processing}
                            >
                              Cancel
                            </Button>
                          </>
                        ) : (
                          <>
                            <Button
                              type="default"
                              size="sm"
                              onClick={() => handleEditInit(child)}
                              disabled={processing}
                            >
                              Edit
                            </Button>
                            {child.status_id === 2 && (
                              <Button
                                type="success"
                                size="sm"
                                onClick={() => approveItem(child.id)}
                                disabled={processing}
                              >
                                Approve
                              </Button>
                            )}
                            {child.status_id === 3 && (
                              <Button
                                type="warning"
                                size="sm"
                                disabled={processing}
                                onClick={() => revertItem(child.id)}
                              >
                                Revert
                              </Button>
                            )}
                            <Button
                              type="primary"
                              size="sm"
                              onClick={() => handleDetailClick(child)}
                              disabled={processing}
                            >
                              Detail
                            </Button>
                          </>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <CreateTeritorial type="lingkungan" territoryId={territory.id} />
          </div>
        </div>
      </td>
    </tr>
  );
}
