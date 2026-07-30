import React, { useState } from 'react';
import { User, Shield, KeyRound, Mail, Phone, Save, CheckCircle2, Building2, UserCheck, Lock } from 'lucide-react';
import { UserRole } from '../../types';

interface AdminProfileViewProps {
  role?: UserRole;
}

export const AdminProfileView: React.FC<AdminProfileViewProps> = ({ role = 'admin' }) => {
  const isKetua = role === 'ketua';
  const [name, setName] = useState(isKetua ? 'Kolonel Ckm dr. Hendra Setiawan, Sp.B' : 'Administrator Komite Medik');
  const [username, setUsername] = useState(isKetua ? 'ketua.kommed' : 'admin.rst');
  const [email, setEmail] = useState(isKetua ? 'ketua.kommed@rstsiantar.go.id' : 'admin.kommed@rstsiantar.go.id');
  const [phone, setPhone] = useState(isKetua ? '0811-6200-788' : '0812-6029-3881');
  const [unit, setUnit] = useState(isKetua ? 'Ketua Komite Medik RST Pematang Siantar' : 'Sekretariat Komite Medik RST');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSaved, setIsSaved] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError('');

    if (newPassword && newPassword !== confirmPassword) {
      setPasswordError('Konfirmasi password baru tidak cocok!');
      return;
    }

    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  return (
    <div className="space-y-6 font-sans max-w-5xl mx-auto">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#0B2D5C] via-[#005F73] to-[#008080] text-white p-6 rounded-2xl shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-2xl bg-amber-400 text-[#0B2D5C] font-extrabold flex items-center justify-center text-xl shadow-md shrink-0 border-2 border-white">
            {isKetua ? 'KM' : 'AD'}
          </div>
          <div>
            <div className="flex items-center space-x-2 text-amber-300 font-bold text-xs uppercase tracking-wider mb-0.5">
              <Shield className="w-4 h-4" />
              <span>{isKetua ? 'Profil Ketua Komite Medik' : 'Profil Pengguna & Hak Akses Administrator'}</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight">{name}</h1>
            <p className="text-xs text-slate-200 mt-0.5">
              {isKetua ? 'Ketua Komite Medik • RST Pematang Siantar' : 'Super Admin System • RST Pematang Siantar'}
            </p>
          </div>
        </div>

        <div className="bg-white/10 px-3 py-2 rounded-xl border border-white/20 backdrop-blur-xs text-xs font-bold text-amber-300 shrink-0">
          ● Status Akun: {isKetua ? 'Aktif Ketua Komite' : 'Aktif Super User'}
        </div>
      </div>

      {isSaved && (
        <div className="p-4 bg-emerald-100 border border-emerald-300 text-emerald-900 rounded-2xl text-xs font-bold flex items-center space-x-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Profil Administrator berhasil diperbarui!</span>
        </div>
      )}

      {passwordError && (
        <div className="p-4 bg-rose-100 border border-rose-300 text-rose-900 rounded-2xl text-xs font-bold">
          {passwordError}
        </div>
      )}

      {/* Main Form */}
      <form onSubmit={handleSaveProfile} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Personal Details */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4 text-xs">
          <div className="flex items-center space-x-2 text-[#0B2D5C] font-extrabold text-sm border-b border-slate-200 pb-3">
            <User className="w-4 h-4 text-[#008080]" />
            <span>Informasi Identitas Administrator</span>
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Nama Lengkap Administrator:</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-bold text-slate-800 focus:ring-2 focus:ring-[#008080] outline-none"
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Username Login Sistem:</label>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-mono text-slate-800 focus:ring-2 focus:ring-[#008080] outline-none"
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Alamat Email Resmi:</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl font-medium text-slate-800 focus:ring-2 focus:ring-[#008080] outline-none"
              />
            </div>
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Nomor Telepon / WA:</label>
            <div className="relative">
              <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl font-medium text-slate-800 focus:ring-2 focus:ring-[#008080] outline-none"
              />
            </div>
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Unit Kerja / Divisi:</label>
            <div className="relative">
              <Building2 className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl font-medium text-slate-800 focus:ring-2 focus:ring-[#008080] outline-none"
              />
            </div>
          </div>
        </div>

        {/* Security & Password */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4 text-xs flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-[#0B2D5C] font-extrabold text-sm border-b border-slate-200 pb-3">
              <KeyRound className="w-4 h-4 text-[#008080]" />
              <span>Ganti Keamanan Password</span>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Password Saat Ini:</label>
              <input
                type="password"
                placeholder="Masukkan password lama..."
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-medium text-slate-800 focus:ring-2 focus:ring-[#008080] outline-none"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Password Baru:</label>
              <input
                type="password"
                placeholder="Minimal 8 karakter campuran huruf & angka..."
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-medium text-slate-800 focus:ring-2 focus:ring-[#008080] outline-none"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Konfirmasi Password Baru:</label>
              <input
                type="password"
                placeholder="Ulangi password baru..."
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-medium text-slate-800 focus:ring-2 focus:ring-[#008080] outline-none"
              />
            </div>

            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-900 text-[11px] space-y-1">
              <span className="font-bold block">💡 Keamanan Akses:</span>
              <p>Perubahan profil dan password ini berlaku langsung untuk login Admin Sistem Komite Medik.</p>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200 flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 bg-[#0B2D5C] hover:bg-[#082247] text-white font-bold rounded-xl shadow-md transition-all flex items-center space-x-2"
            >
              <Save className="w-4 h-4 text-amber-400" />
              <span>Simpan Profil Admin</span>
            </button>
          </div>
        </div>

      </form>

    </div>
  );
};
