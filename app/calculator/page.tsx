'use client';

import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import { materials } from '@/lib/data';
import { useLanguage } from '@/lib/i18n/LanguageContext';

// Material titles in all languages
const materialTranslations: Record<string, { uz: string; ru: string; en: string }> = {
  'Beton': { uz: 'Beton', ru: 'Бетон', en: 'Concrete' },
  'Gisht': { uz: 'Gisht', ru: 'Кирпич', en: 'Brick' },
  'Kafel': { uz: 'Kafel', ru: 'Плитка', en: 'Tiles' },
  'Pol': { uz: 'Pol yuzasi', ru: 'Площадь пола', en: 'Floor area' },
  'Tom': { uz: 'Tom', ru: 'Кровля', en: 'Roofing' },
  'Patalog (shif)': { uz: "Patalog (shif) o'lchovi", ru: 'Потолок', en: 'Ceiling' },
};

export default function CalculatorPage() {
  const { t, language } = useLanguage();

  return (
    <>
      <Header />
      
      <main id="main-content" className="max-w-[1200px] mx-auto py-6 px-4 sm:px-6">
        <Breadcrumbs />
        
        {/* Hero Section */}
        <section className="mb-8">
          <div className="bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl p-6 sm:p-8 md:p-10 relative overflow-hidden">
            {/* Decorative */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-20 w-20 h-20 bg-secondary-400/20 rounded-full translate-y-1/2" />
            
            <div className="relative z-10 max-w-2xl">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
                {t.calculator.title}
              </h1>
              <p className="text-white/90 text-base sm:text-lg leading-relaxed">
                {t.calculator.description}
              </p>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">{t.calculator.howItWorks}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="card-static p-5 text-center">
              <div className="w-12 h-12 bg-primary-50 text-primary-600 rounded-xl flex items-center justify-center text-xl font-bold mx-auto mb-3">
                1
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">{t.calculator.step1}</h3>
              <p className="text-sm text-gray-500">{t.calculator.step1Desc}</p>
            </div>
            <div className="card-static p-5 text-center">
              <div className="w-12 h-12 bg-primary-50 text-primary-600 rounded-xl flex items-center justify-center text-xl font-bold mx-auto mb-3">
                2
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">{t.calculator.step2}</h3>
              <p className="text-sm text-gray-500">{t.calculator.step2Desc}</p>
            </div>
            <div className="card-static p-5 text-center">
              <div className="w-12 h-12 bg-primary-50 text-primary-600 rounded-xl flex items-center justify-center text-xl font-bold mx-auto mb-3">
                3
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">{t.calculator.step3}</h3>
              <p className="text-sm text-gray-500">{t.calculator.step3Desc}</p>
            </div>
          </div>
        </section>

        {/* Materials Grid */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">{t.calculator.materials}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {materials.map(material => {
              // Get translated title
              const baseTitle = material.title.replace("o'lchovi", '').trim();
              const translatedTitle = materialTranslations[baseTitle] 
                ? materialTranslations[baseTitle][language] 
                : material.title;
              
              // Get description based on language
              const getDescription = () => {
                if (language === 'ru') return `Калькулятор для ${translatedTitle.toLowerCase()}`;
                if (language === 'en') return `Calculator for ${translatedTitle.toLowerCase()}`;
                return `${translatedTitle} uchun miqdor hisoblagich`;
              };
              
              return (
                <Link 
                  key={material.id} 
                  href={material.href}
                  className="card overflow-hidden group"
                >
                  {/* Image */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
                    <Image 
                      src={material.image} 
                      alt={translatedTitle}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  
                  {/* Content */}
                  <div className="p-5">
                    <h3 className="font-semibold text-gray-900 text-lg mb-1 group-hover:text-primary-600 transition-colors">
                      {translatedTitle}
                    </h3>
                    <p className="text-sm text-gray-500 mb-4">
                      {getDescription()}
                    </p>
                    <span className="inline-flex items-center gap-2 text-primary-600 font-medium text-sm group-hover:gap-3 transition-all">
                      {t.calculator.calculate}
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                        <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                      </svg>
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Tips Section */}
        <section className="mt-10">
          <div className="card-static p-6 bg-amber-50 border border-amber-100">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-amber-600">
                  <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-amber-800 mb-1">{t.calculator.tip}</h3>
                <p className="text-sm text-amber-700 leading-relaxed">
                  {t.calculator.tipText}
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
