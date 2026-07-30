import React, { useState, useEffect } from 'react';
import { Doctor, NewsItem, ServiceDetail } from '../types';
import { Search, X, Stethoscope, Newspaper, Shield, ChevronRight, Lock } from 'lucide-react';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  doctors: Doctor[];
  news: NewsItem[];
  services: ServiceDetail[];
  onSelectDoctor: (doc: Doctor) => void;
  onSelectNews: (news: NewsItem) => void;
  onSelectService: (serviceId: string) => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  doctors,
  news,
  services,
  onSelectDoctor,
  onSelectNews,
  onSelectService
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredDoctors = query
    ? doctors.filter(
        (d) =>
          d.name.toLowerCase().includes(query.toLowerCase()) ||
          d.specialty.toLowerCase().includes(query.toLowerCase()) ||
          d.pangkat.toLowerCase().includes(query.toLowerCase())
      )
    : doctors.slice(0, 3);

  const filteredNews = query
    ? news.filter(
        (n) =>
          n.title.toLowerCase().includes(query.toLowerCase()) ||
          n.summary.toLowerCase().includes(query.toLowerCase())
      )
    : news.slice(0, 2);

  const filteredServices = query
    ? services.filter(
        (s) =>
          s.title.toLowerCase().includes(query.toLowerCase()) ||
          s.shortDesc.toLowerCase().includes(query.toLowerCase())
      )
    : services.slice(0, 3);

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-2xs flex items-start justify-center pt-16 px-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full overflow-hidden border border-slate-200">
        
        {/* Search Header */}
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center space-x-3">
          <Search className="w-5 h-5 text-slate-400" />
          <input
            type="text"
            autoFocus
            placeholder="Cari Dokter, Poliklinik, Spesialis, Berita, atau Layanan Kredensial..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-sm text-slate-800 placeholder-slate-400 focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Security Restrict Notice Banner */}
        <div className="bg-amber-50 border-b border-amber-200/80 px-4 py-2 flex items-center space-x-2 text-[11px] text-amber-900 font-medium">
          <Lock className="w-3.5 h-3.5 text-amber-700 shrink-0" />
          <span>
            <strong>Kebijakan Keamanan:</strong> Dokumen internal, SK, & SOP Kerahasiaan Medis tidak dapat diakses melalui Pencarian Umum. Silakan Login ke Portal Internal.
          </span>
        </div>

        {/* Results Container */}
        <div className="max-h-[70vh] overflow-y-auto p-4 space-y-6 divide-y divide-slate-100 text-xs">
          
          {/* Section: Doctors */}
          {filteredDoctors.length > 0 && (
            <div className="space-y-2 pt-2">
              <div className="flex items-center space-x-2 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                <Stethoscope className="w-3.5 h-3.5 text-[#0B2D5C]" />
                <span>Dokter & Staf Medis ({filteredDoctors.length})</span>
              </div>
              <div className="space-y-1.5">
                {filteredDoctors.map((doc) => (
                  <div
                    key={doc.id}
                    onClick={() => {
                      onSelectDoctor(doc);
                      onClose();
                    }}
                    className="p-2.5 rounded-lg hover:bg-blue-50/70 border border-transparent hover:border-blue-200 transition-colors cursor-pointer flex items-center justify-between"
                  >
                    <div>
                      <span className="font-extrabold text-[#0B2D5C] block">{doc.name}</span>
                      <span className="text-[11px] text-slate-500">{doc.pangkat} • {doc.specialty}</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section: Services */}
          {filteredServices.length > 0 && (
            <div className="space-y-2 pt-4">
              <div className="flex items-center space-x-2 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                <Shield className="w-3.5 h-3.5 text-[#0F8B8D]" />
                <span>Layanan Kredensial & Mutu</span>
              </div>
              <div className="space-y-1.5">
                {filteredServices.map((srv) => (
                  <div
                    key={srv.id}
                    onClick={() => {
                      onSelectService(srv.id);
                      onClose();
                    }}
                    className="p-2.5 rounded-lg hover:bg-blue-50/70 border border-transparent hover:border-blue-200 transition-colors cursor-pointer flex items-center justify-between"
                  >
                    <div>
                      <span className="font-bold text-slate-800 block">{srv.title}</span>
                      <span className="text-[11px] text-slate-500">{srv.shortDesc}</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section: News */}
          {filteredNews.length > 0 && (
            <div className="space-y-2 pt-4">
              <div className="flex items-center space-x-2 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                <Newspaper className="w-3.5 h-3.5 text-blue-600" />
                <span>Pengumuman & Berita ({filteredNews.length})</span>
              </div>
              <div className="space-y-1.5">
                {filteredNews.map((n) => (
                  <div
                    key={n.id}
                    onClick={() => {
                      onSelectNews(n);
                      onClose();
                    }}
                    className="p-2.5 rounded-lg hover:bg-blue-50/70 border border-transparent hover:border-blue-200 transition-colors cursor-pointer flex items-center justify-between"
                  >
                    <div>
                      <span className="font-bold text-slate-800 block">{n.title}</span>
                      <span className="text-[11px] text-slate-500">{n.date} • {n.category}</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Footer info */}
        <div className="p-3 bg-slate-100 border-t border-slate-200 text-[11px] text-slate-500 flex items-center justify-between">
          <span>Ketik untuk memfilter pencarian</span>
          <span className="font-mono text-[10px]">ESC untuk menutup</span>
        </div>

      </div>
    </div>
  );
};
