'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import { forumCategories, mockForumTopics } from '@/lib/data';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { ForumCategory, ForumTopic } from '@/types';

export default function ForumCategoryPage() {
    const { language } = useLanguage();
    const params = useParams();
    const [category, setCategory] = useState<ForumCategory | null>(null);
    const [topics, setTopics] = useState<ForumTopic[]>([]);
    const [sortBy, setSortBy] = useState<'latest' | 'popular'>('latest');

    const translations = {
        uz: {
            loading: "Yuklanmoqda...",
            notFound: "Kategoriya topilmadi",
            backToForum: "Forumga qaytish",
            topics: "Mavzular",
            newTopic: "Yangi mavzu",
            sortLatest: "Eng yangi",
            sortPopular: "Mashhur",
            views: "ko'rish",
            replies: "javob",
            pinned: "Qadoqlangan",
            noTopics: "Bu kategoriyada mavzular yo'q",
            startDiscussion: "Birinchi mavzuni boshlang!"
        },
        ru: {
            loading: "Загрузка...",
            notFound: "Категория не найдена",
            backToForum: "К форуму",
            topics: "Темы",
            newTopic: "Новая тема",
            sortLatest: "Новые",
            sortPopular: "Популярные",
            views: "просм.",
            replies: "ответов",
            pinned: "Закреплено",
            noTopics: "В этой категории нет тем",
            startDiscussion: "Начните первую тему!"
        },
        en: {
            loading: "Loading...",
            notFound: "Category not found",
            backToForum: "Back to Forum",
            topics: "Topics",
            newTopic: "New Topic",
            sortLatest: "Latest",
            sortPopular: "Popular",
            views: "views",
            replies: "replies",
            pinned: "Pinned",
            noTopics: "No topics in this category",
            startDiscussion: "Start the first topic!"
        }
    };

    const t = translations[language as keyof typeof translations] || translations.uz;

    useEffect(() => {
        const categoryId = params.categoryId as string;
        const foundCategory = forumCategories.find(c => c.id === categoryId);
        setCategory(foundCategory || null);

        // Filter topics for this category
        const categoryTopics = mockForumTopics.filter(topic => topic.categoryId === categoryId);
        setTopics(categoryTopics);
    }, [params.categoryId]);

    const sortedTopics = [...topics].sort((a, b) => {
        if (a.isPinned && !b.isPinned) return -1;
        if (!a.isPinned && b.isPinned) return 1;

        if (sortBy === 'latest') {
            return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
        } else {
            return b.views - a.views;
        }
    });

    const getCategoryName = (cat: ForumCategory) => {
        if (language === 'ru' && cat.nameRu) return cat.nameRu;
        if (language === 'en' && cat.nameEn) return cat.nameEn;
        return cat.name;
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffMs = now.getTime() - date.getTime();
        const diffDays = Math.floor(diffMs / 86400000);

        if (diffDays === 0) {
            return language === 'ru' ? 'Сегодня' : language === 'en' ? 'Today' : 'Bugun';
        } else if (diffDays === 1) {
            return language === 'ru' ? 'Вчера' : language === 'en' ? 'Yesterday' : 'Kecha';
        } else if (diffDays < 7) {
            return `${diffDays} ${language === 'ru' ? 'дней назад' : language === 'en' ? 'days ago' : 'kun oldin'}`;
        } else {
            return date.toLocaleDateString(language === 'ru' ? 'ru-RU' : language === 'en' ? 'en-US' : 'uz-UZ', {
                day: 'numeric',
                month: 'short'
            });
        }
    };

    if (!category) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-black">
                <Header />
                <main className="container mx-auto px-4 py-20 text-center">
                    <h1 className="text-2xl text-white mb-4">{t.notFound}</h1>
                    <Link href="/forum" className="text-yellow-500 hover:underline">
                        ← {t.backToForum}
                    </Link>
                </main>
                <Footer />
            </div>
        );
    }

    const breadcrumbs = [
        { label: language === 'ru' ? 'Главная' : language === 'en' ? 'Home' : 'Bosh sahifa', href: '/home' },
        { label: language === 'ru' ? 'Форум' : language === 'en' ? 'Forum' : 'Forum', href: '/forum' },
        { label: getCategoryName(category) }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-black">
            <Header />

            <main className="container mx-auto px-4 py-8">
                <Breadcrumbs items={breadcrumbs} />

                {/* Category Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div className="flex items-center gap-4">
                        <span className="text-4xl">{category.icon}</span>
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold text-white">{getCategoryName(category)}</h1>
                            <p className="text-gray-400">{category.description}</p>
                        </div>
                    </div>
                    <Link
                        href="/forum/create"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-bold rounded-xl hover:from-yellow-400 hover:to-orange-400 transition-all"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                        </svg>
                        {t.newTopic}
                    </Link>
                </div>

                {/* Sort Tabs */}
                <div className="flex gap-2 mb-6">
                    <button
                        onClick={() => setSortBy('latest')}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${sortBy === 'latest'
                            ? 'bg-yellow-500/20 text-yellow-400'
                            : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                            }`}
                    >
                        {t.sortLatest}
                    </button>
                    <button
                        onClick={() => setSortBy('popular')}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${sortBy === 'popular'
                            ? 'bg-yellow-500/20 text-yellow-400'
                            : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                            }`}
                    >
                        {t.sortPopular}
                    </button>
                </div>

                {/* Topics List */}
                {sortedTopics.length === 0 ? (
                    <div className="text-center py-20">
                        <div className="w-24 h-24 mx-auto mb-6 bg-gray-800 rounded-full flex items-center justify-center">
                            <svg className="w-12 h-12 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                        </div>
                        <h2 className="text-xl font-semibold text-white mb-2">{t.noTopics}</h2>
                        <p className="text-gray-500 mb-6">{t.startDiscussion}</p>
                        <Link
                            href="/forum/create"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-bold rounded-xl hover:from-yellow-400 hover:to-orange-400 transition-all"
                        >
                            {t.newTopic}
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {sortedTopics.map((topic) => (
                            <Link
                                key={topic.id}
                                href={`/forum/topic/${topic.id}`}
                                className="block bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-5 hover:border-gray-600/50 transition-all group"
                            >
                                <div className="flex items-start gap-4">
                                    {/* Author Avatar */}
                                    {topic.authorAvatar ? (
                                        <img
                                            src={topic.authorAvatar}
                                            alt={topic.authorName}
                                            className="w-10 h-10 rounded-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center text-black font-bold">
                                            {topic.authorName.charAt(0)}
                                        </div>
                                    )}

                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-1">
                                            {topic.isPinned && (
                                                <span className="px-2 py-0.5 bg-yellow-500/20 text-yellow-400 text-xs rounded-full">
                                                    📌 {t.pinned}
                                                </span>
                                            )}
                                            <h3 className="font-semibold text-white group-hover:text-yellow-400 transition-colors truncate">
                                                {topic.title}
                                            </h3>
                                        </div>
                                        <p className="text-gray-500 text-sm mb-2">{topic.authorName} • {formatDate(topic.updatedAt)}</p>

                                        {/* Tags */}
                                        {topic.tags && topic.tags.length > 0 && (
                                            <div className="flex flex-wrap gap-2">
                                                {topic.tags.slice(0, 3).map((tag, idx) => (
                                                    <span key={idx} className="px-2 py-1 bg-gray-700/50 text-gray-400 text-xs rounded-lg">
                                                        #{tag}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    {/* Stats */}
                                    <div className="text-right text-sm shrink-0">
                                        <div className="text-gray-400">
                                            <span className="text-white font-medium">{topic.views}</span> {t.views}
                                        </div>
                                        <div className="text-gray-400">
                                            <span className="text-yellow-400 font-medium">{topic.replyCount}</span> {t.replies}
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
}
