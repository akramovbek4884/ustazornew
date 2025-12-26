'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const santexnikVideos = [
  'Wwdc7n620Wo',
  'L0byOxlIBY0',
  'HcjlImtwlfg',
  'ogNNDlZyG30',
  'DXWpWxNA7bU',
  'pEXqMJeIQO4',
  'jgd9P6YQQEw',
  'LF8BI6zrN5c',
  'E0edQhFKEiU',
  '6prdghxib6g',
  '-bm6YX6u0OY',
  'mwUECZm-WwI',
  '6BVgrn_LpNE',
  'VFfdRSmnPUY',
  'Z32m3deV9VY',
];

export default function SantexnikPage() {
  const [isDark, setIsDark] = useState(false);

  return (
    <div className={`min-h-screen transition-colors ${isDark ? 'bg-[#0b0f13] text-gray-200' : 'bg-gradient-to-b from-[#f7f8fb] to-[#e9eef3] text-gray-900'}`}>
      {/* Header */}
      <header className={`sticky top-0 z-50 backdrop-blur-md ${isDark ? 'bg-[rgba(12,15,20,0.6)] border-b border-white/5' : 'bg-white/60 border-b border-black/5'}`}>
        <div className="max-w-[1100px] mx-auto px-4 py-3 flex items-center justify-between gap-3">
          <Link href="/home">
            <Image
              src="/img/home-removebg-preview (1).png"
              alt="home"
              width={40}
              height={40}
              className="h-10 w-auto bg-white rounded-full p-1"
            />
          </Link>
          <div className="flex items-center gap-3">
            <Image
              src="/img/logo-new.png"
              alt="logo"
              width={48}
              height={48}
              className="w-12 h-12 rounded-lg object-cover"
            />
            <div>
              <h1 className="text-base font-bold m-0">Ustalar — Videolar (mini)</h1>
              <div className="text-xs text-gray-500">Nodirbek Payvandchi — master-klasslar</div>
            </div>
          </div>
          <button
            onClick={() => setIsDark(!isDark)}
            className="px-3 py-1.5 rounded-lg bg-white shadow text-sm font-semibold"
          >
            🌙 Dark/Light
          </button>
        </div>
      </header>

      <main className="max-w-[1100px] mx-auto px-4 py-5 pb-16">
        {/* Hero/Bio */}
        <div className="flex items-center gap-4 mb-5">
          <div className={`${isDark ? 'bg-[#0f1720]' : 'bg-white'} p-3 rounded-xl shadow-md flex items-center gap-3`}>
            <Image
              src="/img/020.png"
              alt="Usta"
              width={72}
              height={72}
              className="w-[72px] h-[72px] rounded-xl object-cover"
            />
            <div>
              <h2 className="text-lg font-bold m-0">Nodirbek Payvandchi</h2>
              <p className="text-gray-500 text-sm m-0 mt-1">Ustaning mini-profil: payvandlash amaliyotlari, tez va aniq ko&apos;rsatmalar.</p>
              <div className="text-xs text-gray-400 mt-1">15 videolar</div>
            </div>
          </div>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {santexnikVideos.map((videoId, index) => (
            <iframe
              key={index}
              src={`https://www.youtube.com/embed/${videoId}`}
              className="w-full h-[180px] md:h-[215px] lg:h-[240px] rounded-lg"
              allowFullScreen
            />
          ))}
        </div>
      </main>
    </div>
  );
}
