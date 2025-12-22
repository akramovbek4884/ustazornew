'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import { masters } from '@/lib/data';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { Master } from '@/types';

export default function FavoritesPage() {
    const { language } = useLanguage();
    const [favorites, setFavorites] = useState<string[]>([]);
    const [favoriteMasters, setFavoriteMasters] = useState<Master[]>([]);

    const translations = {
        uz: {
            title: "Sevimlilar",
            subtitle: "Saqlangan ustalar",
            empty: "Sevimli ustalar yo'q",
            emptyDesc: "Ustalarni sevimlilaringizga qo'shing va ular bu yerda ko'rinadi",
            browseMasters: "Ustalarni ko'rish",
            remove: "Olib tashlash",
            viewProfile: "Profilni ko'rish",
            rating: "Reyting",
            reviews: "ta sharh",
            verified: "Tasdiqlangan"
        },
        ru: {
            title: "Избранное",
            subtitle: "Сохраненные мастера",
            empty: "Нет избранных мастеров",
            emptyDesc: "Добавьте мастеров в избранное, и они появятся здесь",
            browseMasters: "Смотреть мастеров",
            remove: "Удалить",
            viewProfile: "Смотреть профиль",
            rating: "Рейтинг",
            reviews: "отзывов",
            verified: "Проверенный"
        },
        en: {
            title: "Favorites",
            subtitle: "Saved masters",
            empty: "No favorite masters",
            emptyDesc: "Add masters to your favorites and they will appear here",
            browseMasters: "Browse Masters",
            remove: "Remove",
            viewProfile: "View Profile",
            rating: "Rating",
            reviews: "reviews",
            verified: "Verified"
        }
    };

    const t = translations[language as keyof typeof translations] || translations.uz;

    useEffect(() => {
        // Load favorites from localStorage
        const savedFavorites = localStorage.getItem('favoriteMasters');
        if (savedFavorites) {
            const favoriteIds = JSON.parse(savedFavorites);
            setFavorites(favoriteIds);

            // Filter masters that are in favorites
            const filtered = masters.filter(m => favoriteIds.includes(m.id));
            setFavoriteMasters(filtered);
        }
    }, []);

    const removeFavorite = (masterId: string) => {
        const newFavorites = favorites.filter(id => id !== masterId);
        setFavorites(newFavorites);
        setFavoriteMasters(prev => prev.filter(m => m.id !== masterId));
        localStorage.setItem('favoriteMasters', JSON.stringify(newFavorites));
    };

    const breadcrumbs = [
        { label: language === 'ru' ? 'Главная' : language === 'en' ? 'Home' : 'Bosh sahifa', href: '/home' },
        { label: t.title }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-black">
            <Header />

            <main className="container mx-auto px-4 py-8">
                <Breadcrumbs items={breadcrumbs} />

                {/* Page Header */}
                <div className="mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                        ❤️ {t.title}
                    </h1>
                    <p className="text-gray-400">{t.subtitle}</p>
                </div>

                {/* Content */}
                {favoriteMasters.length === 0 ? (
                    <div className="text-center py-20">
                        <div className="w-24 h-24 mx-auto mb-6 bg-gray-800 rounded-full flex items-center justify-center">
                            <svg className="w-12 h-12 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                        </div>
                        <h2 className="text-xl font-semibold text-white mb-2">{t.empty}</h2>
                        <p className="text-gray-500 mb-6 max-w-md mx-auto">{t.emptyDesc}</p>
                        <Link
                            href="/home"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-bold rounded-xl hover:from-yellow-400 hover:to-orange-400 transition-all"
                        >
                            {t.browseMasters}
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {favoriteMasters.map((master) => (
                            <div
                                key={master.id}
                                className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl overflow-hidden hover:border-yellow-500/30 transition-all group"
                            >
                                {/* Master Info */}
                                <div className="p-6">
                                    <div className="flex items-start gap-4">
                                        <div className="relative">
                                            <Image
                                                src={master.avatar}
                                                alt={master.name}
                                                width={80}
                                                height={80}
                                                className="w-20 h-20 rounded-xl object-cover"
                                            />
                                            {master.isVerified && (
                                                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                                                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                    </svg>
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-lg font-semibold text-white group-hover:text-yellow-400 transition-colors">
                                                {master.name}
                                            </h3>
                                            <p className="text-gray-400 text-sm">{master.profession}</p>
                                            <p className="text-gray-500 text-xs mt-1">{master.region}, {master.city}</p>
                                        </div>
                                    </div>

                                    {/* Rating */}
                                    {master.rating && (
                                        <div className="flex items-center gap-3 mt-4 p-3 bg-gray-800/50 rounded-xl">
                                            <div className="flex items-center gap-1">
                                                <svg className="w-5 h-5 text-yellow-400 fill-yellow-400" viewBox="0 0 20 20">
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>
                                                <span className="font-bold text-white">{master.rating}</span>
                                            </div>
                                            <span className="text-gray-500 text-sm">
                                                ({master.reviewCount} {t.reviews})
                                            </span>
                                        </div>
                                    )}
                                </div>

                                {/* Actions */}
                                <div className="px-6 pb-6 flex gap-3">
                                    <Link
                                        href={`/ustalar/${master.id}`}
                                        className="flex-1 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-bold rounded-xl text-center hover:from-yellow-400 hover:to-orange-400 transition-all"
                                    >
                                        {t.viewProfile}
                                    </Link>
                                    <button
                                        onClick={() => removeFavorite(master.id)}
                                        className="px-4 py-3 bg-gray-700 hover:bg-red-500/20 text-gray-400 hover:text-red-400 rounded-xl transition-all"
                                        title={t.remove}
                                    >
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
}
