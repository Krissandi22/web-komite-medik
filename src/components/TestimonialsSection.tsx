import React from 'react';
import { Star, Quote, Award, ShieldCheck } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      id: '1',
      name: 'Kolonel Ckm dr. Ginting, Sp.B',
      role: 'Kepala Rumah Sakit (Karumkit) RST Pematang Siantar',
      quote: 'Sistem tata kelola komite medik digital ini sangat membantu transparansi penerbitan SPK dan RKK. Pengawasan mutu medis dan akreditasi KARS menjadi lebih terintegrasi dan akurat.',
      rating: 5,
      avatar: '/src/assets/images/doctors/doctor_dr_siti_rahmah_sp_a_1785309386371.jpg',
      badge: 'Karumkit'
    },
    {
      id: '2',
      name: 'Mayor Ckm dr. Ahmad Fauzi, Sp.A',
      role: 'Ketua Sub-Komite Mutu Profesi',
      quote: 'Prosedur Audit Klinis dan Evaluasi Kinerja Profesi Berkelanjutan (OPPE) kini berjalan otomatis. Data kepatuhan PPK staf medis dapat dipantau secara real-time.',
      rating: 5,
      avatar: '/src/assets/images/doctors/doctor_dr_ahmad_fauzi_sp_a_1785309371092.jpg',
      badge: 'Sub-Komite Mutu'
    },
    {
      id: '3',
      name: 'dr. Budi Santoso, Sp.PD-KGEH',
      role: 'Ketua SMF Penyakit Dalam / Mitra Bestari',
      quote: 'Proses pengajuan re-kredensialing menjadi sangat cepat dan mudah diproses. Seluruh dokumen STR, SIP, dan sertifikat kompetensi dapat diverifikasi tanpa kendala berkas fisik.',
      rating: 5,
      avatar: '/src/assets/images/doctors/doctor_dr_budi_santoso_sp_pd_1785309382211.jpg',
      badge: 'Mitra Bestari'
    }
  ];

  return (
    <section className="py-20 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 bg-amber-50 text-amber-800 text-xs font-bold rounded-full border border-amber-200">
            <Award className="w-3.5 h-3.5 text-amber-600" />
            <span className="uppercase tracking-wider">APRESIASI & MITRA BESTARI</span>
          </div>
          <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0B2D5C] tracking-tight">
            What People Say About Us
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Apresiasi dan testimoni dari Kepala Rumah Sakit, Ketua Sub-Komite, dan Staf Medis Spesialis mengenai efisiensi sistem tata kelola medis Komite Medik RST.
          </p>
        </div>

        {/* 3 Review Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="bg-[#F8FAFC] rounded-3xl p-7 border border-slate-200/80 shadow-xs hover:shadow-xl hover:border-[#008080] transition-all duration-300 flex flex-col justify-between relative group"
            >
              <div className="space-y-4">
                {/* Quote Icon & Stars */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-8 h-8 text-[#008080]/20 group-hover:text-[#008080]/40 transition-colors" />
                </div>

                <p className="text-xs text-slate-700 italic leading-relaxed">
                  "{t.quote}"
                </p>
              </div>

              {/* Author Info */}
              <div className="pt-6 mt-6 border-t border-slate-200/60 flex items-center space-x-3.5">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-md shrink-0"
                  referrerPolicy="no-referrer"
                />
                <div className="flex-1 min-w-0">
                  <div className="font-serif-display text-sm font-bold text-[#0B2D5C] truncate">
                    {t.name}
                  </div>
                  <div className="text-[11px] text-slate-500 truncate">
                    {t.role}
                  </div>
                  <span className="inline-block text-[9px] font-extrabold text-[#008080] bg-teal-50 px-2 py-0.5 rounded-full mt-1 border border-teal-100">
                    {t.badge}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
