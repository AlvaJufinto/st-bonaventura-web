import { useState } from "react";

import Button from "@/Components/admin/Button";
import Dropdown from "@/Components/admin/Dropdown";
import InputError from "@/Components/admin/InputError";
import Pagination from "@/Components/admin/Pagination";
import PrimaryButton from "@/Components/admin/PrimaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Wrapper from "@/Layouts/Wrapper";
import { dateFormatter, statusColors } from "@/utils";
import { Head, router, useForm } from "@inertiajs/react";

export default function Index({ auth, news, statuses }) {
  const [editingId, setEditingId] = useState(null);
  const [currentPage, setCurrentPage] = useState(news.current_page);
  const {
    data: editableData,
    setData: setEditableData,
    patch,
    errors: editErrors,
  } = useForm({});
  const totalPages = news.last_page;

  const ASSET_URL = import.meta.env.VITE_PUBLIC_ASSET_URL;

  const startEditing = (item) => {
    setEditingId(item.id);
    setEditableData(item);
  };

  const handleChange = (e, field) => {
    setEditableData({ ...editableData, [field]: e.target.value });
  };

  const saveEdit = (id) => {
    patch(route("warta-minggu.update", id), {
      data: editableData,
      preserveScroll: true,
      onSuccess: () => setEditingId(null),
    });
  };

  const cancelEdit = () => {
    setEditableData(news.data.find((item) => item.id === editingId) || {});
    setEditingId(null);
  };

  const approveItem = (id) => {
    patch(route("warta-minggu.approve", id), {
      preserveScroll: true,
    });
  };

  const revertItem = (id) => {
    patch(route("warta-minggu.revert", id), {
      preserveScroll: true,
    });
  };

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      router.visit(route("warta-minggu.index", { page }));
    }
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="font-secondary font-semibold text-xl text-gray-800 leading-tight">
          Warta Minggu
        </h2>
      }
    >
      <Head title="Warta Minggu" />
      <Wrapper>
        <div className="flex justify-between items-center mb-4">
          <PrimaryButton
            className="mb-4 !text-base"
            onClick={() => router.visit(route("warta-minggu.create"))}
          >
            + Buat Warta Minggu Baru
          </PrimaryButton>

          <InputError
            message={
              editErrors.title ||
              editErrors.alternate_title ||
              editErrors.status_id
            }
            className="mt-2 font-semibold text-xl"
          />
        </div>

        <div className="overflow-x-auto pb-32">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-800 text-white">
                <th className="p-3 text-left font-secondary text-sm uppercase font-semibold">
                  Judul Warta Minggu
                </th>
                <th className="p-3 text-left font-secondary text-sm uppercase font-semibold">
                  Tanggal
                </th>
                <th className="p-3 text-left font-secondary text-sm uppercase font-semibold">
                  Sub-Judul
                </th>
                <th className="p-3 text-left font-secondary text-sm uppercase font-semibold">
                  Nama Pembuat
                </th>
                <th className="p-3 text-left font-secondary text-sm uppercase font-semibold">
                  Status
                </th>
                <th className="p-3 text-left font-secondary text-sm uppercase font-semibold">
                  Actions
                </th>
                <th className="p-3 text-left font-secondary text-sm uppercase font-semibold">
                  File
                </th>
              </tr>
            </thead>
            <tbody>
              {news.data.map((item, index) => (
                <tr
                  key={item.id}
                  className={`${
                    index % 2 === 0 ? "bg-gray-100" : "bg-white"
                  } hover:bg-gray-200 transition duration-300 ease-in-out`}
                >
                  <td className="p-3 text-sm">
                    {editingId === item.id ? (
                      <input
                        type="text"
                        value={editableData.title || ""}
                        onChange={(e) => handleChange(e, "title")}
                        className="w-full border rounded-md p-2 font-secondary text-sm"
                      />
                    ) : (
                      <span className="font-secondary text-sm">
                        {item.title}
                      </span>
                    )}
                  </td>
                  <td className="p-3 text-sm">
                    {/* {editingId === item.id ? (
                      <CustomDatePicker
                        selectedDate={
                          editableData.created_at || item.created_at
                        }
                        onDateChange={handleDateChange}
                      />
                    ) : (
                    )} */}
                    <span className="font-secondary text-sm">
                      {dateFormatter(item.created_at)}
                    </span>
                  </td>
                  <td className="p-3 text-sm">
                    {editingId === item.id ? (
                      <input
                        type="text"
                        value={editableData.alternate_title || ""}
                        onChange={(e) => handleChange(e, "alternate_title")}
                        className="w-full border rounded-md p-2 font-secondary text-sm"
                      />
                    ) : (
                      <span className="font-secondary text-sm">
                        {item.alternate_title}
                      </span>
                    )}
                  </td>
                  <td className="p-3 text-sm">
                    <span className="font-secondary text-sm">
                      {item.user.username}
                    </span>
                  </td>
                  <td className={`p-3 ${statusColors[item.status_id]} text-sm`}>
                    {editingId === item.id ? (
                      <Dropdown>
                        <Dropdown.Trigger>
                          <button className="uppercase tracking-wider font-semibold w-full border bg-white rounded-md p-2 font-secondary text-sm">
                            {editableData.status_id
                              ? statuses.find(
                                  (status) =>
                                    status.id === editableData.status_id
                                )?.name
                              : "Select Status"}
                          </button>
                        </Dropdown.Trigger>
                        <Dropdown.Content>
                          {statuses.map((status) => (
                            <Dropdown.Link
                              key={status.id}
                              className="capitalize font-secondary text-sm"
                              onClick={(e) => {
                                e.preventDefault();
                                setEditableData({
                                  ...editableData,
                                  status_id: status.id,
                                });
                              }}
                            >
                              {status.name}
                            </Dropdown.Link>
                          ))}
                        </Dropdown.Content>
                      </Dropdown>
                    ) : (
                      <span className="font-secondary text-sm uppercase tracking-wider font-semibold">
                        {item.status.name}
                      </span>
                    )}
                  </td>
                  <td className="p-3 text-sm flex flex-wrap gap-2">
                    {editingId === item.id ? (
                      <>
                        <Button
                          type="primary"
                          onClick={() => saveEdit(item.id)}
                        >
                          Save
                        </Button>
                        <Button
                          type="danger"
                          className="ml-2"
                          onClick={cancelEdit}
                        >
                          Cancel
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          type="default"
                          onClick={() => startEditing(item)}
                        >
                          Edit
                        </Button>

                        {item.status_id === 2 && (
                          <Button
                            type="success"
                            onClick={() => approveItem(item.id)}
                          >
                            Approve
                          </Button>
                        )}

                        {item.status_id === 3 && (
                          <Button
                            type="warning"
                            onClick={() => revertItem(item.id)}
                          >
                            Revert
                          </Button>
                        )}
                      </>
                    )}
                  </td>
                  <td className="p-3 text-sm">
                    <a
                      href={`${ASSET_URL}/uploads/${item.document_name}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-blue-800 text-white px-4 py-2 rounded-md font-secondary transition duration-300 hover:bg-blue-700 text-sm uppercase tracking-wider font-semibold"
                    >
                      Buka
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          goToPage={goToPage}
        />
      </Wrapper>
    </AuthenticatedLayout>
  );
}
