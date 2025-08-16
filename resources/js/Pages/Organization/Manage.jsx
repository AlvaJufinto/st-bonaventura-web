import { useState } from "react";

import PlaceholderImg from "@/assets/img/placeholder.png";
import Badge from "@/Components/admin/Badge";
import Button from "@/Components/admin/Button";
import LazyImage from "@/Components/guest/LazyImage";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Wrapper from "@/Layouts/Wrapper";
import { titleName } from "@/utils";
import { Head, Link } from "@inertiajs/react";

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
            <LazyImage
              src={formattedBanner}
              alt="Banner "
              className="w-full h-[400px] object-cover rounded-md border border-gray-300"
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
                      organization.organization_type_id == 2
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
            <section>
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-lg font-medium font-secondary">
                  Daftar Anggota ({members.length})
                </h4>
                <Button variant="outline">Tambah Anggota</Button>
              </div>
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <Th>Nama</Th>
                      <Th>Jabatan</Th>
                      <th className="px-6 py-3">
                        <span className="sr-only">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {members.length === 0 ? (
                      <tr>
                        <td
                          colSpan={3}
                          className="px-6 py-8 text-center text-sm text-gray-500 font-secondary"
                        >
                          Belum ada anggota dalam organisasi ini
                        </td>
                      </tr>
                    ) : (
                      members.map((m) => (
                        <tr
                          key={m.id}
                          className="hover:bg-gray-50 transition-colors duration-150"
                        >
                          <Td>{m.name}</Td>
                          <Td>{m.role?.name || "Belum ada jabatan"}</Td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2 font-secondary">
                            <ActionButton>Edit</ActionButton>
                            <ActionButton danger>Hapus</ActionButton>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </section>
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

function Th({ children }) {
  return (
    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide font-secondary">
      {children}
    </th>
  );
}

function Td({ children }) {
  return (
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-secondary">
      {children}
    </td>
  );
}

function ActionButton({ children, danger }) {
  return (
    <button
      className={`font-secondary transition-colors duration-150 ${
        danger
          ? "text-red-600 hover:text-red-900"
          : "text-indigo-600 hover:text-indigo-900"
      }`}
    >
      {children}
    </button>
  );
}
