'use client';

import React from 'react';
import type { UserRole } from '@/lib/auth/AuthContext';

interface RoleSelectionProps {
    onSelect: (role: UserRole) => void;
}

export default function RoleSelection({ onSelect }: RoleSelectionProps) {
    return (
        <div className="w-full max-w-lg mx-auto">
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold mb-2">Siz kimsiz?</h2>
                <p className="text-gray-600">
                    Davom etish uchun o&apos;z rolingizni tanlang
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Master Role */}
                <button
                    onClick={() => onSelect('master')}
                    className="relative group p-6 border-2 border-gray-200 rounded-2xl hover:border-primary-500 hover:bg-primary-50 transition-all text-left"
                >
                    <div className="w-14 h-14 bg-primary-100 text-primary-600 rounded-xl flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform">
                        👷‍♂️
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Men Ustaman</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">
                        O&apos;z xizmatlarimni taklif qilmoqchiman, buyurtmalar olmoqchiman.
                    </p>
                </button>

                {/* Client/Learner Role */}
                <button
                    onClick={() => onSelect('client')}
                    className="relative group p-6 border-2 border-gray-200 rounded-2xl hover:border-blue-500 hover:bg-blue-50 transition-all text-left"
                >
                    <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform">
                        👤
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Men Buyurtmachiman</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">
                        Menga usta kerak yoki hunar o&apos;rganmoqchiman.
                    </p>
                </button>
            </div>
        </div>
    );
}
