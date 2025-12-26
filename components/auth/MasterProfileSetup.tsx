'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth, type User } from '@/lib/auth/AuthContext';
import { professions, regions, cities } from '@/lib/data';

export default function MasterProfileSetup() {
    const router = useRouter();
    const { user, updateProfile } = useAuth();
    const [formData, setFormData] = useState({
        name: user?.name || '',
        profession: user?.profession || '',
        region: user?.region || '',
        city: user?.city || '',
        experience: user?.experience || 0,
        bio: user?.bio || '',
        hourlyRate: 0,
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate API save
        await new Promise(resolve => setTimeout(resolve, 800));

        updateProfile({
            ...formData,
            profileCompleted: true
        } as Partial<User>);

        setIsLoading(false);
        router.push('/dashboard'); // or home
    };

    // Filter cities based on region
    const availableCities = formData.region
        ? cities.filter(c => c.regionId === regions.find(r => r.name === formData.region)?.id)
        : [];

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-2xl shadow-sm border border-gray-100 my-8">
            <div className="text-center mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Usta Profilini To&apos;ldirish</h1>
                <p className="text-gray-500">Mijozlar sizni topishi uchun ma&apos;lumotlaringizni kiriting</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Ism va Familiya</label>
                    <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        placeholder="Eshmat Toshmatov"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Mutaxassislik</label>
                    <select
                        name="profession"
                        required
                        value={formData.profession}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white"
                    >
                        <option value="">Tanlang</option>
                        {professions.map(p => (
                            <option key={p} value={p}>{p}</option>
                        ))}
                    </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Viloyat</label>
                        <select
                            name="region"
                            required
                            value={formData.region}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white"
                        >
                            <option value="">Tanlang</option>
                            {regions.map(r => (
                                <option key={r.id} value={r.name}>{r.name}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Shahar/Tuman</label>
                        <select
                            name="city"
                            required
                            value={formData.city}
                            onChange={handleInputChange}
                            disabled={!formData.region}
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white disabled:bg-gray-50"
                        >
                            <option value="">Tanlang</option>
                            {availableCities.map(c => (
                                <option key={c.id} value={c.name}>{c.name}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tajriba (yil)</label>
                    <input
                        type="number"
                        name="experience"
                        min="0"
                        max="50"
                        value={formData.experience}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">O&apos;zingiz haqingizda (bio)</label>
                    <textarea
                        name="bio"
                        rows={4}
                        value={formData.bio}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        placeholder="Qanday ishlarni bajarasiz? Afzalliklaringiz nimada?"
                    />
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-4 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl shadow-lg shadow-primary-500/30 transition-all"
                >
                    {isLoading ? 'Saqlanmoqda...' : 'Saqlash va Davom etish'}
                </button>
            </form>
        </div>
    );
}
