'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth, type UserRole } from '@/lib/auth/AuthContext';
import PhoneInput from '@/components/auth/PhoneInput';
import OTPVerification from '@/components/auth/OTPVerification';
import RoleSelection from '@/components/auth/RoleSelection';
import Image from 'next/image';
import Link from 'next/link';

type Step = 'phone' | 'otp' | 'role' | 'profile';

export default function RegisterPage() {
    const router = useRouter();
    const { login, register, verifyOTP } = useAuth();

    const [step, setStep] = useState<Step>('phone');
    const [phone, setPhone] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handlePhoneSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (phone.length < 9) return; // Simple check

        setIsLoading(true);
        // Request OTP logic here (mock)
        await new Promise(resolve => setTimeout(resolve, 800)); // Simulate delay
        setIsLoading(false);
        setStep('otp');
    };

    const handleVerify = async (otp: string): Promise<boolean> => {
        setIsLoading(true);
        const isValid = await verifyOTP(phone, otp);
        setIsLoading(false);

        if (isValid) {
            // If user exists, log in (omitted for now, assuming new user flow for "Register" page)
            // Actually, if we are in "Register", we proceed to Role Selection.
            setStep('role');
            return true;
        }
        return false;
    };

    const handleRoleSelect = async (role: UserRole) => {
        setIsLoading(true);
        await register(phone, role);
        setIsLoading(false);

        // If Master, maybe go to profile setup?
        // For MVP, just redirect to Dashboard or Home
        if (role === 'master') {
            // redirect to profile edit?
            router.push('/profil?edit=true');
        } else {
            router.push('/home');
        }
    };

    const renderStep = () => {
        switch (step) {
            case 'phone':
                return (
                    <div className="w-full max-w-sm mx-auto">
                        <div className="text-center mb-8">
                            <div className="relative w-16 h-16 mx-auto mb-4 rounded-2xl overflow-hidden shadow-lg">
                                <Image
                                    src="/img/logo-new.png"
                                    alt="Usta Zo'r"
                                    fill
                                    className="object-contain bg-white"
                                />
                            </div>
                            <h1 className="text-2xl font-bold text-gray-900">Ro&apos;yxatdan o&apos;tish</h1>
                            <p className="text-gray-500 mt-2">Xush kelibsiz! Davom etish uchun raqamingizni kiriting.</p>
                        </div>

                        <form onSubmit={handlePhoneSubmit} className="space-y-6">
                            <PhoneInput value={phone} onChange={setPhone} disabled={isLoading} />

                            <button
                                type="submit"
                                disabled={!phone || isLoading}
                                className="w-full py-3.5 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-xl transition-all shadow-lg shadow-primary-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoading ? 'Yuborilmoqda...' : 'Davom etish'}
                            </button>
                        </form>

                        <p className="text-center mt-6 text-sm text-gray-500">
                            Ro&apos;yxatdan o&apos;tganmisiz? <Link href="/auth/login" className="text-primary-600 font-semibold hover:underline">Kirish</Link>
                        </p>
                    </div>
                );

            case 'otp':
                return (
                    <OTPVerification
                        phone={phone}
                        onVerify={handleVerify}
                        onResend={() => {/* Mock resend */ }}
                        isLoading={isLoading}
                    />
                );

            case 'role':
                return <RoleSelection onSelect={handleRoleSelect} />;

            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
            {renderStep()}
        </div>
    );
}
