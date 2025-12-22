'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import ShareButtons from '@/components/ShareButtons';
import { mockJobs, masters } from '@/lib/data';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { Job, JobApplication } from '@/types';

export default function JobDetailPage() {
    const { language } = useLanguage();
    const params = useParams();
    const [job, setJob] = useState<Job | null>(null);
    const [showApplyModal, setShowApplyModal] = useState(false);
    const [applicationData, setApplicationData] = useState({
        proposal: '',
        proposedPrice: '',
        estimatedDuration: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const translations = {
        uz: {
            loading: "Yuklanmoqda...",
            notFound: "Ish topilmadi",
            backToJobs: "Ishlarga qaytish",
            budget: "Byudjet",
            location: "Joylashuv",
            deadline: "Muddat",
            startDate: "Boshlanish sanasi",
            posted: "E'lon qilingan",
            urgency: "Shoshilinchlik",
            status: "Holat",
            applicants: "Arizachilar",
            applyNow: "Ariza berish",
            alreadyApplied: "Ariza berilgan",
            contact: "Bog'lanish",
            description: "Tavsif",
            urgencyLevels: {
                low: "Past",
                medium: "O'rta",
                high: "Yuqori",
                emergency: "Shoshilinch"
            },
            statusLabels: {
                open: "Ochiq",
                in_progress: "Bajarilmoqda",
                completed: "Bajarildi",
                cancelled: "Bekor qilindi"
            },
            applyModal: {
                title: "Ish uchun ariza",
                proposal: "Taklifingiz",
                proposalPlaceholder: "O'zingizni va tejribangizni tushuntiring...",
                price: "Taklif qilingan narx",
                duration: "Taxminiy muddat",
                durationPlaceholder: "masalan: 3-5 kun",
                submit: "Ariza yuborish",
                cancel: "Bekor qilish"
            }
        },
        ru: {
            loading: "Загрузка...",
            notFound: "Работа не найдена",
            backToJobs: "К работам",
            budget: "Бюджет",
            location: "Местоположение",
            deadline: "Срок",
            startDate: "Дата начала",
            posted: "Опубликовано",
            urgency: "Срочность",
            status: "Статус",
            applicants: "Заявки",
            applyNow: "Подать заявку",
            alreadyApplied: "Заявка подана",
            contact: "Связаться",
            description: "Описание",
            urgencyLevels: {
                low: "Низкая",
                medium: "Средняя",
                high: "Высокая",
                emergency: "Экстренная"
            },
            statusLabels: {
                open: "Открыта",
                in_progress: "В работе",
                completed: "Завершена",
                cancelled: "Отменена"
            },
            applyModal: {
                title: "Заявка на работу",
                proposal: "Ваше предложение",
                proposalPlaceholder: "Расскажите о себе и вашем опыте...",
                price: "Предлагаемая цена",
                duration: "Примерный срок",
                durationPlaceholder: "например: 3-5 дней",
                submit: "Отправить заявку",
                cancel: "Отмена"
            }
        },
        en: {
            loading: "Loading...",
            notFound: "Job not found",
            backToJobs: "Back to Jobs",
            budget: "Budget",
            location: "Location",
            deadline: "Deadline",
            startDate: "Start Date",
            posted: "Posted",
            urgency: "Urgency",
            status: "Status",
            applicants: "Applicants",
            applyNow: "Apply Now",
            alreadyApplied: "Already Applied",
            contact: "Contact",
            description: "Description",
            urgencyLevels: {
                low: "Low",
                medium: "Medium",
                high: "High",
                emergency: "Emergency"
            },
            statusLabels: {
                open: "Open",
                in_progress: "In Progress",
                completed: "Completed",
                cancelled: "Cancelled"
            },
            applyModal: {
                title: "Apply for Job",
                proposal: "Your Proposal",
                proposalPlaceholder: "Tell about yourself and your experience...",
                price: "Proposed Price",
                duration: "Estimated Duration",
                durationPlaceholder: "e.g., 3-5 days",
                submit: "Submit Application",
                cancel: "Cancel"
            }
        }
    };

    const t = translations[language as keyof typeof translations] || translations.uz;

    useEffect(() => {
        const jobId = params.id as string;
        const foundJob = mockJobs.find(j => j.id === jobId);
        setJob(foundJob || null);
    }, [params.id]);

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('uz-UZ').format(price) + " so'm";
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString(
            language === 'ru' ? 'ru-RU' : language === 'en' ? 'en-US' : 'uz-UZ',
            { day: 'numeric', month: 'long', year: 'numeric' }
        );
    };

    const getUrgencyColor = (urgency: string) => {
        switch (urgency) {
            case 'low': return 'bg-green-500/20 text-green-400';
            case 'medium': return 'bg-yellow-500/20 text-yellow-400';
            case 'high': return 'bg-orange-500/20 text-orange-400';
            case 'emergency': return 'bg-red-500/20 text-red-400';
            default: return 'bg-gray-500/20 text-gray-400';
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'open': return 'bg-green-500/20 text-green-400';
            case 'in_progress': return 'bg-blue-500/20 text-blue-400';
            case 'completed': return 'bg-gray-500/20 text-gray-400';
            case 'cancelled': return 'bg-red-500/20 text-red-400';
            default: return 'bg-gray-500/20 text-gray-400';
        }
    };

    const handleSubmitApplication = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        setIsSubmitting(false);
        setShowApplyModal(false);
        setApplicationData({ proposal: '', proposedPrice: '', estimatedDuration: '' });
        alert(language === 'ru' ? 'Заявка отправлена!' : language === 'en' ? 'Application submitted!' : 'Ariza yuborildi!');
    };

    if (!job) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-black">
                <Header />
                <main className="container mx-auto px-4 py-20 text-center">
                    <h1 className="text-2xl text-white mb-4">{t.notFound}</h1>
                    <Link href="/ishlar" className="text-yellow-500 hover:underline">
                        ← {t.backToJobs}
                    </Link>
                </main>
                <Footer />
            </div>
        );
    }

    const breadcrumbs = [
        { label: language === 'ru' ? 'Главная' : language === 'en' ? 'Home' : 'Bosh sahifa', href: '/home' },
        { label: language === 'ru' ? 'Работы' : language === 'en' ? 'Jobs' : 'Ishlar', href: '/ishlar' },
        { label: job.title }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-black">
            <Header />

            <main className="container mx-auto px-4 py-8">
                <Breadcrumbs items={breadcrumbs} />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Job Header */}
                        <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6">
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">{job.title}</h1>
                                    <p className="text-gray-400">{job.category}</p>
                                </div>
                                <span className={`px-3 py-1.5 rounded-lg text-sm font-medium ${getStatusColor(job.status)}`}>
                                    {t.statusLabels[job.status as keyof typeof t.statusLabels]}
                                </span>
                            </div>

                            <div className="flex flex-wrap gap-3 mb-6">
                                <span className={`px-3 py-1.5 rounded-lg text-sm font-medium ${getUrgencyColor(job.urgency)}`}>
                                    {t.urgencyLevels[job.urgency as keyof typeof t.urgencyLevels]}
                                </span>
                                <span className="px-3 py-1.5 rounded-lg text-sm bg-gray-700 text-gray-300">
                                    📍 {job.location.city}, {job.location.region}
                                </span>
                            </div>

                            <div className="border-t border-gray-700/50 pt-6">
                                <h3 className="font-semibold text-white mb-3">{t.description}</h3>
                                <p className="text-gray-300 leading-relaxed">{job.description}</p>
                            </div>

                            {job.images && job.images.length > 0 && (
                                <div className="mt-6 grid grid-cols-3 gap-3">
                                    {job.images.map((img, idx) => (
                                        <Image
                                            key={idx}
                                            src={img}
                                            alt={`Job image ${idx + 1}`}
                                            width={200}
                                            height={150}
                                            className="rounded-lg object-cover w-full h-32"
                                        />
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Applicants */}
                        {job.applicants && job.applicants.length > 0 && (
                            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6">
                                <h3 className="font-semibold text-white mb-4">{t.applicants} ({job.applicants.length})</h3>
                                <div className="space-y-4">
                                    {job.applicants.map((applicant) => (
                                        <div key={applicant.id} className="flex items-center gap-4 p-4 bg-gray-800/50 rounded-xl">
                                            {applicant.masterAvatar && (
                                                <Image
                                                    src={applicant.masterAvatar}
                                                    alt={applicant.masterName}
                                                    width={50}
                                                    height={50}
                                                    className="w-12 h-12 rounded-full object-cover"
                                                />
                                            )}
                                            <div className="flex-1">
                                                <h4 className="font-medium text-white">{applicant.masterName}</h4>
                                                <p className="text-yellow-400 text-sm">{formatPrice(applicant.proposedPrice)}</p>
                                                <p className="text-gray-400 text-sm">{applicant.estimatedDuration}</p>
                                            </div>
                                            {applicant.masterRating && (
                                                <div className="flex items-center gap-1 text-yellow-400">
                                                    <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                    </svg>
                                                    <span className="text-sm">{applicant.masterRating}</span>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Budget Card */}
                        <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6">
                            <div className="text-center mb-6">
                                <p className="text-gray-400 text-sm mb-1">{t.budget}</p>
                                <p className="text-3xl font-bold text-green-400">{formatPrice(job.budget)}</p>
                                <p className="text-gray-500 text-sm capitalize">
                                    {job.budgetType === 'fixed' ? 'Fixed' : job.budgetType === 'hourly' ? 'Hourly' : 'Negotiable'}
                                </p>
                            </div>

                            {job.status === 'open' && (
                                <button
                                    onClick={() => setShowApplyModal(true)}
                                    className="w-full py-3 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-black font-bold rounded-xl transition-all"
                                >
                                    {t.applyNow}
                                </button>
                            )}
                        </div>

                        {/* Details */}
                        <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 space-y-4">
                            <div className="flex justify-between">
                                <span className="text-gray-400">{t.posted}</span>
                                <span className="text-white">{formatDate(job.createdAt)}</span>
                            </div>
                            {job.startDate && (
                                <div className="flex justify-between">
                                    <span className="text-gray-400">{t.startDate}</span>
                                    <span className="text-white">{formatDate(job.startDate)}</span>
                                </div>
                            )}
                            {job.deadline && (
                                <div className="flex justify-between">
                                    <span className="text-gray-400">{t.deadline}</span>
                                    <span className="text-orange-400">{formatDate(job.deadline)}</span>
                                </div>
                            )}
                            <div className="flex justify-between">
                                <span className="text-gray-400">{t.location}</span>
                                <span className="text-white">{job.location.city}</span>
                            </div>
                        </div>

                        {/* Share */}
                        <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6">
                            <ShareButtons title={job.title} />
                        </div>
                    </div>
                </div>
            </main>

            {/* Apply Modal */}
            {showApplyModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowApplyModal(false)} />
                    <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl w-full max-w-lg shadow-2xl border border-gray-700/50">
                        <div className="p-6 border-b border-gray-700/50">
                            <h2 className="text-xl font-bold text-white">{t.applyModal.title}</h2>
                        </div>
                        <form onSubmit={handleSubmitApplication} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm text-gray-400 mb-2">{t.applyModal.proposal}</label>
                                <textarea
                                    value={applicationData.proposal}
                                    onChange={(e) => setApplicationData({ ...applicationData, proposal: e.target.value })}
                                    placeholder={t.applyModal.proposalPlaceholder}
                                    rows={4}
                                    required
                                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500/50"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">{t.applyModal.price}</label>
                                    <input
                                        type="number"
                                        value={applicationData.proposedPrice}
                                        onChange={(e) => setApplicationData({ ...applicationData, proposedPrice: e.target.value })}
                                        required
                                        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-yellow-500/50"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">{t.applyModal.duration}</label>
                                    <input
                                        type="text"
                                        value={applicationData.estimatedDuration}
                                        onChange={(e) => setApplicationData({ ...applicationData, estimatedDuration: e.target.value })}
                                        placeholder={t.applyModal.durationPlaceholder}
                                        required
                                        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500/50"
                                    />
                                </div>
                            </div>
                            <div className="flex gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setShowApplyModal(false)}
                                    className="flex-1 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-xl font-medium transition-colors"
                                >
                                    {t.applyModal.cancel}
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="flex-1 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-black font-bold rounded-xl transition-all disabled:opacity-50"
                                >
                                    {isSubmitting ? '...' : t.applyModal.submit}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
}
