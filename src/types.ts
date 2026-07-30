export type SubKomiteType = 'Kredensial' | 'Mutu Profesi' | 'Etik & Disiplin' | 'Kepemimpinan';

export type CredentialStatus = 'Aktif' | 'Menunggu Re-kredensial' | 'Proses Review' | 'SIP Expired' | 'STR Expired';

export type UserRole = 'admin' | 'ketua' | 'dokter';

export interface UserAccount {
  id: string;
  username: string;
  name: string;
  email: string;
  role: UserRole;
  doctorId?: string;
  nrp?: string;
  specialty?: string;
  unit?: string;
  status: 'Aktif' | 'Nonaktif';
  lastLogin?: string;
}

export type ScheduleTaskType =
  | 'Poli Rawat Jalan'
  | 'UGD'
  | 'Visite Rawat Inap'
  | 'Konsultasi Dokter'
  | 'Operasi'
  | 'On Call'
  | 'Medical Check Up'
  | 'Jaga Malam'
  | 'Rapat Komite Medik'
  | 'Seminar/Pelatihan';

export type ScheduleStatus = 'Aktif' | 'Menunggu' | 'On Call' | 'Operasi' | 'Libur' | 'Selesai';

export interface DoctorSchedule {
  id: string;
  doctorId: string;
  doctorName: string;
  specialty: string;
  smf: string; // e.g., SMF Bedah, SMF Penyakit Dalam, SMF Anak, UGD
  day: 'Senin' | 'Selasa' | 'Rabu' | 'Kamis' | 'Jumat' | 'Sabtu' | 'Minggu';
  date: string; // YYYY-MM-DD
  shift: 'Pagi' | 'Siang' | 'Sore' | 'Malam' | 'On Call' | '24 Jam';
  startTime: string; // e.g. "08.00"
  endTime: string; // e.g. "14.00"
  location: string; // e.g. "Poli Penyakit Dalam", "UGD 24 Jam", "Kamar Operasi 1", "ICU", "Ruang Rapat"
  taskType: ScheduleTaskType;
  status: ScheduleStatus;
  notes?: string;
}

export interface ScheduleChangeLog {
  id: string;
  scheduleId?: string;
  timestamp: string;
  adminName: string;
  doctorName: string;
  action: string; // e.g. "Mengubah jadwal dr. Andi"
  oldValue: string;
  newValue: string;
}

export interface Doctor {
  id: string;
  nrp: string; // NRP/NIP Militer or ASN/TNI
  name: string;
  pangkat: string; // e.g., Kolonel Ckm, Letkol Ckm, Mayor Ckm, Kapten Ckm, Penata Tk.I, etc.
  jabatan: string; // e.g., Dokter Spesialis Bedah, Kepala SMF Bedah
  specialty: string;
  subkomiteRole?: string;
  sipNumber: string;
  sipExpiry: string;
  strNumber: string;
  strExpiry: string;
  status: CredentialStatus;
  kredensialStatus?: CredentialStatus;
  whitePaperCategory: string; // Category I, II, III
  photo: string;
  photoUrl?: string;
  clinicalPrivilegesCount: number; // Count of approved clinical privileges
  lastCredentialDate: string;
  nextCredentialDate: string;
  phone: string;
  email: string;
  unit: string; // e.g., SMF Bedah, SMF Penyakit Dalam, SMF Anak, etc.
  smf?: string; // Optional alias for unit
}

export interface DocumentItem {
  id: string;
  title: string;
  documentNumber: string;
  category: 'Kredensial' | 'Mutu' | 'Etik' | 'Administrasi' | 'PPK' | 'SK' | 'SOP' | 'Pedoman' | 'Surat' | 'Formulir';
  year: number;
  datePublished: string;
  fileSize: string;
  fileType: 'PDF' | 'DOCX';
  downloadCount: number;
  summary: string;
  tags: string[];
  approvedBy: string;
}

export interface OrganizationMember {
  id: string;
  name: string;
  pangkat: string;
  nrp: string;
  role: 'Ketua Komite Medik' | 'Wakil Ketua' | 'Sekretaris' | 'Ketua Sub Komite' | 'Anggota Sub Komite';
  subKomite?: SubKomiteType;
  specialty: string;
  photo: string;
  bio: string;
  period: string;
}

export interface ServiceDetail {
  id: string;
  title: string;
  code: string;
  icon: string;
  shortDesc: string;
  fullDesc: string;
  subKomite: SubKomiteType;
  steps: {
    stepNumber: number;
    title: string;
    description: string;
  }[];
  requirements: string[];
  processingTimeDays: number;
  outputDocument: string;
}

export interface NewsItem {
  id: string;
  title: string;
  category: 'Pengumuman' | 'Kegiatan' | 'Pelatihan' | 'Workshop';
  date: string;
  author: string;
  summary: string;
  content: string[];
  imageUrl: string;
  important?: boolean;
}

export interface CalendarEvent {
  id: string;
  title: string;
  category: 'Audit Klinis' | 'Kredensial' | 'Workshop' | 'Rapat Komite' | 'Peer Review';
  date: string;
  time: string;
  location: string;
  leadPerson: string;
  participants: string;
  status: 'Mendatang' | 'Berlangsung' | 'Selesai';
}

export interface AuditKlinisRecord {
  id: string;
  title: string;
  department: string;
  leadDoctor: string;
  auditPeriod: string;
  complianceRate: number; // percentage e.g. 94.5%
  targetRate: number; // e.g. 90%
  status: 'Dalam Sesi' | 'Rekomendasi Diterbitkan' | 'Selesai' | 'Review Ulang';
  keyFindings: string[];
  recommendations: string;
  dateReported: string;
}

export interface SubmittedDocument {
  name: string;
  type: 'STR' | 'SIP' | 'Sertifikat' | 'CV' | 'Ijazah' | 'Lainnya';
  fileSize: string;
  uploadDate: string;
  url?: string;
}

export interface KredensialApplication {
  id: string;
  doctorId?: string;
  doctorName: string;
  doctorNrp: string;
  specialty: string;
  unit?: string;
  type: 'Pengajuan Kredensial' | 'Pengajuan Rekredensial' | 'Permohonan Pelatihan' | 'Pengajuan Surat' | 'Penambahan Kewenangan Klinis (RKK)';
  applicationDate: string;
  status: 'Menunggu' | 'Diproses' | 'Disetujui' | 'Ditolak' | 'Revisi';
  reviewerDoctor?: string;
  rkkScope: string[];
  notes?: string;
  catatanKetua?: string;
  submittedDocuments?: SubmittedDocument[];
  updatedAt?: string;
}

