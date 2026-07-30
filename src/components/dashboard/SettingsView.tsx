import React, { useState } from 'react';
import { Settings, Bell, Shield, Lock, Save, FileText } from 'lucide-react';

export const SettingsView: React.FC = () => {
  const [reminderDays, setReminderDays] = useState(60);
  const [autoEmailAlert, setAutoEmailAlert] = useState(true);
  const [hospitalCode, setHospitalCode] = useState('RST-PS-KESDAM-I');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="space-y-6">
      
      {/* Title */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
        <h1 className="text-xl font-extrabold text-[#0B2D5C] tracking-tight">
          Pengaturan Sistem & Konfigurasi Notifikasi
        </h1>
        <p className="text-xs text-slate-600 mt-1">
          Konfigurasi ambang batas peringatan dini SIP/STR, format nomor SPK, dan template surat rekomendasi
        </p>
      </div>

      <form onSubmit={handleSave} className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-6 text-xs text-slate-700">
        
        {savedSuccess && (
          <div className="p-3 bg-emerald-100 text-emerald-800 font-bold rounded border border-emerald-300">
            ✓ Pengaturan sistem berhasil diperbarui.
          </div>
        )}

        <div className="space-y-4">
          <h3 className="font-extrabold text-[#0B2D5C] uppercase tracking-wider text-xs border-b border-slate-200 pb-2">
            Notifikasi Peringatan Dini Kadaluwarsa SIP & STR
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-bold text-slate-700 block mb-1">
                Peringatan Dini Sebelum Jatuh Tempo (Hari):
              </label>
              <input
                type="number"
                value={reminderDays}
                onChange={(e) => setReminderDays(Number(e.target.value))}
                className="w-full p-2 bg-slate-50 border border-slate-300 rounded focus:outline-none"
              />
              <span className="text-[10px] text-slate-500">Sistem akan menampilkan alert jika SIP/STR berlaku &lt; {reminderDays} hari.</span>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">
                Kirim Pengingat Otomatis via Email ke Dokter:
              </label>
              <select
                value={autoEmailAlert ? 'ya' : 'tidak'}
                onChange={(e) => setAutoEmailAlert(e.target.value === 'ya')}
                className="w-full p-2 bg-slate-50 border border-slate-300 rounded focus:outline-none"
              >
                <option value="ya">Aktif (Kirim Email Pengingat Automatic)</option>
                <option value="tidak">Non-Aktif</option>
              </select>
            </div>
          </div>
        </div>

        <div className="space-y-4 pt-4 border-t border-slate-200">
          <h3 className="font-extrabold text-[#0B2D5C] uppercase tracking-wider text-xs border-b border-slate-200 pb-2">
            Format Nomor Registrasi SPK & Dokumen
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-bold text-slate-700 block mb-1">
                Kode Identitas Rumah Sakit:
              </label>
              <input
                type="text"
                value={hospitalCode}
                onChange={(e) => setHospitalCode(e.target.value)}
                className="w-full p-2 bg-slate-50 border border-slate-300 rounded focus:outline-none"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t border-slate-200">
          <button
            type="submit"
            className="px-6 py-2.5 bg-[#0B2D5C] hover:bg-[#082247] text-white text-xs font-bold rounded-lg shadow-xs flex items-center space-x-2"
          >
            <Save className="w-4 h-4 text-amber-400" />
            <span>Simpan Pengaturan</span>
          </button>
        </div>

      </form>

    </div>
  );
};
