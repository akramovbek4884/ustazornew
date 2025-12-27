'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { useAuth } from '@/lib/auth/AuthContext';

export default function BottomNav() {
    const pathname = usePathname();
    const { t, language } = useLanguage();
    const { user } = useAuth();
    const isLoggedIn = !!user;

    const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/');

    return (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-[100] pb-safe">
            <div className="flex justify-around items-center h-16 px-1">
                {/* Home */}
                <Link
                    href="/home"
                    className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${isActive('/home') ? 'text-primary-600' : 'text-gray-500'
                        }`}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
                        <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
                    </svg>
                    <span className="text-[10px] font-medium leading-none">{t.nav.home}</span>
                </Link>

                {/* Ustalar */}
                <Link
                    href="/ustalar"
                    className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${isActive('/ustalar') ? 'text-primary-600' : 'text-gray-500'
                        }`}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path fillRule="evenodd" d="M8.25 6.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM15.75 9.75a3 3 0 116 0 3 3 0 01-6 0zM2.25 9.75a3 3 0 116 0 3 3 0 01-6 0zM6.31 15.117A6.745 6.745 0 0112 12a6.745 6.745 0 016.709 7.498.75.75 0 01-.372.568A12.696 12.696 0 0112 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 01-.372-.568 6.787 6.787 0 011.019-4.38z" clipRule="evenodd" />
                        <path d="M5.082 14.254a8.287 8.287 0 00-1.308 5.135 9.687 9.687 0 01-1.764-.44l-.115-.04a.563.563 0 01-.373-.487l-.01-.121a3.75 3.75 0 013.57-4.047zM20.226 19.389a8.287 8.287 0 00-1.308-5.135 3.75 3.75 0 013.57 4.047l-.01.121a.563.563 0 01-.373.486l-.115.04c-.567.2-1.156.349-1.764.441z" />
                    </svg>
                    <span className="text-[10px] font-medium leading-none">
                        {language === 'uz' ? "Ustalar" : language === 'ru' ? "Мастера" : "Masters"}
                    </span>
                </Link>

                {/* Courses */}
                <Link
                    href="/kurslar"
                    className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${isActive('/kurslar') ? 'text-primary-600' : 'text-gray-500'
                        }`}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path d="M11.25 4.533A9.707 9.707 0 006 3.75a9.707 9.707 0 00-6 3.033v10.263A9.707 9.707 0 016 15c1.333 0 2.628.38 3.75 1.05V4.533zM12.75 4.533V16.05c1.122-.67 2.417-1.05 3.75-1.05a9.707 9.707 0 016 3.033V7.783A9.707 9.707 0 0016.5 4.75a9.707 9.707 0 00-3.75-.217z" />
                    </svg>
                    <span className="text-[10px] font-medium leading-none">{t.nav.courses}</span>
                </Link>

                {/* Profile */}
                <Link
                    href="/profil"
                    className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${isActive('/profil') ? 'text-primary-600' : 'text-gray-500'
                        }`}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
                    </svg>
                    <span className="text-[10px] font-medium leading-none">
                        {t.nav.profile}
                    </span>
                </Link>
            </div>
        </div>
    );
}
