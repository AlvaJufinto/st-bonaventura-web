import { useState } from 'react';

import PlaceholderImg from '@/assets/img/placeholder.png';
import Button from '@/Components/admin/Button';
import InputError from '@/Components/admin/InputError';
import InputLabel from '@/Components/admin/InputLabel';
import TextInput from '@/Components/admin/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { organizationType } from '@/utils';
import {
	Head,
	Link,
	useForm,
} from '@inertiajs/react';

export default function Edit({ auth, organization }) {
  const ASSET_URL = import.meta.env.VITE_PUBLIC_ASSET_URL;

  const [bannerPreview, setBannerPreview] = useState(
    organization.banner
      ? `${ASSET_URL}/uploads/${organization.banner}`
      : PlaceholderImg
  );
  const [logoPreview, setLogoPreview] = useState(
    organization.logo
      ? `${ASSET_URL}/uploads/${organization.logo}`
      : PlaceholderImg
  );

  const { data, setData, post, processing, errors } = useForm({
    banner: null,
    logo: null,
    name: organization.name || "",
    alternate_name: organization.alternate_name || "",
    description: organization.description || "",
    address: organization.address || "",
    _method: "PUT",
  });

  const handleImageChange = (e, field, setPreview) => {
    const file = e.target.files[0];
    if (!file) return;

    const allowedTypes = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      alert("Only PNG, JPG, JPEG, or WEBP files are allowed.");
      e.target.value = "";
      return;
    }

    setData(field, file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route("organization.update", organization.id));
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="font-semibold text-xl text-gray-800 leading-tight font-secondary">
          Edit Organization
        </h2>
      }
    >
      <Head title="Edit Organization" />

      <div className="py-12">
        <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white shadow-sm sm:rounded-lg p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Banner */}
              <Link href={route("organization.manage")}>
                <Button type="primary">Kembali</Button>
              </Link>
              <div>
                <InputLabel value="Banner" />
                <img
                  src={bannerPreview}
                  alt="Banner Preview"
                  className="w-full max-h-48 object-cover rounded-md mb-2 border"
                />
                <input
                  type="file"
                  accept="image/png,image/jpeg,image/jpg,image/webp"
                  onChange={(e) =>
                    handleImageChange(e, "banner", setBannerPreview)
                  }
                  className="block w-full text-sm text-gray-600"
                />
                <InputError message={errors.banner} className="mt-1" />
              </div>

              {/* Logo */}
              <div>
                <InputLabel value="Logo" />
                <img
                  src={logoPreview}
                  alt="Logo Preview"
                  className="w-32 h-32 object-contain rounded-md mb-2 border"
                />
                <input
                  type="file"
                  accept="image/png,image/jpeg,image/jpg,image/webp"
                  onChange={(e) => handleImageChange(e, "logo", setLogoPreview)}
                  className="block w-full text-sm text-gray-600"
                />
                <InputError message={errors.logo} className="mt-1" />
              </div>

              {/* Nama */}
              <div>
                <InputLabel value="Nama" />
                <TextInput
                  value={data.name}
                  onChange={(e) => setData("name", e.target.value)}
                  className="w-full"
                  disabled
                />
                <InputError message={errors.name} className="mt-1" />
              </div>

              {/* Nama kedua */}
              <div>
                <InputLabel value="Nama kedua" />
                <TextInput
                  value={data.alternate_name}
                  onChange={(e) => setData("alternate_name", e.target.value)}
                  className="w-full"
                />
                <InputError message={errors.alternate_name} className="mt-1" />
              </div>

              {/* Address */}
              {organization.organization_type_id !== organizationType.Wilayah ||
                (organization.organization_type_id !==
                  organizationType.Lingkungan && (
                  <div>
                    <InputLabel value="Address" />
                    <textarea
                      value={data.address}
                      onChange={(e) => setData("address", e.target.value)}
                      className="w-full border-gray-300 rounded-md font-secondary"
                    />
                    <InputError message={errors.address} className="mt-1" />
                  </div>
                ))}

              {/* Description */}
              <div>
                <InputLabel value="Description" />
                <textarea
                  value={data.description}
                  onChange={(e) => setData("description", e.target.value)}
                  className="w-full border-gray-300 rounded-md font-secondary"
                />
                <InputError message={errors.description} className="mt-1" />
              </div>

              <div className="flex gap-2 pt-4">
                <Link href={route("organization.manage")}>
                  <Button type="danger">Batal</Button>
                </Link>
                <Button type="primary" isLoading={processing}>
                  Simpan
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
