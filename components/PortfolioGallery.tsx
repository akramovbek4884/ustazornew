'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { PortfolioItem } from '@/types';

interface PortfolioGalleryProps {
    items: PortfolioItem[];
    masterName?: string;
}

export default function PortfolioGallery({ items, masterName }: PortfolioGalleryProps) {
    const { language } = useLanguage();
    const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);

    const { t } = useLanguage();

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString(
            language === 'ru' ? 'ru-RU' : language === 'en' ? 'en-US' : 'uz-UZ',
            { month: 'long', year: 'numeric' }
        );
    };

    if (items.length === 0) {
        return (
            <div className="text-center py-8 text-gray-500">
                {t.portfolio.noItems}
            </div>
        );
    }

    return (
        <div>
            <h3 className="text-lg font-semibold text-white mb-4">📸 {t.portfolio.portfolio}</h3>

            {/* Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {items.map((item) => (
                    <div
                        key={item.id}
                        onClick={() => {
                            setSelectedItem(item);
                            setSelectedImageIndex(0);
                        }}
                        className="group cursor-pointer relative aspect-square rounded-xl overflow-hidden"
                    >
                        <Image
                            src={item.images[0]}
                            alt={item.title}
                            fill
                            className="object-cover transition-transform group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="absolute bottom-0 left-0 right-0 p-3">
                                <h4 className="text-white font-medium text-sm truncate">{item.title}</h4>
                                <p className="text-gray-400 text-xs">{item.category}</p>
                            </div>
                        </div>
                        {item.images.length > 1 && (
                            <div className="absolute top-2 right-2 px-2 py-1 bg-black/60 rounded-lg text-white text-xs">
                                +{item.images.length - 1}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Lightbox Modal */}
            {selectedItem && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div
                        className="absolute inset-0 bg-black/90 backdrop-blur-sm"
                        onClick={() => setSelectedItem(null)}
                    />

                    <div className="relative max-w-4xl w-full max-h-[90vh] flex flex-col items-center">
                        {/* Close Button */}
                        <button
                            onClick={() => setSelectedItem(null)}
                            className="absolute -top-2 -right-2 sm:-top-12 sm:right-0 bg-red-500 sm:bg-transparent p-2 sm:p-0 rounded-full text-white hover:text-gray-300 transition-colors z-[60]"
                        >
                            <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        {/* Main Image Container */}
                        <div className="relative w-full aspect-[4/3] sm:aspect-video bg-gray-950 rounded-xl overflow-hidden shadow-2xl">
                            <Image
                                src={selectedItem.images[selectedImageIndex]}
                                alt={selectedItem.title}
                                fill
                                className="object-contain"
                            />

                            {/* Navigation Arrows */}
                            {selectedItem.images.length > 1 && (
                                <>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setSelectedImageIndex(prev =>
                                                prev === 0 ? selectedItem.images.length - 1 : prev - 1
                                            );
                                        }}
                                        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-colors"
                                    >
                                        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                                        </svg>
                                    </button>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setSelectedImageIndex(prev =>
                                                prev === selectedItem.images.length - 1 ? 0 : prev + 1
                                            );
                                        }}
                                        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-colors"
                                    >
                                        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                        </svg>
                                    </button>
                                </>
                            )}
                        </div>

                        {/* Thumbnails */}
                        {selectedItem.images.length > 1 && (
                            <div className="flex gap-2 mt-4 justify-center">
                                {selectedItem.images.map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setSelectedImageIndex(idx)}
                                        className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${idx === selectedImageIndex
                                            ? 'border-yellow-500'
                                            : 'border-transparent opacity-60 hover:opacity-100'
                                            }`}
                                    >
                                        <Image
                                            src={img}
                                            alt={`Thumbnail ${idx + 1}`}
                                            width={64}
                                            height={64}
                                            className="w-full h-full object-cover"
                                        />
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Info */}
                        <div className="mt-3 sm:mt-4 text-center px-2">
                            <h3 className="text-lg sm:text-xl font-semibold text-white">{selectedItem.title}</h3>
                            {selectedItem.description && (
                                <p className="text-gray-400 mt-1 sm:mt-2 text-sm sm:text-base line-clamp-2">{selectedItem.description}</p>
                            )}
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-4 mt-2 sm:mt-3 text-xs sm:text-sm text-gray-500">
                                <span>{t.portfolio.completedAt}: {formatDate(selectedItem.completedAt)}</span>
                                {selectedItem.client && (
                                    <span>{t.portfolio.client}: {selectedItem.client}</span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
