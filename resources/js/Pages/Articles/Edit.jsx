import { useEffect, useMemo, useState } from "react";

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
import { Head, router, useForm } from "@inertiajs/react";

import MarkdownEditor from "../../Components/guest/Markdown/MarkdownEditor";

export default function Edit({
  auth,
  organizations,
  statuses,
  article,
  articleTypes,
}) {
  const PUBLIC_ASSET_URL = import.meta.env.VITE_PUBLIC_ASSET_URL;

  const { data, setData, errors, patch, processing, recentlySuccessful } =
    useForm({
      title: article?.title,
      content: article?.content,
      status_id: article?.status_id || 3,
      article_type_id: article?.article_type_id || 1,
      published_date: article?.published_date
        ? calendarDateFormat(new Date(article.published_date))
        : calendarDateFormat(new Date()),
      publisher_id: article?.publisher_id || organizations[0]?.id,
      image: null,
      expired_date: article?.expired_date
        ? calendarDateFormat(new Date(article.expired_date))
        : calendarDateFormat(new Date()),
    });

  const [imagePreview, setImagePreview] = useState(null);
  const [currentImage, setCurrentImage] = useState(null);

  useEffect(() => {
    if (article.main_image_name) {
      setCurrentImage(`${PUBLIC_ASSET_URL}/uploads/${article.main_image_name}`);
    }
  }, [article.main_image_name, PUBLIC_ASSET_URL]); // Tambahkan PUBLIC_ASSET_URL ke dependency array

  const onUpdateArticle = (e) => {
    e.preventDefault();

    const formData = new FormData();

    // Add all form fields to FormData
    formData.append("title", data.title || "");
    formData.append("content", data.content || "");
    formData.append("status_id", data.status_id || "");
    formData.append("article_type_id", data.article_type_id || "");
    formData.append("published_date", data.published_date || "");
    formData.append("publisher_id", data.publisher_id || "");

    if (data.article_type_id == 3 && data.expired_date) {
      formData.append("expired_date", data.expired_date);
    }

    if (data.image) {
      formData.append("image", data.image);
    }

    formData.append("_method", "PATCH");

    router.post(route("article.update", article.id), formData, {
      onSuccess: () => {
        setImagePreview(null);
      },
      onError: (errors) => {
        console.error("Update errors:", errors);
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

  // Pastikan articleTypes tersedia di props atau dari sumber lain jika tidak ada di 'article'
  const articleTypeOptions = useMemo(
    () =>
      articleTypes.map(
        (
          articleType // Gunakan articleTypes dari props
        ) => (
          <option
            value={articleType.id}
            key={articleType.id}
            className="font-secondary capitalize"
          >
            {articleType.name}
          </option>
        )
      ),
    [articleTypes] // Dependensi ke prop articleTypes
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
          Edit Article: {article?.title}
        </h2>
      }
    >
      <Head title={`Edit Article: ${article?.title}`} />
      <Wrapper>
        <PrimaryButton
          onClick={() => router.visit(route("article.index"))}
          disabled={processing}
        >
          Kembali
        </PrimaryButton>
        <form className="mt-6 space-y-6" onSubmit={onUpdateArticle}>
          {/* Upload Image */}
          <div>
            <InputLabel htmlFor="image" value="Upload Gambar" />

            {/* Show current image if exists */}
            {currentImage && !imagePreview && (
              <div className="mt-2 mb-3">
                <p className="text-sm text-gray-600 mb-2">Gambar saat ini:</p>
                <img
                  src={currentImage}
                  alt="Current image"
                  className="max-h-52 rounded border border-gray-300"
                />
              </div>
            )}

            <input
              type="file"
              accept="image/*"
              id="image"
              onChange={handleImageChange}
              className="block mt-1"
            />
            <p className="text-sm text-gray-500 mt-1 font-secondary">
              Biarkan kosong jika tidak ingin mengubah gambar
            </p>

            {/* Show new image preview */}
            {imagePreview && (
              <div className="mt-2">
                <p className="text-sm text-gray-600 mb-2">
                  Preview gambar baru:
                </p>
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="max-h-52 rounded border border-gray-300"
                />
              </div>
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

          {/* Added Article Type selection, similar to Create.jsx */}
          <div>
            <InputLabel htmlFor="article_type" value="Tipe Artikel" />
            <select
              id="article_type"
              value={data.article_type_id}
              onChange={(e) => setData("article_type_id", e.target.value)}
              className="font-secondary mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none capitalize focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="" className="font-secondary">
                -- Pilih Type --
              </option>
              {articleTypeOptions}
            </select>
            <InputError message={errors.article_type_id} className="mt-2" />
          </div>

          {/* Conditional Expired Date, similar to Create.jsx */}
          {data.article_type_id == 3 && (
            <div>
              <InputLabel
                htmlFor="expired_date"
                value="Tanggal Pengumuman Expired"
              />
              <CustomDatePicker
                selectedDate={data.expired_date}
                onDateChange={(date) => setData("expired_date", date)}
              />
              <InputError message={errors.expired_date} className="mt-2" />
            </div>
          )}

          <div>
            <InputLabel htmlFor="publisher" value="Publikasi sebagai :" />
            <select
              id="publisher"
              value={data.publisher_id}
              onChange={(e) => setData("publisher_id", e.target.value)}
              className="font-secondary mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none capitalize focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="" className="font-secondary">
                -- Pilih Type --
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
            <PrimaryButton disabled={processing}>
              {processing ? "Updating..." : "Update Article"}
            </PrimaryButton>
            <Transition
              show={recentlySuccessful}
              enter="transition ease-in-out"
              enterFrom="opacity-0"
              leave="transition ease-in-out"
              leaveTo="opacity-0"
            >
              <p className="text-sm text-gray-600 font-secondary">
                Updated successfully.
              </p>
            </Transition>
          </div>
        </form>
      </Wrapper>
    </AuthenticatedLayout>
  );
}
