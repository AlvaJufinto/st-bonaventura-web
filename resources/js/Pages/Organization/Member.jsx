import React, { useState } from 'react';

import Button from '@/Components/admin/Button';
import Table from '@/Components/admin/Table';
import { useForm } from '@inertiajs/react';

export default function Manage({ organization, members: initialMembers }) {
  const [members, setMembers] = useState(initialMembers);
  const [editingId, setEditingId] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  // Form untuk edit
  const editForm = useForm({
    name: "",
    role: "",
  });

  // Form untuk tambah
  const addForm = useForm({
    name: "",
    role: "",
  });

  const startEdit = (member) => {
    setEditingId(member.id);
    editForm.setData({
      name: member.name ?? "",
      role: member.role?.name ?? "",
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    editForm.reset();
  };

  const saveEdit = (member) => {
    editForm.put(
      route("organization.updateMember", [organization.id, member.id]),
      {
        preserveScroll: true,
        onSuccess: () => {
          setMembers((prev) =>
            prev.map((m) =>
              m.id === member.id
                ? {
                    ...m,
                    name: editForm.data.name,
                    role: { name: editForm.data.role },
                  }
                : m
            )
          );
          cancelEdit();
        },
      }
    );
  };

  const showAddMember = () => {
    setShowAddForm(true);
    addForm.reset();
  };

  const cancelAdd = () => {
    setShowAddForm(false);
    addForm.reset();
  };

  const saveAdd = () => {
    addForm.post(route("organization.addMember", organization.id), {
      preserveScroll: true,
      onSuccess: (page) => {
        if (page.props?.new_member) {
          setMembers((prev) => [...prev, page.props.new_member]);
        } else {
          location.reload();
        }
        cancelAdd();
      },
    });
  };

  const deleteMember = (member) => {
    if (!confirm("Apakah Anda yakin ingin menghapus member ini?")) return;

    const { delete: destroy } = useForm();
    destroy(route("organization.deleteMember", [organization.id, member.id]), {
      onSuccess: () =>
        setMembers((prev) => prev.filter((m) => m.id !== member.id)),
    });
  };

  const columns = [
    {
      label: "Nama",
      render: (member) =>
        editingId === member.id ? (
          <div className="space-y-1">
            <input
              type="text"
              value={editForm.data.name}
              onChange={(e) => editForm.setData("name", e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Masukkan nama"
            />
            {editForm.errors.name && (
              <div className="text-sm text-red-600">{editForm.errors.name}</div>
            )}
          </div>
        ) : (
          <span className="font-medium">{member.name}</span>
        ),
    },
    {
      label: "Jabatan",
      render: (member) =>
        editingId === member.id ? (
          <div className="space-y-1">
            <input
              type="text"
              value={editForm.data.role}
              onChange={(e) => editForm.setData("role", e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Masukkan jabatan"
            />
            {editForm.errors.role && (
              <div className="text-sm text-red-600">{editForm.errors.role}</div>
            )}
          </div>
        ) : (
          <span className="text-gray-600">
            {member.role?.name || "Belum ada jabatan"}
          </span>
        ),
    },
    {
      label: "Aksi",
      align: "right",
      render: (member) => (
        <div className="flex items-center justify-end space-x-2">
          {editingId === member.id ? (
            <>
              <Button
                onClick={() => saveEdit(member)}
                disabled={editForm.processing || !editForm.data.name.trim()}
                size="sm"
              >
                {editForm.processing ? "Menyimpan..." : "Simpan"}
              </Button>
              <Button variant="outline" onClick={cancelEdit} size="sm">
                Batal
              </Button>
            </>
          ) : (
            <>
              <Button
                onClick={() => startEdit(member)}
                variant="outline"
                size="sm"
              >
                Edit
              </Button>
              <Button
                type="danger"
                onClick={() => deleteMember(member)}
                size="sm"
              >
                Hapus
              </Button>
            </>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h4 className="text-xl font-semibold text-gray-900 font-secondary">
            Anggota Organisasi
          </h4>
          <p className="text-sm text-gray-500 mt-1">
            {members.length} anggota terdaftar
          </p>
        </div>

        {!showAddForm && (
          <Button
            onClick={showAddMember}
            className="flex items-center space-x-2"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            <span>Buat Anggota Baru</span>
          </Button>
        )}
      </div>

      {/* Add Member Form */}
      {showAddForm && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h5 className="text-lg font-medium text-blue-900 mb-4 flex items-center space-x-2">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
              />
            </svg>
            <span>Tambah Anggota Baru</span>
          </h5>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nama Lengkap <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Masukkan nama lengkap anggota"
                value={addForm.data.name}
                onChange={(e) => addForm.setData("name", e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                autoFocus
              />
              {addForm.errors.name && (
                <div className="text-sm text-red-600 mt-1">
                  {addForm.errors.name}
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Jabatan <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Contoh: Sekretaris, Bendahara, Anggota"
                value={addForm.data.role}
                onChange={(e) => addForm.setData("role", e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              {addForm.errors.role && (
                <div className="text-sm text-red-600 mt-1">
                  {addForm.errors.role}
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <Button
              variant="outline"
              onClick={cancelAdd}
              disabled={addForm.processing}
            >
              Batal
            </Button>
            <Button
              onClick={saveAdd}
              disabled={
                addForm.processing ||
                !addForm.data.name.trim() ||
                !addForm.data.role.trim()
              }
            >
              {addForm.processing ? "Membuat Anggota..." : "Buat Anggota Baru"}
            </Button>
          </div>
        </div>
      )}

      {/* Members Table */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        {members.length > 0 ? (
          <Table data={members} columns={columns} />
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-2">
              <svg
                className="w-12 h-12 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">
              Belum ada anggota
            </h3>
            <p className="text-gray-500 mb-4">
              Buat anggota baru untuk organisasi ini dengan memasukkan nama dan
              jabatan
            </p>
            {!showAddForm && (
              <Button onClick={showAddMember}>Buat Anggota Pertama</Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
