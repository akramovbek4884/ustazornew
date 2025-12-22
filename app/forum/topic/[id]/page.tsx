'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import ShareButtons from '@/components/ShareButtons';
import { mockForumTopics, forumCategories } from '@/lib/data';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { ForumTopic, ForumPost } from '@/types';

// Mock replies data
const mockReplies: ForumPost[] = [
    {
        id: 'p1',
        topicId: 'ft1',
        authorId: 'u20',
        authorName: 'Rustam Karimov',
        authorAvatar: 'https://randomuser.me/api/portraits/men/33.jpg',
        content: "Salom! Men ham yangi boshlovchi sifatida Riland apparatini sotib oldim. Juda qulay va narxi ham yaxshi. 600-700 ming so'mga topsa bo'ladi.",
        likes: 8,
        createdAt: '2025-12-02T14:00:00Z'
    },
    {
        id: 'p2',
        topicId: 'ft1',
        authorId: 'u21',
        authorName: 'Dilshod Ergashev',
        authorAvatar: 'https://randomuser.me/api/portraits/men/45.jpg',
        content: "Invertor apparatlarini tavsiya qilaman. Elektr sarfiyoti kam va chok sifati yaxshi chiqadi. Boshlang'ich uchun 200A yetarli.",
        likes: 15,
        isAnswer: true,
        createdAt: '2025-12-03T09:30:00Z'
    },
    {
        id: 'p3',
        topicId: 'ft1',
        authorId: 'u22',
        authorName: 'Aziz Toshmatov',
        content: "Men Hugong sotib olganman, 2 yildan beri ishlataman. Hech qanday muammo yo'q.",
        likes: 5,
        createdAt: '2025-12-05T11:00:00Z'
    }
];

export default function ForumTopicPage() {
    const { language } = useLanguage();
    const params = useParams();
    const [topic, setTopic] = useState<ForumTopic | null>(null);
    const [replies, setReplies] = useState<ForumPost[]>([]);
    const [newReply, setNewReply] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const translations = {
        uz: {
            loading: "Yuklanmoqda...",
            notFound: "Mavzu topilmadi",
            backToForum: "Forumga qaytish",
            replies: "Javoblar",
            writeReply: "Javob yozing",
            replyPlaceholder: "Javobingizni yozing...",
            submit: "Yuborish",
            likes: "Yoqdi",
            solution: "To'g'ri javob",
            views: "ko'rish",
            postedBy: "Yozgan",
            markAsSolution: "Javob deb belgilash"
        },
        ru: {
            loading: "Загрузка...",
            notFound: "Тема не найдена",
            backToForum: "К форуму",
            replies: "Ответы",
            writeReply: "Написать ответ",
            replyPlaceholder: "Напишите ваш ответ...",
            submit: "Отправить",
            likes: "Нравится",
            solution: "Решение",
            views: "просм.",
            postedBy: "Автор",
            markAsSolution: "Отметить как решение"
        },
        en: {
            loading: "Loading...",
            notFound: "Topic not found",
            backToForum: "Back to Forum",
            replies: "Replies",
            writeReply: "Write a Reply",
            replyPlaceholder: "Write your reply...",
            submit: "Submit",
            likes: "Likes",
            solution: "Solution",
            views: "views",
            postedBy: "Posted by",
            markAsSolution: "Mark as solution"
        }
    };

    const t = translations[language as keyof typeof translations] || translations.uz;

    useEffect(() => {
        const topicId = params.id as string;
        const foundTopic = mockForumTopics.find(t => t.id === topicId);
        setTopic(foundTopic || null);

        // Filter replies for this topic
        const topicReplies = mockReplies.filter(r => r.topicId === topicId);
        setReplies(topicReplies);
    }, [params.id]);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString(
            language === 'ru' ? 'ru-RU' : language === 'en' ? 'en-US' : 'uz-UZ',
            { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' }
        );
    };

    const handleSubmitReply = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newReply.trim()) return;

        setIsSubmitting(true);
        await new Promise(resolve => setTimeout(resolve, 1000));

        const newPost: ForumPost = {
            id: `p${Date.now()}`,
            topicId: topic?.id || '',
            authorId: 'current-user',
            authorName: 'Siz',
            content: newReply,
            likes: 0,
            createdAt: new Date().toISOString()
        };

        setReplies([...replies, newPost]);
        setNewReply('');
        setIsSubmitting(false);
    };

    const handleLike = (postId: string) => {
        setReplies(replies.map(r =>
            r.id === postId ? { ...r, likes: r.likes + 1 } : r
        ));
    };

    if (!topic) {
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

    const category = forumCategories.find(c => c.id === topic.categoryId);

    const breadcrumbs = [
        { label: language === 'ru' ? 'Главная' : language === 'en' ? 'Home' : 'Bosh sahifa', href: '/home' },
        { label: language === 'ru' ? 'Форум' : language === 'en' ? 'Forum' : 'Forum', href: '/forum' },
        { label: category?.name || '', href: `/forum/${topic.categoryId}` },
        { label: topic.title }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-black">
            <Header />

            <main className="container mx-auto px-4 py-8">
                <Breadcrumbs items={breadcrumbs} />

                {/* Topic Card */}
                <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 mb-6">
                    <div className="flex items-start gap-4 mb-4">
                        {topic.authorAvatar ? (
                            <img
                                src={topic.authorAvatar}
                                alt={topic.authorName}
                                className="w-12 h-12 rounded-full object-cover"
                            />
                        ) : (
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center text-black font-bold text-lg">
                                {topic.authorName.charAt(0)}
                            </div>
                        )}
                        <div className="flex-1">
                            <h1 className="text-xl md:text-2xl font-bold text-white mb-1">{topic.title}</h1>
                            <p className="text-gray-500 text-sm">
                                {t.postedBy} <span className="text-gray-300">{topic.authorName}</span> • {formatDate(topic.createdAt)}
                            </p>
                        </div>
                        <div className="text-gray-400 text-sm">
                            👁 {topic.views} {t.views}
                        </div>
                    </div>

                    <div className="text-gray-300 leading-relaxed mb-4">
                        {topic.content}
                    </div>

                    {/* Tags */}
                    {topic.tags && topic.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                            {topic.tags.map((tag, idx) => (
                                <span key={idx} className="px-3 py-1 bg-gray-700/50 text-gray-400 text-sm rounded-lg">
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    )}

                    <div className="pt-4 border-t border-gray-700/50">
                        <ShareButtons title={topic.title} />
                    </div>
                </div>

                {/* Replies */}
                <div className="mb-6">
                    <h2 className="text-lg font-semibold text-white mb-4">
                        {t.replies} ({replies.length})
                    </h2>

                    {replies.length === 0 ? (
                        <p className="text-gray-500 text-center py-8">No replies yet</p>
                    ) : (
                        <div className="space-y-4">
                            {replies.map((reply) => (
                                <div
                                    key={reply.id}
                                    className={`bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border rounded-xl p-5 ${reply.isAnswer ? 'border-green-500/50' : 'border-gray-700/50'
                                        }`}
                                >
                                    {reply.isAnswer && (
                                        <div className="flex items-center gap-2 mb-3 text-green-400">
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                            </svg>
                                            <span className="font-medium text-sm">{t.solution}</span>
                                        </div>
                                    )}

                                    <div className="flex items-start gap-4">
                                        {reply.authorAvatar ? (
                                            <img
                                                src={reply.authorAvatar}
                                                alt={reply.authorName}
                                                className="w-10 h-10 rounded-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-gray-400 font-medium">
                                                {reply.authorName.charAt(0)}
                                            </div>
                                        )}

                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className="font-medium text-white">{reply.authorName}</span>
                                                <span className="text-gray-500 text-sm">{formatDate(reply.createdAt)}</span>
                                            </div>
                                            <p className="text-gray-300">{reply.content}</p>

                                            <div className="flex items-center gap-4 mt-3">
                                                <button
                                                    onClick={() => handleLike(reply.id)}
                                                    className="flex items-center gap-1 text-gray-500 hover:text-yellow-400 transition-colors"
                                                >
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                                    </svg>
                                                    <span>{reply.likes}</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Write Reply */}
                <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6">
                    <h3 className="font-semibold text-white mb-4">{t.writeReply}</h3>
                    <form onSubmit={handleSubmitReply}>
                        <textarea
                            value={newReply}
                            onChange={(e) => setNewReply(e.target.value)}
                            placeholder={t.replyPlaceholder}
                            rows={4}
                            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500 transition-all resize-none mb-4"
                        />
                        <button
                            type="submit"
                            disabled={isSubmitting || !newReply.trim()}
                            className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-black font-bold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? '...' : t.submit}
                        </button>
                    </form>
                </div>
            </main>

            <Footer />
        </div>
    );
}
