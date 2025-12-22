'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export default function PatalogCalculatorPage() {
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [ceilingType, setCeilingType] = useState<'tiles' | 'gypsum' | 'stretch'>('tiles');
  const [result, setResult] = useState<{
    area: number;
    materialsNeeded: number;
    materialsWithWaste: number;
    profileLength?: number;
  } | null>(null);
  const { language } = useLanguage();

  // Material specifications
  const materials = {
    tiles: {
      size: 0.5 * 0.5, // 0.25 m² per tile (50x50 cm)
      wastePercent: 0.10,
      name: { uz: "Shiftli plitka (50×50 sm)", ru: "Потолочная плитка (50×50 см)", en: "Ceiling tiles (50×50 cm)" },
      unit: { uz: "dona", ru: "шт", en: "pcs" }
    },
    gypsum: {
      size: 1.2 * 2.4, // 2.88 m² per sheet
      wastePercent: 0.15,
      name: { uz: "Gipsokarton (1.2×2.4 m)", ru: "Гипсокартон (1.2×2.4 м)", en: "Drywall (1.2×2.4 m)" },
      unit: { uz: "varaq", ru: "лист", en: "sheet" }
    },
    stretch: {
      size: 1, // 1 m² per 1 m²
      wastePercent: 0.05,
      name: { uz: "Tarang shift", ru: "Натяжной потолок", en: "Stretch ceiling" },
      unit: { uz: "m²", ru: "м²", en: "m²" }
    }
  };

  const calculate = () => {
    const l = parseFloat(length);
    const w = parseFloat(width);

    if (isNaN(l) || isNaN(w) || l <= 0 || w <= 0) {
      return;
    }

    // Calculate ceiling area
    const area = l * w;

    // Get material specs
    const material = materials[ceilingType];

    // Calculate materials needed
    const materialsNeeded = Math.ceil(area / material.size);
    const materialsWithWaste = Math.ceil(materialsNeeded * (1 + material.wastePercent));

    // For gypsum and tiles, calculate profile length (perimeter × 2 + cross profiles)
    let profileLength;
    if (ceilingType === 'gypsum' || ceilingType === 'tiles') {
      const perimeter = 2 * (l + w);
      // UD profile around perimeter + CD profiles every 0.6m
      profileLength = perimeter + Math.ceil(l / 0.6) * w;
    }

    setResult({
      area,
      materialsNeeded,
      materialsWithWaste,
      profileLength
    });
  };

  const clearForm = () => {
    setLength('');
    setWidth('');
    setResult(null);
  };

  const ceilingTypes = [
    { value: 'tiles', icon: '🔲', name: materials.tiles.name },
    { value: 'gypsum', icon: '📋', name: materials.gypsum.name },
    { value: 'stretch', icon: '✨', name: materials.stretch.name }
  ];

  return (
    <>
      <Header />
      
      <main className="max-w-[800px] mx-auto py-6 px-4 sm:px-6">
        <Breadcrumbs />

        <div className="card-static p-6 sm:p-8">
          <div className="text-center mb-8">
            <div className="text-4xl mb-3">🏠</div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              {language === 'uz' ? "Shift kalkulyatori" : language === 'ru' ? "Калькулятор потолка" : "Ceiling Calculator"}
            </h1>
            <p className="text-gray-500 mt-2">
              {language === 'uz' ? "Shift uchun kerakli material miqdorini hisoblang" 
               : language === 'ru' ? "Рассчитайте количество материала для потолка" 
               : "Calculate the amount of material needed for ceiling"}
            </p>
          </div>

          <div className="space-y-6">
            {/* Ceiling Type Selection */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">
                {language === 'uz' ? "Shift turi" : language === 'ru' ? "Тип потолка" : "Ceiling type"}
              </h3>
              <div className="grid grid-cols-3 gap-3">
                {ceilingTypes.map(type => (
                  <button
                    key={type.value}
                    onClick={() => setCeilingType(type.value as any)}
                    className={`p-4 rounded-xl border-2 transition-colors ${
                      ceilingType === type.value 
                        ? 'border-primary-500 bg-primary-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <p className="text-2xl mb-1">{type.icon}</p>
                    <p className="font-medium text-gray-900 text-xs">{type.name[language]}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Room Dimensions */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">
                {language === 'uz' ? "Xona o'lchamlari" : language === 'ru' ? "Размеры комнаты" : "Room Dimensions"}
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
              <div className="mt-6 p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl animate-fadeIn">
                <h3 className="font-bold text-gray-900 mb-4">
                  {language === 'uz' ? "Natija" : language === 'ru' ? "Результат" : "Result"}
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-lg">
                    <p className="text-sm text-gray-500">
                      {language === 'uz' ? "Shift maydoni" : language === 'ru' ? "Площадь потолка" : "Ceiling area"}
                    </p>
                    <p className="text-xl font-bold text-gray-900">{result.area.toFixed(2)} m²</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <p className="text-sm text-gray-500">
                      {language === 'uz' ? "Kerakli material" : language === 'ru' ? "Нужно материала" : "Material needed"}
                    </p>
                    <p className="text-xl font-bold text-gray-900">
                      {result.materialsNeeded} {materials[ceilingType].unit[language]}
                    </p>
                  </div>
                </div>
                <div className="mt-4 p-4 bg-white rounded-lg text-center">
                  <p className="text-sm text-gray-500">
                    {language === 'uz' ? "Zaxira bilan" : language === 'ru' ? "С запасом" : "With reserve"}
                  </p>
                  <p className="text-3xl font-bold text-primary-600">
                    {result.materialsWithWaste} {materials[ceilingType].unit[language]}
                  </p>
                </div>
                {result.profileLength && (
                  <div className="mt-4 p-4 bg-white rounded-lg text-center">
                    <p className="text-sm text-gray-500">
                      {language === 'uz' ? "Profil (taxminan)" : language === 'ru' ? "Профиль (примерно)" : "Profile (approx.)"}
                    </p>
                    <p className="text-xl font-bold text-gray-900">
                      {Math.ceil(result.profileLength)} m
                    </p>
                  </div>
                )}
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
                <li>• {language === 'uz' ? "Gipsokarton uchun profil va shuruplar ham kerak" : language === 'ru' ? "Для гипсокартона нужны профили и шурупы" : "Drywall requires profiles and screws"}</li>
                <li>• {language === 'uz' ? "Tarang shift o'rnatish uchun mutaxassisga murojaat qiling" : language === 'ru' ? "Для натяжного потолка обратитесь к специалисту" : "Contact a specialist for stretch ceiling installation"}</li>
                <li>• {language === 'uz' ? "Murakkab shakllar uchun 15-20% zaxira oling" : language === 'ru' ? "Для сложных форм берите запас 15-20%" : "For complex shapes take 15-20% reserve"}</li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
