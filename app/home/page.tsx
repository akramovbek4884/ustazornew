'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MasterCard from '@/components/MasterCard';
import VideoCard from '@/components/VideoCard';
import VideoModal from '@/components/VideoModal';
import FilterChips from '@/components/FilterChips';
import { masters, regions, getCitiesByRegion, professions, videos } from '@/lib/data';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export default function HomePage() {
  const [region, setRegion] = useState('');
  const [city, setCity] = useState('');
  const [profession, setProfession] = useState('');
  const [modalVideo, setModalVideo] = useState<string | null>(null);
  const { t } = useLanguage();

  // Stats data with translations
  const stats = [
    { label: t.home.stats.masters, value: '500+', icon: '👷' },
    { label: t.home.stats.courses, value: '50+', icon: '📚' },
    { label: t.home.stats.users, value: '10K+', icon: '👥' },
    { label: t.home.stats.reviews, value: '2K+', icon: '⭐' },
  ];

  // Category quick links with translations
  const categories = [
    { label: t.home.categories.welding, icon: '🔧', href: '/darslar/svarka', color: 'bg-orange-500' },
    { label: t.home.categories.plumbing, icon: '🚿', href: '/darslar/santexnik', color: 'bg-blue-500' },
    { label: t.home.categories.electrical, icon: '⚡', href: '/darslar/elektrika', color: 'bg-yellow-500' },
    { label: t.home.categories.construction, icon: '🏗️', href: '/darslar/qurilish', color: 'bg-green-500' },
    { label: t.home.categories.drywall, icon: '🧱', href: '/darslar/gipsakarton', color: 'bg-purple-500' },
    { label: t.home.categories.roofing, icon: '🏠', href: '/darslar/tom', color: 'bg-red-500' },
  ];

  // Get cities based on selected region
  const cities = region ? getCitiesByRegion(region) : [];

  const filteredMasters = useMemo(() => {
    return masters.filter(m =>
      (!region || m.region === region) &&
      (!city || m.city === city) &&
      (!profession || m.profession === profession)
    );
  }, [region, city, profession]);

  const hasActiveFilters = region || city || profession;
  const showMasters = hasActiveFilters;

  const handleFilterRemove = (key: 'region' | 'city' | 'profession') => {
    if (key === 'region') setRegion('');
    if (key === 'city') setCity('');
    if (key === 'profession') setProfession('');
  };

  const handleFilterClear = () => {
    setRegion('');
    setCity('');
    setProfession('');
  };

  return (
    <>
      <Header />

      <main id="main-content" className="max-w-[1400px] mx-auto py-6 sm:py-8 px-4 sm:px-6">
        {/* Hero Section */}
        <section className="mb-8 sm:mb-12">
          <div className="bg-gradient-to-br from-primary-500 via-primary-600 to-secondary-600 rounded-2xl sm:rounded-3xl p-6 sm:p-10 md:p-12 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
            </div>

            <div className="relative z-10 max-w-2xl">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
                {t.home.heroTitle}
              </h1>
              <p className="text-lg sm:text-xl text-white/90 mb-6 sm:mb-8 leading-relaxed">
                {t.home.heroDesc}
              </p>

              <div className="flex flex-wrap gap-3 sm:gap-4">
                <Link
                  href="#search-section"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white text-primary-600 font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                    <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd" />
                  </svg>
                  {t.home.searchMasters}
                </Link>
                <Link
                  href="/kurslar"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white/20 text-white font-semibold rounded-xl backdrop-blur-sm hover:bg-white/30 transition-all"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                    <path d="M10 3.75a2 2 0 10-4 0 2 2 0 004 0zM17.25 4.5a.75.75 0 000-1.5h-5.5a.75.75 0 000 1.5h5.5zM5 3.75a.75.75 0 01-.75.75h-1.5a.75.75 0 010-1.5h1.5a.75.75 0 01.75.75zM4.25 17a.75.75 0 000-1.5h-1.5a.75.75 0 000 1.5h1.5zM17.25 17a.75.75 0 000-1.5h-5.5a.75.75 0 000 1.5h5.5zM9 10a.75.75 0 01-.75.75h-5.5a.75.75 0 010-1.5h5.5A.75.75 0 019 10zM17.25 10.75a.75.75 0 000-1.5h-1.5a.75.75 0 000 1.5h1.5zM14 10a2 2 0 10-4 0 2 2 0 004 0zM10 16.25a2 2 0 10-4 0 2 2 0 004 0z" />
                  </svg>
                  {t.home.viewCourses}
                </Link>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-4 right-4 sm:top-8 sm:right-8 w-20 h-20 sm:w-32 sm:h-32 bg-white/10 rounded-full blur-2xl" />
            <div className="absolute bottom-4 right-20 sm:bottom-8 sm:right-40 w-16 h-16 sm:w-24 sm:h-24 bg-secondary-400/20 rounded-full blur-xl" />
          </div>
        </section>

        {/* Trust Indicators / Stats */}
        <section className="mb-8 sm:mb-12">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="card-static p-4 sm:p-5 text-center hover:shadow-card-hover transition-shadow"
              >
                <div className="text-2xl sm:text-3xl mb-2">{stat.icon}</div>
                <div className="text-xl sm:text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Category Quick Links */}
        <section className="mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">
            {t.home.popularDirections}
          </h2>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 sm:gap-4">
            {categories.map((cat, i) => (
              <Link
                key={i}
                href={cat.href}
                className="card-static p-4 text-center hover:shadow-card-hover transition-all group"
              >
                <div className={`w-12 h-12 ${cat.color} rounded-xl flex items-center justify-center text-2xl mx-auto mb-2 group-hover:scale-110 transition-transform`}>
                  {cat.icon}
                </div>
                <span className="text-sm font-medium text-gray-700 group-hover:text-primary-600 transition-colors">
                  {cat.label}
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* Search Section */}
        <section id="search-section" className="mb-8 sm:mb-12 scroll-mt-24">
          <div className="card-static p-5 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                  {t.home.searchSection.title}
                </h2>
                <p className="text-gray-500 text-sm mt-1">
                  {t.home.searchSection.subtitle}
                </p>
              </div>
              {hasActiveFilters && (
                <div className="text-sm text-primary-600 font-medium">
                  {filteredMasters.length} {t.home.searchSection.foundCount}
                </div>
              )}
            </div>

            {/* Search Filters */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="relative">
                <select
                  value={region}
                  onChange={(e) => { setRegion(e.target.value); setCity(''); }}
                  className="input select"
                  aria-label="Viloyatni tanlang"
                >
                  <option value="">{t.home.searchSection.allRegions}</option>
                  {regions.map(r => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
              </div>

              <div className="relative">
                <select
                  value={city}
                  disabled={!region}
                  onChange={(e) => setCity(e.target.value)}
                  className="input select"
                  aria-label="Tumanni tanlang"
                >
                  <option value="">{t.home.searchSection.allDistricts}</option>
                  {cities.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div className="relative">
                <select
                  value={profession}
                  onChange={(e) => setProfession(e.target.value)}
                  className="input select"
                  aria-label="Kasbni tanlang"
                >
                  <option value="">{t.home.searchSection.allProfessions}</option>
                  {professions.map(p => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Filter Chips */}
            <FilterChips
              filters={{ region, city, profession }}
              onRemove={handleFilterRemove}
              onClear={handleFilterClear}
            />

            {/* Found Masters */}
            {showMasters && (
              <div className="mt-6">
                {filteredMasters.length > 0 ? (
                  <>
                    <div className="flex items-center gap-2 mb-4">
                      <span className="w-2 h-2 rounded-full bg-green-500" />
                      <h3 className="text-lg font-semibold text-gray-900">
                        {t.home.searchSection.foundMasters}
                      </h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {filteredMasters.map(master => (
                        <MasterCard key={master.id} master={master} />
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="empty-state py-12">
                    <div className="empty-state-icon">😔</div>
                    <h3 className="empty-state-title">{t.home.searchSection.noMasters}</h3>
                    <p className="empty-state-description">
                      {t.home.searchSection.noMastersDesc}
                    </p>
                    <button
                      onClick={handleFilterClear}
                      className="btn btn-outline mt-4"
                    >
                      {t.home.searchSection.clearFiltersBtn}
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>

        {/* Video Lessons Section */}
        <section>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                {t.home.videoSection.title}
              </h2>
              <p className="text-gray-500 text-sm mt-1">
                {t.home.videoSection.subtitle}
              </p>
            </div>
            <Link
              href="/kurslar"
              className="inline-flex items-center gap-1 text-primary-600 font-semibold hover:text-primary-700 transition-colors"
            >
              {t.home.videoSection.viewAll}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {videos.slice(0, 8).map(video => (
              <VideoCard
                key={video.id}
                video={video}
                onClick={() => setModalVideo(video.src)}
              />
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="mt-12 sm:mt-16">
          <div className="bg-gradient-to-r from-secondary-500 to-primary-600 rounded-2xl p-6 sm:p-10 text-center text-white">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">
              {t.home.ctaSection.title}
            </h2>
            <p className="text-white/90 max-w-xl mx-auto mb-6">
              {t.home.ctaSection.desc}
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/kurslar"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-primary-600 font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
              >
                {t.home.ctaSection.viewCourses}
              </Link>
              <Link
                href="/profil"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/20 text-white font-semibold rounded-xl backdrop-blur-sm hover:bg-white/30 transition-all"
              >
                {t.home.ctaSection.register}
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <VideoModal
        isOpen={!!modalVideo}
        videoSrc={modalVideo || ''}
        onClose={() => setModalVideo(null)}
      />
    </>
  );
}
