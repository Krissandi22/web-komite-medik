import React, { useState, useMemo } from 'react';
import {
  Calendar,
  Clock,
  MapPin,
  Search,
  Filter,
  User,
  Stethoscope,
  ChevronRight,
  PhoneCall,
  CheckCircle2,
  AlertCircle,
  Building2,
  FileSpreadsheet,
  Printer,
  Sparkles
} from 'lucide-react';
import { Doctor, DoctorSchedule } from '../types';

interface DoctorSchedulePublicSectionProps {
  schedules: DoctorSchedule[];
  doctors: Doctor[];
  onSelectDoctor: (doctor: Doctor) => void;
}

export const DoctorSchedulePublicSection: React.FC<DoctorSchedulePublicSectionProps> = ({
  schedules,
  doctors,
  onSelectDoctor,
}) => {
  const [scheduleCategory, setScheduleCategory] = useState<'semua' | 'ugd' | 'konsul'>('semua');
  const [selectedSmf, setSelectedSmf] = useState<string>('Semua');
  const [selectedDay, setSelectedDay] = useState<string>('Semua');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  // List of unique SMF categories
  const smfOptions = [
    'Semua',
    'SMF Bedah',
    'SMF Penyakit Dalam',
    'SMF Anak',
    'SMF Obgyn',
    'SMF Saraf',
    'SMF Mata',
    'SMF THT',
    'SMF Gigi & Mulut'
  ];

  const dayOptions = ['Semua', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'];

  // Filtered schedules logic
  const filteredSchedules = useMemo(() => {
    return schedules.filter((sch) => {
      // Category filter (UGD vs Konsul vs Semua)
      if (scheduleCategory === 'ugd') {
        const isUgdTask = sch.taskType === 'UGD' || sch.shift === '24 Jam';
        const isUgdLoc = sch.location.toLowerCase().includes('ugd') || sch.location.toLowerCase().includes('igd');
        if (!isUgdTask && !isUgdLoc) return false;
      } else if (scheduleCategory === 'konsul') {
        const isKonsulTask = sch.taskType === 'Konsultasi Dokter' || sch.taskType === 'Poli Rawat Jalan';
        const isKonsulLoc = sch.location.toLowerCase().includes('konsultasi') || sch.location.toLowerCase().includes('poli');
        if (!isKonsulTask && !isKonsulLoc) return false;
      }

      // SMF filter
      if (selectedSmf !== 'Semua' && !sch.smf.toLowerCase().includes(selectedSmf.toLowerCase().replace('smf ', ''))) {
        return false;
      }
      // Day filter
      if (selectedDay !== 'Semua' && sch.day !== selectedDay) {
        return false;
      }
      // Search query
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchName = sch.doctorName.toLowerCase().includes(q);
        const matchSpecialty = sch.specialty.toLowerCase().includes(q);
        const matchLoc = sch.location.toLowerCase().includes(q);
        const matchTask = sch.taskType.toLowerCase().includes(q);
        return matchName || matchSpecialty || matchLoc || matchTask;
      }
      return true;
    });
  }, [schedules, scheduleCategory, selectedSmf, selectedDay, searchQuery]);

  // Group schedules by Doctor for Grid mode
  const groupedByDoctor = useMemo(() => {
    const map = new Map<string, { doctor: Doctor | undefined; schedules: DoctorSchedule[] }>();

    filteredSchedules.forEach((sch) => {
      const doc = doctors.find((d) => d.id === sch.doctorId || d.name.toLowerCase().includes(sch.doctorName.toLowerCase().split(',')[0]));
      const key = sch.doctorId || sch.doctorName;

      if (!map.has(key)) {
        map.set(key, { doctor: doc, schedules: [] });
      }
      map.get(key)!.schedules.push(sch);
    });

    return Array.from(map.values());
  }, [filteredSchedules, doctors]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <section id="jadwal-dokter" className="py-16 bg-slate-50/70 border-b border-slate-200 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-slate-100 border border-slate-300 text-[#0B2D5C] text-xs font-bold uppercase tracking-wider mb-4 shadow-2xs">
            <img
              src="/src/assets/images/logo_hesti_wira_sakti_1785328573896.jpg"
              alt="Logo Hesti Wira Sakti"
              className="w-5 h-5 object-contain"
            />
            <span>Informasi Pelayanan Publik RST Pematang Siantar</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B2D5C] font-serif-display tracking-tight mb-3">
            Jadwal Dokter, UGD 24 Jam & Konsultasi Spesialis
          </h2>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Cari dan pastikan jadwal kehadiran dokter spesialis, jadwal siaga UGD 24 jam, dan jadwal konsul dokter di Rumah Sakit Tentara Pematang Siantar. Melayani pasien TNI, PNS, BPJS Kesehatan, dan Umum.
          </p>

          {/* Primary Category Switcher Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 mt-6">
            <button
              type="button"
              onClick={() => setScheduleCategory('semua')}
              className={`px-4 py-2.5 rounded-xl font-extrabold text-xs flex items-center space-x-2 transition-all shadow-xs ${
                scheduleCategory === 'semua'
                  ? 'bg-[#0B2D5C] text-white ring-2 ring-[#0B2D5C]/30 shadow-md'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <Calendar className="w-4 h-4 text-amber-400" />
              <span>Semua Jadwal Praktik</span>
            </button>

            <button
              type="button"
              onClick={() => setScheduleCategory('ugd')}
              className={`px-4 py-2.5 rounded-xl font-extrabold text-xs flex items-center space-x-2 transition-all shadow-xs ${
                scheduleCategory === 'ugd'
                  ? 'bg-red-700 text-white ring-2 ring-red-400 shadow-md'
                  : 'bg-red-50 text-red-800 hover:bg-red-100 border border-red-200'
              }`}
            >
              <div className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
              <PhoneCall className="w-4 h-4 text-amber-300" />
              <span>Jadwal UGD 24 Jam (Siaga Darurat)</span>
            </button>

            <button
              type="button"
              onClick={() => setScheduleCategory('konsul')}
              className={`px-4 py-2.5 rounded-xl font-extrabold text-xs flex items-center space-x-2 transition-all shadow-xs ${
                scheduleCategory === 'konsul'
                  ? 'bg-[#008080] text-white ring-2 ring-teal-400 shadow-md'
                  : 'bg-teal-50 text-[#008080] hover:bg-teal-100 border border-teal-200'
              }`}
            >
              <Stethoscope className="w-4 h-4 text-amber-300" />
              <span>Jadwal Konsul Dokter Spesialis</span>
            </button>
          </div>
        </div>

        {/* Dynamic Category Banner */}
        {scheduleCategory === 'ugd' && (
          <div className="mb-6 bg-gradient-to-r from-red-900 via-red-800 to-red-900 text-white rounded-2xl p-5 shadow-md border border-red-700/50 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-extrabold shrink-0 shadow-md">
                <PhoneCall className="w-5 h-5 text-red-900" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="px-2 py-0.5 bg-amber-400 text-red-950 font-extrabold text-[10px] rounded uppercase tracking-wider">
                    SIAGA UGD 24 JAM
                  </span>
                  <span className="text-xs text-red-200">Non-Stop Emergency Response</span>
                </div>
                <h3 className="text-sm sm:text-base font-bold text-white">
                  Instalasi Gawat Darurat (IGD) & Dokter Jaga Utama
                </h3>
              </div>
            </div>

            <div className="flex items-center space-x-2 shrink-0">
              <a
                href="tel:062221234"
                className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-extrabold rounded-xl shadow-md transition-colors flex items-center space-x-1.5"
              >
                <PhoneCall className="w-3.5 h-3.5 text-red-900" />
                <span>Call Center UGD: (0622) 21234</span>
              </a>
            </div>
          </div>
        )}

        {scheduleCategory === 'konsul' && (
          <div className="mb-6 bg-gradient-to-r from-[#0B2D5C] via-[#005F73] to-[#008080] text-white rounded-2xl p-5 shadow-md border border-teal-600/30 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-amber-400 text-[#0B2D5C] flex items-center justify-center font-extrabold shrink-0 shadow-md">
                <Stethoscope className="w-5 h-5 text-[#0B2D5C]" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="px-2 py-0.5 bg-amber-400 text-[#0B2D5C] font-extrabold text-[10px] rounded uppercase tracking-wider">
                    KONSULTASI MEDIS SPESIALIS
                  </span>
                  <span className="text-xs text-teal-200">Poliklinik & Ruang Konsul</span>
                </div>
                <h3 className="text-sm sm:text-base font-bold text-white">
                  Jadwal Konsultasi Dokter Spesialis & Subspesialis
                </h3>
              </div>
            </div>

            <div className="text-xs text-slate-200 bg-white/10 px-3.5 py-2 rounded-xl border border-white/20">
              ● Pendaftaran Konsul: <strong>07.30 - 12.00 WIB</strong>
            </div>
          </div>
        )}

        {/* Filter Card & Search Bar */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-slate-200/90 mb-8 space-y-5">
          
          {/* Top Row: Search input + View Mode Switch + Print */}
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Cari nama dokter, spesialisasi, atau ruang poliklinik..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#008080] transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-600"
                >
                  Clear
                </button>
              )}
            </div>

            {/* View Controls & Print */}
            <div className="flex items-center space-x-3 shrink-0">
              <div className="bg-slate-100 p-1 rounded-xl flex items-center border border-slate-200 text-xs">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-3 py-1.5 rounded-lg font-bold flex items-center space-x-1.5 transition-all ${
                    viewMode === 'grid'
                      ? 'bg-white text-[#0B2D5C] shadow-xs'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <User className="w-3.5 h-3.5" />
                  <span>Kartu Dokter</span>
                </button>
                <button
                  onClick={() => setViewMode('table')}
                  className={`px-3 py-1.5 rounded-lg font-bold flex items-center space-x-1.5 transition-all ${
                    viewMode === 'table'
                      ? 'bg-white text-[#0B2D5C] shadow-xs'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <FileSpreadsheet className="w-3.5 h-3.5" />
                  <span>Tabel Ringkas</span>
                </button>
              </div>

              <button
                onClick={handlePrint}
                className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl border border-slate-200 flex items-center space-x-1.5 transition-colors hidden sm:flex"
                title="Cetak / Unduh Jadwal Dokter"
              >
                <Printer className="w-3.5 h-3.5 text-slate-600" />
                <span>Cetak</span>
              </button>
            </div>

          </div>

          {/* Filter Pills Row */}
          <div className="space-y-3 pt-3 border-t border-slate-100">
            
            {/* Filter by SMF / Poliklinik */}
            <div>
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center space-x-1">
                <Filter className="w-3 h-3" />
                <span>Pilih SMF / Kelompok Spesialis:</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {smfOptions.map((smf) => (
                  <button
                    key={smf}
                    onClick={() => setSelectedSmf(smf)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                      selectedSmf === smf
                        ? 'bg-[#0B2D5C] text-white shadow-xs font-bold'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                    }`}
                  >
                    {smf}
                  </button>
                ))}
              </div>
            </div>

            {/* Filter by Day */}
            <div>
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center space-x-1">
                <Calendar className="w-3 h-3" />
                <span>Pilih Hari Praktik:</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {dayOptions.map((day) => (
                  <button
                    key={day}
                    onClick={() => setSelectedDay(day)}
                    className={`px-3.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                      selectedDay === day
                        ? 'bg-[#008080] text-white font-bold shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {day}
                  </button>
                ))}
              </div>
            </div>

          </div>

        </div>

        {/* Content Body: GRID MODE */}
        {viewMode === 'grid' && (
          <div>
            {groupedByDoctor.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center border border-dashed border-slate-300">
                <AlertCircle className="w-10 h-10 text-amber-500 mx-auto mb-3" />
                <h3 className="text-base font-bold text-slate-800 mb-1">
                  Tidak ditemukan jadwal dokter yang sesuai
                </h3>
                <p className="text-xs text-slate-500 mb-4">
                  Coba ubah kata kunci pencarian, filter SMF, atau pilihan hari praktik.
                </p>
                <button
                  onClick={() => {
                    setSelectedSmf('Semua');
                    setSelectedDay('Semua');
                    setSearchQuery('');
                  }}
                  className="px-4 py-2 bg-[#008080] text-white text-xs font-bold rounded-xl hover:bg-[#005F73] transition-colors"
                >
                  Reset Semua Filter
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {groupedByDoctor.map(({ doctor, schedules: docSchedules }, idx) => {
                  const doctorName = doctor ? doctor.name : docSchedules[0]?.doctorName || 'Dokter Spesialis';
                  const specialty = doctor ? doctor.specialty : docSchedules[0]?.specialty || 'Spesialis Medis';
                  const avatar = doctor?.photoUrl || `https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=300`;

                  return (
                    <div
                      key={idx}
                      className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col overflow-hidden group"
                    >
                      {/* Doctor Top Info Bar */}
                      <div className="p-5 flex items-start space-x-4 border-b border-slate-100 bg-linear-to-b from-slate-50 to-white">
                        <img
                          src={avatar}
                          alt={doctorName}
                          className="w-16 h-16 rounded-xl object-cover object-top border-2 border-white shadow-xs shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <span className="inline-block px-2 py-0.5 bg-amber-100 text-amber-800 text-[10px] font-extrabold rounded uppercase tracking-wider mb-1">
                            {docSchedules[0]?.smf || 'Spesialis'}
                          </span>
                          <h3 className="text-sm sm:text-base font-bold text-[#0B2D5C] group-hover:text-[#008080] transition-colors line-clamp-2 leading-tight">
                            {doctorName}
                          </h3>
                          <p className="text-xs text-slate-500 font-medium mt-0.5 line-clamp-1">
                            {specialty}
                          </p>
                        </div>
                      </div>

                      {/* Schedule Sessions List */}
                      <div className="p-5 flex-1 space-y-3">
                        <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
                          <span>Sesi Praktik Poliklinik</span>
                          <span className="text-[#008080] font-extrabold">{docSchedules.length} Sesi</span>
                        </div>

                        <div className="space-y-2.5">
                          {docSchedules.map((sch) => (
                            <div
                              key={sch.id}
                              className="p-3 bg-slate-50 rounded-xl border border-slate-200/70 text-xs space-y-1.5 hover:bg-slate-100/80 transition-colors"
                            >
                              <div className="flex items-center justify-between font-bold text-slate-800">
                                <div className="flex items-center space-x-1.5 text-[#0B2D5C]">
                                  <Calendar className="w-3.5 h-3.5 text-[#008080]" />
                                  <span>{sch.day}</span>
                                  {sch.date && <span className="text-[10px] font-normal text-slate-500">({sch.date})</span>}
                                </div>
                                <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold ${
                                  sch.shift === 'Pagi'
                                    ? 'bg-blue-100 text-blue-800'
                                    : sch.shift === 'Siang'
                                    ? 'bg-amber-100 text-amber-800'
                                    : 'bg-indigo-100 text-indigo-800'
                                }`}>
                                  Shift {sch.shift}
                                </span>
                              </div>

                              <div className="flex items-center justify-between text-slate-600 text-[11px]">
                                <div className="flex items-center space-x-1">
                                  <Clock className="w-3 h-3 text-slate-400" />
                                  <span className="font-semibold text-slate-700">{sch.startTime} - {sch.endTime} WIB</span>
                                </div>
                                <span className="font-medium text-[#008080]">{sch.taskType}</span>
                              </div>

                              <div className="flex items-center space-x-1 text-slate-500 text-[11px] pt-1 border-t border-slate-200/50">
                                <MapPin className="w-3 h-3 text-red-500 shrink-0" />
                                <span className="truncate">{sch.location}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Card Footer Action */}
                      <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                        <div className="flex items-center space-x-1 text-[11px] text-emerald-700 font-semibold">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>SIP Valid</span>
                        </div>

                        {doctor ? (
                          <button
                            onClick={() => onSelectDoctor(doctor)}
                            className="px-3 py-1.5 bg-[#008080] hover:bg-[#005F73] text-white text-xs font-bold rounded-xl flex items-center space-x-1 transition-colors"
                          >
                            <span>Profil Dokter</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        ) : (
                          <span className="text-[11px] text-slate-400 italic">Praktik Reguler</span>
                        )}
                      </div>

                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Content Body: TABLE MODE */}
        {viewMode === 'table' && (
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-[#0B2D5C] text-white font-semibold">
                    <th className="p-3.5 font-bold">Dokter & SMF</th>
                    <th className="p-3.5 font-bold">Spesialisasi</th>
                    <th className="p-3.5 font-bold">Hari</th>
                    <th className="p-3.5 font-bold">Jam Praktik</th>
                    <th className="p-3.5 font-bold">Ruang Poliklinik</th>
                    <th className="p-3.5 font-bold">Sesi / Tugas</th>
                    <th className="p-3.5 font-bold text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {filteredSchedules.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="p-8 text-center text-slate-500">
                        Tidak ada data jadwal dokter untuk filter ini.
                      </td>
                    </tr>
                  ) : (
                    filteredSchedules.map((sch) => {
                      const doc = doctors.find((d) => d.id === sch.doctorId || d.name.toLowerCase().includes(sch.doctorName.toLowerCase().split(',')[0]));
                      return (
                        <tr key={sch.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="p-3.5 font-bold text-[#0B2D5C]">
                            <div>{sch.doctorName}</div>
                            <span className="text-[10px] text-amber-700 bg-amber-50 px-1.5 py-0.2 rounded font-bold uppercase">
                              {sch.smf}
                            </span>
                          </td>
                          <td className="p-3.5 text-slate-600 font-medium">{sch.specialty}</td>
                          <td className="p-3.5 font-bold text-slate-800">
                            <span className="px-2 py-1 bg-slate-100 rounded text-xs">
                              {sch.day}
                            </span>
                          </td>
                          <td className="p-3.5 font-semibold text-[#008080]">
                            {sch.startTime} - {sch.endTime} WIB
                          </td>
                          <td className="p-3.5 text-slate-700 font-medium">{sch.location}</td>
                          <td className="p-3.5">
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-800 border border-blue-200">
                              {sch.taskType}
                            </span>
                          </td>
                          <td className="p-3.5 text-center">
                            {doc ? (
                              <button
                                onClick={() => onSelectDoctor(doc)}
                                className="px-2.5 py-1 bg-slate-100 hover:bg-[#008080] hover:text-white text-slate-700 text-xs font-bold rounded-lg transition-all"
                              >
                                Detail
                              </button>
                            ) : (
                              <span className="text-slate-400 text-[11px]">-</span>
                            )}
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Bottom Banner Info Pendaftaran & Kontak IGD */}
        <div className="mt-12 bg-linear-to-r from-[#0B2D5C] to-[#1C4E80] text-white rounded-2xl p-6 sm:p-8 shadow-md flex flex-col md:flex-row items-center justify-between gap-6 border border-white/10">
          <div className="space-y-2 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start space-x-2 text-amber-300 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>Informasi Pendaftaran Rawat Jalan</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold font-serif-display">
              Butuh Informasi Pendaftaran atau Layanan Darurat IGD?
            </h3>
            <p className="text-slate-200 text-xs sm:text-sm max-w-2xl">
              Loket Pendaftaran Poliklinik Rawat Jalan dibuka Senin - Sabtu mulai pukul 07.30 - 12.00 WIB. Layanan IGD 24 Jam siap melayani penanganan darurat tanpa henti.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-3 shrink-0">
            <a
              href="tel:062221234"
              className="w-full sm:w-auto px-5 py-3 bg-amber-400 hover:bg-amber-300 text-[#0B2D5C] text-xs font-extrabold rounded-xl shadow-md transition-all flex items-center justify-center space-x-2"
            >
              <PhoneCall className="w-4 h-4 text-[#0B2D5C]" />
              <span>Hubungi Pendaftaran (0622) 21234</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
