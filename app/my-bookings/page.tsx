'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import { mockBookings } from '@/lib/data';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { Booking } from '@/types';

export default function MyBookingsPage() {
    const { language } = useLanguage();
    const [activeTab, setActiveTab] = useState<'upcoming' | 'completed' | 'cancelled'>('upcoming');
    const [bookings, setBookings] = useState<Booking[]>([]);

    const translations = {
        uz: {
            title: "Mening buyurtmalarim",
            upcoming: "Kutilayotgan",
            completed: "Bajarilgan",
            cancelled: "Bekor qilingan",
            noBookings: "Buyurtmalar yo'q",
            noBookingsDesc: "Siz hali biror ustadan xizmat buyurtma qilmagansiz",
            findMaster: "Usta topish",
            date: "Sana",
            time: "Vaqt",
            service: "Xizmat",
            price: "Narx",
            address: "Manzil",
            status: {
                pending: "Kutilmoqda",
                confirmed: "Tasdiqlangan",
                in_progress: "Bajarilmoqda",
                completed: "Bajarildi",
                cancelled: "Bekor qilindi"
            },
            cancelBooking: "Bekor qilish",
            viewDetails: "Batafsil",
            leaveReview: "Sharh qoldirish",
            contact: "Bog'lanish"
        },
        ru: {
            title: "Мои заказы",
            upcoming: "Предстоящие",
            completed: "Выполненные",
            cancelled: "Отмененные",
            noBookings: "Нет заказов",
            noBookingsDesc: "Вы еще не заказывали услуги у мастеров",
            findMaster: "Найти мастера",
            date: "Дата",
            time: "Время",
            service: "Услуга",
            price: "Цена",
            address: "Адрес",
            status: {
                pending: "Ожидание",
                confirmed: "Подтвержден",
                in_progress: "Выполняется",
                completed: "Выполнен",
                cancelled: "Отменен"
            },
            cancelBooking: "Отменить",
            viewDetails: "Подробнее",
            leaveReview: "Оставить отзыв",
            contact: "Связаться"
        },
        en: {
            title: "My Bookings",
            upcoming: "Upcoming",
            completed: "Completed",
            cancelled: "Cancelled",
            noBookings: "No bookings",
            noBookingsDesc: "You haven't booked any services yet",
            findMaster: "Find a Master",
            date: "Date",
            time: "Time",
            service: "Service",
            price: "Price",
            address: "Address",
            status: {
                pending: "Pending",
                confirmed: "Confirmed",
                in_progress: "In Progress",
                completed: "Completed",
                cancelled: "Cancelled"
            },
            cancelBooking: "Cancel",
            viewDetails: "View Details",
            leaveReview: "Leave Review",
            contact: "Contact"
        }
    };

    const t = translations[language as keyof typeof translations] || translations.uz;

    useEffect(() => {
        // Load bookings (in real app, fetch from API)
        setBookings(mockBookings);
    }, []);

    const filteredBookings = bookings.filter(booking => {
        if (activeTab === 'upcoming') {
            return ['pending', 'confirmed', 'in_progress'].includes(booking.status);
        } else if (activeTab === 'completed') {
            return booking.status === 'completed';
        } else {
            return booking.status === 'cancelled';
        }
    });

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'pending': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
            case 'confirmed': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
            case 'in_progress': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
            case 'completed': return 'bg-green-500/20 text-green-400 border-green-500/30';
            case 'cancelled': return 'bg-red-500/20 text-red-400 border-red-500/30';
            default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString(language === 'ru' ? 'ru-RU' : language === 'en' ? 'en-US' : 'uz-UZ', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('uz-UZ').format(price) + " so'm";
    };

    const breadcrumbs = [
        { label: language === 'ru' ? 'Главная' : language === 'en' ? 'Home' : 'Bosh sahifa', href: '/home' },
        { label: t.title }
    ];

    const tabs = [
        { id: 'upcoming', label: t.upcoming, count: bookings.filter(b => ['pending', 'confirmed', 'in_progress'].includes(b.status)).length },
        { id: 'completed', label: t.completed, count: bookings.filter(b => b.status === 'completed').length },
        { id: 'cancelled', label: t.cancelled, count: bookings.filter(b => b.status === 'cancelled').length }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-black">
            <Header />

            <main className="container mx-auto px-4 py-8">
                <Breadcrumbs items={breadcrumbs} />

                {/* Page Header */}
                <div className="mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                        📅 {t.title}
                    </h1>
                </div>

                {/* Tabs */}
                <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as typeof activeTab)}
                            className={`px-6 py-3 rounded-xl font-medium transition-all whitespace-nowrap flex items-center gap-2 ${activeTab === tab.id
                                ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-black'
                                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                                }`}
                        >
                            {tab.label}
                            {tab.count > 0 && (
                                <span className={`px-2 py-0.5 rounded-full text-xs ${activeTab === tab.id ? 'bg-black/20' : 'bg-gray-700'
                                    }`}>
                                    {tab.count}
                                </span>
                            )}
                        </button>
                    ))}
                </div>

                {/* Bookings List */}
                {filteredBookings.length === 0 ? (
                    <div className="text-center py-20">
                        <div className="w-24 h-24 mx-auto mb-6 bg-gray-800 rounded-full flex items-center justify-center">
                            <svg className="w-12 h-12 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <h2 className="text-xl font-semibold text-white mb-2">{t.noBookings}</h2>
                        <p className="text-gray-500 mb-6">{t.noBookingsDesc}</p>
                        <Link
                            href="/home"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-bold rounded-xl hover:from-yellow-400 hover:to-orange-400 transition-all"
                        >
                            {t.findMaster}
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {filteredBookings.map((booking) => (
                            <div
                                key={booking.id}
                                className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 hover:border-gray-600/50 transition-all"
                            >
                                <div className="flex flex-col md:flex-row md:items-center gap-4">
                                    {/* Master Info */}
                                    <div className="flex items-center gap-4 flex-1">
                                        {booking.masterAvatar && (
                                            <Image
                                                src={booking.masterAvatar}
                                                alt={booking.masterName}
                                                width={60}
                                                height={60}
                                                className="w-15 h-15 rounded-xl object-cover"
                                            />
                                        )}
                                        <div>
                                            <h3 className="font-semibold text-white">{booking.masterName}</h3>
                                            <p className="text-yellow-400 text-sm">{booking.serviceName}</p>
                                        </div>
                                    </div>

                                    {/* Booking Details */}
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                                        <div>
                                            <span className="text-gray-500">{t.date}</span>
                                            <p className="text-white">{formatDate(booking.date)}</p>
                                        </div>
                                        <div>
                                            <span className="text-gray-500">{t.time}</span>
                                            <p className="text-white">{booking.timeSlot.start} - {booking.timeSlot.end}</p>
                                        </div>
                                        <div>
                                            <span className="text-gray-500">{t.price}</span>
                                            <p className="text-green-400 font-semibold">{formatPrice(booking.totalPrice)}</p>
                                        </div>
                                    </div>

                                    {/* Status & Actions */}
                                    <div className="flex items-center gap-3">
                                        <span className={`px-3 py-1.5 rounded-lg text-xs font-medium border ${getStatusColor(booking.status)}`}>
                                            {t.status[booking.status as keyof typeof t.status]}
                                        </span>

                                        {booking.status === 'completed' && (
                                            <button className="px-4 py-2 bg-yellow-500/10 text-yellow-400 rounded-lg text-sm hover:bg-yellow-500/20 transition-colors">
                                                {t.leaveReview}
                                            </button>
                                        )}

                                        {['pending', 'confirmed'].includes(booking.status) && (
                                            <button className="px-4 py-2 bg-red-500/10 text-red-400 rounded-lg text-sm hover:bg-red-500/20 transition-colors">
                                                {t.cancelBooking}
                                            </button>
                                        )}
                                    </div>
                                </div>

                                {/* Address */}
                                {booking.address && (
                                    <div className="mt-4 pt-4 border-t border-gray-700/50">
                                        <span className="text-gray-500 text-sm">{t.address}: </span>
                                        <span className="text-gray-300 text-sm">{booking.address}</span>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
}
