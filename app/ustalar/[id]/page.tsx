'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound, useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { Master } from '@/types'; // Ensure this type matches your API response
import { useAuth } from '@/lib/auth/AuthContext';

export default function MasterDetailPage({ params }: { params: { id: string } }) {
  const [master, setMaster] = useState<Master | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { t, language } = useLanguage();
  const { user } = useAuth();
  const router = useRouter();

  // Request Modal State
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [requestMessage, setRequestMessage] = useState('');
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    const fetchMaster = async () => {
      try {
        const res = await fetch(`/api/masters/${params.id}`);
        if (res.ok) {
          const data = await res.json();
          setMaster(data);
        } else {
          setMaster(null);
        }
      } catch (error) {
        console.error('Failed to fetch master', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMaster();
  }, [params.id]);

  const handleContact = () => {
    if (!user) {
      router.push('/auth/login?redirect=/ustalar/' + params.id);
      return;
    }
    setIsRequestModalOpen(true);
  };

  const sendRequest = async () => {
    if (!master) return;
    setIsSending(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          masterId: master.id,
          message: requestMessage
        })
      });

      if (res.ok) {
        alert(language === 'uz' ? "So'rov yuborildi!" : "Request sent!");
        setIsRequestModalOpen(false);
        setRequestMessage('');
      } else {
        const data = await res.json();
        alert(data.error || 'Failed to send request');
      }
    } catch (error) {
      console.error('Request error', error);
      alert('An error occurred');
    } finally {
      setIsSending(false);
    }
  };

  if (isLoading) {
    return (
      <>
        <Header />
        <main className="max-w-[1400px] mx-auto py-6 px-4 sm:px-6 min-h-[60vh] flex justify-center items-center">
          <div className="animate-pulse flex flex-col items-center">
            <div className="w-24 h-24 bg-gray-200 rounded-full mb-4"></div>
            <div className="h-6 bg-gray-200 rounded w-48 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-32"></div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (!master) {
    notFound();
  }

  return (
    <>
      <Header />

      <main className="max-w-[1400px] mx-auto py-6 px-4 sm:px-6 relative">
        <Breadcrumbs />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Card */}
            <div className="card p-6">
              <div className="flex flex-col sm:flex-row gap-6">
                <div className="relative">
                  <Image
                    src={master.avatar || '/img/logo-new.png'}
                    alt={master.name}
                    width={120}
                    height={120}
                    className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover ring-4 ring-gray-50 bg-white"
                  />
                  {master.isVerified && (
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center ring-2 ring-white">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="white" className="w-5 h-5">
                        <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                    <div>
                      <h1 className="text-2xl font-bold text-gray-900 mb-1">{master.name}</h1>
                      <p className="text-lg text-primary-600 font-medium">{master.profession}</p>
                    </div>
                    <div className="flex items-center gap-1 bg-amber-50 px-3 py-1.5 rounded-full self-start">
                      <span className="text-amber-500">★</span>
                      <span className="font-bold text-amber-700">{master.rating || 'New'}</span>
                      <span className="text-gray-400 text-sm">({master.reviewCount || 0})</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-6">
                    <div className="flex items-center gap-1.5">
                      <span className="i-lucide-map-pin w-4 h-4" />
                      {master.region}, {master.city}
                    </div>
                    {master.experience && (
                      <div className="flex items-center gap-1.5">
                        <span className="i-lucide-briefcase w-4 h-4" />
                        {master.experience} {language === 'uz' ? "yil tajriba" : language === 'ru' ? "лет опыта" : "years exp"}
                      </div>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <button onClick={handleContact} className="btn btn-primary flex-1 sm:flex-none">
                      {language === 'uz' ? "Bog'lanish" : language === 'ru' ? "Связаться" : "Contact"}
                    </button>
                    <button className="btn btn-outline flex-1 sm:flex-none">
                      {language === 'uz' ? "Ulashish" : language === 'ru' ? "Поделиться" : "Share"}
                    </button>
                  </div>
                </div>
              </div>

              {master.bio && (
                <div className="mt-8 pt-8 border-t border-gray-100">
                  <h3 className="font-semibold text-gray-900 mb-3">
                    {language === 'uz' ? "Usta haqida" : language === 'ru' ? "О мастере" : "About Master"}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{master.bio}</p>
                </div>
              )}
            </div>

            {/* Services */}
            <div className="card p-6">
              <h3 className="font-semibold text-gray-900 mb-4">
                {language === 'uz' ? "Xizmatlar" : language === 'ru' ? "Услуги" : "Services"}
              </h3>
              <div className="space-y-4">
                {master.services?.map((service: any) => (
                  <div key={service.id} className="flex items-center justify-between p-4 rounded-xl bg-gray-50">
                    <div>
                      <h4 className="font-medium text-gray-900">{service.name}</h4>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-primary-600">
                        {service.price === 0 ? (language === 'uz' ? "Kelishilgan" : "Negotiable") : service.price.toLocaleString() + " UZS"}
                      </div>
                    </div>
                  </div>
                ))}
                {(!master.services || master.services.length === 0) && (
                  <p className="text-gray-500 text-center py-4">
                    {language === 'uz' ? "Xizmatlar qo'shilmagan" : "No services listed"}
                  </p>
                )}
              </div>
            </div>

            {/* Reviews */}
            <div className="card p-6">
              <h3 className="font-semibold text-gray-900 mb-4">
                {language === 'uz' ? "Sharhlar" : language === 'ru' ? "Отзывы" : "Reviews"} ({master.reviewCount || 0})
              </h3>
              <div className="space-y-6">
                {master.reviews && master.reviews.length > 0 ? (
                  master.reviews.map((review) => (
                    <div key={review.id} className="border-b border-gray-100 last:border-0 pb-4 last:pb-0">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">{review.userName}</span>
                        <span className="text-sm text-gray-500">{new Date(review.createdAt).toLocaleDateString()}</span>
                      </div>
                      <div className="text-amber-500 text-sm mb-2">
                        {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                      </div>
                      <p className="text-gray-600 text-sm">{review.comment}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-center py-4">
                    {language === 'uz' ? "Sharhlar yo'q" : "No reviews yet"}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="card p-6 sticky top-24">
              <h3 className="font-semibold text-gray-900 mb-4">
                {language === 'uz' ? "Ish vaqti" : language === 'ru' ? "Режим работы" : "Working Hours"}
              </h3>
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Mon - Fri</span>
                  <span className="font-medium text-gray-900">09:00 - 18:00</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Request Modal */}
        {isRequestModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
            <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-xl animate-scaleIn">
              <h3 className="text-xl font-bold mb-4">
                {language === 'uz' ? "Xizmatga buyurtma berish" : "Request Service"}
              </h3>
              <textarea
                className="input mb-4"
                rows={4}
                placeholder={language === 'uz' ? "Ish haqida qisqacha yozing..." : "Describe the job briefly..."}
                value={requestMessage}
                onChange={(e) => setRequestMessage(e.target.value)}
              />
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setIsRequestModalOpen(false)}
                  className="btn btn-ghost"
                >
                  {language === 'uz' ? "Bekor qilish" : "Cancel"}
                </button>
                <button
                  onClick={sendRequest}
                  disabled={isSending || !requestMessage.trim()}
                  className="btn btn-primary"
                >
                  {isSending ? (language === 'uz' ? "Yuborilmoqda..." : "Sending...") : (language === 'uz' ? "Yuborish" : "Send")}
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}
