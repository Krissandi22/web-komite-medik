import React from 'react';
import { ShieldCheck, FileText, ArrowUpRight, Award, CheckCircle2, Users, Stethoscope } from 'lucide-react';

interface HeroSectionProps {
  onNavigateSection: (sectionId: string) => void;
  onOpenDashboard: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onNavigateSection,
  onOpenDashboard
}) => {
  return (
    <section id="beranda" className="relative text-white py-16 lg:py-24 overflow-hidden bg-slate-900">
      {/* Background Hospital Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('/src/assets/images/rst_pematang_siantar_building_1785319898487.jpg')` }}
      />
      {/* Dark Overlay Gradient for optimal readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#06282E]/95 via-[#06282E]/85 to-[#06282E]/70 backdrop-blur-[1px]" />

      {/* Background Decorative Gradient Orbs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#008080]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#00A896]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Content Column (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Top Badge Pill with Hesti Wira Sakti Emblem */}
            <div className="inline-flex items-center space-x-2.5 px-4 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-xs font-semibold text-emerald-300 shadow-xs">
              <img
                src="/src/assets/images/logo_hesti_wira_sakti_1785328573896.jpg"
                alt="Logo Hesti Wira Sakti"
                className="w-5 h-5 object-contain rounded-full bg-white p-0.5"
              />
              <span>Sistem Tata Kelola Klinik & Kredensialing Medis RST</span>
            </div>

            {/* Display Headline in Serif */}
            <h1 className="font-serif-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.15]">
              Advanced Care,<br />
              <span className="italic text-[#00A896] font-normal">Compassionate Touch</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-2xl">
              Portal Resmi Komite Medik Rumah Sakit Tentara Pematang Siantar. Menjamin mutu pelayanan, kredensialing dokter yang transparan, dan kepemimpinan klinis berstandar tinggi.
            </p>

            {/* Bullet Points */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs font-semibold text-slate-200">
              <div className="flex items-center space-x-2.5">
                <div className="w-5 h-5 rounded-full bg-[#008080]/30 text-emerald-400 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <span>Kredensialing & Re-kredensialing Transparan</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <div className="w-5 h-5 rounded-full bg-[#008080]/30 text-emerald-400 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <span>Audit Klinis & Indikator Mutu Profesi</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <div className="w-5 h-5 rounded-full bg-[#008080]/30 text-emerald-400 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <span>Pembinaan Etika & Disiplin Staf Medis</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <div className="w-5 h-5 rounded-full bg-[#008080]/30 text-emerald-400 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <span>Rincian Kewenangan Klinis (RKK & SPK)</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-4">
              <button
                onClick={() => onNavigateSection('jadwal-dokter')}
                className="px-6 py-3.5 bg-[#008080] hover:bg-[#005F73] text-white text-xs font-bold rounded-xl shadow-lg transition-all flex items-center space-x-2"
              >
                <Stethoscope className="w-4 h-4 text-amber-300" />
                <span>Cari Jadwal Dokter & Poliklinik</span>
              </button>
            </div>
          </div>

          {/* Right Image Frame Column (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none rounded-3xl overflow-hidden shadow-2xl border border-white/20 bg-slate-900 group">
              
              {/* Hero Photo */}
              <img
                src="/src/assets/images/rst_pematang_siantar_building_1785319898487.jpg"
                alt="Bangunan Gedung Rumah Sakit Tentara Pematang Siantar"
                className="w-full h-[440px] object-cover object-center transition-transform duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />

              {/* Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#06282E] via-[#06282E]/30 to-transparent p-6 flex flex-col justify-end">

                {/* Bottom Floating Stats Box */}
                <div className="bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-xl text-slate-900 border border-white/40 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                        <Users className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-[#0B2D5C]">Standar Mutu Klinik</div>
                        <div className="text-[10px] text-slate-500">Akreditasi Paripurna Kemenkes</div>
                      </div>
                    </div>
                    <span className="text-xs font-extrabold text-[#008080] bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                      100% Valid
                    </span>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

