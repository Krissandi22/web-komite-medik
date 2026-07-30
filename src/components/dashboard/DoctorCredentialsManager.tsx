import React, { useState } from 'react';
import { Doctor } from '../../types';
import { Search, Filter, ShieldCheck, Edit3, Award, Stethoscope, AlertTriangle, Eye, CheckCircle2 } from 'lucide-react';

interface DoctorCredentialsManagerProps {
  doctors: Doctor[];
  onSelectDoctor: (doc: Doctor) => void;
  onUpdateDoctorStatus: (id: string, newStatus: Doctor['status']) => void;
}

export const DoctorCredentialsManager: React.FC<DoctorCredentialsManagerProps> = ({
  doctors,
  onSelectDoctor,
  onUpdateDoctorStatus
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('Semua');

  const filteredDoctors = doctors.filter((doc) => {
    const matchesSearch =
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.nrp.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.pangkat.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'Semua' || doc.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      
      {/* Title */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold text-[#0B2D5C] tracking-tight">
            Data Dokter & Kredensial Medis ({doctors.length} Dokter Staf Medis)
          </h1>
          <p className="text-xs text-slate-600 mt-1">
            Manajemen verifikasi Surat Izin Praktik (SIP), STR KKI, dan Rincian Kewenangan Klinis (RKK)
          </p>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Cari Dokter (Nama, Pangkat, Spesialisasi, NRP/NIP)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 text-slate-800 text-xs rounded-lg border border-slate-300 focus:outline-none focus:border-[#0B2D5C]"
            />
          </div>

          <div className="flex items-center space-x-2 shrink-0">
            <span className="text-xs font-bold text-slate-500">Status:</span>
            {['Semua', 'Aktif', 'Menunggu Re-kredensial', 'SIP Expired'].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 text-xs font-bold rounded-md transition-colors ${
                  statusFilter === st
                    ? 'bg-[#0B2D5C] text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                {st}
              </button>
            ))}
          </div>

        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#0B2D5C] text-white text-xs font-bold uppercase tracking-wider">
                <th className="py-3.5 px-4">Nama Dokter & Pangkat Militer</th>
                <th className="py-3.5 px-4">Spesialisasi & SMF</th>
                <th className="py-3.5 px-4">Status SIP / STR</th>
                <th className="py-3.5 px-4 text-center">Jumlah RKK</th>
                <th className="py-3.5 px-4 text-center">Status Kredensial</th>
                <th className="py-3.5 px-4 text-center">Aksi Manajemen</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-xs text-slate-700">
              {filteredDoctors.map((doc) => (
                <tr key={doc.id} className="hover:bg-blue-50/50 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center space-x-3">
                      <img
                        src={doc.photo}
                        alt={doc.name}
                        className="w-10 h-10 rounded-lg object-cover border border-slate-200"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <span className="font-extrabold text-[#0B2D5C] block text-xs">{doc.name}</span>
                        <span className="text-[11px] font-bold text-amber-700">{doc.pangkat}</span>
                        <span className="text-[10px] text-slate-400 block font-mono">NRP: {doc.nrp}</span>
                      </div>
                    </div>
                  </td>

                  <td className="py-3.5 px-4">
                    <span className="font-semibold text-slate-800 block">{doc.specialty}</span>
                    <span className="text-[11px] text-slate-500">{doc.unit}</span>
                  </td>

                  <td className="py-3.5 px-4 font-mono text-[11px]">
                    <div className="space-y-0.5">
                      <div>
                        <span className="text-slate-400">SIP: </span>
                        <span className="font-bold text-slate-800">{doc.sipNumber}</span>
                      </div>
                      <div className="text-[10px] text-slate-500">Exp: {doc.sipExpiry}</div>
                    </div>
                  </td>

                  <td className="py-3.5 px-4 text-center font-extrabold text-[#0B2D5C]">
                    {doc.clinicalPrivilegesCount} Prosedur
                  </td>

                  <td className="py-3.5 px-4 text-center">
                    <span className={`inline-block px-2.5 py-1 rounded text-[10px] font-bold border ${
                      doc.status === 'Aktif'
                        ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                        : 'bg-amber-100 text-amber-800 border-amber-300'
                    }`}>
                      {doc.status}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 text-center">
                    <div className="flex items-center justify-center space-x-2">
                      <button
                        onClick={() => onSelectDoctor(doc)}
                        className="px-2.5 py-1.5 bg-[#0B2D5C] hover:bg-[#082247] text-white text-[11px] font-bold rounded flex items-center space-x-1"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Rincian</span>
                      </button>

                      {doc.status !== 'Aktif' && (
                        <button
                          onClick={() => onUpdateDoctorStatus(doc.id, 'Aktif')}
                          className="px-2 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold rounded flex items-center space-x-1"
                          title="Setujui Perpanjangan"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Perbarui</span>
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
