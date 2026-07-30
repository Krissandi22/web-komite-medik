import React, { useState } from 'react';
import { DocumentItem, UserRole } from '../../types';
import { FolderKanban, Plus, FileText, Download, Trash2, Upload, CheckCircle2, X } from 'lucide-react';

interface DocumentManagerProps {
  documents: DocumentItem[];
  onAddDocument: (doc: DocumentItem) => void;
  role?: UserRole;
  hideUpload?: boolean;
}

export const DocumentManager: React.FC<DocumentManagerProps> = ({
  documents,
  onAddDocument,
  role,
  hideUpload = false
}) => {
  const isKetua = role === 'ketua' || hideUpload;
  const [showAddModal, setShowAddModal] = useState(false);
  const [title, setTitle] = useState('');
  const [docNumber, setDocNumber] = useState('');
  const [category, setCategory] = useState<DocumentItem['category']>('SOP' as any);
  const [summary, setSummary] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;

    const sizeFormatted = selectedFile
      ? `${(selectedFile.size / (1024 * 1024)).toFixed(1)} MB`
      : '2.5 MB';

    const newDoc: DocumentItem = {
      id: `doc-reg-${Date.now()}`,
      title,
      documentNumber: docNumber || 'SOP/KOMMED/RST-PS/2026/NEW',
      category: category as any,
      year: 2026,
      datePublished: new Date().toISOString().split('T')[0],
      fileSize: sizeFormatted,
      fileType: selectedFile ? selectedFile.name.split('.').pop()?.toUpperCase() || 'PDF' : 'PDF',
      downloadCount: 1,
      summary: summary || 'Dokumen resmi Komite Medik RST Pematang Siantar.',
      tags: ['SOP', 'Komite Medik', 'Regulasi'],
      approvedBy: 'Karumkit RST Pematang Siantar'
    };

    onAddDocument(newDoc);
    setShowAddModal(false);
    setTitle('');
    setDocNumber('');
    setSummary('');
    setSelectedFile(null);
  };

  return (
    <div className="space-y-6 font-sans">
      
      {/* Title */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold text-[#0B2D5C] tracking-tight">
            Manajemen Dokumen, SOP & SK Regulasi Medis
          </h1>
          <p className="text-xs text-slate-600 mt-1">
            {isKetua
              ? 'Daftar dokumen resmi SOP, Panduan Praktik Klinis (PPK), Pedoman Etika, dan SK Karumkit RST Pematang Siantar.'
              : 'Unggah dan publikasikan SOP Kredensial, Panduan Praktik Klinis (PPK), Pedoman Etika, dan SK Karumkit.'}
          </p>
        </div>

        {!isKetua && (
          <button
            onClick={() => setShowAddModal(!showAddModal)}
            className="px-4 py-2.5 bg-[#0B2D5C] hover:bg-[#082247] text-white text-xs font-extrabold rounded-xl shadow-xs flex items-center space-x-1.5 shrink-0 transition-colors"
          >
            <Plus className="w-4 h-4 text-amber-400" />
            <span>Unggah Dokumen Baru</span>
          </button>
        )}
      </div>

      {!isKetua && showAddModal && (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl border border-slate-300 shadow-md space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <h3 className="text-sm font-extrabold text-[#0B2D5C] flex items-center space-x-2">
              <Upload className="w-4 h-4 text-[#008080]" />
              <span>Unggah & Publikasikan Dokumen Baru</span>
            </h3>
            <button
              type="button"
              onClick={() => setShowAddModal(false)}
              className="text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          
          {/* File Drag and Drop Box */}
          <div>
            <label className="font-bold text-slate-700 block mb-1.5 text-xs">Pilih / Meletakkan File Dokumen (PDF, DOCX) *</label>
            <div className="border-2 border-dashed border-slate-300 hover:border-[#008080] bg-slate-50 hover:bg-slate-100/60 transition-all rounded-2xl p-6 text-center cursor-pointer relative">
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
              />
              {selectedFile ? (
                <div className="flex items-center justify-center space-x-3 text-emerald-800">
                  <CheckCircle2 className="w-8 h-8 text-emerald-600" />
                  <div className="text-left">
                    <span className="font-extrabold text-xs block">{selectedFile.name}</span>
                    <span className="text-[11px] text-slate-500 font-mono">
                      {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB • Siap diunggah
                    </span>
                  </div>
                </div>
              ) : (
                <div className="space-y-1.5">
                  <Upload className="w-8 h-8 text-[#008080] mx-auto" />
                  <p className="text-xs font-bold text-slate-800">
                    Klik atau Tarik & Lepaskan File Dokumen di Sini
                  </p>
                  <p className="text-[10px] text-slate-500">
                    Mendukung format PDF, DOCX, atau DOC hingga ukuran 20 MB
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Judul Dokumen Resmi *:</label>
              <input
                type="text"
                required
                placeholder="Judul SOP / SK / Panduan Praktik Klinis"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#008080]"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Nomor Registrasi Dokumen:</label>
              <input
                type="text"
                placeholder="SOP/KOMMED/RST-PS/2026/001"
                value={docNumber}
                onChange={(e) => setDocNumber(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#008080]"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Kategori Dokumen:</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#008080]"
              >
                <option value="SOP">SOP</option>
                <option value="Kredensial">Kredensial</option>
                <option value="Mutu">Mutu</option>
                <option value="Etik">Etik</option>
                <option value="PPK">PPK</option>
                <option value="SK">SK Karumkit</option>
                <option value="Administrasi">Administrasi</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Ringkasan Dokumen:</label>
              <input
                type="text"
                placeholder="Penjelasan singkat isi dokumen regulasi"
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#008080]"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-2 border-t border-slate-200">
            <button
              type="button"
              onClick={() => setShowAddModal(false)}
              className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold rounded-xl transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-[#0B2D5C] hover:bg-[#082247] text-white text-xs font-extrabold rounded-xl shadow-md transition-colors"
            >
              Publikasikan ke Portal
            </button>
          </div>
        </form>
      )}

      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#0B2D5C] text-white text-xs font-bold uppercase tracking-wider">
                <th className="py-3.5 px-4">Nama Dokumen & Nomor SK</th>
                <th className="py-3.5 px-4">Kategori</th>
                <th className="py-3.5 px-4">Tahun</th>
                <th className="py-3.5 px-4">Pengesah</th>
                <th className="py-3.5 px-4 text-center">Ukuran</th>
                <th className="py-3.5 px-4 text-center">Aksi / Unduh</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-xs text-slate-700">
              {documents.map((doc) => (
                <tr key={doc.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3.5 px-4">
                    <span className="font-extrabold text-[#0B2D5C] block">{doc.title}</span>
                    <span className="text-[11px] font-mono text-slate-500">{doc.documentNumber}</span>
                  </td>
                  <td className="py-3.5 px-4 font-bold text-[#0F8B8D]">{doc.category}</td>
                  <td className="py-3.5 px-4 font-bold">{doc.year}</td>
                  <td className="py-3.5 px-4 text-slate-600">{doc.approvedBy}</td>
                  <td className="py-3.5 px-4 text-center font-mono text-slate-500">{doc.fileSize}</td>
                  <td className="py-3.5 px-4 text-center">
                    <button
                      type="button"
                      onClick={() => {
                        // Simulate file download / print preview
                        alert(`Mengunduh dokumen: ${doc.title} (${doc.documentNumber})`);
                      }}
                      className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-[#008080] hover:bg-[#005F73] text-white font-bold text-[11px] rounded-lg shadow-xs transition-colors shrink-0"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Unduh PDF</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
