import React from 'react';
import { ServiceDetail } from '../types';
import { Shield, RefreshCw, Award, Activity, Users, Scale, ArrowUpRight, Clock, Stethoscope } from 'lucide-react';

interface ServicesSectionProps {
  services: ServiceDetail[];
  onSelectService: (serviceId: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ services, onSelectService }) => {
  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Shield':
        return <Shield className="w-5 h-5 text-[#008080]" />;
      case 'RefreshCw':
        return <RefreshCw className="w-5 h-5 text-teal-600" />;
      case 'Award':
        return <Award className="w-5 h-5 text-amber-600" />;
      case 'Activity':
        return <Activity className="w-5 h-5 text-emerald-600" />;
      case 'Users':
        return <Users className="w-5 h-5 text-indigo-600" />;
      case 'Scale':
        return <Scale className="w-5 h-5 text-red-600" />;
      default:
        return <Shield className="w-5 h-5 text-[#008080]" />;
    }
  };

  return (
    <section id="layanan" className="py-20 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Layout Split: Featured Left Card + Right Service Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Featured Card matching Mockup (4 cols) */}
          <div className="lg:col-span-4 bg-[#0B2D5C] rounded-3xl overflow-hidden shadow-xl text-white flex flex-col justify-between p-8 relative">
            {/* Background Decorative Pattern */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#008080]/20 rounded-full blur-2xl pointer-events-none" />
            
            <div className="space-y-6 relative z-10">
              <div className="inline-flex items-center space-x-2 px-3 py-1 bg-white/10 backdrop-blur-md text-emerald-300 text-xs font-bold rounded-full">
                <Stethoscope className="w-3.5 h-3.5 text-[#00A896]" />
                <span>LAYANAN KOMITE MEDIK</span>
              </div>

              <h2 className="font-serif-display text-3xl sm:text-4xl font-bold leading-tight">
                Medical Services
              </h2>

              <p className="text-xs text-slate-300 leading-relaxed">
                6 Pilar utama tata kelola medis mencakup kredensialing dokter, audit mutu klinis, penetapan kewenangan klinis (RKK), evaluasi kinerja profesi (OPPE), dan penegakan etika staf medis.
              </p>
            </div>

            {/* Doctor Image Frame inside Card */}
            <div className="my-6 relative rounded-2xl overflow-hidden border border-white/20 h-44 shadow-lg group">
              <img
                src="/src/assets/images/committee_meeting_1785309357072.jpg"
                alt="Dokter Layanan Medis"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent p-3 flex items-end">
                <span className="text-[11px] font-bold text-amber-300">
                  Sub-Komite Kredensial, Mutu & Etika
                </span>
              </div>
            </div>

            {/* Teal Pill CTA Button */}
            <div className="relative z-10 pt-2">
              <button
                onClick={() => onSelectService('srv-1')}
                className="group w-full flex items-center justify-between pl-5 pr-1.5 py-2.5 bg-[#008080] hover:bg-[#00A896] text-white text-xs font-bold rounded-full shadow-md transition-all duration-200"
              >
                <span>Jelajahi Semua Prosedur</span>
                <div className="w-7 h-7 rounded-full bg-white text-[#008080] flex items-center justify-center transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
                </div>
              </button>
            </div>
          </div>

          {/* Right Service Cards Grid (8 cols) */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-5">
            {services.map((service) => (
              <div
                key={service.id}
                onClick={() => onSelectService(service.id)}
                className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:shadow-lg hover:border-[#008080] transition-all duration-200 cursor-pointer flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:bg-teal-50 transition-colors">
                      {getServiceIcon(service.icon)}
                    </div>
                    <span className="text-[10px] font-extrabold text-[#008080] bg-teal-50 px-2.5 py-1 rounded-full border border-teal-100">
                      {service.subKomite}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-serif-display text-base font-bold text-[#0B2D5C] group-hover:text-[#008080] transition-colors">
                      {service.title}
                    </h3>
                    <p className="mt-1.5 text-xs text-slate-600 leading-relaxed line-clamp-2">
                      {service.shortDesc}
                    </p>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-1 text-slate-400 text-[11px]">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{service.processingTimeDays} Hari Kerja</span>
                  </div>

                  <div className="w-7 h-7 rounded-full bg-slate-100 text-slate-600 group-hover:bg-[#008080] group-hover:text-white flex items-center justify-center transition-all">
                    <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};

