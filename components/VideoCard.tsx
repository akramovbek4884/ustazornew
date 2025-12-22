'use client';

import { Video } from '@/types';

interface VideoCardProps {
  video: Video;
  onClick: () => void;
}

export default function VideoCard({ video, onClick }: VideoCardProps) {
  return (
    <div 
      className="card overflow-hidden cursor-pointer group"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
      aria-label={`Video: ${video.title} - ${video.instructor} tomonidan`}
    >
      {/* Thumbnail Container - 16:9 aspect ratio */}
      <div className="relative aspect-video overflow-hidden bg-gray-100">
        <video 
          src={video.src} 
          muted 
          loop
          playsInline
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onMouseEnter={(e) => e.currentTarget.play()}
          onMouseLeave={(e) => {
            e.currentTarget.pause();
            e.currentTarget.currentTime = 0;
          }}
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Play Button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-14 h-14 rounded-full bg-white/95 shadow-lg flex items-center justify-center transform scale-90 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="currentColor" 
              className="w-6 h-6 text-primary-500 ml-1"
            >
              <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
        
        {/* Duration Badge */}
        <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/80 text-white text-xs font-medium rounded">
          {video.duration}
        </div>
      </div>
      
      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 text-base line-clamp-2 group-hover:text-primary-600 transition-colors">
          {video.title}
        </h3>
        <div className="flex items-center gap-2 mt-2">
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center">
            <span className="text-white text-xs font-semibold">
              {video.instructor.charAt(0)}
            </span>
          </div>
          <span className="text-sm text-gray-500">{video.instructor}</span>
        </div>
      </div>
    </div>
  );
}
