import React, { useState } from 'react';
import {
  LayoutDashboard,
  Calendar,
  ShieldCheck,
  RefreshCw,
  Award,
  Activity,
  FileCheck2,
  Users,
  FolderKanban,
  UserCog,
  Settings,
  Bell,
  Plus,
  ArrowLeft,
  Building2,
  CheckSquare,
  Stethoscope,
  ChevronDown,
  User
} from 'lucide-react';
import { UserRole } from '../../types';

interface DashboardLayoutProps {
  activeTab: string;
  onChangeTab: (tabId: string) => void;
  onExitDashboard: () => void;
  onOpenNewCredentialModal: () => void;
  currentRole: UserRole;
  onChangeRole: (role: UserRole) => void;
  pendingApprovalsCount: number;
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  activeTab,
  onChangeTab,
  onExitDashboard,
  onOpenNewCredentialModal,
  currentRole,
  onChangeRole,
  pendingApprovalsCount,
  children
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Role-based navigation filtering
  const getNavigationItems = () => {
    const baseItems = [
      { id: 'dashboard', label: 'Dashboard Utama', icon: LayoutDashboard },
      { id: 'jadwal', label: 'Jadwal Dokter & Tugas', icon: Calendar, badge: 'Aktif' },
    ];

    if (currentRole === 'dokter') {
      return [
        { id: 'dokter-portal', label: 'Portal Dokter Saya', icon: Stethoscope, badge: 'Saya' }
      ];
    }

    if (currentRole === 'ketua') {
      return [
        ...baseItems,
        { id: 'admin-profile', label: 'Profil Saya', icon: User },
        { id: 'persetujuan', label: 'Persetujuan Kredensial', icon: CheckSquare, badge: pendingApprovalsCount > 0 ? `${pendingApprovalsCount}` : undefined },
        { id: 'dokter', label: 'Data Dokter & Kredensial', icon: ShieldCheck },
        { id: 'rekredensial', label: 'Re-Kredensial Tracker', icon: RefreshCw },
        { id: 'kewenangan', label: 'Kewenangan Klinis (RKK)', icon: Award },
        { id: 'mutu', label: 'Mutu Profesi & OPPE', icon: Activity },
        { id: 'audit', label: 'Audit Klinis', icon: FileCheck2 },
        { id: 'dokumen', label: 'Dokumen & SOP Manager', icon: FolderKanban },
        { id: 'pengguna', label: 'Daftar Pengurus Komite', icon: UserCog }
      ];
    }

    // Default: Admin role
    return [
      ...baseItems,
      { id: 'admin-profile', label: 'Profil Saya', icon: User },
      { id: 'format-spk-rkk', label: 'Format SPK & RKK', icon: Award },
      { id: 'dokter', label: 'Data Dokter & Kredensial', icon: ShieldCheck, badge: '12' },
      { id: 'departemen', label: 'Master SMF & Poli', icon: Building2 },
      { id: 'rekredensial', label: 'Re-Kredensial Tracker', icon: RefreshCw },
      { id: 'kewenangan', label: 'Kewenangan Klinis (RKK)', icon: Award },
      { id: 'mutu', label: 'Mutu Profesi & OPPE', icon: Activity },
      { id: 'audit', label: 'Audit Klinis', icon: FileCheck2 },
      { id: 'dokumen', label: 'Dokumen & SOP Manager', icon: FolderKanban },
      { id: 'pengguna', label: 'User Management & Hak Akses', icon: UserCog },
      { id: 'pengaturan', label: 'Pengaturan Sistem', icon: Settings }
    ];
  };

  const navigationItems = getNavigationItems();

  return (
    <div className="min-h-screen bg-[#F7F9FC] flex flex-col font-sans text-slate-800">
      
      {/* Top Navbar for Internal Dashboard */}
      <header className="bg-[#0B2D5C] text-white h-16 border-b border-[#1C4E80] flex items-center justify-between px-4 sm:px-6 sticky top-0 z-40 shadow-xs">
        
        {/* Left Brand & Sidebar Toggle */}
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-[#1C4E80] transition-colors"
            title="Toggle Sidebar"
          >
            <LayoutDashboard className="w-5 h-5" />
          </button>

          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 bg-white rounded-lg p-0.5 flex items-center justify-center border border-white/20 shrink-0">
              <img
                src="/src/assets/images/logo_hesti_wira_sakti_1785328573896.jpg"
                alt="Logo Hesti Wira Sakti"
                className="w-full h-full object-contain"
              />
            </div>
            <span className="px-2 py-0.5 bg-amber-500 text-[#0B2D5C] font-extrabold text-[10px] rounded uppercase">
              INTERNAL
            </span>
            <span className="font-extrabold text-xs sm:text-sm text-white tracking-tight hidden sm:inline">
              Komite Medik RST Pematang Siantar
            </span>
          </div>
        </div>

        {/* Right Role Switcher & Header Controls */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          
          {/* Role Switcher Selector */}
          <div className="flex items-center space-x-1.5 bg-[#1C4E80] px-2.5 py-1 rounded-xl border border-white/10 text-xs">
            <span className="text-[10px] text-slate-300 font-bold uppercase hidden md:inline">Mode Role:</span>
            <select
              value={currentRole}
              onChange={(e) => {
                const newRole = e.target.value as UserRole;
                onChangeRole(newRole);
                if (newRole === 'dokter') onChangeTab('dokter-portal');
                else if (newRole === 'ketua') onChangeTab('persetujuan');
                else onChangeTab('dashboard');
              }}
              className="bg-transparent text-amber-300 font-extrabold text-xs outline-none cursor-pointer"
            >
              <option value="admin" className="bg-[#0B2D5C] text-white font-bold">1. Admin Sistem</option>
              <option value="ketua" className="bg-[#0B2D5C] text-white font-bold">2. Ketua Komite Medik</option>
              <option value="dokter" className="bg-[#0B2D5C] text-white font-bold">3. Dokter / Staf Medis</option>
            </select>
          </div>

          {/* New Credential Button (Only for Ketua/Dokter if needed, hidden for Admin) */}
          {currentRole !== 'admin' && (
            <button
              onClick={onOpenNewCredentialModal}
              className="hidden lg:flex items-center space-x-1.5 px-3 py-1.5 bg-[#0F8B8D] hover:bg-[#0c7274] text-white text-xs font-bold rounded-xl shadow-xs transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Ajukan Kredensial</span>
            </button>
          )}

          {/* Back to Public Portal Button */}
          <button
            onClick={onExitDashboard}
            className="flex items-center space-x-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl border border-slate-600 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Portal Publik</span>
          </button>
        </div>

      </header>

      {/* Main Container */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Sidebar */}
        <aside
          className={`bg-white border-r border-slate-200 w-64 shrink-0 transition-all duration-200 flex flex-col justify-between ${
            sidebarOpen ? 'block' : 'hidden md:block md:w-16'
          }`}
        >
          {/* Navigation links */}
          <div className="p-3 space-y-1">
            <div className={`px-3 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider ${!sidebarOpen && 'hidden md:hidden'}`}>
              Navigasi Hak Akses ({currentRole.toUpperCase()})
            </div>

            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onChangeTab(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-[#0B2D5C] text-white font-extrabold shadow-sm'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-[#0B2D5C]'
                  }`}
                  title={item.label}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-amber-400' : 'text-slate-500'}`} />
                    <span className={`${!sidebarOpen && 'hidden md:hidden'} truncate`}>{item.label}</span>
                  </div>

                  {item.badge && sidebarOpen && (
                    <span
                      className={`px-1.5 py-0.5 rounded-md text-[10px] font-extrabold ${
                        isActive ? 'bg-amber-400 text-[#0B2D5C]' : 'bg-slate-200 text-slate-700'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* User Profile info at bottom of sidebar */}
          <div className="p-3 border-t border-slate-200 bg-slate-50">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-[#0B2D5C] text-amber-400 font-extrabold flex items-center justify-center text-xs shrink-0 border border-amber-400/40">
                {currentRole === 'admin' ? 'AD' : currentRole === 'ketua' ? 'HS' : 'FU'}
              </div>
              <div className={`${!sidebarOpen && 'hidden md:hidden'} truncate`}>
                <span className="text-xs font-bold text-slate-800 block truncate">
                  {currentRole === 'admin' ? 'Administrator Sistem' : currentRole === 'ketua' ? 'Kolonel Ckm dr. Hendra' : 'dr. Faisal Utama, Sp.OT'}
                </span>
                <span className="text-[10px] text-amber-800 font-bold block truncate uppercase">
                  {currentRole === 'admin' ? 'Pengelola Sistem' : currentRole === 'ketua' ? 'Ketua Komite Medik' : 'Dokter Spesialis'}
                </span>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {children}
        </main>

      </div>
    </div>
  );
};
