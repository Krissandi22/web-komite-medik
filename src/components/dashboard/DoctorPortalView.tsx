import React, { useState } from 'react';
import {
  Doctor,
  KredensialApplication,
  DoctorSchedule,
  NewsItem,
  CalendarEvent,
  DocumentItem,
  SubmittedDocument
} from '../../types';
import {
  User,
  Clock,
  Calendar,
  FileText,
  Upload,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Bell,
  Stethoscope,
  Building2,
  Mail,
  Phone,
  ShieldCheck,
  Download,
  Plus,
  MessageSquare,
  XCircle,
  Edit2,
  Save,
  Info
} from 'lucide-react';

interface DoctorPortalViewProps {
  doctor: Doctor;
  applications: KredensialApplication[];
  schedules: DoctorSchedule[];
  news: NewsItem[];
  events: CalendarEvent[];
  documents: DocumentItem[];
  onSubmitApplication: (app: Omit<KredensialApplication, 'id'>) => void;
  onUpdateDoctorProfile: (doc: Doctor) => void;
}

export const DoctorPortalView: React.FC<DoctorPortalViewProps> = ({
  doctor,
  applications,
  schedules,
  news,
  events,
  documents,
  onSubmitApplication,
  onUpdateDoctorProfile
}) => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'profil' | 'pengajuan' | 'upload' | 'dokumen' | 'jadwal' | 'pengumuman'>('dashboard');

  // Profile Edit State
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [phoneInput, setPhoneInput] = useState(doctor.phone);
  const [emailInput, setEmailInput] = useState(doctor.email);

  // New Application Modal / Form
  const [isNewAppModalOpen, setIsNewAppModalOpen] = useState(false);
  const [isLegalDetailOpen, setIsLegalDetailOpen] = useState(false);
  const [appType, setAppType] = useState<KredensialApplication['type']>('Pengajuan Rekredensial');
  const [appNotes, setAppNotes] = useState('');
  const [rkkScopeInput, setRkkScopeInput] = useState('Poli Rawat Jalan, Tindakan Spesialis Dasar');
  const [selectedFileForApp, setSelectedFileForApp] = useState<File | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<SubmittedDocument[]>([
    { name: 'STR_Spesialis_Aktif.pdf', type: 'STR', fileSize: '2.1 MB', uploadDate: '2026-07-28' },
    { name: 'SIP_Dinkes_Siantar.pdf', type: 'SIP', fileSize: '1.4 MB', uploadDate: '2026-07-28' }
  ]);

  // Doctor Personal Schedules
  const mySchedules = schedules.filter(s => s.doctorId === doctor.id || s.doctorName.includes(doctor.name));
  const myApplications = applications.filter(a => a.doctorId === doctor.id || a.doctorName.includes(doctor.name));

  const handleSaveProfile = () => {
    onUpdateDoctorProfile({
      ...doctor,
      phone: phoneInput,
      email: emailInput
    });
    setIsEditingProfile(false);
  };

  const handleSubmitNewApp = (e: React.FormEvent) => {
    e.preventDefault();
    const scopes = rkkScopeInput.split(',').map(s => s.trim()).filter(Boolean);
    onSubmitApplication({
      doctorId: doctor.id,
      doctorName: doctor.name,
      doctorNrp: doctor.nrp,
      specialty: doctor.specialty,
      unit: doctor.unit,
      type: appType,
      applicationDate: new Date().toISOString().slice(0, 10),
      status: 'Menunggu',
      rkkScope: scopes.length > 0 ? scopes : ['Kewenangan Standar Spesialis'],
      notes: appNotes,
      submittedDocuments: uploadedFiles
    });
    setIsNewAppModalOpen(false);
    setAppNotes('');
  };

  const handleFileUploadMock = (type: SubmittedDocument['type']) => {
    const fileName = `${type}_Dokter_${doctor.name.split(' ')[1] || 'Doc'}.pdf`;
    setUploadedFiles([
      ...uploadedFiles,
      {
        name: fileName,
        type: type,
        fileSize: '1.8 MB',
        uploadDate: new Date().toISOString().slice(0, 10)
      }
    ]);
  };

  return (
    <div className="space-y-6 font-sans">
      
      {/* Doctor Header Welcome Banner */}
      <div className="bg-gradient-to-r from-[#0B2D5C] via-[#005F73] to-[#008080] text-white p-6 rounded-2xl shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <img
            src={doctor.photo}
            alt={doctor.name}
            className="w-16 h-16 rounded-2xl object-cover border-2 border-amber-400 shadow-md shrink-0"
            referrerPolicy="no-referrer"
          />
          <div>
            <div className="flex items-center space-x-2 text-amber-300 font-bold text-xs uppercase tracking-wider mb-0.5">
              <Stethoscope className="w-4 h-4" />
              <span>Portal Dokter & Staf Medis</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight">{doctor.name}</h1>
            <p className="text-xs text-slate-200 mt-0.5">
              {doctor.pangkat} • {doctor.specialty} ({doctor.unit})
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2 shrink-0">
          <button
            onClick={() => setIsNewAppModalOpen(true)}
            className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold text-xs rounded-xl shadow-md transition-all flex items-center space-x-1.5"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>Buat Pengajuan Baru</span>
          </button>
        </div>
      </div>

      {/* Internal Navigation Tabs for Dokter */}
      <div className="bg-white p-2 rounded-2xl shadow-sm border border-slate-200 flex flex-wrap items-center gap-1 text-xs">
        {[
          { id: 'dashboard', label: 'Dashboard Saya' },
          { id: 'jadwal', label: 'Jadwal Saya' },
          { id: 'pengajuan', label: 'Pengajuan & Upload Dokumen' },
          { id: 'dokumen', label: 'Dokumen & SOP' },
          { id: 'pengumuman', label: 'Pengumuman' },
          { id: 'profil', label: 'Profil Saya' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 rounded-xl font-bold transition-all ${
              activeTab === tab.id
                ? 'bg-[#0B2D5C] text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100 hover:text-[#0B2D5C]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB 1: DASHBOARD SAYA */}
      {activeTab === 'dashboard' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Column 1 & 2: Main Schedule & Status Notifications */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Status Pengajuan Card Alert */}
            {myApplications.length > 0 && (
              <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 space-y-3">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center space-x-2">
                    <Bell className="w-4 h-4 text-[#008080]" />
                    <h3 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">
                      Status Pengajuan Terbaru Anda
                    </h3>
                  </div>
                  <button
                    onClick={() => setActiveTab('pengajuan')}
                    className="text-xs text-[#008080] font-bold hover:underline"
                  >
                    Lihat Semua →
                  </button>
                </div>

                {myApplications.map((app) => (
                  <div
                    key={app.id}
                    className={`p-4 rounded-xl border text-xs space-y-2 ${
                      app.status === 'Disetujui' ? 'bg-emerald-50/70 border-emerald-200' :
                      app.status === 'Revisi' ? 'bg-amber-50/80 border-amber-300' :
                      app.status === 'Ditolak' ? 'bg-rose-50/70 border-rose-200' :
                      'bg-sky-50/70 border-sky-200'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-slate-900">{app.type}</span>
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        app.status === 'Disetujui' ? 'bg-emerald-200 text-emerald-900' :
                        app.status === 'Revisi' ? 'bg-amber-300 text-amber-950 animate-pulse' :
                        app.status === 'Ditolak' ? 'bg-rose-200 text-rose-900' : 'bg-sky-200 text-sky-900'
                      }`}>
                        ● Status: {app.status}
                      </span>
                    </div>

                    <p className="text-slate-600 text-[11px]">{app.notes}</p>

                    {/* Catatan dari Ketua Notification */}
                    {app.catatanKetua && (
                      <div className="p-3 bg-white/90 rounded-lg border border-amber-300 text-slate-800 space-y-1">
                        <span className="text-[10px] text-amber-800 font-extrabold uppercase flex items-center gap-1">
                          <MessageSquare className="w-3.5 h-3.5 text-amber-600" />
                          Catatan dari Ketua Komite Medik:
                        </span>
                        <p className="font-semibold text-xs text-amber-950">{app.catatanKetua}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Jadwal Hari Ini Box */}
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-[#008080]" />
                  <h3 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">
                    Jadwal Tugas Anda Hari Ini
                  </h3>
                </div>
                <span className="text-xs text-slate-500 font-medium">Senin, 3 Agustus 2026</span>
              </div>

              {mySchedules.length === 0 ? (
                <div className="p-6 text-center text-slate-400 text-xs">
                  Tidak ada jadwal penugasan medis aktif untuk hari ini.
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {mySchedules.map((s) => (
                    <div key={s.id} className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="px-2 py-0.5 bg-[#008080]/10 text-[#008080] font-bold text-[10px] rounded uppercase">
                          {s.taskType}
                        </span>
                        <span className="text-xs font-bold text-slate-700">{s.startTime} - {s.endTime}</span>
                      </div>
                      <div className="font-bold text-slate-900 text-sm">{s.location}</div>
                      <div className="text-xs text-slate-500 font-medium">{s.shift} Shift • {s.status}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Pengumuman Terbaru Widget */}
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 space-y-3">
              <h3 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider border-b border-slate-100 pb-3">
                Pengumuman Terbaru Komite Medik
              </h3>
              <div className="space-y-2">
                {news.slice(0, 2).map((item) => (
                  <div key={item.id} className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                    <span className="text-[10px] text-amber-700 font-bold uppercase">{item.category} • {item.date}</span>
                    <h4 className="font-bold text-slate-900 text-xs">{item.title}</h4>
                    <p className="text-slate-600 text-[11px] line-clamp-2">{item.summary}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Column 3: Doctor Credential Status Card */}
          <div className="space-y-6">
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 space-y-4">
              <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
                <ShieldCheck className="w-4 h-4 text-[#008080]" />
                <h3 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">
                  Status Legalitas Medis
                </h3>
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-[10px] text-slate-500 font-bold uppercase block">Surat Tanda Registrasi (STR)</span>
                  <span className="font-mono font-bold text-slate-900 block mt-0.5">{doctor.strNumber}</span>
                  <span className="text-[10px] text-emerald-600 font-bold">Berlaku s/d {doctor.strExpiry}</span>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-[10px] text-slate-500 font-bold uppercase block">Surat Izin Praktik (SIP) Dinkes</span>
                  <span className="font-mono font-bold text-slate-900 block mt-0.5">{doctor.sipNumber}</span>
                  <span className="text-[10px] text-emerald-600 font-bold">Berlaku s/d {doctor.sipExpiry}</span>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-[10px] text-slate-500 font-bold uppercase block">Kewenangan Klinis (SPK/RKK)</span>
                  <span className="font-bold text-slate-900 block mt-0.5">{doctor.clinicalPrivilegesCount} Tindakan Disetujui</span>
                  <span className="text-[10px] text-slate-500">Kategori: {doctor.whitePaperCategory}</span>
                </div>

                <button
                  onClick={() => setIsLegalDetailOpen(true)}
                  className="w-full py-2.5 bg-[#0B2D5C] hover:bg-[#082247] text-white text-xs font-bold rounded-xl shadow-xs flex items-center justify-center space-x-1.5 transition-colors"
                >
                  <FileText className="w-3.5 h-3.5 text-amber-400" />
                  <span>Lihat Rincian Legalitas Lengkap</span>
                </button>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* TAB 2: PROFIL SAYA */}
      {(activeTab === 'profil') && (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 space-y-6 max-w-3xl">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Profil Dokter / Staf Medis</h2>
              <p className="text-xs text-slate-500">Ubah informasi kontak pribadi Anda. Nama, NIP, dan Spesialisasi dikunci oleh Admin.</p>
            </div>
            {!isEditingProfile ? (
              <button
                onClick={() => setIsEditingProfile(true)}
                className="px-4 py-2 bg-[#008080] text-white text-xs font-bold rounded-xl flex items-center space-x-1"
              >
                <Edit2 className="w-3.5 h-3.5" />
                <span>Edit Kontak</span>
              </button>
            ) : (
              <button
                onClick={handleSaveProfile}
                className="px-4 py-2 bg-emerald-600 text-white text-xs font-bold rounded-xl flex items-center space-x-1"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Simpan Profil</span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            
            {/* Locked Fields */}
            <div className="p-3 bg-slate-100 rounded-xl border border-slate-200 space-y-1">
              <span className="text-[10px] text-slate-500 font-bold uppercase block">Nama Lengkap & Gelar (Locked)</span>
              <span className="font-bold text-slate-800 text-sm block">{doctor.name}</span>
            </div>

            <div className="p-3 bg-slate-100 rounded-xl border border-slate-200 space-y-1">
              <span className="text-[10px] text-slate-500 font-bold uppercase block">NRP / NIP (Locked)</span>
              <span className="font-mono font-bold text-slate-800 text-sm block">{doctor.nrp}</span>
            </div>

            <div className="p-3 bg-slate-100 rounded-xl border border-slate-200 space-y-1">
              <span className="text-[10px] text-slate-500 font-bold uppercase block">Spesialisasi & Unit (Locked)</span>
              <span className="font-bold text-slate-800 block">{doctor.specialty} ({doctor.unit})</span>
            </div>

            <div className="p-3 bg-slate-100 rounded-xl border border-slate-200 space-y-1">
              <span className="text-[10px] text-slate-500 font-bold uppercase block">Pangkat / Golongan (Locked)</span>
              <span className="font-bold text-amber-800 block">{doctor.pangkat}</span>
            </div>

            {/* Editable Fields */}
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
              <label className="text-[10px] text-slate-700 font-bold uppercase block">Nomor HP / WhatsApp</label>
              {isEditingProfile ? (
                <input
                  type="text"
                  value={phoneInput}
                  onChange={(e) => setPhoneInput(e.target.value)}
                  className="w-full p-2 bg-white border border-slate-300 rounded-lg font-bold"
                />
              ) : (
                <span className="font-mono font-bold text-slate-900 block">{doctor.phone}</span>
              )}
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
              <label className="text-[10px] text-slate-700 font-bold uppercase block">Email Kedinasan</label>
              {isEditingProfile ? (
                <input
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="w-full p-2 bg-white border border-slate-300 rounded-lg font-bold"
                />
              ) : (
                <span className="font-mono font-bold text-slate-900 block">{doctor.email}</span>
              )}
            </div>

          </div>
        </div>
      )}

      {/* TAB 3: PENGAJUAN SAYA */}
      {(activeTab === 'pengajuan' || activeTab === 'upload') && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Pengajuan Saya & Upload Berkas</h2>
              <p className="text-xs text-slate-500">Riwayat permohonan kredensial, rekredensial, dan sertifikasi STR/SIP Anda.</p>
            </div>
            <button
              onClick={() => setIsNewAppModalOpen(true)}
              className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold text-xs rounded-xl shadow-md flex items-center space-x-1"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>Buat Permohonan Baru</span>
            </button>
          </div>

          <div className="space-y-4">
            {myApplications.map((app) => (
              <div key={app.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-slate-900 text-sm">{app.type}</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    app.status === 'Disetujui' ? 'bg-emerald-100 text-emerald-800' :
                    app.status === 'Revisi' ? 'bg-amber-100 text-amber-900 border border-amber-300' :
                    app.status === 'Ditolak' ? 'bg-rose-100 text-rose-800' : 'bg-sky-100 text-sky-800'
                  }`}>
                    Status: {app.status}
                  </span>
                </div>

                <p className="text-xs text-slate-600">{app.notes}</p>

                {app.catatanKetua && (
                  <div className="p-3 bg-amber-50 border border-amber-300 rounded-xl text-xs text-amber-900 space-y-1">
                    <span className="font-extrabold block text-[10px] text-amber-800">CATATAN KETUA KOMITE MEDIK:</span>
                    <p className="font-bold">{app.catatanKetua}</p>
                  </div>
                )}

                <div className="text-xs pt-2 border-t border-slate-100 flex items-center justify-between text-slate-500">
                  <span>Tanggal Pengajuan: {app.applicationDate}</span>
                  <span>{app.submittedDocuments?.length || 0} Berkas Terlampir</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: JADWAL SAYA */}
      {activeTab === 'jadwal' && (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4 text-xs">
          <h2 className="text-base font-bold text-slate-900">Jadwal Tugas Kedokteran Anda</h2>
          <div className="space-y-2">
            {mySchedules.map((s) => (
              <div key={s.id} className="p-4 bg-slate-50 border rounded-xl flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-900">{s.day}, {s.date} • {s.startTime} - {s.endTime}</div>
                  <div className="text-slate-600">{s.location} ({s.taskType})</div>
                </div>
                <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 font-bold rounded-full">
                  {s.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: DOKUMEN & SOP */}
      {activeTab === 'dokumen' && (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
          <h2 className="text-base font-bold text-slate-900">Repository SOP & Pedoman Klinis</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            {documents.map((doc) => (
              <div key={doc.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <span className="text-[10px] font-bold text-amber-700 uppercase">{doc.category} • {doc.year}</span>
                <h3 className="font-bold text-slate-900 text-xs">{doc.title}</h3>
                <p className="text-slate-600 text-[11px] line-clamp-2">{doc.summary}</p>
                <div className="pt-2 flex justify-between items-center text-slate-500 text-[10px]">
                  <span>{doc.fileType} ({doc.fileSize})</span>
                  <button className="px-3 py-1 bg-[#008080] text-white font-bold rounded-lg flex items-center gap-1">
                    <Download className="w-3 h-3" /> Unduh Dokumen
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 6: PENGUMUMAN */}
      {activeTab === 'pengumuman' && (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
          <h2 className="text-base font-bold text-slate-900">Pengumuman & Info Kegiatan</h2>
          <div className="space-y-4">
            {news.map((n) => (
              <div key={n.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2 text-xs">
                <span className="text-[10px] font-bold text-amber-700">{n.category} • {n.date}</span>
                <h3 className="font-extrabold text-slate-900 text-sm">{n.title}</h3>
                <p className="text-slate-700">{n.summary}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MODAL NEW APPLICATION */}
      {isNewAppModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full border border-slate-200 overflow-hidden">
            <div className="bg-[#0B2D5C] text-white p-4 flex justify-between items-center">
              <h3 className="font-bold text-sm">Formulir Pengajuan Kredensial Baru</h3>
              <button onClick={() => setIsNewAppModalOpen(false)}>✕</button>
            </div>
            <form onSubmit={handleSubmitNewApp} className="p-5 space-y-3 text-xs">
              <div>
                <label className="font-bold block mb-1">Jenis Pengajuan *</label>
                <select
                  value={appType}
                  onChange={(e) => setAppType(e.target.value as any)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-bold"
                >
                  <option value="Pengajuan Kredensial">Pengajuan Kredensial Pertama</option>
                  <option value="Pengajuan Rekredensial">Pengajuan Rekredensial Berkala</option>
                  <option value="Permohonan Pelatihan">Permohonan Pelatihan / Workshop</option>
                  <option value="Pengajuan Surat">Pengajuan Surat Keputusan</option>
                  <option value="Penambahan Kewenangan Klinis (RKK)">Penambahan Kewenangan Klinis (RKK)</option>
                </select>
              </div>

              <div>
                <label className="font-bold block mb-1">Usulan Rincian Kewenangan Klinis (RKK)</label>
                <input
                  type="text"
                  value={rkkScopeInput}
                  onChange={(e) => setRkkScopeInput(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl"
                  placeholder="Pisahkan dengan koma (contoh: Laparoskopi, Bedah Digestif)"
                />
              </div>

              {/* Dedicated Drag & Drop File Upload Placement */}
              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Tempat Meletakkan File Lampiran (STR, SIP, & Sertifikat Kompetensi) *
                </label>
                <div className="border-2 border-dashed border-slate-300 hover:border-[#008080] bg-slate-50 hover:bg-slate-100/60 transition-all rounded-xl p-4 text-center relative cursor-pointer">
                  <input
                    type="file"
                    accept=".pdf,.png,.jpg,.jpeg,.doc,.docx"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setSelectedFileForApp(e.target.files[0]);
                      }
                    }}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
                  />
                  {selectedFileForApp ? (
                    <div className="flex items-center justify-center space-x-2 text-emerald-800">
                      <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                      <div className="text-left">
                        <span className="font-extrabold text-xs block">{selectedFileForApp.name}</span>
                        <span className="text-[10px] text-slate-500 font-mono">
                          {(selectedFileForApp.size / (1024 * 1024)).toFixed(2)} MB • Berkas Terlampir
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-1">
                      <Upload className="w-6 h-6 text-[#008080] mx-auto" />
                      <p className="text-xs font-bold text-slate-800">
                        Klik atau Tarik & Meletakkan File Lampiran di Sini
                      </p>
                      <p className="text-[10px] text-slate-500">
                        Format yang didukung: PDF, JPG, PNG, atau DOCX (Maksimal 15 MB)
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="font-bold block mb-1">Catatan Tambahan</label>
                <textarea
                  rows={3}
                  value={appNotes}
                  onChange={(e) => setAppNotes(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl"
                  placeholder="Keterangan permohonan..."
                />
              </div>

              <div className="pt-3 border-t flex justify-end space-x-2">
                <button type="button" onClick={() => setIsNewAppModalOpen(false)} className="px-4 py-2 bg-slate-200 font-bold rounded-xl">Batal</button>
                <button type="submit" className="px-5 py-2 bg-[#008080] text-white font-bold rounded-xl shadow-xs">Kirim Pengajuan</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL RINCIAN LEGALITAS MEDIS LENGKAP */}
      {isLegalDetailOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
            {/* Header */}
            <div className="bg-[#0B2D5C] text-white p-5 flex items-center justify-between shrink-0">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-5 h-5 text-amber-400" />
                <div>
                  <h3 className="font-extrabold text-sm text-white">Rincian Status Legalitas Medis & Kewenangan Klinis</h3>
                  <p className="text-[11px] text-slate-300">Dokter Spesialis RST Pematang Siantar Kesdam I/BB</p>
                </div>
              </div>
              <button
                onClick={() => setIsLegalDetailOpen(false)}
                className="text-white/80 hover:text-white p-1 rounded hover:bg-white/10"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            {/* Content Body */}
            <div className="p-6 space-y-5 overflow-y-auto text-xs text-slate-700">
              
              {/* Doctor Header Banner */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                <div>
                  <h4 className="font-extrabold text-slate-900 text-sm">{doctor.name}</h4>
                  <p className="text-slate-600 text-xs">{doctor.specialty} • {doctor.unit}</p>
                  <p className="text-[11px] font-mono text-slate-500 mt-0.5">NRP: {doctor.nrp} • Pangkat: {doctor.pangkat}</p>
                </div>
                <span className="px-3 py-1 bg-emerald-100 text-emerald-800 font-extrabold text-[10px] uppercase rounded-full">
                  Status Legalitas: AKTIFF & VALID
                </span>
              </div>

              {/* Grid 1: STR & SIP */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-2xs space-y-2">
                  <span className="text-[10px] font-bold text-[#008080] uppercase tracking-wider block">
                    1. Surat Tanda Registrasi (STR)
                  </span>
                  <div className="space-y-1">
                    <span className="text-[11px] text-slate-500 block">Nomor Registrasi KKI:</span>
                    <span className="font-mono font-extrabold text-slate-900 text-xs block">{doctor.strNumber}</span>
                  </div>
                  <div className="flex justify-between text-[11px] pt-1 border-t border-slate-100">
                    <span className="text-slate-500">Masa Berlaku:</span>
                    <span className="font-bold text-emerald-700">{doctor.strExpiry}</span>
                  </div>
                  <div className="flex justify-between text-[11px]">
                    <span className="text-slate-500">Status KKI:</span>
                    <span className="font-bold text-slate-800">Terverifikasi Seumur Hidup</span>
                  </div>
                </div>

                <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-2xs space-y-2">
                  <span className="text-[10px] font-bold text-[#008080] uppercase tracking-wider block">
                    2. Surat Izin Praktik (SIP) Dinkes
                  </span>
                  <div className="space-y-1">
                    <span className="text-[11px] text-slate-500 block">Nomor SIP Dinas Kesehatan:</span>
                    <span className="font-mono font-extrabold text-slate-900 text-xs block">{doctor.sipNumber}</span>
                  </div>
                  <div className="flex justify-between text-[11px] pt-1 border-t border-slate-100">
                    <span className="text-slate-500">Masa Berlaku:</span>
                    <span className="font-bold text-emerald-700">{doctor.sipExpiry}</span>
                  </div>
                  <div className="flex justify-between text-[11px]">
                    <span className="text-slate-500">Tempat Praktik:</span>
                    <span className="font-bold text-slate-800">RST Pematang Siantar</span>
                  </div>
                </div>
              </div>

              {/* Grid 2: SPK & RKK Info */}
              <div className="p-4 bg-[#F7F9FC] rounded-xl border border-slate-200 space-y-3">
                <span className="text-[10px] font-bold text-[#0B2D5C] uppercase tracking-wider block">
                  3. Surat Penugasan Klinis (SPK) Karumkit
                </span>
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div>
                    <span className="text-slate-500 block">Nomor SK Karumkit:</span>
                    <span className="font-mono font-bold text-slate-900">SK/082/KOMMED/RST-PS/2026</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Tanggal Penetapan:</span>
                    <span className="font-bold text-slate-900">12 Januari 2026</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Kategori White Paper:</span>
                    <span className="font-bold text-amber-800">{doctor.whitePaperCategory}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Masa Berlaku SPK:</span>
                    <span className="font-bold text-emerald-700">3 Tahun (s/d Jan 2029)</span>
                  </div>
                </div>
              </div>

              {/* Rincian Kewenangan Klinis (RKK) Breakdown List */}
              <div className="space-y-2">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <span className="font-extrabold text-[#0B2D5C] text-xs uppercase tracking-wider">
                    4. Rincian Kewenangan Klinis (RKK) Disetujui ({doctor.clinicalPrivilegesCount} Prosedur)
                  </span>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">
                    Mitra Bestari Approved
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-2">
                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
                    <span className="font-extrabold text-[#008080] text-xs block">
                      A. Prosedur Diagnosis & Penanganan Utama (Mandiri)
                    </span>
                    <ul className="list-disc list-inside text-[11px] text-slate-700 space-y-0.5 pl-1">
                      <li>Asesmen Medis Lengkap & Pengobatan Pasien Rawat Jalan & Inap</li>
                      <li>Penatalaksanaan Kegawatdaruratan Medis Sesuai Spesialisasi</li>
                      <li>Tindakan Operatif Bedah & Prosedur Intervensi Standar</li>
                      <li>Pemberian Resep Obat & Terapi Lanjutan Sesuai Formularum RST</li>
                    </ul>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
                    <span className="font-extrabold text-amber-800 text-xs block">
                      B. Prosedur Khusus / Dengan Supervisi / Kolaborasi
                    </span>
                    <ul className="list-disc list-inside text-[11px] text-slate-700 space-y-0.5 pl-1">
                      <li>Tindakan Sub-Spesialis Kompleks dengan Pendampingan Tim Konsultan</li>
                      <li>Penggunaan Alat Medis Canggih Kategori Khusus</li>
                    </ul>
                  </div>
                </div>
              </div>

            </div>

            {/* Footer */}
            <div className="p-4 bg-slate-100 border-t border-slate-200 flex justify-between items-center shrink-0">
              <button
                type="button"
                onClick={() => window.print()}
                className="px-4 py-2 bg-[#008080] hover:bg-[#005F73] text-white text-xs font-bold rounded-xl shadow-xs flex items-center space-x-1.5"
              >
                <Download className="w-4 h-4" />
                <span>Cetak / Download Rincian SPK & RKK</span>
              </button>
              <button
                type="button"
                onClick={() => setIsLegalDetailOpen(false)}
                className="px-5 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold rounded-xl"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
