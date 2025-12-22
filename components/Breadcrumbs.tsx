'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

// Map of paths to their readable names
const pathLabels: Record<string, string> = {
  home: 'Bosh sahifa',
  kurslar: 'Kurslar',
  calculator: 'Xom-ashyo kalkulyatori',
  boglanish: "Bog'lanish",
  profil: 'Profil',
  sertifikat: 'Sertifikat',
  darslar: 'Darslar',
  baholash: 'Baholash',
  // Course sub-pages
  svarka: 'Payvandchilik asoslari',
  santexnik: 'Santexnikada truba ishlari',
  chilangar: 'Chilangarlik',
  gipsakarton: 'Gipsokarton',
  chevar: 'Chevarchilik',
  elektrika: 'Elektrika',
  qurilish: 'Qurilish',
  tom: 'Tom yopish',
  // Calculator sub-pages
  patalog: "Patalog (shif) o'lchovi",
  pol: "Pol yuzasi o'lchovi",
  beton: 'Beton',
  gisht: "G'isht",
  kafel: 'Kafel',
};

interface BreadcrumbsProps {
  items?: BreadcrumbItem[];
  className?: string;
}

export default function Breadcrumbs({ items, className = '' }: BreadcrumbsProps) {
  const pathname = usePathname();

  // Generate breadcrumbs from path if items not provided
  const breadcrumbs: BreadcrumbItem[] = items || (() => {
    const paths = pathname.split('/').filter(Boolean);
    const crumbs: BreadcrumbItem[] = [{ label: 'Bosh sahifa', href: '/home' }];

    let currentPath = '';
    paths.forEach((path, index) => {
      currentPath += `/${path}`;
      const isLast = index === paths.length - 1;
      crumbs.push({
        label: pathLabels[path] || path.charAt(0).toUpperCase() + path.slice(1),
        href: isLast ? undefined : currentPath,
      });
    });

    return crumbs;
  })();

  // Don't render if only home page
  if (breadcrumbs.length <= 1) return null;

  return (
    <nav aria-label="Breadcrumb" className={`py-3 ${className}`}>
      <ol className="flex items-center flex-wrap gap-1 text-sm">
        {breadcrumbs.map((crumb, index) => (
          <li key={index} className="flex items-center">
            {index > 0 && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-4 h-4 text-gray-400 mx-1"
              >
                <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
              </svg>
            )}
            {crumb.href ? (
              <Link
                href={crumb.href}
                className="text-gray-500 hover:text-primary-500 transition-colors"
              >
                {index === 0 ? (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                    <path fillRule="evenodd" d="M9.293 2.293a1 1 0 011.414 0l7 7A1 1 0 0117 11h-1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-3a1 1 0 00-1-1H9a1 1 0 00-1 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-6H3a1 1 0 01-.707-1.707l7-7z" clipRule="evenodd" />
                  </svg>
                ) : (
                  crumb.label
                )}
              </Link>
            ) : (
              <span className="text-gray-900 font-medium">{crumb.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
