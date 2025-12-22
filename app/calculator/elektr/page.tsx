'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export default function ElectricalCalculatorPage() {
  const [rooms, setRooms] = useState([
    { name: 'Yashash xonasi', outlets: 6, switches: 3, lights: 2 },
    { name: 'Yotoqxona', outlets: 4, switches: 2, lights: 1 },
    { name: 'Oshxona', outlets: 8, switches: 2, lights: 2 },
    { name: 'Hammom', outlets: 2, switches: 1, lights: 1 },
  ]);
  const [wireType, setWireType] = useState<'1.5' | '2.5' | '4'>('2.5');
  const [result, setResult] = useState<any>(null);
  const { language } = useLanguage();

  // Average wire lengths per component
  const wireLengths = {
    outlet: 8, // meters average from panel
    switch: 6,
    light: 10, // ceiling light
    reserve: 0.15 // 15% reserve
  };

  const updateRoom = (index: number, field: string, value: number) => {
    setRooms(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const addRoom = () => {
    setRooms(prev => [...prev, { name: `Xona ${prev.length + 1}`, outlets: 4, switches: 2, lights: 1 }]);
  };

  const removeRoom = (index: number) => {
    setRooms(prev => prev.filter((_, i) => i !== index));
  };

  const calculateWire = () => {
    let totalOutlets = 0;
    let totalSwitches = 0;
    let totalLights = 0;

    rooms.forEach(room => {
      totalOutlets += room.outlets;
      totalSwitches += room.switches;
      totalLights += room.lights;
    });

    const outletWire = totalOutlets * wireLengths.outlet;
    const switchWire = totalSwitches * wireLengths.switch;
    const lightWire = totalLights * wireLengths.light;

    const totalWire = outletWire + switchWire + lightWire;
    const withReserve = totalWire * (1 + wireLengths.reserve);

    // Wire prices per meter (approximate)
    const wirePrices = {
      '1.5': 5000,
      '2.5': 7500,
      '4': 12000
    };

    setResult({
      totalOutlets,
      totalSwitches,
      totalLights,
      outletWire: Math.ceil(outletWire),
      switchWire: Math.ceil(switchWire),
      lightWire: Math.ceil(lightWire),
      totalWire: Math.ceil(totalWire),
      withReserve: Math.ceil(withReserve),
      estimatedCost: Math.ceil(withReserve * wirePrices[wireType])
    });
  };

  return (
    <>
      <Header />
      
      <main className="max-w-[900px] mx-auto py-6 px-4 sm:px-6">
        <Breadcrumbs />

        <div className="card-static p-6 sm:p-8">
          <div className="text-center mb-8">
            <div className="text-4xl mb-3">⚡</div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              {language === 'uz' ? "Elektr sim kalkulyatori" : language === 'ru' ? "Калькулятор электропроводки" : "Electrical Wire Calculator"}
            </h1>
            <p className="text-gray-500 mt-2">
              {language === 'uz' ? "Uy uchun kerakli elektr simi uzunligini hisoblang" 
               : language === 'ru' ? "Рассчитайте длину провода для дома" 
               : "Calculate wire length needed for your home"}
            </p>
          </div>

          <div className="space-y-6">
            {/* Wire Type */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">
                {language === 'uz' ? "Sim turi" : language === 'ru' ? "Тип провода" : "Wire Type"}
              </h3>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { value: '1.5', label: '1.5 mm²', desc: language === 'uz' ? "Yoritish uchun" : language === 'ru' ? "Для освещения" : "For lighting" },
                  { value: '2.5', label: '2.5 mm²', desc: language === 'uz' ? "Rozetkalar uchun" : language === 'ru' ? "Для розеток" : "For outlets" },
                  { value: '4', label: '4 mm²', desc: language === 'uz' ? "Kuchli uskunalar" : language === 'ru' ? "Для мощных приборов" : "For heavy appliances" }
                ].map(option => (
                  <button
                    key={option.value}
                    onClick={() => setWireType(option.value as any)}
                    className={`p-4 rounded-xl border-2 transition-colors ${
                      wireType === option.value 
                        ? 'border-primary-500 bg-primary-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <p className="font-bold text-gray-900">{option.label}</p>
                    <p className="text-xs text-gray-500 mt-1">{option.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Rooms */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-900">
                  {language === 'uz' ? "Xonalar" : language === 'ru' ? "Комнаты" : "Rooms"}
                </h3>
                <button onClick={addRoom} className="text-sm text-primary-600 hover:text-primary-700">
                  + {language === 'uz' ? "Xona qo'shish" : language === 'ru' ? "Добавить комнату" : "Add room"}
                </button>
              </div>

              <div className="space-y-3">
                {rooms.map((room, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center justify-between mb-3">
                      <input 
                        type="text"
                        value={room.name}
                        onChange={(e) => {
                          const updated = [...rooms];
                          updated[index].name = e.target.value;
                          setRooms(updated);
                        }}
                        className="font-medium bg-transparent border-none focus:ring-0 p-0"
                      />
                      {rooms.length > 1 && (
                        <button 
                          onClick={() => removeRoom(index)}
                          className="text-red-500 hover:text-red-600 text-sm"
                        >
                          {language === 'uz' ? "O'chirish" : language === 'ru' ? "Удалить" : "Remove"}
                        </button>
                      )}
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">
                          🔌 {language === 'uz' ? "Rozetkalar" : language === 'ru' ? "Розетки" : "Outlets"}
                        </label>
                        <input 
                          type="number"
                          value={room.outlets}
                          onChange={(e) => updateRoom(index, 'outlets', parseInt(e.target.value) || 0)}
                          min="0"
                          className="input !py-2"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">
                          🔘 {language === 'uz' ? "Vyklyuchatel" : language === 'ru' ? "Выключатели" : "Switches"}
                        </label>
                        <input 
                          type="number"
                          value={room.switches}
                          onChange={(e) => updateRoom(index, 'switches', parseInt(e.target.value) || 0)}
                          min="0"
                          className="input !py-2"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">
                          💡 {language === 'uz' ? "Chiroqlar" : language === 'ru' ? "Светильники" : "Lights"}
                        </label>
                        <input 
                          type="number"
                          value={room.lights}
                          onChange={(e) => updateRoom(index, 'lights', parseInt(e.target.value) || 0)}
                          min="0"
                          className="input !py-2"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button 
              onClick={calculateWire}
              className="btn btn-primary w-full"
            >
              {language === 'uz' ? "Hisoblash" : language === 'ru' ? "Рассчитать" : "Calculate"}
            </button>

            {/* Results */}
            {result && (
              <div className="mt-6 p-6 bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl">
                <h3 className="font-bold text-gray-900 mb-4">
                  {language === 'uz' ? "Natija" : language === 'ru' ? "Результат" : "Result"}
                </h3>
                
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="bg-white p-3 rounded-lg text-center">
                    <p className="text-2xl">🔌</p>
                    <p className="text-lg font-bold text-gray-900">{result.totalOutlets}</p>
                    <p className="text-xs text-gray-500">{language === 'uz' ? "Rozetkalar" : language === 'ru' ? "Розеток" : "Outlets"}</p>
                  </div>
                  <div className="bg-white p-3 rounded-lg text-center">
                    <p className="text-2xl">🔘</p>
                    <p className="text-lg font-bold text-gray-900">{result.totalSwitches}</p>
                    <p className="text-xs text-gray-500">{language === 'uz' ? "Vyklyuchatel" : language === 'ru' ? "Выключателей" : "Switches"}</p>
                  </div>
                  <div className="bg-white p-3 rounded-lg text-center">
                    <p className="text-2xl">💡</p>
                    <p className="text-lg font-bold text-gray-900">{result.totalLights}</p>
                    <p className="text-xs text-gray-500">{language === 'uz' ? "Chiroqlar" : language === 'ru' ? "Светильников" : "Lights"}</p>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">{language === 'uz' ? "Rozetkalar uchun" : language === 'ru' ? "Для розеток" : "For outlets"}:</span>
                    <span className="font-medium">{result.outletWire} m</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">{language === 'uz' ? "Vyklyuchatel uchun" : language === 'ru' ? "Для выключателей" : "For switches"}:</span>
                    <span className="font-medium">{result.switchWire} m</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">{language === 'uz' ? "Yoritish uchun" : language === 'ru' ? "Для освещения" : "For lighting"}:</span>
                    <span className="font-medium">{result.lightWire} m</span>
                  </div>
                  <div className="border-t pt-2 mt-2 flex justify-between">
                    <span className="text-gray-700 font-medium">{language === 'uz' ? "Jami" : language === 'ru' ? "Всего" : "Total"}:</span>
                    <span className="font-bold">{result.totalWire} m</span>
                  </div>
                </div>

                <div className="mt-4 p-4 bg-white rounded-lg text-center">
                  <p className="text-sm text-gray-500">
                    {language === 'uz' ? "Jami (15% zaxira bilan)" : language === 'ru' ? "Всего (с запасом 15%)" : "Total (with 15% reserve)"}
                  </p>
                  <p className="text-3xl font-bold text-primary-600">{result.withReserve} m</p>
                  <p className="text-sm text-gray-500 mt-2">
                    ≈ {result.estimatedCost.toLocaleString()} {language === 'uz' ? "so'm" : "сум"}
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
