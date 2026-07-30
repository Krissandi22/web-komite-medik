import React from 'react';
import { Users, Award, CheckCircle2, Shield } from 'lucide-react';

export const PeerReviewManager: React.FC = () => {
  const reviews = [
    {
      id: 'pr-1',
      doctor: 'dr. Hendra Setiawan, Sp.B',
      reviewer: 'Panel Mitra Bestari Bedah Digestif',
      scope: 'Evaluasi Prosedur Laparoskopi Kolesistektomi & Apendektomi Minimal Invasif',
      score: 'Sangat Baik (98/100)',
      date: '2026-07-05',
      status: 'Terverifikasi Komite'
    },
    {
      id: 'pr-2',
      doctor: 'dr. Rahmad Hidayat, Sp.PD, K-HOM',
      reviewer: 'Kolegium Penyakit Dalam / Subspesialis Hematologi',
      scope: 'Evaluasi Protokol Kemoterapi & Transfusi Onkologi Medis',
      score: 'Sangat Baik (96/100)',
      date: '2026-06-20',
      status: 'Terverifikasi Komite'
    },
    {
      id: 'pr-3',
      doctor: 'dr. Budi Santoso, Sp.S',
      reviewer: 'Mitra Bestari Neurologi Intervensi',
      scope: 'Penambahan Kewenangan Trombolisis Stroke Iskemik Akut',
      score: 'Memenuhi Syarat (92/100)',
      date: '2026-07-15',
      status: 'Menunggu Pengesahan Karumkit'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
        <h1 className="text-xl font-extrabold text-[#0B2D5C] tracking-tight">
          Sub Komite Mutu & Kredensial — Panel Peer Review (Mitra Bestari)
        </h1>
        <p className="text-xs text-slate-600 mt-1">
          Evaluasi Kinerja Profesi Berkelanjutan (OPPE) dan Penilaian Kelayakan Kewenangan Klinis oleh Dokter Sejawat
        </p>
      </div>

      <div className="space-y-4">
        {reviews.map((rev) => (
          <div key={rev.id} className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div>
                <span className="px-2 py-0.5 bg-indigo-100 text-indigo-900 text-[10px] font-bold rounded">
                  OPPE SEJAWAT
                </span>
                <h3 className="text-base font-extrabold text-[#0B2D5C] mt-1">{rev.doctor}</h3>
                <p className="text-xs text-slate-500">Penilai: {rev.reviewer}</p>
              </div>

              <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full">
                {rev.status}
              </span>
            </div>

            <p className="text-xs text-slate-700">
              <strong>Lingkup Asesmen:</strong> {rev.scope}
            </p>

            <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-100">
              <span className="font-bold text-[#0F8B8D]">Skor Kelayakan: {rev.score}</span>
              <span className="text-slate-400 font-mono">Tgl Evaluasi: {rev.date}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
