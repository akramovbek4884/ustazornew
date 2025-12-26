'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-background-light flex flex-col">
      {/* Simple Header */}
      <header className="py-4 px-6 border-b border-gray-100 bg-white">
        <div className="max-w-[1400px] mx-auto">
          <Link href="/home" className="flex items-center gap-2">
            <Image
              src="/img/logo-new.png"
              alt="Usta Zo'r Logo"
              width={40}
              height={40}
              className="w-10 h-10"
            />
            <span className="font-bold text-lg text-primary-500">USTA ZO&apos;R</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="text-center max-w-md">
          {/* Error Illustration */}
          <div className="w-24 h-24 mx-auto mb-6 bg-red-50 rounded-full flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-12 h-12 text-red-500"
            >
              <path fillRule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
            </svg>
          </div>

          {/* Text Content */}
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
            Nimadir xato ketdi
          </h1>
          <p className="text-gray-500 mb-8 leading-relaxed">
            Kechirasiz, kutilmagan xatolik yuz berdi. Iltimos, qayta urinib ko&apos;ring yoki bosh sahifaga qayting.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={reset}
              className="btn btn-primary"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                <path fillRule="evenodd" d="M15.312 11.424a5.5 5.5 0 01-9.201 2.466l-.312-.311h2.433a.75.75 0 000-1.5H3.989a.75.75 0 00-.75.75v4.242a.75.75 0 001.5 0v-2.43l.31.31a7 7 0 0011.712-3.138.75.75 0 00-1.449-.39zm1.23-3.723a.75.75 0 00.219-.53V2.929a.75.75 0 00-1.5 0v2.43l-.31-.31A7 7 0 003.239 8.188a.75.75 0 101.448.389A5.5 5.5 0 0113.89 6.11l.311.31h-2.432a.75.75 0 000 1.5h4.243a.75.75 0 00.53-.219z" clipRule="evenodd" />
              </svg>
              Qayta urinish
            </button>
            <Link
              href="/home"
              className="btn btn-outline"
            >
              Bosh sahifaga
            </Link>
          </div>

          {/* Error Details (Development only) */}
          {process.env.NODE_ENV === 'development' && (
            <div className="mt-8 p-4 bg-gray-50 rounded-lg text-left">
              <p className="text-xs font-mono text-gray-600 break-all">
                {error.message}
              </p>
              {error.digest && (
                <p className="text-xs font-mono text-gray-400 mt-2">
                  Digest: {error.digest}
                </p>
              )}
            </div>
          )}
        </div>
      </main>

      {/* Simple Footer */}
      <footer className="py-4 text-center text-sm text-gray-500 border-t border-gray-100 bg-white">
        USTA ZO&apos;R &copy; {new Date().getFullYear()}
      </footer>
    </div>
  );
}
