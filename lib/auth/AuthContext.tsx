'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'master' | 'client';

export interface User {
    id: string;
    phone: string;
    role: UserRole;
    name?: string;
    profileCompleted: boolean;
    // Additional fields for Masters
    profession?: string;
    region?: string;
    city?: string;
    bio?: string;
    experience?: number;
    services?: any[]; // Simplified for now
}

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    login: (phone: string) => Promise<boolean>;
    verifyOTP: (phone: string, otp: string) => Promise<boolean>;
    logout: () => void;
    updateProfile: (data: Partial<User>) => void;
    register: (phone: string, role: UserRole) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Check local storage on mount
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (e) {
                console.error('Failed to parse user data', e);
                localStorage.removeItem('user');
            }
        }
        setIsLoading(false);
    }, []);

    const login = async (phone: string): Promise<boolean> => {
        // Simulate API call
        return new Promise((resolve) => {
            setTimeout(() => {
                // For demo, always return true to proceed to OTP
                resolve(true);
            }, 1000);
        });
    };

    const verifyOTP = async (phone: string, otp: string): Promise<boolean> => {
        // Simulate API verification
        // In real app, verify OTP with backend
        return new Promise((resolve) => {
            setTimeout(() => {
                if (otp === '123456') { // Mock OTP
                    // Check if user exists in "database" (localStorage for now or mock data)
                    // For this flow, we might be verifying for login or registration.
                    // Let's assume if they are verifying, they are authenticated.
                    // If we had a real backend, we'd get the user object back.

                    // Here we don't set user yet if it's new registration? 
                    // Actually, usually OTP returns a token and user info.

                    // For now, let's say verification adds a "verified" state but we need to know if they are new.
                    resolve(true);
                } else {
                    resolve(false);
                }
            }, 1000);
        });
    };

    const register = async (phone: string, role: UserRole) => {
        const newUser: User = {
            id: Math.random().toString(36).substr(2, 9),
            phone,
            role,
            profileCompleted: false,
        };
        setUser(newUser);
        localStorage.setItem('user', JSON.stringify(newUser));
    };


    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
        localStorage.removeItem('isLoggedIn'); // Cleanup old key if exists
        window.location.href = '/';
    };

    const updateProfile = (data: Partial<User>) => {
        setUser((prev) => {
            if (!prev) return null;
            const updated = { ...prev, ...data };
            localStorage.setItem('user', JSON.stringify(updated));
            return updated;
        });
    };

    return (
        <AuthContext.Provider value={{ user, isLoading, login, verifyOTP, logout, updateProfile, register }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
