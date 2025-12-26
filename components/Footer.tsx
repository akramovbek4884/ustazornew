'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();

  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
        {/* Main Footer Content */}
        <div className="py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/home" className="flex items-center gap-2 mb-4">
              <Image
                src="/img/logo-new.png"
                alt="Usta Zo'r Logo"
                width={40}
                height={40}
                className="w-10 h-10"
              />
              <span className="font-bold text-lg text-gray-900">USTA ZO&apos;R</span>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed mb-4">
              {t.footer.description}
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://t.me/usta_zor"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#0088cc]/10 hover:bg-[#0088cc]/20 transition-colors"
                aria-label="Telegram"
              >
                <Image
                  src="/img/Telegramlogo.png"
                  alt="Telegram"
                  width={20}
                  height={20}
                  className="w-5 h-5"
                />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">{t.footer.quickLinks}</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/home" className="text-gray-500 hover:text-primary-500 transition-colors text-sm">
                  {t.nav.home}
                </Link>
              </li>
              <li>
                <Link href="/kurslar" className="text-gray-500 hover:text-primary-500 transition-colors text-sm">
                  {t.nav.courses}
                </Link>
              </li>
              <li>
                <Link href="/calculator" className="text-gray-500 hover:text-primary-500 transition-colors text-sm">
                  {t.nav.calculator}
                </Link>
              </li>
              <li>
                <Link href="/sertifikat" className="text-gray-500 hover:text-primary-500 transition-colors text-sm">
                  {t.courses.getCertificate}
                </Link>
              </li>
            </ul>
          </div>

          {/* Courses */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">{t.footer.courses}</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/darslar/svarka" className="text-gray-500 hover:text-primary-500 transition-colors text-sm">
                  {t.home.categories.welding}
                </Link>
              </li>
              <li>
                <Link href="/darslar/santexnik" className="text-gray-500 hover:text-primary-500 transition-colors text-sm">
                  {t.home.categories.plumbing}
                </Link>
              </li>
              <li>
                <Link href="/darslar/elektrika" className="text-gray-500 hover:text-primary-500 transition-colors text-sm">
                  {t.home.categories.electrical}
                </Link>
              </li>
              <li>
                <Link href="/darslar/qurilish" className="text-gray-500 hover:text-primary-500 transition-colors text-sm">
                  {t.home.categories.construction}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">{t.footer.contact}</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5">
                  <path fillRule="evenodd" d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z" clipRule="evenodd" />
                </svg>
                <a href="tel:+998944136262" className="text-gray-500 hover:text-primary-500 transition-colors text-sm">
                  +998 94 413 62 62
                </a>
              </li>
              <li className="flex items-start gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5">
                  <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                  <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
                </svg>
                <a href="mailto:info@ustazor.uz" className="text-gray-500 hover:text-primary-500 transition-colors text-sm">
                  info@ustazor.uz
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-5 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-3">
          <div className="flex items-center gap-3 text-sm text-gray-500">
            <span>USTA ZO&apos;R &copy; {currentYear}</span>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:inline">{t.footer.allRights}</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-500">
            <span className="text-gray-400">{t.footer.partnership}</span>
            <div className="bg-white px-3 py-2 rounded-lg border border-gray-200 shadow-sm">
              <Image
                src="/img/yoshlar-agentligi-logo.svg"
                alt="O'zbekiston Respublikasi Yoshlar ishlari agentligi"
                width={200}
                height={48}
                className="h-10 w-auto object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
