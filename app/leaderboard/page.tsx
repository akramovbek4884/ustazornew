'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import { masters, professions, regions } from '@/lib/data';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export default function LeaderboardPage() {
    const { language } = useLanguage();
    const [filterProfession, setFilterProfession] = useState('');
    const [filterRegion, setFilterRegion] = useState('');

    const translations = {
        uz: {
            title: "Eng yaxshi ustalar",
            subtitle: "Reyting bo'yicha eng yuqori baholangan ustalar",
            allProfessions: "Barcha kasblar",
            allRegions: "Barcha viloyatlar",
            rank: "O'rin",
            master: "Usta",
            rating: "Reyting",
            reviews: "Sharhlar",
            completedJobs: "Bajarilgan ishlar",
            viewProfile: "Profilni ko'rish",
            verified: "Tasdiqlangan",
            top: "TOP"
        },
        ru: {
            title: "Лучшие мастера",
            subtitle: "Мастера с самым высоким рейтингом",
            allProfessions: "Все профессии",
            allRegions: "Все регионы",
            rank: "Место",
            master: "Мастер",
            rating: "Рейтинг",
            reviews: "Отзывы",
            completedJobs: "Выполнено работ",
            viewProfile: "Смотреть профиль",
            verified: "Проверенный",
            top: "ТОП"
        },
        en: {
            title: "Top Masters",
            subtitle: "Highest rated craftsmen",
            allProfessions: "All professions",
            allRegions: "All regions",
            rank: "Rank",
            master: "Master",
            rating: "Rating",
            reviews: "Reviews",
            completedJobs: "Completed jobs",
            viewProfile: "View Profile",
            verified: "Verified",
            top: "TOP"
        }
    };

    const t = translations[language as keyof typeof translations] || translations.uz;

    // Filter and sort masters
    const filteredMasters = masters
        .filter(m => !filterProfession || m.profession === filterProfession)
        .filter(m => !filterRegion || m.region === filterRegion)
        .filter(m => m.rating) // Only masters with ratings
        .sort((a, b) => (b.rating || 0) - (a.rating || 0));

    const breadcrumbs = [
        { label: language === 'ru' ? 'Главная' : language === 'en' ? 'Home' : 'Bosh sahifa', href: '/home' },
        { label: t.title }
    ];

    const getRankBadge = (rank: number) => {
        if (rank === 1) return '🥇';
        if (rank === 2) return '🥈';
        if (rank === 3) return '🥉';
        return `#${rank}`;
    };

    const getRankStyle = (rank: number) => {
        if (rank === 1) return 'bg-gradient-to-r from-yellow-500/20 to-amber-500/20 border-yellow-500/50';
        if (rank === 2) return 'bg-gradient-to-r from-gray-400/20 to-gray-500/20 border-gray-400/50';
        if (rank === 3) return 'bg-gradient-to-r from-orange-600/20 to-amber-600/20 border-orange-600/50';
        return 'border-gray-700/50';
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-black">
            <Header />

            <main className="container mx-auto px-4 py-8">
                <Breadcrumbs items={breadcrumbs} />

                {/* Page Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                        🏆 {t.title}
                    </h1>
                    <p className="text-gray-400">{t.subtitle}</p>
                </div>

                {/* Filters */}
                <div className="flex flex-wrap gap-4 justify-center mb-8">
                    <select
                        value={filterProfession}
                        onChange={(e) => setFilterProfession(e.target.value)}
                        className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-yellow-500/50"
                    >
                        <option value="">{t.allProfessions}</option>
                        {professions.map((prof) => (
                            <option key={prof} value={prof}>{prof}</option>
                        ))}
                    </select>

                    <select
                        value={filterRegion}
                        onChange={(e) => setFilterRegion(e.target.value)}
                        className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-yellow-500/50"
                    >
                        <option value="">{t.allRegions}</option>
                        {regions.map((region) => (
                            <option key={region.id} value={region.name}>{region.name}</option>
                        ))}
                    </select>
                </div>

                {/* Leaderboard */}
                <div className="max-w-4xl mx-auto space-y-4">
                    {filteredMasters.map((master, index) => {
                        const rank = index + 1;
                        return (
                            <div
                                key={master.id}
                                className={`bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border rounded-2xl p-5 transition-all hover:scale-[1.01] ${getRankStyle(rank)}`}
                            >
                                <div className="flex items-center gap-4">
                                    {/* Rank */}
                                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl font-bold ${rank <= 3 ? 'bg-gradient-to-br from-yellow-500/20 to-orange-500/20' : 'bg-gray-800'
                                        }`}>
                                        {getRankBadge(rank)}
                                    </div>

                                    {/* Avatar */}
                                    <div className="relative">
                                        <Image
                                            src={master.avatar}
                                            alt={master.name}
                                            width={60}
                                            height={60}
                                            className="w-15 h-15 rounded-xl object-cover"
                                        />
                                        {master.isVerified && (
                                            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                                                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                        )}
                                    </div>

                                    {/* Info */}
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-semibold text-white text-lg">{master.name}</h3>
                                        <p className="text-gray-400 text-sm">{master.profession}</p>
                                        <p className="text-gray-500 text-xs">{master.region}, {master.city}</p>
                                    </div>

                                    {/* Stats */}
                                    <div className="hidden md:flex items-center gap-6 text-center">
                                        <div>
                                            <div className="flex items-center gap-1 justify-center">
                                                <svg className="w-5 h-5 text-yellow-400 fill-yellow-400" viewBox="0 0 20 20">
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>
                                                <span className="text-xl font-bold text-white">{master.rating}</span>
                                            </div>
                                            <span className="text-xs text-gray-500">{t.rating}</span>
                                        </div>
                                        <div>
                                            <p className="text-lg font-semibold text-white">{master.reviewCount || 0}</p>
                                            <span className="text-xs text-gray-500">{t.reviews}</span>
                                        </div>
                                        {master.completedJobs && (
                                            <div>
                                                <p className="text-lg font-semibold text-green-400">{master.completedJobs}</p>
                                                <span className="text-xs text-gray-500">{t.completedJobs}</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Action */}
                                    <Link
                                        href={`/ustalar/${master.id}`}
                                        className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-xl text-sm font-medium transition-colors whitespace-nowrap"
                                    >
                                        {t.viewProfile}
                                    </Link>
                                </div>

                                {/* Mobile Stats */}
                                <div className="flex md:hidden items-center justify-around mt-4 pt-4 border-t border-gray-700/50">
                                    <div className="text-center">
                                        <div className="flex items-center gap-1 justify-center">
                                            <svg className="w-4 h-4 text-yellow-400 fill-yellow-400" viewBox="0 0 20 20">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                            <span className="font-bold text-white">{master.rating}</span>
                                        </div>
                                        <span className="text-xs text-gray-500">{t.rating}</span>
                                    </div>
                                    <div className="text-center">
                                        <p className="font-semibold text-white">{master.reviewCount || 0}</p>
                                        <span className="text-xs text-gray-500">{t.reviews}</span>
                                    </div>
                                    {master.completedJobs && (
                                        <div className="text-center">
                                            <p className="font-semibold text-green-400">{master.completedJobs}</p>
                                            <span className="text-xs text-gray-500">{t.completedJobs}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </main>

            <Footer />
        </div>
    );
}
