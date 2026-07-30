import React, { useState } from 'react';
import { CalendarEvent } from '../types';
import { Calendar as CalendarIcon, Clock, MapPin, User, ChevronRight, Tag } from 'lucide-react';

interface CalendarSectionProps {
  events: CalendarEvent[];
}

export const CalendarSection: React.FC<CalendarSectionProps> = ({ events }) => {
  const [filterCategory, setFilterCategory] = useState<string>('Semua');

  const categories = ['Semua', 'Audit Klinis', 'Kredensial', 'Workshop', 'Rapat Komite', 'Peer Review'];

  const filteredEvents = events.filter(
    (ev) => filterCategory === 'Semua' || ev.category === filterCategory
  );

  return (
    <section className="py-16 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-blue-100 text-[#0B2D5C] text-xs font-bold rounded-full mb-3">
            <CalendarIcon className="w-3.5 h-3.5 text-[#0F8B8D]" />
            <span>AGENDA BERSAMA & SYNC JADWAL</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B2D5C] tracking-tight">
            Kalender Kegiatan Komite Medik
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Jadwal Rapat Pleno, Sesi Kredensial, Audit Klinis, dan Workshop Kompetensi Staf Medis
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-colors ${
                filterCategory === cat
                  ? 'bg-[#0B2D5C] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Modern Timeline Container */}
        <div className="max-w-4xl mx-auto space-y-4">
          {filteredEvents.map((item) => (
            <div
              key={item.id}
              className="bg-[#F7F9FC] rounded-xl border border-slate-200 p-5 hover:border-[#0B2D5C] transition-all duration-200 flex flex-col md:flex-row md:items-center justify-between gap-4 group"
            >
              {/* Left Date Badge */}
              <div className="flex items-center space-x-4 md:w-48 shrink-0">
                <div className="w-14 h-14 bg-[#0B2D5C] text-white rounded-lg flex flex-col items-center justify-center font-bold text-center p-1 shadow-xs">
                  <span className="text-[10px] text-amber-400 uppercase tracking-tight">AGU</span>
                  <span className="text-lg leading-none">{item.date.split('-')[2]}</span>
                </div>
                <div>
                  <span className="inline-block px-2 py-0.5 bg-blue-100 text-[#0B2D5C] text-[10px] font-bold rounded uppercase">
                    {item.category}
                  </span>
                  <span className="text-[11px] text-slate-500 font-semibold block mt-1">
                    {item.date}
                  </span>
                </div>
              </div>

              {/* Center Info */}
              <div className="flex-1 space-y-1">
                <h3 className="text-sm font-bold text-[#0B2D5C] group-hover:text-[#0F8B8D] transition-colors">
                  {item.title}
                </h3>

                <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-600 font-medium pt-1">
                  <span className="flex items-center space-x-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{item.time}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{item.location}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <User className="w-3.5 h-3.5 text-slate-400" />
                    <span>{item.leadPerson}</span>
                  </span>
                </div>
              </div>

              {/* Right Status */}
              <div className="shrink-0 flex items-center justify-between md:justify-end">
                <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-[11px] font-bold rounded-full border border-emerald-200">
                  {item.status}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
