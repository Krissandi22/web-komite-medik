import React, { useState } from 'react';
import { Doctor } from '../../types';
import { Award, Printer, Search, FileText, CheckCircle2, Shield } from 'lucide-react';

interface ClinicalPrivilegesManagerProps {
  doctors: Doctor[];
}

export const ClinicalPrivilegesManager: React.FC<ClinicalPrivilegesManagerProps> = ({ doctors }) => {
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor>(doctors[0]);

  return (
    <div className="space-y-6">
      
      {/* Title */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold text-[#0B2D5C] tracking-tight">
            Kewenangan Klinis (SPK & RKK Generator)
          </h1>
          <p className="text-xs text-slate-600 mt-1">
            Penyusunan dan pencetakan Surat Penugasan Klinis (SPK) serta Rincian Kewenangan Klinis (RKK) White Paper
          </p>
        </div>

        <button
          onClick={() => window.print()}
          className="px-4 py-2 bg-[#0B2D5C] hover:bg-[#082247] text-white text-xs font-bold rounded-lg shadow-xs flex items-center space-x-2 shrink-0"
        >
          <Printer className="w-4 h-4 text-amber-400" />
          <span>Cetak Format Surat SPK/RKK</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Doctor Selection (4 cols) */}
        <div className="lg:col-span-4 bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-3">
          <span className="text-xs font-bold text-slate-500 uppercase block">
            Pilih Dokter Staf Medis:
          </span>

          <div className="space-y-2 max-h-[500px] overflow-y-auto">
            {doctors.map((doc) => (
              <div
                key={doc.id}
                onClick={() => setSelectedDoctor(doc)}
                className={`p-3 rounded-lg border transition-all cursor-pointer ${
                  selectedDoctor.id === doc.id
                    ? 'bg-blue-50 border-[#0B2D5C] font-bold shadow-xs'
                    : 'bg-[#F7F9FC] border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <img
                    src={doc.photo}
                    alt={doc.name}
                    className="w-10 h-10 rounded-lg object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <span className="text-xs font-bold text-[#0B2D5C] block">{doc.name}</span>
                    <span className="text-[11px] text-[#0F8B8D] font-semibold">{doc.pangkat}</span>
                    <span className="text-[10px] text-slate-500 block">{doc.specialty}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: SPK & RKK Document Previewer (8 cols) */}
        <div className="lg:col-span-8 bg-white p-6 rounded-xl border-2 border-slate-300 shadow-md space-y-6 text-slate-900">
          
          {/* Official Document Letterhead Header */}
          <div className="text-center border-b-2 border-slate-900 pb-4 space-y-1">
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-700">
              KOMANDO DAERAH MILITER I/BUKIT BARISAN
            </h2>
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-700">
              KESEHATAN DAERAH MILITER I/BUKIT BARISAN
            </h3>
            <h4 className="text-sm font-extrabold uppercase tracking-wide text-[#0B2D5C]">
              RUMAH SAKIT TENTARA PEMATANG SIANTA
            </h4>
            <p className="text-[10px] text-slate-500 font-mono">
              Jl. Sutomo No. 1, Pematang Siantar, Sumatera Utara • Telp: (0622) 21542
            </p>
          </div>

          <div className="text-center space-y-1 py-2">
            <h2 className="text-sm font-extrabold uppercase tracking-wide text-[#0B2D5C] underline">
              SURAT KEPUTUSAN KEPALA RUMAH SAKIT TENTARA PEMATANG SIANTAR
            </h2>
            <p className="text-xs font-mono text-slate-600 font-bold">
              Nomor: SK/SPK-RKK/{selectedDoctor.nrp}/2026/012
            </p>
            <p className="text-xs font-bold uppercase text-slate-800 pt-1">
              TENTANG: PENUGASAN KLINIS DAN RINCIAN KEWENANGAN KLINIS (RKK) DOKTER
            </p>
          </div>

          {/* Doctor Info Section */}
          <div className="bg-slate-50 p-4 rounded-lg border border-slate-300 text-xs space-y-1.5">
            <div className="grid grid-cols-3">
              <span className="font-bold text-slate-600">Nama Dokter:</span>
              <span className="col-span-2 font-extrabold text-[#0B2D5C]">{selectedDoctor.name}</span>
            </div>
            <div className="grid grid-cols-3">
              <span className="font-bold text-slate-600">Pangkat / NRP:</span>
              <span className="col-span-2 font-bold text-slate-800">{selectedDoctor.pangkat} / {selectedDoctor.nrp}</span>
            </div>
            <div className="grid grid-cols-3">
              <span className="font-bold text-slate-600">Spesialisasi:</span>
              <span className="col-span-2 font-bold text-slate-800">{selectedDoctor.specialty}</span>
            </div>
            <div className="grid grid-cols-3">
              <span className="font-bold text-slate-600">Masa Berlaku SPK:</span>
              <span className="col-span-2 font-bold text-emerald-800">
                {selectedDoctor.lastCredentialDate} s.d. {selectedDoctor.nextCredentialDate}
              </span>
            </div>
          </div>

          {/* White Paper Privileges List */}
          <div className="space-y-2 text-xs">
            <h3 className="font-extrabold text-[#0B2D5C] uppercase tracking-wider text-xs border-b border-slate-200 pb-1">
              Daftar Rincian Kewenangan Klinis (Mandat White Paper):
            </h3>
            <p className="text-slate-600 italic">
              Dokter bersangkutan diberi kewenangan klinis penuh untuk melakukan tindakan medis spesialisasi berikut di RST Pematang Siantar:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
              {[
                'Anamnesis & Asesmen Medis Spesialis Lengkap',
                'Prosedur Tindakan Invasif & Operatif Spesialis',
                'Pemberian Resep Obat & Terapi Lanjutan',
                'Konsultasi Antar SMF & Rawat Bersama DPJP',
                'Tindakan Kegawatdaruratan Medis & Resusitasi',
                'Penerbitan Surat Keterangan Medis Resmi'
              ].map((item, idx) => (
                <div key={idx} className="p-2.5 bg-slate-100 rounded border border-slate-200 flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span className="font-semibold text-slate-800">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Official Signature Block */}
          <div className="pt-8 grid grid-cols-2 text-center text-xs gap-4 font-bold">
            <div>
              <p className="text-slate-500">Ketua Komite Medik</p>
              <div className="h-16"></div>
              <p className="text-[#0B2D5C] underline font-extrabold">
                Kolonel Ckm dr. Hendra Setiawan, Sp.B
              </p>
            </div>

            <div>
              <p className="text-slate-500">Kepala Rumah Sakit Tentara</p>
              <div className="h-16"></div>
              <p className="text-[#0B2D5C] underline font-extrabold">
                Karumkit RST Pematang Siantar
              </p>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
