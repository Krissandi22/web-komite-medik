import React from 'react';
import { Users, Stethoscope, FileCheck2, BookOpenCheck, ArrowUpRight } from 'lucide-react';

interface StatsCardsProps {
  onNavigateSection: (sectionId: string) => void;
  doctorCount?: number;
}

export const StatsCards: React.FC<StatsCardsProps> = ({ onNavigateSection, doctorCount }) => {
  const stats = [
    {
      id: 'stat-1',
      title: 'Jumlah Staf Medis',
      value: doctorCount ? `${doctorCount}` : '125',
      unit: 'Dokter Staf',
      description: 'Dokter Spesialis & Subspesialis Active RKK',
      icon: Users,
      actionSection: 'spesialis'
    },
    {
      id: 'stat-2',
      title: 'Spesialis Fungsional',
      value: '45',
      unit: 'Spesialis',
      description: 'Bedah, Penyakit Dalam, Obgyn, Anestesi, dll',
      icon: Stethoscope,
      actionSection: 'spesialis'
    },
    {
      id: 'stat-3',
      title: 'Audit Klinis Mutu',
      value: '120+',
      unit: 'Siklus Audit',
      description: 'Evaluasi kepatuhan PPK & KARS/STARKES',
      icon: FileCheck2,
      actionSection: 'layanan'
    },
    {
      id: 'stat-4',
      title: 'Dokumen Regulasi',
      value: '85+',
      unit: 'SOP & SPK',
      description: 'Dokumen Resmi Panduan Praktik Kedokteran',
      icon: BookOpenCheck,
      actionSection: 'regulasi'
    }
  ];

  return (
    <section className="relative -mt-10 z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              onClick={() => onNavigateSection(item.actionSection)}
              className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-md hover:shadow-xl hover:border-[#008080] hover:-translate-y-1 transition-all duration-300 cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2.5 rounded-xl bg-teal-50 text-[#008080] group-hover:bg-[#008080] group-hover:text-white transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="w-6 h-6 rounded-full bg-slate-100 text-slate-500 group-hover:bg-[#008080] group-hover:text-white flex items-center justify-center transition-colors">
                    <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
                  </div>
                </div>

                <div className="flex items-baseline space-x-1.5 mb-1">
                  <span className="font-serif-display text-3xl font-extrabold text-[#0B2D5C] group-hover:text-[#008080] transition-colors">
                    {item.value}
                  </span>
                  <span className="text-xs font-bold text-slate-500">
                    {item.unit}
                  </span>
                </div>

                <div className="text-xs font-bold text-slate-800 mb-1">
                  {item.title}
                </div>
              </div>

              <p className="text-[11px] text-slate-500 pt-2 border-t border-slate-100 line-clamp-1">
                {item.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

