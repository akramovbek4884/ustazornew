'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import { getMasterById, getReviewsByMasterId } from '@/lib/data';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { Master, Review } from '@/types';

export default function MasterProfilePage() {
  const params = useParams();
  const masterId = params.id as string;
  const [master, setMaster] = useState<Master | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [activeTab, setActiveTab] = useState<'about' | 'reviews' | 'portfolio'>('about');
  const [isFavorite, setIsFavorite] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [bookingNotes, setBookingNotes] = useState('');
  const [bookingAddress, setBookingAddress] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const { language } = useLanguage();

  useEffect(() => {
    const foundMaster = getMasterById(masterId);
    if (foundMaster) {
      setMaster(foundMaster);
      setReviews(getReviewsByMasterId(masterId));
    }

    // Check if master is in favorites
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setIsFavorite(favorites.includes(masterId));
  }, [masterId]);

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    if (isFavorite) {
      const newFavorites = favorites.filter((id: string) => id !== masterId);
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
    } else {
      favorites.push(masterId);
      localStorage.setItem('favorites', JSON.stringify(favorites));
    }
    setIsFavorite(!isFavorite);
  };

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate booking
    setTimeout(() => {
      setBookingSuccess(true);
      setTimeout(() => {
        setShowBookingModal(false);
        setBookingSuccess(false);
        setSelectedDate('');
        setSelectedTime('');
        setBookingNotes('');
        setBookingAddress('');
      }, 2000);
    }, 1000);
  };

  if (!master) {
    return (
      <>
        <Header />
        <main className="max-w-[1200px] mx-auto py-6 px-4 sm:px-6">
          <div className="text-center py-16">
            <div className="text-6xl mb-4">😔</div>
            <h2 className="text-xl font-semibold">Usta topilmadi</h2>
            <Link href="/ustalar" className="btn btn-primary mt-4">
              Ustalarga qaytish
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const timeSlots = [
    '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'
  ];

  return (
    <>
      <Header />

      <main className="max-w-[1200px] mx-auto py-6 px-4 sm:px-6">
        <Breadcrumbs />

        {/* Profile Header */}
        <section className="card-static p-6 sm:p-8 mb-6">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Avatar */}
            <div className="flex-shrink-0">
              <div className="relative">
                <Image
                  src={master.avatar}
                  alt={master.name}
                  width={160}
                  height={160}
                  className="w-32 h-32 sm:w-40 sm:h-40 rounded-2xl object-cover ring-4 ring-gray-100"
                />
                {master.isVerified && (
                  <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center shadow-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-6 h-6">
                      <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>
            </div>

            {/* Info */}
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{master.name}</h1>
                  <p className="text-lg text-primary-600 font-medium mt-1">{master.profession}</p>
                  <p className="text-gray-500 mt-1">📍 {master.region}, {master.city}</p>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap items-center gap-2 mt-4 sm:mt-0">
                  <button
                    onClick={toggleFavorite}
                    className={`p-3 rounded-xl transition-colors ${isFavorite ? 'bg-red-50 text-red-500' : 'bg-gray-100 text-gray-400 hover:text-red-500'
                      }`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                      <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                    </svg>
                  </button>
                  <a href={`tel:${master.phone}`} className="btn btn-outline flex-1 sm:flex-none justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                      <path fillRule="evenodd" d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z" clipRule="evenodd" />
                    </svg>
                    <span>{language === 'uz' ? "Qo'ng'iroq" : language === 'ru' ? "Позвонить" : "Call"}</span>
                  </a>
                  <Link href={`/xabarlar?to=${master.id}`} className="btn btn-outline flex-1 sm:flex-none justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                      <path d="M4.848 2.771A49.144 49.144 0 0112 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 2.024 3.348 3.97v6.02c0 1.946-1.37 3.678-3.348 3.97a48.901 48.901 0 01-3.476.383.39.39 0 00-.297.17l-2.755 4.133a.75.75 0 01-1.248 0l-2.755-4.133a.39.39 0 00-.297-.17 48.9 48.9 0 01-3.476-.384c-1.978-.29-3.348-2.024-3.348-3.97V6.741c0-1.946 1.37-3.68 3.348-3.97z" />
                    </svg>
                    <span>{language === 'uz' ? "Xabar" : language === 'ru' ? "Написать" : "Message"}</span>
                  </Link>
                  <button
                    onClick={() => setShowBookingModal(true)}
                    className="btn btn-primary w-full sm:w-auto justify-center mt-2 sm:mt-0"
                  >
                    {language === 'uz' ? "Band qilish" : language === 'ru' ? "Записаться" : "Book Now"}
                  </button>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
                <div className="text-center p-3 bg-gray-50 rounded-xl">
                  <div className="flex items-center justify-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-amber-400">
                      <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clipRule="evenodd" />
                    </svg>
                    <span className="text-xl font-bold text-gray-900">{master.rating || '—'}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{language === 'uz' ? "Reyting" : language === 'ru' ? "Рейтинг" : "Rating"}</p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-xl">
                  <p className="text-xl font-bold text-gray-900">{master.reviewCount || 0}</p>
                  <p className="text-xs text-gray-500 mt-1">{language === 'uz' ? "Sharhlar" : language === 'ru' ? "Отзывы" : "Reviews"}</p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-xl">
                  <p className="text-xl font-bold text-gray-900">{master.experience || 0}</p>
                  <p className="text-xs text-gray-500 mt-1">{language === 'uz' ? "Yil tajriba" : language === 'ru' ? "Лет опыта" : "Years exp."}</p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-xl">
                  <p className="text-xl font-bold text-gray-900">{master.completedJobs || 0}</p>
                  <p className="text-xs text-gray-500 mt-1">{language === 'uz' ? "Bajarilgan" : language === 'ru' ? "Выполнено" : "Completed"}</p>
                </div>
              </div>

              {/* Badges */}
              {master.badges && master.badges.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {master.badges.map(badge => (
                    <span
                      key={badge.id}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 text-amber-700 text-sm rounded-full"
                      title={badge.description}
                    >
                      {badge.icon} {badge.name}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Tabs */}
        <div className="flex gap-1 border-b border-gray-200 mb-6">
          {[
            { id: 'about', label: language === 'uz' ? "Ma'lumot" : language === 'ru' ? "О мастере" : "About" },
            { id: 'reviews', label: `${language === 'uz' ? "Sharhlar" : language === 'ru' ? "Отзывы" : "Reviews"} (${reviews.length})` },
            { id: 'portfolio', label: language === 'uz' ? "Portfolio" : language === 'ru' ? "Портфолио" : "Portfolio" }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-3 text-sm font-medium border-b-2 -mb-px transition-colors ${activeTab === tab.id
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'about' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              {/* Bio */}
              <div className="card-static p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-3">
                  {language === 'uz' ? "Haqida" : language === 'ru' ? "О мастере" : "About"}
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  {master.bio || (language === 'uz' ? "Ma'lumot mavjud emas" : language === 'ru' ? "Информация отсутствует" : "No information available")}
                </p>
              </div>

              {/* Services */}
              {master.services && master.services.length > 0 && (
                <div className="card-static p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">
                    {language === 'uz' ? "Xizmatlar" : language === 'ru' ? "Услуги" : "Services"}
                  </h2>
                  <div className="space-y-3">
                    {master.services.map(service => (
                      <div key={service.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                        <div>
                          <p className="font-medium text-gray-900">{service.name}</p>
                          {service.description && (
                            <p className="text-sm text-gray-500 mt-0.5">{service.description}</p>
                          )}
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-primary-600">
                            {service.price.toLocaleString()} {language === 'uz' ? "so'm" : language === 'ru' ? "сум" : "sum"}
                            {service.priceType === 'hourly' && '/soat'}
                          </p>
                          {service.duration && (
                            <p className="text-xs text-gray-500">{service.duration}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Contact Info */}
              <div className="card-static p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  {language === 'uz' ? "Aloqa" : language === 'ru' ? "Контакты" : "Contact"}
                </h2>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-green-600">
                        <path fillRule="evenodd" d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">{language === 'uz' ? "Telefon" : language === 'ru' ? "Телефон" : "Phone"}</p>
                      <a href={`tel:${master.phone}`} className="font-medium text-gray-900 hover:text-primary-600">
                        {master.phone}
                      </a>
                    </div>
                  </div>
                  {master.responseTime && (
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-blue-600">
                          <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">{language === 'uz' ? "Javob vaqti" : language === 'ru' ? "Время ответа" : "Response time"}</p>
                        <p className="font-medium text-gray-900">{master.responseTime}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Guarantees */}
              {(master.insurance || master.guarantee) && (
                <div className="card-static p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">
                    {language === 'uz' ? "Kafolatlar" : language === 'ru' ? "Гарантии" : "Guarantees"}
                  </h2>
                  <div className="space-y-2">
                    {master.insurance && (
                      <div className="flex items-center gap-2 text-green-600">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                          <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm">{language === 'uz' ? "Sug'urta mavjud" : language === 'ru' ? "Есть страховка" : "Insurance included"}</span>
                      </div>
                    )}
                    {master.guarantee && (
                      <div className="flex items-center gap-2 text-green-600">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                          <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm">{master.guarantee}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="space-y-4">
            {reviews.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-4xl mb-3">💬</div>
                <p className="text-gray-500">{language === 'uz' ? "Hali sharhlar yo'q" : language === 'ru' ? "Пока нет отзывов" : "No reviews yet"}</p>
              </div>
            ) : (
              reviews.map(review => (
                <div key={review.id} className="card-static p-5">
                  <div className="flex items-start gap-4">
                    {review.userAvatar ? (
                      <Image
                        src={review.userAvatar}
                        alt={review.userName}
                        width={48}
                        height={48}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center">
                        <span className="text-primary-600 font-semibold">{review.userName.charAt(0)}</span>
                      </div>
                    )}
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-gray-900">{review.userName}</span>
                        {review.isVerified && (
                          <span className="text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                            ✓ {language === 'uz' ? "Tasdiqlangan" : language === 'ru' ? "Подтверждено" : "Verified"}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map(star => (
                            <svg key={star} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                              className={`w-4 h-4 ${star <= review.rating ? 'text-amber-400' : 'text-gray-300'}`}>
                              <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clipRule="evenodd" />
                            </svg>
                          ))}
                        </div>
                        <span className="text-xs text-gray-500">
                          {new Date(review.createdAt).toLocaleDateString('uz-UZ')}
                        </span>
                      </div>
                      <p className="text-gray-700 mt-3">{review.comment}</p>

                      {review.photos && review.photos.length > 0 && (
                        <div className="flex gap-2 mt-3">
                          {review.photos.map((photo, idx) => (
                            <Image
                              key={idx}
                              src={photo}
                              alt="Review photo"
                              width={100}
                              height={100}
                              className="w-20 h-20 rounded-lg object-cover"
                            />
                          ))}
                        </div>
                      )}

                      {review.reply && (
                        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                          <p className="text-sm font-medium text-gray-900 mb-1">{master.name} javobi:</p>
                          <p className="text-sm text-gray-600">{review.reply.content}</p>
                        </div>
                      )}

                      <div className="flex items-center gap-4 mt-3">
                        <button className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                            <path d="M1 8.25a1.25 1.25 0 112.5 0v7.5a1.25 1.25 0 11-2.5 0v-7.5zM11 3V1.7c0-.268.14-.526.395-.607A2 2 0 0114 3c0 .995-.182 1.948-.514 2.826-.204.54.166 1.174.744 1.174h2.52c1.243 0 2.261 1.01 2.146 2.247a23.864 23.864 0 01-1.341 5.974C17.153 16.323 16.072 17 14.9 17h-3.192a3 3 0 01-1.341-.317l-2.734-1.366A3 3 0 006.292 15H5V8h.963c.685 0 1.258-.483 1.612-1.068a4.011 4.011 0 012.166-1.73c.432-.143.853-.386 1.011-.814.16-.432.248-.9.248-1.388z" />
                          </svg>
                          {language === 'uz' ? "Foydali" : language === 'ru' ? "Полезно" : "Helpful"} ({review.helpful || 0})
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === 'portfolio' && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📷</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {language === 'uz' ? "Portfolio mavjud emas" : language === 'ru' ? "Портфолио отсутствует" : "No portfolio yet"}
            </h3>
            <p className="text-gray-500">
              {language === 'uz' ? "Usta hali o'z ishlarini yuklamagan" : language === 'ru' ? "Мастер еще не загрузил свои работы" : "Master hasn't uploaded their work yet"}
            </p>
          </div>
        )}
      </main>

      <Footer />

      {/* Booking Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 bg-black/50 z-[200] flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto animate-fadeIn">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">
                  {language === 'uz' ? "Band qilish" : language === 'ru' ? "Записаться" : "Book Appointment"}
                </h2>
                <button
                  onClick={() => setShowBookingModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>

              {bookingSuccess ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-green-600">
                      <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {language === 'uz' ? "Buyurtma qabul qilindi!" : language === 'ru' ? "Заявка принята!" : "Booking received!"}
                  </h3>
                  <p className="text-gray-500">
                    {language === 'uz' ? "Usta tez orada siz bilan bog'lanadi" : language === 'ru' ? "Мастер скоро свяжется с вами" : "Master will contact you soon"}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleBooking} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      {language === 'uz' ? "Sana" : language === 'ru' ? "Дата" : "Date"} *
                    </label>
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      required
                      className="input"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      {language === 'uz' ? "Vaqt" : language === 'ru' ? "Время" : "Time"} *
                    </label>
                    <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
                      {timeSlots.map(time => (
                        <button
                          key={time}
                          type="button"
                          onClick={() => setSelectedTime(time)}
                          className={`py-2 text-xs sm:text-sm rounded-lg border transition-colors ${selectedTime === time
                            ? 'bg-primary-500 text-white border-primary-500'
                            : 'border-gray-200 hover:border-primary-300'
                            }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      {language === 'uz' ? "Manzil" : language === 'ru' ? "Адрес" : "Address"} *
                    </label>
                    <input
                      type="text"
                      value={bookingAddress}
                      onChange={(e) => setBookingAddress(e.target.value)}
                      placeholder={language === 'uz' ? "To'liq manzilni kiriting" : language === 'ru' ? "Введите полный адрес" : "Enter full address"}
                      required
                      className="input"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      {language === 'uz' ? "Izoh" : language === 'ru' ? "Комментарий" : "Notes"}
                    </label>
                    <textarea
                      value={bookingNotes}
                      onChange={(e) => setBookingNotes(e.target.value)}
                      placeholder={language === 'uz' ? "Qanday ish kerak?" : language === 'ru' ? "Какая работа нужна?" : "What work is needed?"}
                      rows={3}
                      className="input resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={!selectedDate || !selectedTime || !bookingAddress}
                    className="btn btn-primary w-full"
                  >
                    {language === 'uz' ? "Tasdiqlash" : language === 'ru' ? "Подтвердить" : "Confirm Booking"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
