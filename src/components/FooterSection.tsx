import React, { useState } from 'react';
import { Shield, MapPin, Phone, Mail, Clock, ExternalLink, Globe, Lock, ArrowUpRight } from 'lucide-react';

interface FooterSectionProps {
  onNavigateSection: (sectionId: string) => void;
  onOpenDashboard: () => void;
}

export const FooterSection: React.FC<FooterSectionProps> = ({
  onNavigateSection,
  onOpenDashboard
}) => {
  const [showMapModal, setShowMapModal] = useState(false);

  return (
    <footer id="kontak" className="bg-[#06282E] text-slate-300 pt-16 pb-12 border-t-4 border-[#008080]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 4 Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          
          {/* Column 1: Profil */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-11 h-11 bg-white rounded-xl flex items-center justify-center p-1 shadow-md border border-slate-700 shrink-0">
                <img
                  src="/src/assets/images/logo_hesti_wira_sakti_1785328573896.jpg"
                  alt="Logo Hesti Wira Sakti Kesdam I/BB"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <span className="font-serif-display text-xl font-bold text-white tracking-tight">
                  KomiteMedik<span className="text-[#00A896]">.</span>
                </span>
                <span className="text-[11px] text-slate-400 block font-medium">RST Pematang Siantar</span>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Organisasi non-struktural pengawas tata kelola klinis, mutu profesi, kredensialing, dan disiplin dokter di lingkungan Rumah Sakit Tentara Pematang Siantar, Kesdam I/Bukit Barisan.
            </p>
          </div>

          {/* Column 2: Menu Navigasi */}
          <div className="space-y-3">
            <h4 className="font-serif-display text-sm font-bold text-white tracking-wide border-b border-slate-800 pb-2">
              Navigasi Utama
            </h4>
            <ul className="space-y-2 text-xs">
              {['beranda', 'profil', 'layanan', 'spesialis', 'faq', 'berita'].map((sec) => (
                <li key={sec}>
                  <button
                    onClick={() => onNavigateSection(sec)}
                    className="hover:text-[#00A896] transition-colors capitalize flex items-center space-x-1.5 text-slate-300"
                  >
                    <span className="text-[#008080]">•</span>
                    <span>{sec === 'profil' ? 'Tentang Komite' : sec === 'faq' ? 'Tanya Jawab FAQ' : sec}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Tugas Utama Komite Medik */}
          <div className="space-y-3">
            <h4 className="font-serif-display text-sm font-bold text-white tracking-wide border-b border-slate-800 pb-2">
              Tugas & Sub-Komite
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-center space-x-2">
                <span className="text-[#00A896]">✓</span>
                <span>Sub-Komite Kredensial Medis</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-[#00A896]">✓</span>
                <span>Sub-Komite Mutu Profesi & Audit</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-[#00A896]">✓</span>
                <span>Sub-Komite Etika & Disiplin Profesi</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-[#00A896]">✓</span>
                <span>Verifikasi SPK & Rincian Kewenangan Klinis</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-[#00A896]">✓</span>
                <span>Monitoring Kinerja Dokter (OPPE/FPPE)</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Kontak & Location */}
          <div className="space-y-3 text-xs">
            <h4 className="font-serif-display text-sm font-bold text-white tracking-wide border-b border-slate-800 pb-2">
              Sekretariat Komite Medik
            </h4>

            <div className="space-y-2.5">
              <div className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-[#00A896] shrink-0 mt-0.5" />
                <span>
                  Jl. Sutomo No. 1, Kel. Proklamasi, Kec. Siantar Barat, Kota Pematang Siantar, Sumatera Utara 21111
                </span>
              </div>

              <div className="flex items-center space-x-2.5">
                <Phone className="w-4 h-4 text-[#00A896] shrink-0" />
                <span>(0622) 21542 / Ext. 104 (Sekretariat)</span>
              </div>

              <div className="flex items-center space-x-2.5">
                <Mail className="w-4 h-4 text-[#00A896] shrink-0" />
                <span>komitemedik@rst-pematangsiantar.mil.id</span>
              </div>

              <div className="flex items-center space-x-2.5">
                <Clock className="w-4 h-4 text-[#00A896] shrink-0" />
                <span>Senin - Jumat: 08:00 - 16:00 WIB</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setShowMapModal(true)}
                className="w-full py-2 bg-white/10 hover:bg-white/20 text-white rounded-full text-xs font-bold border border-white/20 flex items-center justify-center space-x-2 transition-all"
              >
                <Globe className="w-3.5 h-3.5 text-amber-300" />
                <span>Lihat Peta Lokasi RST</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-2">
          <p>© {new Date().getFullYear()} Komite Medik Rumah Sakit Tentara Pematang Siantar — Kesdam I/Bukit Barisan. All Rights Reserved.</p>
          <div className="flex items-center space-x-4 text-[11px]">
            <span className="hover:text-white cursor-pointer">Privasi & Akses Data</span>
            <span>•</span>
            <span className="hover:text-white cursor-pointer">Syarat Penggunaan</span>
          </div>
        </div>

      </div>

      {/* Google Maps Interactive Modal */}
      {showMapModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 text-slate-800 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div className="flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-[#008080]" />
                <h3 className="font-serif-display text-base font-bold text-[#0B2D5C]">
                  Lokasi Rumah Sakit Tentara Pematang Siantar
                </h3>
              </div>
              <button
                onClick={() => setShowMapModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold flex items-center justify-center"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-600">
              Jl. Sutomo No. 1, Pematang Siantar, Sumatera Utara (Kompleks Kesdam I/Bukit Barisan).
            </p>

            <div className="w-full h-64 bg-slate-100 rounded-xl border border-slate-300 relative overflow-hidden">
              <iframe
                title="Peta Lokasi RST Pematang Siantar"
                src="https://maps.google.com/maps?q=Rumah%20Sakit%20Tentara%20Pematang%20Siantar&t=&z=15&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full border-0"
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setShowMapModal(false)}
                className="px-5 py-2 bg-[#008080] text-white text-xs font-bold rounded-full shadow-xs"
              >
                Tutup Peta
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};

