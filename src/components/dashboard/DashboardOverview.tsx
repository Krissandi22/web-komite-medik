import React from 'react';
import { Doctor, KredensialApplication, AuditKlinisRecord } from '../../types';
import {
  Users,
  ShieldAlert,
  Clock,
  FileCheck2,
  TrendingUp,
  AlertTriangle,
  Plus,
  Printer,
  ChevronRight,
  CheckCircle2
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area
} from 'recharts';

interface DashboardOverviewProps {
  doctors: Doctor[];
  applications: KredensialApplication[];
  audits: AuditKlinisRecord[];
  onNavigateTab: (tabId: string) => void;
  onOpenNewCredentialModal: () => void;
  onSelectDoctor: (doc: Doctor) => void;
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({
  doctors,
  applications,
  audits,
  onNavigateTab,
  onOpenNewCredentialModal,
  onSelectDoctor
}) => {
  // Stat calculations
  const totalActiveDoctors = doctors.length;
  const pendingCredentials = applications.length;
  const expiredSipDoctors = doctors.filter((d) => d.status === 'SIP Expired' || d.status === 'STR Expired' || d.status === 'Menunggu Re-kredensial');
  const activeAudits = audits.length;

  // Recharts Chart Data: Monthly Credentials
  const monthlyData = [
    { bulan: 'Jan', baru: 4, rekredensial: 12 },
    { bulan: 'Feb', baru: 2, rekredensial: 15 },
    { bulan: 'Mar', baru: 5, rekredensial: 10 },
    { bulan: 'Apr', baru: 3, rekredensial: 18 },
    { bulan: 'Mei', baru: 6, rekredensial: 14 },
    { bulan: 'Jun', baru: 4, rekredensial: 16 },
    { bulan: 'Jul', baru: 7, rekredensial: 20 }
  ];

  // Recharts Chart Data: Credential Status Distribution
  const activeCount = doctors.filter((d) => d.status === 'Aktif' || d.kredensialStatus === 'Aktif').length;
  const pendingCount = doctors.filter((d) => d.status === 'Menunggu Re-kredensial' || d.status === 'Proses Review').length;
  const expiredCount = doctors.filter((d) => d.status === 'SIP Expired' || d.status === 'STR Expired').length;

  const pieData = [
    { name: 'Aktif', value: activeCount, color: '#2E7D32' },
    { name: 'Menunggu Re-kredensial', value: pendingCount, color: '#ED6C02' },
    { name: 'SIP/STR Expired', value: expiredCount, color: '#C62828' }
  ];

  // Recharts Chart Data: Audit Compliance
  const auditComplianceData = [
    { smf: 'Bedah', compliance: 96.2, target: 90 },
    { smf: 'Dalam', compliance: 94.8, target: 90 },
    { smf: 'Anak', compliance: 98.0, target: 90 },
    { smf: 'Obgyn', compliance: 95.5, target: 90 },
    { smf: 'Anestesi', compliance: 88.0, target: 90 }
  ];

  return (
    <div className="space-y-6">
      
      {/* Welcome & Quick Action Header */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
            RUMAH SAKIT TENTARA PEMATANG SIANTAR
          </span>
          <h1 className="text-xl sm:text-2xl font-extrabold text-[#0B2D5C] tracking-tight mt-0.5">
            Dashboard Utama Komite Medik
          </h1>
          <p className="text-xs text-slate-600 mt-1">
            Ringkasan Tata Kelola Kredensial, Masa Berlaku SIP/STR Dokter, dan Indikator Mutu Pelayanan Medis
          </p>
        </div>

        <div className="flex items-center space-x-2 shrink-0">
          <button
            onClick={onOpenNewCredentialModal}
            className="px-4 py-2 bg-[#0B2D5C] hover:bg-[#082247] text-white text-xs font-bold rounded-lg shadow-xs flex items-center space-x-1.5"
          >
            <Plus className="w-4 h-4 text-amber-400" />
            <span>Ajukan Kredensial</span>
          </button>

          <button
            onClick={() => onNavigateTab('kewenangan')}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-lg border border-slate-300 flex items-center space-x-1.5"
          >
            <Printer className="w-4 h-4 text-slate-500" />
            <span>Cetak SPK/RKK</span>
          </button>
        </div>
      </div>

      {/* Critical Warning Alert Banner if any SIP/STR expired */}
      {expiredSipDoctors.length > 0 && (
        <div className="bg-amber-50 border-l-4 border-amber-600 p-4 rounded-r-xl shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <h3 className="text-xs font-bold text-amber-900">
                Peringatan Dini Masa Berlaku SIP/STR ({expiredSipDoctors.length} Dokter Perlu Tindakan)
              </h3>
              <p className="text-[11px] text-amber-800 mt-0.5">
                Terdapat dokter dengan SIP/STR yang telah kedaluwarsa atau mendekati jatuh tempo. Diperlukan tindakan Re-Kredensialing segera.
              </p>
            </div>
          </div>

          <button
            onClick={() => onNavigateTab('dokter')}
            className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded shrink-0 self-start sm:self-center"
          >
            Lihat Daftar Dokter →
          </button>
        </div>
      )}

      {/* 4 Overview Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Stat 1: Dokter Aktif */}
        <div 
          onClick={() => onNavigateTab('dokter')}
          className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs hover:border-[#0B2D5C] transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase">Dokter Aktif</span>
            <div className="p-2 bg-blue-50 text-[#0B2D5C] rounded-lg">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-3xl font-extrabold text-[#0B2D5C]">{totalActiveDoctors}</span>
            <span className="text-xs text-slate-500 ml-1">DPJP & Staf Medis</span>
          </div>
          <span className="text-[10px] text-[#0F8B8D] font-bold block mt-2 group-hover:underline">
            Kelola Rincian Kewenangan →
          </span>
        </div>

        {/* Stat 2: Kredensial Menunggu */}
        <div 
          onClick={() => onNavigateTab('rekredensial')}
          className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs hover:border-[#0B2D5C] transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase">Permohonan Kredensial</span>
            <div className="p-2 bg-amber-50 text-amber-700 rounded-lg">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-3xl font-extrabold text-[#0B2D5C]">{pendingCredentials}</span>
            <span className="text-xs text-slate-500 ml-1">Dalam Antrean Review</span>
          </div>
          <span className="text-[10px] text-amber-700 font-bold block mt-2 group-hover:underline">
            Proses Peer Review →
          </span>
        </div>

        {/* Stat 3: SIP Expired */}
        <div 
          onClick={() => onNavigateTab('dokter')}
          className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs hover:border-[#0B2D5C] transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase">Perlu Rekredensial</span>
            <div className="p-2 bg-red-50 text-red-700 rounded-lg">
              <ShieldAlert className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-3xl font-extrabold text-red-700">{expiredSipDoctors.length}</span>
            <span className="text-xs text-slate-500 ml-1">Dokter</span>
          </div>
          <span className="text-[10px] text-red-700 font-bold block mt-2 group-hover:underline">
            Verifikasi SIP/STR →
          </span>
        </div>

        {/* Stat 4: Audit Klinis */}
        <div 
          onClick={() => onNavigateTab('audit')}
          className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs hover:border-[#0B2D5C] transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase">Audit Klinis Active</span>
            <div className="p-2 bg-emerald-50 text-emerald-800 rounded-lg">
              <FileCheck2 className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-3xl font-extrabold text-[#0B2D5C]">{activeAudits}</span>
            <span className="text-xs text-slate-500 ml-1">Program Selesai/Jalan</span>
          </div>
          <span className="text-[10px] text-emerald-700 font-bold block mt-2 group-hover:underline">
            Lihat Laporan Audit →
          </span>
        </div>

      </div>

      {/* Recharts Analytics Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Chart: Monthly Credentialing Trend (Bar Chart) - 7 cols */}
        <div className="lg:col-span-7 bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-[#0B2D5C]">
                Tren Kredensial & Re-Kredensial Bulanan (2026)
              </h3>
              <p className="text-[11px] text-slate-500">Jumlah verifikasi berkas staf medis per bulan</p>
            </div>
            <span className="text-[10px] font-bold bg-blue-50 text-[#0B2D5C] px-2 py-1 rounded border border-blue-200">
              Subkomite Kredensial
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="bulan" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0B2D5C', color: '#fff', borderRadius: '8px', fontSize: '11px' }}
                />
                <Bar dataKey="baru" name="Kredensial Baru" fill="#0F8B8D" radius={[4, 4, 0, 0]} />
                <Bar dataKey="rekredensial" name="Re-Kredensialing" fill="#0B2D5C" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right Chart: Credential Status Distribution (Pie Chart) - 5 cols */}
        <div className="lg:col-span-5 bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-[#0B2D5C]">
                Distribusi Status Kredensial Dokter
              </h3>
              <p className="text-[11px] text-slate-500">Status {doctors.length} Dokter Staf Medis</p>
            </div>
          </div>

          <div className="h-64 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#0B2D5C', color: '#fff', borderRadius: '8px', fontSize: '11px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Legend */}
          <div className="flex items-center justify-center space-x-4 text-[11px] pt-1">
            <div className="flex items-center space-x-1.5">
              <span className="w-3 h-3 rounded-full bg-[#2E7D32]"></span>
              <span>Aktif ({activeCount})</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="w-3 h-3 rounded-full bg-[#ED6C02]"></span>
              <span>Re-Kredensial ({pendingCount})</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="w-3 h-3 rounded-full bg-[#C62828]"></span>
              <span>Expired ({expiredCount})</span>
            </div>
          </div>
        </div>

      </div>

      {/* Clinical Audit Compliance Chart & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Compliance Rate per SMF */}
        <div className="lg:col-span-6 bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-[#0B2D5C]">
                Kepatuhan Panduan Praktik Klinis (PPK) per SMF
              </h3>
              <p className="text-[11px] text-slate-500">Target kepatuhan indikator mutu: Min 90%</p>
            </div>
          </div>

          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={auditComplianceData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="smf" tick={{ fontSize: 11 }} />
                <YAxis domain={[70, 100]} tick={{ fontSize: 11 }} />
                <Tooltip contentStyle={{ backgroundColor: '#0B2D5C', color: '#fff', borderRadius: '8px', fontSize: '11px' }} />
                <Bar dataKey="compliance" name="Capaian Kepatuhan %" fill="#2E7D32" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Applications Activity Timeline */}
        <div className="lg:col-span-6 bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-sm font-bold text-[#0B2D5C]">
                Aktivitas Pengajuan Kredensial Terbaru
              </h3>
              <p className="text-[11px] text-slate-500">Pengajuan masuk & status verifikasi</p>
            </div>
            <button
              onClick={() => onNavigateTab('rekredensial')}
              className="text-xs font-bold text-[#0F8B8D] hover:underline"
            >
              Lihat Semua →
            </button>
          </div>

          <div className="space-y-3">
            {applications.map((app) => (
              <div
                key={app.id}
                className="p-3 bg-[#F7F9FC] rounded-lg border border-slate-200 flex items-center justify-between text-xs"
              >
                <div>
                  <span className="font-extrabold text-[#0B2D5C] block">{app.doctorName}</span>
                  <span className="text-[11px] text-slate-500">{app.specialty} • {app.type}</span>
                  <span className="text-[10px] text-slate-400 block font-mono">Tgl: {app.applicationDate}</span>
                </div>

                <span className="px-2.5 py-1 bg-amber-100 text-amber-900 text-[10px] font-bold rounded border border-amber-300">
                  {app.status}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
