import { useRef, useState } from "react";

import InputError from "@/Components/admin/InputError";
import InputLabel from "@/Components/admin/InputLabel";
import PrimaryButton from "@/Components/admin/PrimaryButton";
import TextInput from "@/Components/admin/TextInput";
import { Transition } from "@headlessui/react";
import { Link, useForm, usePage } from "@inertiajs/react";

export default function UpdateProfileInformation({
  mustVerifyEmail,
  status,
  className = "",
}) {
  const ASSET_URL = import.meta.env.VITE_PUBLIC_ASSET_URL;
  const user = usePage().props.auth.user;
  const fileInputRef = useRef(null);

  const [previewUrl, setPreviewUrl] = useState(null); // Hanya untuk file baru
  const [shouldRemoveExisting, setShouldRemoveExisting] = useState(false);

  const { data, setData, post, patch, errors, processing, recentlySuccessful } =
    useForm({
      name: user.name,
      email: user.email,
      profile_picture: null,
      remove_profile_picture: false,
    });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validasi tipe file
      const allowedTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/gif",
      ];
      if (!allowedTypes.includes(file.type)) {
        alert("Please select a valid image file (JPEG, JPG, PNG, GIF)");
        return;
      }

      if (file.size > 2048 * 1024) {
        alert("File size must be less than 2MB");
        return;
      }

      // Set file baru
      setData("profile_picture", file);
      setData("remove_profile_picture", false);
      setShouldRemoveExisting(false);

      // Generate preview untuk file baru
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewUrl(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    // Reset file input
    setData("profile_picture", null);
    setPreviewUrl(null);

    // Jika ada existing profile picture, mark untuk removal
    if (user.profile_picture) {
      setData("remove_profile_picture", true);
      setShouldRemoveExisting(true);
    } else {
      setData("remove_profile_picture", false);
      setShouldRemoveExisting(false);
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const submit = (e) => {
    e.preventDefault();

    // Jika ada file upload atau removal request, gunakan POST route
    if (data.profile_picture || data.remove_profile_picture) {
      post(route("profile.update.file"), {
        forceFormData: true,
        preserveScroll: true,
        onSuccess: () => {
          // Reset local state setelah berhasil
          // setPreviewUrl(null);
          // setShouldRemoveExisting(false);
        },
        onError: (errors) => {},
      });
    } else {
      // Jika tidak ada perubahan file, gunakan PATCH route biasa
      patch(route("profile.update"), {
        preserveScroll: true,
        onSuccess: () => {},
        onError: (errors) => {},
      });
    }
  };

  // Function untuk menentukan gambar yang ditampilkan
  const getDisplayImageUrl = () => {
    // Jika akan menghapus existing image
    if (shouldRemoveExisting) {
      return null;
    }

    // Jika ada file baru yang dipilih
    if (previewUrl && data.profile_picture) {
      return previewUrl;
    }

    // Jika ada existing profile picture dan tidak ada perubahan
    if (user.profile_picture && !data.profile_picture) {
      return `${ASSET_URL}/uploads/${user.profile_picture}`;
    }

    return null;
  };

  const displayImageUrl = getDisplayImageUrl();
  const hasImage = displayImageUrl !== null;

  return (
    <section className={className}>
      <header>
        <h2 className="text-lg font-medium text-gray-900 font-secondary">
          Profile Information
        </h2>

        <p className="mt-1 text-sm text-gray-600 font-secondary">
          Update your account's profile information and email address.
        </p>
      </header>

      <form onSubmit={submit} className="mt-6 space-y-6">
        {/* Profile Picture Upload */}
        <div>
          <InputLabel htmlFor="profile_picture" value="Profile Picture" />

          <div className="mt-2 flex items-center space-x-6">
            {/* Image Preview */}
            <div className="relative">
              {hasImage ? (
                <img
                  src={displayImageUrl}
                  alt="Profile preview"
                  className="w-20 h-20 rounded-full object-cover border-2 border-gray-300"
                />
              ) : (
                <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center border-2 border-gray-300">
                  <svg
                    className="w-8 h-8 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
              )}
            </div>

            {/* Upload Controls */}
            <div className="flex flex-col space-y-2">
              <input
                ref={fileInputRef}
                type="file"
                id="profile_picture"
                accept="image/jpeg,image/jpg,image/png,image/gif"
                onChange={handleFileChange}
                className="hidden"
              />

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="font-secondary px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {hasImage ? "Change Image" : "Choose Image"}
              </button>

              {(hasImage || shouldRemoveExisting) && (
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="font-secondary px-4 py-2 bg-red-600 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Remove Image
                </button>
              )}
            </div>
          </div>

          {/* Status messages */}
          {shouldRemoveExisting && (
            <p className="font-secondary mt-2 text-sm text-orange-600">
              Profile picture will be removed when you save.
            </p>
          )}

          <p className="font-secondary mt-2 text-sm text-gray-500">
            JPG, JPEG, PNG or GIF. Max size 2MB.
          </p>

          <InputError className="mt-2" message={errors.profile_picture} />
        </div>

        <div>
          <InputLabel htmlFor="name" value="Name" />

          <TextInput
            id="name"
            className="mt-1 block w-full"
            value={data.name}
            onChange={(e) => setData("name", e.target.value)}
            required
            isFocused
            autoComplete="name"
          />

          <InputError className="mt-2" message={errors.name} />
        </div>

        <div>
          <InputLabel htmlFor="email" value="Email" />

          <TextInput
            id="email"
            type="email"
            className="mt-1 block w-full"
            value={data.email}
            onChange={(e) => setData("email", e.target.value)}
            required
            autoComplete="username"
          />

          <InputError className="mt-2" message={errors.email} />
        </div>

        {mustVerifyEmail && user.email_verified_at === null && (
          <div>
            <p className="text-sm mt-2 text-gray-800">
              Your email address is unverified.
              <Link
                href={route("verification.send")}
                method="post"
                as="button"
                className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Click here to re-send the verification email.
              </Link>
            </p>

            {status === "verification-link-sent" && (
              <div className="mt-2 font-medium text-sm text-green-600">
                A new verification link has been sent to your email address.
              </div>
            )}
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
            <p className="text-sm text-gray-600 font-secondary">Saved.</p>
          </Transition>
        </div>
      </form>
    </section>
  );
}
