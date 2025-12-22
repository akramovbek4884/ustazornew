'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import { mockBookings, mockNotifications, courses, masters } from '@/lib/data';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { Booking, Notification } from '@/types';

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'bookings' | 'courses' | 'favorites'>('overview');
  const [bookings, setBookings] = useState<Booking[]>(mockBookings);
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [courseProgress, setCourseProgress] = useState<Record<string, number>>({});
  const { language } = useLanguage();

  useEffect(() => {
    // Load favorites from localStorage
    const savedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setFavorites(savedFavorites);

    // Load course progress
    const savedProgress = JSON.parse(localStorage.getItem('courseProgress') || '{}');
    setCourseProgress(savedProgress);
  }, []);

  const stats = {
    totalBookings: bookings.length,
    completedBookings: bookings.filter(b => b.status === 'completed').length,
    savedMasters: favorites.length,
    coursesStarted: Object.keys(courseProgress).length,
    certificates: 1,
    unreadNotifications: notifications.filter(n => !n.read).length
  };

  const favoriteMasters = masters.filter(m => favorites.includes(m.id));

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
              {language === 'uz' ? "Boshqaruv paneli" : language === 'ru' ? "Панель управления" : "Dashboard"}
            </h1>
            <p className="text-gray-500 mt-1">
              {language === 'uz' ? "Buyurtmalar, kurslar va sevimlilaringiz" : language === 'ru' ? "Заказы, курсы и избранное" : "Your bookings, courses and favorites"}
            </p>
          </div>
          <Link href="/profil" className="btn btn-outline">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
              <path d="M5.433 13.917l1.262-3.155A4 4 0 017.58 9.42l6.92-6.918a2.121 2.121 0 013 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 01-.65-.65z" />
              <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0010 3H4.75A2.75 2.75 0 002 5.75v9.5A2.75 2.75 0 004.75 18h9.5A2.75 2.75 0 0017 15.25V10a.75.75 0 00-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5z" />
            </svg>
            {language === 'uz' ? "Profilni tahrirlash" : language === 'ru' ? "Редактировать профиль" : "Edit Profile"}
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <div className="card-static p-4 text-center">
            <div className="text-2xl font-bold text-primary-600">{stats.totalBookings}</div>
            <div className="text-sm text-gray-500">{language === 'uz' ? "Buyurtmalar" : language === 'ru' ? "Заказы" : "Bookings"}</div>
          </div>
          <div className="card-static p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{stats.completedBookings}</div>
            <div className="text-sm text-gray-500">{language === 'uz' ? "Bajarilgan" : language === 'ru' ? "Выполнено" : "Completed"}</div>
          </div>
          <div className="card-static p-4 text-center">
            <div className="text-2xl font-bold text-red-500">{stats.savedMasters}</div>
            <div className="text-sm text-gray-500">{language === 'uz' ? "Sevimlilar" : language === 'ru' ? "Избранное" : "Favorites"}</div>
          </div>
          <div className="card-static p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">{stats.coursesStarted}</div>
            <div className="text-sm text-gray-500">{language === 'uz' ? "Kurslar" : language === 'ru' ? "Курсы" : "Courses"}</div>
          </div>
          <div className="card-static p-4 text-center">
            <div className="text-2xl font-bold text-amber-500">{stats.certificates}</div>
            <div className="text-sm text-gray-500">{language === 'uz' ? "Sertifikatlar" : language === 'ru' ? "Сертификаты" : "Certificates"}</div>
          </div>
          <div className="card-static p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{stats.unreadNotifications}</div>
            <div className="text-sm text-gray-500">{language === 'uz' ? "Xabarlar" : language === 'ru' ? "Уведомления" : "Notifications"}</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 border-b border-gray-200 mb-6 overflow-x-auto">
          {[
            { id: 'overview', label: language === 'uz' ? "Umumiy" : language === 'ru' ? "Обзор" : "Overview", icon: '📊' },
            { id: 'bookings', label: language === 'uz' ? "Buyurtmalar" : language === 'ru' ? "Заказы" : "Bookings", icon: '📅' },
            { id: 'courses', label: language === 'uz' ? "Kurslar" : language === 'ru' ? "Курсы" : "Courses", icon: '📚' },
            { id: 'favorites', label: language === 'uz' ? "Sevimlilar" : language === 'ru' ? "Избранное" : "Favorites", icon: '❤️' }
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
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Bookings */}
            <div className="lg:col-span-2">
              <div className="card-static p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-900">
                    {language === 'uz' ? "So'nggi buyurtmalar" : language === 'ru' ? "Последние заказы" : "Recent Bookings"}
                  </h2>
                  <button onClick={() => setActiveTab('bookings')} className="text-sm text-primary-600 hover:text-primary-700">
                    {language === 'uz' ? "Barchasini ko'rish" : language === 'ru' ? "Смотреть все" : "View all"} →
                  </button>
                </div>
                <div className="space-y-3">
                  {bookings.slice(0, 3).map(booking => (
                    <div key={booking.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl">
                      {booking.masterAvatar && (
                        <Image 
                          src={booking.masterAvatar}
                          alt={booking.masterName}
                          width={48}
                          height={48}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 truncate">{booking.masterName}</p>
                        <p className="text-sm text-gray-500">{booking.serviceName}</p>
                      </div>
                      <div className="text-right">
                        <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(booking.status)}`}>
                          {getStatusText(booking.status)}
                        </span>
                        <p className="text-xs text-gray-500 mt-1">{booking.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Notifications */}
            <div className="card-static p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">
                  {language === 'uz' ? "Bildirishnomalar" : language === 'ru' ? "Уведомления" : "Notifications"}
                </h2>
                <Link href="/bildirishnomalar" className="text-sm text-primary-600 hover:text-primary-700">
                  {language === 'uz' ? "Barchasi" : language === 'ru' ? "Все" : "All"} →
                </Link>
              </div>
              <div className="space-y-3">
                {notifications.slice(0, 4).map(notif => (
                  <div 
                    key={notif.id} 
                    className={`p-3 rounded-xl ${notif.read ? 'bg-gray-50' : 'bg-primary-50 border border-primary-100'}`}
                  >
                    <p className="text-sm font-medium text-gray-900">{notif.title}</p>
                    <p className="text-xs text-gray-500 mt-1">{notif.message}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Course Progress */}
            <div className="lg:col-span-3 card-static p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">
                  {language === 'uz' ? "Kurs progressi" : language === 'ru' ? "Прогресс курсов" : "Course Progress"}
                </h2>
                <Link href="/kurslar" className="text-sm text-primary-600 hover:text-primary-700">
                  {language === 'uz' ? "Barcha kurslar" : language === 'ru' ? "Все курсы" : "All courses"} →
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {courses.slice(0, 4).map(course => {
                  const progress = courseProgress[course.id] || Math.floor(Math.random() * 100);
                  return (
                    <Link key={course.id} href={course.href} className="block p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                      <h3 className="font-medium text-gray-900 text-sm mb-2 line-clamp-1">{course.title}</h3>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-primary-500 rounded-full transition-all"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                        <span className="text-xs font-medium text-gray-500">{progress}%</span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'bookings' && (
          <div className="space-y-4">
            {bookings.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">📅</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {language === 'uz' ? "Buyurtmalar yo'q" : language === 'ru' ? "Нет заказов" : "No bookings"}
                </h3>
                <Link href="/ustalar" className="btn btn-primary mt-4">
                  {language === 'uz' ? "Usta toping" : language === 'ru' ? "Найти мастера" : "Find a master"}
                </Link>
              </div>
            ) : (
              bookings.map(booking => (
                <div key={booking.id} className="card-static p-5">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="flex items-center gap-4 flex-1">
                      {booking.masterAvatar && (
                        <Image 
                          src={booking.masterAvatar}
                          alt={booking.masterName}
                          width={64}
                          height={64}
                          className="w-16 h-16 rounded-xl object-cover"
                        />
                      )}
                      <div>
                        <h3 className="font-semibold text-gray-900">{booking.masterName}</h3>
                        <p className="text-sm text-primary-600">{booking.serviceName}</p>
                        <p className="text-sm text-gray-500 mt-1">
                          📅 {booking.date} | ⏰ {booking.timeSlot.start} - {booking.timeSlot.end}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(booking.status)}`}>
                        {getStatusText(booking.status)}
                      </span>
                      <span className="font-semibold text-gray-900">
                        {booking.totalPrice.toLocaleString()} {language === 'uz' ? "so'm" : "сум"}
                      </span>
                    </div>
                  </div>
                  {booking.address && (
                    <p className="text-sm text-gray-500 mt-3">📍 {booking.address}</p>
                  )}
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === 'courses' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {courses.map(course => {
              const progress = courseProgress[course.id] || 0;
              return (
                <Link key={course.id} href={course.href} className="card overflow-hidden group">
                  <div className="relative aspect-video">
                    <Image 
                      src={course.thumbnail}
                      alt={course.title}
                      fill
                      className="object-cover"
                    />
                    {progress > 0 && (
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200">
                        <div className="h-full bg-primary-500" style={{ width: `${progress}%` }} />
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors line-clamp-1">
                      {course.title}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">{course.lessons} {language === 'uz' ? "dars" : language === 'ru' ? "уроков" : "lessons"}</p>
                    {progress > 0 && (
                      <p className="text-xs text-primary-600 mt-2">{progress}% {language === 'uz' ? "bajarildi" : language === 'ru' ? "завершено" : "completed"}</p>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        {activeTab === 'favorites' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {favoriteMasters.length === 0 ? (
              <div className="col-span-full text-center py-16">
                <div className="text-6xl mb-4">❤️</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {language === 'uz' ? "Sevimlilar bo'sh" : language === 'ru' ? "Избранное пусто" : "No favorites"}
                </h3>
                <Link href="/ustalar" className="btn btn-primary mt-4">
                  {language === 'uz' ? "Ustalarni ko'rish" : language === 'ru' ? "Смотреть мастеров" : "Browse masters"}
                </Link>
              </div>
            ) : (
              favoriteMasters.map(master => (
                <Link key={master.id} href={`/ustalar/${master.id}`} className="card p-5 group">
                  <div className="flex items-center gap-4">
                    <Image 
                      src={master.avatar}
                      alt={master.name}
                      width={64}
                      height={64}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-900 group-hover:text-primary-600">{master.name}</h3>
                      <p className="text-sm text-primary-600">{master.profession}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-amber-400">
                          <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm font-medium">{master.rating}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}
