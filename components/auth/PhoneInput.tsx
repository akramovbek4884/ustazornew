'use client';

import React from 'react';

interface PhoneInputProps {
    value: string;
    onChange: (value: string) => void;
    disabled?: boolean;
}

export default function PhoneInput({ value, onChange, disabled }: PhoneInputProps) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let inputValue = e.target.value.replace(/\D/g, ''); // Remove non-digits

        // Ensure it starts with 998
        if (!inputValue.startsWith('998')) {
            // If user tries to delete 998, keep it or handle gracefully.
            // For simplicity, we can enforce the prefix or just let them type.
            // Creating a mask is better.
        }

        // Simple mask logic: +998 (XX) XXX-XX-XX
        // For now, let's just accept raw numbers and format display?
        onChange(inputValue);
    };

    return (
        <div className="relative">
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Telefon raqamingiz
            </label>
            <div className="relative rounded-xl shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">+</span>
                </div>
                <input
                    type="tel"
                    name="phone"
                    id="phone"
                    className="block w-full pl-7 pr-12 py-3 sm:text-sm border-gray-300 rounded-xl focus:ring-primary-500 focus:border-primary-500"
                    placeholder="998 90 123 45 67"
                    value={value}
                    onChange={handleChange}
                    disabled={disabled}
                    maxLength={12} // 998 + 9 digits
                />
            </div>
        </div>
    );
}
