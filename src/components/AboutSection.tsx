import React, { useState } from 'react';
import { Shield, CheckCircle2, ArrowUpRight, Scale, Activity, Award, ChevronRight, X, FileText, UserCheck, BookOpen } from 'lucide-react';

interface AboutSectionProps {
  onSelectService: (serviceId: string) => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onSelectService }) => {
  const [activeTab, setActiveTab] = useState<'fungsi' | 'tugas' | 'wewenang'>('fungsi');
  const [showModal, setShowModal] = useState<boolean>(false);

  const timelineSteps = [
    {
      id: 'kredensial',
      title: 'Kredensialing',
      step: '01',
      desc: 'Evaluasi keabsahan STR, SIP & kompetensi awal dokter baru.',
      serviceId: 'srv-1'
    },
    {
      id: 'rekredensial',
      title: 'Rekredensial',
      step: '02',
      desc: 'Evaluasi berkala kewenangan klinis staf medis 3 tahunan.',
      serviceId: 'srv-2'
    },
    {
      id: 'audit',
      title: 'Audit Klinis',
      step: '03',
      desc: 'Penilaian kepatuhan PPK & indikator keselamatan pasien.',
      serviceId: 'srv-4'
    },
    {
      id: 'peer-review',
      title: 'Peer Review',
      step: '04',
      desc: 'Evaluasi kinerja profesi berkelanjutan (OPPE) oleh mitra bestari.',
      serviceId: 'srv-5'
    },
    {
      id: 'etik',
      title: 'Pembinaan Etik',
      step: '05',
      desc: 'Penegakan disiplin profesi & etika kedokteran militer.',
      serviceId: 'srv-6'
    }
  ];

  return (
    <section id="profil" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header Matching Mockup */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          
          {/* Left Column (6 cols): Title & Key Bullets */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1 bg-[#008080]/10 text-[#008080] text-xs font-bold rounded-full">
              <Shield className="w-3.5 h-3.5" />
              <span className="uppercase tracking-wider">TATA KELOLA KLINIK UNGGUL</span>
            </div>

            <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0B2D5C] tracking-tight leading-tight">
              Committed to Excellence in Healthcare
            </h2>

            {/* Bullet List with Emerald Diamond Badges */}
            <div className="space-y-3 pt-2">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-md bg-[#008080]/15 text-[#008080] flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <span className="text-sm font-semibold text-slate-700">
                  Dokter spesialis bersertifikat & berpengalaman dalam bidang kedokteran militer & umum.
                </span>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-md bg-[#008080]/15 text-[#008080] flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <span className="text-sm font-semibold text-slate-700">
                  Prosedur kredensialing & penerbitan Rincian Kewenangan Klinis (RKK) yang terintegrasi.
                </span>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-md bg-[#008080]/15 text-[#008080] flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <span className="text-sm font-semibold text-slate-700">
                  Pengawasan mutu medis berkala dan penegakan etika profesi yang konsisten.
                </span>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-md bg-[#008080]/15 text-[#008080] flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <span className="text-sm font-semibold text-slate-700">
                  Dukungan kepemimpinan klinis responsif demi keselamatan pasien (Patient Safety).
                </span>
              </div>
            </div>

            {/* Teal Pill Action Button matching mockup */}
            <div className="pt-2">
              <button
                onClick={() => {
                  setActiveTab('fungsi');
                  setShowModal(true);
                  const el = document.getElementById('komite-detail-tabs');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="group inline-flex items-center space-x-2 pl-6 pr-2 py-3 bg-[#008080] hover:bg-[#005F73] text-white text-xs font-bold rounded-full shadow-md transition-all duration-200 cursor-pointer"
              >
                <span>Selengkapnya Tentang Komite</span>
                <div className="w-7 h-7 rounded-full bg-white text-[#008080] flex items-center justify-center transition-transform group-hover:translate-x-1">
                  <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
                </div>
              </button>
            </div>
          </div>

          {/* Right Column (6 cols): Paragraph + Image Card with "25+ YEARS" Vertical Badge */}
          <div className="lg:col-span-6 space-y-6">
            <p className="text-sm text-slate-600 leading-relaxed">
              Komite Medik Rumah Sakit Tentara Pematang Siantar merupakan perangkat non-struktural yang bertanggung jawab langsung kepada Kepala Rumah Sakit untuk memastikan seluruh pelayanan medis dilaksanakan secara profesional, beretika, dan memenuhi standar akreditasi nasional.
            </p>

            {/* Image Box with Floating 25+ Badge */}
            <div className="relative rounded-3xl overflow-hidden shadow-xl border border-slate-200 group">
              <img
                src="/src/assets/images/committee_meeting_1785309357072.jpg"
                alt="Dokter Diskusi Kasus Medis"
                className="w-full h-[320px] object-cover transition-transform duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />

              {/* Floating Badge matching Mockup (Vertical Experience Tag) */}
              <div className="absolute bottom-4 right-4 bg-[#0B2D5C]/95 backdrop-blur-md p-3.5 rounded-2xl shadow-2xl border border-white/20 text-white flex items-center space-x-3">
                <div className="text-3xl font-extrabold text-amber-400 font-serif-display">
                  25+
                </div>
                <div className="text-[10px] font-bold text-slate-200 uppercase tracking-widest leading-tight">
                  Tahun Abdi<br />
                  <span className="text-emerald-400">Medis TNI AD</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Tabbed Principles & Function Details */}
        <div id="komite-detail-tabs" className="bg-[#F8FAFC] rounded-2xl border border-slate-200 p-6 md:p-8 shadow-xs space-y-6">
          <div className="flex border-b border-slate-200 overflow-x-auto">
            <button
              onClick={() => setActiveTab('fungsi')}
              className={`px-6 py-3 text-xs font-bold text-center border-b-2 transition-all whitespace-nowrap ${
                activeTab === 'fungsi'
                  ? 'border-[#008080] text-[#008080] bg-white font-extrabold'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              Fungsi Utama Komite
            </button>
            <button
              onClick={() => setActiveTab('tugas')}
              className={`px-6 py-3 text-xs font-bold text-center border-b-2 transition-all whitespace-nowrap ${
                activeTab === 'tugas'
                  ? 'border-[#008080] text-[#008080] bg-white font-extrabold'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              Tugas Sub-Komite
            </button>
            <button
              onClick={() => setActiveTab('wewenang')}
              className={`px-6 py-3 text-xs font-bold text-center border-b-2 transition-all whitespace-nowrap ${
                activeTab === 'wewenang'
                  ? 'border-[#008080] text-[#008080] bg-white font-extrabold'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              Wewenang & Kewenangan Klinis
            </button>
          </div>

          {/* Tab Content Panels */}
          {activeTab === 'fungsi' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-700">
              <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-xs space-y-2">
                <div className="w-8 h-8 rounded-lg bg-teal-50 text-[#008080] flex items-center justify-center font-bold">
                  <Shield className="w-4 h-4" />
                </div>
                <h4 className="font-bold text-slate-900 text-sm">1. Sub-Komite Kredensial</h4>
                <p className="text-slate-600 leading-relaxed">
                  Merekomendasikan Kewenangan Klinis (RKK) dokter melalui verifikasi berkas STR, SIP, ijazah spesialis, dan sertifikat kompetensi.
                </p>
              </div>

              <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-xs space-y-2">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
                  <Activity className="w-4 h-4" />
                </div>
                <h4 className="font-bold text-slate-900 text-sm">2. Sub-Komite Mutu Profesi</h4>
                <p className="text-slate-600 leading-relaxed">
                  Menjaga mutu pelayanan melalui Audit Klinis, Panduan Praktik Klinis (PPK), dan Evaluasi Kinerja Profesi Berkelanjutan (OPPE).
                </p>
              </div>

              <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-xs space-y-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                  <Scale className="w-4 h-4" />
                </div>
                <h4 className="font-bold text-slate-900 text-sm">3. Sub-Komite Etik & Disiplin</h4>
                <p className="text-slate-600 leading-relaxed">
                  Melakukan pembinaan etika kedokteran, pencegahan pelanggaran disiplin profesi, dan penanganan insiden klinis secara objektif.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'tugas' && (
            <div className="space-y-3 text-xs text-slate-700 bg-white p-5 rounded-xl border border-slate-200">
              <p className="font-bold text-slate-800 text-sm">
                Tugas pokok Komite Medik meliputi:
              </p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-[#008080] shrink-0 mt-0.5" />
                  <span>Penyelenggaraan kredensialing bagi seluruh staf medis yang akan melakukan tindakan klinis di RST.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-[#008080] shrink-0 mt-0.5" />
                  <span>Penyelenggaraan dan pemeliharaan mutu profesi staf medis melalui audit medis & evaluasi berkala.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-[#008080] shrink-0 mt-0.5" />
                  <span>Rekomendasi tindak lanjut pembinaan etika dan disiplin profesi dokter kepada Kepala Rumah Sakit.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-[#008080] shrink-0 mt-0.5" />
                  <span>Penyusunan Rincian Kewenangan Klinis (RKK) sesuai spesialisasi dan kualifikasi dokter.</span>
                </li>
              </ul>
            </div>
          )}

          {activeTab === 'wewenang' && (
            <div className="space-y-3 text-xs text-slate-700 bg-white p-5 rounded-xl border border-slate-200">
              <p className="font-bold text-slate-800 text-sm">
                Komite Medik memiliki wewenang resmi:
              </p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span>Menerbitkan Surat Rekomendasi Rincian Kewenangan Klinis (RKK) dokter kepada Karumkit.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span>Merekomendasikan pemulihan, pembatasan, atau pencabutan kewenangan klinis tertentu.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span>Membentuk Panitia Adhoc / Panel Mitra Bestari (Peer Reviewer) untuk penelaahan kasus spesifik.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span>Memberikan saran profesional terkait tata kelola medis dalam akreditasi rumah sakit.</span>
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* Timeline Steps Card */}
        <div className="mt-12 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="font-serif-display text-lg font-bold text-[#0B2D5C]">
                Alur Tahapan Tata Kelola Profesi Medis
              </h3>
              <p className="text-xs text-slate-500">
                Siklus terintegrasi pengawasan dan pengembangan mutu dokter di RST Pematang Siantar
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
            {timelineSteps.map((step) => (
              <div
                key={step.id}
                onClick={() => onSelectService(step.serviceId)}
                className="bg-[#F8FAFC] hover:bg-teal-50/60 p-4 rounded-xl border border-slate-200 hover:border-[#008080] transition-all duration-200 cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-black text-[#008080] bg-white px-2 py-0.5 rounded-full border border-slate-200">
                      {step.step}
                    </span>
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#008080] group-hover:translate-x-1 transition-all" />
                  </div>
                  <h4 className="text-xs font-bold text-slate-800 group-hover:text-[#008080] mb-1">
                    {step.title}
                  </h4>
                  <p className="text-[11px] text-slate-600 leading-snug">
                    {step.desc}
                  </p>
                </div>
                <span className="text-[10px] text-[#008080] font-bold mt-3 block group-hover:underline">
                  Prosedur →
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Modal Profil Lengkap Komite Medik */}
        {showModal && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full overflow-hidden border border-slate-200 flex flex-col max-h-[90vh]">
              
              {/* Modal Header */}
              <div className="bg-[#0B2D5C] text-white p-6 relative flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-amber-400">
                    <Shield className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest block">
                      RUMAH SAKIT TENTARA PEMATANG SIANTAR
                    </span>
                    <h3 className="text-lg font-bold text-white">Profil Lengkap Komite Medik</h3>
                  </div>
                </div>

                <button
                  onClick={() => setShowModal(false)}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6 overflow-y-auto space-y-6 text-xs text-slate-700">
                
                {/* Landasan Hukum & Kedudukan */}
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                  <div className="flex items-center space-x-2 text-[#008080] font-bold text-sm">
                    <BookOpen className="w-4 h-4" />
                    <span>Landasan Hukum & Kedudukan Organisasi</span>
                  </div>
                  <p className="leading-relaxed">
                    Komite Medik dibentuk berdasarkan Permenkes RI No. 755/MENKES/PER/IV/2011 dan Keputusan Kepala Rumah Sakit Tentara Pematang Siantar. Komite Medik merupakan wadah non-struktural yang berada di bawah dan bertanggung jawab langsung kepada Karumkit.
                  </p>
                </div>

                {/* 3 Sub-Komite Detail */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-teal-50/60 rounded-xl border border-teal-200 space-y-2">
                    <div className="w-8 h-8 rounded-lg bg-[#008080] text-white flex items-center justify-center font-bold">
                      <UserCheck className="w-4 h-4" />
                    </div>
                    <h4 className="font-bold text-[#0B2D5C] text-sm">Sub-Komite Kredensial</h4>
                    <p className="text-slate-600 leading-relaxed">
                      Mengelola proses awal dan berkala (3 tahunan) bagi seluruh dokter staf medis. Menyusun White Paper Kewenangan Klinis dan merekomendasikan penerbitan SPK/RKK oleh Karumkit.
                    </p>
                  </div>

                  <div className="p-4 bg-blue-50/60 rounded-xl border border-blue-200 space-y-2">
                    <div className="w-8 h-8 rounded-lg bg-blue-700 text-white flex items-center justify-center font-bold">
                      <Activity className="w-4 h-4" />
                    </div>
                    <h4 className="font-bold text-[#0B2D5C] text-sm">Sub-Komite Mutu Profesi</h4>
                    <p className="text-slate-600 leading-relaxed">
                      Melakukan evaluasi kinerja profesi dokter (OPPE & FPPE), memantau kepatuhan Panduan Praktik Klinis (PPK), dan menyelenggarakan Audit Medis berkala.
                    </p>
                  </div>

                  <div className="p-4 bg-amber-50/60 rounded-xl border border-amber-200 space-y-2">
                    <div className="w-8 h-8 rounded-lg bg-amber-600 text-white flex items-center justify-center font-bold">
                      <Scale className="w-4 h-4" />
                    </div>
                    <h4 className="font-bold text-[#0B2D5C] text-sm">Sub-Komite Etik & Disiplin</h4>
                    <p className="text-slate-600 leading-relaxed">
                      Membina etika dan disiplin profesi kedokteran militer, menangani laporan indikasi pelanggaran, serta menyelenggarakan panel peradilan etik (Peer Review).
                    </p>
                  </div>
                </div>

                {/* Visi Misi Tata Kelola */}
                <div className="bg-[#F8FAFC] p-4 rounded-xl border border-slate-200 space-y-2">
                  <h4 className="font-bold text-[#0B2D5C] text-sm">Tujuan Utama Tata Kelola Medis</h4>
                  <ul className="space-y-1.5 list-disc pl-4 text-slate-600">
                    <li>Menjamin seluruh tindakan medis dilakukan oleh dokter bersertifikat dan berwenang (RKK Aktif).</li>
                    <li>Melindungi keselamatan pasien (Patient Safety) dari risiko malpraktik dan pelayanan non-standar.</li>
                    <li>Meningkatkan reputasi dan akreditasi Rumah Sakit Tentara Pematang Siantar di jajaran Kesdam I/BB.</li>
                  </ul>
                </div>

              </div>

              {/* Modal Footer */}
              <div className="p-4 bg-slate-100 border-t border-slate-200 flex justify-end">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-5 py-2 bg-[#0B2D5C] hover:bg-[#082247] text-white font-bold rounded-lg text-xs"
                >
                  Tutup Informasi
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};

