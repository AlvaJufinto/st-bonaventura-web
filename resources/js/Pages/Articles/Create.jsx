import { useMemo, useState } from "react";

import CustomDatePicker, {
  calendarDateFormat,
} from "@/Components/admin/CustomDatePicker";
import InputError from "@/Components/admin/InputError";
import InputLabel from "@/Components/admin/InputLabel";
import PrimaryButton from "@/Components/admin/PrimaryButton";
import TextInput from "@/Components/admin/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Wrapper from "@/Layouts/Wrapper";
import { Transition } from "@headlessui/react";
import { Head, useForm } from "@inertiajs/react";

import MarkdownEditor from "../../Components/guest/Markdown/MarkdownEditor";

export default function Create({ auth, organizations, statuses }) {
  const { data, setData, errors, post, reset, processing, recentlySuccessful } =
    useForm({
      title: "",
      content: "",
      status_id: 3,
      published_date: calendarDateFormat(new Date()),
      publisher_id: organizations[0]?.id,
      image: null,
    });

  const [imagePreview, setImagePreview] = useState(null);

  const onCreateArticle = (e) => {
    e.preventDefault();

    post(route("article.store"), {
      preserveScroll: true,
      forceFormData: true,
      onSuccess: () => {
        reset();
        setImagePreview(null);
      },
    });
  };

  const handleImageChange = (e) => {
    const files = e.target.files;

    if (files && files.length > 0) {
      const file = files[0];
      setData("image", file);
      setImagePreview(URL.createObjectURL(file));
    } else {
      e.target.value = "";
    }
  };

  const handleContentChange = (content) => {
    setData("content", content);
  };

  const statusOptions = useMemo(
    () =>
      statuses.map((status) => (
        <option
          value={status.id}
          key={status.id}
          className="font-secondary capitalize"
        >
          {status.name}
        </option>
      )),
    [statuses]
  );

  const organizationOptions = useMemo(
    () =>
      organizations.map((organization) => (
        <option
          value={organization.id}
          key={organization.id}
          className="font-secondary capitalize"
        >
          {organization.name}
        </option>
      )),
    [organizations]
  );

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="font-secondary font-semibold text-xl text-gray-800 leading-tight">
          Create New Article
        </h2>
      }
    >
      <Head title="Create new Article" />
      <Wrapper>
        <form className="mt-6 space-y-6" onSubmit={onCreateArticle}>
          {/* Upload Image */}
          <div>
            <InputLabel htmlFor="image" value="Upload Gambar" />
            <input
              type="file"
              accept="image/*"
              id="image"
              onChange={handleImageChange}
              className="block mt-1"
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="mt-2 max-h-52 rounded border border-gray-300"
              />
            )}
            <InputError message={errors.image} className="mt-2" />
          </div>

          <div>
            <InputLabel htmlFor="title" value="Judul" />
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
            <InputLabel htmlFor="status" value="Status" />
            <select
              id="status"
              value={data.status_id}
              onChange={(e) => setData("status_id", e.target.value)}
              className="font-secondary mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none capitalize focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="" className="font-secondary">
                -- Pilih Status --
              </option>
              {statusOptions}
            </select>
            <InputError message={errors.status_id} className="mt-2" />
          </div>

          <div>
            <InputLabel htmlFor="published_date" value="Tanggal Publikasi" />
            <CustomDatePicker
              selectedDate={data.published_date}
              onDateChange={(date) => setData("published_date", date)}
            />
            <InputError message={errors.published_date} className="mt-2" />
          </div>

          <div>
            <InputLabel htmlFor="publisher" value="Publikasi sebagai :" />
            <select
              id="publisher"
              value={data.publisher_id}
              onChange={(e) => setData("publisher_id", e.target.value)}
              className="font-secondary mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none capitalize focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="" className="font-secondary">
                -- Pilih Publisher --
              </option>
              {organizationOptions}
            </select>
            <InputError message={errors.publisher_id} className="mt-2" />
          </div>

          <div>
            <InputLabel htmlFor="content" value="Konten Artikel" />
            <MarkdownEditor
              content={data.content}
              setContent={handleContentChange}
            />
            <InputError message={errors.content} className="mt-2" />
          </div>

          <div className="flex items-center gap-4">
            <PrimaryButton disabled={processing}>Save</PrimaryButton>
            <Transition
              show={recentlySuccessful}
              enter="transition ease-in-out"
              enterFrom="opacity-0"
              leave="transition ease-in-out"
              leaveTo="opacity-0"
            >
              <p className="text-sm text-gray-600 font-secondary">Saved.</p>
            </Transition>
          </div>
        </form>
      </Wrapper>
    </AuthenticatedLayout>
  );
}
