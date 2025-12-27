'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { useAuth } from '@/lib/auth/AuthContext';
import LanguageSwitcher from './LanguageSwitcher';
import { mockNotifications } from '@/lib/data';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const pathname = usePathname();
  const router = useRouter();
  const { t, language } = useLanguage();
  const { user, logout } = useAuth();
  const isLoggedIn = !!user;

  // Check login status on mount
  useEffect(() => {
    setUnreadCount(mockNotifications.filter(n => !n.read).length);
  }, [pathname]);

  // Handle scroll effect for sticky header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setShowMoreMenu(false);
  }, [pathname]);



  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const navItems = [
    { label: t.nav.home, href: '/home' },
    { label: language === 'uz' ? "Ustalar" : language === 'ru' ? "Мастера" : "Masters", href: '/ustalar' },
    { label: t.nav.courses, href: '/kurslar' },
    { label: t.nav.calculator, href: '/calculator' },
  ];

  const moreItems = [
    { label: language === 'uz' ? "Ish e'lonlari" : language === 'ru' ? "Вакансии" : "Jobs", href: '/ishlar', icon: '💼' },
    { label: language === 'uz' ? "Forum" : language === 'ru' ? "Форум" : "Forum", href: '/forum', icon: '💬' },
    { label: language === 'uz' ? "Reyting" : language === 'ru' ? "Рейтинг" : "Leaderboard", href: '/leaderboard', icon: '🏆' },
    { label: language === 'uz' ? "Blog" : language === 'ru' ? "Блог" : "Blog", href: '/blog', icon: '📝' },
    { label: t.nav.contact, href: '/boglanish', icon: '📞' },
  ];

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/');

  return (
    <>
      <header
        className={`sticky top-0 z-[50] transition-all duration-300 ${scrolled
          ? 'bg-white shadow-lg py-2'
          : 'bg-gradient-to-r from-primary-500 to-primary-600 py-3'
          }`}
      >
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between gap-4">
            {/* Left: Government Logo + Brand */}
            <div className="flex items-center gap-3">
              {/* Government Logo - Yoshlar ishlari agentligi */}
              <div className={`hidden lg:flex items-center justify-center px-2 py-1 rounded-lg ${scrolled ? 'bg-white shadow-sm border border-gray-100' : 'bg-white/95 shadow-sm'}`}>
                <Image
                  src="/img/yoshlar-agentligi-logo.svg"
                  alt="O'zbekiston Respublikasi Yoshlar ishlari agentligi"
                  width={140}
                  height={36}
                  className="h-8 w-auto object-contain"
                />
              </div>

              {/* Main Brand Logo */}
              <Link href="/home" className="flex items-center gap-1.5 sm:gap-2 group shrink-0">
                <div className={`relative w-8 h-8 sm:w-11 sm:h-11 rounded-xl overflow-hidden transition-transform group-hover:scale-105 ${scrolled ? 'shadow-md' : ''}`}>
                  <Image
                    src="/img/logo-new.png"
                    alt="Usta Zo'r Logo"
                    fill
                    className="object-contain"
                  />
                </div>
                <span className={`font-bold text-base sm:text-xl tracking-tight transition-colors whitespace-nowrap ${scrolled ? 'text-primary-500' : 'text-white'
                  }`}>
                  USTA ZO&apos;R
                </span>
              </Link>
            </div>

            {/* Center: Main Navigation (Desktop) */}
            <nav className="hidden lg:flex items-center gap-1" role="navigation" aria-label="Asosiy navigatsiya">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative px-4 py-2 rounded-lg font-medium text-[15px] transition-all duration-200 ${scrolled
                    ? isActive(item.href)
                      ? 'text-primary-600 bg-primary-50'
                      : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                    : isActive(item.href)
                      ? 'text-white bg-white/20'
                      : 'text-white/90 hover:text-white hover:bg-white/10'
                    }`}
                  aria-current={isActive(item.href) ? 'page' : undefined}
                >
                  {item.label}
                </Link>
              ))}

              {/* More Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowMoreMenu(!showMoreMenu)}
                  className={`flex items-center gap-1 px-4 py-2 rounded-lg font-medium text-[15px] transition-all duration-200 ${scrolled
                    ? 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                    : 'text-white/90 hover:text-white hover:bg-white/10'
                    }`}
                >
                  {language === 'uz' ? "Ko'proq" : language === 'ru' ? "Ещё" : "More"}
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={`w-4 h-4 transition-transform ${showMoreMenu ? 'rotate-180' : ''}`}>
                    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                  </svg>
                </button>

                {showMoreMenu && (
                  <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 animate-fadeIn">
                    {moreItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors ${isActive(item.href) ? 'text-primary-600 bg-primary-50' : 'text-gray-700'
                          }`}
                      >
                        <span className="text-lg">{item.icon}</span>
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </nav>

            {/* Right: Language + Notifications + Profile/Auth */}
            <div className="flex items-center gap-1.5 sm:gap-3 ml-auto">
              {/* Language Switcher */}
              <LanguageSwitcher variant={scrolled ? 'default' : 'compact'} className="scale-90 sm:scale-100 origin-right" />

              {/* Notifications Bell (when logged in) */}
              {isLoggedIn && (
                <Link
                  href="/bildirishnomalar"
                  className={`relative flex items-center justify-center w-9 h-9 rounded-lg transition-all ${scrolled
                    ? 'bg-gray-100 hover:bg-gray-200'
                    : 'bg-white/10 hover:bg-white/20'
                    }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`w-5 h-5 ${scrolled ? 'text-gray-700' : 'text-white'}`}>
                    <path fillRule="evenodd" d="M5.25 9a6.75 6.75 0 0113.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 01-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 11-7.48 0 24.585 24.585 0 01-4.831-1.244.75.75 0 01-.298-1.205A8.217 8.217 0 005.25 9.75V9zm4.502 8.9a2.25 2.25 0 104.496 0 25.057 25.057 0 01-4.496 0z" clipRule="evenodd" />
                  </svg>
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </Link>
              )}

              {/* Messages (when logged in) - Hidden on extra small mobile */}
              {isLoggedIn && (
                <Link
                  href="/xabarlar"
                  className={`hidden md:flex items-center justify-center w-9 h-9 rounded-lg transition-all ${scrolled
                    ? 'bg-gray-100 hover:bg-gray-200'
                    : 'bg-white/10 hover:bg-white/20'
                    }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`w-5 h-5 ${scrolled ? 'text-gray-700' : 'text-white'}`}>
                    <path d="M4.848 2.771A49.144 49.144 0 0112 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 2.024 3.348 3.97v6.02c0 1.946-1.37 3.678-3.348 3.97a48.901 48.901 0 01-3.476.383.39.39 0 00-.297.17l-2.755 4.133a.75.75 0 01-1.248 0l-2.755-4.133a.39.39 0 00-.297-.17 48.9 48.9 0 01-3.476-.384c-1.978-.29-3.348-2.024-3.348-3.97V6.741c0-1.946 1.37-3.68 3.348-3.97z" />
                  </svg>
                </Link>
              )}

              {/* Telegram Link */}
              <a
                href="https://t.me/usta_zor"
                target="_blank"
                rel="noopener noreferrer"
                className={`hidden sm:flex items-center justify-center w-9 h-9 rounded-lg transition-all ${scrolled
                  ? 'bg-[#0088cc]/10 hover:bg-[#0088cc]/20'
                  : 'bg-white/10 hover:bg-white/20'
                  }`}
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

              {/* Profile/Login/Logout Buttons */}
              {isLoggedIn ? (
                <div className="flex items-center gap-2">
                  {/* Dashboard Button */}
                  <Link
                    href="/dashboard"
                    className={`hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl font-semibold text-sm transition-all ${scrolled
                      ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      : 'bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm'
                      }`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                      <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
                      <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
                    </svg>
                  </Link>

                  {/* Profile Button - Hidden on mobile, available in menu */}
                  <Link
                    href="/profil"
                    className={`hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl font-semibold text-sm transition-all ${scrolled
                      ? 'bg-primary-500 text-white hover:bg-primary-600 shadow-sm'
                      : 'bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm'
                      }`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                      <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clipRule="evenodd" />
                    </svg>
                    <span className="hidden sm:inline">{t.nav.profile}</span>
                  </Link>

                  {/* Logout Button - Hidden on mobile, available in menu */}
                  <button
                    onClick={handleLogout}
                    className={`hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl font-semibold text-sm transition-all ${scrolled
                      ? 'bg-red-50 text-red-600 hover:bg-red-100'
                      : 'bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm'
                      }`}
                    title={t.nav.logout}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                      <path fillRule="evenodd" d="M7.5 3.75A1.5 1.5 0 006 5.25v13.5a1.5 1.5 0 001.5 1.5h6a1.5 1.5 0 001.5-1.5V15a.75.75 0 011.5 0v3.75a3 3 0 01-3 3h-6a3 3 0 01-3-3V5.25a3 3 0 013-3h6a3 3 0 013 3V9A.75.75 0 0115 9V5.25a1.5 1.5 0 00-1.5-1.5h-6zm10.72 4.72a.75.75 0 011.06 0l3 3a.75.75 0 010 1.06l-3 3a.75.75 0 11-1.06-1.06l1.72-1.72H9a.75.75 0 010-1.5h10.94l-1.72-1.72a.75.75 0 010-1.06z" clipRule="evenodd" />
                    </svg>
                    <span className="hidden xl:inline">{t.nav.logout}</span>
                  </button>
                </div>
              ) : null}

            </div>
          </div>
        </div>
      </header>



      {/* Close dropdown when clicking outside */}
      {
        showMoreMenu && (
          <div
            className="fixed inset-0 z-[99]"
            onClick={() => setShowMoreMenu(false)}
            aria-hidden="true"
          />
        )
      }
    </>
  );
}
