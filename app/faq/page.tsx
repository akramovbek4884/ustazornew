'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export default function FAQPage() {
    const { language } = useLanguage();
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const content = {
        uz: {
            title: "Ko'p so'raladigan savollar",
            subtitle: "Platformamiz haqida eng ko'p beriladigan savollarga javoblar",
            faqs: [
                {
                    q: "USTA ZO'R nima?",
                    a: "USTA ZO'R - O'zbekistondagi eng ishonchli ustalar platformasi. Bu yerda siz payvandchi, santexnik, elektrik va boshqa soha ustalarini topishingiz, ularning ishlarini ko'rishingiz va buyurtma berishingiz mumkin."
                },
                {
                    q: "Ustalarni qanday topaman?",
                    a: "Bosh sahifada viloyat, tuman va kasb bo'yicha qidiruv filtrlari mavjud. Ulardan foydalanib, o'zingizga kerakli ustani osongina topa olasiz."
                },
                {
                    q: "Ustalar tekshiriladimi?",
                    a: "Ha, barcha ustalar ro'yxatdan o'tishda tekshiriladi. Tasdiqlangan ustalar maxsus belgi bilan ajratiladi."
                },
                {
                    q: "Xizmat bepulmi?",
                    a: "Platformadan foydalanish va usta qidirish bepul. Siz faqat usta xizmati uchun to'lov qilasiz."
                },
                {
                    q: "Kurslar qanday ishlaydi?",
                    a: "Video kurslarimiz orqali siz turli kasblarni o'rganishingiz mumkin. Ba'zi kurslar bepul, ba'zilari pullik. Kursni tugatib, test topshirsangiz sertifikat olasiz."
                },
                {
                    q: "Sertifikat qanday olaman?",
                    a: "Kursni to'liq ko'rib chiqib, yakuniy testni muvaffaqiyatli topshirsangiz, raqamli sertifikat olasiz. Uni yuklab olish yoki ulashish mumkin."
                },
                {
                    q: "Usta bo'lib ro'yxatdan o'tish bepulmi?",
                    a: "Ha, usta sifatida ro'yxatdan o'tish mutlaqo bepul. Profilingizni to'ldiring va mijozlardan buyurtma qabul qilishni boshlang."
                },
                {
                    q: "Muammo bo'lsa kimga murojaat qilaman?",
                    a: "Telegram: @usta_zor yoki info@ustazor.uz email orqali biz bilan bog'lanishingiz mumkin."
                }
            ]
        },
        ru: {
            title: "Часто задаваемые вопросы",
            subtitle: "Ответы на самые популярные вопросы о нашей платформе",
            faqs: [
                {
                    q: "Что такое USTA ZO'R?",
                    a: "USTA ZO'R - самая надежная платформа мастеров в Узбекистане. Здесь вы можете найти сварщиков, сантехников, электриков и других мастеров, посмотреть их работы и заказать услуги."
                },
                {
                    q: "Как найти мастера?",
                    a: "На главной странице есть фильтры поиска по региону, району и профессии. Используя их, вы легко найдете нужного мастера."
                },
                {
                    q: "Мастера проверяются?",
                    a: "Да, все мастера проходят проверку при регистрации. Подтвержденные мастера отмечены специальным значком."
                },
                {
                    q: "Услуга бесплатная?",
                    a: "Использование платформы и поиск мастеров бесплатны. Вы платите только за услуги мастера."
                },
                {
                    q: "Как работают курсы?",
                    a: "Через наши видео курсы вы можете изучить различные профессии. Некоторые курсы бесплатные, некоторые платные. Завершив курс и сдав тест, вы получите сертификат."
                },
                {
                    q: "Как получить сертификат?",
                    a: "Полностью просмотрев курс и успешно сдав итоговый тест, вы получите цифровой сертификат. Его можно скачать или поделиться."
                },
                {
                    q: "Регистрация мастером бесплатна?",
                    a: "Да, регистрация в качестве мастера абсолютно бесплатна. Заполните профиль и начните получать заказы от клиентов."
                },
                {
                    q: "К кому обратиться при проблеме?",
                    a: "Telegram: @usta_zor или по email info@ustazor.uz"
                }
            ]
        },
        en: {
            title: "Frequently Asked Questions",
            subtitle: "Answers to the most common questions about our platform",
            faqs: [
                {
                    q: "What is USTA ZO'R?",
                    a: "USTA ZO'R is the most trusted masters platform in Uzbekistan. Here you can find welders, plumbers, electricians and other professionals, view their work and order services."
                },
                {
                    q: "How do I find a master?",
                    a: "On the main page there are search filters by region, district and profession. Using them, you can easily find the master you need."
                },
                {
                    q: "Are masters verified?",
                    a: "Yes, all masters are verified upon registration. Verified masters are marked with a special badge."
                },
                {
                    q: "Is it free?",
                    a: "Using the platform and searching for masters is free. You only pay for the master's services."
                },
                {
                    q: "How do courses work?",
                    a: "Through our video courses you can learn various professions. Some courses are free, some are paid. After completing the course and passing the test, you will receive a certificate."
                },
                {
                    q: "How do I get a certificate?",
                    a: "After fully watching the course and successfully passing the final test, you will receive a digital certificate. You can download or share it."
                },
                {
                    q: "Is master registration free?",
                    a: "Yes, registering as a master is completely free. Fill out your profile and start receiving orders from clients."
                },
                {
                    q: "Who to contact if there's a problem?",
                    a: "Telegram: @usta_zor or email info@ustazor.uz"
                }
            ]
        }
    };

    const t = content[language] || content.uz;

    return (
        <>
            <Header />
            <main className="max-w-[900px] mx-auto py-6 px-4 sm:px-6">
                <Breadcrumbs />

                {/* Header */}
                <section className="mb-8 text-center">
                    <h1 className="text-3xl font-bold text-gray-900 mb-3">{t.title}</h1>
                    <p className="text-gray-500">{t.subtitle}</p>
                </section>

                {/* FAQ Accordion */}
                <section className="space-y-3">
                    {t.faqs.map((faq, i) => (
                        <div key={i} className="card-static overflow-hidden">
                            <button
                                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                                className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors"
                            >
                                <span className="font-semibold text-gray-900 pr-4">{faq.q}</span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform duration-200 ${openIndex === i ? 'rotate-180' : ''}`}
                                >
                                    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                                </svg>
                            </button>
                            {openIndex === i && (
                                <div className="px-5 pb-5 text-gray-600 animate-fadeIn">
                                    {faq.a}
                                </div>
                            )}
                        </div>
                    ))}
                </section>

                {/* Contact CTA */}
                <section className="mt-10">
                    <div className="card-static p-6 bg-gradient-to-r from-primary-50 to-secondary-50 border-0 text-center">
                        <h3 className="font-semibold text-gray-900 mb-2">
                            {language === 'ru' ? "Остались вопросы?" : language === 'en' ? "Still have questions?" : "Savolingiz bormi?"}
                        </h3>
                        <p className="text-gray-600 mb-4">
                            {language === 'ru' ? "Свяжитесь с нами и мы поможем" : language === 'en' ? "Contact us and we'll help" : "Biz bilan bog'laning, yordam beramiz"}
                        </p>
                        <a href="https://t.me/usta_zor" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                            Telegram: @usta_zor
                        </a>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
