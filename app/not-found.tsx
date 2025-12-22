'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import LanguageSwitcher from '@/components/LanguageSwitcher';

export default function NotFound() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background-light flex flex-col">
      {/* Simple Header */}
      <header className="py-4 px-6 border-b border-gray-100 bg-white">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between">
          <Link href="/home" className="flex items-center gap-2">
            <Image 
              src="/img/logo ustajon.png" 
              alt="Usta Zo'r Logo" 
              width={40} 
              height={40}
              className="w-10 h-10"
            />
            <span className="font-bold text-lg text-primary-500">USTA ZO&apos;R</span>
          </Link>
          <LanguageSwitcher />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="text-center max-w-md">
          {/* 404 Illustration */}
          <div className="relative mb-8">
            <div className="text-[150px] sm:text-[200px] font-bold text-primary-100 leading-none select-none">
              404
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-24 sm:w-32 sm:h-32 bg-primary-50 rounded-full flex items-center justify-center">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="currentColor" 
                  className="w-12 h-12 sm:w-16 sm:h-16 text-primary-500"
                >
                  <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>

          {/* Text Content */}
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
            {t.notFound.title}
          </h1>
          <p className="text-gray-500 mb-8 leading-relaxed">
            {t.notFound.description}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link 
              href="/home"
              className="btn btn-primary"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                <path fillRule="evenodd" d="M9.293 2.293a1 1 0 011.414 0l7 7A1 1 0 0117 11h-1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-3a1 1 0 00-1-1H9a1 1 0 00-1 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-6H3a1 1 0 01-.707-1.707l7-7z" clipRule="evenodd" />
              </svg>
              {t.notFound.backHome}
            </Link>
            <Link 
              href="/kurslar"
              className="btn btn-outline"
            >
              {t.notFound.viewCourses}
            </Link>
          </div>

          {/* Helpful Links */}
          <div className="mt-10 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-500 mb-4">{t.notFound.helpfulLinks}</p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <Link href="/home" className="text-primary-600 hover:underline">
                {t.nav.home}
              </Link>
              <Link href="/kurslar" className="text-primary-600 hover:underline">
                {t.nav.courses}
              </Link>
              <Link href="/calculator" className="text-primary-600 hover:underline">
                {t.nav.calculator}
              </Link>
              <Link href="/boglanish" className="text-primary-600 hover:underline">
                {t.nav.contact}
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Simple Footer */}
      <footer className="py-4 text-center text-sm text-gray-500 border-t border-gray-100 bg-white">
        USTA ZO&apos;R &copy; {new Date().getFullYear()}
      </footer>
    </div>
  );
}
