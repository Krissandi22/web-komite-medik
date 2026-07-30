import React, { useState } from 'react';
import { DocumentItem } from '../types';
import { Search, Filter, FileText, Download, Eye, Calendar, Tag, ShieldAlert } from 'lucide-react';

interface RegulationsSectionProps {
  documents: DocumentItem[];
  onSelectDocument: (doc: DocumentItem) => void;
}

export const RegulationsSection: React.FC<RegulationsSectionProps> = ({
  documents,
  onSelectDocument
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');

  const categories = ['Semua', 'Kredensial', 'Mutu', 'Etik', 'PPK', 'SK', 'Administrasi'];

  const filteredDocs = documents.filter((doc) => {
    const matchesSearch =
      doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.documentNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.tags.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory = selectedCategory === 'Semua' || doc.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <section id="regulasi" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Portal Ministry Header */}
        <div className="bg-[#0B2D5C] text-white p-8 sm:p-10 rounded-3xl shadow-lg mb-10 relative overflow-hidden">
          {/* Background Orb */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#008080]/20 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 max-w-3xl space-y-3">
            <span className="px-3.5 py-1 bg-[#008080] text-white text-[11px] font-bold rounded-full">
              REPOSITORI DOKUMEN & REGULASI RESMI
            </span>
            <h2 className="font-serif-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
              Repositori Regulasi & Pedoman Tata Kelola
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Kumpulan Standar Operasional Prosedur (SOP), Panduan Praktik Klinis (PPK), Pedoman Kode Etik Profesi Kedokteran, dan Surat Keputusan Karumkit RST Pematang Siantar.
            </p>
          </div>
        </div>

        {/* Search & Category Filter Panel */}
        <div className="bg-[#F7F9FC] p-4 rounded-xl border border-slate-200 shadow-xs mb-6 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            
            {/* Live Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Cari kata kunci SOP, Pedoman, SK, Nomor Surat, atau Judul PPK..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-white text-slate-800 text-xs rounded-lg border border-slate-300 focus:outline-none focus:border-[#0B2D5C] shadow-xs"
              />
            </div>

            {/* Total Results Counter */}
            <div className="text-xs font-semibold text-slate-600 shrink-0">
              Menampilkan <span className="text-[#0B2D5C] font-bold">{filteredDocs.length}</span> dari {documents.length} dokumen
            </div>
          </div>

          {/* Category Filter Chips */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            <span className="text-xs font-bold text-slate-500 mr-2 flex items-center space-x-1">
              <Filter className="w-3.5 h-3.5" />
              <span>Kategori:</span>
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
                  selectedCategory === cat
                    ? 'bg-[#0B2D5C] text-white font-bold shadow-xs'
                    : 'bg-white text-slate-600 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Ministry Interactive Table */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#0B2D5C] text-white text-xs font-bold uppercase tracking-wider">
                  <th className="py-3.5 px-4">Nama Dokumen & Nomor SK</th>
                  <th className="py-3.5 px-4 w-32">Kategori</th>
                  <th className="py-3.5 px-4 w-24 text-center">Tahun</th>
                  <th className="py-3.5 px-4 w-28 text-center">Ukuran</th>
                  <th className="py-3.5 px-4 w-36 text-center">Aksi Dokumen</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-xs text-slate-700">
                {filteredDocs.length > 0 ? (
                  filteredDocs.map((doc) => (
                    <tr
                      key={doc.id}
                      className="hover:bg-blue-50/50 transition-colors duration-150"
                    >
                      <td className="py-4 px-4">
                        <div className="space-y-1">
                          <span className="font-extrabold text-[#0B2D5C] hover:underline cursor-pointer block text-xs" onClick={() => onSelectDocument(doc)}>
                            {doc.title}
                          </span>
                          <span className="text-[11px] font-mono text-slate-500 block">
                            {doc.documentNumber}
                          </span>
                          <p className="text-[11px] text-slate-600 line-clamp-1 font-normal">
                            {doc.summary}
                          </p>
                        </div>
                      </td>

                      <td className="py-4 px-4">
                        <span className="inline-block px-2.5 py-1 text-[11px] font-bold rounded bg-slate-100 text-[#0B2D5C] border border-slate-200">
                          {doc.category}
                        </span>
                      </td>

                      <td className="py-4 px-4 text-center font-bold text-slate-700">
                        {doc.year}
                      </td>

                      <td className="py-4 px-4 text-center text-slate-500 font-mono text-[11px]">
                        {doc.fileSize}
                      </td>

                      <td className="py-4 px-4 text-center">
                        <div className="flex items-center justify-center space-x-2">
                          <button
                            onClick={() => onSelectDocument(doc)}
                            className="px-2.5 py-1.5 bg-[#0B2D5C] hover:bg-[#082247] text-white text-[11px] font-bold rounded flex items-center space-x-1 shadow-xs transition-colors"
                            title="Pratinjau Dokumen"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>Lihat</span>
                          </button>

                          <button
                            onClick={() => onSelectDocument(doc)}
                            className="px-2 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-semibold rounded border border-slate-300"
                            title="Unduh Berkas PDF"
                          >
                            <Download className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-slate-500">
                      <p className="font-semibold text-xs">Tidak ada dokumen yang sesuai dengan kata kunci pencarian.</p>
                      <button
                        onClick={() => {
                          setSearchTerm('');
                          setSelectedCategory('Semua');
                        }}
                        className="mt-2 text-xs text-[#0B2D5C] font-bold underline"
                      >
                        Reset Filter
                      </button>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </section>
  );
};
