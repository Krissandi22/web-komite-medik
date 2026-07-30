import React, { useState } from 'react';
import { KredensialApplication } from '../../types';
import { CheckCircle2, XCircle, RefreshCw, FileText, Download, Printer, ShieldCheck, Clock, MessageSquare, AlertCircle, Eye, User, FileCheck, Award, X } from 'lucide-react';

interface ApprovalManagerProps {
  applications: KredensialApplication[];
  onUpdateApplicationStatus: (id: string, status: KredensialApplication['status'], catatan?: string) => void;
}

export const ApprovalManager: React.FC<ApprovalManagerProps> = ({
  applications,
  onUpdateApplicationStatus
}) => {
  const [selectedApp, setSelectedApp] = useState<KredensialApplication | null>(null);
  const [isDecisionModalOpen, setIsDecisionModalOpen] = useState(false);
  const [decisionType, setDecisionType] = useState<'Disetujui' | 'Ditolak' | 'Revisi'>('Disetujui');
  const [catatanText, setCatatanText] = useState('');
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);

  // Stats
  const totalBaru = applications.filter(a => a.status === 'Menunggu' || a.status === 'Diproses').length;
  const totalDisetujui = applications.filter(a => a.status === 'Disetujui').length;
  const totalDitolak = applications.filter(a => a.status === 'Ditolak').length;
  const totalRevisi = applications.filter(a => a.status === 'Revisi').length;

  const handleOpenDecision = (app: KredensialApplication, type: 'Disetujui' | 'Ditolak' | 'Revisi') => {
    setSelectedApp(app);
    setDecisionType(type);
    setCatatanText(
      type === 'Revisi'
        ? 'Mohon lampirkan STR & SIP terbaru yang masih berlaku dan dilegalisir.'
        : type === 'Disetujui'
        ? 'Pengajuan telah memenuhi persyaratan administratif dan kelayakan teknis medis.'
        : 'Pengajuan ditolak dikarenakan persyaratan tidak sesuai dengan kriteria White Paper.'
    );
    setIsDecisionModalOpen(true);
  };

  const handleConfirmDecision = () => {
    if (!selectedApp) return;
    onUpdateApplicationStatus(selectedApp.id, decisionType, catatanText);
    setIsDecisionModalOpen(false);
    setSelectedApp(null);
  };

  return (
    <div className="space-y-6 font-sans">
      
      {/* Banner Ketua Komite Medik */}
      <div className="bg-gradient-to-r from-[#0B2D5C] via-[#005F73] to-[#008080] text-white p-6 rounded-2xl shadow-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-amber-400 font-bold text-xs uppercase tracking-wider mb-1">
              <ShieldCheck className="w-4 h-4" />
              <span>Otoritas Pengambil Keputusan — Ketua Komite Medik</span>
            </div>
            <h1 className="text-2xl font-extrabold tracking-tight">
              Persetujuan & Verifikasi Kredensial Dokter
            </h1>
            <p className="text-xs text-slate-200 mt-1 max-w-2xl">
              Verifikasi berkas, berikan catatan perbaikan, dan teruskan rekomendasi Penugasan Klinis (SPK & RKK) ke Kepala Rumah Sakit Tentara Pematang Siantar.
            </p>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-white/15">
          <div className="bg-white/10 p-3 rounded-xl border border-white/10">
            <span className="text-[10px] text-amber-300 font-bold uppercase block">Menunggu Verifikasi</span>
            <span className="text-xl font-black text-white mt-0.5 block">{totalBaru}</span>
          </div>
          <div className="bg-white/10 p-3 rounded-xl border border-white/10">
            <span className="text-[10px] text-emerald-300 font-bold uppercase block">Disetujui</span>
            <span className="text-xl font-black text-white mt-0.5 block">{totalDisetujui}</span>
          </div>
          <div className="bg-white/10 p-3 rounded-xl border border-white/10">
            <span className="text-[10px] text-rose-300 font-bold uppercase block">Ditolak</span>
            <span className="text-xl font-black text-white mt-0.5 block">{totalDitolak}</span>
          </div>
          <div className="bg-white/10 p-3 rounded-xl border border-white/10">
            <span className="text-[10px] text-amber-300 font-bold uppercase block">Perlu Revisi</span>
            <span className="text-xl font-black text-white mt-0.5 block">{totalRevisi}</span>
          </div>
        </div>
      </div>

      {/* Applications List */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 bg-slate-50 border-b border-slate-200 font-bold text-slate-800 text-xs uppercase tracking-wider flex items-center justify-between">
          <span>Daftar Pengajuan Kredensial & Rekredensial Masuk</span>
          <span className="text-slate-500 font-normal">Total: {applications.length} Pengajuan</span>
        </div>

        <div className="divide-y divide-slate-200">
          {applications.map((app) => (
            <div key={app.id} className="p-5 hover:bg-slate-50/80 transition-colors flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              
              <div className="space-y-2 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase border ${
                    app.status === 'Disetujui' ? 'bg-emerald-100 text-emerald-800 border-emerald-300' :
                    app.status === 'Ditolak' ? 'bg-rose-100 text-rose-800 border-rose-300' :
                    app.status === 'Revisi' ? 'bg-amber-100 text-amber-800 border-amber-300' :
                    'bg-sky-100 text-sky-800 border-sky-300'
                  }`}>
                    ● Status: {app.status}
                  </span>

                  <span className="px-2.5 py-0.5 bg-slate-100 text-slate-700 text-[10px] font-bold rounded-md border border-slate-200">
                    {app.type}
                  </span>

                  <span className="text-xs text-slate-400 font-mono">
                    Tanggal: {app.applicationDate}
                  </span>
                </div>

                <div>
                  <h3 className="text-sm font-extrabold text-slate-900">{app.doctorName}</h3>
                  <p className="text-xs font-semibold text-[#008080]">
                    NRP/NIP: {app.doctorNrp} • {app.specialty} ({app.unit || 'SMF Dokter'})
                  </p>
                </div>

                {/* Scope Preview */}
                <div className="text-xs text-slate-600 space-y-1">
                  <span className="font-bold text-slate-700 block">Usulan Rincian Kewenangan Klinis (RKK):</span>
                  <div className="flex flex-wrap gap-1.5">
                    {app.rkkScope.map((scope, idx) => (
                      <span key={idx} className="px-2 py-0.5 bg-slate-100 text-slate-700 text-[11px] font-medium rounded border border-slate-200">
                        ✓ {scope}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Catatan Ketua Previous */}
                {app.catatanKetua && (
                  <div className="p-2.5 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
                    <MessageSquare className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold block text-[10px] text-amber-700 uppercase">Catatan Ketua Komite:</span>
                      <p className="font-medium">{app.catatanKetua}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons for Ketua */}
              <div className="flex flex-wrap items-center gap-2 lg:flex-col lg:items-end shrink-0 pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-200">
                <div className="flex items-center space-x-1.5">
                  <button
                    onClick={() => handleOpenDecision(app, 'Disetujui')}
                    className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center space-x-1"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Approve</span>
                  </button>

                  <button
                    onClick={() => handleOpenDecision(app, 'Revisi')}
                    className="px-3.5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center space-x-1"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Minta Revisi</span>
                  </button>

                  <button
                    onClick={() => handleOpenDecision(app, 'Ditolak')}
                    className="px-3 py-2 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center space-x-1"
                  >
                    <XCircle className="w-3.5 h-3.5" />
                    <span>Reject</span>
                  </button>
                </div>

                <div className="flex items-center space-x-2 pt-1">
                  <button
                    onClick={() => {
                      setSelectedApp(app);
                      setIsPrintModalOpen(true);
                    }}
                    className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-[11px] rounded-lg transition-colors flex items-center space-x-1"
                  >
                    <Printer className="w-3.5 h-3.5 text-[#008080]" />
                    <span>Cetak Berita Acara</span>
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>

      {/* DECISION MODAL WITH CATATAN */}
      {isDecisionModalOpen && selectedApp && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full border border-slate-200 overflow-hidden">
            <div className={`p-4 text-white flex items-center justify-between ${
              decisionType === 'Disetujui' ? 'bg-emerald-700' :
              decisionType === 'Revisi' ? 'bg-amber-600' : 'bg-rose-700'
            }`}>
              <h3 className="font-bold text-sm">
                Konfirmasi Keputusan: {decisionType}
              </h3>
              <button onClick={() => setIsDecisionModalOpen(false)} className="text-white hover:opacity-80">✕</button>
            </div>

            <div className="p-6 space-y-4 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-[10px] text-slate-500 font-bold uppercase block">Dokter Pengaju</span>
                <span className="text-sm font-extrabold text-slate-900 block">{selectedApp.doctorName}</span>
                <span className="text-xs text-[#008080] font-semibold">{selectedApp.type}</span>
              </div>

              <div>
                <label className="font-bold text-slate-800 block mb-1">
                  Catatan dari Ketua Komite Medik * (Wajib untuk Dokter)
                </label>
                <textarea
                  rows={4}
                  value={catatanText}
                  onChange={(e) => setCatatanText(e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl font-medium outline-none focus:ring-2 focus:ring-[#008080]"
                  placeholder="Masukkan instruksi atau catatan revisi/persetujuan..."
                  required
                />
              </div>

              <div className="pt-3 border-t border-slate-200 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsDecisionModalOpen(false)}
                  className="px-4 py-2 bg-slate-200 text-slate-700 font-bold rounded-xl"
                >
                  Batal
                </button>
                <button
                  type="button"
                  onClick={handleConfirmDecision}
                  className={`px-5 py-2 font-bold text-white rounded-xl shadow-md ${
                    decisionType === 'Disetujui' ? 'bg-emerald-600 hover:bg-emerald-500' :
                    decisionType === 'Revisi' ? 'bg-amber-600 hover:bg-amber-500' : 'bg-rose-600 hover:bg-rose-500'
                  }`}
                >
                  Simpan Keputusan {decisionType}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* BERITA ACARA PRINT MODAL */}
      {isPrintModalOpen && selectedApp && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full border border-slate-300 shadow-2xl overflow-hidden my-6 flex flex-col max-h-[92vh]">
            
            {/* Modal Header */}
            <div className="bg-[#0B2D5C] text-white p-4 px-6 flex justify-between items-center shrink-0">
              <div className="flex items-center space-x-2">
                <Printer className="w-5 h-5 text-amber-400" />
                <div>
                  <h3 className="font-extrabold text-sm text-white">Pratinjau Cetak Berita Acara Rekomendasi</h3>
                  <p className="text-[10px] text-slate-300">Komite Medik RST Pematang Siantar</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="px-3.5 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs rounded-xl shadow-xs flex items-center space-x-1 transition-colors"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Cetak</span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsPrintModalOpen(false)}
                  className="p-1.5 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-colors"
                  title="Tutup / Batal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Printable Document Content */}
            <div className="p-8 text-slate-900 space-y-6 text-xs font-sans overflow-y-auto print:p-0 print:overflow-visible">
              <div className="border-b-2 border-slate-900 pb-4 text-center space-y-1">
                <h4 className="font-extrabold uppercase text-[11px] tracking-wide">
                  KOMITE MEDIK RUMAH SAKIT TENTARA TK. IV 01.07.01 PEMATANG SIANTAR
                </h4>
                <h3 className="font-black text-sm uppercase text-[#0B2D5C]">
                  BERITA ACARA REKOMENDASI KREDENSIALING DOKTER
                </h3>
                <p className="text-[10px] font-mono text-slate-600">Nomor: BA-KRED/KOMMED/RST-PS/2026/089</p>
              </div>

              <div className="space-y-2">
                <p>Pada hari ini <strong>Rabu, 29 Juli 2026</strong>, Ketua Komite Medik RST Pematang Siantar telah menelaah dan memverifikasi berkas pengajuan:</p>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5 text-xs">
                  <p><strong>Nama Dokter:</strong> {selectedApp.doctorName}</p>
                  <p><strong>NRP / NIP:</strong> {selectedApp.doctorNrp}</p>
                  <p><strong>Spesialisasi / SMF:</strong> {selectedApp.specialty}</p>
                  <p><strong>Jenis Permohonan:</strong> {selectedApp.type}</p>
                  <p><strong>Status Keputusan:</strong> <span className="font-extrabold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">{selectedApp.status}</span></p>
                </div>
              </div>

              <div>
                <p className="font-extrabold mb-1.5 text-[#0B2D5C]">Rekomendasi Rincian Kewenangan Klinis (RKK):</p>
                <ul className="list-disc pl-5 space-y-1 text-slate-700">
                  {selectedApp.rkkScope.map((s, idx) => (
                    <li key={idx} className="font-medium">{s}</li>
                  ))}
                </ul>
              </div>

              {selectedApp.catatanKetua && (
                <div className="p-3 bg-amber-50 border border-amber-300 rounded-xl text-xs space-y-1">
                  <p className="font-extrabold text-amber-900">Catatan Khusus Ketua Komite Medik:</p>
                  <p className="text-amber-800 font-medium">{selectedApp.catatanKetua}</p>
                </div>
              )}

              <div className="grid grid-cols-2 pt-8 text-center text-xs">
                <div>
                  <p className="text-slate-600">Sekretaris Subkomite Kredensial,</p>
                  <div className="h-16"></div>
                  <p className="font-bold underline text-slate-900">Mayor Ckm dr. Maya Kartika, Sp.A</p>
                </div>
                <div>
                  <p className="text-slate-600">Ketua Komite Medik RST Pematang Siantar,</p>
                  <div className="h-16"></div>
                  <p className="font-bold underline text-slate-900">Kolonel Ckm dr. Hendra Setiawan, Sp.B</p>
                </div>
              </div>
            </div>

            {/* Modal Sticky Bottom Action Footer */}
            <div className="p-4 bg-slate-100 border-t border-slate-200 flex justify-between items-center shrink-0">
              <button
                type="button"
                onClick={() => setIsPrintModalOpen(false)}
                className="px-5 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold rounded-xl transition-colors"
              >
                Batal / Kembali
              </button>
              <button
                type="button"
                onClick={() => window.print()}
                className="px-6 py-2.5 bg-[#008080] hover:bg-[#005F73] text-white text-xs font-extrabold rounded-xl shadow-md flex items-center space-x-2 transition-colors"
              >
                <Printer className="w-4 h-4 text-amber-300" />
                <span>Cetak Berita Acara</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
