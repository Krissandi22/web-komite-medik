import React, { useState } from 'react';
import { UserAccount, UserRole } from '../../types';
import { UserCog, Plus, Shield, KeyRound, Search, Edit2, Trash2, CheckCircle2, XCircle, Lock, UserCheck } from 'lucide-react';

interface UserManagerProps {
  users: UserAccount[];
  onAddUser: (user: Omit<UserAccount, 'id'>) => void;
  onUpdateUser: (user: UserAccount) => void;
  onDeleteUser: (id: string) => void;
  onResetPassword: (id: string) => void;
  role?: UserRole;
}

export const UserManager: React.FC<UserManagerProps> = ({
  users,
  onAddUser,
  onUpdateUser,
  onDeleteUser,
  onResetPassword,
  role
}) => {
  const isKetua = role === 'ketua';
  const [filterRole, setFilterRole] = useState<string>('semua');
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<UserAccount | null>(null);

  const [formData, setFormData] = useState({
    username: '',
    name: '',
    email: '',
    role: 'dokter' as UserRole,
    unit: 'SMF Bedah',
    status: 'Aktif' as UserAccount['status']
  });

  const filteredUsers = users.filter((u) => {
    const matchSearch = u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        u.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        u.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchRole = filterRole === 'semua' || u.role === filterRole;
    return matchSearch && matchRole;
  });

  const handleOpenAdd = () => {
    setEditingUser(null);
    setFormData({
      username: '',
      name: '',
      email: '',
      role: 'dokter',
      unit: 'SMF Penyakit Dalam',
      status: 'Aktif'
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (user: UserAccount) => {
    setEditingUser(user);
    setFormData({
      username: user.username,
      name: user.name,
      email: user.email,
      role: user.role,
      unit: user.unit || 'SMF Bedah',
      status: user.status
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingUser) {
      onUpdateUser({
        ...editingUser,
        username: formData.username,
        name: formData.name,
        email: formData.email,
        role: formData.role,
        unit: formData.unit,
        status: formData.status
      });
    } else {
      onAddUser({
        username: formData.username,
        name: formData.name,
        email: formData.email,
        role: formData.role,
        unit: formData.unit,
        status: formData.status,
        lastLogin: 'Baru dibuat'
      });
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 font-sans">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#0B2D5C] to-[#005F73] text-white p-6 rounded-2xl shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-amber-400 font-bold text-xs uppercase tracking-wider mb-1">
            <UserCog className="w-4 h-4" />
            <span>Manajemen Pengguna & Otorisasi Sistem</span>
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight">
            User Management & Hak Akses
          </h1>
          <p className="text-xs text-slate-200 mt-1">
            Daftar akun Admin, Ketua Komite Medik, Dokter, dan Staf Medis RST Pematang Siantar.
          </p>
        </div>

        {!isKetua && (
          <button
            onClick={handleOpenAdd}
            className="flex items-center space-x-2 px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold text-xs rounded-xl shadow-md transition-all shrink-0"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>Tambah User Baru</span>
          </button>
        )}
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        
        {/* Role Tabs */}
        <div className="flex items-center space-x-1 bg-slate-100 p-1 rounded-xl w-full sm:w-auto">
          <button
            onClick={() => setFilterRole('semua')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
              filterRole === 'semua' ? 'bg-white text-[#0B2D5C] shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Semua Role ({users.length})
          </button>
          <button
            onClick={() => setFilterRole('dokter')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
              filterRole === 'dokter' ? 'bg-white text-[#0B2D5C] shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Dokter / Staf ({users.filter(u => u.role === 'dokter').length})
          </button>
          <button
            onClick={() => setFilterRole('ketua')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
              filterRole === 'ketua' ? 'bg-white text-[#0B2D5C] shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Ketua Komite ({users.filter(u => u.role === 'ketua').length})
          </button>
          <button
            onClick={() => setFilterRole('admin')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
              filterRole === 'admin' ? 'bg-white text-[#0B2D5C] shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Admin ({users.filter(u => u.role === 'admin').length})
          </button>
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Cari nama / username / email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-[#008080] outline-none"
          />
        </div>

      </div>

      {/* Users Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs text-slate-700">
            <thead>
              <tr className="bg-[#0B2D5C] text-white font-bold uppercase tracking-wider text-[11px]">
                <th className="py-3.5 px-4">Nama User</th>
                <th className="py-3.5 px-4">Username & Email</th>
                <th className="py-3.5 px-4">Role Akses</th>
                <th className="py-3.5 px-4">Unit Kerja</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Login Terakhir</th>
                {!isKetua && <th className="py-3.5 px-4 text-center">Aksi / Kontrol</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="font-extrabold text-slate-900">{user.name}</div>
                    {user.specialty && <div className="text-[10px] text-[#008080] font-semibold">{user.specialty}</div>}
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="font-mono font-bold text-slate-800">@{user.username}</div>
                    <div className="text-[10px] text-slate-500">{user.email}</div>
                  </td>

                  <td className="py-3.5 px-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                      user.role === 'admin' ? 'bg-amber-100 text-amber-900 border border-amber-300' :
                      user.role === 'ketua' ? 'bg-purple-100 text-purple-900 border border-purple-300' :
                      'bg-emerald-100 text-emerald-900 border border-emerald-300'
                    }`}>
                      {user.role === 'admin' ? 'Admin Sistem' : user.role === 'ketua' ? 'Ketua Komite' : 'Dokter / Staf Medis'}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 font-semibold text-slate-800">
                    {user.unit || 'Komite Medik'}
                  </td>

                  <td className="py-3.5 px-4">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold ${
                      user.status === 'Aktif' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                    }`}>
                      <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                      {user.status}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 font-mono text-[11px] text-slate-500">
                    {user.lastLogin || '-'}
                  </td>

                  {!isKetua && (
                    <td className="py-3.5 px-4 text-center">
                      <div className="flex items-center justify-center space-x-1">
                        <button
                          onClick={() => onResetPassword(user.id)}
                          className="p-1.5 text-amber-600 hover:bg-amber-50 rounded-lg transition-colors flex items-center gap-1 text-[10px] font-bold"
                          title="Reset Password"
                        >
                          <KeyRound className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">Reset</span>
                        </button>

                        <button
                          onClick={() => handleOpenEdit(user)}
                          className="p-1.5 text-slate-600 hover:text-[#008080] hover:bg-slate-100 rounded-lg transition-colors"
                          title="Edit User"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => onDeleteUser(user.id)}
                          className="p-1.5 text-slate-600 hover:text-rose-600 hover:bg-slate-100 rounded-lg transition-colors"
                          title="Hapus User"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL ADD / EDIT USER */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full border border-slate-200 overflow-hidden">
            <div className="bg-[#0B2D5C] text-white p-4 flex items-center justify-between">
              <h3 className="font-bold text-sm">
                {editingUser ? 'Edit User & Hak Akses' : 'Tambah User Pengguna Baru'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-300 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleSubmit} className="p-5 space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Nama Lengkap & Gelar *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl outline-none font-semibold"
                  placeholder="dr. Contoh Name, Sp.B"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Username *</label>
                  <input
                    type="text"
                    required
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl outline-none font-mono"
                    placeholder="dr.contoh"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Email *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl outline-none"
                    placeholder="email@rst-siantar.mil.id"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Role Akses *</label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value as UserRole })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-bold"
                  >
                    <option value="dokter">Dokter / Staf</option>
                    <option value="ketua">Ketua Komite Medik</option>
                    <option value="admin">Admin Sistem</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Status *</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-bold"
                  >
                    <option value="Aktif">🟢 Aktif</option>
                    <option value="Nonaktif">🔴 Nonaktif</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Unit Kerja / SMF</label>
                <input
                  type="text"
                  value={formData.unit}
                  onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-semibold"
                  placeholder="SMF Bedah / Sekretariat"
                />
              </div>

              <div className="pt-3 border-t border-slate-200 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-slate-200 text-slate-700 font-bold rounded-xl"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#008080] text-white font-bold rounded-xl shadow-xs"
                >
                  Simpan User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
