import InputError from "@/Components/admin/InputError";
import InputLabel from "@/Components/admin/InputLabel";
import PrimaryButton from "@/Components/admin/PrimaryButton";
import TextInput from "@/Components/admin/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Wrapper from "@/Layouts/Wrapper";
import { Transition } from "@headlessui/react";
import { Head, useForm } from "@inertiajs/react";

export default function Create({ auth, statuses }) {
  const { data, setData, errors, post, reset, processing, recentlySuccessful } =
    useForm({
      title: "Warta Minggu Paroki Pulomas",
      alternate_title: "",
      file: null,
      status_id: 2,
      user_id: auth?.user?.id,
    });

  const onSubmitForm = async (e) => {
    e.preventDefault();

    post(route("warta-minggu.store"), {
      preserveScroll: true,
      onSuccess: () => {
        reset("alternate_title", "title", "status_id", "file");
        document.getElementById("fileInput").value = "";
      },
      onError: () => {
        document.getElementById("fileInput").value = "";
      },
    });
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="font-secondary font-semibold text-xl text-gray-800 leading-tight">
          Buat Warta Minggu Baru
        </h2>
      }
    >
      <Head title="Buat Warta Minggu Baru" />
      <Wrapper>
        <form onSubmit={onSubmitForm} className="mt-6 space-y-6">
          <div>
            <InputLabel htmlFor="title" value="Title" />
            <TextInput
              id="title"
              value={data.title}
              onChange={(e) => setData("title", e.target.value)}
              type="text"
              className="mt-1 block w-full"
            />
            <InputError message={errors.title} className="mt-2" />
          </div>

          <div>
            <InputLabel htmlFor="alternate_title" value="Alternate Title" />
            <TextInput
              id="alternate_title"
              value={data.alternate_title}
              onChange={(e) => setData("alternate_title", e.target.value)}
              type="text"
              className="mt-1 block w-full"
            />
            <InputError message={errors.alternate_title} className="mt-2" />
          </div>

          <div>
            <InputLabel htmlFor="status" value="Status" />
            <select
              id="status"
              value={data.status_id}
              onChange={(e) =>
                setData("status_id", parseInt(e.target.value, 10))
              }
              className="font-secondary mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none capitalize focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              {statuses.map((status) => (
                <option
                  value={status.id}
                  key={status.id}
                  className="capitalize font-secondary"
                >
                  {status.name}
                </option>
              ))}
            </select>
            <InputError message={errors.status} className="mt-2" />
          </div>

          <div>
            <InputLabel htmlFor="file" value="Upload PDF" />
            <input
              type="file"
              className="font-secondary"
              accept="application/pdf"
              onChange={(e) => setData("file", e.target.files[0])}
              id="fileInput"
            />
            <InputError message={errors.file} className="mt-2" />
          </div>

          {data.file && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold font-secondary">
                Preview PDF:
              </h3>
              <iframe
                src={URL.createObjectURL(data.file)}
                className="w-full h-[500px] border border-gray-300 rounded-md"
                title="PDF Preview"
              ></iframe>
            </div>
          )}

          <div className="flex items-center gap-4">
            <PrimaryButton disabled={processing}>Save</PrimaryButton>
            <Transition
              show={recentlySuccessful}
              enter="transition ease-in-out"
              enterFrom="opacity-0"
              leave="transition ease-in-out"
              leaveTo="opacity-0"
            >
              <p className="text-sm text-green-500 font-secondary font-semibold">
                Warta Minggu Berhasil dibuat
              </p>
            </Transition>
          </div>
        </form>
      </Wrapper>
    </AuthenticatedLayout>
  );
}
