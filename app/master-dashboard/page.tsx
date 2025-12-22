'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import { mockBookings, mockReviews, mockJobs } from '@/lib/data';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { MasterStats } from '@/types';

export default function MasterDashboardPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'bookings' | 'jobs' | 'reviews' | 'earnings'>('overview');
  const { language } = useLanguage();

  const stats: MasterStats = {
    totalEarnings: 12500000,
    monthlyEarnings: 3200000,
    totalBookings: 234,
    completedBookings: 198,
    averageRating: 4.8,
    totalReviews: 156,
    profileViews: 1250,
    responseRate: 95
  };

  // Simulated bookings for this master
  const masterBookings = mockBookings;
  const pendingBookings = masterBookings.filter(b => b.status === 'pending');
  const masterReviews = mockReviews.filter(r => r.masterId === '1' || r.masterId === '6');
  const availableJobs = mockJobs.filter(j => j.status === 'open');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-amber-100 text-amber-700';
      case 'confirmed': return 'bg-blue-100 text-blue-700';
      case 'in_progress': return 'bg-purple-100 text-purple-700';
      case 'completed': return 'bg-green-100 text-green-700';
      case 'cancelled': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusText = (status: string) => {
    const texts: Record<string, Record<string, string>> = {
      pending: { uz: "Kutilmoqda", ru: "Ожидает", en: "Pending" },
      confirmed: { uz: "Tasdiqlandi", ru: "Подтверждено", en: "Confirmed" },
      in_progress: { uz: "Bajarilmoqda", ru: "В процессе", en: "In Progress" },
      completed: { uz: "Bajarildi", ru: "Выполнено", en: "Completed" },
      cancelled: { uz: "Bekor qilindi", ru: "Отменено", en: "Cancelled" }
    };
    return texts[status]?.[language] || status;
  };

  return (
    <>
      <Header />
      
      <main className="max-w-[1400px] mx-auto py-6 px-4 sm:px-6">
        <Breadcrumbs />

        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              {language === 'uz' ? "Usta Paneli" : language === 'ru' ? "Панель мастера" : "Master Dashboard"}
            </h1>
            <p className="text-gray-500 mt-1">
              {language === 'uz' ? "Buyurtmalar, sharhlar va daromadlarni boshqaring" : language === 'ru' ? "Управление заказами, отзывами и доходами" : "Manage bookings, reviews and earnings"}
            </p>
          </div>
          <Link href="/profil" className="btn btn-primary">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
              <path d="M5.433 13.917l1.262-3.155A4 4 0 017.58 9.42l6.92-6.918a2.121 2.121 0 013 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 01-.65-.65z" />
            </svg>
            {language === 'uz' ? "Profilni tahrirlash" : language === 'ru' ? "Редактировать профиль" : "Edit Profile"}
          </Link>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <div className="card-static p-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-green-600">
                  <path d="M12 7.5a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z" />
                  <path fillRule="evenodd" d="M1.5 4.875C1.5 3.839 2.34 3 3.375 3h17.25c1.035 0 1.875.84 1.875 1.875v9.75c0 1.036-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 011.5 14.625v-9.75zM8.25 9.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM18.75 9a.75.75 0 00-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 00.75-.75V9.75a.75.75 0 00-.75-.75h-.008zM4.5 9.75A.75.75 0 015.25 9h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H5.25a.75.75 0 01-.75-.75V9.75z" clipRule="evenodd" />
                  <path d="M2.25 18a.75.75 0 000 1.5c5.4 0 10.63.722 15.6 2.075 1.19.324 2.4-.558 2.4-1.82V18.75a.75.75 0 00-.75-.75H2.25z" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-500">{language === 'uz' ? "Oylik daromad" : language === 'ru' ? "Месячный доход" : "Monthly earnings"}</p>
                <p className="text-xl font-bold text-gray-900">{stats.monthlyEarnings.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="card-static p-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-blue-600">
                  <path fillRule="evenodd" d="M6.75 2.25A.75.75 0 017.5 3v1.5h9V3A.75.75 0 0118 3v1.5h.75a3 3 0 013 3v11.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V7.5a3 3 0 013-3H6V3a.75.75 0 01.75-.75zm13.5 9a1.5 1.5 0 00-1.5-1.5H5.25a1.5 1.5 0 00-1.5 1.5v7.5a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5v-7.5z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-500">{language === 'uz' ? "Jami buyurtmalar" : language === 'ru' ? "Всего заказов" : "Total bookings"}</p>
                <p className="text-xl font-bold text-gray-900">{stats.totalBookings}</p>
              </div>
            </div>
          </div>

          <div className="card-static p-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-amber-600">
                  <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-500">{language === 'uz' ? "O'rtacha reyting" : language === 'ru' ? "Средний рейтинг" : "Avg rating"}</p>
                <p className="text-xl font-bold text-gray-900">{stats.averageRating} ⭐</p>
              </div>
            </div>
          </div>

          <div className="card-static p-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-purple-600">
                  <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
                  <path fillRule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-500">{language === 'uz' ? "Profil ko'rishlari" : language === 'ru' ? "Просмотры профиля" : "Profile views"}</p>
                <p className="text-xl font-bold text-gray-900">{stats.profileViews}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 border-b border-gray-200 mb-6 overflow-x-auto">
          {[
            { id: 'overview', label: language === 'uz' ? "Umumiy" : language === 'ru' ? "Обзор" : "Overview", icon: '📊' },
            { id: 'bookings', label: language === 'uz' ? "Buyurtmalar" : language === 'ru' ? "Заказы" : "Bookings", icon: '📅', badge: pendingBookings.length },
            { id: 'jobs', label: language === 'uz' ? "Ish e'lonlari" : language === 'ru' ? "Вакансии" : "Jobs", icon: '💼', badge: availableJobs.length },
            { id: 'reviews', label: language === 'uz' ? "Sharhlar" : language === 'ru' ? "Отзывы" : "Reviews", icon: '⭐' },
            { id: 'earnings', label: language === 'uz' ? "Daromadlar" : language === 'ru' ? "Доходы" : "Earnings", icon: '💰' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 -mb-px transition-colors whitespace-nowrap ${
                activeTab === tab.id 
                  ? 'border-primary-500 text-primary-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <span>{tab.icon}</span>
              {tab.label}
              {tab.badge && tab.badge > 0 && (
                <span className="ml-1 px-2 py-0.5 bg-primary-100 text-primary-600 text-xs font-bold rounded-full">
                  {tab.badge}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Pending Bookings */}
            <div className="lg:col-span-2 card-static p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">
                  {language === 'uz' ? "Kutilayotgan buyurtmalar" : language === 'ru' ? "Ожидающие заказы" : "Pending Bookings"}
                </h2>
                <button onClick={() => setActiveTab('bookings')} className="text-sm text-primary-600">
                  {language === 'uz' ? "Barchasi" : language === 'ru' ? "Все" : "All"} →
                </button>
              </div>
              {pendingBookings.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">{language === 'uz' ? "Kutilayotgan buyurtmalar yo'q" : language === 'ru' ? "Нет ожидающих заказов" : "No pending bookings"}</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {pendingBookings.slice(0, 3).map(booking => (
                    <div key={booking.id} className="flex items-center justify-between p-4 bg-amber-50 rounded-xl border border-amber-100">
                      <div>
                        <p className="font-medium text-gray-900">{booking.userName}</p>
                        <p className="text-sm text-gray-500">{booking.serviceName} • {booking.date}</p>
                      </div>
                      <div className="flex gap-2">
                        <button className="px-3 py-1.5 bg-green-500 text-white text-sm font-medium rounded-lg hover:bg-green-600">
                          {language === 'uz' ? "Qabul" : language === 'ru' ? "Принять" : "Accept"}
                        </button>
                        <button className="px-3 py-1.5 bg-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-300">
                          {language === 'uz' ? "Rad" : language === 'ru' ? "Отклонить" : "Decline"}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Recent Reviews */}
            <div className="card-static p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">
                  {language === 'uz' ? "So'nggi sharhlar" : language === 'ru' ? "Последние отзывы" : "Recent Reviews"}
                </h2>
              </div>
              <div className="space-y-4">
                {masterReviews.slice(0, 3).map(review => (
                  <div key={review.id} className="pb-4 border-b border-gray-100 last:border-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-medium text-sm text-gray-900">{review.userName}</span>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map(star => (
                          <svg key={star} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" 
                            className={`w-4 h-4 ${star <= review.rating ? 'text-amber-400' : 'text-gray-200'}`}>
                            <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clipRule="evenodd" />
                          </svg>
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-2">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Performance */}
            <div className="lg:col-span-3 card-static p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                {language === 'uz' ? "Ishlash ko'rsatkichlari" : language === 'ru' ? "Показатели работы" : "Performance Metrics"}
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-4 bg-gray-50 rounded-xl text-center">
                  <p className="text-3xl font-bold text-primary-600">{stats.responseRate}%</p>
                  <p className="text-sm text-gray-500 mt-1">{language === 'uz' ? "Javob berish" : language === 'ru' ? "Отклик" : "Response rate"}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl text-center">
                  <p className="text-3xl font-bold text-green-600">{Math.round(stats.completedBookings / stats.totalBookings * 100)}%</p>
                  <p className="text-sm text-gray-500 mt-1">{language === 'uz' ? "Yakunlash" : language === 'ru' ? "Выполнение" : "Completion"}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl text-center">
                  <p className="text-3xl font-bold text-purple-600">{stats.totalReviews}</p>
                  <p className="text-sm text-gray-500 mt-1">{language === 'uz' ? "Sharhlar" : language === 'ru' ? "Отзывов" : "Reviews"}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl text-center">
                  <p className="text-3xl font-bold text-amber-600">Top 5%</p>
                  <p className="text-sm text-gray-500 mt-1">{language === 'uz' ? "Reyting" : language === 'ru' ? "Рейтинг" : "Ranking"}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'bookings' && (
          <div className="space-y-4">
            {masterBookings.map(booking => (
              <div key={booking.id} className="card-static p-5">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <h3 className="font-semibold text-gray-900">{booking.userName}</h3>
                      <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(booking.status)}`}>
                        {getStatusText(booking.status)}
                      </span>
                    </div>
                    <p className="text-sm text-primary-600 mt-1">{booking.serviceName}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      📅 {booking.date} | ⏰ {booking.timeSlot.start} - {booking.timeSlot.end}
                    </p>
                    {booking.address && (
                      <p className="text-sm text-gray-500 mt-1">📍 {booking.address}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-gray-900">{booking.totalPrice.toLocaleString()} {language === 'uz' ? "so'm" : "сум"}</span>
                    {booking.status === 'pending' && (
                      <div className="flex gap-2">
                        <button className="btn btn-primary !py-1.5 !px-3 text-sm">
                          {language === 'uz' ? "Qabul" : language === 'ru' ? "Принять" : "Accept"}
                        </button>
                        <button className="btn btn-outline !py-1.5 !px-3 text-sm">
                          {language === 'uz' ? "Rad" : language === 'ru' ? "Отклонить" : "Decline"}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'jobs' && (
          <div className="space-y-4">
            <p className="text-gray-500 mb-4">
              {language === 'uz' ? "Sizga mos ish e'lonlariga murojaat qiling" : language === 'ru' ? "Откликнитесь на подходящие вакансии" : "Apply to matching job postings"}
            </p>
            {availableJobs.map(job => (
              <div key={job.id} className="card-static p-5">
                <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{job.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">📍 {job.location.region}, {job.location.city}</p>
                    <p className="text-gray-600 mt-2 line-clamp-2">{job.description}</p>
                    <div className="flex items-center gap-4 mt-3">
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">{job.category}</span>
                      <span className="text-sm text-gray-500">👤 {job.userName}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-primary-600">{job.budget.toLocaleString()} {language === 'uz' ? "so'm" : "сум"}</p>
                    <button className="btn btn-primary !py-2 !px-4 text-sm mt-3">
                      {language === 'uz' ? "Murojaat qilish" : language === 'ru' ? "Откликнуться" : "Apply"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="space-y-4">
            {masterReviews.map(review => (
              <div key={review.id} className="card-static p-5">
                <div className="flex items-start gap-4">
                  {review.userAvatar ? (
                    <Image src={review.userAvatar} alt={review.userName} width={48} height={48} className="w-12 h-12 rounded-full object-cover" />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center">
                      <span className="text-primary-600 font-semibold">{review.userName.charAt(0)}</span>
                    </div>
                  )}
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-gray-900">{review.userName}</span>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map(star => (
                          <svg key={star} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" 
                            className={`w-4 h-4 ${star <= review.rating ? 'text-amber-400' : 'text-gray-200'}`}>
                            <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clipRule="evenodd" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-xs text-gray-500">{new Date(review.createdAt).toLocaleDateString('uz-UZ')}</span>
                    </div>
                    <p className="text-gray-700 mt-2">{review.comment}</p>
                    {!review.reply && (
                      <button className="text-sm text-primary-600 mt-3 hover:text-primary-700">
                        {language === 'uz' ? "Javob yozish" : language === 'ru' ? "Ответить" : "Reply"}
                      </button>
                    )}
                    {review.reply && (
                      <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm font-medium text-gray-900">{language === 'uz' ? "Sizning javobingiz:" : language === 'ru' ? "Ваш ответ:" : "Your reply:"}</p>
                        <p className="text-sm text-gray-600 mt-1">{review.reply.content}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'earnings' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="card-static p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                {language === 'uz' ? "Daromad xulosasi" : language === 'ru' ? "Сводка доходов" : "Earnings Summary"}
              </h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-green-50 rounded-xl">
                  <span className="text-gray-700">{language === 'uz' ? "Jami daromad" : language === 'ru' ? "Общий доход" : "Total earnings"}</span>
                  <span className="text-2xl font-bold text-green-600">{stats.totalEarnings.toLocaleString()} {language === 'uz' ? "so'm" : "сум"}</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-blue-50 rounded-xl">
                  <span className="text-gray-700">{language === 'uz' ? "Bu oy" : language === 'ru' ? "В этом месяце" : "This month"}</span>
                  <span className="text-xl font-bold text-blue-600">{stats.monthlyEarnings.toLocaleString()} {language === 'uz' ? "so'm" : "сум"}</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
                  <span className="text-gray-700">{language === 'uz' ? "O'rtacha buyurtma" : language === 'ru' ? "Средний заказ" : "Avg booking"}</span>
                  <span className="text-lg font-bold text-gray-700">{Math.round(stats.totalEarnings / stats.completedBookings).toLocaleString()} {language === 'uz' ? "so'm" : "сум"}</span>
                </div>
              </div>
            </div>

            <div className="card-static p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                {language === 'uz' ? "Oylik statistika" : language === 'ru' ? "Месячная статистика" : "Monthly Stats"}
              </h2>
              <div className="space-y-3">
                {['Dekabr', 'Noyabr', 'Oktabr'].map((month, i) => (
                  <div key={month} className="flex items-center gap-4">
                    <span className="w-20 text-sm text-gray-500">{month}</span>
                    <div className="flex-1 h-4 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary-500 rounded-full"
                        style={{ width: `${90 - i * 15}%` }}
                      />
                    </div>
                    <span className="w-32 text-right text-sm font-medium text-gray-700">
                      {((3200000 - i * 600000)).toLocaleString()} {language === 'uz' ? "so'm" : "сум"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}
