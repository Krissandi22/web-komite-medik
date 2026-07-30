import React, { useState } from 'react';
import { KredensialApplication } from '../../types';
import { RefreshCw, CheckCircle2, Clock, UserCheck, FileCheck, Shield, ChevronRight } from 'lucide-react';

interface ReCredentialingTrackerProps {
  applications: KredensialApplication[];
  onApproveApplication: (id: string) => void;
}

export const ReCredentialingTracker: React.FC<ReCredentialingTrackerProps> = ({
  applications,
  onApproveApplication
}) => {
  return (
    <div className="space-y-6">
      
      {/* Title */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold text-[#0B2D5C] tracking-tight">
            Tracker Re-Kredensialing & Verifikasi Staf Medis
          </h1>
          <p className="text-xs text-slate-600 mt-1">
            Proses verifikasi berkas, sidang Subkomite Kredensial, dan pendorongan penerbitan SPK/RKK oleh Karumkit
          </p>
        </div>
      </div>

      {/* List of Applications */}
      <div className="space-y-4">
        {applications.map((app) => (
          <div
            key={app.id}
            className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
              <div>
                <span className="px-2 py-0.5 bg-blue-100 text-[#0B2D5C] text-[10px] font-extrabold uppercase rounded">
                  {app.type}
                </span>
                <h3 className="text-base font-extrabold text-[#0B2D5C] mt-1">{app.doctorName}</h3>
                <p className="text-xs text-slate-500 font-medium">{app.specialty} • NRP/NIP: {app.doctorNrp}</p>
              </div>

              <div className="flex items-center space-x-2">
                <span className="px-3 py-1 bg-amber-100 text-amber-900 text-xs font-bold rounded-full border border-amber-300">
                  {app.status}
                </span>

                <button
                  onClick={() => onApproveApplication(app.id)}
                  className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg shadow-xs flex items-center space-x-1"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Setujui & Rekomendasikan</span>
                </button>
              </div>
            </div>

            {/* Scope RKK Checklist */}
            <div className="space-y-2">
              <span className="text-[11px] font-bold text-slate-500 uppercase block">
                Usulan Kewenangan Klinis (RKK):
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 text-xs text-slate-700">
                {app.rkkScope.map((scope, idx) => (
                  <div key={idx} className="p-2 bg-[#F7F9FC] rounded border border-slate-200 flex items-center space-x-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span className="truncate">{scope}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviewer Doctor & Notes */}
            {app.notes && (
              <p className="text-xs text-slate-500 italic bg-slate-50 p-2.5 rounded border border-slate-200">
                Catatan Penilai: "{app.notes}"
              </p>
            )}
          </div>
        ))}
      </div>

    </div>
  );
};
