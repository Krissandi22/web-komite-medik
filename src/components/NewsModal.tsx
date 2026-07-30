import React from 'react';
import { NewsItem } from '../types';
import { X, Calendar, User, Newspaper } from 'lucide-react';

interface NewsModalProps {
  news: NewsItem | null;
  onClose: () => void;
}

export const NewsModal: React.FC<NewsModalProps> = ({ news, onClose }) => {
  if (!news) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-2xs flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full overflow-hidden border border-slate-200">
        
        {/* Header Image */}
        <div className="relative aspect-video max-h-64 bg-slate-900 overflow-hidden">
          <img
            src={news.imageUrl}
            alt={news.title}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-black/60 text-white p-1.5 rounded-full hover:bg-black"
          >
            <X className="w-5 h-5" />
          </button>
          <span className="absolute bottom-4 left-4 px-3 py-1 bg-[#0B2D5C] text-white text-xs font-bold rounded">
            {news.category}
          </span>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto text-xs text-slate-700">
          <div className="flex items-center space-x-4 text-[11px] text-slate-500 font-medium">
            <span className="flex items-center space-x-1">
              <Calendar className="w-3.5 h-3.5" />
              <span>{news.date}</span>
            </span>
            <span>•</span>
            <span className="flex items-center space-x-1">
              <User className="w-3.5 h-3.5" />
              <span>{news.author}</span>
            </span>
          </div>

          <h2 className="text-lg font-extrabold text-[#0B2D5C] leading-snug">
            {news.title}
          </h2>

          <div className="p-3 bg-slate-50 rounded-lg border-l-4 border-[#0B2D5C] text-slate-700 italic">
            "{news.summary}"
          </div>

          <div className="space-y-3 text-slate-700 leading-relaxed text-xs">
            {news.content.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-100 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#0B2D5C] text-white text-xs font-bold rounded-md"
          >
            Tutup Berita
          </button>
        </div>

      </div>
    </div>
  );
};
