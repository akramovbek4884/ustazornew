import type { Metadata, Viewport } from 'next';
import './globals.css';
import { LanguageProvider } from '@/lib/i18n/LanguageContext';

export const metadata: Metadata = {
  metadataBase: new URL('https://ustazor.uz'),
  title: {
    default: "USTA ZO'R — Ustalarni toping va kasbni o'rganing",
    template: "%s | USTA ZO'R"
  },
  description: "USTA ZO'R — O'zbekistonning eng yaxshi ustalarini toping, video darsliklar orqali kasbni o'rganing va sertifikat oling. 500+ malakali ustalar, 50+ professional kurslar.",
  keywords: ['usta', 'ustalar', 'kurslar', 'video darslar', "o'zbek", 'payvandlash', 'santexnika', 'elektrika', 'qurilish'],
  authors: [{ name: 'USTA ZO\'R Team' }],
  creator: 'USTA ZO\'R',
  publisher: 'USTA ZO\'R',
  icons: {
    icon: '/img/logo ustajon.png',
    apple: '/img/logo ustajon.png',
  },
  manifest: '/manifest.json',
  openGraph: {
    type: 'website',
    locale: 'uz_UZ',
    url: 'https://ustazor.uz',
    siteName: "USTA ZO'R",
    title: "USTA ZO'R — Ustalarni toping va kasbni o'rganing",
    description: "O'zbekistonning eng yaxshi ustalarini toping, video darsliklar orqali kasbni o'rganing va sertifikat oling.",
    images: [
      {
        url: '/img/logo ustajon.png',
        width: 512,
        height: 512,
        alt: "USTA ZO'R Logo",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "USTA ZO'R — Ustalarni toping va kasbni o'rganing",
    description: "O'zbekistonning eng yaxshi ustalarini toping, video darsliklar orqali kasbni o'rganing.",
    images: ['/img/logo ustajon.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: '#0b76ef',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uz" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="bg-background-light text-neutral-900 min-h-screen antialiased">
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
