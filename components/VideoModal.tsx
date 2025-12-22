'use client';

import { useEffect, useCallback } from 'react';

interface VideoModalProps {
  isOpen: boolean;
  videoSrc: string;
  onClose: () => void;
}

export default function VideoModal({ isOpen, videoSrc, onClose }: VideoModalProps) {
  const handleEsc = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleEsc]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/90 z-[200] flex justify-center items-center backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Video player"
    >
      {/* Close Button */}
      <button 
        className="absolute top-4 right-4 sm:top-6 sm:right-6 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white/50"
        onClick={onClose}
        aria-label="Yopish"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
          <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
        </svg>
      </button>

      {/* Video Container */}
      <div 
        className="w-[95%] max-w-[1000px] animate-scaleIn"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative bg-black rounded-xl overflow-hidden shadow-2xl">
          <video 
            src={videoSrc} 
            controls 
            autoPlay
            className="w-full aspect-video"
          />
        </div>
        
        {/* Video Controls Hint */}
        <p className="text-center text-white/50 text-sm mt-4">
          ESC tugmasini bosib yoping • Ekranni bosing
        </p>
      </div>
    </div>
  );
}
