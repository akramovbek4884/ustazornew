'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';

export default function BetonCalculatorPage() {
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [result, setResult] = useState<{volume: number; cement: number; sand: number; gravel: number} | null>(null);

  const calculate = () => {
    const l = parseFloat(length);
    const w = parseFloat(width);
    const h = parseFloat(height);

    if (isNaN(l) || isNaN(w) || isNaN(h) || l <= 0 || w <= 0 || h <= 0) {
      return;
    }

    const volume = l * w * h;
    // Standard M200 concrete mix ratio 1:2:4
    const cement = volume * 300; // kg per m³
    const sand = volume * 600; // kg per m³
    const gravel = volume * 1200; // kg per m³
    
    setResult({ volume, cement, sand, gravel });
  };

  const clearForm = () => {
    setLength('');
    setWidth('');
    setHeight('');
    setResult(null);
  };

  return (
    <>
      <Header />
      
      <main id="main-content" className="max-w-[800px] mx-auto py-6 px-4 sm:px-6">
        <Breadcrumbs />
        
        <div className="card-static overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary-500 to-primary-600 p-6 text-white">
            <Link 
              href="/calculator"
              className="inline-flex items-center gap-1 text-white/80 hover:text-white text-sm mb-3 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
              </svg>
              Orqaga
            </Link>
            <h1 className="text-2xl font-bold">Beton kalkulyatori</h1>
            <p className="text-white/80 mt-1">Fundament, plita va boshqa konstruksiyalar uchun</p>
          </div>

          <div className="p-6">
            {/* Info Box */}
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-6">
              <div className="flex items-start gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5">
                  <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
                </svg>
                <div>
                  <h4 className="font-medium text-blue-800 text-sm">Qanday ishlaydi?</h4>
                  <p className="text-sm text-blue-700 mt-1">
                    O&apos;lchamlarni kiriting: uzunlik, kenglik va balandlik. Kalkulyator kerakli beton hajmi va 
                    tarkibiy qismlarni (sement, qum, shag&apos;al) hisoblab beradi.
                  </p>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Uzunlik (m)
                  </label>
                  <input 
                    type="number" 
                    value={length}
                    onChange={(e) => setLength(e.target.value)}
                    placeholder="5.0"
                    step="0.01"
                    min="0"
                    className="input"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Kenglik (m)
                  </label>
                  <input 
                    type="number" 
                    value={width}
                    onChange={(e) => setWidth(e.target.value)}
                    placeholder="3.0"
                    step="0.01"
                    min="0"
                    className="input"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Balandlik (m)
                  </label>
                  <input 
                    type="number" 
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    placeholder="0.2"
                    step="0.01"
                    min="0"
                    className="input"
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <button 
                  onClick={calculate}
                  disabled={!length || !width || !height}
                  className="btn btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-11.25a.75.75 0 00-1.5 0v2.5h-2.5a.75.75 0 000 1.5h2.5v2.5a.75.75 0 001.5 0v-2.5h2.5a.75.75 0 000-1.5h-2.5v-2.5z" clipRule="evenodd" />
                  </svg>
                  Hisoblash
                </button>
                <button 
                  onClick={clearForm}
                  className="btn btn-ghost"
                >
                  Tozalash
                </button>
              </div>
            </div>

            {/* Result */}
            {result && (
              <div className="mt-6 bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100 rounded-xl p-6 animate-fadeIn">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="white" className="w-5 h-5">
                      <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-900">Hisoblash natijasi</h3>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="bg-white rounded-lg p-4 text-center shadow-sm">
                    <div className="text-2xl font-bold text-primary-600">{result.volume.toFixed(2)}</div>
                    <div className="text-sm text-gray-500">Beton (m³)</div>
                  </div>
                  <div className="bg-white rounded-lg p-4 text-center shadow-sm">
                    <div className="text-2xl font-bold text-gray-900">{Math.ceil(result.cement)}</div>
                    <div className="text-sm text-gray-500">Sement (kg)</div>
                  </div>
                  <div className="bg-white rounded-lg p-4 text-center shadow-sm">
                    <div className="text-2xl font-bold text-gray-900">{Math.ceil(result.sand)}</div>
                    <div className="text-sm text-gray-500">Qum (kg)</div>
                  </div>
                  <div className="bg-white rounded-lg p-4 text-center shadow-sm">
                    <div className="text-2xl font-bold text-gray-900">{Math.ceil(result.gravel)}</div>
                    <div className="text-sm text-gray-500">Shag&apos;al (kg)</div>
                  </div>
                </div>

                <p className="text-xs text-gray-500 mt-4 text-center">
                  * M200 markali beton uchun taxminiy hisob (1:2:4 nisbat)
                </p>
              </div>
            )}

            {/* Tips */}
            <div className="mt-6 bg-amber-50 border border-amber-100 rounded-xl p-4">
              <h4 className="font-medium text-amber-800 mb-2 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-amber-500">
                  <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                </svg>
                Foydali maslahatlar
              </h4>
              <ul className="text-sm text-amber-700 space-y-1">
                <li>• Zaxira uchun 10-15% qo&apos;shimcha material hisoblang</li>
                <li>• Beton qurishdan oldin armaturayi tekshiring</li>
                <li>• Issiq havodalarga beton quyishdan saqlaning</li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
