'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export default function PolCalculatorPage() {
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [floorType, setFloorType] = useState<'laminate' | 'parquet' | 'tile'>('laminate');
  const [result, setResult] = useState<{
    area: number;
    materialNeeded: number;
    materialWithWaste: number;
    packs: number;
    underlayArea: number;
  } | null>(null);
  const { language } = useLanguage();

  // Material specifications
  const materials = {
    laminate: {
      packArea: 2.4, // m² per pack (standard)
      wastePercent: 0.10, // 10% waste
      name: { uz: "Laminat", ru: "Ламинат", en: "Laminate" }
    },
    parquet: {
      packArea: 1.5, // m² per pack
      wastePercent: 0.15, // 15% waste for parquet
      name: { uz: "Parket", ru: "Паркет", en: "Parquet" }
    },
    tile: {
      packArea: 1.0, // m² per pack
      wastePercent: 0.10, // 10% waste
      name: { uz: "Kafel plitka", ru: "Керамическая плитка", en: "Ceramic tile" }
    }
  };

  const calculate = () => {
    const l = parseFloat(length);
    const w = parseFloat(width);

    if (isNaN(l) || isNaN(w) || l <= 0 || w <= 0) {
      return;
    }

    // Calculate floor area
    const area = l * w;

    // Get material specs
    const material = materials[floorType];

    // Calculate material needed with waste
    const materialNeeded = area;
    const materialWithWaste = area * (1 + material.wastePercent);

    // Calculate packs needed
    const packs = Math.ceil(materialWithWaste / material.packArea);

    // Underlay area (same as floor area + 5% overlap)
    const underlayArea = area * 1.05;

    setResult({
      area,
      materialNeeded,
      materialWithWaste,
      packs,
      underlayArea
    });
  };

  const clearForm = () => {
    setLength('');
    setWidth('');
    setResult(null);
  };

  const floorTypes = [
    { value: 'laminate', icon: '🪵', name: materials.laminate.name },
    { value: 'parquet', icon: '🏠', name: materials.parquet.name },
    { value: 'tile', icon: '🔲', name: materials.tile.name }
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
              {language === 'uz' ? "Pol qoplamasi kalkulyatori" : language === 'ru' ? "Калькулятор напольного покрытия" : "Floor Covering Calculator"}
            </h1>
            <p className="text-gray-500 mt-2">
              {language === 'uz' ? "Laminat, parket yoki kafel miqdorini hisoblang" 
               : language === 'ru' ? "Рассчитайте количество ламината, паркета или плитки" 
               : "Calculate the amount of laminate, parquet or tiles needed"}
            </p>
          </div>

          <div className="space-y-6">
            {/* Floor Type Selection */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">
                {language === 'uz' ? "Pol qoplamasi turi" : language === 'ru' ? "Тип напольного покрытия" : "Floor covering type"}
              </h3>
              <div className="grid grid-cols-3 gap-3">
                {floorTypes.map(type => (
                  <button
                    key={type.value}
                    onClick={() => setFloorType(type.value as any)}
                    className={`p-4 rounded-xl border-2 transition-colors ${
                      floorType === type.value 
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
              <div className="mt-6 p-6 bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl animate-fadeIn">
                <h3 className="font-bold text-gray-900 mb-4">
                  {language === 'uz' ? "Natija" : language === 'ru' ? "Результат" : "Result"}
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-lg">
                    <p className="text-sm text-gray-500">
                      {language === 'uz' ? "Pol maydoni" : language === 'ru' ? "Площадь пола" : "Floor area"}
                    </p>
                    <p className="text-xl font-bold text-gray-900">{result.area.toFixed(2)} m²</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <p className="text-sm text-gray-500">
                      {language === 'uz' ? "Kerakli material" : language === 'ru' ? "Нужно материала" : "Material needed"}
                    </p>
                    <p className="text-xl font-bold text-gray-900">{result.materialNeeded.toFixed(2)} m²</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <p className="text-sm text-gray-500">
                      {language === 'uz' ? "Zaxira bilan" : language === 'ru' ? "С запасом" : "With reserve"}
                    </p>
                    <p className="text-xl font-bold text-gray-900">{result.materialWithWaste.toFixed(2)} m²</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <p className="text-sm text-gray-500">
                      {language === 'uz' ? "Podlozhka (taglik)" : language === 'ru' ? "Подложка" : "Underlay"}
                    </p>
                    <p className="text-xl font-bold text-gray-900">{result.underlayArea.toFixed(2)} m²</p>
                  </div>
                </div>
                <div className="mt-4 p-4 bg-white rounded-lg text-center">
                  <p className="text-sm text-gray-500">
                    {language === 'uz' ? "Kerakli qadoqlar soni" : language === 'ru' ? "Количество упаковок" : "Packs needed"}
                  </p>
                  <p className="text-3xl font-bold text-primary-600">
                    {result.packs} {language === 'uz' ? "ta" : "шт"}
                  </p>
                  <p className="text-sm text-gray-500 mt-2">
                    ({materials[floorType].packArea} m² / {language === 'uz' ? "qadoq" : language === 'ru' ? "упаковка" : "pack"})
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
                <li>• {language === 'uz' ? "Laminat yotqizishda podlozhka (taglik) albatta kerak" : language === 'ru' ? "При укладке ламината обязательно нужна подложка" : "Underlay is required for laminate installation"}</li>
                <li>• {language === 'uz' ? "Diagonal yotqizish uchun 15% ko'proq material oling" : language === 'ru' ? "Для диагональной укладки берите на 15% больше материала" : "For diagonal laying take 15% more material"}</li>
                <li>• {language === 'uz' ? "Devor atrofida 8-10 mm bo'shliq qoldiring" : language === 'ru' ? "Оставляйте зазор 8-10 мм от стен" : "Leave 8-10 mm gap around walls"}</li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
