import { useEffect, useState } from "react";

import Badge from "@/Components/admin/Badge";
import Button from "@/Components/admin/Button";
import Dropdown from "@/Components/admin/Dropdown";
import InputError from "@/Components/admin/InputError";
import InputLabel from "@/Components/admin/InputLabel";
import Profile from "@/Components/admin/Profile";
import { useForm, usePage } from "@inertiajs/react";

import SelectHead from "./SelectHead";

const CreateNewLingkungan = ({ parentId }) => {
  const {
    props: { auth, statuses },
  } = usePage();
  const [isCreating, setIsCreating] = useState(false);

  const { data, setData, post, errors, reset } = useForm({
    name: "",
    alternate_name: "",
    address: "",
    status_id: 3,
    user_id: auth?.user?.id,
    organization_type_id: 2,
    parent_id: parentId,
  });

  const handleCreateSubmit = (e) => {
    e.preventDefault();

    post(route("teritorial.store"), {
      preserveScroll: true,
      onSuccess: () => {
        setIsCreating(false);
        reset("name", "alternate_name", "address", "status_id");
      },
      onError: () => {},
    });
  };

  if (isCreating) {
    return (
      <form className="p-4 bg-gray-50" onSubmit={handleCreateSubmit}>
        <div className="flex justify-between items-start gap-20 mb-3">
          <input
            type="text"
            placeholder="Nama Lingkungan"
            value={data.name}
            onChange={(e) => setData("name", e.target.value)}
            className="font-medium text-gray-900 font-secondary border rounded-md px-2 py-1 w-full"
          />
          <Dropdown>
            <Dropdown.Trigger>
              <button
                type="button"
                className="uppercase tracking-wider font-semibold border bg-white rounded-md px-4 py-2 font-secondary text-sm"
              >
                {data.status_id && statuses
                  ? statuses.find((status) => status.id === data.status_id)
                      ?.name || "Status"
                  : "Status"}
              </button>
            </Dropdown.Trigger>
            <Dropdown.Content align="right">
              {statuses.map((status) => (
                <Dropdown.Link
                  key={status.id}
                  onClick={(e) => {
                    e.preventDefault();
                    setData("status_id", status.id);
                  }}
                  className="capitalize font-secondary font-normal text-sm"
                >
                  {status.name}
                </Dropdown.Link>
              ))}
            </Dropdown.Content>
          </Dropdown>
        </div>
        {errors.name && (
          <InputError message={errors.name} className="mt-1 mb-2" />
        )}

        <div className="mb-2">
          <input
            type="text"
            placeholder="Nama Alternatif"
            value={data.alternate_name}
            onChange={(e) => setData("alternate_name", e.target.value)}
            className="text-sm text-gray-500 font-secondary border rounded-md px-2 py-1 w-full"
          />
          {errors.alternate_name && (
            <InputError message={errors.alternate_name} className="mt-1" />
          )}
        </div>

        <div className="mb-2">
          <input
            type="text"
            placeholder="Alamat"
            value={data.address}
            onChange={(e) => setData("address", e.target.value)}
            className="text-xs text-gray-400 font-secondary border rounded-md px-2 py-1 w-full"
          />
          {errors.address && (
            <InputError message={errors.address} className="mt-1" />
          )}
        </div>

        <div className="flex gap-2 mt-3">
          <Button type="success" htmlType="submit">
            Simpan
          </Button>
          <Button
            type="danger"
            onClick={() => {
              setIsCreating(false);
              reset();
            }}
          >
            Batal
          </Button>
        </div>
      </form>
    );
  } else {
    return (
      <Button
        type="primary"
        onClick={() => setIsCreating(true)}
        className="w-full"
      >
        Tambah Lingkungan Baru
      </Button>
    );
  }
};

const LingkunganSection = ({ item, parentId }) => {
  if (!item) return null;

  const lingkunganList = Array.isArray(item) ? item : [];

  return (
    <div>
      <ul className="border rounded-lg divide-y divide-gray-200 mb-4">
        {lingkunganList.map((child) => (
          <li key={child.id} className="p-4 hover:bg-gray-50 transition-colors">
            <div className="font-medium text-gray-900 font-secondary flex justify-between items-start gap-20">
              {child.name}
              <Badge status={child.status} />
            </div>
            <div className="text-sm text-gray-500 font-secondary mt-5">
              {child.alternate_name || "-"}
            </div>
            <div className="text-xs text-gray-400 font-secondary">
              {child.address || "-"}
            </div>
            <div className="text-xs text-gray-400 font-secondary">
              {child?.head?.name || "-"}
            </div>
          </li>
        ))}
      </ul>

      <CreateNewLingkungan parentId={parentId} />
    </div>
  );
};

const DetailSidebarInfo = ({ territory }) => {
  const [isSidebarEditing, setIsSidebarEditing] = useState(false);

  const { props } = usePage();

  // ini karena wktu update harus ngambil data terbaru dan bukan yg dari props lama
  const findUpdatedTerritory = () => {
    if (!territory) return null;

    // Find the territory in the territories array based on ID
    if (props.territories) {
      const updatedParent = props.territories.find(
        (t) => t.id === territory.id
      );
      if (updatedParent) return updatedParent;

      // If not found as parent, check in children
      for (const parent of props.territories) {
        if (parent.children) {
          const updatedChild = parent.children.find(
            (c) => c.id === territory.id
          );
          if (updatedChild) return updatedChild;
        }
      }
    }

    return territory;
  };

  const currentTerritory = findUpdatedTerritory();

  const type =
    currentTerritory?.organization_type_id === 1 ? "wilayah" : "lingkungan";

  const {
    props: { statuses },
  } = usePage();

  const { data, setData, patch, reset, processing } = useForm({
    name: currentTerritory?.name || "",
    alternate_name: currentTerritory?.alternate_name || "",
    address: currentTerritory?.address || "",
    description: currentTerritory?.description || "",
    status_id: currentTerritory?.status_id || "",
    head_id: currentTerritory?.head_id || "",
  });

  const saveEdit = () => {
    patch(route("teritorial.update", currentTerritory.id), {
      preserveScroll: true,
      onSuccess: () => {
        setIsSidebarEditing(false);
      },
    });
  };

  useEffect(() => {
    if (currentTerritory) {
      setData({
        name: currentTerritory.name || "",
        alternate_name: currentTerritory.alternate_name || "",
        address: currentTerritory.address || "",
        description: currentTerritory.description || "",
        status_id: currentTerritory.status_id || "",
        head_id: currentTerritory.head_id || "",
      });
    }
    setIsSidebarEditing(false);
  }, [currentTerritory]);

  if (!currentTerritory) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="p-6 space-y-4">
      {isSidebarEditing ? (
        <>
          <InputLabel>Nama {type} Pertama :</InputLabel>
          <input
            type="text"
            value={data.name || ""}
            onChange={(e) => setData("name", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md font-secondary"
          />
        </>
      ) : (
        <h2 className="text-2xl font-bold text-gray-800 font-secondary">
          {currentTerritory?.name || ""}
        </h2>
      )}

      {isSidebarEditing ? (
        <>
          <InputLabel>Nama {type} Kedua :</InputLabel>
          <input
            type="text"
            value={data.alternate_name || ""}
            onChange={(e) => setData("alternate_name", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md font-secondary"
          />
        </>
      ) : (
        <p className="text-sm text-gray-500 font-secondary">
          {currentTerritory.alternate_name || ""}
        </p>
      )}

      <div className="space-y-2">
        <InputLabel>Ketua : </InputLabel>
        <p className="text-sm text-gray-500 font-secondary">
          {isSidebarEditing && (
            <SelectHead
              data={data}
              setData={setData}
              currentHead={currentTerritory.head}
            />
          )}
          {currentTerritory.head && !isSidebarEditing && (
            <Profile user={currentTerritory.head} />
          )}
          {!isSidebarEditing && !currentTerritory.head && (
            <span className="text-sm font-secondary text-gray-500">
              Tidak ada ketua
            </span>
          )}
        </p>
      </div>

      <div className="space-y-2 text-gray-700 font-secondary">
        <InputLabel>Alamat :</InputLabel>
        {isSidebarEditing ? (
          <input
            type="text"
            value={data.address || ""}
            onChange={(e) => setData("address", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md font-secondary"
          />
        ) : (
          <p className="font-secondary">{currentTerritory.address || "-"}</p>
        )}
      </div>

      <div className="space-y-2 text-gray-700 font-secondary">
        <InputLabel>Description :</InputLabel>
        {isSidebarEditing ? (
          <textarea
            value={data.description || ""}
            onChange={(e) => setData("description", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md font-secondary"
          />
        ) : (
          <p className="font-secondary">
            {currentTerritory.description || "-"}
          </p>
        )}
      </div>

      <div>
        {isSidebarEditing ? (
          <>
            <InputLabel>Status :</InputLabel>
            <Dropdown>
              <Dropdown.Trigger>
                <button className="uppercase tracking-wider font-semibold border bg-white rounded-md px-4 py-2 font-secondary text-sm">
                  {data.status_id && statuses
                    ? statuses.find((status) => status.id === data.status_id)
                        ?.name || "Pilih Status"
                    : "Pilih Status"}
                </button>
              </Dropdown.Trigger>
              <Dropdown.Content align="left">
                {statuses &&
                  statuses.map((status) => (
                    <Dropdown.Link
                      key={status.id}
                      onClick={(e) => {
                        e.preventDefault();
                        setData("status_id", status.id);
                      }}
                      className="capitalize font-secondary font-normal text-sm"
                    >
                      {status.name}
                    </Dropdown.Link>
                  ))}
              </Dropdown.Content>
            </Dropdown>
          </>
        ) : (
          currentTerritory.status && <Badge status={currentTerritory.status} />
        )}
      </div>

      <div className="pt-4 flex gap-2">
        {isSidebarEditing ? (
          <>
            <Button type="success" onClick={saveEdit} isLoading={processing}>
              Save
            </Button>
            <Button
              type="danger"
              onClick={() => {
                setIsSidebarEditing(false);
                reset();
              }}
            >
              Cancel
            </Button>
          </>
        ) : (
          <Button
            type="primary"
            className="w-42"
            onClick={() => setIsSidebarEditing(true)}
          >
            Edit {type}
          </Button>
        )}
      </div>

      {!isSidebarEditing &&
        currentTerritory &&
        currentTerritory.children &&
        currentTerritory.children.length > 0 && (
          <div className="pt-12">
            <h3 className="font-secondary text-lg font-semibold text-gray-800 mb-2">
              Lingkungan:
            </h3>
            <LingkunganSection
              item={currentTerritory.children}
              parentId={currentTerritory.id}
            />
          </div>
        )}
    </div>
  );
};

export default DetailSidebarInfo;
