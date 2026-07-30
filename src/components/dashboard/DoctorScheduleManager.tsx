import React, { useState } from 'react';
import {
  Calendar,
  List,
  Plus,
  Filter,
  Search,
  Printer,
  FileSpreadsheet,
  FileText,
  Clock,
  MapPin,
  User,
  CheckCircle2,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  Edit2,
  Trash2,
  History,
  X,
  Stethoscope,
  ShieldCheck,
  Building2,
  Activity,
  ArrowRight
} from 'lucide-react';
import {
  DoctorSchedule,
  ScheduleTaskType,
  ScheduleStatus,
  Doctor,
  ScheduleChangeLog,
  UserRole
} from '../../types';

interface DoctorScheduleManagerProps {
  role: UserRole;
  schedules: DoctorSchedule[];
  doctors: Doctor[];
  changeLogs: ScheduleChangeLog[];
  onAddSchedule: (schedule: Omit<DoctorSchedule, 'id'>) => void;
  onUpdateSchedule: (schedule: DoctorSchedule) => void;
  onDeleteSchedule: (id: string) => void;
  currentDoctorId?: string;
}

export const DoctorScheduleManager: React.FC<DoctorScheduleManagerProps> = ({
  role,
  schedules,
  doctors,
  changeLogs,
  onAddSchedule,
  onUpdateSchedule,
  onDeleteSchedule,
  currentDoctorId
}) => {
  const [viewMode, setViewMode] = useState<'calendar' | 'table' | 'history'>('calendar');
  const [searchDoctor, setSearchDoctor] = useState('');
  const [selectedSmf, setSelectedSmf] = useState<string>('semua');
  const [selectedTaskType, setSelectedTaskType] = useState<string>('semua');
  const [selectedStatus, setSelectedStatus] = useState<string>('semua');
  const [selectedDay, setSelectedDay] = useState<string>('semua');
  
  // Calendar Navigation
  const [currentMonth, setCurrentMonth] = useState('Agustus 2026');

  // Modal States
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingSchedule, setEditingSchedule] = useState<DoctorSchedule | null>(null);
  const [viewingSchedule, setViewingSchedule] = useState<DoctorSchedule | null>(null);
  const [isExportPdfOpen, setIsExportPdfOpen] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    doctorId: doctors[0]?.id || '',
    day: 'Senin' as DoctorSchedule['day'],
    date: '2026-08-03',
    shift: 'Pagi' as DoctorSchedule['shift'],
    startTime: '08.00',
    endTime: '14.00',
    location: 'Poli Bedah',
    taskType: 'Poli Rawat Jalan' as ScheduleTaskType,
    status: 'Aktif' as ScheduleStatus,
    notes: ''
  });

  // Role constraint for Doctor role: filter personal schedules if in doctor view and filtered
  const isDoctorOnly = role === 'dokter';
  const effectiveSchedules = isDoctorOnly && currentDoctorId
    ? schedules.filter(s => s.doctorId === currentDoctorId)
    : schedules;

  // Filter schedules
  const filteredSchedules = effectiveSchedules.filter(s => {
    const matchSearch = s.doctorName.toLowerCase().includes(searchDoctor.toLowerCase()) ||
                        s.specialty.toLowerCase().includes(searchDoctor.toLowerCase()) ||
                        s.location.toLowerCase().includes(searchDoctor.toLowerCase());
    const matchSmf = selectedSmf === 'semua' || s.smf === selectedSmf;
    const matchTask = selectedTaskType === 'semua' || s.taskType === selectedTaskType;
    const matchStatus = selectedStatus === 'semua' || s.status === selectedStatus;
    const matchDay = selectedDay === 'semua' || s.day === selectedDay;
    return matchSearch && matchSmf && matchTask && matchStatus && matchDay;
  });

  // Calculate stats
  const stats = {
    totalBertugas: schedules.filter(s => s.status === 'Aktif' || s.status === 'Operasi' || s.status === 'On Call').length,
    poliAktif: schedules.filter(s => s.taskType === 'Poli Rawat Jalan').length,
    dokterUgd: schedules.filter(s => s.taskType === 'UGD').length,
    operasiCount: schedules.filter(s => s.taskType === 'Operasi').length,
    konsultasiCount: schedules.filter(s => s.taskType === 'Konsultasi Dokter').length,
    onCallCount: schedules.filter(s => s.taskType === 'On Call').length
  };

  // Color Mapping Helper
  const getTaskBadgeStyle = (taskType: ScheduleTaskType, status: ScheduleStatus) => {
    if (status === 'Libur') return 'bg-rose-50 text-rose-700 border-rose-200';
    if (status === 'Selesai') return 'bg-slate-100 text-slate-600 border-slate-200';
    
    switch (taskType) {
      case 'Poli Rawat Jalan':
        return 'bg-emerald-50 text-emerald-800 border-emerald-200';
      case 'UGD':
        return 'bg-red-50 text-red-800 border-red-200';
      case 'Visite Rawat Inap':
        return 'bg-[#008080]/10 text-[#008080] border-[#008080]/30';
      case 'Konsultasi Dokter':
        return 'bg-sky-50 text-sky-800 border-sky-200';
      case 'Operasi':
        return 'bg-purple-50 text-purple-800 border-purple-200';
      case 'On Call':
        return 'bg-blue-50 text-blue-800 border-blue-200';
      case 'Medical Check Up':
        return 'bg-teal-50 text-teal-800 border-teal-200';
      case 'Jaga Malam':
        return 'bg-indigo-50 text-indigo-800 border-indigo-200';
      case 'Rapat Komite Medik':
        return 'bg-amber-50 text-amber-800 border-amber-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const handleOpenAdd = (defaultDate?: string) => {
    const doc = doctors[0];
    setFormData({
      doctorId: doc ? doc.id : '',
      day: 'Senin',
      date: defaultDate || '2026-08-03',
      shift: 'Pagi',
      startTime: '08.00',
      endTime: '14.00',
      location: 'Poli Penyakit Dalam',
      taskType: 'Poli Rawat Jalan',
      status: 'Aktif',
      notes: ''
    });
    setEditingSchedule(null);
    setIsAddModalOpen(true);
  };

  const handleOpenEdit = (schedule: DoctorSchedule) => {
    setEditingSchedule(schedule);
    setFormData({
      doctorId: schedule.doctorId,
      day: schedule.day,
      date: schedule.date,
      shift: schedule.shift,
      startTime: schedule.startTime,
      endTime: schedule.endTime,
      location: schedule.location,
      taskType: schedule.taskType,
      status: schedule.status,
      notes: schedule.notes || ''
    });
    setIsAddModalOpen(true);
  };

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    const doc = doctors.find(d => d.id === formData.doctorId);
    if (!doc) return;

    if (editingSchedule) {
      onUpdateSchedule({
        ...editingSchedule,
        doctorId: doc.id,
        doctorName: doc.name,
        specialty: doc.specialty,
        smf: doc.unit,
        day: formData.day,
        date: formData.date,
        shift: formData.shift,
        startTime: formData.startTime,
        endTime: formData.endTime,
        location: formData.location,
        taskType: formData.taskType,
        status: formData.status,
        notes: formData.notes
      });
    } else {
      onAddSchedule({
        doctorId: doc.id,
        doctorName: doc.name,
        specialty: doc.specialty,
        smf: doc.unit,
        day: formData.day,
        date: formData.date,
        shift: formData.shift,
        startTime: formData.startTime,
        endTime: formData.endTime,
        location: formData.location,
        taskType: formData.taskType,
        status: formData.status,
        notes: formData.notes
      });
    }

    setIsAddModalOpen(false);
  };

  const handleExportExcel = () => {
    const headers = ['Nama Dokter', 'Spesialis', 'SMF', 'Hari', 'Tanggal', 'Shift', 'Jam', 'Lokasi', 'Jenis Tugas', 'Status'];
    const rows = filteredSchedules.map(s => [
      `"${s.doctorName}"`,
      `"${s.specialty}"`,
      `"${s.smf}"`,
      s.day,
      s.date,
      s.shift,
      `"${s.startTime} - ${s.endTime}"`,
      `"${s.location}"`,
      `"${s.taskType}"`,
      s.status
    ]);
    
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Jadwal_Dokter_RST_Siantar_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Days array for August 2026 calendar simulation (31 days)
  const augustDays = Array.from({ length: 31 }, (_, i) => {
    const dayNumber = i + 1;
    const dateStr = `2026-08-${dayNumber < 10 ? '0' + dayNumber : dayNumber}`;
    
    // Day names mapping for August 2026 (Aug 1 = Sabtu)
    const dayNames = ['Sabtu', 'Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat'];
    const dayName = dayNames[(i % 7)];
    
    const daySchedules = filteredSchedules.filter(s => s.date === dateStr);
    return { dayNumber, dateStr, dayName, daySchedules };
  });

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#0B2D5C] via-[#005F73] to-[#008080] text-white p-6 rounded-2xl shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-2xl pointer-events-none" />
        
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center space-x-2 text-amber-400 font-bold text-xs uppercase tracking-wider mb-1">
              <Stethoscope className="w-4 h-4" />
              <span>Sistem Manajemen Jadwal Tugas Medis</span>
            </div>
            <h1 className="text-2xl lg:text-3xl font-extrabold tracking-tight">
              Jadwal Dokter & Staf Kesehatan
            </h1>
            <p className="text-slate-200 text-xs sm:text-sm mt-1 max-w-2xl">
              Pengelolaan jadwal Poli Rawat Jalan, UGD, Visite, Operasi, On Call, dan Rapat Komite Medik Rumah Sakit Tentara Pematang Siantar.
            </p>
          </div>

          {/* Role badge & quick actions */}
          <div className="flex flex-wrap items-center gap-3">
            {role === 'admin' && (
              <button
                onClick={() => handleOpenAdd()}
                className="flex items-center space-x-2 px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold text-xs rounded-xl shadow-md transition-transform hover:scale-[1.02]"
              >
                <Plus className="w-4 h-4 stroke-[3]" />
                <span>Tambah Jadwal Baru</span>
              </button>
            )}

            <button
              onClick={() => setIsExportPdfOpen(true)}
              className="flex items-center space-x-2 px-3.5 py-2.5 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs rounded-xl border border-white/20 backdrop-blur-md transition-colors"
            >
              <Printer className="w-4 h-4 text-amber-300" />
              <span>Cetak / PDF</span>
            </button>

            <button
              onClick={handleExportExcel}
              className="flex items-center space-x-2 px-3.5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs rounded-xl shadow-xs transition-colors"
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>Export Excel</span>
            </button>
          </div>
        </div>

        {/* Real-time Summary Cards on Header */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mt-6 pt-6 border-t border-white/15">
          <div className="bg-white/10 backdrop-blur-md p-3 rounded-xl border border-white/10">
            <span className="text-[10px] text-slate-300 uppercase font-bold block">Dokter Bertugas</span>
            <span className="text-xl font-black text-amber-300 mt-0.5 block">{stats.totalBertugas}</span>
            <span className="text-[10px] text-emerald-300 flex items-center gap-1 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse"></span>
              Aktif Hari Ini
            </span>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-3 rounded-xl border border-white/10">
            <span className="text-[10px] text-slate-300 uppercase font-bold block">Poli Aktif</span>
            <span className="text-xl font-black text-white mt-0.5 block">{stats.poliAktif}</span>
            <span className="text-[10px] text-slate-300">Rawat Jalan</span>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-3 rounded-xl border border-white/10">
            <span className="text-[10px] text-slate-300 uppercase font-bold block">Dokter UGD</span>
            <span className="text-xl font-black text-red-300 mt-0.5 block">{stats.dokterUgd}</span>
            <span className="text-[10px] text-red-200">24 Jam Standby</span>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-3 rounded-xl border border-white/10">
            <span className="text-[10px] text-slate-300 uppercase font-bold block">Jadwal Operasi</span>
            <span className="text-xl font-black text-purple-300 mt-0.5 block">{stats.operasiCount}</span>
            <span className="text-[10px] text-purple-200">OK Bedah Cito/Elektif</span>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-3 rounded-xl border border-white/10">
            <span className="text-[10px] text-slate-300 uppercase font-bold block">Konsultasi</span>
            <span className="text-xl font-black text-sky-300 mt-0.5 block">{stats.konsultasiCount}</span>
            <span className="text-[10px] text-sky-200">Spesialis Penunjang</span>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-3 rounded-xl border border-white/10">
            <span className="text-[10px] text-slate-300 uppercase font-bold block">On Call</span>
            <span className="text-xl font-black text-blue-300 mt-0.5 block">{stats.onCallCount}</span>
            <span className="text-[10px] text-blue-200">Emergency Call</span>
          </div>
        </div>
      </div>

      {/* Control Bar: View Switcher & Filters */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 space-y-4">
        
        {/* Top Controls: Search & Tabs */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          
          {/* Tab buttons */}
          <div className="flex items-center space-x-1 bg-slate-100 p-1 rounded-xl shrink-0">
            <button
              onClick={() => setViewMode('calendar')}
              className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all ${
                viewMode === 'calendar'
                  ? 'bg-white text-[#0B2D5C] shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Calendar className="w-4 h-4 text-[#008080]" />
              <span>Calendar View</span>
            </button>

            <button
              onClick={() => setViewMode('table')}
              className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all ${
                viewMode === 'table'
                  ? 'bg-white text-[#0B2D5C] shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <List className="w-4 h-4 text-[#008080]" />
              <span>Table View</span>
            </button>

            <button
              onClick={() => setViewMode('history')}
              className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all ${
                viewMode === 'history'
                  ? 'bg-white text-[#0B2D5C] shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <History className="w-4 h-4 text-[#008080]" />
              <span>Riwayat Perubahan ({changeLogs.length})</span>
            </button>
          </div>

          {/* Doctor / Location Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Cari nama dokter, spesialis, atau lokasi..."
              value={searchDoctor}
              onChange={(e) => setSearchDoctor(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-[#008080] focus:bg-white outline-none transition-all"
            />
          </div>
        </div>

        {/* Filter Dropdowns Row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 pt-2 border-t border-slate-100 text-xs">
          <div>
            <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">SMF / Departemen</label>
            <select
              value={selectedSmf}
              onChange={(e) => setSelectedSmf(e.target.value)}
              className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-semibold focus:outline-none focus:border-[#008080]"
            >
              <option value="semua">Semua SMF</option>
              <option value="SMF Bedah">SMF Bedah</option>
              <option value="SMF Penyakit Dalam">SMF Penyakit Dalam</option>
              <option value="SMF Anak">SMF Anak</option>
              <option value="SMF Obgyn">SMF Obgyn</option>
              <option value="SMF Anestesiologi">SMF Anestesiologi</option>
              <option value="SMF Saraf">SMF Saraf</option>
              <option value="SMF Orthopedi">SMF Orthopedi</option>
              <option value="SMF Mata">SMF Mata</option>
            </select>
          </div>

          <div>
            <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">Jenis Tugas</label>
            <select
              value={selectedTaskType}
              onChange={(e) => setSelectedTaskType(e.target.value)}
              className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-semibold focus:outline-none focus:border-[#008080]"
            >
              <option value="semua">Semua Tugas</option>
              <option value="Poli Rawat Jalan">Poli Rawat Jalan</option>
              <option value="UGD">UGD 24 Jam</option>
              <option value="Visite Rawat Inap">Visite Rawat Inap</option>
              <option value="Operasi">Operasi OK</option>
              <option value="Konsultasi Dokter">Konsultasi Dokter</option>
              <option value="On Call">On Call Emergency</option>
              <option value="Medical Check Up">Medical Check Up</option>
              <option value="Jaga Malam">Jaga Malam</option>
              <option value="Rapat Komite Medik">Rapat Komite</option>
            </select>
          </div>

          <div>
            <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">Hari</label>
            <select
              value={selectedDay}
              onChange={(e) => setSelectedDay(e.target.value)}
              className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-semibold focus:outline-none focus:border-[#008080]"
            >
              <option value="semua">Semua Hari</option>
              <option value="Senin">Senin</option>
              <option value="Selasa">Selasa</option>
              <option value="Rabu">Rabu</option>
              <option value="Kamis">Kamis</option>
              <option value="Jumat">Jumat</option>
              <option value="Sabtu">Sabtu</option>
              <option value="Minggu">Minggu</option>
            </select>
          </div>

          <div>
            <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">Status</label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-semibold focus:outline-none focus:border-[#008080]"
            >
              <option value="semua">Semua Status</option>
              <option value="Aktif">🟢 Aktif</option>
              <option value="Menunggu">🟡 Menunggu</option>
              <option value="On Call">🔵 On Call</option>
              <option value="Operasi">🟣 Operasi</option>
              <option value="Libur">🔴 Libur</option>
              <option value="Selesai">⚪ Selesai</option>
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={() => {
                setSearchDoctor('');
                setSelectedSmf('semua');
                setSelectedTaskType('semua');
                setSelectedStatus('semua');
                setSelectedDay('semua');
              }}
              className="w-full p-2 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold rounded-lg transition-colors text-center"
            >
              Reset Filter
            </button>
          </div>
        </div>

      </div>

      {/* VIEW 1: CALENDAR VIEW */}
      {viewMode === 'calendar' && (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          
          {/* Calendar Header */}
          <div className="p-4 bg-[#0B2D5C] text-white flex items-center justify-between border-b border-slate-700">
            <div className="flex items-center space-x-3">
              <Calendar className="w-5 h-5 text-amber-400" />
              <h2 className="text-lg font-bold">{currentMonth}</h2>
              <span className="text-xs px-2.5 py-0.5 bg-amber-500/20 text-amber-300 border border-amber-400/30 font-bold rounded-full">
                Jadwal Kedokteran RST
              </span>
            </div>

            {/* Legend Indicators */}
            <div className="hidden lg:flex items-center space-x-3 text-[11px] font-semibold">
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Poli</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-red-500"></span> UGD</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-purple-500"></span> Operasi</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span> On Call</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span> Rapat</span>
            </div>
          </div>

          {/* Calendar Grid Header (Days of week) */}
          <div className="grid grid-cols-7 bg-slate-100 border-b border-slate-200 text-center font-bold text-slate-700 text-xs py-2.5">
            <div>Sabtu</div>
            <div>Minggu</div>
            <div>Senin</div>
            <div>Selasa</div>
            <div>Rabu</div>
            <div>Kamis</div>
            <div>Jumat</div>
          </div>

          {/* Calendar Day Cells Grid */}
          <div className="grid grid-cols-7 divide-x divide-y divide-slate-200 bg-slate-50 min-h-[550px]">
            {augustDays.map((cell) => {
              const isToday = cell.dayNumber === 3; // August 3rd highlight
              return (
                <div
                  key={cell.dateStr}
                  className={`p-1.5 sm:p-2 min-h-[120px] transition-colors ${
                    isToday ? 'bg-amber-50/70 border-2 border-amber-400' : 'bg-white hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span
                      className={`text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center ${
                        isToday ? 'bg-amber-500 text-slate-900 font-extrabold' : 'text-slate-700'
                      }`}
                    >
                      {cell.dayNumber}
                    </span>

                    {role === 'admin' && (
                      <button
                        onClick={() => handleOpenAdd(cell.dateStr)}
                        className="text-[10px] text-slate-400 hover:text-[#008080] p-1 rounded hover:bg-slate-100 transition-colors"
                        title="Tambah jadwal untuk tanggal ini"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  {/* List of Schedules on this day */}
                  <div className="space-y-1">
                    {cell.daySchedules.length === 0 ? (
                      <div className="text-[10px] text-slate-300 italic pt-2 hidden sm:block">
                        -
                      </div>
                    ) : (
                      cell.daySchedules.map((sch) => {
                        const badgeStyle = getTaskBadgeStyle(sch.taskType, sch.status);
                        return (
                          <div
                            key={sch.id}
                            onClick={() => setViewingSchedule(sch)}
                            className={`p-1.5 rounded-lg border text-[10px] font-semibold cursor-pointer transition-all hover:scale-[1.02] hover:shadow-xs ${badgeStyle}`}
                          >
                            <div className="font-bold truncate text-[11px] flex items-center justify-between">
                              <span className="truncate">{sch.doctorName.split(',')[0]}</span>
                              <span className="text-[9px] opacity-80 shrink-0 ml-1">{sch.startTime}</span>
                            </div>
                            <div className="text-[9px] opacity-90 truncate flex items-center gap-1 mt-0.5">
                              <MapPin className="w-2.5 h-2.5 shrink-0" />
                              <span className="truncate">{sch.location}</span>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      )}

      {/* VIEW 2: TABLE VIEW */}
      {viewMode === 'table' && (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#0B2D5C] text-white text-xs font-bold uppercase tracking-wider">
                  <th className="py-3.5 px-4">Dokter & Spesialis</th>
                  <th className="py-3.5 px-4">Hari & Tanggal</th>
                  <th className="py-3.5 px-4">Shift & Jam</th>
                  <th className="py-3.5 px-4">Lokasi / Poli</th>
                  <th className="py-3.5 px-4">Jenis Tugas</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-xs text-slate-700">
                {filteredSchedules.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-8 text-center text-slate-400">
                      Tidak ada data jadwal dokter yang sesuai dengan filter.
                    </td>
                  </tr>
                ) : (
                  filteredSchedules.map((s) => {
                    const badgeStyle = getTaskBadgeStyle(s.taskType, s.status);
                    return (
                      <tr key={s.id} className="hover:bg-slate-50 transition-colors">
                        <td className="py-3 px-4">
                          <div className="font-bold text-slate-900 text-xs">{s.doctorName}</div>
                          <div className="text-[11px] text-slate-500 font-medium">{s.specialty} • {s.smf}</div>
                        </td>

                        <td className="py-3 px-4 font-semibold text-slate-800">
                          <div>{s.day}</div>
                          <div className="text-[11px] text-slate-500">{s.date}</div>
                        </td>

                        <td className="py-3 px-4">
                          <span className="font-bold text-slate-900">{s.shift}</span>
                          <div className="text-[11px] text-slate-500 flex items-center gap-1">
                            <Clock className="w-3 h-3 text-slate-400" />
                            <span>{s.startTime} - {s.endTime} WIB</span>
                          </div>
                        </td>

                        <td className="py-3 px-4 font-medium text-slate-800">
                          <div className="flex items-center space-x-1.5">
                            <MapPin className="w-3.5 h-3.5 text-[#008080] shrink-0" />
                            <span>{s.location}</span>
                          </div>
                        </td>

                        <td className="py-3 px-4">
                          <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold border ${badgeStyle}`}>
                            {s.taskType}
                          </span>
                        </td>

                        <td className="py-3 px-4">
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold ${
                            s.status === 'Aktif' ? 'bg-emerald-100 text-emerald-800' :
                            s.status === 'Operasi' ? 'bg-purple-100 text-purple-800' :
                            s.status === 'On Call' ? 'bg-blue-100 text-blue-800' :
                            s.status === 'Menunggu' ? 'bg-amber-100 text-amber-800' :
                            s.status === 'Libur' ? 'bg-rose-100 text-rose-800' : 'bg-slate-200 text-slate-700'
                          }`}>
                            <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                            {s.status}
                          </span>
                        </td>

                        <td className="py-3 px-4 text-center">
                          <div className="flex items-center justify-center space-x-1">
                            <button
                              onClick={() => setViewingSchedule(s)}
                              className="p-1.5 text-slate-600 hover:text-[#008080] hover:bg-slate-100 rounded-lg transition-colors"
                              title="Lihat Detail"
                            >
                              <FileText className="w-4 h-4" />
                            </button>

                            {role === 'admin' && (
                              <>
                                <button
                                  onClick={() => handleOpenEdit(s)}
                                  className="p-1.5 text-slate-600 hover:text-amber-600 hover:bg-slate-100 rounded-lg transition-colors"
                                  title="Edit Jadwal"
                                >
                                  <Edit2 className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => onDeleteSchedule(s.id)}
                                  className="p-1.5 text-slate-600 hover:text-rose-600 hover:bg-slate-100 rounded-lg transition-colors"
                                  title="Hapus Jadwal"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </>
                            )}
                          </div>
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

      {/* VIEW 3: HISTORY / AUDIT LOG */}
      {viewMode === 'history' && (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <div className="flex items-center space-x-2">
              <History className="w-5 h-5 text-[#008080]" />
              <h3 className="text-base font-bold text-slate-900">
                Riwayat Perubahan & Audit Trail Jadwal
              </h3>
            </div>
            <span className="text-xs text-slate-500 font-semibold">
              Tercatat oleh Sistem Administrator
            </span>
          </div>

          <div className="space-y-3">
            {changeLogs.map((log) => (
              <div key={log.id} className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-0.5 bg-amber-100 text-amber-800 text-[10px] font-bold rounded">
                      {log.adminName}
                    </span>
                    <span className="text-xs text-slate-500">{log.timestamp}</span>
                  </div>
                  <p className="text-xs font-bold text-slate-800">
                    {log.action} <span className="text-[#008080]">{log.doctorName}</span>
                  </p>
                  <div className="text-xs text-slate-600 flex items-center space-x-2 pt-1">
                    <span className="line-through text-rose-500">{log.oldValue}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                    <span className="font-bold text-emerald-600">{log.newValue}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MODAL 1: ADD / EDIT SCHEDULE */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full border border-slate-200 overflow-hidden">
            
            <div className="bg-[#0B2D5C] text-white p-5 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-amber-400" />
                <h3 className="text-base font-bold">
                  {editingSchedule ? 'Edit Jadwal Tugas Dokter' : 'Tambah Jadwal Dokter Baru'}
                </h3>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 rounded-lg hover:bg-white/10 text-slate-300 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitForm} className="p-6 space-y-4 text-xs">
              
              <div>
                <label className="font-bold text-slate-700 block mb-1">Pilih Dokter *</label>
                <select
                  value={formData.doctorId}
                  onChange={(e) => setFormData({ ...formData, doctorId: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 font-semibold focus:ring-2 focus:ring-[#008080] outline-none"
                  required
                >
                  {doctors.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.name} ({d.specialty} - {d.unit})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Hari *</label>
                  <select
                    value={formData.day}
                    onChange={(e) => setFormData({ ...formData, day: e.target.value as any })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 font-semibold focus:ring-2 focus:ring-[#008080] outline-none"
                  >
                    <option value="Senin">Senin</option>
                    <option value="Selasa">Selasa</option>
                    <option value="Rabu">Rabu</option>
                    <option value="Kamis">Kamis</option>
                    <option value="Jumat">Jumat</option>
                    <option value="Sabtu">Sabtu</option>
                    <option value="Minggu">Minggu</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Tanggal *</label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 font-semibold focus:ring-2 focus:ring-[#008080] outline-none"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Shift *</label>
                  <select
                    value={formData.shift}
                    onChange={(e) => setFormData({ ...formData, shift: e.target.value as any })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 font-semibold focus:ring-2 focus:ring-[#008080] outline-none"
                  >
                    <option value="Pagi">Pagi</option>
                    <option value="Siang">Siang</option>
                    <option value="Sore">Sore</option>
                    <option value="Malam">Malam</option>
                    <option value="On Call">On Call</option>
                    <option value="24 Jam">24 Jam</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Jam Mulai</label>
                  <input
                    type="text"
                    value={formData.startTime}
                    onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 font-semibold focus:ring-2 focus:ring-[#008080] outline-none"
                    placeholder="08.00"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Jam Selesai</label>
                  <input
                    type="text"
                    value={formData.endTime}
                    onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 font-semibold focus:ring-2 focus:ring-[#008080] outline-none"
                    placeholder="14.00"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Jenis Tugas / Kategori *</label>
                  <select
                    value={formData.taskType}
                    onChange={(e) => setFormData({ ...formData, taskType: e.target.value as any })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 font-semibold focus:ring-2 focus:ring-[#008080] outline-none"
                  >
                    <option value="Poli Rawat Jalan">Poli Rawat Jalan</option>
                    <option value="UGD">UGD 24 Jam</option>
                    <option value="Visite Rawat Inap">Visite Rawat Inap</option>
                    <option value="Konsultasi Dokter">Konsultasi Dokter</option>
                    <option value="Operasi">Operasi Kamar Bedah</option>
                    <option value="On Call">On Call Emergency</option>
                    <option value="Medical Check Up">Medical Check Up</option>
                    <option value="Jaga Malam">Jaga Malam</option>
                    <option value="Rapat Komite Medik">Rapat Komite Medik</option>
                    <option value="Seminar/Pelatihan">Seminar / Pelatihan</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Status Jadwal *</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 font-semibold focus:ring-2 focus:ring-[#008080] outline-none"
                  >
                    <option value="Aktif">🟢 Aktif</option>
                    <option value="Menunggu">🟡 Menunggu</option>
                    <option value="On Call">🔵 On Call</option>
                    <option value="Operasi">🟣 Operasi</option>
                    <option value="Libur">🔴 Libur</option>
                    <option value="Selesai">⚪ Selesai</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Lokasi / Ruangan *</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 font-semibold focus:ring-2 focus:ring-[#008080] outline-none"
                  placeholder="Contoh: Poli Penyakit Dalam / Kamar Operasi 2"
                  required
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Catatan Tambahan</label>
                <textarea
                  rows={2}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 font-semibold focus:ring-2 focus:ring-[#008080] outline-none"
                  placeholder="Keterangan khusus tugas..."
                />
              </div>

              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold rounded-xl transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#008080] hover:bg-[#005F73] text-white font-bold rounded-xl shadow-md transition-colors"
                >
                  Simpan Jadwal
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: VIEW SCHEDULE DETAIL */}
      {viewingSchedule && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full border border-slate-200 overflow-hidden">
            <div className="bg-[#0B2D5C] text-white p-5 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Stethoscope className="w-5 h-5 text-amber-400" />
                <h3 className="text-base font-bold">Rincian Jadwal Tugas</h3>
              </div>
              <button
                onClick={() => setViewingSchedule(null)}
                className="p-1 rounded-lg hover:bg-white/10 text-slate-300 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-[10px] text-slate-500 font-bold uppercase block">Dokter Penanggung Jawab</span>
                <span className="text-sm font-extrabold text-slate-900 block mt-0.5">{viewingSchedule.doctorName}</span>
                <span className="text-xs text-[#008080] font-semibold">{viewingSchedule.specialty} • {viewingSchedule.smf}</span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-[10px] text-slate-500 font-bold uppercase block">Hari & Tanggal</span>
                  <span className="text-xs font-bold text-slate-800 mt-1 block">{viewingSchedule.day}, {viewingSchedule.date}</span>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-[10px] text-slate-500 font-bold uppercase block">Shift & Waktu</span>
                  <span className="text-xs font-bold text-slate-800 mt-1 block">{viewingSchedule.shift} ({viewingSchedule.startTime} - {viewingSchedule.endTime})</span>
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-[10px] text-slate-500 font-bold uppercase block">Lokasi Tugas</span>
                <div className="flex items-center space-x-1.5 text-xs font-bold text-slate-800 mt-1">
                  <MapPin className="w-4 h-4 text-[#008080]" />
                  <span>{viewingSchedule.location}</span>
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-500 font-bold uppercase block">Kategori / Status</span>
                  <span className="text-xs font-bold text-slate-800 mt-1 block">{viewingSchedule.taskType}</span>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                  {viewingSchedule.status}
                </span>
              </div>

              {viewingSchedule.notes && (
                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-900">
                  <span className="text-[10px] text-amber-700 font-bold uppercase block">Catatan Khusus</span>
                  <p className="mt-0.5">{viewingSchedule.notes}</p>
                </div>
              )}

              <div className="pt-3 border-t border-slate-200 flex justify-end">
                <button
                  onClick={() => setViewingSchedule(null)}
                  className="px-4 py-2 bg-[#0B2D5C] hover:bg-[#1C4E80] text-white font-bold rounded-xl transition-colors"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: CETAK / EXPORT PRINT PREVIEW */}
      {isExportPdfOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full border border-slate-200 overflow-hidden my-6">
            
            {/* Top Control Header */}
            <div className="bg-[#0B2D5C] text-white p-4 flex items-center justify-between print:hidden">
              <div className="flex items-center space-x-2">
                <Printer className="w-5 h-5 text-amber-400" />
                <h3 className="text-base font-bold">Pratinjau Cetak / PDF Jadwal Dokter</h3>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => window.print()}
                  className="px-4 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-900 font-extrabold text-xs rounded-xl transition-colors flex items-center space-x-1.5 shadow-xs"
                >
                  <Printer className="w-4 h-4" />
                  <span>Cetak Dokumen</span>
                </button>
                <button
                  onClick={() => setIsExportPdfOpen(false)}
                  className="px-3.5 py-1.5 bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs rounded-xl transition-colors flex items-center space-x-1 shadow-xs"
                >
                  <X className="w-4 h-4" />
                  <span>Tutup / Kembali</span>
                </button>
              </div>
            </div>

            {/* Printable Official Document Layout */}
            <div className="p-8 text-slate-900 font-sans space-y-6">
              
              {/* Kop Surat RST */}
              <div className="border-b-2 border-slate-900 pb-4 text-center space-y-1">
                <h4 className="font-extrabold text-sm uppercase tracking-wider">KESEHATAN DAERAH MILITER I / BUKIT BARISAN</h4>
                <h3 className="font-extrabold text-base uppercase tracking-wider text-[#0B2D5C]">RUMAH SAKIT TENTARA TK. IV 01.07.01 PEMATANG SIANTAR</h3>
                <p className="text-xs text-slate-600">Jl. MH Sitorus No. 1, Telp (0622) 21542, Kota Pematang Siantar, Sumatera Utara</p>
                <div className="pt-2">
                  <span className="font-bold text-xs uppercase underline tracking-widest">
                    JADWAL PENUGASAN DOKTER SPESIALIS & STAF MEDIS — AGUSTUS 2026
                  </span>
                </div>
              </div>

              {/* Table */}
              <table className="w-full text-xs border-collapse border border-slate-400">
                <thead>
                  <tr className="bg-slate-100 text-slate-900 font-bold uppercase text-[10px]">
                    <th className="border border-slate-400 p-2">No</th>
                    <th className="border border-slate-400 p-2 text-left">Nama Dokter & Spesialis</th>
                    <th className="border border-slate-400 p-2">SMF</th>
                    <th className="border border-slate-400 p-2">Hari & Tanggal</th>
                    <th className="border border-slate-400 p-2">Shift / Jam</th>
                    <th className="border border-slate-400 p-2 text-left">Lokasi Tugas</th>
                    <th className="border border-slate-400 p-2">Jenis Tugas</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSchedules.map((s, idx) => (
                    <tr key={s.id} className="text-center">
                      <td className="border border-slate-400 p-2 font-bold">{idx + 1}</td>
                      <td className="border border-slate-400 p-2 text-left font-semibold">{s.doctorName}</td>
                      <td className="border border-slate-400 p-2">{s.smf}</td>
                      <td className="border border-slate-400 p-2">{s.day}, {s.date}</td>
                      <td className="border border-slate-400 p-2">{s.shift} ({s.startTime}-{s.endTime})</td>
                      <td className="border border-slate-400 p-2 text-left">{s.location}</td>
                      <td className="border border-slate-400 p-2 font-bold">{s.taskType}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Signatures */}
              <div className="grid grid-cols-2 pt-8 text-center text-xs">
                <div>
                  <p>Mengetahui,</p>
                  <p className="font-bold">Ketua Komite Medik RST</p>
                  <div className="h-16"></div>
                  <p className="font-extrabold underline">Kolonel Ckm dr. Hendra Setiawan, Sp.B</p>
                  <p className="text-[10px]">NRP 11020018270478</p>
                </div>
                <div>
                  <p>Pematang Siantar, 29 Juli 2026</p>
                  <p className="font-bold">Kepala Rumkit Tk. IV 01.07.01</p>
                  <div className="h-16"></div>
                  <p className="font-extrabold underline">Letkol Ckm dr. Y. Sambo, Sp.PD</p>
                  <p className="text-[10px]">NRP 11010009820012</p>
                </div>
              </div>

            </div>

            {/* Bottom Sticky Action Bar */}
            <div className="p-4 bg-slate-100 border-t border-slate-200 flex items-center justify-between print:hidden">
              <span className="text-xs text-slate-500 font-semibold">Jadwal Resmi Komite Medik RST Pematang Siantar</span>
              <button
                onClick={() => setIsExportPdfOpen(false)}
                className="px-5 py-2.5 bg-[#0B2D5C] hover:bg-[#082247] text-white text-xs font-extrabold rounded-xl shadow-xs transition-colors"
              >
                Kembali ke Dashboard System
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
