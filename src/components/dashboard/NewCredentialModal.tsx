import React, { useState } from 'react';
import { Doctor, KredensialApplication } from '../../types';
import { X, Shield, Plus, FileCheck, Upload, CheckCircle2 } from 'lucide-react';

interface NewCredentialModalProps {
  isOpen: boolean;
  onClose: () => void;
  doctors: Doctor[];
  onSubmitApplication: (app: KredensialApplication) => void;
}

export const NewCredentialModal: React.FC<NewCredentialModalProps> = ({
  isOpen,
  onClose,
  doctors,
  onSubmitApplication
}) => {
  const [doctorName, setDoctorName] = useState('');
  const [doctorNrp, setDoctorNrp] = useState('');
  const [specialty, setSpecialty] = useState('Spesialis Bedah');
  const [type, setType] = useState<KredensialApplication['type']>('Pengajuan Rekredensial');
  const [rkkScopeInput, setRkkScopeInput] = useState('Tindakan Medis Spesialis Utama');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!doctorName) return;

    const newApp: KredensialApplication = {
      id: `app-${Date.now()}`,
      doctorName,
      doctorNrp: doctorNrp || '11090099887766',
      specialty,
      type,
      applicationDate: new Date().toISOString().split('T')[0],
      status: 'Menunggu',
      rkkScope: [rkkScopeInput, 'Asesmen Medis Spesialis Lengkap', 'Resep Obat & Terapi Lanjutan'],
      notes: 'Pengajuan baru via Dashboard Internal'
    };

    onSubmitApplication(newApp);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-2xs flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-xl w-full overflow-hidden border border-slate-200">
        
        {/* Header */}
        <div className="bg-[#0B2D5C] text-white p-5 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Shield className="w-5 h-5 text-amber-400" />
            <h2 className="text-sm font-extrabold text-white">
              Form Pengajuan Kredensial / Re-Kredensial
            </h2>
          </div>
          <button onClick={onClose} className="text-white/80 hover:text-white p-1 rounded hover:bg-white/10">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs text-slate-700">
          <div>
            <label className="font-bold text-slate-700 block mb-1">Nama Lengkap Dokter & Gelar:</label>
            <input
              type="text"
              required
              placeholder="dr. Nama Lengkap, Sp.XX"
              value={doctorName}
              onChange={(e) => setDoctorName(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded focus:outline-none focus:border-[#0B2D5C]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-slate-700 block mb-1">NRP Militer / NIP ASN:</label>
              <input
                type="text"
                placeholder="NRP / NIP Dokter"
                value={doctorNrp}
                onChange={(e) => setDoctorNrp(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded focus:outline-none focus:border-[#0B2D5C]"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Jenis Kredensial:</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as any)}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded focus:outline-none focus:border-[#0B2D5C]"
              >
                <option value="Re-Kredensial">Re-Kredensial (Perpanjangan)</option>
                <option value="Kredensial Pertama">Kredensial Pertama (Dokter Baru)</option>
                <option value="Penambahan Kewenangan Klinis (RKK)">Penambahan Kewenangan (RKK)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Spesialisasi & SMF:</label>
            <input
              type="text"
              value={specialty}
              onChange={(e) => setSpecialty(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded focus:outline-none focus:border-[#0B2D5C]"
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Usulan Utama Kewenangan Klinis (RKK):</label>
            <textarea
              rows={2}
              value={rkkScopeInput}
              onChange={(e) => setRkkScopeInput(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded focus:outline-none focus:border-[#0B2D5C]"
            />
          </div>

          {/* Dedicated File Upload Box */}
          <div>
            <label className="font-bold text-slate-700 block mb-1">
              Tempat Berkas Lampiran (STR, SIP, & Sertifikat Kompetensi) *
            </label>
            <div className="border-2 border-dashed border-slate-300 hover:border-[#008080] bg-slate-50 hover:bg-slate-100/60 transition-all rounded-xl p-4 text-center relative cursor-pointer">
              <input
                type="file"
                accept=".pdf,.png,.jpg,.jpeg,.doc,.docx"
                onChange={handleFileChange}
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
              />
              {selectedFile ? (
                <div className="flex items-center justify-center space-x-2 text-emerald-800">
                  <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                  <div className="text-left">
                    <span className="font-extrabold text-xs block">{selectedFile.name}</span>
                    <span className="text-[10px] text-slate-500 font-mono">
                      {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB • Berkas Terlampir
                    </span>
                  </div>
                </div>
              ) : (
                <div className="space-y-1">
                  <Upload className="w-6 h-6 text-[#008080] mx-auto" />
                  <p className="text-xs font-bold text-slate-800">
                    Klik atau Tarik & Meletakkan Berkas Dokumen di Sini
                  </p>
                  <p className="text-[10px] text-slate-500">
                    Format yang didukung: PDF, JPG, PNG, atau DOCX (Maksimal 15 MB)
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="p-3 bg-amber-50 border border-amber-200 rounded text-[11px] text-amber-900">
            * Berkas pengajuan akan diverifikasi oleh Sub Komite Kredensial sebelum diteruskan ke mitra bestari.
          </div>

          <div className="flex justify-end space-x-2 pt-2 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-200 text-slate-700 font-bold rounded"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-[#0B2D5C] hover:bg-[#082247] text-white font-bold rounded shadow-xs"
            >
              Kirim Pengajuan
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
