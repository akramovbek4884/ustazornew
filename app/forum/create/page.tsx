'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import { forumCategories } from '@/lib/data';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export default function CreateTopicPage() {
    const { language } = useLanguage();
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        categoryId: '',
        tags: ''
    });

    const translations = {
        uz: {
            title: "Yangi mavzu yaratish",
            subtitle: "Jamiyat bilan fikr almashing",
            topicTitle: "Mavzu sarlavhasi",
            titlePlaceholder: "Savolingiz yoki mavzuni kiriting",
            category: "Kategoriya",
            selectCategory: "Kategoriya tanlang",
            content: "Tafsilot",
            contentPlaceholder: "Mavzuni batafsil yozing...",
            tags: "Teglar",
            tagsPlaceholder: "svarka, boshlangich, tavsiya (vergul bilan ajrating)",
            submit: "Mavzu yaratish",
            cancel: "Bekor qilish",
            success: "Mavzu muvaffaqiyatli yaratildi!"
        },
        ru: {
            title: "Создать новую тему",
            subtitle: "Поделитесь с сообществом",
            topicTitle: "Заголовок темы",
            titlePlaceholder: "Введите ваш вопрос или тему",
            category: "Категория",
            selectCategory: "Выберите категорию",
            content: "Подробности",
            contentPlaceholder: "Опишите тему подробно...",
            tags: "Теги",
            tagsPlaceholder: "сварка, начинающий, совет (через запятую)",
            submit: "Создать тему",
            cancel: "Отмена",
            success: "Тема успешно создана!"
        },
        en: {
            title: "Create New Topic",
            subtitle: "Share with the community",
            topicTitle: "Topic Title",
            titlePlaceholder: "Enter your question or topic",
            category: "Category",
            selectCategory: "Select category",
            content: "Details",
            contentPlaceholder: "Describe your topic in detail...",
            tags: "Tags",
            tagsPlaceholder: "welding, beginner, advice (comma separated)",
            submit: "Create Topic",
            cancel: "Cancel",
            success: "Topic created successfully!"
        }
    };

    const t = translations[language as keyof typeof translations] || translations.uz;

    const getCategoryName = (cat: typeof forumCategories[0]) => {
        if (language === 'ru' && cat.nameRu) return cat.nameRu;
        if (language === 'en' && cat.nameEn) return cat.nameEn;
        return cat.name;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        await new Promise(resolve => setTimeout(resolve, 1500));

        setIsSubmitting(false);
        alert(t.success);
        router.push('/forum');
    };

    const breadcrumbs = [
        { label: language === 'ru' ? 'Главная' : language === 'en' ? 'Home' : 'Bosh sahifa', href: '/home' },
        { label: language === 'ru' ? 'Форум' : language === 'en' ? 'Forum' : 'Forum', href: '/forum' },
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
                        💬 {t.title}
                    </h1>
                    <p className="text-gray-400">{t.subtitle}</p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
                    <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 md:p-8 space-y-6">

                        {/* Title */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">{t.topicTitle} *</label>
                            <input
                                type="text"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                placeholder={t.titlePlaceholder}
                                required
                                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500 transition-all"
                            />
                        </div>

                        {/* Category */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">{t.category} *</label>
                            <select
                                value={formData.categoryId}
                                onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                                required
                                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500 transition-all"
                            >
                                <option value="">{t.selectCategory}</option>
                                {forumCategories.map((cat) => (
                                    <option key={cat.id} value={cat.id}>
                                        {cat.icon} {getCategoryName(cat)}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Content */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">{t.content} *</label>
                            <textarea
                                value={formData.content}
                                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                placeholder={t.contentPlaceholder}
                                rows={8}
                                required
                                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500 transition-all resize-none"
                            />
                        </div>

                        {/* Tags */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">{t.tags}</label>
                            <input
                                type="text"
                                value={formData.tags}
                                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                                placeholder={t.tagsPlaceholder}
                                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500 transition-all"
                            />
                        </div>

                        {/* Buttons */}
                        <div className="flex gap-3 pt-4">
                            <button
                                type="button"
                                onClick={() => router.back()}
                                className="flex-1 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-xl font-medium transition-colors"
                            >
                                {t.cancel}
                            </button>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="flex-1 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-black font-bold rounded-xl transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                            >
                                {isSubmitting ? (
                                    <>
                                        <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                        </svg>
                                        <span>...</span>
                                    </>
                                ) : (
                                    t.submit
                                )}
                            </button>
                        </div>
                    </div>
                </form>
            </main>

            <Footer />
        </div>
    );
}
