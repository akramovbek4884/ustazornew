'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { Notification } from '@/types';

interface NotificationDropdownProps {
    notifications: Notification[];
    onMarkAsRead: (id: string) => void;
    onMarkAllAsRead: () => void;
}

export default function NotificationDropdown({
    notifications,
    onMarkAsRead,
    onMarkAllAsRead
}: NotificationDropdownProps) {
    const { language } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const unreadCount = notifications.filter(n => !n.read).length;

    const translations = {
        uz: {
            notifications: "Bildirishnomalar",
            markAllRead: "Barchasini o'qilgan deb belgilash",
            noNotifications: "Bildirishnomalar yo'q",
            viewAll: "Barchasini ko'rish",
            new: "yangi"
        },
        ru: {
            notifications: "Уведомления",
            markAllRead: "Отметить все как прочитанные",
            noNotifications: "Нет уведомлений",
            viewAll: "Смотреть все",
            new: "новое"
        },
        en: {
            notifications: "Notifications",
            markAllRead: "Mark all as read",
            noNotifications: "No notifications",
            viewAll: "View all",
            new: "new"
        }
    };

    const t = translations[language as keyof typeof translations] || translations.uz;

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const getNotificationIcon = (type: string) => {
        switch (type) {
            case 'booking':
                return '📅';
            case 'message':
                return '💬';
            case 'review':
                return '⭐';
            case 'job':
                return '💼';
            case 'course':
                return '📚';
            case 'promotion':
                return '🎉';
            default:
                return '🔔';
        }
    };

    const formatTime = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffMs = now.getTime() - date.getTime();
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);

        if (diffMins < 60) {
            return `${diffMins} min`;
        } else if (diffHours < 24) {
            return `${diffHours} h`;
        } else {
            return `${diffDays} d`;
        }
    };

    return (
        <div className="relative" ref={dropdownRef}>
            {/* Bell Icon Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative p-2 rounded-full hover:bg-gray-800 transition-colors"
                aria-label="Notifications"
            >
                <svg
                    className="w-6 h-6 text-gray-300 hover:text-white transition-colors"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                </svg>

                {/* Unread Badge */}
                {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-xs font-bold text-white animate-pulse">
                        {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                )}
            </button>

            {/* Dropdown */}
            {isOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-gray-900 border border-gray-700 rounded-xl shadow-2xl overflow-hidden z-50">
                    {/* Header */}
                    <div className="p-4 border-b border-gray-700 flex items-center justify-between">
                        <h3 className="font-semibold text-white">{t.notifications}</h3>
                        {unreadCount > 0 && (
                            <button
                                onClick={onMarkAllAsRead}
                                className="text-xs text-yellow-500 hover:text-yellow-400 transition-colors"
                            >
                                {t.markAllRead}
                            </button>
                        )}
                    </div>

                    {/* Notifications List */}
                    <div className="max-h-96 overflow-y-auto">
                        {notifications.length === 0 ? (
                            <div className="p-8 text-center text-gray-500">
                                <svg className="w-12 h-12 mx-auto mb-3 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                </svg>
                                <p>{t.noNotifications}</p>
                            </div>
                        ) : (
                            notifications.slice(0, 5).map((notification) => (
                                <div
                                    key={notification.id}
                                    onClick={() => onMarkAsRead(notification.id)}
                                    className={`p-4 border-b border-gray-800 hover:bg-gray-800/50 cursor-pointer transition-colors ${!notification.read ? 'bg-yellow-500/5' : ''
                                        }`}
                                >
                                    <div className="flex gap-3">
                                        <span className="text-2xl">{getNotificationIcon(notification.type)}</span>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-start justify-between gap-2">
                                                <p className={`text-sm ${!notification.read ? 'text-white font-medium' : 'text-gray-300'}`}>
                                                    {notification.title}
                                                </p>
                                                {!notification.read && (
                                                    <span className="px-1.5 py-0.5 bg-yellow-500 text-black text-[10px] font-bold rounded uppercase">
                                                        {t.new}
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-xs text-gray-500 mt-1 truncate">
                                                {notification.message}
                                            </p>
                                            <p className="text-xs text-gray-600 mt-1">
                                                {formatTime(notification.createdAt)}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Footer */}
                    {notifications.length > 0 && (
                        <Link
                            href="/bildirishnomalar"
                            className="block p-3 text-center text-sm text-yellow-500 hover:bg-gray-800 transition-colors"
                            onClick={() => setIsOpen(false)}
                        >
                            {t.viewAll} →
                        </Link>
                    )}
                </div>
            )}
        </div>
    );
}
