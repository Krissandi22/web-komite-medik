import React, { useState } from 'react';
import { Search, Shield, Lock, Menu, X, ArrowUpRight, Sparkles } from 'lucide-react';

interface HeaderNavbarProps {
  onOpenSearch: () => void;
  onOpenDashboard: () => void;
  onOpenLogin: () => void;
  activeSection: string;
  onNavigateSection: (sectionId: string) => void;
}

export const HeaderNavbar: React.FC<HeaderNavbarProps> = ({
  onOpenSearch,
  onOpenDashboard,
  onOpenLogin,
  activeSection,
  onNavigateSection
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems = [
    { id: 'beranda', label: 'Beranda' },
    { id: 'profil', label: 'Tentang' },
    { id: 'jadwal-dokter', label: 'Jadwal Dokter' },
    { id: 'layanan', label: 'Layanan' },
    { id: 'spesialis', label: 'Spesialis' },
    { id: 'faq', label: 'FAQ' },
    { id: 'berita', label: 'Berita' },
  ];

  const handleNavClick = (id: string) => {
    onNavigateSection(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs h-[76px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
        
        {/* Left: Brand Logos */}
        <div 
          className="flex items-center space-x-3 cursor-pointer group"
          onClick={() => handleNavClick('beranda')}
        >
          {/* Logo Badge Hesti Wira Sakti */}
          <div className="w-11 h-11 bg-white rounded-xl flex items-center justify-center p-1 shadow-sm border border-slate-200 transition-transform group-hover:scale-105 shrink-0">
            <img
              src="/src/assets/images/logo_hesti_wira_sakti_1785328573896.jpg"
              alt="Logo Hesti Wira Sakti TNI AD"
              className="w-full h-full object-contain"
            />
          </div>

          <div className="flex flex-col">
            <div className="flex items-center space-x-1.5">
              <span className="font-serif-display text-xl sm:text-2xl font-bold text-[#0B2D5C] tracking-tight">
                KomiteMedik<span className="text-[#008080]">.</span>
              </span>
              <span className="text-[10px] font-extrabold px-1.5 py-0.2 bg-red-800 text-white rounded tracking-wider uppercase ml-1">
                RST
              </span>
            </div>
            <span className="text-[11px] text-slate-500 font-medium tracking-tight -mt-0.5">
              Rumah Sakit Tentara Pematang Siantar
            </span>
          </div>
        </div>

        {/* Center: Main Navigation Menu (Desktop) */}
        <nav className="hidden lg:flex items-center space-x-1 bg-slate-100/80 p-1.5 rounded-full border border-slate-200">
          {menuItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                  isActive
                    ? 'text-white bg-[#008080] font-bold shadow-xs'
                    : 'text-slate-600 hover:text-[#0B2D5C] hover:bg-white/60'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right Actions: Search & Login */}
        <div className="hidden sm:flex items-center space-x-3">
          {/* Search Trigger */}
          <button
            onClick={onOpenSearch}
            className="flex items-center space-x-2 px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-full transition-colors border border-slate-200"
            title="Cari Dokter, Layanan, atau Info Klinik (Ctrl+K)"
          >
            <Search className="w-4 h-4 text-[#008080]" />
            <span className="font-medium text-xs">Cari Portal...</span>
          </button>

          {/* Login Portal Button */}
          <button
            onClick={onOpenLogin}
            className="group flex items-center space-x-2 px-4 py-2 bg-[#008080] hover:bg-[#005F73] text-white text-xs font-bold rounded-full shadow-xs transition-all duration-200"
          >
            <Lock className="w-3.5 h-3.5 text-amber-300" />
            <span>Login Portal</span>
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex lg:hidden items-center space-x-2">
          <button
            onClick={onOpenSearch}
            className="p-2 text-slate-600 hover:bg-slate-100 rounded-full"
            aria-label="Cari"
          >
            <Search className="w-5 h-5" />
          </button>
          
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-700 hover:bg-slate-100 rounded-full"
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 shadow-xl px-4 pt-3 pb-5 space-y-3">
          {/* Mobile Drawer Navigation */}
          <div className="grid grid-cols-2 gap-1 mb-1">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-left px-3.5 py-2 text-xs font-semibold rounded-lg ${
                  activeSection === item.id
                    ? 'bg-[#008080] text-white font-bold'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-100">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenLogin();
              }}
              className="w-full py-2.5 bg-[#008080] hover:bg-[#005F73] text-white text-xs font-extrabold rounded-xl shadow-xs flex items-center justify-center space-x-2"
            >
              <Lock className="w-4 h-4 text-amber-300" />
              <span>Login Portal Internal</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

