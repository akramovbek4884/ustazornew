'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { Master, Course } from '@/types';
import { masters, courses } from '@/lib/data';

interface RecommendationsProps {
    type: 'masters' | 'courses';
    currentId?: string;
    category?: string;
    limit?: number;
}

export default function Recommendations({
    type,
    currentId,
    category,
    limit = 4
}: RecommendationsProps) {
    const { language } = useLanguage();

    const { t } = useLanguage();

    const recommendedItems = useMemo(() => {
        if (type === 'masters') {
            return masters
                .filter(m => m.id !== currentId)
                .filter(m => !category || m.profession === category)
                .sort((a, b) => (b.rating || 0) - (a.rating || 0))
                .slice(0, limit);
        } else {
            return courses
                .filter(c => c.id !== currentId)
                .filter(c => !category || c.category === category)
                .sort((a, b) => (b.rating || 0) - (a.rating || 0))
                .slice(0, limit);
        }
    }, [type, currentId, category, limit]);

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('uz-UZ').format(price) + " so'm";
    };

    if (recommendedItems.length === 0) return null;

    return (
        <div>
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">
                    {type === 'masters' ? `👷 ${t.recommendations.recommendedMasters}` : `📚 ${t.recommendations.recommendedCourses}`}
                </h3>
                <Link
                    href={type === 'masters' ? '/home' : '/kurslar'}
                    className="text-yellow-500 hover:text-yellow-400 text-sm"
                >
                    {t.recommendations.viewAll} →
                </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {type === 'masters' ? (
                    (recommendedItems as Master[]).map((master) => (
                        <Link
                            key={master.id}
                            href={`/ustalar/${master.id}`}
                            className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4 hover:border-gray-600/50 transition-all group"
                        >
                            <div className="relative mb-3">
                                <Image
                                    src={master.avatar}
                                    alt={master.name}
                                    width={80}
                                    height={80}
                                    className="w-full aspect-square object-cover rounded-lg"
                                />
                                {master.isVerified && (
                                    <div className="absolute bottom-1 right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                )}
                            </div>
                            <h4 className="font-medium text-white text-sm group-hover:text-yellow-400 transition-colors truncate">
                                {master.name}
                            </h4>
                            <p className="text-gray-500 text-xs truncate">{master.profession}</p>
                            {master.rating && (
                                <div className="flex items-center gap-1 mt-2">
                                    <svg className="w-4 h-4 text-yellow-400 fill-yellow-400" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                    <span className="text-sm text-white">{master.rating}</span>
                                    <span className="text-xs text-gray-500">({master.reviewCount || 0})</span>
                                </div>
                            )}
                        </Link>
                    ))
                ) : (
                    (recommendedItems as Course[]).map((course) => (
                        <Link
                            key={course.id}
                            href={course.href}
                            className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl overflow-hidden hover:border-gray-600/50 transition-all group"
                        >
                            <div className="relative aspect-video">
                                <Image
                                    src={course.thumbnail}
                                    alt={course.title}
                                    fill
                                    className="object-cover"
                                />
                                {course.isFree && (
                                    <span className="absolute top-2 left-2 px-2 py-1 bg-green-500 text-white text-xs font-bold rounded">
                                        {t.recommendations.free}
                                    </span>
                                )}
                            </div>
                            <div className="p-3">
                                <h4 className="font-medium text-white text-sm group-hover:text-yellow-400 transition-colors line-clamp-2">
                                    {course.title}
                                </h4>
                                <div className="flex items-center justify-between mt-2">
                                    {course.rating && (
                                        <div className="flex items-center gap-1">
                                            <svg className="w-3 h-3 text-yellow-400 fill-yellow-400" viewBox="0 0 20 20">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                            <span className="text-xs text-white">{course.rating}</span>
                                        </div>
                                    )}
                                    <span className="text-xs text-gray-500">
                                        {course.lessons} {t.recommendations.lessons}
                                    </span>
                                </div>
                                <p className={`text-sm mt-1 font-medium ${course.isFree ? 'text-green-400' : 'text-yellow-400'}`}>
                                    {course.isFree ? t.recommendations.free : formatPrice(course.priceValue || 0)}
                                </p>
                            </div>
                        </Link>
                    ))
                )}
            </div>
        </div>
    );
}
