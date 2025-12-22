'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';

export default function GishtCalculatorPage() {
  const [length, setLength] = useState('');
  const [height, setHeight] = useState('');
  const [brickLength, setBrickLength] = useState('250');
  const [brickHeight, setBrickHeight] = useState('65');
  const [mortarJoint, setMortarJoint] = useState('10');
  const [result, setResult] = useState<{
    wallArea: number;
    bricksHorizontal: number;
    bricksVertical: number;
    totalBricks: number;
    withWaste: number;
  } | null>(null);

  const calculateBricks = () => {
    const l = parseFloat(length);
    const h = parseFloat(height);
    const bl = parseFloat(brickLength);
    const bh = parseFloat(brickHeight);
    const mj = parseFloat(mortarJoint);

    if (isNaN(l) || isNaN(h) || isNaN(bl) || isNaN(bh) || l <= 0 || h <= 0 || bl <= 0 || bh <= 0) {
      alert("Iltimos barcha maydonlarni to'g'ri to'ldiring!");
      return;
    }

    // Convert meters to millimeters
    const wallLengthMM = l * 1000;
    const wallHeightMM = h * 1000;

    // Calculate number of bricks (including mortar joints)
    const brickWithMortarLength = bl + mj; // brick length + mortar joint
    const brickWithMortarHeight = bh + mj; // brick height + mortar joint

    const bricksHorizontal = Math.ceil(wallLengthMM / brickWithMortarLength);
    const bricksVertical = Math.ceil(wallHeightMM / brickWithMortarHeight);
    const totalBricks = bricksHorizontal * bricksVertical;

    // Add 5% waste factor
    const withWaste = Math.ceil(totalBricks * 1.05);

    // Wall area in m²
    const wallArea = l * h;

    setResult({
      wallArea,
      bricksHorizontal,
      bricksVertical,
      totalBricks,
      withWaste
    });
  };

  return (
    <>
      <Header />
      
      <main className="max-w-[800px] mx-auto py-6 px-4 sm:px-6">
        <Breadcrumbs />

        <div className="card-static p-6 sm:p-8">
          <div className="text-center mb-8">
            <div className="text-4xl mb-3">🧱</div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              G&apos;isht Kalkulyatori
            </h1>
            <p className="text-gray-500 mt-2">
              Devor uchun kerakli g&apos;ishtlar sonini hisoblang
            </p>
          </div>

          <div className="space-y-6">
            {/* Wall Dimensions */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Devor o&apos;lchamlari</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Uzunligi (m)</label>
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
                  <label className="block text-sm text-gray-600 mb-1">Balandligi (m)</label>
                  <input 
                    type="number" 
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    placeholder="2.5"
                    min="0"
                    step="0.01"
                    className="input"
                  />
                </div>
              </div>
            </div>

            {/* Brick Dimensions */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">G&apos;isht o&apos;lchamlari</h3>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Uzunligi (mm)</label>
                  <input 
                    type="number" 
                    value={brickLength}
                    onChange={(e) => setBrickLength(e.target.value)}
                    placeholder="250"
                    min="0"
                    step="1"
                    className="input"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Balandligi (mm)</label>
                  <input 
                    type="number" 
                    value={brickHeight}
                    onChange={(e) => setBrickHeight(e.target.value)}
                    placeholder="65"
                    min="0"
                    step="1"
                    className="input"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Chok (mm)</label>
                  <input 
                    type="number" 
                    value={mortarJoint}
                    onChange={(e) => setMortarJoint(e.target.value)}
                    placeholder="10"
                    min="0"
                    step="1"
                    className="input"
                  />
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                💡 Standart g&apos;isht: 250×120×65 mm, chok: 10 mm
              </p>
            </div>

            <button 
              onClick={calculateBricks}
              className="btn btn-primary w-full"
            >
              Hisoblash
            </button>

            {/* Results */}
            {result && (
              <div className="mt-6 p-6 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl">
                <h3 className="font-bold text-gray-900 mb-4">Natija</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-lg">
                    <p className="text-sm text-gray-500">Devor maydoni</p>
                    <p className="text-xl font-bold text-gray-900">{result.wallArea.toFixed(2)} m²</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <p className="text-sm text-gray-500">Gorizontal qator</p>
                    <p className="text-xl font-bold text-gray-900">{result.bricksHorizontal} ta</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <p className="text-sm text-gray-500">Vertikal qator</p>
                    <p className="text-xl font-bold text-gray-900">{result.bricksVertical} ta</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <p className="text-sm text-gray-500">Jami g&apos;ishtlar</p>
                    <p className="text-xl font-bold text-gray-900">{result.totalBricks} ta</p>
                  </div>
                </div>
                <div className="mt-4 p-4 bg-white rounded-lg text-center">
                  <p className="text-sm text-gray-500">Zaxira bilan (+5%)</p>
                  <p className="text-3xl font-bold text-primary-600">{result.withWaste} ta</p>
                </div>
                <p className="text-xs text-gray-500 mt-3 text-center">
                  * Hisob bir qatlamli devor uchun. Eshik va derazalar hisobga olinmagan.
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
