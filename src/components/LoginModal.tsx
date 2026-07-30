import React, { useState } from 'react';
import { UserRole } from '../types';
import { X, ShieldCheck, Lock, User, KeyRound, CheckCircle2, ArrowRight, Stethoscope, Award, Building2, Eye, EyeOff } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (role: UserRole) => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess
}) => {
  const [selectedRole, setSelectedRole] = useState<UserRole>('dokter');
  const [username, setUsername] = useState('faisal.utama');
  const [password, setPassword] = useState('••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleRoleChange = (role: UserRole) => {
    setSelectedRole(role);
    setErrorMessage('');
    if (role === 'dokter') {
      setUsername('faisal.utama');
    } else if (role === 'ketua') {
      setUsername('hendra.setiawan');
    } else {
      setUsername('admin.rst');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      setErrorMessage('Silakan isi Username/NIP dan Password.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    setTimeout(() => {
      setIsSubmitting(false);
      onLoginSuccess(selectedRole);
    }, 400);
  };

  const handleQuickLogin = (role: UserRole) => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onLoginSuccess(role);
    }, 300);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden border border-slate-200 animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-[#0B2D5C] via-[#005F73] to-[#008080] p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/70 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center space-x-3 mb-2">
            <div className="w-11 h-11 rounded-xl bg-white p-1 text-[#0B2D5C] flex items-center justify-center font-extrabold shadow-md shrink-0">
              <img
                src="/src/assets/images/logo_hesti_wira_sakti_1785328573896.jpg"
                alt="Logo Hesti Wira Sakti"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <span className="text-[10px] font-bold text-amber-300 uppercase tracking-wider block">
                Sistem Informasi Terpadu
              </span>
              <h2 className="text-lg font-extrabold text-white leading-tight">
                Login Portal Komite Medik
              </h2>
            </div>
          </div>
          <p className="text-xs text-slate-200 leading-relaxed mt-1">
            Masuk ke Sistem Pengawasan Kredensial, SPK/RKK, & Mutu Klinis RST Pematang Siantar
          </p>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-5">
          
          {/* Role Selection Tabs */}
          <div>
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-2">
              Pilih Akses Peran Pengguna:
            </label>
            <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-100 rounded-xl border border-slate-200 text-xs font-bold">
              <button
                type="button"
                onClick={() => handleRoleChange('dokter')}
                className={`py-2 px-1 rounded-lg transition-all flex flex-col items-center justify-center space-y-1 ${
                  selectedRole === 'dokter'
                    ? 'bg-[#008080] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Stethoscope className="w-3.5 h-3.5" />
                <span className="text-[11px]">Dokter</span>
              </button>

              <button
                type="button"
                onClick={() => handleRoleChange('ketua')}
                className={`py-2 px-1 rounded-lg transition-all flex flex-col items-center justify-center space-y-1 ${
                  selectedRole === 'ketua'
                    ? 'bg-[#0B2D5C] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Award className="w-3.5 h-3.5" />
                <span className="text-[11px]">Ketua Komite</span>
              </button>

              <button
                type="button"
                onClick={() => handleRoleChange('admin')}
                className={`py-2 px-1 rounded-lg transition-all flex flex-col items-center justify-center space-y-1 ${
                  selectedRole === 'admin'
                    ? 'bg-slate-800 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Building2 className="w-3.5 h-3.5" />
                <span className="text-[11px]">Admin</span>
              </button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {errorMessage && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl font-medium">
                {errorMessage}
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Username / NIP / NRP
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Masukkan username atau NIP/NRP..."
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#008080]"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Kata Sandi (Password)
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Masukkan kata sandi..."
                  className="w-full pl-9 pr-10 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#008080]"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-[#008080] hover:bg-[#005F73] text-white font-extrabold text-xs rounded-xl shadow-md transition-all flex items-center justify-center space-x-2"
            >
              {isSubmitting ? (
                <span>Memproses Otentikasi...</span>
              ) : (
                <>
                  <Lock className="w-4 h-4 text-amber-300" />
                  <span>Masuk Portal Internal</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Direct One-Click Presets for Easy Demo */}
          <div className="pt-2 border-t border-slate-100">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2 text-center">
              Akses Cepat Penguji (One-Click Auto Login):
            </span>
            <div className="space-y-1.5">
              <button
                type="button"
                onClick={() => handleQuickLogin('dokter')}
                className="w-full py-2 px-3 bg-teal-50 hover:bg-teal-100 text-[#008080] border border-teal-200 text-[11px] font-bold rounded-xl flex items-center justify-between transition-colors"
              >
                <div className="flex items-center space-x-2">
                  <Stethoscope className="w-3.5 h-3.5" />
                  <span>Dokter (dr. Faisal Utama, Sp.OT)</span>
                </div>
                <span className="text-[10px] bg-teal-200/80 px-1.5 py-0.5 rounded font-mono">Masuk ↗</span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickLogin('ketua')}
                className="w-full py-2 px-3 bg-blue-50 hover:bg-blue-100 text-[#0B2D5C] border border-blue-200 text-[11px] font-bold rounded-xl flex items-center justify-between transition-colors"
              >
                <div className="flex items-center space-x-2">
                  <Award className="w-3.5 h-3.5" />
                  <span>Ketua Komite (Kolonel Ckm dr. Hendra, Sp.B)</span>
                </div>
                <span className="text-[10px] bg-blue-200/80 px-1.5 py-0.5 rounded font-mono">Masuk ↗</span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickLogin('admin')}
                className="w-full py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 text-[11px] font-bold rounded-xl flex items-center justify-between transition-colors"
              >
                <div className="flex items-center space-x-2">
                  <Building2 className="w-3.5 h-3.5" />
                  <span>Administrator Sekretariat</span>
                </div>
                <span className="text-[10px] bg-slate-300/80 px-1.5 py-0.5 rounded font-mono">Masuk ↗</span>
              </button>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 text-center text-[10px] text-slate-500 font-medium">
          Otentikasi Aman Komite Medik • Kesdam I/Bukit Barisan
        </div>

      </div>
    </div>
  );
};
