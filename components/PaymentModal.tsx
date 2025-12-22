'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/lib/i18n/LanguageContext';

interface PaymentModalProps {
    isOpen: boolean;
    onClose: () => void;
    amount: number;
    serviceName: string;
    onPaymentComplete: (method: string) => void;
}

export default function PaymentModal({
    isOpen,
    onClose,
    amount,
    serviceName,
    onPaymentComplete
}: PaymentModalProps) {
    const { language } = useLanguage();
    const [selectedMethod, setSelectedMethod] = useState<string>('');
    const [isProcessing, setIsProcessing] = useState(false);

    const { t } = useLanguage();

    const paymentMethods = [
        {
            id: 'payme',
            name: 'Payme',
            logo: 'https://cdn.payme.uz/logos/payme.svg',
            color: 'from-[#00CCCC] to-[#00AAAA]'
        },
        {
            id: 'click',
            name: 'Click',
            logo: 'https://click.uz/click/images/logo.svg',
            color: 'from-[#00B4E6] to-[#0091BD]'
        },
        {
            id: 'uzum',
            name: 'Uzum Bank',
            logo: 'https://uzum.uz/static/img/logo.svg',
            color: 'from-[#7B2BFF] to-[#5B1BC6]'
        }
    ];

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('uz-UZ').format(price) + " so'm";
    };

    const handlePayment = async () => {
        if (!selectedMethod) return;

        setIsProcessing(true);

        // Simulate payment processing
        await new Promise(resolve => setTimeout(resolve, 2000));

        setIsProcessing(false);
        onPaymentComplete(selectedMethod);
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
            <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 w-full sm:rounded-2xl sm:max-w-md shadow-2xl border-t sm:border border-gray-700/50 max-h-[90vh] overflow-y-auto rounded-t-2xl">
                {/* Header */}
                <div className="sticky top-0 bg-gray-900/95 backdrop-blur-sm p-4 sm:p-6 border-b border-gray-700/50 z-10">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-lg sm:text-xl font-bold text-white">{t.payment.title}</h2>
                            <p className="text-gray-400 text-xs sm:text-sm mt-0.5 sm:mt-1">{serviceName}</p>
                        </div>
                        <div className="flex items-center gap-1 text-green-400 text-xs">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                            </svg>
                            {t.payment.secure}
                        </div>
                    </div>
                </div>

                {/* Amount */}
                <div className="p-6 border-b border-gray-700/50">
                    <div className="text-center">
                        <p className="text-gray-400 text-sm mb-1">{t.payment.amount}</p>
                        <p className="text-3xl font-bold text-white">{formatPrice(amount)}</p>
                    </div>
                </div>

                {/* Payment Methods */}
                <div className="p-6 space-y-3">
                    <p className="text-sm text-gray-400 mb-4">{t.payment.selectMethod}</p>

                    {paymentMethods.map((method) => (
                        <button
                            key={method.id}
                            onClick={() => setSelectedMethod(method.id)}
                            className={`w-full p-4 rounded-xl border-2 transition-all flex items-center gap-4 ${selectedMethod === method.id
                                ? 'border-yellow-500 bg-yellow-500/10'
                                : 'border-gray-700 hover:border-gray-600 bg-gray-800/50'
                                }`}
                        >
                            <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${method.color} flex items-center justify-center p-2`}>
                                <span className="text-white font-bold text-sm">{method.name[0]}</span>
                            </div>
                            <span className="font-semibold text-white">{method.name}</span>
                            {selectedMethod === method.id && (
                                <svg className="w-6 h-6 text-yellow-500 ml-auto" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                            )}
                        </button>
                    ))}
                </div>

                {/* Footer */}
                <div className="sticky bottom-0 bg-gray-900/95 backdrop-blur-sm p-4 sm:p-6 border-t border-gray-700/50 flex flex-col sm:flex-row gap-3">
                    <button
                        type="button"
                        onClick={onClose}
                        className="order-2 sm:order-1 flex-1 px-4 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-xl font-medium transition-colors"
                    >
                        {t.payment.cancel}
                    </button>
                    <button
                        type="button"
                        onClick={handlePayment}
                        disabled={!selectedMethod || isProcessing}
                        className="order-1 sm:order-2 flex-1 px-4 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-black font-bold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {isProcessing ? (
                            <>
                                <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                </svg>
                                <span>{t.payment.processing}</span>
                            </>
                        ) : (
                            <>
                                {t.payment.pay}
                                <span className="font-normal">({formatPrice(amount)})</span>
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}
