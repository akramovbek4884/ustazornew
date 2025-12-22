'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import { mockJobs, professions, regions } from '@/lib/data';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export default function JobsPage() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedUrgency, setSelectedUrgency] = useState('');
  const [showPostModal, setShowPostModal] = useState(false);
  const { language } = useLanguage();

  const filteredJobs = useMemo(() => {
    return mockJobs.filter(job => {
      if (selectedCategory && job.category !== selectedCategory) return false;
      if (selectedRegion && job.location.region !== selectedRegion) return false;
      if (selectedUrgency && job.urgency !== selectedUrgency) return false;
      if (job.status !== 'open') return false;
      return true;
    });
  }, [selectedCategory, selectedRegion, selectedUrgency]);

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'emergency': return 'bg-red-100 text-red-700';
      case 'high': return 'bg-orange-100 text-orange-700';
      case 'medium': return 'bg-amber-100 text-amber-700';
      case 'low': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getUrgencyText = (urgency: string) => {
    const texts: Record<string, Record<string, string>> = {
      emergency: { uz: 'Shoshilinch!', ru: 'Срочно!', en: 'Emergency!' },
      high: { uz: 'Yuqori', ru: 'Высокий', en: 'High' },
      medium: { uz: "O'rtacha", ru: 'Средний', en: 'Medium' },
      low: { uz: 'Past', ru: 'Низкий', en: 'Low' }
    };
    return texts[urgency]?.[language] || urgency;
  };

  return (
    <>
      <Header />
      
      <main className="max-w-[1400px] mx-auto py-6 px-4 sm:px-6">
        <Breadcrumbs />

        {/* Hero */}
        <section className="mb-8">
          <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl p-6 sm:p-10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-4xl font-bold text-white mb-3">
                  {language === 'uz' ? "Ish e'lonlari" : language === 'ru' ? "Объявления о работе" : "Job Board"}
                </h1>
                <p className="text-white/90 text-lg">
                  {language === 'uz' ? "Mijozlarning so'rovlarini toping va murojaat qiling" : language === 'ru' ? "Найдите заявки клиентов и откликнитесь" : "Find client requests and apply"}
                </p>
              </div>
              <button 
                onClick={() => setShowPostModal(true)}
                className="btn bg-white text-blue-600 hover:bg-blue-50"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                  <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                </svg>
                {language === 'uz' ? "E'lon joylash" : language === 'ru' ? "Разместить объявление" : "Post a Job"}
              </button>
            </div>
          </div>
        </section>

        {/* Filters */}
        <section className="card-static p-5 mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <select 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="input select"
            >
              <option value="">{language === 'uz' ? "Barcha kasblar" : language === 'ru' ? "Все профессии" : "All professions"}</option>
              {professions.map(p => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>

            <select 
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="input select"
            >
              <option value="">{language === 'uz' ? "Barcha viloyatlar" : language === 'ru' ? "Все регионы" : "All regions"}</option>
              {regions.map(r => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>

            <select 
              value={selectedUrgency}
              onChange={(e) => setSelectedUrgency(e.target.value)}
              className="input select"
            >
              <option value="">{language === 'uz' ? "Barcha shoshilinchlik" : language === 'ru' ? "Любая срочность" : "Any urgency"}</option>
              <option value="emergency">{language === 'uz' ? "Shoshilinch" : language === 'ru' ? "Срочно" : "Emergency"}</option>
              <option value="high">{language === 'uz' ? "Yuqori" : language === 'ru' ? "Высокий" : "High"}</option>
              <option value="medium">{language === 'uz' ? "O'rtacha" : language === 'ru' ? "Средний" : "Medium"}</option>
              <option value="low">{language === 'uz' ? "Past" : language === 'ru' ? "Низкий" : "Low"}</option>
            </select>
          </div>
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
            <span className="text-sm text-gray-500">
              {filteredJobs.length} {language === 'uz' ? "ta e'lon topildi" : language === 'ru' ? "объявлений найдено" : "jobs found"}
            </span>
          </div>
        </section>

        {/* Jobs List */}
        <section className="space-y-4">
          {filteredJobs.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">📋</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {language === 'uz' ? "E'lonlar topilmadi" : language === 'ru' ? "Объявления не найдены" : "No jobs found"}
              </h3>
              <p className="text-gray-500">
                {language === 'uz' ? "Filtrlarni o'zgartirib ko'ring" : language === 'ru' ? "Попробуйте изменить фильтры" : "Try changing filters"}
              </p>
            </div>
          ) : (
            filteredJobs.map(job => (
              <Link key={job.id} href={`/ishlar/${job.id}`} className="card p-5 block">
                <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-lg font-semibold text-gray-900 hover:text-primary-600 transition-colors">
                        {job.title}
                      </h3>
                      <span className={`text-xs px-2 py-1 rounded-full ${getUrgencyColor(job.urgency)}`}>
                        {getUrgencyText(job.urgency)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      📍 {job.location.region}, {job.location.city}
                      {job.location.address && ` • ${job.location.address}`}
                    </p>
                    <p className="text-gray-600 mt-3 line-clamp-2">{job.description}</p>
                    <div className="flex items-center gap-4 mt-4">
                      <span className="text-sm text-gray-500">
                        👤 {job.userName}
                      </span>
                      <span className="text-sm text-gray-500">
                        📅 {new Date(job.createdAt).toLocaleDateString('uz-UZ')}
                      </span>
                      {job.applicants && job.applicants.length > 0 && (
                        <span className="text-sm text-primary-600">
                          ✋ {job.applicants.length} {language === 'uz' ? "ta murojaat" : language === 'ru' ? "откликов" : "applications"}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold text-primary-600">
                      {job.budget.toLocaleString()} {language === 'uz' ? "so'm" : "сум"}
                    </div>
                    <div className="text-sm text-gray-500">
                      {job.budgetType === 'fixed' ? (language === 'uz' ? "Belgilangan" : language === 'ru' ? "Фиксировано" : "Fixed") 
                       : job.budgetType === 'hourly' ? (language === 'uz' ? "Soatiga" : language === 'ru' ? "Почасово" : "Hourly")
                       : (language === 'uz' ? "Kelishiladi" : language === 'ru' ? "Договорная" : "Negotiable")}
                    </div>
                    {job.deadline && (
                      <p className="text-xs text-gray-500 mt-2">
                        {language === 'uz' ? "Muddat:" : language === 'ru' ? "Срок:" : "Deadline:"} {job.deadline}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-100">
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                    {job.category}
                  </span>
                </div>
              </Link>
            ))
          )}
        </section>
      </main>

      <Footer />

      {/* Post Job Modal */}
      {showPostModal && (
        <div className="fixed inset-0 bg-black/50 z-[200] flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto animate-fadeIn">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">
                  {language === 'uz' ? "Yangi e'lon" : language === 'ru' ? "Новое объявление" : "New Job"}
                </h2>
                <button 
                  onClick={() => setShowPostModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>

              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    {language === 'uz' ? "Sarlavha" : language === 'ru' ? "Заголовок" : "Title"} *
                  </label>
                  <input type="text" className="input" placeholder={language === 'uz' ? "Masalan: Hovli devori qurish" : "e.g. Build a fence"} />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    {language === 'uz' ? "Tavsif" : language === 'ru' ? "Описание" : "Description"} *
                  </label>
                  <textarea rows={4} className="input resize-none" placeholder={language === 'uz' ? "Ish haqida batafsil yozing..." : "Describe the job in detail..."} />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      {language === 'uz' ? "Kasb" : language === 'ru' ? "Профессия" : "Category"} *
                    </label>
                    <select className="input select">
                      <option value="">{language === 'uz' ? "Tanlang" : language === 'ru' ? "Выберите" : "Select"}</option>
                      {professions.map(p => (
                        <option key={p} value={p}>{p}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      {language === 'uz' ? "Shoshilinchlik" : language === 'ru' ? "Срочность" : "Urgency"}
                    </label>
                    <select className="input select">
                      <option value="low">{language === 'uz' ? "Past" : language === 'ru' ? "Низкая" : "Low"}</option>
                      <option value="medium">{language === 'uz' ? "O'rtacha" : language === 'ru' ? "Средняя" : "Medium"}</option>
                      <option value="high">{language === 'uz' ? "Yuqori" : language === 'ru' ? "Высокая" : "High"}</option>
                      <option value="emergency">{language === 'uz' ? "Shoshilinch!" : language === 'ru' ? "Срочно!" : "Emergency!"}</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      {language === 'uz' ? "Byudjet" : language === 'ru' ? "Бюджет" : "Budget"} *
                    </label>
                    <input type="number" className="input" placeholder="0" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      {language === 'uz' ? "Turi" : language === 'ru' ? "Тип" : "Type"}
                    </label>
                    <select className="input select">
                      <option value="fixed">{language === 'uz' ? "Belgilangan" : language === 'ru' ? "Фиксировано" : "Fixed"}</option>
                      <option value="negotiable">{language === 'uz' ? "Kelishiladi" : language === 'ru' ? "Договорная" : "Negotiable"}</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    {language === 'uz' ? "Manzil" : language === 'ru' ? "Адрес" : "Location"} *
                  </label>
                  <input type="text" className="input" placeholder={language === 'uz' ? "To'liq manzil" : "Full address"} />
                </div>

                <button type="submit" className="btn btn-primary w-full">
                  {language === 'uz' ? "E'lonni joylash" : language === 'ru' ? "Разместить" : "Post Job"}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
