'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export default function TermsPage() {
    const { language } = useLanguage();

    const content = {
        uz: {
            title: "Xizmat shartlari",
            lastUpdated: "Oxirgi yangilanish: 2024-yil, dekabr",
            sections: [
                {
                    title: "1. Umumiy qoidalar",
                    text: "USTA ZO'R platformasidan foydalanish orqali siz ushbu Xizmat shartlarini qabul qilasiz. Agar siz ushbu shartlarga rozi bo'lmasangiz, iltimos, platformadan foydalanmang."
                },
                {
                    title: "2. Xizmatlar tavsifi",
                    text: "USTA ZO'R - bu ustalar va mijozlarni bog'lovchi platforma. Biz ustalarni topish, ularning profillarini ko'rish va bog'lanish imkoniyatini taqdim etamiz. Shuningdek, platformada kasbiy video kurslar mavjud."
                },
                {
                    title: "3. Foydalanuvchi majburiyatlari",
                    text: "Foydalanuvchilar to'g'ri va aniq ma'lumot berishlari shart. Soxta profillar yaratish, boshqalarni aldash yoki qonunga zid harakatlar qilish taqiqlanadi."
                },
                {
                    title: "4. Ustalar uchun",
                    text: "Usta sifatida ro'yxatdan o'tgan foydalanuvchilar o'z malakalarini to'g'ri ko'rsatishlari va sifatli xizmat ko'rsatishlari shart. Salbiy sharhlar va shikoyatlar profilga ta'sir qilishi mumkin."
                },
                {
                    title: "5. Mijozlar uchun",
                    text: "Mijozlar ustalar bilan to'g'ridan-to'g'ri kelishuvga erishadi. USTA ZO'R usta va mijoz o'rtasidagi kelishuv uchun javobgar emas. Adolatli baho va sharh qoldiring."
                },
                {
                    title: "6. To'lovlar",
                    text: "Platformadan foydalanish bepul. Pullik kurslar uchun to'lov platforma orqali amalga oshiriladi. Usta xizmatlari uchun to'lov usta bilan bevosita kelishiladi."
                },
                {
                    title: "7. Intellektual mulk",
                    text: "Platformadagi barcha kontent, dizayn va materiallar USTA ZO'R mulki hisoblanadi. Ruxsatsiz nusxalash yoki tarqatish taqiqlanadi."
                },
                {
                    title: "8. Javobgarlikni cheklash",
                    text: "USTA ZO'R usta va mijoz o'rtasidagi munosabatlar natijasida yuzaga kelgan har qanday zarar uchun javobgar emas. Platforma faqat vositachilik xizmati ko'rsatadi."
                },
                {
                    title: "9. Hisobni to'xtatish",
                    text: "Biz qoidalarni buzgan foydalanuvchilarning hisoblarini ogohlantirishsiz to'xtatish huquqini saqlaymiz."
                },
                {
                    title: "10. Qonunchilik",
                    text: "Ushbu shartlar O'zbekiston Respublikasi qonunchiligiga muvofiq tartibga solinadi."
                },
                {
                    title: "11. Bog'lanish",
                    text: "Savollaringiz bo'lsa: info@ustazor.uz yoki Telegram: @usta_zor"
                }
            ]
        },
        ru: {
            title: "Условия использования",
            lastUpdated: "Последнее обновление: декабрь 2024",
            sections: [
                {
                    title: "1. Общие положения",
                    text: "Используя платформу USTA ZO'R, вы принимаете данные Условия использования. Если вы не согласны с этими условиями, пожалуйста, не используйте платформу."
                },
                {
                    title: "2. Описание услуг",
                    text: "USTA ZO'R - это платформа, связывающая мастеров и клиентов. Мы предоставляем возможность найти мастеров, просмотреть их профили и связаться с ними. Также на платформе доступны профессиональные видео курсы."
                },
                {
                    title: "3. Обязанности пользователей",
                    text: "Пользователи обязаны предоставлять достоверную информацию. Создание фальшивых профилей, обман других пользователей или противоправные действия запрещены."
                },
                {
                    title: "4. Для мастеров",
                    text: "Пользователи, зарегистрированные как мастера, обязаны правильно указывать свою квалификацию и предоставлять качественные услуги. Негативные отзывы и жалобы могут повлиять на профиль."
                },
                {
                    title: "5. Для клиентов",
                    text: "Клиенты договариваются с мастерами напрямую. USTA ZO'R не несет ответственности за договоренности между мастером и клиентом. Оставляйте честные оценки и отзывы."
                },
                {
                    title: "6. Оплата",
                    text: "Использование платформы бесплатно. Оплата платных курсов осуществляется через платформу. Оплата услуг мастера договаривается с мастером напрямую."
                },
                {
                    title: "7. Интеллектуальная собственность",
                    text: "Весь контент, дизайн и материалы на платформе являются собственностью USTA ZO'R. Несанкционированное копирование или распространение запрещено."
                },
                {
                    title: "8. Ограничение ответственности",
                    text: "USTA ZO'R не несет ответственности за любой ущерб, возникший в результате отношений между мастером и клиентом. Платформа предоставляет только посреднические услуги."
                },
                {
                    title: "9. Приостановка аккаунта",
                    text: "Мы оставляем за собой право приостановить аккаунты пользователей, нарушающих правила, без предупреждения."
                },
                {
                    title: "10. Законодательство",
                    text: "Данные условия регулируются законодательством Республики Узбекистан."
                },
                {
                    title: "11. Контакты",
                    text: "Если у вас есть вопросы: info@ustazor.uz или Telegram: @usta_zor"
                }
            ]
        },
        en: {
            title: "Terms of Service",
            lastUpdated: "Last updated: December 2024",
            sections: [
                {
                    title: "1. General Provisions",
                    text: "By using the USTA ZO'R platform, you accept these Terms of Service. If you do not agree to these terms, please do not use the platform."
                },
                {
                    title: "2. Description of Services",
                    text: "USTA ZO'R is a platform connecting masters and clients. We provide the ability to find masters, view their profiles, and contact them. Professional video courses are also available on the platform."
                },
                {
                    title: "3. User Obligations",
                    text: "Users must provide accurate information. Creating fake profiles, deceiving others, or illegal activities are prohibited."
                },
                {
                    title: "4. For Masters",
                    text: "Users registered as masters must correctly indicate their qualifications and provide quality services. Negative reviews and complaints may affect the profile."
                },
                {
                    title: "5. For Clients",
                    text: "Clients negotiate directly with masters. USTA ZO'R is not responsible for agreements between master and client. Leave fair ratings and reviews."
                },
                {
                    title: "6. Payments",
                    text: "Using the platform is free. Payment for paid courses is made through the platform. Payment for master services is negotiated directly with the master."
                },
                {
                    title: "7. Intellectual Property",
                    text: "All content, design, and materials on the platform are the property of USTA ZO'R. Unauthorized copying or distribution is prohibited."
                },
                {
                    title: "8. Limitation of Liability",
                    text: "USTA ZO'R is not liable for any damage arising from relations between master and client. The platform provides only intermediary services."
                },
                {
                    title: "9. Account Suspension",
                    text: "We reserve the right to suspend accounts of users who violate the rules without warning."
                },
                {
                    title: "10. Governing Law",
                    text: "These terms are governed by the laws of the Republic of Uzbekistan."
                },
                {
                    title: "11. Contact",
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
