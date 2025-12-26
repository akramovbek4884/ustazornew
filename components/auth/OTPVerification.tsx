'use client';

import React, { useRef, useState, useEffect } from 'react';

interface OTPVerificationProps {
    phone: string;
    onVerify: (otp: string) => Promise<boolean>;
    onResend: () => void;
    isLoading?: boolean;
}

export default function OTPVerification({ phone, onVerify, onResend, isLoading }: OTPVerificationProps) {
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [error, setError] = useState(false);
    const [timer, setTimer] = useState(60);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    useEffect(() => {
        // Focus first input
        if (inputRefs.current[0]) {
            inputRefs.current[0].focus();
        }
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setTimer((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const handleChange = (element: HTMLInputElement, index: number) => {
        if (isNaN(Number(element.value))) return false;

        const newOtp = [...otp];
        newOtp[index] = element.value;
        setOtp(newOtp);
        setError(false);

        // Focus next input
        if (element.value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }

        // Auto submit if last digit entered
        if (element.value && index === 5) {
            verify(newOtp.join(''));
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            // Focus previous input on backspace if current is empty
            inputRefs.current[index - 1]?.focus();
        }
    };

    const verify = async (code: string) => {
        if (code.length !== 6) return;
        const success = await onVerify(code);
        if (!success) {
            setError(true);
        }
    };

    const handleVerifyClick = () => {
        verify(otp.join(''));
    };

    const handleResendClick = () => {
        setTimer(60);
        setOtp(['', '', '', '', '', '']);
        setError(false);
        onResend();
        inputRefs.current[0]?.focus();
    };

    return (
        <div className="w-full max-w-md mx-auto">
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold mb-2">Tasdiqlash kodi</h2>
                <p className="text-gray-600">
                    <span className="font-semibold text-gray-900">{phone}</span> raqamiga yuborilgan tasdiqlash kodini kiriting
                </p>
            </div>

            <div className="flex justify-center gap-2 mb-6">
                {otp.map((data, index) => (
                    <input
                        key={index}
                        ref={(el) => { inputRefs.current[index] = el; }}
                        type="text"
                        maxLength={1}
                        value={data}
                        onChange={(e) => handleChange(e.target, index)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        className={`w-12 h-14 text-center text-2xl font-bold border rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all ${error ? 'border-red-500 bg-red-50 text-red-600' : 'border-gray-300 bg-white'
                            }`}
                    />
                ))}
            </div>

            {error && (
                <p className="text-red-500 text-center text-sm mb-4">
                    Kod noto&apos;g&apos;ri. Iltimos, qaytadan urinib ko&apos;ring.
                </p>
            )}

            <button
                onClick={handleVerifyClick}
                disabled={otp.some(d => !d) || isLoading}
                className="w-full py-3.5 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed mb-4 shadow-lg shadow-primary-500/30"
            >
                {isLoading ? 'Tekshirilmoqda...' : 'Tasdiqlash'}
            </button>

            <div className="text-center">
                {timer > 0 ? (
                    <p className="text-gray-500 text-sm">
                        Kodni qayta yuborish: <span className="font-medium text-gray-900">00:{timer.toString().padStart(2, '0')}</span>
                    </p>
                ) : (
                    <button
                        onClick={handleResendClick}
                        className="text-primary-600 font-medium hover:text-primary-700 text-sm hover:underline"
                    >
                        Kodni qayta yuborish
                    </button>
                )}
            </div>
        </div>
    );
}
