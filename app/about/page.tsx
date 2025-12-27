'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import Image from 'next/image';

export default function AboutPage() {
    const { language } = useLanguage();

    const content = {
        uz: {
            title: "Biz haqimizda",
            subtitle: "USTA ZO'R - O'zbekistondagi eng ishonchli ustalar platformasi",
            mission: "Bizning missionimiz",
            missionText: "Biz O'zbekistondagi har bir oilaga sifatli usta xizmatlarini yetkazib berishni maqsad qilganmiz. Platformamiz orqali siz ishonchli, tajribali va malakali ustalarni topa olasiz.",
            values: "Bizning qadriyatlarimiz",
            valuesList: [
                { icon: "🛡️", title: "Ishonchlilik", desc: "Barcha ustalar tekshirilgan va tasdiqlangan" },
                { icon: "⭐", title: "Sifat", desc: "Yuqori sifatli xizmat va natijalar" },
                { icon: "⚡", title: "Tezkorlik", desc: "Tez javob va o'z vaqtida bajarilgan ishlar" },
                { icon: "💰", title: "Adolatli narx", desc: "Shaffof va hamyonbop narxlar" }
            ],
            stats: [
                { value: "500+", label: "Malakali ustalar" },
                { value: "10,000+", label: "Baxtli mijozlar" },
                { value: "50+", label: "Video kurslar" },
                { value: "14", label: "Viloyatda xizmat" }
            ],
            partner: "Hamkorlik",
            partnerText: "USTA ZO'R O'zbekiston Respublikasi Yoshlar ishlari agentligi homiyligida faoliyat yuritadi."
        },
        ru: {
            title: "О нас",
            subtitle: "USTA ZO'R - самая надежная платформа мастеров в Узбекистане",
            mission: "Наша миссия",
            missionText: "Мы стремимся предоставить качественные услуги мастеров каждой семье в Узбекистане. Через нашу платформу вы можете найти надежных, опытных и квалифицированных мастеров.",
            values: "Наши ценности",
            valuesList: [
                { icon: "🛡️", title: "Надежность", desc: "Все мастера проверены и подтверждены" },
                { icon: "⭐", title: "Качество", desc: "Высококачественные услуги и результаты" },
                { icon: "⚡", title: "Скорость", desc: "Быстрый отклик и своевременное выполнение" },
                { icon: "💰", title: "Честные цены", desc: "Прозрачные и доступные цены" }
            ],
            stats: [
                { value: "500+", label: "Квалифицированных мастеров" },
                { value: "10,000+", label: "Довольных клиентов" },
                { value: "50+", label: "Видео курсов" },
                { value: "14", label: "Регионов обслуживания" }
            ],
            partner: "Партнерство",
            partnerText: "USTA ZO'R работает при поддержке Агентства по делам молодежи Республики Узбекистан."
        },
        en: {
            title: "About Us",
            subtitle: "USTA ZO'R - The most trusted masters platform in Uzbekistan",
            mission: "Our Mission",
            missionText: "We aim to deliver quality master services to every family in Uzbekistan. Through our platform, you can find reliable, experienced, and qualified masters.",
            values: "Our Values",
            valuesList: [
                { icon: "🛡️", title: "Reliability", desc: "All masters are verified and confirmed" },
                { icon: "⭐", title: "Quality", desc: "High-quality services and results" },
                { icon: "⚡", title: "Speed", desc: "Fast response and timely completion" },
                { icon: "💰", title: "Fair Pricing", desc: "Transparent and affordable prices" }
            ],
            stats: [
                { value: "500+", label: "Qualified Masters" },
                { value: "10,000+", label: "Happy Customers" },
                { value: "50+", label: "Video Courses" },
                { value: "14", label: "Regions Served" }
            ],
            partner: "Partnership",
            partnerText: "USTA ZO'R operates under the auspices of the Youth Affairs Agency of the Republic of Uzbekistan."
        }
    };

    const t = content[language] || content.uz;

    return (
        <>
            <Header />
            <main className="max-w-[1200px] mx-auto py-6 px-4 sm:px-6">
                <Breadcrumbs />

                {/* Hero */}
                <section className="mb-12">
                    <div className="bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl p-8 sm:p-12 text-center text-white">
                        <h1 className="text-3xl sm:text-4xl font-bold mb-4">{t.title}</h1>
                        <p className="text-xl text-white/90 max-w-2xl mx-auto">{t.subtitle}</p>
                    </div>
                </section>

                {/* Stats */}
                <section className="mb-12">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {t.stats.map((stat, i) => (
                            <div key={i} className="card-static p-6 text-center">
                                <div className="text-3xl font-bold text-primary-600 mb-1">{stat.value}</div>
                                <div className="text-sm text-gray-500">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Mission */}
                <section className="mb-12">
                    <div className="card-static p-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">{t.mission}</h2>
                        <p className="text-gray-600 text-lg leading-relaxed">{t.missionText}</p>
                    </div>
                </section>

                {/* Values */}
                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">{t.values}</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {t.valuesList.map((value, i) => (
                            <div key={i} className="card-static p-6">
                                <div className="text-4xl mb-4">{value.icon}</div>
                                <h3 className="font-semibold text-gray-900 mb-2">{value.title}</h3>
                                <p className="text-sm text-gray-500">{value.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Partner */}
                <section>
                    <div className="card-static p-8 bg-gradient-to-r from-gray-50 to-primary-50 border-0">
                        <div className="flex flex-col sm:flex-row items-center gap-6">
                            <div className="bg-white p-4 rounded-xl shadow-sm">
                                <Image
                                    src="/img/yoshlar-agentligi-logo.svg"
                                    alt="Yoshlar ishlari agentligi"
                                    width={180}
                                    height={60}
                                    className="h-12 w-auto"
                                />
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-2">{t.partner}</h3>
                                <p className="text-gray-600">{t.partnerText}</p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
