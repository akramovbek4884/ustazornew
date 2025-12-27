'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export default function PrivacyPage() {
    const { language } = useLanguage();

    const content = {
        uz: {
            title: "Maxfiylik siyosati",
            lastUpdated: "Oxirgi yangilanish: 2024-yil, dekabr",
            sections: [
                {
                    title: "1. Kirish",
                    text: "USTA ZO'R platformasi foydalanuvchilarning shaxsiy ma'lumotlarini himoya qilishga alohida e'tibor qaratadi. Ushbu Maxfiylik siyosati sizning ma'lumotlaringiz qanday yig'ilishi, ishlatilishi va himoya qilinishini tushuntiradi."
                },
                {
                    title: "2. Yig'iladigan ma'lumotlar",
                    text: "Biz quyidagi ma'lumotlarni yig'amiz: ism-familiya, telefon raqami, elektron pochta (ixtiyoriy), manzil (viloyat, tuman), kasb ma'lumotlari (ustalar uchun), profil rasmi."
                },
                {
                    title: "3. Ma'lumotlardan foydalanish",
                    text: "Sizning ma'lumotlaringiz quyidagi maqsadlarda ishlatiladi: hisobingizni yaratish va boshqarish, ustalar va mijozlar o'rtasida aloqa o'rnatish, xizmat sifatini yaxshilash, yordam ko'rsatish."
                },
                {
                    title: "4. Ma'lumotlar xavfsizligi",
                    text: "Biz sizning ma'lumotlaringizni himoya qilish uchun zamonaviy xavfsizlik texnologiyalaridan foydalanamiz. Ma'lumotlar shifrlangan holda saqlanadi va faqat vakolatli xodimlar kirishi mumkin."
                },
                {
                    title: "5. Uchinchi tomonlar",
                    text: "Biz sizning shaxsiy ma'lumotlaringizni sizning roziliginglizsiz uchinchi tomonlarga sotmaymiz yoki bermaymiz, qonun talab qilgan hollar bundan mustasno."
                },
                {
                    title: "6. Cookie fayllar",
                    text: "Saytimiz cookie fayllardan foydalanadi. Ular saytdan foydalanish tajribasini yaxshilash uchun ishlatiladi. Siz brauzer sozlamalarida cookie'larni o'chirishingiz mumkin."
                },
                {
                    title: "7. Sizning huquqlaringiz",
                    text: "Siz istalgan vaqtda o'z ma'lumotlaringizga kirish, ularni o'zgartirish yoki o'chirishni so'rashingiz mumkin. Buning uchun info@ustazor.uz manziliga murojaat qiling."
                },
                {
                    title: "8. O'zgartirishlar",
                    text: "Biz ushbu Maxfiylik siyosatini istalgan vaqtda o'zgartirishimiz mumkin. O'zgartirishlar saytda e'lon qilingan paytdan boshlab kuchga kiradi."
                },
                {
                    title: "9. Bog'lanish",
                    text: "Savollaringiz bo'lsa, biz bilan bog'laning: info@ustazor.uz yoki Telegram: @usta_zor"
                }
            ]
        },
        ru: {
            title: "Политика конфиденциальности",
            lastUpdated: "Последнее обновление: декабрь 2024",
            sections: [
                {
                    title: "1. Введение",
                    text: "Платформа USTA ZO'R уделяет особое внимание защите персональных данных пользователей. Данная Политика конфиденциальности объясняет, как ваши данные собираются, используются и защищаются."
                },
                {
                    title: "2. Собираемые данные",
                    text: "Мы собираем следующие данные: имя и фамилия, номер телефона, электронная почта (по желанию), адрес (регион, район), профессиональные данные (для мастеров), фото профиля."
                },
                {
                    title: "3. Использование данных",
                    text: "Ваши данные используются для: создания и управления аккаунтом, связи между мастерами и клиентами, улучшения качества услуг, оказания поддержки."
                },
                {
                    title: "4. Безопасность данных",
                    text: "Мы используем современные технологии безопасности для защиты ваших данных. Данные хранятся в зашифрованном виде и доступны только уполномоченным сотрудникам."
                },
                {
                    title: "5. Третьи стороны",
                    text: "Мы не продаем и не передаем ваши персональные данные третьим лицам без вашего согласия, за исключением случаев, предусмотренных законом."
                },
                {
                    title: "6. Cookie файлы",
                    text: "Наш сайт использует cookie файлы для улучшения пользовательского опыта. Вы можете отключить cookie в настройках браузера."
                },
                {
                    title: "7. Ваши права",
                    text: "Вы можете в любое время запросить доступ к своим данным, их изменение или удаление. Для этого обратитесь на info@ustazor.uz."
                },
                {
                    title: "8. Изменения",
                    text: "Мы можем изменить данную Политику конфиденциальности в любое время. Изменения вступают в силу с момента публикации на сайте."
                },
                {
                    title: "9. Контакты",
                    text: "Если у вас есть вопросы: info@ustazor.uz или Telegram: @usta_zor"
                }
            ]
        },
        en: {
            title: "Privacy Policy",
            lastUpdated: "Last updated: December 2024",
            sections: [
                {
                    title: "1. Introduction",
                    text: "The USTA ZO'R platform pays special attention to protecting users' personal data. This Privacy Policy explains how your data is collected, used, and protected."
                },
                {
                    title: "2. Data Collected",
                    text: "We collect the following data: name, phone number, email (optional), address (region, district), professional information (for masters), profile photo."
                },
                {
                    title: "3. Use of Data",
                    text: "Your data is used for: creating and managing your account, connecting masters and clients, improving service quality, providing support."
                },
                {
                    title: "4. Data Security",
                    text: "We use modern security technologies to protect your data. Data is stored encrypted and accessible only to authorized personnel."
                },
                {
                    title: "5. Third Parties",
                    text: "We do not sell or share your personal data with third parties without your consent, except as required by law."
                },
                {
                    title: "6. Cookies",
                    text: "Our site uses cookies to improve user experience. You can disable cookies in your browser settings."
                },
                {
                    title: "7. Your Rights",
                    text: "You can request access to, modify, or delete your data at any time. Contact info@ustazor.uz for this."
                },
                {
                    title: "8. Changes",
                    text: "We may change this Privacy Policy at any time. Changes take effect from the moment of publication on the site."
                },
                {
                    title: "9. Contact",
                    text: "If you have questions: info@ustazor.uz or Telegram: @usta_zor"
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

                <section className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{t.title}</h1>
                    <p className="text-sm text-gray-500">{t.lastUpdated}</p>
                </section>

                <section className="card-static p-6 sm:p-8 space-y-6">
                    {t.sections.map((section, i) => (
                        <div key={i}>
                            <h2 className="font-semibold text-gray-900 mb-2">{section.title}</h2>
                            <p className="text-gray-600 leading-relaxed">{section.text}</p>
                        </div>
                    ))}
                </section>
            </main>
            <Footer />
        </>
    );
}
