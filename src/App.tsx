import React, { useState } from 'react';
import {
  INITIAL_DOCTORS,
  INITIAL_DOCUMENTS,
  INITIAL_ORG_MEMBERS,
  INITIAL_SERVICES,
  INITIAL_NEWS,
  INITIAL_CALENDAR,
  INITIAL_AUDIT_RECORDS,
  INITIAL_KREDENSIAL_APPLICATIONS,
  INITIAL_SCHEDULES,
  INITIAL_SCHEDULE_CHANGE_LOGS,
  INITIAL_USERS
} from './data/initialData';
import {
  Doctor,
  DocumentItem,
  OrganizationMember,
  ServiceDetail,
  NewsItem,
  CalendarEvent,
  AuditKlinisRecord,
  KredensialApplication,
  DoctorSchedule,
  ScheduleChangeLog,
  UserAccount,
  UserRole
} from './types';

// Public Components
import { HeaderNavbar } from './components/HeaderNavbar';
import { HeroSection } from './components/HeroSection';
import { StatsCards } from './components/StatsCards';
import { AboutSection } from './components/AboutSection';
import { DoctorSchedulePublicSection } from './components/DoctorSchedulePublicSection';
import { OrgChartSection } from './components/OrgChartSection';
import { ServicesSection } from './components/ServicesSection';
import { SpecialtiesSection } from './components/SpecialtiesSection';
import { RegulationsSection } from './components/RegulationsSection';
import { NewsSection } from './components/NewsSection';
import { FAQSection } from './components/FAQSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { CalendarSection } from './components/CalendarSection';
import { FooterSection } from './components/FooterSection';

// Public Modals
import { GlobalSearchModal } from './components/GlobalSearchModal';
import { DoctorDetailModal } from './components/DoctorDetailModal';
import { DocumentModal } from './components/DocumentModal';
import { ServiceDetailModal } from './components/ServiceDetailModal';
import { NewsModal } from './components/NewsModal';
import { LoginModal } from './components/LoginModal';

// Dashboard Components
import { DashboardLayout } from './components/dashboard/DashboardLayout';
import { DashboardOverview } from './components/dashboard/DashboardOverview';
import { DoctorCredentialsManager } from './components/dashboard/DoctorCredentialsManager';
import { ReCredentialingTracker } from './components/dashboard/ReCredentialingTracker';
import { ClinicalPrivilegesManager } from './components/dashboard/ClinicalPrivilegesManager';
import { ClinicalAuditManager } from './components/dashboard/ClinicalAuditManager';
import { PeerReviewManager } from './components/dashboard/PeerReviewManager';
import { DocumentManager } from './components/dashboard/DocumentManager';
import { UserManager } from './components/dashboard/UserManager';
import { SettingsView } from './components/dashboard/SettingsView';
import { NewCredentialModal } from './components/dashboard/NewCredentialModal';

// New Features
import { DoctorScheduleManager } from './components/dashboard/DoctorScheduleManager';
import { DepartmentManager } from './components/dashboard/DepartmentManager';
import { ApprovalManager } from './components/dashboard/ApprovalManager';
import { DoctorPortalView } from './components/dashboard/DoctorPortalView';
import { AdminProfileView } from './components/dashboard/AdminProfileView';
import { SpkRkkTemplateEditor } from './components/dashboard/SpkRkkTemplateEditor';

export default function App() {
  // Mode View: 'public' or 'dashboard'
  const [viewMode, setViewMode] = useState<'public' | 'dashboard'>('public');

  // Active section in public portal
  const [activeSection, setActiveSection] = useState('beranda');

  // Active tab in internal dashboard
  const [dashboardTab, setDashboardTab] = useState('dashboard');

  // Role State (admin, ketua, dokter)
  const [currentRole, setCurrentRole] = useState<UserRole>('admin');

  // Application State Data
  const [doctors, setDoctors] = useState<Doctor[]>(INITIAL_DOCTORS);
  const [documents, setDocuments] = useState<DocumentItem[]>(INITIAL_DOCUMENTS);
  const [orgMembers] = useState<OrganizationMember[]>(INITIAL_ORG_MEMBERS);
  const [services] = useState<ServiceDetail[]>(INITIAL_SERVICES);
  const [newsList] = useState<NewsItem[]>(INITIAL_NEWS);
  const [calendarEvents] = useState<CalendarEvent[]>(INITIAL_CALENDAR);
  const [audits, setAudits] = useState<AuditKlinisRecord[]>(INITIAL_AUDIT_RECORDS);
  const [applications, setApplications] = useState<KredensialApplication[]>(INITIAL_KREDENSIAL_APPLICATIONS);

  // New Feature States: Schedules, Change Logs, Users
  const [schedules, setSchedules] = useState<DoctorSchedule[]>(INITIAL_SCHEDULES);
  const [changeLogs, setChangeLogs] = useState<ScheduleChangeLog[]>(INITIAL_SCHEDULE_CHANGE_LOGS);
  const [users, setUsers] = useState<UserAccount[]>(INITIAL_USERS);

  // Selected Modal Items
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [selectedDocument, setSelectedDocument] = useState<DocumentItem | null>(null);
  const [selectedService, setSelectedService] = useState<ServiceDetail | null>(null);
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);

  // Modal Triggers
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNewCredentialOpen, setIsNewCredentialOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  // Current Logged-in Doctor for Doctor View
  const currentDoctor = doctors[5] || doctors[0]; // dr. Faisal Utama, Sp.OT

  // Smooth Section Navigation
  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    if (viewMode === 'dashboard') {
      setViewMode('public');
    }

    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 100);
  };

  // Service Selection Trigger
  const handleSelectService = (serviceId: string) => {
    const srv = services.find((s) => s.id === serviceId);
    if (srv) {
      setSelectedService(srv);
    }
  };

  // Doctor Status Update Handler
  const handleUpdateDoctorStatus = (id: string, newStatus: Doctor['status']) => {
    setDoctors((prev) =>
      prev.map((d) => (d.id === id ? { ...d, status: newStatus } : d))
    );
  };

  // Doctor Profile Update Handler
  const handleUpdateDoctorProfile = (updatedDoctor: Doctor) => {
    setDoctors((prev) =>
      prev.map((d) => (d.id === updatedDoctor.id ? updatedDoctor : d))
    );
  };

  // Add New Audit Handler
  const handleAddAudit = (newAudit: AuditKlinisRecord) => {
    setAudits((prev) => [newAudit, ...prev]);
  };

  // Add New Document Handler
  const handleAddDocument = (newDoc: DocumentItem) => {
    setDocuments((prev) => [newDoc, ...prev]);
  };

  // Submit New Credential Application
  const handleSubmitApplication = (app: KredensialApplication) => {
    setApplications((prev) => [app, ...prev]);
  };

  // Approve / Reject / Revisi Application Handler for Ketua Komite
  const handleUpdateApplicationStatus = (
    id: string,
    status: KredensialApplication['status'],
    catatan?: string
  ) => {
    setApplications((prev) =>
      prev.map((a) =>
        a.id === id
          ? {
              ...a,
              status,
              catatanKetua: catatan || a.catatanKetua,
              updatedAt: new Date().toISOString().slice(0, 10)
            }
          : a
      )
    );
  };

  // --- Doctor Schedule CRUD Handlers ---
  const handleAddSchedule = (newSch: Omit<DoctorSchedule, 'id'>) => {
    const created: DoctorSchedule = {
      ...newSch,
      id: `sch-${Date.now()}`
    };
    setSchedules((prev) => [created, ...prev]);

    // Record audit log
    const newLog: ScheduleChangeLog = {
      id: `log-${Date.now()}`,
      scheduleId: created.id,
      doctorName: created.doctorName,
      action: 'Tambah Jadwal',
      oldValue: '-',
      newValue: `${created.day}, ${created.date} (${created.startTime}-${created.endTime}) - ${created.location}`,
      adminName: 'Admin Sistem (Log)',
      timestamp: new Date().toLocaleString('id-ID')
    };
    setChangeLogs((prev) => [newLog, ...prev]);
  };

  const handleUpdateSchedule = (updatedSch: DoctorSchedule) => {
    const old = schedules.find((s) => s.id === updatedSch.id);
    setSchedules((prev) =>
      prev.map((s) => (s.id === updatedSch.id ? updatedSch : s))
    );

    if (old) {
      const newLog: ScheduleChangeLog = {
        id: `log-${Date.now()}`,
        scheduleId: updatedSch.id,
        doctorName: updatedSch.doctorName,
        action: 'Ubah Jadwal',
        oldValue: `${old.day}, ${old.startTime}-${old.endTime} (${old.location})`,
        newValue: `${updatedSch.day}, ${updatedSch.startTime}-${updatedSch.endTime} (${updatedSch.location})`,
        adminName: 'Admin Sistem (Log)',
        timestamp: new Date().toLocaleString('id-ID')
      };
      setChangeLogs((prev) => [newLog, ...prev]);
    }
  };

  const handleDeleteSchedule = (id: string) => {
    const old = schedules.find((s) => s.id === id);
    setSchedules((prev) => prev.filter((s) => s.id !== id));

    if (old) {
      const newLog: ScheduleChangeLog = {
        id: `log-${Date.now()}`,
        scheduleId: id,
        doctorName: old.doctorName,
        action: 'Hapus Jadwal',
        oldValue: `${old.day}, ${old.date} (${old.location})`,
        newValue: 'Dihapus',
        adminName: 'Admin Sistem (Log)',
        timestamp: new Date().toLocaleString('id-ID')
      };
      setChangeLogs((prev) => [newLog, ...prev]);
    }
  };

  // --- User Management CRUD Handlers ---
  const handleAddUser = (user: Omit<UserAccount, 'id'>) => {
    const newUser: UserAccount = {
      ...user,
      id: `usr-${Date.now()}`
    };
    setUsers((prev) => [newUser, ...prev]);
  };

  const handleUpdateUser = (updatedUser: UserAccount) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === updatedUser.id ? updatedUser : u))
    );
  };

  const handleDeleteUser = (id: string) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  const handleResetPassword = (id: string) => {
    alert(`Password untuk pengguna ID ${id} berhasil di-reset menjadi default: RST123456!`);
  };

  const pendingApprovalsCount = applications.filter(
    (a) => a.status === 'Menunggu' || a.status === 'Diproses'
  ).length;

  return (
    <div className="min-h-screen bg-[#F7F9FC] text-slate-800 font-sans selection:bg-[#0B2D5C] selection:text-white">
      
      {/* 1. PUBLIC PORTAL VIEW */}
      {viewMode === 'public' && (
        <div className="flex flex-col min-h-screen">
          
          {/* Header Navigation */}
          <HeaderNavbar
            onOpenSearch={() => setIsSearchOpen(true)}
            onOpenDashboard={() => setViewMode('dashboard')}
            onOpenLogin={() => setIsLoginOpen(true)}
            activeSection={activeSection}
            onNavigateSection={scrollToSection}
          />

          {/* Main Public Body Sections */}
          <main className="flex-1">
            {/* Section 2: Hero */}
            <HeroSection
              onNavigateSection={scrollToSection}
              onOpenDashboard={() => setViewMode('dashboard')}
            />

            {/* Section 3: Statistik (4 Cards Horizontal) */}
            <StatsCards onNavigateSection={scrollToSection} doctorCount={doctors.length} />

            {/* Section 4: Tentang Komite Medik */}
            <AboutSection onSelectService={handleSelectService} />

            {/* Section 4B: Jadwal Dokter Public Portal */}
            <DoctorSchedulePublicSection
              schedules={schedules}
              doctors={doctors}
              onSelectDoctor={(doc) => setSelectedDoctor(doc)}
            />

            {/* Section 5: Struktur Organisasi */}
            <OrgChartSection
              members={orgMembers}
              onSelectMember={(member) => {
                const doc = doctors.find((d) => d.name.includes(member.name.split(',')[0]));
                if (doc) setSelectedDoctor(doc);
              }}
            />

            {/* Section 6: Layanan Komite Medik */}
            <ServicesSection
              services={services}
              onSelectService={handleSelectService}
            />

            {/* Section 7: Spesialisasi SMF Dokter */}
            <SpecialtiesSection
              doctors={doctors}
              onSelectDoctor={(doc) => setSelectedDoctor(doc)}
            />

            {/* Section 8: Berita & Pengumuman */}
            <NewsSection
              newsList={newsList}
              onSelectNews={(news) => setSelectedNews(news)}
            />

            {/* Section 10: FAQ Tanya Jawab */}
            <FAQSection />

            {/* Section 11: Testimoni & Apresiasi */}
            <TestimonialsSection />

            {/* Section 12: Kalender Kegiatan */}
            <CalendarSection events={calendarEvents} />
          </main>

          {/* Section 10: Footer */}
          <FooterSection
            onNavigateSection={scrollToSection}
            onOpenDashboard={() => setViewMode('dashboard')}
          />
        </div>
      )}

      {/* 2. INTERNAL DASHBOARD VIEW */}
      {viewMode === 'dashboard' && (
        <DashboardLayout
          activeTab={dashboardTab}
          onChangeTab={setDashboardTab}
          onExitDashboard={() => setViewMode('public')}
          onOpenNewCredentialModal={() => setIsNewCredentialOpen(true)}
          currentRole={currentRole}
          onChangeRole={setCurrentRole}
          pendingApprovalsCount={pendingApprovalsCount}
        >
          {/* Dokter Personal View */}
          {dashboardTab === 'dokter-portal' && (
            <DoctorPortalView
              doctor={currentDoctor}
              applications={applications}
              schedules={schedules}
              news={newsList}
              events={calendarEvents}
              documents={documents}
              onSubmitApplication={handleSubmitApplication}
              onUpdateDoctorProfile={handleUpdateDoctorProfile}
            />
          )}

          {/* Overview Dashboard */}
          {dashboardTab === 'dashboard' && (
            <DashboardOverview
              doctors={doctors}
              applications={applications}
              audits={audits}
              onNavigateTab={setDashboardTab}
              onOpenNewCredentialModal={() => setIsNewCredentialOpen(true)}
              onSelectDoctor={(doc) => setSelectedDoctor(doc)}
            />
          )}

          {/* Jadwal Dokter & Tugas */}
          {dashboardTab === 'jadwal' && (
            <DoctorScheduleManager
              role={currentRole}
              schedules={schedules}
              doctors={doctors}
              changeLogs={changeLogs}
              onAddSchedule={handleAddSchedule}
              onUpdateSchedule={handleUpdateSchedule}
              onDeleteSchedule={handleDeleteSchedule}
              currentDoctorId={currentDoctor.id}
            />
          )}

          {/* Persetujuan & Decisions for Ketua Komite */}
          {dashboardTab === 'persetujuan' && (
            <ApprovalManager
              applications={applications}
              onUpdateApplicationStatus={handleUpdateApplicationStatus}
            />
          )}

          {/* Data Dokter & Credentials */}
          {dashboardTab === 'dokter' && (
            <DoctorCredentialsManager
              doctors={doctors}
              onSelectDoctor={(doc) => setSelectedDoctor(doc)}
              onUpdateDoctorStatus={handleUpdateDoctorStatus}
            />
          )}

          {/* Master Departemen & SMF */}
          {dashboardTab === 'departemen' && (
            <DepartmentManager />
          )}

          {/* Re-Credentialing Tracker */}
          {dashboardTab === 'rekredensial' && (
            <ReCredentialingTracker
              applications={applications}
              onApproveApplication={(id) => handleUpdateApplicationStatus(id, 'Disetujui')}
            />
          )}

          {/* Kewenangan Klinis RKK */}
          {dashboardTab === 'kewenangan' && (
            <ClinicalPrivilegesManager doctors={doctors} />
          )}

          {/* Mutu Profesi OPPE */}
          {dashboardTab === 'mutu' && (
            <PeerReviewManager />
          )}

          {/* Audit Klinis */}
          {dashboardTab === 'audit' && (
            <ClinicalAuditManager audits={audits} onAddAudit={handleAddAudit} />
          )}

          {/* Peer Review */}
          {dashboardTab === 'peer-review' && (
            <PeerReviewManager />
          )}

          {/* Admin / Ketua Profile View */}
          {dashboardTab === 'admin-profile' && (
            <AdminProfileView role={currentRole} />
          )}

          {/* Edit Format SPK & RKK */}
          {dashboardTab === 'format-spk-rkk' && (
            <SpkRkkTemplateEditor />
          )}

          {/* Dokumen & SOP Manager */}
          {dashboardTab === 'dokumen' && (
            <DocumentManager
              documents={documents}
              onAddDocument={handleAddDocument}
              role={currentRole}
            />
          )}

          {/* User Management */}
          {dashboardTab === 'pengguna' && (
            <UserManager
              users={users}
              onAddUser={handleAddUser}
              onUpdateUser={handleUpdateUser}
              onDeleteUser={handleDeleteUser}
              onResetPassword={handleResetPassword}
              role={currentRole}
            />
          )}

          {/* Settings */}
          {dashboardTab === 'pengaturan' && (
            <SettingsView />
          )}
        </DashboardLayout>
      )}

      {/* GLOBAL MODALS */}
      <GlobalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        doctors={doctors}
        news={newsList}
        services={services}
        onSelectDoctor={(doc) => setSelectedDoctor(doc)}
        onSelectNews={(news) => setSelectedNews(news)}
        onSelectService={handleSelectService}
      />

      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLoginSuccess={(role) => {
          setCurrentRole(role);
          setViewMode('dashboard');
          if (role === 'dokter') {
            setDashboardTab('dokter-portal');
          } else if (role === 'ketua') {
            setDashboardTab('persetujuan');
          } else {
            setDashboardTab('dashboard');
          }
          setIsLoginOpen(false);
        }}
      />

      <DoctorDetailModal
        doctor={selectedDoctor}
        onClose={() => setSelectedDoctor(null)}
      />

      <DocumentModal
        document={selectedDocument}
        onClose={() => setSelectedDocument(null)}
      />

      <ServiceDetailModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
        onOpenDashboard={() => setViewMode('dashboard')}
      />

      <NewsModal
        news={selectedNews}
        onClose={() => setSelectedNews(null)}
      />

      <NewCredentialModal
        isOpen={isNewCredentialOpen}
        onClose={() => setIsNewCredentialOpen(false)}
        doctors={doctors}
        onSubmitApplication={handleSubmitApplication}
      />

    </div>
  );
}
