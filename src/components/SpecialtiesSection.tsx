import React, { useState } from 'react';
import { Doctor } from '../types';
import { Stethoscope, ShieldCheck, Search, ArrowUpRight, Award, UserCheck } from 'lucide-react';

interface SpecialtiesSectionProps {
  doctors: Doctor[];
  onSelectDoctor: (doctor: Doctor) => void;
}

export const SpecialtiesSection: React.FC<SpecialtiesSectionProps> = ({
  doctors,
  onSelectDoctor
}) => {
  const [selectedSmf, setSelectedSmf] = useState<string>('semua');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const smfCategories = [
    { id: 'semua', label: 'Semua Spesialis' },
    { id: 'Penyakit Dalam', label: 'Penyakit Dalam' },
    { id: 'Bedah', label: 'Bedah & Anestesi' },
    { id: 'Anak', label: 'Kesehatan Anak' },
    { id: 'Obgyn', label: 'Obstetri & Ginekologi' },
    { id: 'Saraf', label: 'Neurologi & Saraf' },
    { id: 'Mata', label: 'Mata & THT' },
  ];

  const filteredDoctors = doctors.filter((doc) => {
    const docSmf = doc.smf || doc.unit || '';
    const matchesSmf =
      selectedSmf === 'semua' ||
      doc.specialty.toLowerCase().includes(selectedSmf.toLowerCase()) ||
      docSmf.toLowerCase().includes(selectedSmf.toLowerCase());

    const matchesSearch =
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (doc.sipNumber && doc.sipNumber.toLowerCase().includes(searchTerm.toLowerCase()));

    return matchesSmf && matchesSearch;
  });

  return (
    <section id="spesialis" className="py-20 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1 bg-teal-50 text-[#008080] text-xs font-bold rounded-full">
              <Stethoscope className="w-3.5 h-3.5 text-[#008080]" />
              <span className="uppercase tracking-wider">KREDENSIAL STAF MEDIS</span>
            </div>
            <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0B2D5C] tracking-tight">
              Specialties We Serve
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Daftar Dokter Spesialis & Staf Medis Fungsional (SMF) Rumah Sakit Tentara Pematang Siantar yang telah memiliki Rincian Kewenangan Klinis (RKK) terverifikasi.
            </p>
          </div>

          {/* Quick Search */}
          <div className="relative min-w-[260px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Cari dokter atau spesialis..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-full text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#008080] focus:bg-white"
            />
          </div>
        </div>

        {/* SMF Filter Tags matching mockup style */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {smfCategories.map((cat) => {
            const isActive = selectedSmf === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedSmf(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                  isActive
                    ? 'bg-[#008080] text-white font-bold shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredDoctors.map((doc) => (
            <div
              key={doc.id}
              onClick={() => onSelectDoctor(doc)}
              className="bg-[#F8FAFC] rounded-2xl border border-slate-200/80 p-5 shadow-xs hover:shadow-xl hover:border-[#008080] transition-all duration-300 cursor-pointer flex flex-col justify-between group"
            >
              <div className="space-y-4">
                {/* Doctor Avatar & Status Badge */}
                <div className="flex items-center justify-between">
                  <div className="relative">
                    <img
                      src={doc.photo || doc.photoUrl || 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400'}
                      alt={doc.name}
                      className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-md group-hover:scale-105 transition-transform"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center border-2 border-white" title="RKK Aktif">
                      <UserCheck className="w-3 h-3" />
                    </div>
                  </div>

                  <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                    (doc.status === 'Aktif' || doc.kredensialStatus === 'Aktif')
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}>
                    {doc.status || doc.kredensialStatus || 'Aktif'}
                  </span>
                </div>

                {/* Info */}
                <div>
                  <h3 className="font-serif-display text-sm font-bold text-[#0B2D5C] group-hover:text-[#008080] transition-colors line-clamp-1">
                    {doc.name}
                  </h3>
                  <div className="text-xs font-semibold text-[#008080] mt-0.5">
                    {doc.specialty}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1 font-mono">
                    SIP: {doc.sipNumber || '446/SIP.D/DS/2024'}
                  </div>
                </div>

                {/* Sub-Komite & STR Info */}
                <div className="text-[11px] text-slate-600 bg-white p-2.5 rounded-xl border border-slate-200/60 space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Kelompok SMF:</span>
                    <span className="font-semibold text-slate-800">{doc.smf || doc.unit || 'SMF Spesialis'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Masa RKK:</span>
                    <span className="font-semibold text-emerald-700">{doc.nextCredentialDate || doc.sipExpiry || '2027-12-31'}</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4 mt-3 border-t border-slate-200/60 flex items-center justify-between text-xs font-bold text-[#008080]">
                <span>Lihat Kewenangan (RKK)</span>
                <div className="w-6 h-6 rounded-full bg-teal-50 text-[#008080] group-hover:bg-[#008080] group-hover:text-white flex items-center justify-center transition-colors">
                  <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
