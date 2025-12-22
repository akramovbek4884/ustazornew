'use client';

import { useState, useRef, useEffect } from 'react';
import { useLanguage, Language } from '@/lib/i18n/LanguageContext';

const languages: { code: Language; label: string; flag: string }[] = [
  { code: 'uz', label: "O'zbekcha", flag: '🇺🇿' },
  { code: 'ru', label: 'Русский', flag: '🇷🇺' },
  { code: 'en', label: 'English', flag: '🇬🇧' },
];

interface LanguageSwitcherProps {
  variant?: 'default' | 'compact';
  className?: string;
}

export default function LanguageSwitcher({ variant = 'default', className = '' }: LanguageSwitcherProps) {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLang = languages.find(l => l.code === language) || languages[0];

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close dropdown on escape key
  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    }

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-2 rounded-lg transition-all duration-200
          ${variant === 'compact'
            ? 'bg-white/10 hover:bg-white/20 text-white text-sm'
            : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-700 border border-neutral-200'
          }
        `}
        aria-label="Tilni tanlash / Выбрать язык"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span className="text-lg">{currentLang.flag}</span>
        <span className="font-medium hidden xs:inline">
          {variant === 'compact' ? currentLang.code.toUpperCase() : currentLang.label}
        </span>
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div
          className="absolute right-0 top-full mt-2 bg-white rounded-lg shadow-lg border border-neutral-200 py-1 min-w-[160px] z-50 animate-fadeIn"
          role="listbox"
          aria-label="Tillar / Языки"
        >
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                setLanguage(lang.code);
                setIsOpen(false);
              }}
              className={`
                w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors
                ${language === lang.code
                  ? 'bg-primary-50 text-primary-600'
                  : 'text-neutral-700 hover:bg-neutral-50'
                }
              `}
              role="option"
              aria-selected={language === lang.code}
            >
              <span className="text-xl">{lang.flag}</span>
              <span className="font-medium">{lang.label}</span>
              {language === lang.code && (
                <svg className="w-5 h-5 ml-auto text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
