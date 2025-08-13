import { useState } from "react";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Wrapper from "@/Layouts/Wrapper";
import { Head } from "@inertiajs/react";

export default function Manage({ auth }) {
  // Dummy data sesuai struktur migration
  const [organization] = useState({
    banner: null, // Biasanya organisasi gereja ga pake banner fancy
    logo: null,
    name: "Tim Liturgi St. Paulus",
    alternate_name: "Litur",
    description:
      "Tim yang bertugas mengatur dan mempersiapkan liturgi setiap minggu serta hari raya gereja.",
    slug: "tim-liturgi-st-paulus",
    organization_type: { id: 1, name: "Tim Pelayanan" },
    status: { id: 3, name: "Aktif" },
    head: { id: auth.user.id, name: auth.user.name },
    parent: { id: 2, name: "Paroki St. Paulus Jakarta" },
    address: "Gereja St. Paulus, Jl. Salemba Raya No. 10, Jakarta Pusat",
    created_at: "2023-01-15 09:00:00",
    updated_at: "2025-08-10 14:30:00",
    members: [
      { id: 1, name: "Pak Anton Wijaya", role: { name: "Koordinator" } },
      { id: 2, name: "Bu Maria Sari", role: { name: "Sekretaris" } },
      { id: 3, name: "Pak Joko Santoso", role: { name: "Lektor" } },
      { id: 4, name: "Bu Agnes Putri", role: { name: "Organis" } },
      { id: 5, name: "Mas David Chen", role: { name: "Koor" } },
    ],
  });

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex justify-between items-center">
          <h2 className="font-secondary font-semibold text-xl text-gray-800 leading-tight">
            Kelola Organisasi Saya
          </h2>
        </div>
      }
    >
      <Head title="Kelola Organisasi Saya" />

      <Wrapper>
        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
          <div className="p-6 text-gray-900 font-secondary">
            {/* Header Organisasi */}
            <div className="border-b border-gray-200 pb-6 mb-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-6">
                  {organization.logo && (
                    <img
                      src={organization.logo}
                      alt="Logo Organisasi"
                      className="w-16 h-16 object-cover rounded-md border border-gray-300"
                    />
                  )}
                  <div className="space-y-4">
                    <button className="inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150 font-secondary">
                      Edit Organisasi
                    </button>
                    <h3 className="text-2xl font-semibold text-gray-900 mb-1 font-secondary">
                      {organization.name}
                    </h3>

                    {organization.alternate_name && (
                      <p className="text-gray-600 italic mb-2 font-secondary">
                        ({organization.alternate_name})
                      </p>
                    )}
                    <div className="flex items-center space-x-4 text-sm font-secondary">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          organization.status.name === "Aktif"
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {organization.status.name}
                      </span>
                      <span className="text-gray-600 font-secondary">
                        {organization.organization_type.name}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Deskripsi */}
            {organization.description && (
              <div className="mb-8">
                <h4 className="text-lg font-medium text-gray-900 mb-3 font-secondary">
                  Tentang {organization.name}
                </h4>
                <p className="text-gray-700 leading-relaxed font-secondary">
                  {organization.description}
                </p>
              </div>
            )}

            {/* Detail Organisasi dalam Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-4 font-secondary">
                  Informasi Dasar
                </h4>
                <dl className="space-y-4 font-secondary">
                  <div>
                    <dt className="text-sm font-medium text-gray-500 mb-1 font-secondary">
                      Koordinator/Ketua
                    </dt>
                    <dd className="text-sm text-gray-900 font-secondary">
                      {organization.head.name}
                    </dd>
                  </div>
                  {organization.parent && (
                    <div>
                      <dt className="text-sm font-medium text-gray-500 mb-1 font-secondary">
                        Organisasi Induk
                      </dt>
                      <dd className="text-sm text-gray-900 font-secondary">
                        {organization.parent.name}
                      </dd>
                    </div>
                  )}
                  <div>
                    <dt className="text-sm font-medium text-gray-500 mb-1 font-secondary">
                      Tipe Organisasi
                    </dt>
                    <dd className="text-sm text-gray-900 font-secondary">
                      {organization.organization_type.name}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500 mb-1 font-secondary">
                      Slug
                    </dt>
                    <dd className="text-sm text-gray-900 font-secondary">
                      <code className="bg-gray-100 px-2 py-1 rounded text-xs font-mono">
                        {organization.slug}
                      </code>
                    </dd>
                  </div>
                </dl>
              </div>

              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-4 font-secondary">
                  Lokasi & Waktu
                </h4>
                <dl className="space-y-4 font-secondary">
                  <div>
                    <dt className="text-sm font-medium text-gray-500 mb-1 font-secondary">
                      Alamat
                    </dt>
                    <dd className="text-sm text-gray-900 font-secondary">
                      {organization.address || "Belum diatur"}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500 mb-1 font-secondary">
                      Dibuat pada
                    </dt>
                    <dd className="text-sm text-gray-900 font-secondary">
                      {formatDate(organization.created_at)}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500 mb-1 font-secondary">
                      Terakhir diupdate
                    </dt>
                    <dd className="text-sm text-gray-900 font-secondary">
                      {formatDate(organization.updated_at)}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>

            {/* Daftar Anggota */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-lg font-medium text-gray-900 font-secondary">
                  Daftar Anggota ({organization.members.length})
                </h4>
                <button className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md font-semibold text-xs text-gray-700 uppercase tracking-widest shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150 font-secondary">
                  Tambah Anggota
                </button>
              </div>

              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide font-secondary">
                        Nama
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide font-secondary">
                        Jabatan
                      </th>
                      <th className="relative px-6 py-3">
                        <span className="sr-only">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {organization.members.length === 0 ? (
                      <tr>
                        <td
                          colSpan={3}
                          className="px-6 py-8 text-center text-sm text-gray-500 font-secondary"
                        >
                          Belum ada anggota dalam organisasi ini
                        </td>
                      </tr>
                    ) : (
                      organization.members.map((member) => (
                        <tr
                          key={member.id}
                          className="hover:bg-gray-50 transition-colors duration-150"
                        >
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 font-secondary">
                            {member.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-secondary">
                            {member.role?.name || "Belum ada jabatan"}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2 font-secondary">
                            <button className="text-indigo-600 hover:text-indigo-900 transition-colors duration-150 font-secondary">
                              Edit
                            </button>
                            <button className="text-red-600 hover:text-red-900 transition-colors duration-150 font-secondary">
                              Hapus
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    </AuthenticatedLayout>
  );
}
