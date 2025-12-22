'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import { mockNotifications } from '@/lib/data';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { Notification } from '@/types';

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');
  const { language } = useLanguage();

  const filteredNotifications = filter === 'unread' 
    ? notifications.filter(n => !n.read)
    : notifications;

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'booking': return '📅';
      case 'message': return '💬';
      case 'review': return '⭐';
      case 'job': return '💼';
      case 'course': return '📚';
      case 'promotion': return '🎉';
      default: return '🔔';
    }
  };

  const getTimeAgo = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 60) {
      return `${minutes} ${language === 'uz' ? "daqiqa oldin" : language === 'ru' ? "мин назад" : "min ago"}`;
    }
    if (hours < 24) {
      return `${hours} ${language === 'uz' ? "soat oldin" : language === 'ru' ? "ч назад" : "hours ago"}`;
    }
    return `${days} ${language === 'uz' ? "kun oldin" : language === 'ru' ? "дн назад" : "days ago"}`;
  };

  return (
    <>
      <Header />
      
      <main className="max-w-[800px] mx-auto py-6 px-4 sm:px-6">
        <Breadcrumbs />

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              {language === 'uz' ? "Bildirishnomalar" : language === 'ru' ? "Уведомления" : "Notifications"}
            </h1>
            {unreadCount > 0 && (
              <p className="text-sm text-gray-500 mt-1">
                {unreadCount} {language === 'uz' ? "ta o'qilmagan" : language === 'ru' ? "непрочитанных" : "unread"}
              </p>
            )}
          </div>
          {unreadCount > 0 && (
            <button 
              onClick={markAllAsRead}
              className="text-sm text-primary-600 hover:text-primary-700"
            >
              {language === 'uz' ? "Barchasini o'qilgan deb belgilash" : language === 'ru' ? "Отметить все как прочитанные" : "Mark all as read"}
            </button>
          )}
        </div>

        {/* Filter */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === 'all' ? 'bg-primary-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {language === 'uz' ? "Barchasi" : language === 'ru' ? "Все" : "All"}
          </button>
          <button
            onClick={() => setFilter('unread')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === 'unread' ? 'bg-primary-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {language === 'uz' ? "O'qilmagan" : language === 'ru' ? "Непрочитанные" : "Unread"}
            {unreadCount > 0 && ` (${unreadCount})`}
          </button>
        </div>

        {/* Notifications List */}
        <div className="space-y-3">
          {filteredNotifications.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔔</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {filter === 'unread' 
                  ? (language === 'uz' ? "O'qilmagan bildirishnomalar yo'q" : language === 'ru' ? "Нет непрочитанных" : "No unread notifications")
                  : (language === 'uz' ? "Bildirishnomalar yo'q" : language === 'ru' ? "Нет уведомлений" : "No notifications")
                }
              </h3>
            </div>
          ) : (
            filteredNotifications.map(notif => (
              <div
                key={notif.id}
                onClick={() => markAsRead(notif.id)}
                className={`card-static p-4 cursor-pointer transition-colors ${
                  !notif.read ? 'bg-primary-50 border-primary-100' : 'hover:bg-gray-50'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="text-2xl flex-shrink-0">
                    {getNotificationIcon(notif.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className={`font-medium ${!notif.read ? 'text-gray-900' : 'text-gray-700'}`}>
                        {notif.title}
                      </h3>
                      {!notif.read && (
                        <span className="w-2 h-2 bg-primary-500 rounded-full flex-shrink-0" />
                      )}
                    </div>
                    <p className="text-sm text-gray-500 mt-1">{notif.message}</p>
                    <p className="text-xs text-gray-400 mt-2">{getTimeAgo(notif.createdAt)}</p>
                  </div>
                  {notif.link && (
                    <Link 
                      href={notif.link}
                      onClick={(e) => e.stopPropagation()}
                      className="text-primary-600 hover:text-primary-700 flex-shrink-0"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                        <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                      </svg>
                    </Link>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
