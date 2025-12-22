/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    screens: {
      'xs': '475px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        // Primary brand colors
        primary: {
          50: '#e6f2ff',
          100: '#cce5ff',
          200: '#99cbff',
          300: '#66b1ff',
          400: '#3397ff',
          500: '#0b76ef', // Main brand color
          600: '#0960c7',
          700: '#074a9f',
          800: '#053577',
          900: '#031f4f',
        },
        // Secondary accent colors
        secondary: {
          50: '#f0f4ff',
          100: '#e0e9ff',
          200: '#c7d7fe',
          300: '#a4bcfc',
          400: '#818ff8',
          500: '#6366f1', // Secondary brand color
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
        },
        // Accent colors for highlights
        accent: {
          cyan: '#38bdf8',
          teal: '#14b8a6',
          amber: '#f59e0b',
          green: '#22c55e',
          red: '#ef4444',
        },
        // Neutral colors
        neutral: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        },
        // Background colors
        background: {
          light: '#f3f6fb',
          card: '#ffffff',
          dark: '#0f172a',
          'dark-card': '#1e293b',
        },
        // Legacy support (keeping accent colors from above)
        'accent-hover': '#0960c7',
        dark: {
          bg: '#0f172a',
          card: '#1e293b',
          accent: '#38bdf8',
          accent2: '#6366f1',
          text: '#f1f5f9',
          muted: '#94a3b8',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      fontSize: {
        // Typography scale
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.6' }], // 16px base with 1.6 line-height
        'lg': ['1.125rem', { lineHeight: '1.6' }],
        'xl': ['1.25rem', { lineHeight: '1.5' }], // 20px
        '2xl': ['1.5rem', { lineHeight: '1.4' }], // 24px
        '3xl': ['2rem', { lineHeight: '1.3' }], // 32px
        '4xl': ['2.5rem', { lineHeight: '1.2' }], // 40px
        '5xl': ['3rem', { lineHeight: '1.1' }],
      },
      fontWeight: {
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
      },
      spacing: {
        // Additional spacing tokens
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
      },
      boxShadow: {
        // Card shadows
        'card': '0 2px 8px rgba(0, 0, 0, 0.08)',
        'card-hover': '0 12px 25px rgba(11, 76, 239, 0.12)',
        'card-lg': '0 4px 16px rgba(0, 0, 0, 0.1)',
        'button': '0 2px 4px rgba(11, 118, 239, 0.2)',
        'modal': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      },
      borderRadius: {
        'xl': '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      transitionTimingFunction: {
        'bounce-in': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease forwards',
        'slide-up': 'slideUp 0.3s ease forwards',
        'slide-down': 'slideDown 0.3s ease forwards',
        'scale-in': 'scaleIn 0.2s ease forwards',
        'shimmer': 'shimmer 2s infinite',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
      },
    },
  },
  plugins: [],
}
