import React from 'react';
import { NewsItem } from '../types';
import { Newspaper, Calendar, ArrowRight, User } from 'lucide-react';

interface NewsSectionProps {
  newsList: NewsItem[];
  onSelectNews: (news: NewsItem) => void;
}

export const NewsSection: React.FC<NewsSectionProps> = ({ newsList, onSelectNews }) => {
  return (
    <section id="berita" className="py-16 bg-[#F7F9FC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1 bg-teal-50 text-[#008080] text-xs font-bold rounded-full">
              <Newspaper className="w-3.5 h-3.5 text-[#008080]" />
              <span className="uppercase tracking-wider">INFORMASI & PENGUMUMAN RESMI</span>
            </div>
            <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-[#0B2D5C] tracking-tight">
              Berita & Pengumuman Komite Medik
            </h2>
          </div>
        </div>

        {/* 3 Large News Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {newsList.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectNews(item)}
              className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between group"
            >
              <div>
                {/* Thumbnail 16:9 */}
                <div className="relative aspect-video overflow-hidden bg-slate-900">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute top-3 left-3 px-2.5 py-1 bg-[#0B2D5C]/90 text-white text-[10px] font-extrabold uppercase rounded border border-white/20">
                    {item.category}
                  </span>
                </div>

                {/* Content */}
                <div className="p-5 space-y-3">
                  <div className="flex items-center space-x-3 text-[11px] text-slate-500 font-medium">
                    <span className="flex items-center space-x-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span>{item.date}</span>
                    </span>
                    <span>•</span>
                    <span className="flex items-center space-x-1">
                      <User className="w-3.5 h-3.5 text-slate-400" />
                      <span>{item.author}</span>
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-[#0B2D5C] group-hover:text-[#0F8B8D] transition-colors leading-snug line-clamp-2">
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {item.summary}
                  </p>
                </div>
              </div>

              {/* Card Footer */}
              <div className="p-5 pt-0">
                <span className="text-xs font-bold text-[#0B2D5C] group-hover:text-[#0F8B8D] flex items-center space-x-1">
                  <span>Baca Selengkapnya</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
