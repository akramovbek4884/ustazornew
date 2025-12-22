'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/lib/i18n/LanguageContext';

interface WriteReviewModalProps {
    isOpen: boolean;
    onClose: () => void;
    masterName: string;
    masterId: string;
    onSubmit: (review: ReviewData) => void;
}

interface ReviewData {
    masterId: string;
    rating: number;
    comment: string;
    photos: string[];
}

export default function WriteReviewModal({
    isOpen,
    onClose,
    masterName,
    masterId,
    onSubmit
}: WriteReviewModalProps) {
    const { language } = useLanguage();
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [comment, setComment] = useState('');
    const [photos, setPhotos] = useState<string[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const { t } = useLanguage();

    const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && photos.length < 3) {
            const remainingSlots = 3 - photos.length;
            const filesToProcess = Array.from(files).slice(0, remainingSlots);

            filesToProcess.forEach(file => {
                const reader = new FileReader();
                reader.onload = (event) => {
                    if (event.target?.result) {
                        setPhotos(prev => [...prev, event.target!.result as string]);
                    }
                };
                reader.readAsDataURL(file);
            });
        }
    };

    const removePhoto = (index: number) => {
        setPhotos(prev => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = async () => {
        if (rating === 0) {
            alert(t.review.ratingRequired);
            return;
        }

        setIsSubmitting(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        onSubmit({
            masterId,
            rating,
            comment,
            photos
        });

        setIsSubmitting(false);
        setRating(0);
        setComment('');
        setPhotos([]);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 w-full sm:rounded-2xl sm:max-w-lg shadow-2xl border-t sm:border border-gray-700/50 max-h-[95vh] sm:max-h-[90vh] overflow-y-auto rounded-t-2xl">
                {/* Header */}
                <div className="sticky top-0 bg-gray-900/95 backdrop-blur-sm p-4 sm:p-6 border-b border-gray-700/50 z-10">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-lg sm:text-xl font-bold text-white">{t.review.title}</h2>
                            <p className="text-gray-400 text-sm mt-1">{masterName}</p>
                        </div>
                        <button onClick={onClose} className="sm:hidden p-2 text-gray-400 hover:text-white">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="p-4 sm:p-6 space-y-5 sm:space-y-6">
                    {/* Star Rating */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-3">
                            {t.review.ratingLabel}
                        </label>
                        <div className="flex items-center gap-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    type="button"
                                    onClick={() => setRating(star)}
                                    onMouseEnter={() => setHoverRating(star)}
                                    onMouseLeave={() => setHoverRating(0)}
                                    className="transition-transform hover:scale-110"
                                >
                                    <svg
                                        className={`w-10 h-10 transition-colors ${star <= (hoverRating || rating)
                                            ? 'text-yellow-400 fill-yellow-400'
                                            : 'text-gray-600'
                                            }`}
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        fill="none"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                                        />
                                    </svg>
                                </button>
                            ))}
                            {(hoverRating || rating) > 0 && (
                                <span className="ml-3 text-yellow-400 font-medium">
                                    {t.review.stars[(hoverRating || rating) - 1]}
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Comment */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            {t.review.commentLabel}
                        </label>
                        <textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder={t.review.commentPlaceholder}
                            rows={4}
                            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500 transition-all resize-none"
                        />
                    </div>

                    {/* Photo Upload */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            {t.review.addPhotos} <span className="text-gray-500">{t.review.maxPhotos}</span>
                        </label>

                        <div className="flex flex-wrap gap-3">
                            {photos.map((photo, index) => (
                                <div key={index} className="relative group">
                                    <Image
                                        src={photo}
                                        alt={`Upload ${index + 1}`}
                                        width={80}
                                        height={80}
                                        className="w-20 h-20 object-cover rounded-lg border border-gray-700"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removePhoto(index)}
                                        className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        ×
                                    </button>
                                </div>
                            ))}

                            {photos.length < 3 && (
                                <button
                                    type="button"
                                    onClick={() => fileInputRef.current?.click()}
                                    className="w-20 h-20 border-2 border-dashed border-gray-600 rounded-lg flex items-center justify-center text-gray-500 hover:border-yellow-500 hover:text-yellow-500 transition-colors"
                                >
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                                    </svg>
                                </button>
                            )}

                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={handlePhotoUpload}
                                className="hidden"
                            />
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="sticky bottom-0 bg-gray-900/95 backdrop-blur-sm p-4 sm:p-6 border-t border-gray-700/50 flex flex-col sm:flex-row gap-3">
                    <button
                        type="button"
                        onClick={onClose}
                        className="order-2 sm:order-1 flex-1 px-4 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-xl font-medium transition-colors"
                    >
                        {t.review.cancel}
                    </button>
                    <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={isSubmitting || rating === 0}
                        className="order-1 sm:order-2 flex-1 px-4 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-black font-bold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {isSubmitting ? (
                            <>
                                <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                </svg>
                                <span>...</span>
                            </>
                        ) : (
                            t.review.submit
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}
