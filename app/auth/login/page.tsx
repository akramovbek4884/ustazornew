'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

// This page redirects to home - login is disabled
export default function LoginPage() {
    const router = useRouter();

    useEffect(() => {
        router.replace('/home');
    }, [router]);

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
                <div className="animate-spin w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full mx-auto mb-4"></div>
                <p className="text-gray-600">Yo&apos;naltirilmoqda...</p>
            </div>
        </div>
    );
}
