'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const videos = [
  { id: 'Q3LCKBOV7tM', title: '1-dars' },
  { id: 'W6FEeDENnlA', title: '2-dars' },
  { id: 'VDqfCJMzSlU', title: '3-dars' },
  { id: '-BSjp_lDuEE', title: '4-dars' },
  { id: 'wmXs0Ldi_d0', title: '5-dars' },
  { id: 'PZ6VWqsxIG8', title: '6-dars' },
  { id: 'QByIfurFvGk', title: '7-dars' },
  { id: '7NIRLAoARyk', title: '8-dars' },
];

export default function ChilangarPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentVideo, setCurrentVideo] = useState<string | null>(null);
  const [currentTitle, setCurrentTitle] = useState('');
  const [currentIndex, setCurrentIndex] = useState(-1);

  const filteredVideos = videos.filter(v => 
    v.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const showVideo = (id: string, title: string) => {
    const index = filteredVideos.findIndex(v => v.id === id);
    setCurrentVideo(id);
    setCurrentTitle(title);
    setCurrentIndex(index);
  };

  const hideVideo = () => {
    setCurrentVideo(null);
    setCurrentTitle('');
    setCurrentIndex(-1);
  };

  const nextVideo = () => {
    if (currentIndex < filteredVideos.length - 1) {
      const next = filteredVideos[currentIndex + 1];
      showVideo(next.id, next.title);
    }
  };

  const prevVideo = () => {
    if (currentIndex > 0) {
      const prev = filteredVideos[currentIndex - 1];
      showVideo(prev.id, prev.title);
    }
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-gray-200 p-5 text-center">
      <header className="mb-4">
        <nav>
          <Link href="/home">
            <Image src="/img/domic-removebg-preview.png" alt="domic" width={50} height={50} className="h-[50px] w-auto" />
          </Link>
        </nav>
      </header>

      <h1 className="text-4xl font-bold text-[#ffcc00] mb-6 tracking-wide drop-shadow-lg">
        Chilangarlik Darsi Videolari
      </h1>

      <input 
        type="text" 
        placeholder="Videoni qidiring..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="px-4 py-3 text-base w-4/5 max-w-[400px] mb-6 rounded-lg border-2 border-[#ffcc00] bg-[#333] text-white outline-none shadow-[0_0_10px_#ffcc00] focus:border-[#ff9900] focus:shadow-[0_0_20px_#ff9900] transition-all"
      />

      <h2 className="text-xl text-white min-h-[28px] mb-4">{currentTitle}</h2>

      <div className="flex flex-wrap justify-center gap-4">
        {filteredVideos.length === 0 ? (
          <p className="text-gray-400">Video topilmadi</p>
        ) : (
          filteredVideos.map(v => (
            <button
              key={v.id}
              onClick={() => showVideo(v.id, v.title)}
              className="m-2 px-4 py-2.5 text-sm cursor-pointer border-none bg-[#444] text-[#ffcc00] rounded-lg shadow-[inset_0_-4px_0_#222,0_4px_8px_rgba(0,0,0,0.5)] transition-all hover:bg-[#555] hover:-translate-y-1"
            >
              <Image 
                src={`https://img.youtube.com/vi/${v.id}/hqdefault.jpg`}
                alt={v.title}
                width={140}
                height={105}
                className="w-[140px] rounded-md border-2 border-[#ffcc00] mb-2"
              />
              <br />
              {v.title}
            </button>
          ))
        )}
      </div>

      <div className="my-5">
        <button 
          onClick={prevVideo}
          className="mx-2 px-5 py-2.5 border-none rounded-lg cursor-pointer bg-[#ffcc00] text-[#1a1a1a] font-bold shadow-md hover:bg-[#ffaa00] hover:-translate-y-0.5 transition-all"
        >
          ⬅️ Oldingi
        </button>
        <button 
          onClick={nextVideo}
          className="mx-2 px-5 py-2.5 border-none rounded-lg cursor-pointer bg-[#ffcc00] text-[#1a1a1a] font-bold shadow-md hover:bg-[#ffaa00] hover:-translate-y-0.5 transition-all"
        >
          ➡️ Keyingi
        </button>
      </div>

      {currentVideo && (
        <>
          <iframe 
            src={`https://www.youtube.com/embed/${currentVideo}?autoplay=1`}
            className="w-full max-w-[560px] h-[315px] mt-5 rounded-lg border-4 border-[#ffcc00] shadow-[0_0_20px_#ffcc00,0_0_40px_rgba(255,204,0,0.2)] mx-auto"
            allowFullScreen
          />
          <button 
            onClick={hideVideo}
            className="mt-4 px-6 py-2.5 bg-[#ff3300] border-none rounded-lg cursor-pointer text-white font-bold shadow-[0_0_10px_#ff3300] hover:bg-[#ff5500] hover:scale-105 transition-all"
          >
            Video-ni yopish
          </button>
        </>
      )}
    </div>
  );
}
