import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, ArrowUpRight, MessageSquare, Phone } from 'lucide-react';

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'Bagaimana alur dan syarat pengajuan Kredensialing Dokter baru di RST?',
      answer: 'Dokter mengajukan berkas STR aktif, SIP, Ijazah Spesialis, Sertifikat Kompetensi, dan Curriculum Vitae melalui Sekretariat Komite Medik atau via Dashboard Internal. Sub-Komite Kredensial melakukan verifikasi keaslian dokumen dan menjadwalkan asesmen oleh Mitra Bestari (Peer Reviewer).'
    },
    {
      question: 'Berapa lama masa berlaku Rincian Kewenangan Klinis (RKK) & SPK?',
      answer: 'Surat Penugasan Klinis (SPK) dan Rincian Kewenangan Klinis (RKK) berlaku selama 3 (tiga) tahun. Enam bulan sebelum masa berlaku berakhir, dokter wajib mengajukan Re-kredensialing.'
    },
    {
      question: 'Apa perbedaan antara SPK (Surat Penugasan Klinis) dan RKK (Rincian Kewenangan Klinis)?',
      answer: 'SPK adalah surat keputusan resmi dari Kepala Rumah Sakit (Karumkit) yang memberikan penugasan medis. RKK adalah lampiran rincian daftar tindakan medis spesifik yang diperbolehkan dilakukan oleh dokter tersebut sesuai rekomendasi Komite Medik.'
    },
    {
      question: 'Bagaimana pelaksanaan Audit Klinis dan evaluasi kinerja profesi (OPPE)?',
      answer: 'Audit Klinis dilaksanakan oleh Sub-Komite Mutu Profesi minimal 2 kali dalam setahun untuk mengevaluasi kepatuhan terhadap Panduan Praktik Klinis (PPK) dan KARS/STARKES. OPPE dievaluasi secara berkelanjutan setiap semester.'
    },
    {
      question: 'Bagaimana penanganan jika terjadi dugaan pelanggaran etik atau disiplin staf medis?',
      answer: 'Sub-Komite Etik & Disiplin Profesi membentuk Panitia Adhoc untuk melakukan verifikasi, klarifikasi, dan sidang disiplin. Hasil penelaahan berupa rekomendasi kerahasiaan disampaikan kepada Karumkit.'
    }
  ];

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 bg-[#F8FAFC] border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Layout Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Side: Title & Support Box matching Mockup (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1 bg-teal-50 text-[#008080] text-xs font-bold rounded-full">
              <HelpCircle className="w-3.5 h-3.5" />
              <span className="uppercase tracking-wider">PERTANYAAN UMUM</span>
            </div>

            <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0B2D5C] tracking-tight leading-tight">
              Frequently Asked Questions
            </h2>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Jawaban cepat untuk pertanyaan yang sering diajukan oleh dokter spesialis, staf medis, dan manajemen mengenai tata kelola klinik, kredensialing, dan kepatuhan mutu.
            </p>

            {/* Support Box Card matching mockup */}
            <div className="bg-[#0B2D5C] rounded-3xl p-6 text-white space-y-4 shadow-lg border border-white/10 relative overflow-hidden">
              <div className="w-10 h-10 rounded-2xl bg-[#008080] flex items-center justify-center text-white font-bold">
                <MessageSquare className="w-5 h-5" />
              </div>

              <div>
                <h3 className="font-serif-display text-lg font-bold">Punya Pertanyaan Spesifik?</h3>
                <p className="text-xs text-slate-300 mt-1">
                  Sekretariat Komite Medik RST Pematang Siantar siap membantu proses verifikasi & konsultasi tata kelola medis Anda.
                </p>
              </div>

              <a
                href="#kontak"
                className="group inline-flex items-center space-x-2 pl-5 pr-1.5 py-2 bg-[#008080] hover:bg-[#005F73] text-white text-xs font-bold rounded-full shadow-md transition-all"
              >
                <span>Hubungi Sekretariat</span>
                <div className="w-6 h-6 rounded-full bg-white text-[#008080] flex items-center justify-center transition-transform group-hover:translate-x-0.5">
                  <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
                </div>
              </a>
            </div>
          </div>

          {/* Right Side: Accordion Questions (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={idx}
                  className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                    isOpen
                      ? 'bg-white border-[#008080] shadow-md'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full text-left p-5 flex items-center justify-between gap-4 font-semibold text-sm text-[#0B2D5C] focus:outline-none"
                  >
                    <span className="font-serif-display text-sm font-bold sm:text-base">
                      {faq.question}
                    </span>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                      isOpen ? 'bg-[#008080] text-white' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
