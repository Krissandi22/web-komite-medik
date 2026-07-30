import React, { useState } from 'react';
import { Award, FileText, Printer, Save, Edit3, CheckCircle2, RotateCcw, X, ShieldCheck } from 'lucide-react';

export const SpkRkkTemplateEditor: React.FC = () => {
  const [activeDocument, setActiveDocument] = useState<'SPK' | 'RKK'>('SPK');
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Default Template Data for SPK
  const [spkData, setSpkData] = useState({
    nomorTemplate: 'SPK/KOMMED/RST-PS/{TAHUN}/{NO_URUT}',
    judulSurat: 'SURAT PENUGASAN KLINIS (SPK)',
    karumkitName: 'Letkol Ckm dr. Y. Sambo, Sp.PD',
    karumkitNrp: 'NRP 11010009820012',
    ketuaKomiteName: 'Kolonel Ckm dr. Hendra Setiawan, Sp.B',
    ketuaKomiteNrp: 'NRP 11020018270478',
    menimbang: 'a. Bahwa untuk mendukung pelayanan kesehatan berkualitas dan menjamin keselamatan pasien di RST Pematang Siantar.\nb. Bahwa Staf Medis yang bersangkutan telah lulus proses Kredensial Komite Medik.',
    mengingat: '1. UU No. 17 Tahun 2023 tentang Kesehatan.\n2. Permenkes No. 755/MENKES/PER/IV/2011 tentang Penyelenggaraan Komite Medik di Rumah Sakit.\n3. Kebijakan Karumkit Tk. IV 01.07.01 Pematang Siantar.',
    ditetapkanAtas: 'Diberikan Surat Penugasan Klinis dan Rincian Kewenangan Klinis (RKK) kepada Staf Medis sesuai kompetensi yang disetujui.',
    masaBerlaku: '3 (tiga) tahun terhitung sejak tanggal diterbitkan.'
  });

  // Default Template Data for RKK
  const [rkkData, setRkkData] = useState({
    nomorTemplate: 'RKK/KOMMED/RST-PS/{TAHUN}/{NO_URUT}',
    judulSurat: 'RINCIAN KEWENANGAN KLINIS (RKK)',
    kelompokSpesialis: 'Spesialis Bedah / Penyakit Dalam / Anak / Obgyn / Spesialis Lainnya',
    kewenanganMandiriText: '1. Asesmen Medis Spesialis Lengkap pada Pasien Rawat Jalan & Rawat Inap\n2. Penentuan Diagnosis dan Tindakan Medis Spesialis Utama\n3. Resep Obat Spesialis dan Edukasi Pasien\n4. Tindakan Bedah / Operatif Spesialis Sesuai SIP\n5. Penanganan Kasus Kegawatdaruratan Spesialis di IGD',
    kewenanganSupervisiText: '1. Tindakan Intervensi Kompleks Tingkat Lanjut\n2. Penggunaan Alat Medis Canggih Produk Terbaru\n3. Prosedur Spesialis Lintas Keahlian Khusus',
    catatanKhusus: 'Staf Medis wajib mematuhi Panduan Praktik Klinis (PPK), Clinical Pathway, dan Etika Profesi Kedokteran.'
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 font-sans">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#0B2D5C] via-[#005F73] to-[#008080] text-white p-6 rounded-2xl shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-amber-300 font-bold text-xs uppercase tracking-wider mb-1">
            <Award className="w-4 h-4" />
            <span>Administrator Control • Template Legal Medis</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight">
            Edit Format SPK & RKK (Surat Penugasan & Rincian Kewenangan)
          </h1>
          <p className="text-xs text-slate-200 mt-1">
            Atur format baku Surat Penugasan Klinis (SPK) dan Rincian Kewenangan Klinis (RKK) untuk seluruh Staf Medis RST Pematang Siantar.
          </p>
        </div>

        <div className="flex items-center space-x-3 shrink-0">
          <button
            onClick={() => setIsPrintModalOpen(true)}
            className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-900 font-extrabold text-xs rounded-xl shadow-md transition-all flex items-center space-x-2"
          >
            <Printer className="w-4 h-4" />
            <span>Cetak Format Sample</span>
          </button>
        </div>
      </div>

      {/* Switcher Tab */}
      <div className="bg-white p-2 rounded-2xl shadow-xs border border-slate-200 flex items-center space-x-2 text-xs font-bold">
        <button
          onClick={() => setActiveDocument('SPK')}
          className={`flex-1 py-2.5 px-4 rounded-xl flex items-center justify-center space-x-2 transition-all ${
            activeDocument === 'SPK'
              ? 'bg-[#0B2D5C] text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>1. Format Surat Penugasan Klinis (SPK)</span>
        </button>
        <button
          onClick={() => setActiveDocument('RKK')}
          className={`flex-1 py-2.5 px-4 rounded-xl flex items-center justify-center space-x-2 transition-all ${
            activeDocument === 'RKK'
              ? 'bg-[#0B2D5C] text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>2. Format Rincian Kewenangan Klinis (RKK)</span>
        </button>
      </div>

      {/* Save Success Alert */}
      {saveSuccess && (
        <div className="p-4 bg-emerald-100 border border-emerald-300 text-emerald-900 rounded-2xl text-xs font-bold flex items-center space-x-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Format template {activeDocument} berhasil disimpan ke sistem!</span>
        </div>
      )}

      {/* FORM SPK EDITOR */}
      {activeDocument === 'SPK' && (
        <form onSubmit={handleSave} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-5 text-xs">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <h2 className="font-extrabold text-sm text-[#0B2D5C] flex items-center space-x-2">
              <Edit3 className="w-4 h-4 text-[#008080]" />
              <span>Pengaturan Draf Template SPK Karumkit</span>
            </h2>
            <span className="text-[11px] text-slate-400 italic">Gunakan variabel &#123;TAHUN&#125; dan &#123;NO_URUT&#125; untuk penomoran otomatis</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Format Nomor Surat SPK:</label>
              <input
                type="text"
                value={spkData.nomorTemplate}
                onChange={(e) => setSpkData({ ...spkData, nomorTemplate: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-mono text-slate-800 focus:ring-2 focus:ring-[#008080] outline-none"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Judul Dokumen Resmi:</label>
              <input
                type="text"
                value={spkData.judulSurat}
                onChange={(e) => setSpkData({ ...spkData, judulSurat: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-bold text-slate-800 focus:ring-2 focus:ring-[#008080] outline-none"
              />
            </div>
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Konsideran Menimbang (Poin Legalitas):</label>
            <textarea
              rows={3}
              value={spkData.menimbang}
              onChange={(e) => setSpkData({ ...spkData, menimbang: e.target.value })}
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-medium text-slate-800 focus:ring-2 focus:ring-[#008080] outline-none"
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Dasar Hukum Mengingat:</label>
            <textarea
              rows={3}
              value={spkData.mengingat}
              onChange={(e) => setSpkData({ ...spkData, mengingat: e.target.value })}
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-medium text-slate-800 focus:ring-2 focus:ring-[#008080] outline-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Nama & Pangkat Kepala Rumah Sakit (Penandatangan SPK):</label>
              <input
                type="text"
                value={spkData.karumkitName}
                onChange={(e) => setSpkData({ ...spkData, karumkitName: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-bold text-slate-800 focus:ring-2 focus:ring-[#008080] outline-none"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">NRP / NIP Kepala Rumah Sakit:</label>
              <input
                type="text"
                value={spkData.karumkitNrp}
                onChange={(e) => setSpkData({ ...spkData, karumkitNrp: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-mono text-slate-800 focus:ring-2 focus:ring-[#008080] outline-none"
              />
            </div>
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Masa Berlaku Penugasan Klinis:</label>
            <input
              type="text"
              value={spkData.masaBerlaku}
              onChange={(e) => setSpkData({ ...spkData, masaBerlaku: e.target.value })}
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-semibold text-slate-800 focus:ring-2 focus:ring-[#008080] outline-none"
            />
          </div>

          <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-200">
            <button
              type="submit"
              className="px-6 py-2.5 bg-[#0B2D5C] hover:bg-[#082247] text-white font-bold rounded-xl shadow-md transition-colors flex items-center space-x-2"
            >
              <Save className="w-4 h-4 text-amber-400" />
              <span>Simpan Perubahan Format SPK</span>
            </button>
          </div>
        </form>
      )}

      {/* FORM RKK EDITOR */}
      {activeDocument === 'RKK' && (
        <form onSubmit={handleSave} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-5 text-xs">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <h2 className="font-extrabold text-sm text-[#0B2D5C] flex items-center space-x-2">
              <Edit3 className="w-4 h-4 text-[#008080]" />
              <span>Pengaturan Draf Template RKK (Rincian Kewenangan Klinis)</span>
            </h2>
            <span className="text-[11px] text-slate-400 italic">Lampiran Tak Terpisahkan dari SPK</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Format Nomor RKK:</label>
              <input
                type="text"
                value={rkkData.nomorTemplate}
                onChange={(e) => setRkkData({ ...rkkData, nomorTemplate: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-mono text-slate-800 focus:ring-2 focus:ring-[#008080] outline-none"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Judul Lampiran RKK:</label>
              <input
                type="text"
                value={rkkData.judulSurat}
                onChange={(e) => setRkkData({ ...rkkData, judulSurat: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-bold text-slate-800 focus:ring-2 focus:ring-[#008080] outline-none"
              />
            </div>
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Daftar Kewenangan Mandiri Standar (Satu per baris):</label>
            <textarea
              rows={5}
              value={rkkData.kewenanganMandiriText}
              onChange={(e) => setRkkData({ ...rkkData, kewenanganMandiriText: e.target.value })}
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-medium text-slate-800 focus:ring-2 focus:ring-[#008080] outline-none"
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Daftar Kewenangan Dengan Supervisi (Satu per baris):</label>
            <textarea
              rows={3}
              value={rkkData.kewenanganSupervisiText}
              onChange={(e) => setRkkData({ ...rkkData, kewenanganSupervisiText: e.target.value })}
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-medium text-slate-800 focus:ring-2 focus:ring-[#008080] outline-none"
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Catatan & Batasan Profesi:</label>
            <textarea
              rows={2}
              value={rkkData.catatanKhusus}
              onChange={(e) => setRkkData({ ...rkkData, catatanKhusus: e.target.value })}
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-medium text-slate-800 focus:ring-2 focus:ring-[#008080] outline-none"
            />
          </div>

          <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-200">
            <button
              type="submit"
              className="px-6 py-2.5 bg-[#0B2D5C] hover:bg-[#082247] text-white font-bold rounded-xl shadow-md transition-colors flex items-center space-x-2"
            >
              <Save className="w-4 h-4 text-amber-400" />
              <span>Simpan Perubahan Format RKK</span>
            </button>
          </div>
        </form>
      )}

      {/* PRINT MODAL PREVIEW FOR SPK & RKK */}
      {isPrintModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full border border-slate-200 overflow-hidden my-8">
            
            {/* Top Control Header */}
            <div className="bg-[#0B2D5C] text-white p-4 flex items-center justify-between print:hidden">
              <div className="flex items-center space-x-2">
                <Printer className="w-5 h-5 text-amber-400" />
                <h3 className="text-base font-bold">Pratinjau Cetak {activeDocument} Staf Medis</h3>
              </div>
              
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => window.print()}
                  className="px-4 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-900 font-extrabold text-xs rounded-xl shadow-xs transition-colors flex items-center space-x-1.5"
                >
                  <Printer className="w-4 h-4" />
                  <span>Cetak Dokumen</span>
                </button>
                <button
                  onClick={() => setIsPrintModalOpen(false)}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl border border-slate-600 transition-colors flex items-center space-x-1"
                >
                  <X className="w-4 h-4" />
                  <span>Tutup / Kembali</span>
                </button>
              </div>
            </div>

            {/* Printable Area */}
            <div className="p-8 text-slate-900 font-serif space-y-6 text-xs sm:text-sm leading-relaxed">
              
              {/* Kop Surat */}
              <div className="border-b-2 border-slate-900 pb-3 text-center space-y-1 font-sans">
                <h4 className="font-extrabold text-xs uppercase tracking-wider">KESEHATAN DAERAH MILITER I / BUKIT BARISAN</h4>
                <h3 className="font-extrabold text-sm uppercase tracking-wider text-[#0B2D5C]">RUMAH SAKIT TENTARA TK. IV 01.07.01 PEMATANG SIANTAR</h3>
                <p className="text-[11px] text-slate-600">Jl. MH Sitorus No. 1, Telp (0622) 21542, Kota Pematang Siantar, Sumatera Utara</p>
              </div>

              {/* Document Title & Number */}
              <div className="text-center space-y-1 pt-2 font-sans">
                <h2 className="font-extrabold text-base underline uppercase tracking-wider text-[#0B2D5C]">
                  {activeDocument === 'SPK' ? spkData.judulSurat : rkkData.judulSurat}
                </h2>
                <p className="font-mono text-xs font-bold text-slate-700">
                  Nomor: {activeDocument === 'SPK' ? spkData.nomorTemplate.replace('{TAHUN}', '2026').replace('{NO_URUT}', '088') : rkkData.nomorTemplate.replace('{TAHUN}', '2026').replace('{NO_URUT}', '088')}
                </p>
              </div>

              {/* Sample Doctor Subject */}
              <div className="p-4 bg-slate-50 border border-slate-300 rounded-xl space-y-1 font-sans text-xs">
                <div className="grid grid-cols-3">
                  <span className="font-bold text-slate-600">Nama Staf Medis</span>
                  <span className="col-span-2 font-extrabold text-slate-900">: dr. Faisal Utama, Sp.OT</span>
                </div>
                <div className="grid grid-cols-3">
                  <span className="font-bold text-slate-600">Pangkat / NRP</span>
                  <span className="col-span-2 font-semibold text-slate-800">: Mayor Ckm / 1104001920038</span>
                </div>
                <div className="grid grid-cols-3">
                  <span className="font-bold text-slate-600">Spesialisasi / SMF</span>
                  <span className="col-span-2 font-semibold text-slate-800">: Spesialis Ortopedi & Traumatologi (SMF Bedah)</span>
                </div>
              </div>

              {/* Content SPK or RKK */}
              {activeDocument === 'SPK' ? (
                <div className="space-y-4">
                  <div>
                    <h4 className="font-bold font-sans uppercase text-slate-800">Menimbang:</h4>
                    <p className="whitespace-pre-line text-slate-700 pl-4">{spkData.menimbang}</p>
                  </div>

                  <div>
                    <h4 className="font-bold font-sans uppercase text-slate-800">Mengingat:</h4>
                    <p className="whitespace-pre-line text-slate-700 pl-4">{spkData.mengingat}</p>
                  </div>

                  <div className="p-4 bg-[#0B2D5C]/5 border-l-4 border-[#0B2D5C]">
                    <h4 className="font-bold font-sans uppercase text-[#0B2D5C]">MEMUTUSKAN:</h4>
                    <p className="mt-1 font-semibold text-slate-900">{spkData.ditetapkanAtas}</p>
                    <p className="mt-2 text-xs text-slate-600">Masa berlaku penugasan klinis ini adalah {spkData.masaBerlaku}</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <h4 className="font-bold font-sans uppercase text-[#0B2D5C]">I. KEWENANGAN KLINIS MANDIRI (MEMBERIKAN ASUHAN MEDIS PENUH)</h4>
                    <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg mt-1 font-sans text-xs whitespace-pre-line">
                      {rkkData.kewenanganMandiriText}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-bold font-sans uppercase text-amber-800">II. KEWENANGAN KLINIS DENGAN SUPERVISI</h4>
                    <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg mt-1 font-sans text-xs whitespace-pre-line">
                      {rkkData.kewenanganSupervisiText}
                    </div>
                  </div>

                  <div className="p-3 bg-slate-100 rounded-lg text-xs font-sans italic text-slate-700">
                    * {rkkData.catatanKhusus}
                  </div>
                </div>
              )}

              {/* Signatures */}
              <div className="grid grid-cols-2 pt-8 text-center font-sans text-xs">
                <div>
                  <p>Mengetahui,</p>
                  <p className="font-bold">Ketua Komite Medik</p>
                  <div className="h-16"></div>
                  <p className="font-extrabold underline">{spkData.ketuaKomiteName}</p>
                  <p className="text-[10px] text-slate-600">{spkData.ketuaKomiteNrp}</p>
                </div>
                <div>
                  <p>Ditetapkan di Pematang Siantar</p>
                  <p className="font-bold">Kepala Rumkit Tk. IV 01.07.01</p>
                  <div className="h-16"></div>
                  <p className="font-extrabold underline">{spkData.karumkitName}</p>
                  <p className="text-[10px] text-slate-600">{spkData.karumkitNrp}</p>
                </div>
              </div>

            </div>

            {/* Bottom Sticky Action Footer */}
            <div className="p-4 bg-slate-100 border-t border-slate-200 flex items-center justify-between print:hidden">
              <span className="text-xs text-slate-500 font-semibold">Dokumen Resmi Komite Medik RST Pematang Siantar</span>
              <button
                onClick={() => setIsPrintModalOpen(false)}
                className="px-5 py-2 bg-[#0B2D5C] hover:bg-[#082247] text-white text-xs font-bold rounded-xl shadow-xs transition-colors"
              >
                Kembali ke System Admin
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
