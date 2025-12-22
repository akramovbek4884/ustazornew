'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export default function KafelCalculatorPage() {
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [tileLength, setTileLength] = useState('30');
  const [tileWidth, setTileWidth] = useState('30');
  const [gapSize, setGapSize] = useState('2');
  const [result, setResult] = useState<{
    area: number;
    tilesNeeded: number;
    tilesWithWaste: number;
    boxesNeeded: number;
  } | null>(null);
  const { language } = useLanguage();

  const tilesPerBox = 10; // Standard tiles per box

  const calculate = () => {
    const l = parseFloat(length);
    const w = parseFloat(width);
    const tl = parseFloat(tileLength);
    const tw = parseFloat(tileWidth);
    const gap = parseFloat(gapSize);

    if (isNaN(l) || isNaN(w) || isNaN(tl) || isNaN(tw) || l <= 0 || w <= 0 || tl <= 0 || tw <= 0) {
      return;
    }

    // Convert tile size from cm to m and add gap
    const tileLengthM = (tl + gap) / 100;
    const tileWidthM = (tw + gap) / 100;

    // Calculate area
    const area = l * w;

    // Calculate single tile area (in m²)
    const singleTileArea = tileLengthM * tileWidthM;

    // Calculate tiles needed
    const tilesNeeded = Math.ceil(area / singleTileArea);

    // Add 10% waste
    const tilesWithWaste = Math.ceil(tilesNeeded * 1.10);

    // Calculate boxes needed
    const boxesNeeded = Math.ceil(tilesWithWaste / tilesPerBox);

    setResult({
      area,
      tilesNeeded,
      tilesWithWaste,
      boxesNeeded
    });
  };

  const clearForm = () => {
    setLength('');
    setWidth('');
    setResult(null);
  };

  return (
    <>
      <Header />
      
      <main className="max-w-[800px] mx-auto py-6 px-4 sm:px-6">
        <Breadcrumbs />

        <div className="card-static p-6 sm:p-8">
          <div className="text-center mb-8">
            <div className="w-20 h-20 mx-auto mb-4 rounded-xl overflow-hidden">
              <img 
                src="https://static.tildacdn.com/tild6561-6138-4665-b736-393133316234/huurre-image-scaled.jpg" 
                alt="Kafel"
                className="w-full h-full object-cover"
              />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              {language === 'uz' ? "Kafel kalkulyatori" : language === 'ru' ? "Калькулятор плитки" : "Tile Calculator"}
            </h1>
            <p className="text-gray-500 mt-2">
              {language === 'uz' ? "Pol yoki devor uchun kerakli kafel miqdorini hisoblang" 
               : language === 'ru' ? "Рассчитайте количество плитки для пола или стен" 
               : "Calculate the number of tiles needed for floor or walls"}
            </p>
          </div>

          <div className="space-y-6">
            {/* Area Dimensions */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">
                {language === 'uz' ? "Yuza o'lchamlari" : language === 'ru' ? "Размеры поверхности" : "Surface Dimensions"}
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    {language === 'uz' ? "Uzunlik (m)" : language === 'ru' ? "Длина (м)" : "Length (m)"}
                  </label>
                  <input 
                    type="number" 
                    value={length}
                    onChange={(e) => setLength(e.target.value)}
                    placeholder="5"
                    min="0"
                    step="0.01"
                    className="input"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    {language === 'uz' ? "Kenglik (m)" : language === 'ru' ? "Ширина (м)" : "Width (m)"}
                  </label>
                  <input 
                    type="number" 
                    value={width}
                    onChange={(e) => setWidth(e.target.value)}
                    placeholder="4"
                    min="0"
                    step="0.01"
                    className="input"
                  />
                </div>
              </div>
            </div>

            {/* Tile Dimensions */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">
                {language === 'uz' ? "Kafel o'lchamlari" : language === 'ru' ? "Размеры плитки" : "Tile Dimensions"}
              </h3>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    {language === 'uz' ? "Uzunligi (sm)" : language === 'ru' ? "Длина (см)" : "Length (cm)"}
                  </label>
                  <input 
                    type="number" 
                    value={tileLength}
                    onChange={(e) => setTileLength(e.target.value)}
                    placeholder="30"
                    min="0"
                    step="1"
                    className="input"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    {language === 'uz' ? "Kengligi (sm)" : language === 'ru' ? "Ширина (см)" : "Width (cm)"}
                  </label>
                  <input 
                    type="number" 
                    value={tileWidth}
                    onChange={(e) => setTileWidth(e.target.value)}
                    placeholder="30"
                    min="0"
                    step="1"
                    className="input"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    {language === 'uz' ? "Chok (mm)" : language === 'ru' ? "Шов (мм)" : "Gap (mm)"}
                  </label>
                  <input 
                    type="number" 
                    value={gapSize}
                    onChange={(e) => setGapSize(e.target.value)}
                    placeholder="2"
                    min="0"
                    step="0.5"
                    className="input"
                  />
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                💡 {language === 'uz' ? "Mashhur o'lchamlar: 30×30, 40×40, 60×60, 30×60 sm" 
                    : language === 'ru' ? "Популярные размеры: 30×30, 40×40, 60×60, 30×60 см" 
                    : "Popular sizes: 30×30, 40×40, 60×60, 30×60 cm"}
              </p>
            </div>

            <div className="flex gap-3">
              <button 
                onClick={calculate}
                disabled={!length || !width}
                className="btn btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {language === 'uz' ? "Hisoblash" : language === 'ru' ? "Рассчитать" : "Calculate"}
              </button>
              <button 
                onClick={clearForm}
                className="btn btn-ghost"
              >
                {language === 'uz' ? "Tozalash" : language === 'ru' ? "Очистить" : "Clear"}
              </button>
            </div>

            {/* Results */}
            {result && (
              <div className="mt-6 p-6 bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl animate-fadeIn">
                <h3 className="font-bold text-gray-900 mb-4">
                  {language === 'uz' ? "Natija" : language === 'ru' ? "Результат" : "Result"}
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-lg">
                    <p className="text-sm text-gray-500">
                      {language === 'uz' ? "Umumiy yuza" : language === 'ru' ? "Общая площадь" : "Total area"}
                    </p>
                    <p className="text-xl font-bold text-gray-900">{result.area.toFixed(2)} m²</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <p className="text-sm text-gray-500">
                      {language === 'uz' ? "Kerakli kafel" : language === 'ru' ? "Нужно плитки" : "Tiles needed"}
                    </p>
                    <p className="text-xl font-bold text-gray-900">{result.tilesNeeded} {language === 'uz' ? "ta" : "шт"}</p>
                  </div>
                </div>
                <div className="mt-4 p-4 bg-white rounded-lg text-center">
                  <p className="text-sm text-gray-500">
                    {language === 'uz' ? "Zaxira bilan (+10%)" : language === 'ru' ? "С запасом (+10%)" : "With reserve (+10%)"}
                  </p>
                  <p className="text-3xl font-bold text-primary-600">{result.tilesWithWaste} {language === 'uz' ? "ta" : "шт"}</p>
                  <p className="text-sm text-gray-500 mt-2">
                    ≈ {result.boxesNeeded} {language === 'uz' ? "ta quti (10 dona/quti)" : language === 'ru' ? "коробок (10 шт/коробка)" : "boxes (10 pcs/box)"}
                  </p>
                </div>
              </div>
            )}

            {/* Tips */}
            <div className="bg-amber-50 border border-amber-100 rounded-xl p-4">
              <h4 className="font-medium text-amber-800 mb-2 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-amber-500">
                  <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                </svg>
                {language === 'uz' ? "Foydali maslahatlar" : language === 'ru' ? "Полезные советы" : "Helpful tips"}
              </h4>
              <ul className="text-sm text-amber-700 space-y-1">
                <li>• {language === 'uz' ? "10-15% zaxira miqdori tavsiya etiladi" : language === 'ru' ? "Рекомендуется запас 10-15%" : "10-15% reserve is recommended"}</li>
                <li>• {language === 'uz' ? "Diagonal yotqizishda 15% ko'proq kafel kerak" : language === 'ru' ? "При диагональной укладке нужно на 15% больше плитки" : "Diagonal laying requires 15% more tiles"}</li>
                <li>• {language === 'uz' ? "Murakkab naqshlar uchun 20% zaxira oling" : language === 'ru' ? "Для сложных узоров берите запас 20%" : "For complex patterns, take 20% reserve"}</li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
