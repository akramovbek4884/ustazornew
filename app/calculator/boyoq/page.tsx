'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export default function PaintCalculatorPage() {
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [doors, setDoors] = useState('1');
  const [windows, setWindows] = useState('2');
  const [coats, setCoats] = useState('2');
  const [paintType, setPaintType] = useState<'water' | 'oil' | 'latex'>('water');
  const [result, setResult] = useState<any>(null);
  const { language } = useLanguage();

  // Coverage per liter (m²) based on paint type
  const coverage = {
    water: 10, // m² per liter
    oil: 12,
    latex: 11
  };

  // Average door and window sizes in m²
  const doorArea = 1.8; // m²
  const windowArea = 1.5; // m²

  const calculatePaint = () => {
    const l = parseFloat(length);
    const w = parseFloat(width);
    const h = parseFloat(height);
    const d = parseInt(doors);
    const win = parseInt(windows);
    const c = parseInt(coats);

    if (isNaN(l) || isNaN(w) || isNaN(h)) return;

    // Calculate wall area
    const perimeter = 2 * (l + w);
    const wallArea = perimeter * h;
    
    // Subtract doors and windows
    const openingsArea = (d * doorArea) + (win * windowArea);
    const paintableArea = wallArea - openingsArea;

    // Calculate paint needed
    const paintPerCoat = paintableArea / coverage[paintType];
    const totalPaint = paintPerCoat * c;

    // Calculate ceiling (optional)
    const ceilingArea = l * w;
    const ceilingPaint = (ceilingArea / coverage[paintType]) * c;

    setResult({
      wallArea: paintableArea.toFixed(1),
      ceilingArea: ceilingArea.toFixed(1),
      wallPaint: totalPaint.toFixed(1),
      ceilingPaint: ceilingPaint.toFixed(1),
      totalPaint: (totalPaint + ceilingPaint).toFixed(1),
      // Estimate cans (assuming 2.5L cans)
      cans: Math.ceil((totalPaint + ceilingPaint) / 2.5)
    });
  };

  const paintTypeLabels = {
    water: { uz: "Suv asosidagi", ru: "Водоэмульсионная", en: "Water-based" },
    oil: { uz: "Yog' asosidagi", ru: "Масляная", en: "Oil-based" },
    latex: { uz: "Lateks", ru: "Латексная", en: "Latex" }
  };

  return (
    <>
      <Header />
      
      <main className="max-w-[800px] mx-auto py-6 px-4 sm:px-6">
        <Breadcrumbs />

        <div className="card-static p-6 sm:p-8">
          <div className="text-center mb-8">
            <div className="text-4xl mb-3">🎨</div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              {language === 'uz' ? "Bo'yoq kalkulyatori" : language === 'ru' ? "Калькулятор краски" : "Paint Calculator"}
            </h1>
            <p className="text-gray-500 mt-2">
              {language === 'uz' ? "Devor va shiftga kerakli bo'yoq miqdorini hisoblang" 
               : language === 'ru' ? "Рассчитайте количество краски для стен и потолка" 
               : "Calculate paint needed for walls and ceiling"}
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

            {/* Paint Options */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">
                {language === 'uz' ? "Bo'yoq parametrlari" : language === 'ru' ? "Параметры краски" : "Paint Options"}
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    {language === 'uz' ? "Bo'yoq turi" : language === 'ru' ? "Тип краски" : "Paint type"}
                  </label>
                  <select 
                    value={paintType}
                    onChange={(e) => setPaintType(e.target.value as any)}
                    className="input select"
                  >
                    <option value="water">{paintTypeLabels.water[language]}</option>
                    <option value="oil">{paintTypeLabels.oil[language]}</option>
                    <option value="latex">{paintTypeLabels.latex[language]}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    {language === 'uz' ? "Qatlamlar soni" : language === 'ru' ? "Количество слоёв" : "Number of coats"}
                  </label>
                  <select 
                    value={coats}
                    onChange={(e) => setCoats(e.target.value)}
                    className="input select"
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                  </select>
                </div>
              </div>
            </div>

            <button 
              onClick={calculatePaint}
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
                      {language === 'uz' ? "Devor yuzasi" : language === 'ru' ? "Площадь стен" : "Wall area"}
                    </p>
                    <p className="text-xl font-bold text-gray-900">{result.wallArea} m²</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <p className="text-sm text-gray-500">
                      {language === 'uz' ? "Shift yuzasi" : language === 'ru' ? "Площадь потолка" : "Ceiling area"}
                    </p>
                    <p className="text-xl font-bold text-gray-900">{result.ceilingArea} m²</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <p className="text-sm text-gray-500">
                      {language === 'uz' ? "Devor uchun bo'yoq" : language === 'ru' ? "Краски для стен" : "Paint for walls"}
                    </p>
                    <p className="text-xl font-bold text-gray-900">{result.wallPaint} L</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <p className="text-sm text-gray-500">
                      {language === 'uz' ? "Shift uchun bo'yoq" : language === 'ru' ? "Краски для потолка" : "Paint for ceiling"}
                    </p>
                    <p className="text-xl font-bold text-gray-900">{result.ceilingPaint} L</p>
                  </div>
                </div>
                <div className="mt-4 p-4 bg-white rounded-lg text-center">
                  <p className="text-sm text-gray-500">
                    {language === 'uz' ? "Jami kerakli bo'yoq" : language === 'ru' ? "Всего краски" : "Total paint needed"}
                  </p>
                  <p className="text-3xl font-bold text-primary-600">{result.totalPaint} L</p>
                  <p className="text-sm text-gray-500 mt-2">
                    ≈ {result.cans} {language === 'uz' ? "ta 2.5L idish" : language === 'ru' ? "банки по 2.5L" : "× 2.5L cans"}
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
