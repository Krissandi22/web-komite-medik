import React from 'react';
import { Doctor } from '../types';
import { X, Award, Shield, Stethoscope, Calendar, Phone, Mail, CheckCircle2, FileText, AlertCircle } from 'lucide-react';

interface DoctorDetailModalProps {
  doctor: Doctor | null;
  onClose: () => void;
}

export const DoctorDetailModal: React.FC<DoctorDetailModalProps> = ({ doctor, onClose }) => {
  if (!doctor) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-2xs flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full overflow-hidden border border-slate-200">
        
        {/* Header */}
        <div className="bg-[#0B2D5C] text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white p-1 rounded-lg hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center space-x-4">
            <img
              src={doctor.photo}
              alt={doctor.name}
              className="w-20 h-20 rounded-xl object-cover border-2 border-white/40 shadow-md"
              referrerPolicy="no-referrer"
            />
            <div>
              <div className="flex items-center space-x-2">
                <span className="px-2 py-0.5 bg-amber-500 text-[#0B2D5C] text-[10px] font-extrabold rounded">
                  {doctor.pangkat}
                </span>
                <span className="text-xs text-slate-300 font-mono">NRP/NIP: {doctor.nrp}</span>
              </div>
              <h2 className="text-lg font-extrabold text-white mt-1">{doctor.name}</h2>
              <p className="text-xs text-emerald-300 font-semibold">{doctor.jabatan}</p>
              <p className="text-xs text-slate-300">{doctor.unit}</p>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto text-xs text-slate-700">
          
          {/* Status Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 bg-[#F7F9FC] p-4 rounded-lg border border-slate-200">
            <div>
              <span className="text-[10px] font-bold text-slate-400 block uppercase">Status Kredensial</span>
              <span className={`font-bold inline-block px-2 py-0.5 rounded text-[11px] mt-0.5 ${
                doctor.status === 'Aktif'
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                  : 'bg-amber-100 text-amber-800 border border-amber-300'
              }`}>
                {doctor.status}
              </span>
            </div>

            <div>
              <span className="text-[10px] font-bold text-slate-400 block uppercase">SIP Dinkes</span>
              <span className="font-mono text-slate-800 font-bold block">{doctor.sipNumber}</span>
              <span className="text-[10px] text-slate-500">Exp: {doctor.sipExpiry}</span>
            </div>

            <div>
              <span className="text-[10px] font-bold text-slate-400 block uppercase">STR KKI</span>
              <span className="font-mono text-slate-800 font-bold block">{doctor.strNumber}</span>
              <span className="text-[10px] text-slate-500">Exp: {doctor.strExpiry}</span>
            </div>
          </div>

          {/* White Paper Scope */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-[#0B2D5C] uppercase tracking-wider flex items-center space-x-1.5">
              <Award className="w-4 h-4 text-amber-600" />
              <span>Rincian Kewenangan Klinis (RKK / White Paper)</span>
            </h3>
            <div className="bg-blue-50/60 p-3.5 rounded-lg border border-blue-200 space-y-1">
              <span className="font-extrabold text-[#0B2D5C] block text-xs">
                {doctor.whitePaperCategory}
              </span>
              <p className="text-[11px] text-slate-600">
                Disetujui berdasarkan Surat Penugasan Klinis (SPK) Karumkit RST Pematang Siantar. Jumlah kewenangan klinis terverifikasi: <strong>{doctor.clinicalPrivilegesCount} Prosedur Tindakan</strong>.
              </p>
            </div>
          </div>

          {/* Credential Dates */}
          <div className="grid grid-cols-2 gap-4 pt-2 border-t border-slate-200">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase block">Kredensial Terakhir</span>
              <span className="font-semibold text-slate-800">{doctor.lastCredentialDate}</span>
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase block">Jadwal Re-Kredensialing</span>
              <span className="font-semibold text-[#0B2D5C]">{doctor.nextCredentialDate}</span>
            </div>
          </div>

          {/* Contact */}
          <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-slate-500 text-[11px]">
            <span>Telepon: {doctor.phone}</span>
            <span>Email: {doctor.email}</span>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-100 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#0B2D5C] text-white text-xs font-bold rounded-md"
          >
            Tutup Informasi
          </button>
        </div>

      </div>
    </div>
  );
};
