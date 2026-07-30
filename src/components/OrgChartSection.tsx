import React, { useState } from 'react';
import { OrganizationMember } from '../types';
import { UserCheck, Award, Shield, FileText, ChevronDown, Info } from 'lucide-react';

interface OrgChartSectionProps {
  members: OrganizationMember[];
  onSelectMember: (member: OrganizationMember) => void;
}

export const OrgChartSection: React.FC<OrgChartSectionProps> = ({ members, onSelectMember }) => {
  const [selectedSub, setSelectedSub] = useState<'semua' | 'Kredensial' | 'Mutu Profesi' | 'Etik & Disiplin'>('semua');

  // Hierarchy
  const ketua = members.find((m) => m.role === 'Ketua Komite Medik');
  const wakil = members.find((m) => m.role === 'Wakil Ketua');
  const sekretaris = members.find((m) => m.role === 'Sekretaris');

  const subKredensial = members.filter((m) => m.subKomite === 'Kredensial');
  const subMutu = members.filter((m) => m.subKomite === 'Mutu Profesi');
  const subEtik = members.filter((m) => m.subKomite === 'Etik & Disiplin');

  return (
    <section id="organisasi" className="py-16 bg-white border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-slate-100 text-[#0B2D5C] text-xs font-bold rounded-full mb-3 border border-slate-200">
            <Award className="w-3.5 h-3.5 text-amber-600" />
            <span>KEPEMIMPINAN KLINIS EXECUTIVES</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B2D5C] tracking-tight">
            Struktur Organisasi Komite Medik
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Struktur kepemimpinan medis Rumah Sakit Tentara Pematang Siantar (Masa Bakti 2024 - 2027)
          </p>
        </div>

        {/* Executive Board Hierarchy Container */}
        <div className="space-y-8">
          
          {/* Level 1: Ketua Komite */}
          {ketua && (
            <div className="flex justify-center">
              <div 
                onClick={() => onSelectMember(ketua)}
                className="w-full max-w-md bg-[#0B2D5C] text-white rounded-xl p-5 shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer border-2 border-[#1C4E80] relative group"
              >
                <div className="absolute top-3 right-3 px-2 py-0.5 bg-amber-500 text-[#0B2D5C] text-[10px] font-extrabold rounded">
                  KETUA KOMITE
                </div>
                
                <div className="flex items-center space-x-4">
                  <img
                    src={ketua.photo}
                    alt={ketua.name}
                    className="w-16 h-16 rounded-lg object-cover border-2 border-white/40 shadow-xs"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <span className="text-xs font-bold text-amber-300 block">{ketua.pangkat}</span>
                    <h3 className="text-sm font-extrabold text-white group-hover:text-amber-200 transition-colors">
                      {ketua.name}
                    </h3>
                    <p className="text-xs text-slate-200">{ketua.specialty}</p>
                    <span className="text-[10px] text-slate-400 block mt-1">NRP: {ketua.nrp}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Connection Line */}
          <div className="flex justify-center">
            <div className="w-0.5 h-6 bg-slate-300"></div>
          </div>

          {/* Level 2: Wakil & Sekretaris */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {wakil && (
              <div
                onClick={() => onSelectMember(wakil)}
                className="bg-slate-50 rounded-xl p-4 border border-slate-300 shadow-xs hover:border-[#0B2D5C] transition-all cursor-pointer group relative"
              >
                <div className="absolute top-3 right-3 px-2 py-0.5 bg-slate-200 text-slate-700 text-[10px] font-bold rounded">
                  WAKIL KETUA
                </div>
                <div className="flex items-center space-x-3">
                  <img
                    src={wakil.photo}
                    alt={wakil.name}
                    className="w-14 h-14 rounded-lg object-cover border border-slate-300"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <span className="text-[11px] font-bold text-[#0F8B8D] block">{wakil.pangkat}</span>
                    <h4 className="text-xs font-bold text-slate-900 group-hover:text-[#0B2D5C]">
                      {wakil.name}
                    </h4>
                    <p className="text-[11px] text-slate-600">{wakil.specialty}</p>
                  </div>
                </div>
              </div>
            )}

            {sekretaris && (
              <div
                onClick={() => onSelectMember(sekretaris)}
                className="bg-slate-50 rounded-xl p-4 border border-slate-300 shadow-xs hover:border-[#0B2D5C] transition-all cursor-pointer group relative"
              >
                <div className="absolute top-3 right-3 px-2 py-0.5 bg-slate-200 text-slate-700 text-[10px] font-bold rounded">
                  SEKRETARIS
                </div>
                <div className="flex items-center space-x-3">
                  <img
                    src={sekretaris.photo}
                    alt={sekretaris.name}
                    className="w-14 h-14 rounded-lg object-cover border border-slate-300"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <span className="text-[11px] font-bold text-[#0F8B8D] block">{sekretaris.pangkat}</span>
                    <h4 className="text-xs font-bold text-slate-900 group-hover:text-[#0B2D5C]">
                      {sekretaris.name}
                    </h4>
                    <p className="text-[11px] text-slate-600">{sekretaris.specialty}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Connection Line to 3 Sub Committees */}
          <div className="flex justify-center">
            <div className="w-0.5 h-6 bg-slate-300"></div>
          </div>

          {/* Level 3: 3 Sub Komite Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Sub Komite 1: Kredensial */}
            <div className="bg-[#F7F9FC] rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
              <div className="pb-3 border-b border-slate-200 flex items-center space-x-2">
                <Shield className="w-5 h-5 text-[#0B2D5C]" />
                <div>
                  <h4 className="text-xs font-extrabold text-[#0B2D5C]">
                    SUB KOMITE KREDENSIAL
                  </h4>
                  <span className="text-[10px] text-slate-500">Verifikasi & Kewenangan Klinis</span>
                </div>
              </div>

              {subKredensial.map((member) => (
                <div
                  key={member.id}
                  onClick={() => onSelectMember(member)}
                  className="bg-white p-3 rounded-lg border border-slate-200 hover:border-[#0F8B8D] transition-all cursor-pointer flex items-center space-x-3 group"
                >
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="w-12 h-12 rounded-lg object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <span className="text-[10px] font-bold text-[#0F8B8D] block">{member.pangkat}</span>
                    <h5 className="text-xs font-bold text-slate-800 group-hover:text-[#0B2D5C]">
                      {member.name}
                    </h5>
                    <span className="text-[10px] text-slate-500 block">{member.role}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Sub Komite 2: Mutu Profesi */}
            <div className="bg-[#F7F9FC] rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
              <div className="pb-3 border-b border-slate-200 flex items-center space-x-2">
                <Award className="w-5 h-5 text-[#0F8B8D]" />
                <div>
                  <h4 className="text-xs font-extrabold text-[#0B2D5C]">
                    SUB KOMITE MUTU PROFESI
                  </h4>
                  <span className="text-[10px] text-slate-500">Audit Klinis & OPPE</span>
                </div>
              </div>

              {subMutu.map((member) => (
                <div
                  key={member.id}
                  onClick={() => onSelectMember(member)}
                  className="bg-white p-3 rounded-lg border border-slate-200 hover:border-[#0F8B8D] transition-all cursor-pointer flex items-center space-x-3 group"
                >
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="w-12 h-12 rounded-lg object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <span className="text-[10px] font-bold text-[#0F8B8D] block">{member.pangkat}</span>
                    <h5 className="text-xs font-bold text-slate-800 group-hover:text-[#0B2D5C]">
                      {member.name}
                    </h5>
                    <span className="text-[10px] text-slate-500 block">{member.role}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Sub Komite 3: Etik & Disiplin */}
            <div className="bg-[#F7F9FC] rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
              <div className="pb-3 border-b border-slate-200 flex items-center space-x-2">
                <FileText className="w-5 h-5 text-emerald-700" />
                <div>
                  <h4 className="text-xs font-extrabold text-[#0B2D5C]">
                    SUB KOMITE ETIK & DISIPLIN
                  </h4>
                  <span className="text-[10px] text-slate-500">Pembinaan & Disiplin Medis</span>
                </div>
              </div>

              {subEtik.map((member) => (
                <div
                  key={member.id}
                  onClick={() => onSelectMember(member)}
                  className="bg-white p-3 rounded-lg border border-slate-200 hover:border-[#0F8B8D] transition-all cursor-pointer flex items-center space-x-3 group"
                >
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="w-12 h-12 rounded-lg object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <span className="text-[10px] font-bold text-[#0F8B8D] block">{member.pangkat}</span>
                    <h5 className="text-xs font-bold text-slate-800 group-hover:text-[#0B2D5C]">
                      {member.name}
                    </h5>
                    <span className="text-[10px] text-slate-500 block">{member.role}</span>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
