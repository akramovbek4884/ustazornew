'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const videos = [
  { id: 'xi1F7E08XGk', title: 'Payvandlash texnikasi 1' },
  { id: 'nim5X0ylC8k', title: 'Payvandlash texnikasi 2' },
  { id: 'qTiQFqX7eIU', title: 'Payvandlash texnikasi 3' },
  { id: 'HtuFsAY8p54', title: 'Payvandlash texnikasi 4' },
  { id: 'Umx4LfOk_Z8', title: 'Payvandlash texnikasi 5' },
  { id: 'L_ANvGRzY58', title: 'Payvandlash texnikasi 6' },
  { id: 'zz4wV8GghWU', title: 'Payvandlash texnikasi 7' },
  { id: 'XJoKXDYZ_tk', title: 'Payvandlash texnikasi 8' },
  { id: '2z9J2YT-fzo', title: 'Payvandlash texnikasi 9' },
  { id: 'HyjnVO1BRPI', title: 'Payvandlash texnikasi 10' },
];

export default function SvarkaPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);

  const filteredVideos = videos.filter(v => 
    v.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={`min-h-screen transition-colors ${isDarkMode ? 'bg-[#121212] text-gray-200' : 'bg-gradient-to-b from-[#f9f9f9] to-[#e0f7fa] text-gray-900'}`}>
      {/* Header */}
      <header className={`sticky top-0 ${isDarkMode ? 'bg-[#1f1f1f]' : 'bg-white shadow-md'} py-2.5 z-50`}>
        <nav className="max-w-[1100px] mx-auto px-5 flex items-center gap-5 flex-wrap">
          <Link href="/home" className={`font-bold ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>Videolar</Link>
          <Link href="/boglanish" className={`font-bold ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>Kontakt</Link>
          <button 
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="ml-auto px-3 py-1.5 bg-gray-200 dark:bg-gray-700 rounded-md"
          >
            🌙 Dark/Light
          </button>
        </nav>
      </header>

      <main className="max-w-[1100px] mx-auto px-5 py-6">
        <Image 
          src="/img/svarkachi.jpg" 
          alt="Usta rasmi" 
          width={150}
          height={150}
          className="w-[150px] h-[150px] rounded-full object-cover border-4 border-gray-700 mx-auto"
        />
        <h2 className="text-center text-2xl font-bold mt-4">Nodirbek Payvandchi</h2>

        <input 
          type="text" 
          placeholder="Videolarni izlash..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={`block mx-auto my-4 px-4 py-2 rounded-lg border w-[250px] ${isDarkMode ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
          {filteredVideos.map(video => (
            <div key={video.id} className="relative group">
              <iframe 
                src={`https://www.youtube.com/embed/${video.id}`}
                className="w-full aspect-video rounded-lg transition-transform group-hover:scale-105 group-hover:shadow-xl"
                allowFullScreen
              />
              <p className={`mt-2 font-bold text-center ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                {video.title}
              </p>
              <div className="flex justify-center gap-2 mt-2">
                <button className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:opacity-80">❤️ Like</button>
                <button className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:opacity-80">🔖 Bookmark</button>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="mt-10 text-center">
          <h3 className="text-xl font-bold mb-3">Kontakt</h3>
          <p>📞 +998 90 123 45 67</p>
          <p>YouTube: <a href="https://www.youtube.com/@nodirbeksvarshik" target="_blank" className="text-blue-500 hover:underline">@nodirbeksvarshik</a></p>
        </div>
      </main>

      <footer className={`text-center py-6 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
        © 2025 Nodirbek Payvandchi. Barcha huquqlar himoyalangan.
      </footer>
    </div>
  );
}
