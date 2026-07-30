import React from 'react';
import { ServiceDetail } from '../types';
import { X, Shield, Clock, FileCheck, CheckCircle2, ArrowRight } from 'lucide-react';

interface ServiceDetailModalProps {
  service: ServiceDetail | null;
  onClose: () => void;
  onOpenDashboard: () => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  service,
  onClose,
  onOpenDashboard
}) => {
  if (!service) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-2xs flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full overflow-hidden border border-slate-200">
        
        {/* Header */}
        <div className="bg-[#0B2D5C] text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white p-1 rounded-lg hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center space-x-3">
            <span className="px-2.5 py-1 bg-amber-500 text-[#0B2D5C] text-[10px] font-extrabold uppercase rounded">
              {service.code}
            </span>
            <span className="text-xs text-slate-300 font-semibold">{service.subKomite}</span>
          </div>

          <h2 className="text-xl font-extrabold text-white mt-2">
            {service.title}
          </h2>
          <p className="text-xs text-slate-300 mt-1 max-w-xl">
            {service.shortDesc}
          </p>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto text-xs text-slate-700">
          
          <div className="p-4 bg-blue-50/70 rounded-lg border border-blue-200 text-slate-700 leading-relaxed">
            <h3 className="font-bold text-[#0B2D5C] mb-1">Deskripsi Lengkap Prosedur</h3>
            {service.fullDesc}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-[#F7F9FC] rounded-lg border border-slate-200">
              <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">
                Estimasi Durasi Penyelesaian
              </span>
              <span className="text-base font-extrabold text-[#0B2D5C]">
                {service.processingTimeDays} Hari Kerja
              </span>
            </div>

            <div className="p-4 bg-[#F7F9FC] rounded-lg border border-slate-200">
              <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">
                Dokumen Hasil Keluaran (Output)
              </span>
              <span className="text-xs font-bold text-emerald-800">
                {service.outputDocument}
              </span>
            </div>
          </div>

          {/* Requirements List */}
          <div className="space-y-2">
            <h3 className="font-bold text-[#0B2D5C] uppercase text-[11px] flex items-center space-x-1.5">
              <FileCheck className="w-4 h-4 text-[#0F8B8D]" />
              <span>Persyaratan Berkas Administrasi</span>
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 bg-slate-50 p-4 rounded-lg border border-slate-200">
              {service.requirements.map((req, idx) => (
                <li key={idx} className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="text-slate-700 leading-tight">{req}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Workflow Steps */}
          <div className="space-y-3">
            <h3 className="font-bold text-[#0B2D5C] uppercase text-[11px]">
              Tahapan Lintas Prosedur (Workflow Steps)
            </h3>
            <div className="space-y-2">
              {service.steps.map((st) => (
                <div
                  key={st.stepNumber}
                  className="flex items-start space-x-3 p-3 bg-white rounded-lg border border-slate-200 shadow-2xs"
                >
                  <span className="w-6 h-6 rounded-full bg-[#0B2D5C] text-white font-extrabold text-[11px] flex items-center justify-center shrink-0">
                    {st.stepNumber}
                  </span>
                  <div>
                    <h4 className="font-bold text-slate-800 text-xs">{st.title}</h4>
                    <p className="text-[11px] text-slate-600 mt-0.5">{st.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-100 border-t border-slate-200 flex items-center justify-between">
          <span className="text-[11px] text-slate-500 font-medium">Informasi Layanan Resmi Komite Medik RST Pematang Siantar</span>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#0B2D5C] hover:bg-[#082247] text-white text-xs font-bold rounded-xl shadow-xs"
          >
            Tutup
          </button>
        </div>

      </div>
    </div>
  );
};
