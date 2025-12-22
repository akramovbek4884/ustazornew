'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import { courses } from '@/lib/data';
import { useLanguage } from '@/lib/i18n/LanguageContext';

// Course metadata (simulated)
const courseMetadata: Record<string, { price: string; priceRu: string; priceEn: string; duration: string; durationRu: string; durationEn: string; level: string; levelRu: string; levelEn: string; lessons: number; isFree: boolean }> = {
  '1': { price: 'Bepul', priceRu: 'Бесплатно', priceEn: 'Free', duration: '3 soat', durationRu: '3 часа', durationEn: '3 hours', level: "Boshlang'ich", levelRu: 'Начальный', levelEn: 'Beginner', lessons: 8, isFree: true },
  '2': { price: '150,000 so\'m', priceRu: '150 000 сум', priceEn: '$15', duration: '4 soat', durationRu: '4 часа', durationEn: '4 hours', level: "O'rta", levelRu: 'Средний', levelEn: 'Intermediate', lessons: 12, isFree: false },
  '3': { price: 'Bepul', priceRu: 'Бесплатно', priceEn: 'Free', duration: '2 soat', durationRu: '2 часа', durationEn: '2 hours', level: "Boshlang'ich", levelRu: 'Начальный', levelEn: 'Beginner', lessons: 6, isFree: true },
  '4': { price: '200,000 so\'m', priceRu: '200 000 сум', priceEn: '$20', duration: '5 soat', durationRu: '5 часов', durationEn: '5 hours', level: 'Professional', levelRu: 'Профессиональный', levelEn: 'Professional', lessons: 15, isFree: false },
  '5': { price: '100,000 so\'m', priceRu: '100 000 сум', priceEn: '$10', duration: '3 soat', durationRu: '3 часа', durationEn: '3 hours', level: "O'rta", levelRu: 'Средний', levelEn: 'Intermediate', lessons: 10, isFree: false },
  '6': { price: 'Bepul', priceRu: 'Бесплатно', priceEn: 'Free', duration: '4 soat', durationRu: '4 часа', durationEn: '4 hours', level: "Boshlang'ich", levelRu: 'Начальный', levelEn: 'Beginner', lessons: 12, isFree: true },
  '7': { price: '180,000 so\'m', priceRu: '180 000 сум', priceEn: '$18', duration: '6 soat', durationRu: '6 часов', durationEn: '6 hours', level: 'Professional', levelRu: 'Профессиональный', levelEn: 'Professional', lessons: 18, isFree: false },
  '8': { price: '120,000 so\'m', priceRu: '120 000 сум', priceEn: '$12', duration: '3 soat', durationRu: '3 часа', durationEn: '3 hours', level: "O'rta", levelRu: 'Средний', levelEn: 'Intermediate', lessons: 9, isFree: false },
};

export default function KurslarPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const { t, language } = useLanguage();

  // Filter options with translations
  const categories = [
    { value: 'all', label: t.courses.all },
    { value: 'welding', label: t.home.categories.welding },
    { value: 'plumbing', label: t.home.categories.plumbing },
    { value: 'electrical', label: t.home.categories.electrical },
    { value: 'construction', label: t.home.categories.construction },
  ];

  const levels = [
    { value: 'all', label: t.courses.all },
    { value: 'beginner', label: t.courses.beginner },
    { value: 'intermediate', label: t.courses.intermediate },
    { value: 'professional', label: t.courses.professional },
  ];

  return (
    <>
      <Header />

      <main id="main-content" className="max-w-[1200px] mx-auto py-6 px-4 sm:px-6">
        <Breadcrumbs />

        {/* Page Header */}
        <section className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                {t.courses.title}
              </h1>
              <p className="text-gray-500 max-w-xl">
                {t.courses.description}
              </p>
            </div>
            <Link
              href="/sertifikat"
              className="btn btn-outline flex-shrink-0"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                <path fillRule="evenodd" d="M1 6a3 3 0 013-3h12a3 3 0 013 3v8a3 3 0 01-3 3H4a3 3 0 01-3-3V6zm4 1.5a2 2 0 114 0 2 2 0 01-4 0zm2 3a4 4 0 00-3.665 2.395.75.75 0 00.416 1A8.98 8.98 0 007 14.5a8.98 8.98 0 003.249-.604.75.75 0 00.416-1.001A4.001 4.001 0 007 10.5zm5-3.75a.75.75 0 01.75-.75h2.5a.75.75 0 010 1.5h-2.5a.75.75 0 01-.75-.75zm0 6.5a.75.75 0 01.75-.75h2.5a.75.75 0 010 1.5h-2.5a.75.75 0 01-.75-.75zm.75-4a.75.75 0 000 1.5h2.5a.75.75 0 000-1.5h-2.5z" clipRule="evenodd" />
              </svg>
              {t.courses.getCertificate}
            </Link>
          </div>
        </section>

        {/* Filters */}
        <section className="mb-6">
          <div className="card-static p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Category Filter */}
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">{t.courses.category}</label>
                <div className="flex flex-wrap gap-2">
                  {categories.map(cat => (
                    <button
                      key={cat.value}
                      onClick={() => setSelectedCategory(cat.value)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${selectedCategory === cat.value
                          ? 'bg-primary-500 text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Level Filter */}
              <div className="sm:w-48">
                <label className="block text-sm font-medium text-gray-700 mb-2">{t.courses.level}</label>
                <select
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(e.target.value)}
                  className="input select"
                >
                  {levels.map(level => (
                    <option key={level.value} value={level.value}>{level.label}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* Courses Grid */}
        <section className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-gray-500">{courses.length} {t.courses.foundCourses}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {courses.map(course => {
              const meta = courseMetadata[course.id] || {
                price: 'Bepul',
                priceRu: 'Бесплатно',
                priceEn: 'Free',
                duration: '2 soat',
                durationRu: '2 часа',
                durationEn: '2 hours',
                level: "Boshlang'ich",
                levelRu: 'Начальный',
                levelEn: 'Beginner',
                lessons: 5,
                isFree: true
              };

              const displayPrice = language === 'ru' ? meta.priceRu : language === 'en' ? meta.priceEn : meta.price;
              const displayDuration = language === 'ru' ? meta.durationRu : language === 'en' ? meta.durationEn : meta.duration;
              const displayLevel = language === 'ru' ? meta.levelRu : language === 'en' ? meta.levelEn : meta.level;

              return (
                <div key={course.id} className="card overflow-hidden group">
                  {/* Thumbnail */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
                    <Image
                      src={course.thumbnail}
                      alt={course.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {/* Price Badge */}
                    <div className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold ${meta.isFree
                        ? 'bg-green-500 text-white'
                        : 'bg-white text-gray-900 shadow-md'
                      }`}>
                      {displayPrice}
                    </div>
                    {/* Duration Badge */}
                    <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/70 text-white text-xs rounded">
                      {displayDuration}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
                      {course.title}
                    </h3>

                    {/* Metadata */}
                    <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                      <span className="flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-13a.75.75 0 00-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 000-1.5h-3.25V5z" clipRule="evenodd" />
                        </svg>
                        {meta.lessons} {t.courses.lessons}
                      </span>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${meta.level === "Boshlang'ich"
                          ? 'bg-green-50 text-green-600'
                          : meta.level === "O'rta"
                            ? 'bg-amber-50 text-amber-600'
                            : 'bg-purple-50 text-purple-600'
                        }`}>
                        {displayLevel}
                      </span>
                    </div>

                    {/* Instructor */}
                    <div className="flex items-center gap-2 mb-4 pb-4 border-b border-gray-100">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center">
                        <span className="text-white text-xs font-semibold">U</span>
                      </div>
                      <span className="text-sm text-gray-600">Usta Zo&apos;r</span>
                    </div>

                    {/* Action */}
                    <Link
                      href={course.href}
                      className="btn btn-primary w-full"
                    >
                      {meta.isFree ? t.courses.startCourse : t.courses.buyCourse}
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Certificate CTA */}
        <section>
          <div className="card-static p-6 sm:p-8 bg-gradient-to-r from-secondary-50 to-primary-50 border-0">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="w-20 h-20 bg-white rounded-2xl shadow-lg flex items-center justify-center flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10 text-primary-500">
                  <path fillRule="evenodd" d="M5.166 2.621v.858c-1.035.148-2.059.33-3.071.543a.75.75 0 00-.584.859 6.753 6.753 0 006.138 5.6 6.73 6.73 0 002.743 1.346A6.707 6.707 0 019.279 15H8.54c-1.036 0-1.875.84-1.875 1.875V19.5h-.75a2.25 2.25 0 00-2.25 2.25c0 .414.336.75.75.75h15a.75.75 0 00.75-.75 2.25 2.25 0 00-2.25-2.25h-.75v-2.625c0-1.036-.84-1.875-1.875-1.875h-.739a6.706 6.706 0 01-1.112-3.173 6.73 6.73 0 002.743-1.347 6.753 6.753 0 006.139-5.6.75.75 0 00-.585-.858 47.077 47.077 0 00-3.07-.543V2.62a.75.75 0 00-.658-.744 49.22 49.22 0 00-6.093-.377c-2.063 0-4.096.128-6.093.377a.75.75 0 00-.657.744zm0 2.629c0 1.196.312 2.32.857 3.294A5.266 5.266 0 013.16 5.337a45.6 45.6 0 012.006-.343v.256zm13.5 0v-.256c.674.1 1.343.214 2.006.343a5.265 5.265 0 01-2.863 3.207 6.72 6.72 0 00.857-3.294z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="flex-1 text-center sm:text-left">
                <h2 className="text-xl font-bold text-gray-900 mb-2">{t.courses.certificateSection.title}</h2>
                <p className="text-gray-600 mb-4">
                  {t.courses.certificateSection.desc}
                </p>
                <Link href="/sertifikat" className="btn btn-primary">
                  {t.courses.certificateSection.takeTest}
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
