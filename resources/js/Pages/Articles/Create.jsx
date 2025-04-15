import InputError from "@/Components/admin/InputError";
import InputLabel from "@/Components/admin/InputLabel";
import PrimaryButton from "@/Components/admin/PrimaryButton";
import TextInput from "@/Components/admin/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Wrapper from "@/Layouts/Wrapper";
import { Transition } from "@headlessui/react";
import { Head, useForm } from "@inertiajs/react";

export default function Create({ auth, articleStatus }) {
  const { data, setData, errors, put, reset, processing, recentlySuccessful } =
    useForm({
      title: "",
      content: "",
      status: "",
      publishedDate: "",
      publisher: "",
    });

  const createArticle = (e) => {
    e.preventDefault();

    // put(route("articles.store"), {
    //   preserveScroll: true,
    //   onSuccess: () => reset(),
    //   onError: (errors) => {
    //     if (errors.password) {
    //       reset("password", "password_confirmation");
    //       passwordInput.current.focus();
    //     }

    //     if (errors.current_password) {
    //       reset("current_password");
    //       currentPasswordInput.current.focus();
    //     }
    //   },
    // });
  };
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
          Create New Article
        </h2>
      }
    >
      <Head title="Create new Article" />
      <Wrapper>
        <form onSubmit={createArticle} className="mt-6 space-y-6">
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
            <InputLabel htmlFor="status" value="Status" />
            <select
              id="status"
              value={data.status}
              onChange={(e) => setData("status", e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none capitalize focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              {articleStatus.map((status, idx) => (
                <option value={status} key={idx} className="capitalize">
                  {status}
                </option>
              ))}
            </select>
            <InputError message={errors.status} className="mt-2" />
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
              <p className="text-sm text-gray-600">Saved.</p>
            </Transition>
          </div>
        </form>
      </Wrapper>
    </AuthenticatedLayout>
  );
}
