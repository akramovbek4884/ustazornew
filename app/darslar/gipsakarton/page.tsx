'use client';

import { useState } from 'react';

export default function GipsakartonPage() {
  const [isDark, setIsDark] = useState(false);

  const videos = [
    '8Z4JrYqMFBw',
    'tEI458qoHeo',
    'ncyNfN2jbY4',
  ];

  return (
    <div className={`min-h-screen flex flex-col items-center p-5 transition-colors ${isDark ? 'bg-[#222] text-gray-100' : 'bg-[#f0f0f0] text-gray-900'}`}>
      <h1 className="text-2xl font-bold mb-5">Darslik Videolari</h1>

      {videos.map((videoId, index) => (
        <div key={index} className="w-[90%] max-w-[560px] mb-5">
          <iframe 
            src={`https://www.youtube.com/embed/${videoId}`}
            className="w-full h-[315px] border-none rounded-lg"
            allowFullScreen
          />
        </div>
      ))}

      <button 
        onClick={() => setIsDark(!isDark)}
        className="px-5 py-2.5 text-base cursor-pointer rounded-md bg-[#007bff] text-white border-none hover:bg-[#0056b3] transition-colors"
      >
        Dark / Light Mode
      </button>
    </div>
  );
}
