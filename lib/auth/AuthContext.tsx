'use client';

import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

export type UserRole = 'master' | 'client' | 'admin';

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
    services?: any[];
}

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    login: (phone: string) => Promise<boolean>;
    verifyOTP: (phone: string, otp: string) => Promise<boolean>;
    logout: () => void;
    updateProfile: (data: Partial<User>) => void;
    register: (phone: string, role: UserRole) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const tempRoleRef = useRef<UserRole | null>(null);

    useEffect(() => {
        checkSession();
    }, []);

    const checkSession = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            setIsLoading(false);
            return;
        }

        try {
            const res = await fetch('/api/auth/me', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await res.json();

            if (data.user) {
                setUser(data.user);
            } else {
                logout(); // Invalid token
            }
        } catch (error) {
            console.error('Session check failed', error);
            logout(); // Error -> logout
        } finally {
            setIsLoading(false);
        }
    };

    const login = async (phone: string): Promise<boolean> => {
        try {
            const res = await fetch('/api/auth/otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ phone })
            });
            const data = await res.json();
            if (data.success) {
                tempRoleRef.current = null; // Clear any reg role
                return true;
            }
            return false;
        } catch (error) {
            console.error('Login failed', error);
            return false;
        }
    };

    const register = async (phone: string, role: UserRole): Promise<boolean> => {
        try {
            const res = await fetch('/api/auth/otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ phone })
            });
            const data = await res.json();
            if (data.success) {
                tempRoleRef.current = role; // Store role for verification step
                return true;
            }
            return false;
        } catch (error) {
            console.error('Registration failed', error);
            return false;
        }
    };

    const verifyOTP = async (phone: string, otp: string): Promise<boolean> => {
        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    phone,
                    otp,
                    role: tempRoleRef.current // Send role if it was a registration flow
                })
            });

            const data = await res.json();

            if (data.success && data.token) {
                localStorage.setItem('token', data.token);
                // Also define user immediately from response
                setUser(data.user);
                return true;
            }

            return false;
        } catch (error) {
            console.error('Verify OTP failed', error);
            return false;
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('token');
        localStorage.removeItem('user'); // Cleanup old keys
        localStorage.removeItem('isLoggedIn');
        window.location.href = '/';
    };

    const updateProfile = async (data: Partial<User>) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return;

            const res = await fetch('/api/users/profile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(data)
            });

            if (res.ok) {
                setUser((prev) => {
                    if (!prev) return null;
                    return { ...prev, ...data };
                });
            } else {
                console.error('Failed to update profile backend');
            }
        } catch (error) {
            console.error('Update profile error', error);
        }
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
