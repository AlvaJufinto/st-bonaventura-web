import { useState } from "react";

import InputError from "@/Components/admin/InputError";
import InputLabel from "@/Components/admin/InputLabel";
import PrimaryButton from "@/Components/admin/PrimaryButton";
import TextInput from "@/Components/admin/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Wrapper from "@/Layouts/Wrapper";
import { Transition } from "@headlessui/react";
import { Head, useForm } from "@inertiajs/react";

export default function Create({ auth, statuses }) {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);

  const { data, setData, errors, post, reset, processing, recentlySuccessful } =
    useForm({
      title: "Warta Minggu Paroki Pulomas",
      alternate_title: "",
      document_name: "",
      status_id: 2,
      user_id: auth?.user?.id,
    });

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile);
      setUploadError(null);
    } else {
      setFile(null);
      setUploadError("Please upload a valid PDF file.");
    }
  };

  const uploadFile = async (file) => {
    setUploading(true);
    setUploadError(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://asset.stbonaventura.org/upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      console.log("🚀 ~ uploadFile ~ result:", result);

      if (result.ok) {
        setData("document_name", result.file.fileName);
        console.log(data);
      } else {
        throw new Error("Upload unsuccessful");
      }
    } catch (error) {
      setUploadError("Failed to upload file.");
    } finally {
      setUploading(false);
      setFile(null);
    }
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();

    if (!file) {
      setUploadError("Please upload a PDF file before saving.");
      return;
    }

    await uploadFile(file);

    post(route("warta-minggu.store"), {
      preserveScroll: true,
      onSuccess: () => {
        reset("title", "alternate_title", "status_id", "document_name");
        setFile(null);
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
      <Head title="Create new Article" />
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
              onChange={(e) => setData("status_id", e.target.value)}
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
              value={file ? file[0]?.name : ""}
              onChange={handleFileChange}
              disabled={uploading}
              // key={file ? file.name : "new"}
            />
            {uploading && (
              <p className="text-sm text-gray-500 font-secondary">
                Uploading...
              </p>
            )}
            {uploadError && (
              <InputError message={uploadError} className="mt-2" />
            )}
          </div>

          {file && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold font-secondary">
                Preview PDF:
              </h3>
              <iframe
                src={URL.createObjectURL(file)}
                className="w-full h-[500px] border border-gray-300 rounded-md"
                title="PDF Preview"
              ></iframe>
            </div>
          )}

          <div className="flex items-center gap-4">
            <PrimaryButton disabled={processing || uploading}>
              Save
            </PrimaryButton>
            <Transition
              show={recentlySuccessful}
              enter="transition ease-in-out"
              enterFrom="opacity-0"
              leave="transition ease-in-out"
              leaveTo="opacity-0"
            >
              <p className="text-sm text-green-500 font-secondary font-semibold">
                Warta Minggu Berhsil dibuat
              </p>
            </Transition>
          </div>
        </form>
      </Wrapper>
    </AuthenticatedLayout>
  );
}
