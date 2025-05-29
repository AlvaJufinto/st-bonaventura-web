import { useState } from "react";

import Button from "@/Components/admin/Button";
import Dropdown from "@/Components/admin/Dropdown";
import InputError from "@/Components/admin/InputError";
import LazyImage from "@/Components/guest/LazyImage";
import { statusColors } from "@/utils";
import { useForm } from "@inertiajs/react";

export default function Table({ articles, statuses }) {
  const ASSET_URL = import.meta.env.VITE_PUBLIC_ASSET_URL;

  const [editingId, setEditingId] = useState(null);

  const {
    data: editableData,
    setData: setEditableData,
    patch,
    errors: editErrors,
  } = useForm({});

  const startEditing = (item) => {
    setEditingId(item.id);
    setEditableData(item);
  };

  const saveEdit = (id) => {
    patch(route("articles.update", id), {
      data: editableData,
      preserveScroll: true,
      onSuccess: () => setEditingId(null),
    });
  };

  const cancelEdit = () => {
    setEditableData(articles.data?.find((item) => item.id === editingId) || {});
    setEditingId(null);
  };

  const previewItem = (item) => {
    const url = route("article.guest.show", { slug: item.slug });
    window.open(url, "_blank");
  };

  return (
    <>
      <InputError
        message={editErrors.title || editErrors.preview || editErrors.status_id}
        className="mt-2 font-semibold text-xl"
      />
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-800 text-white">
            <th className="p-3 text-left font-secondary text-sm uppercase font-semibold">
              Title
            </th>
            <th className="p-3 text-left font-secondary text-sm uppercase font-semibold">
              Preview
            </th>
            <th className="p-3 text-left font-secondary text-sm uppercase font-semibold">
              Image
            </th>
            <th className="p-3 text-left font-secondary text-sm uppercase font-semibold">
              Publisher
            </th>
            <th className="p-3 text-left font-secondary text-sm uppercase font-semibold">
              User
            </th>
            <th className="p-3 text-left font-secondary text-sm uppercase font-semibold">
              Status
            </th>
            <th className="p-3 text-left font-secondary text-sm uppercase font-semibold w-[250px]">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {articles.map((item, index) => (
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
                    onChange={(e) =>
                      setEditableData({
                        ...editableData,
                        title: e.target.value,
                      })
                    }
                    className="w-full border rounded-md p-2 font-secondary text-sm"
                  />
                ) : (
                  <span className="font-secondary text-sm">{item.title}</span>
                )}
              </td>
              <td className="p-3 text-sm max-w-xs">
                {editingId === item.id ? (
                  <textarea
                    value={editableData.preview || ""}
                    onChange={(e) =>
                      setEditableData({
                        ...editableData,
                        preview: e.target.value,
                      })
                    }
                    className="w-full border rounded-md p-2 font-secondary text-sm resize-none"
                    rows="2"
                  />
                ) : (
                  <span className="font-secondary text-sm line-clamp-2">
                    {item.preview || "Tidak ada preview"}
                  </span>
                )}
              </td>
              <td className="p-3 text-sm">
                {item.main_image_name ? (
                  <div className="w-16 h-12 overflow-hidden rounded-md">
                    <LazyImage
                      src={`${ASSET_URL}/uploads/${item.main_image_name}`}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <span className="font-secondary text-sm text-gray-500">
                    Tidak ada gambar
                  </span>
                )}
              </td>
              <td className="p-3 text-sm">
                <span className="font-secondary text-sm">
                  {item.publisher?.name || "Tidak ada"}
                </span>
              </td>
              <td className="p-3 text-sm">
                <span className="font-secondary text-sm">
                  {item.user?.name || "Tidak ada"}
                </span>
              </td>
              <td className={`p-3 ${statusColors[item.status_id]} text-sm`}>
                {editingId === item.id ? (
                  <Dropdown>
                    <Dropdown.Trigger>
                      <button className="uppercase tracking-wider font-semibold w-full border bg-white rounded-md p-2 font-secondary text-sm">
                        {editableData.status_id
                          ? statuses.find(
                              (status) => status.id === editableData.status_id
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
                    {item.status?.name || "Tidak ada"}
                  </span>
                )}
              </td>
              <td className="p-3 text-sm flex flex-wrap gap-2">
                {editingId === item.id ? (
                  <>
                    <Button type="primary" onClick={() => saveEdit(item.id)}>
                      Save
                    </Button>
                    <Button type="danger" className="ml-2" onClick={cancelEdit}>
                      Cancel
                    </Button>
                  </>
                ) : (
                  <>
                    <Button type="default" onClick={() => startEditing(item)}>
                      Edit
                    </Button>
                    <Button type="info" onClick={() => previewItem(item)}>
                      Preview
                    </Button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
