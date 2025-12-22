'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export default function TomCalculatorPage() {
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [roofType, setRoofType] = useState<'metal' | 'shingle' | 'slate'>('metal');
  const [result, setResult] = useState<{
    area: number;
    sheetsNeeded: number;
    sheetsWithWaste: number;
    ridgeLength: number;
  } | null>(null);
  const { language } = useLanguage();

  // Material specifications
  const materials = {
    metal: {
      sheetArea: 1.2 * 2.0, // 2.4 m² per sheet (1.2m × 2m standard)
      wastePercent: 0.15, // 15% waste for overlap
      name: { uz: "Metall profil", ru: "Металлопрофиль", en: "Metal roofing" }
    },
    shingle: {
      sheetArea: 3.0, // 3 m² per pack
      wastePercent: 0.10, // 10% waste
      name: { uz: "Yumshoq tom (shingle)", ru: "Мягкая кровля (шингласс)", en: "Shingle roofing" }
    },
    slate: {
      sheetArea: 1.5, // 1.5 m² per sheet
      wastePercent: 0.12, // 12% waste
      name: { uz: "Shifer", ru: "Шифер", en: "Slate" }
    }
  };

  const calculate = () => {
    const l = parseFloat(length);
    const w = parseFloat(width);

    if (isNaN(l) || isNaN(w) || l <= 0 || w <= 0) {
      return;
    }

    // Calculate roof area (for simple gable roof, multiply by 1.1 for slope)
    const area = l * w * 1.1;

    // Get material specs
    const material = materials[roofType];

    // Calculate sheets needed
    const sheetsNeeded = Math.ceil(area / material.sheetArea);
    const sheetsWithWaste = Math.ceil(sheetsNeeded * (1 + material.wastePercent));

    // Ridge length (top of the roof)
    const ridgeLength = l;

    setResult({
      area,
      sheetsNeeded,
      sheetsWithWaste,
      ridgeLength
    });
  };

  const clearForm = () => {
    setLength('');
    setWidth('');
    setResult(null);
  };

  const roofTypes = [
    { value: 'metal', icon: '🏠', name: materials.metal.name },
    { value: 'shingle', icon: '🔶', name: materials.shingle.name },
    { value: 'slate', icon: '📋', name: materials.slate.name }
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
              {language === 'uz' ? "Tom kalkulyatori" : language === 'ru' ? "Калькулятор кровли" : "Roof Calculator"}
            </h1>
            <p className="text-gray-500 mt-2">
              {language === 'uz' ? "Tom yopish materiallari miqdorini hisoblang" 
               : language === 'ru' ? "Рассчитайте количество кровельных материалов" 
               : "Calculate the amount of roofing materials needed"}
            </p>
          </div>

          <div className="space-y-6">
            {/* Roof Type Selection */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">
                {language === 'uz' ? "Tom turi" : language === 'ru' ? "Тип кровли" : "Roof type"}
              </h3>
              <div className="grid grid-cols-3 gap-3">
                {roofTypes.map(type => (
                  <button
                    key={type.value}
                    onClick={() => setRoofType(type.value as any)}
                    className={`p-4 rounded-xl border-2 transition-colors ${
                      roofType === type.value 
                        ? 'border-primary-500 bg-primary-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <p className="text-2xl mb-1">{type.icon}</p>
                    <p className="font-medium text-gray-900 text-sm">{type.name[language]}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Roof Dimensions */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">
                {language === 'uz' ? "Tom o'lchamlari" : language === 'ru' ? "Размеры крыши" : "Roof Dimensions"}
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
                    placeholder="12"
                    min="0"
                    step="0.1"
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
                    placeholder="8"
                    min="0"
                    step="0.1"
                    className="input"
                  />
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                💡 {language === 'uz' ? "Qiyalik uchun avtomatik 10% qo'shiladi" 
                    : language === 'ru' ? "Автоматически добавляется 10% на уклон" 
                    : "10% is automatically added for slope"}
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
              <div className="mt-6 p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl animate-fadeIn">
                <h3 className="font-bold text-gray-900 mb-4">
                  {language === 'uz' ? "Natija" : language === 'ru' ? "Результат" : "Result"}
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-lg">
                    <p className="text-sm text-gray-500">
                      {language === 'uz' ? "Tom maydoni" : language === 'ru' ? "Площадь крыши" : "Roof area"}
                    </p>
                    <p className="text-xl font-bold text-gray-900">{result.area.toFixed(2)} m²</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <p className="text-sm text-gray-500">
                      {language === 'uz' ? "Kerakli listlar" : language === 'ru' ? "Нужно листов" : "Sheets needed"}
                    </p>
                    <p className="text-xl font-bold text-gray-900">{result.sheetsNeeded} {language === 'uz' ? "ta" : "шт"}</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <p className="text-sm text-gray-500">
                      {language === 'uz' ? "Konek uzunligi" : language === 'ru' ? "Длина конька" : "Ridge length"}
                    </p>
                    <p className="text-xl font-bold text-gray-900">{result.ridgeLength.toFixed(1)} m</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <p className="text-sm text-gray-500">
                      {language === 'uz' ? "Zaxira bilan" : language === 'ru' ? "С запасом" : "With reserve"}
                    </p>
                    <p className="text-xl font-bold text-primary-600">{result.sheetsWithWaste} {language === 'uz' ? "ta" : "шт"}</p>
                  </div>
                </div>
                <div className="mt-4 p-4 bg-white rounded-lg text-center">
                  <p className="text-sm text-gray-500">
                    {language === 'uz' ? "Jami kerakli listlar" : language === 'ru' ? "Всего листов нужно" : "Total sheets needed"}
                  </p>
                  <p className="text-3xl font-bold text-primary-600">
                    {result.sheetsWithWaste} {language === 'uz' ? "ta" : "шт"}
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
                <li>• {language === 'uz' ? "Konek, oluk va boshqa aksessuarlar alohida hisoblanadi" : language === 'ru' ? "Конёк, водосток и аксессуары считаются отдельно" : "Ridge, gutter and accessories are calculated separately"}</li>
                <li>• {language === 'uz' ? "Murakkab tom shakllari uchun 20% zaxira oling" : language === 'ru' ? "Для сложных форм крыши берите запас 20%" : "For complex roof shapes take 20% reserve"}</li>
                <li>• {language === 'uz' ? "Gidroizolyatsiya va isitgich ham kerak bo'ladi" : language === 'ru' ? "Также понадобится гидроизоляция и утеплитель" : "Waterproofing and insulation are also needed"}</li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
