'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import { professions, regions, getCitiesByRegion } from '@/lib/data';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export default function CreateJobPage() {
    const { language } = useLanguage();
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: '',
        budget: '',
        budgetType: 'fixed',
        region: '',
        city: '',
        address: '',
        urgency: 'medium',
        startDate: '',
        deadline: ''
    });

    const translations = {
        uz: {
            title: "Yangi ish e'lon qilish",
            subtitle: "Ustalardan takliflar oling",
            formTitle: "Ish nomi",
            formTitlePlaceholder: "masalan: Uyda elektr ishlarini bajarish",
            description: "Batafsil tavsif",
            descriptionPlaceholder: "Ishni batafsil tavsiflang...",
            category: "Kategoriya",
            selectCategory: "Kategoriya tanlang",
            budget: "Byudjet",
            budgetType: "Byudjet turi",
            budgetTypes: {
                fixed: "Belgilangan",
                hourly: "Soatlik",
                negotiable: "Kelishiladi"
            },
            location: "Joylashuv",
            region: "Viloyat",
            selectRegion: "Viloyat tanlang",
            city: "Shahar",
            selectCity: "Shahar tanlang",
            address: "Manzil (ixtiyoriy)",
            addressPlaceholder: "Aniq manzil",
            urgency: "Shoshilinchlik",
            urgencyLevels: {
                low: "Past — hafta ichida",
                medium: "O'rta — 2-3 kunni ichida",
                high: "Yuqori — bugun-ertaga",
                emergency: "Shoshilinch — hoziroq kerak"
            },
            dates: "Sanalar",
            startDate: "Boshlanish sanasi",
            deadline: "Tugash muddati",
            submit: "E'lon berish",
            cancel: "Bekor qilish",
            success: "Ish muvaffaqiyatli e'lon qilindi!"
        },
        ru: {
            title: "Разместить новую работу",
            subtitle: "Получите предложения от мастеров",
            formTitle: "Название работы",
            formTitlePlaceholder: "например: Электромонтажные работы дома",
            description: "Подробное описание",
            descriptionPlaceholder: "Опишите работу подробно...",
            category: "Категория",
            selectCategory: "Выберите категорию",
            budget: "Бюджет",
            budgetType: "Тип бюджета",
            budgetTypes: {
                fixed: "Фиксированный",
                hourly: "Почасовой",
                negotiable: "Договорной"
            },
            location: "Местоположение",
            region: "Область",
            selectRegion: "Выберите область",
            city: "Город",
            selectCity: "Выберите город",
            address: "Адрес (опционально)",
            addressPlaceholder: "Точный адрес",
            urgency: "Срочность",
            urgencyLevels: {
                low: "Низкая — в течение недели",
                medium: "Средняя — 2-3 дня",
                high: "Высокая — сегодня-завтра",
                emergency: "Экстренная — нужен сейчас"
            },
            dates: "Даты",
            startDate: "Дата начала",
            deadline: "Крайний срок",
            submit: "Опубликовать",
            cancel: "Отмена",
            success: "Работа успешно опубликована!"
        },
        en: {
            title: "Post a New Job",
            subtitle: "Get proposals from masters",
            formTitle: "Job Title",
            formTitlePlaceholder: "e.g., Electrical work at home",
            description: "Detailed Description",
            descriptionPlaceholder: "Describe the job in detail...",
            category: "Category",
            selectCategory: "Select category",
            budget: "Budget",
            budgetType: "Budget Type",
            budgetTypes: {
                fixed: "Fixed",
                hourly: "Hourly",
                negotiable: "Negotiable"
            },
            location: "Location",
            region: "Region",
            selectRegion: "Select region",
            city: "City",
            selectCity: "Select city",
            address: "Address (optional)",
            addressPlaceholder: "Exact address",
            urgency: "Urgency",
            urgencyLevels: {
                low: "Low — within a week",
                medium: "Medium — 2-3 days",
                high: "High — today-tomorrow",
                emergency: "Emergency — needed now"
            },
            dates: "Dates",
            startDate: "Start Date",
            deadline: "Deadline",
            submit: "Post Job",
            cancel: "Cancel",
            success: "Job posted successfully!"
        }
    };

    const t = translations[language as keyof typeof translations] || translations.uz;

    const availableCities = formData.region ? getCitiesByRegion(formData.region) : [];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        setIsSubmitting(false);
        alert(t.success);
        router.push('/ishlar');
    };

    const breadcrumbs = [
        { label: language === 'ru' ? 'Главная' : language === 'en' ? 'Home' : 'Bosh sahifa', href: '/home' },
        { label: language === 'ru' ? 'Работы' : language === 'en' ? 'Jobs' : 'Ishlar', href: '/ishlar' },
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
                        📝 {t.title}
                    </h1>
                    <p className="text-gray-400">{t.subtitle}</p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
                    <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 md:p-8 space-y-6">

                        {/* Title */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">{t.formTitle} *</label>
                            <input
                                type="text"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                placeholder={t.formTitlePlaceholder}
                                required
                                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500 transition-all"
                            />
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">{t.description} *</label>
                            <textarea
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                placeholder={t.descriptionPlaceholder}
                                rows={5}
                                required
                                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500 transition-all resize-none"
                            />
                        </div>

                        {/* Category */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">{t.category} *</label>
                            <select
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                required
                                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500 transition-all"
                            >
                                <option value="">{t.selectCategory}</option>
                                {professions.map((prof) => (
                                    <option key={prof} value={prof}>{prof}</option>
                                ))}
                            </select>
                        </div>

                        {/* Budget */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">{t.budget} *</label>
                                <input
                                    type="number"
                                    value={formData.budget}
                                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                                    required
                                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500 transition-all"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">{t.budgetType}</label>
                                <select
                                    value={formData.budgetType}
                                    onChange={(e) => setFormData({ ...formData, budgetType: e.target.value })}
                                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500 transition-all"
                                >
                                    <option value="fixed">{t.budgetTypes.fixed}</option>
                                    <option value="hourly">{t.budgetTypes.hourly}</option>
                                    <option value="negotiable">{t.budgetTypes.negotiable}</option>
                                </select>
                            </div>
                        </div>

                        {/* Location */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">{t.region} *</label>
                                <select
                                    value={formData.region}
                                    onChange={(e) => setFormData({ ...formData, region: e.target.value, city: '' })}
                                    required
                                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500 transition-all"
                                >
                                    <option value="">{t.selectRegion}</option>
                                    {regions.map((region) => (
                                        <option key={region.id} value={region.name}>{region.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">{t.city} *</label>
                                <select
                                    value={formData.city}
                                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                    required
                                    disabled={!formData.region}
                                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500 transition-all disabled:opacity-50"
                                >
                                    <option value="">{t.selectCity}</option>
                                    {availableCities.map((city) => (
                                        <option key={city.id} value={city.name}>{city.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Address */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">{t.address}</label>
                            <input
                                type="text"
                                value={formData.address}
                                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                placeholder={t.addressPlaceholder}
                                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500 transition-all"
                            />
                        </div>

                        {/* Urgency */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">{t.urgency}</label>
                            <div className="grid grid-cols-2 gap-3">
                                {['low', 'medium', 'high', 'emergency'].map((level) => (
                                    <button
                                        key={level}
                                        type="button"
                                        onClick={() => setFormData({ ...formData, urgency: level })}
                                        className={`p-3 rounded-xl text-sm text-left transition-all ${formData.urgency === level
                                            ? 'bg-yellow-500/20 border-2 border-yellow-500 text-yellow-400'
                                            : 'bg-gray-800/50 border border-gray-700 text-gray-400 hover:border-gray-600'
                                            }`}
                                    >
                                        {t.urgencyLevels[level as keyof typeof t.urgencyLevels]}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Dates */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">{t.startDate}</label>
                                <input
                                    type="date"
                                    value={formData.startDate}
                                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500 transition-all"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">{t.deadline}</label>
                                <input
                                    type="date"
                                    value={formData.deadline}
                                    onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500 transition-all"
                                />
                            </div>
                        </div>

                        {/* Submit */}
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
