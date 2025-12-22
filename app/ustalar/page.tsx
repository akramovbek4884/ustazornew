'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import { masters, regions, professions, getCitiesByRegion } from '@/lib/data';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export default function UstallarPage() {
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedProfession, setSelectedProfession] = useState('');
  const [minRating, setMinRating] = useState(0);
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [sortBy, setSortBy] = useState('rating');
  const { t, language } = useLanguage();

  const cities = selectedRegion ? getCitiesByRegion(selectedRegion) : [];

  const filteredMasters = useMemo(() => {
    let result = masters.filter(m => {
      if (selectedRegion && m.region !== selectedRegion) return false;
      if (selectedCity && m.city !== selectedCity) return false;
      if (selectedProfession && m.profession !== selectedProfession) return false;
      if (minRating && (m.rating || 0) < minRating) return false;
      if (verifiedOnly && !m.isVerified) return false;
      return true;
    });

    // Sort
    if (sortBy === 'rating') {
      result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else if (sortBy === 'reviews') {
      result.sort((a, b) => (b.reviewCount || 0) - (a.reviewCount || 0));
    } else if (sortBy === 'experience') {
      result.sort((a, b) => (b.experience || 0) - (a.experience || 0));
    }

    return result;
  }, [selectedRegion, selectedCity, selectedProfession, minRating, verifiedOnly, sortBy]);

  const clearFilters = () => {
    setSelectedRegion('');
    setSelectedCity('');
    setSelectedProfession('');
    setMinRating(0);
    setVerifiedOnly(false);
  };

  return (
    <>
      <Header />
      
      <main className="max-w-[1400px] mx-auto py-6 px-4 sm:px-6">
        <Breadcrumbs />

        {/* Hero */}
        <section className="mb-8">
          <div className="bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl p-6 sm:p-10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="relative z-10 max-w-2xl">
              <h1 className="text-2xl sm:text-4xl font-bold text-white mb-3">
                {language === 'uz' ? "Ustalarni toping" : language === 'ru' ? "Найти мастеров" : "Find Masters"}
              </h1>
              <p className="text-white/90 text-lg">
                {language === 'uz' ? "500+ malakali ustalar sizning xizmatingizda" : language === 'ru' ? "500+ квалифицированных мастеров к вашим услугам" : "500+ qualified masters at your service"}
              </p>
            </div>
          </div>
        </section>

        {/* Filters */}
        <section className="card-static p-5 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <select 
                value={selectedRegion}
                onChange={(e) => { setSelectedRegion(e.target.value); setSelectedCity(''); }}
                className="input select"
              >
                <option value="">{language === 'uz' ? "Barcha viloyatlar" : language === 'ru' ? "Все регионы" : "All regions"}</option>
                {regions.map(r => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>

              <select 
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="input select"
                disabled={!selectedRegion}
              >
                <option value="">{language === 'uz' ? "Barcha tumanlar" : language === 'ru' ? "Все районы" : "All districts"}</option>
                {cities.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>

              <select 
                value={selectedProfession}
                onChange={(e) => setSelectedProfession(e.target.value)}
                className="input select"
              >
                <option value="">{language === 'uz' ? "Barcha kasblar" : language === 'ru' ? "Все профессии" : "All professions"}</option>
                {professions.map(p => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>

              <select 
                value={minRating}
                onChange={(e) => setMinRating(Number(e.target.value))}
                className="input select"
              >
                <option value={0}>{language === 'uz' ? "Istalgan reyting" : language === 'ru' ? "Любой рейтинг" : "Any rating"}</option>
                <option value={4}>4+ ⭐</option>
                <option value={4.5}>4.5+ ⭐</option>
                <option value={4.8}>4.8+ ⭐</option>
              </select>
            </div>

            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={verifiedOnly}
                  onChange={(e) => setVerifiedOnly(e.target.checked)}
                  className="w-4 h-4 text-primary-600 rounded"
                />
                <span className="text-sm text-gray-700">
                  {language === 'uz' ? "Tasdiqlangan" : language === 'ru' ? "Проверенные" : "Verified"} ✓
                </span>
              </label>

              <button 
                onClick={clearFilters}
                className="text-sm text-primary-600 hover:text-primary-700"
              >
                {language === 'uz' ? "Tozalash" : language === 'ru' ? "Сбросить" : "Clear"}
              </button>
            </div>
          </div>

          {/* Sort */}
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
            <span className="text-sm text-gray-500">
              {filteredMasters.length} {language === 'uz' ? "ta usta topildi" : language === 'ru' ? "мастеров найдено" : "masters found"}
            </span>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">{language === 'uz' ? "Saralash:" : language === 'ru' ? "Сортировка:" : "Sort by:"}</span>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="input select !py-1.5 !text-sm !w-auto"
              >
                <option value="rating">{language === 'uz' ? "Reyting bo'yicha" : language === 'ru' ? "По рейтингу" : "By rating"}</option>
                <option value="reviews">{language === 'uz' ? "Sharhlar soni" : language === 'ru' ? "По отзывам" : "By reviews"}</option>
                <option value="experience">{language === 'uz' ? "Tajriba" : language === 'ru' ? "По опыту" : "By experience"}</option>
              </select>
            </div>
          </div>
        </section>

        {/* Masters Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredMasters.map(master => (
            <Link 
              key={master.id}
              href={`/ustalar/${master.id}`}
              className="card p-5 group"
            >
              {/* Header */}
              <div className="flex items-start gap-4">
                <div className="relative">
                  <Image 
                    src={master.avatar} 
                    alt={master.name}
                    width={64}
                    height={64}
                    className="w-16 h-16 rounded-full object-cover ring-2 ring-gray-100"
                  />
                  {master.isVerified && (
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="white" className="w-4 h-4">
                        <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors truncate">
                    {master.name}
                  </h3>
                  <p className="text-sm text-primary-600 font-medium">{master.profession}</p>
                  <p className="text-xs text-gray-500 mt-1">{master.region}, {master.city}</p>
                </div>
              </div>

              {/* Stats */}
              <div className="flex items-center gap-4 mt-4 pt-4 border-t border-gray-100">
                <div className="flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-amber-400">
                    <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm font-semibold text-gray-900">{master.rating || '—'}</span>
                </div>
                <span className="text-xs text-gray-400">|</span>
                <span className="text-sm text-gray-500">{master.reviewCount || 0} {language === 'uz' ? "sharh" : language === 'ru' ? "отзывов" : "reviews"}</span>
                {master.experience && (
                  <>
                    <span className="text-xs text-gray-400">|</span>
                    <span className="text-sm text-gray-500">{master.experience} {language === 'uz' ? "yil" : language === 'ru' ? "лет" : "years"}</span>
                  </>
                )}
              </div>

              {/* Badges */}
              {master.badges && master.badges.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-3">
                  {master.badges.slice(0, 2).map(badge => (
                    <span 
                      key={badge.id}
                      className="inline-flex items-center gap-1 px-2 py-0.5 bg-amber-50 text-amber-700 text-xs rounded-full"
                    >
                      {badge.icon} {badge.name}
                    </span>
                  ))}
                </div>
              )}

              {/* Response Time */}
              {master.responseTime && (
                <div className="flex items-center gap-1.5 mt-3 text-xs text-green-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  {language === 'uz' ? "Javob:" : language === 'ru' ? "Ответ:" : "Response:"} {master.responseTime}
                </div>
              )}
            </Link>
          ))}
        </section>

        {filteredMasters.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">😔</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {language === 'uz' ? "Usta topilmadi" : language === 'ru' ? "Мастера не найдены" : "No masters found"}
            </h3>
            <p className="text-gray-500 mb-4">
              {language === 'uz' ? "Filtrlarni o'zgartirib ko'ring" : language === 'ru' ? "Попробуйте изменить фильтры" : "Try changing the filters"}
            </p>
            <button onClick={clearFilters} className="btn btn-primary">
              {language === 'uz' ? "Filtrlarni tozalash" : language === 'ru' ? "Сбросить фильтры" : "Clear filters"}
            </button>
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}
