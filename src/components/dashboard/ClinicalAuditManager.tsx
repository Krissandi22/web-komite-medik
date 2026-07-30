import React, { useState } from 'react';
import { AuditKlinisRecord } from '../../types';
import { FileCheck2, Plus, TrendingUp, CheckCircle2, AlertCircle } from 'lucide-react';

interface ClinicalAuditManagerProps {
  audits: AuditKlinisRecord[];
  onAddAudit: (newAudit: AuditKlinisRecord) => void;
}

export const ClinicalAuditManager: React.FC<ClinicalAuditManagerProps> = ({ audits, onAddAudit }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [title, setTitle] = useState('');
  const [department, setDepartment] = useState('SMF Bedah');
  const [leadDoctor, setLeadDoctor] = useState('');
  const [complianceRate, setComplianceRate] = useState(92);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !leadDoctor) return;

    const newRecord: AuditKlinisRecord = {
      id: `audit-${Date.now()}`,
      title,
      department,
      leadDoctor,
      auditPeriod: 'Triwulan III 2026',
      complianceRate: Number(complianceRate),
      targetRate: 90,
      status: 'Selesai',
      keyFindings: ['Evaluasi telah didokumentasikan sesuai indikator mutu PPK.'],
      recommendations: 'Dipertahankan dan ditingkatkan secara konsisten.',
      dateReported: new Date().toISOString().split('T')[0]
    };

    onAddAudit(newRecord);
    setShowAddForm(false);
    setTitle('');
    setLeadDoctor('');
  };

  return (
    <div className="space-y-6">
      
      {/* Title */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold text-[#0B2D5C] tracking-tight">
            Sub Komite Mutu Profesi — Manajemen Audit Klinis
          </h1>
          <p className="text-xs text-slate-600 mt-1">
            Penilaian kepatuhan Panduan Praktik Klinis (PPK), kriteria mutu keselamatan pasien, dan re-audit periodik
          </p>
        </div>

        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="px-4 py-2 bg-[#0F8B8D] hover:bg-[#0c7274] text-white text-xs font-bold rounded-lg shadow-xs flex items-center space-x-1.5 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>{showAddForm ? 'Tutup Form' : 'Tambah Audit Baru'}</span>
        </button>
      </div>

      {/* Add Audit Form Modal/Card */}
      {showAddForm && (
        <form onSubmit={handleSubmit} className="bg-white p-5 rounded-xl border border-slate-300 shadow-md space-y-4">
          <h3 className="text-sm font-bold text-[#0B2D5C]">Input Laporan Audit Klinis Baru</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Judul Topik Audit:</label>
              <input
                type="text"
                required
                placeholder="Contoh: Audit Kepatuhan Profilaksis Bedah Elektif"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2 bg-slate-50 border border-slate-300 rounded focus:outline-none"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">SMF Terkait:</label>
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full p-2 bg-slate-50 border border-slate-300 rounded focus:outline-none"
              >
                <option value="SMF Bedah">SMF Bedah</option>
                <option value="SMF Penyakit Dalam">SMF Penyakit Dalam</option>
                <option value="SMF Anak">SMF Anak</option>
                <option value="SMF Obgyn">SMF Obgyn</option>
                <option value="SMF Anestesiologi">SMF Anestesiologi</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Dokter Penanggung Jawab Audit:</label>
              <input
                type="text"
                required
                placeholder="Nama & Gelar Dokter Auditor"
                value={leadDoctor}
                onChange={(e) => setLeadDoctor(e.target.value)}
                className="w-full p-2 bg-slate-50 border border-slate-300 rounded focus:outline-none"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Tingkat Kepatuhan (%):</label>
              <input
                type="number"
                min="0"
                max="100"
                value={complianceRate}
                onChange={(e) => setComplianceRate(Number(e.target.value))}
                className="w-full p-2 bg-slate-50 border border-slate-300 rounded focus:outline-none"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-2">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-4 py-2 bg-slate-200 text-slate-700 text-xs font-bold rounded"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#0B2D5C] text-white text-xs font-bold rounded"
            >
              Simpan Laporan Audit
            </button>
          </div>
        </form>
      )}

      {/* Audit Records List */}
      <div className="space-y-4">
        {audits.map((item) => (
          <div key={item.id} className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div>
                <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded">
                  {item.department}
                </span>
                <h3 className="text-base font-bold text-[#0B2D5C] mt-1">{item.title}</h3>
                <p className="text-xs text-slate-500 font-medium">Auditor Lead: {item.leadDoctor} • {item.auditPeriod}</p>
              </div>

              <div className="flex items-center space-x-3 shrink-0">
                <div className="text-right">
                  <span className="text-xs font-bold text-slate-500 block">Kepatuhan:</span>
                  <span className="text-lg font-extrabold text-[#2E7D32]">{item.complianceRate}%</span>
                </div>
                <span className="px-2.5 py-1 bg-blue-100 text-[#0B2D5C] text-xs font-bold rounded">
                  {item.status}
                </span>
              </div>
            </div>

            <div className="text-xs space-y-1">
              <span className="font-bold text-slate-700 block">Temuan Utama:</span>
              <ul className="list-disc list-inside text-slate-600 pl-1 space-y-0.5">
                {item.keyFindings.map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
            </div>

            <div className="p-2.5 bg-blue-50/60 rounded border border-blue-200 text-xs text-slate-700">
              <strong>Rekomendasi Mutu:</strong> {item.recommendations}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
