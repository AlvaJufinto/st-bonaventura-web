import { useState } from 'react';

import PlaceholderImg from '@/assets/img/placeholder.png';
import Badge from '@/Components/admin/Badge';
import Button from '@/Components/admin/Button';
import LazyImage from '@/Components/guest/LazyImage';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Wrapper from '@/Layouts/Wrapper';
import {
	organizationType,
	titleName,
} from '@/utils';
import {
	Head,
	Link,
} from '@inertiajs/react';

import Member from './Member';

export default function Manage({ auth, organization }) {
  const ASSET_URL = import.meta.env.VITE_PUBLIC_ASSET_URL;

  const {
    logo,
    banner,
    name,
    alternate_name,
    description,
    type,
    status,
    head,
    parent,
    address,
  } = organization;

  const [members] = useState([
    { id: 1, name: "Pak Anton Wijaya", role: { name: "Koordinator" } },
    { id: 2, name: "Bu Maria Sari", role: { name: "Sekretaris" } },
    { id: 3, name: "Pak Joko Santoso", role: { name: "Lektor" } },
    { id: 4, name: "Bu Agnes Putri", role: { name: "Organis" } },
    { id: 5, name: "Mas David Chen", role: { name: "Koor" } },
  ]);

  const formattedBanner = banner
    ? `${ASSET_URL}/uploads/${banner}`
    : PlaceholderImg;

  const formattedLogo = logo ? `${ASSET_URL}/uploads/${logo}` : PlaceholderImg;

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex justify-between items-center">
          <h2 className="font-secondary font-semibold text-xl text-gray-800">
            Kelola {organization.name}
          </h2>
        </div>
      }
    >
      <Head title={`Kelola ${organization.name}`} />
      <Wrapper>
        <div className="bg-white shadow-sm sm:rounded-lg">
          <div className="p-6 text-gray-900 font-secondary space-y-8">
            {/* Header Organisasi */}
            <img
              src={formattedBanner}
              alt="Banner "
              className="w-full !h-[400px] object-cover rounded-md border border-gray-300"
            />

            <section className="border-b border-gray-200 pb-6 flex items-start justify-between ">
              <div className="flex items-center space-x-6 w-full">
                <LazyImage
                  src={formattedLogo}
                  alt="Logo Organisasi"
                  className="!w-24 !h-24 object-cover rounded-md border border-gray-300"
                />

                <div className="flex items-start justify-between w-full ">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-semibold font-secondary">
                      {name}
                    </h3>
                    {alternate_name && (
                      <p className="text-gray-600 italic font-secondary">
                        {alternate_name}
                      </p>
                    )}
                    <Badge status={status} />
                  </div>
                  <Link href={route("organization.edit")}>
                    <Button>Edit Organisasi</Button>
                  </Link>
                </div>
              </div>
            </section>

            {/* Tentang */}
            {description && (
              <section>
                <h4 className="text-lg font-medium mb-3 font-secondary">
                  Tentang {name}
                </h4>
                <p className="text-gray-700 leading-relaxed font-secondary">
                  {description}
                </p>
              </section>
            )}

            {/* Informasi Dasar */}
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h4 className="text-lg font-medium mb-4 font-secondary">
                  Informasi Dasar
                </h4>
                <InfoItem
                  label={titleName[organization.organization_type_id]}
                  value={head?.name}
                />
                {parent && (
                  <InfoItem
                    label={
                      organization.organization_type_id ==
                      organizationType.Wilayah
                        ? "Wilayah"
                        : "Bidang Pelayanan"
                    }
                    value={parent.name}
                  />
                )}
                <InfoItem label="Tipe" value={type?.name} />
                {address && <InfoItem label="Alamat" value={address} />}
              </div>
            </section>

            {/* Daftar Anggota */}
            <Member members={members} organization={organization} />
          </div>
        </div>
      </Wrapper>
    </AuthenticatedLayout>
  );
}

function InfoItem({ label, value }) {
  return (
    <div>
      <div className="text-sm font-medium text-gray-500 font-secondary">
        {label}
      </div>
      <div className="text-sm text-gray-900 font-secondary">{value || "-"}</div>
    </div>
  );
}
