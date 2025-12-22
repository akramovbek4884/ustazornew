'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export default function WallpaperCalculatorPage() {
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [doors, setDoors] = useState('1');
  const [windows, setWindows] = useState('2');
  const [rollWidth, setRollWidth] = useState('0.53');
  const [rollLength, setRollLength] = useState('10');
  const [patternRepeat, setPatternRepeat] = useState('0');
  const [result, setResult] = useState<any>(null);
  const { language } = useLanguage();

  // Average door and window sizes in m²
  const doorArea = 1.8; // m²
  const windowArea = 1.5; // m²

  const calculateWallpaper = () => {
    const l = parseFloat(length);
    const w = parseFloat(width);
    const h = parseFloat(height);
    const d = parseInt(doors);
    const win = parseInt(windows);
    const rw = parseFloat(rollWidth);
    const rl = parseFloat(rollLength);
    const pr = parseFloat(patternRepeat) / 100; // Convert cm to meters

    if (isNaN(l) || isNaN(w) || isNaN(h)) return;

    // Calculate wall perimeter
    const perimeter = 2 * (l + w);
    
    // Calculate number of strips needed
    const stripsNeeded = Math.ceil(perimeter / rw);
    
    // Calculate strip height (including pattern repeat waste)
    const stripHeight = pr > 0 ? h + (pr - (h % pr)) : h;
    
    // Calculate strips per roll
    const stripsPerRoll = Math.floor(rl / stripHeight);
    
    // Calculate total rolls needed
    const rollsNeeded = Math.ceil(stripsNeeded / stripsPerRoll);
    
    // Add 10% extra for waste
    const rollsWithExtra = Math.ceil(rollsNeeded * 1.1);

    // Calculate total wall area
    const wallArea = perimeter * h;
    const openingsArea = (d * doorArea) + (win * windowArea);
    const coverableArea = wallArea - openingsArea;

    setResult({
      perimeter: perimeter.toFixed(1),
      wallArea: wallArea.toFixed(1),
      coverableArea: coverableArea.toFixed(1),
      stripsNeeded,
      stripsPerRoll,
      rollsNeeded,
      rollsWithExtra,
      stripHeight: stripHeight.toFixed(2)
    });
  };

  return (
    <>
      <Header />
      
      <main className="max-w-[800px] mx-auto py-6 px-4 sm:px-6">
        <Breadcrumbs />

        <div className="card-static p-6 sm:p-8">
          <div className="text-center mb-8">
            <div className="text-4xl mb-3">🎭</div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              {language === 'uz' ? "Oboi kalkulyatori" : language === 'ru' ? "Калькулятор обоев" : "Wallpaper Calculator"}
            </h1>
            <p className="text-gray-500 mt-2">
              {language === 'uz' ? "Devor qog'ozi rulonlari sonini hisoblang" 
               : language === 'ru' ? "Рассчитайте количество рулонов обоев" 
               : "Calculate the number of wallpaper rolls needed"}
            </p>
          </div>

          <div className="space-y-6">
            {/* Room Dimensions */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">
                {language === 'uz' ? "Xona o'lchamlari" : language === 'ru' ? "Размеры комнаты" : "Room Dimensions"}
              </h3>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    {language === 'uz' ? "Uzunlik (m)" : language === 'ru' ? "Длина (м)" : "Length (m)"}
                  </label>
                  <input 
                    type="number"
                    value={length}
                    onChange={(e) => setLength(e.target.value)}
                    placeholder="5"
                    className="input"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    {language === 'uz' ? "Kengligi (m)" : language === 'ru' ? "Ширина (м)" : "Width (m)"}
                  </label>
                  <input 
                    type="number"
                    value={width}
                    onChange={(e) => setWidth(e.target.value)}
                    placeholder="4"
                    className="input"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    {language === 'uz' ? "Balandlik (m)" : language === 'ru' ? "Высота (м)" : "Height (m)"}
                  </label>
                  <input 
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    placeholder="2.7"
                    className="input"
                  />
                </div>
              </div>
            </div>

            {/* Openings */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">
                {language === 'uz' ? "Eshik va derazalar" : language === 'ru' ? "Двери и окна" : "Doors & Windows"}
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    {language === 'uz' ? "Eshiklar soni" : language === 'ru' ? "Количество дверей" : "Number of doors"}
                  </label>
                  <input 
                    type="number"
                    value={doors}
                    onChange={(e) => setDoors(e.target.value)}
                    min="0"
                    className="input"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    {language === 'uz' ? "Derazalar soni" : language === 'ru' ? "Количество окон" : "Number of windows"}
                  </label>
                  <input 
                    type="number"
                    value={windows}
                    onChange={(e) => setWindows(e.target.value)}
                    min="0"
                    className="input"
                  />
                </div>
              </div>
            </div>

            {/* Roll Parameters */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">
                {language === 'uz' ? "Rulon parametrlari" : language === 'ru' ? "Параметры рулона" : "Roll Parameters"}
              </h3>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    {language === 'uz' ? "Eni (m)" : language === 'ru' ? "Ширина (м)" : "Width (m)"}
                  </label>
                  <select 
                    value={rollWidth}
                    onChange={(e) => setRollWidth(e.target.value)}
                    className="input select"
                  >
                    <option value="0.53">0.53 m (standart)</option>
                    <option value="0.70">0.70 m</option>
                    <option value="1.06">1.06 m (metrovka)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    {language === 'uz' ? "Uzunligi (m)" : language === 'ru' ? "Длина (м)" : "Length (m)"}
                  </label>
                  <select 
                    value={rollLength}
                    onChange={(e) => setRollLength(e.target.value)}
                    className="input select"
                  >
                    <option value="10">10 m (standart)</option>
                    <option value="10.05">10.05 m</option>
                    <option value="15">15 m</option>
                    <option value="25">25 m</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    {language === 'uz' ? "Rasm takrori (sm)" : language === 'ru' ? "Раппорт (см)" : "Pattern repeat (cm)"}
                  </label>
                  <input 
                    type="number"
                    value={patternRepeat}
                    onChange={(e) => setPatternRepeat(e.target.value)}
                    placeholder="0"
                    min="0"
                    className="input"
                  />
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                💡 {language === 'uz' ? "Rasm takrori - naqshli oboilarda rasmning qaytarilish masofasi" 
                    : language === 'ru' ? "Раппорт - расстояние между повторами рисунка" 
                    : "Pattern repeat - the distance between pattern repetitions"}
              </p>
            </div>

            <button 
              onClick={calculateWallpaper}
              className="btn btn-primary w-full"
            >
              {language === 'uz' ? "Hisoblash" : language === 'ru' ? "Рассчитать" : "Calculate"}
            </button>

            {/* Results */}
            {result && (
              <div className="mt-6 p-6 bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl">
                <h3 className="font-bold text-gray-900 mb-4">
                  {language === 'uz' ? "Natija" : language === 'ru' ? "Результат" : "Result"}
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-lg">
                    <p className="text-sm text-gray-500">
                      {language === 'uz' ? "Xona perimetri" : language === 'ru' ? "Периметр комнаты" : "Room perimeter"}
                    </p>
                    <p className="text-xl font-bold text-gray-900">{result.perimeter} m</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <p className="text-sm text-gray-500">
                      {language === 'uz' ? "Devor yuzasi" : language === 'ru' ? "Площадь стен" : "Wall area"}
                    </p>
                    <p className="text-xl font-bold text-gray-900">{result.coverableArea} m²</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <p className="text-sm text-gray-500">
                      {language === 'uz' ? "Kerakli polosalar" : language === 'ru' ? "Нужно полос" : "Strips needed"}
                    </p>
                    <p className="text-xl font-bold text-gray-900">{result.stripsNeeded} {language === 'uz' ? "ta" : "шт"}</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <p className="text-sm text-gray-500">
                      {language === 'uz' ? "Bitta rulondan" : language === 'ru' ? "Полос из рулона" : "Strips per roll"}
                    </p>
                    <p className="text-xl font-bold text-gray-900">{result.stripsPerRoll} {language === 'uz' ? "ta" : "шт"}</p>
                  </div>
                </div>
                <div className="mt-4 p-4 bg-white rounded-lg text-center">
                  <p className="text-sm text-gray-500">
                    {language === 'uz' ? "Kerakli rulonlar soni" : language === 'ru' ? "Необходимо рулонов" : "Rolls needed"}
                  </p>
                  <p className="text-3xl font-bold text-primary-600">{result.rollsNeeded} {language === 'uz' ? "ta" : "шт"}</p>
                  <p className="text-sm text-gray-500 mt-2">
                    +10% zaxira = <span className="font-semibold text-primary-600">{result.rollsWithExtra} {language === 'uz' ? "ta" : "шт"}</span>
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
