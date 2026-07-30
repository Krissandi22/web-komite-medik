import React, { useState } from 'react';
import { DocumentItem } from '../types';
import { X, FileText, Download, Shield, Eye, CheckCircle2, FileCheck } from 'lucide-react';

interface DocumentModalProps {
  document: DocumentItem | null;
  onClose: () => void;
}

export const DocumentModal: React.FC<DocumentModalProps> = ({ document, onClose }) => {
  const [downloading, setDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  if (!document) return null;

  const handleDownload = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3000);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-2xs flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full overflow-hidden border border-slate-200">
        
        {/* Header */}
        <div className="bg-[#0B2D5C] text-white p-5 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <FileText className="w-5 h-5 text-amber-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
              Pratinjau Dokumen Portal Regulasi
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white p-1 rounded-lg hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto text-xs text-slate-700">
          
          <div>
            <span className="inline-block px-2.5 py-1 bg-blue-100 text-[#0B2D5C] font-bold rounded text-[11px] mb-2">
              Kategori: {document.category}
            </span>
            <h2 className="text-base sm:text-lg font-extrabold text-[#0B2D5C] leading-snug">
              {document.title}
            </h2>
            <p className="font-mono text-slate-500 font-bold text-xs mt-1">
              Nomor Registrasi: {document.documentNumber}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#F7F9FC] p-3.5 rounded-lg border border-slate-200">
            <div>
              <span className="text-[10px] font-bold text-slate-400 block uppercase">Tahun Terbit</span>
              <span className="font-bold text-slate-800">{document.year}</span>
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 block uppercase">Tanggal Publikasi</span>
              <span className="font-bold text-slate-800">{document.datePublished}</span>
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 block uppercase">Ukuran Berkas</span>
              <span className="font-bold text-slate-800">{document.fileSize} ({document.fileType})</span>
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 block uppercase">Disahkan Oleh</span>
              <span className="font-bold text-emerald-700">{document.approvedBy}</span>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-bold text-slate-800 uppercase text-[11px]">Ringkasan Isi Regulasi</h3>
            <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3.5 rounded-lg border border-slate-200">
              {document.summary}
            </p>
          </div>

          {/* Simulated PDF Document Viewer Window */}
          <div className="border border-slate-300 rounded-lg overflow-hidden bg-slate-100 p-6 text-center space-y-3">
            <div className="w-16 h-20 bg-white border border-slate-300 shadow-sm mx-auto flex flex-col justify-between p-2 rounded">
              <div className="w-full h-2 bg-[#0B2D5C] rounded"></div>
              <div className="space-y-1">
                <div className="w-full h-1 bg-slate-300 rounded"></div>
                <div className="w-3/4 h-1 bg-slate-300 rounded"></div>
                <div className="w-1/2 h-1 bg-slate-300 rounded"></div>
              </div>
              <div className="w-full h-1.5 bg-red-800 rounded"></div>
            </div>

            <p className="text-xs font-bold text-slate-700">
              Pratinjau Resmi Berkas PDF Digital RST Pematang Siantar
            </p>
            <p className="text-[11px] text-slate-500 max-w-md mx-auto">
              Dokumen ini memiliki stempel keabsahan elektronik Komite Medik Kesdam I/Bukit Barisan.
            </p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-1.5 pt-2">
            <span className="text-[11px] font-bold text-slate-400">Kata Kunci:</span>
            {document.tags.map((t) => (
              <span key={t} className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-[10px] font-medium border border-slate-200">
                #{t}
              </span>
            ))}
          </div>

        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-slate-100 border-t border-slate-200 flex items-center justify-between">
          <span className="text-[11px] text-slate-500 font-medium">
            Total Unduhan: {document.downloadCount + (downloadSuccess ? 1 : 0)}x
          </span>

          <div className="flex items-center space-x-2">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold rounded-md"
            >
              Tutup
            </button>

            <button
              onClick={handleDownload}
              disabled={downloading}
              className="px-5 py-2 bg-[#0B2D5C] hover:bg-[#082247] text-white text-xs font-bold rounded-md flex items-center space-x-2 shadow-xs transition-all"
            >
              <Download className="w-4 h-4 text-amber-400" />
              <span>
                {downloading ? 'Mengunduh...' : downloadSuccess ? 'Berhasil Diunduh!' : 'Unduh Dokumen PDF'}
              </span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
