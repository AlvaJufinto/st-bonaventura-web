import { useState } from "react";

import Button from "@/Components/admin/Button";
import InputError from "@/Components/admin/InputError";
import InputLabel from "@/Components/admin/InputLabel";
import { useForm, usePage } from "@inertiajs/react";

export default function CreateTeritorial({ type, territoryId = null }) {
  const {
    props: { auth, statuses },
  } = usePage();
  const formattedStatuses = Object.values(statuses);
  const [isCreating, setIsCreating] = useState(false);

  const payload =
    type == "wilayah"
      ? { organization_type_id: 1 }
      : {
          organization_type_id: 2,
          parent_id: territoryId,
        };

  const { data, setData, post, errors, reset } = useForm({
    name: "",
    alternate_name: "",
    address: "",
    status_id: 3,
    user_id: auth.user.id,
    ...payload,
  });

  const property =
    type == "wilayah"
      ? {
          name: "Nama Wilayah",
          secondaryName: "Nama Wilayah Kedua",
          address: "Alamat",
          button: "Buat Wilayah Baru",
        }
      : {
          name: "Nama Lingkungan",
          secondaryName: "Nama Lingkungan Kedua",
          address: "Alamat",
          button: "Buat Lingkungan Baru",
        };

  const handleCreateSubmit = (e) => {
    e.preventDefault();

    post(route("teritorial.store"), {
      preserveScroll: true,
      onSuccess: () => {
        reset("name", "alternate_name", "address", "status_id");
      },
      onError: (err) => {
        console.log(err);
      },
    });
  };

  if (isCreating)
    return (
      <div className="m-4 ml-0 p-4 border border-gray-300 bg-gray-50 font-secondary">
        <form onSubmit={handleCreateSubmit}>
          <div className="flex gap-4">
            <div className="flex-1">
              <InputLabel htmlFor="name" value={property.name} />
              <input
                type="text"
                id="name"
                name="name"
                value={data.name}
                onChange={(e) => setData("name", e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md font-secondary"
              />
              <InputError message={errors.name} className="mt-2" />
            </div>
            <div className="flex-1">
              <InputLabel
                htmlFor="alternate_name"
                value={property.secondaryName}
              />
              <input
                type="text"
                id="alternate_name"
                name="alternate_name"
                value={data.alternate_name}
                onChange={(e) => setData("alternate_name", e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md font-secondary"
              />
              <InputError message={errors.alternate_name} className="mt-2" />
            </div>
            <div className="flex-1">
              <InputLabel htmlFor="address" value={property.address} />
              <input
                type="text"
                id="address"
                name="address"
                value={data.address}
                onChange={(e) => setData("address", e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md font-secondary"
              />
              <InputError message={errors.address} className="mt-2" />
            </div>
            <div className="flex-1">
              <InputLabel htmlFor="status" value="Status" />
              <select
                id="status"
                value={data.status_id}
                onChange={(e) =>
                  setData("status_id", parseInt(e.target.value, 10))
                }
                className="font-secondary block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none capitalize focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                {formattedStatuses.map((status) => (
                  <option
                    key={status.id}
                    value={status.id}
                    className="capitalize font-secondary"
                  >
                    {status.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-4 mt-4 font-secondary">
            <Button
              type="default"
              size="sm"
              onClick={() => setIsCreating(false)}
            >
              Batal
            </Button>
            <Button type="success" size="sm" htmlType="submit">
              Simpan
            </Button>
          </div>
        </form>
      </div>
    );

  return (
    <div className="m-4 flex justify-end font-secondary">
      <Button type="primary" size="sm" onClick={() => setIsCreating(true)}>
        + {property.button}
      </Button>
    </div>
  );
}
