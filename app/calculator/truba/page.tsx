'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export default function PipeCalculatorPage() {
  const [bathrooms, setBathrooms] = useState('1');
  const [kitchens, setKitchens] = useState('1');
  const [toilets, setToilets] = useState('1');
  const [floors, setFloors] = useState('1');
  const [pipeType, setPipeType] = useState<'ppr' | 'metal' | 'composite'>('ppr');
  const [result, setResult] = useState<any>(null);
  const { language } = useLanguage();

  // Average pipe lengths per fixture
  const pipeLengths = {
    bathroom: { hot: 8, cold: 8, drain: 6 },
    kitchen: { hot: 6, cold: 6, drain: 4 },
    toilet: { cold: 3, drain: 3 },
    riser: 3, // per floor
    reserve: 0.20 // 20% reserve
  };

  // Prices per meter (approximate)
  const pipePrices = {
    ppr: { hot: 8000, cold: 6000, drain: 4000 },
    metal: { hot: 15000, cold: 12000, drain: 8000 },
    composite: { hot: 12000, cold: 10000, drain: 6000 }
  };

  const calculatePipes = () => {
    const b = parseInt(bathrooms);
    const k = parseInt(kitchens);
    const t = parseInt(toilets);
    const f = parseInt(floors);

    // Hot water pipes
    const hotWater = (b * pipeLengths.bathroom.hot) + (k * pipeLengths.kitchen.hot);
    
    // Cold water pipes
    const coldWater = (b * pipeLengths.bathroom.cold) + 
                      (k * pipeLengths.kitchen.cold) + 
                      (t * pipeLengths.toilet.cold);
    
    // Drainage pipes
    const drainage = (b * pipeLengths.bathroom.drain) + 
                     (k * pipeLengths.kitchen.drain) + 
                     (t * pipeLengths.toilet.drain);

    // Add risers for multi-floor
    const risers = (f > 1) ? f * pipeLengths.riser * 3 : 0; // 3 types of pipes

    const total = hotWater + coldWater + drainage + risers;
    const withReserve = total * (1 + pipeLengths.reserve);

    // Calculate costs
    const prices = pipePrices[pipeType];
    const hotCost = Math.ceil(hotWater * (1 + pipeLengths.reserve)) * prices.hot;
    const coldCost = Math.ceil(coldWater * (1 + pipeLengths.reserve)) * prices.cold;
    const drainCost = Math.ceil(drainage * (1 + pipeLengths.reserve)) * prices.drain;

    setResult({
      hotWater: Math.ceil(hotWater * (1 + pipeLengths.reserve)),
      coldWater: Math.ceil(coldWater * (1 + pipeLengths.reserve)),
      drainage: Math.ceil(drainage * (1 + pipeLengths.reserve)),
      total: Math.ceil(withReserve),
      hotCost,
      coldCost,
      drainCost,
      totalCost: hotCost + coldCost + drainCost,
      fittingsEstimate: Math.ceil((hotWater + coldWater + drainage) / 2) // rough estimate
    });
  };

  const pipeTypeLabels = {
    ppr: { uz: "PPR plastik", ru: "ППР пластик", en: "PPR plastic" },
    metal: { uz: "Metall", ru: "Металл", en: "Metal" },
    composite: { uz: "Metall-plastik", ru: "Металлопластик", en: "Metal-plastic" }
  };

  return (
    <>
      <Header />
      
      <main className="max-w-[800px] mx-auto py-6 px-4 sm:px-6">
        <Breadcrumbs />

        <div className="card-static p-6 sm:p-8">
          <div className="text-center mb-8">
            <div className="text-4xl mb-3">🚿</div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              {language === 'uz' ? "Truba kalkulyatori" : language === 'ru' ? "Калькулятор труб" : "Pipe Calculator"}
            </h1>
            <p className="text-gray-500 mt-2">
              {language === 'uz' ? "Santexnika trubalari uzunligini hisoblang" 
               : language === 'ru' ? "Рассчитайте длину сантехнических труб" 
               : "Calculate plumbing pipe lengths"}
            </p>
          </div>

          <div className="space-y-6">
            {/* Pipe Type */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">
                {language === 'uz' ? "Truba turi" : language === 'ru' ? "Тип трубы" : "Pipe Type"}
              </h3>
              <div className="grid grid-cols-3 gap-3">
                {Object.entries(pipeTypeLabels).map(([value, labels]) => (
                  <button
                    key={value}
                    onClick={() => setPipeType(value as any)}
                    className={`p-4 rounded-xl border-2 transition-colors ${
                      pipeType === value 
                        ? 'border-primary-500 bg-primary-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <p className="font-bold text-gray-900">{labels[language]}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Fixtures */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">
                {language === 'uz' ? "Santexnika jihozlari" : language === 'ru' ? "Сантехника" : "Fixtures"}
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    🛁 {language === 'uz' ? "Hammom/dush" : language === 'ru' ? "Ванная/душ" : "Bathroom/shower"}
                  </label>
                  <select 
                    value={bathrooms}
                    onChange={(e) => setBathrooms(e.target.value)}
                    className="input select"
                  >
                    {[0, 1, 2, 3, 4].map(n => (
                      <option key={n} value={n}>{n}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    🍳 {language === 'uz' ? "Oshxona" : language === 'ru' ? "Кухня" : "Kitchen"}
                  </label>
                  <select 
                    value={kitchens}
                    onChange={(e) => setKitchens(e.target.value)}
                    className="input select"
                  >
                    {[0, 1, 2, 3].map(n => (
                      <option key={n} value={n}>{n}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    🚽 {language === 'uz' ? "Tualet" : language === 'ru' ? "Туалет" : "Toilet"}
                  </label>
                  <select 
                    value={toilets}
                    onChange={(e) => setToilets(e.target.value)}
                    className="input select"
                  >
                    {[0, 1, 2, 3, 4].map(n => (
                      <option key={n} value={n}>{n}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    🏠 {language === 'uz' ? "Qavatlar soni" : language === 'ru' ? "Количество этажей" : "Number of floors"}
                  </label>
                  <select 
                    value={floors}
                    onChange={(e) => setFloors(e.target.value)}
                    className="input select"
                  >
                    {[1, 2, 3, 4].map(n => (
                      <option key={n} value={n}>{n}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <button 
              onClick={calculatePipes}
              className="btn btn-primary w-full"
            >
              {language === 'uz' ? "Hisoblash" : language === 'ru' ? "Рассчитать" : "Calculate"}
            </button>

            {/* Results */}
            {result && (
              <div className="mt-6 p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
                <h3 className="font-bold text-gray-900 mb-4">
                  {language === 'uz' ? "Natija" : language === 'ru' ? "Результат" : "Result"}
                </h3>
                
                <div className="space-y-3">
                  <div className="bg-white p-4 rounded-lg flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-red-500 rounded-full" />
                      <span className="text-gray-700">
                        {language === 'uz' ? "Issiq suv trubasi" : language === 'ru' ? "Труба горячей воды" : "Hot water pipe"}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-gray-900">{result.hotWater} m</span>
                      <p className="text-xs text-gray-500">{result.hotCost.toLocaleString()} {language === 'uz' ? "so'm" : "сум"}</p>
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-lg flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-blue-500 rounded-full" />
                      <span className="text-gray-700">
                        {language === 'uz' ? "Sovuq suv trubasi" : language === 'ru' ? "Труба холодной воды" : "Cold water pipe"}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-gray-900">{result.coldWater} m</span>
                      <p className="text-xs text-gray-500">{result.coldCost.toLocaleString()} {language === 'uz' ? "so'm" : "сум"}</p>
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-lg flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-gray-500 rounded-full" />
                      <span className="text-gray-700">
                        {language === 'uz' ? "Kanalizatsiya" : language === 'ru' ? "Канализация" : "Drainage"}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-gray-900">{result.drainage} m</span>
                      <p className="text-xs text-gray-500">{result.drainCost.toLocaleString()} {language === 'uz' ? "so'm" : "сум"}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 p-4 bg-white rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-700">
                      {language === 'uz' ? "Jami trubalar" : language === 'ru' ? "Всего труб" : "Total pipes"}
                    </span>
                    <span className="text-xl font-bold text-primary-600">{result.total} m</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-700">
                      {language === 'uz' ? "Fittinglar (taxminan)" : language === 'ru' ? "Фитинги (примерно)" : "Fittings (approx.)"}
                    </span>
                    <span className="font-medium text-gray-900">~{result.fittingsEstimate} {language === 'uz' ? "ta" : "шт"}</span>
                  </div>
                  <div className="border-t pt-2 mt-2 flex justify-between items-center">
                    <span className="font-medium text-gray-900">
                      {language === 'uz' ? "Taxminiy narx" : language === 'ru' ? "Примерная стоимость" : "Estimated cost"}
                    </span>
                    <span className="text-xl font-bold text-primary-600">
                      {result.totalCost.toLocaleString()} {language === 'uz' ? "so'm" : "сум"}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-gray-500 mt-3 text-center">
                  * {language === 'uz' ? "Narxlar taxminiy. Haqiqiy narxlar bozor holatiga qarab farq qilishi mumkin." 
                      : language === 'ru' ? "Цены приблизительные. Реальные цены могут отличаться." 
                      : "Prices are approximate. Actual prices may vary."}
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
