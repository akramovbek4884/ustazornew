'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import { demoMasters } from '@/lib/data';

interface MasterRating {
  name: string;
  profession: string;
  rating: number;
}

export default function BaholashPage() {
  const [masters, setMasters] = useState<MasterRating[]>(demoMasters);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleRating = (index: number, rating: number) => {
    const updatedMasters = [...masters];
    updatedMasters[index].rating = rating;
    setMasters(updatedMasters);
    
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  };

  return (
    <>
      <Header />
      
      <main id="main-content" className="max-w-[900px] mx-auto py-6 px-4 sm:px-6">
        <Breadcrumbs />
        
        {/* Page Header */}
        <section className="mb-8 text-center">
          <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-amber-500">
              <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
            </svg>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
            Ustalarni baholang
          </h1>
          <p className="text-gray-500 max-w-lg mx-auto">
            O&apos;zingiz bilgan ustalarni baholang va boshqalarga yordam bering.
          </p>
        </section>

        {/* Masters List */}
        <section className="space-y-4">
          {masters.map((master, index) => (
            <div key={index} className="card-static p-5 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                {/* Avatar */}
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white text-xl font-bold">
                    {master.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{master.name}</h3>
                    <p className="text-sm text-primary-600">{master.profession}</p>
                  </div>
                </div>
                
                {/* Rating */}
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500 mr-2">Baholang:</span>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => handleRating(index, star)}
                      className={`p-1 transition-all hover:scale-110 ${
                        star <= master.rating ? 'text-amber-400' : 'text-gray-300'
                      }`}
                      aria-label={`${star} yulduz berish`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
                        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                      </svg>
                    </button>
                  ))}
                  {master.rating > 0 && (
                    <span className="ml-2 text-sm font-medium text-gray-700">
                      {master.rating}.0
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* Info Note */}
        <section className="mt-8">
          <div className="card-static p-5 bg-primary-50 border border-primary-100">
            <div className="flex items-start gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-primary-500 flex-shrink-0">
                <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
              </svg>
              <div>
                <h4 className="font-medium text-primary-800 mb-1">Baholash qoidalari</h4>
                <p className="text-sm text-primary-700">
                  Faqat o&apos;zingiz xizmat olgan ustalarni baholang. Adolatli baho bering 
                  — bu boshqa foydalanuvchilarga to&apos;g&apos;ri tanlov qilishda yordam beradi.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Success Toast */}
      {showSuccess && (
        <div className="fixed bottom-6 right-6 bg-green-500 text-white px-6 py-3 rounded-xl shadow-lg flex items-center gap-2 animate-slideUp z-50">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
          </svg>
          Bahoingiz saqlandi!
        </div>
      )}
    </>
  );
}
