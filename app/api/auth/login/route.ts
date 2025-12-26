import { NextResponse } from 'next/server';
import db from '@/lib/db';
import { v4 as uuidv4 } from 'uuid';

export async function POST(req: Request) {
    try {
        const { phone, otp, role } = await req.json();

        if (!phone || !otp) {
            return NextResponse.json({ error: 'Phone and OTP are required' }, { status: 400 });
        }

        // Verify OTP
        if (otp !== '123456') {
            return NextResponse.json({ error: 'Invalid OTP' }, { status: 400 });
        }

        // Check if user exists
        let user = await db.user.findUnique({
            where: { phone },
        });

        if (!user) {
            // Register new user
            if (!role) {
                return NextResponse.json({ error: 'Role is required for new registration' }, { status: 400 });
            }

            user = await db.user.create({
                data: {
                    phone,
                    role,
                },
            });

            // If Master, create empty profile
            if (role === 'master') {
                await db.masterProfile.create({
                    data: {
                        userId: user.id,
                        profession: 'Unspecified', // To be filled in profile setup
                        region: '',
                        city: '',
                    }
                });
            }
        }

        // Create Session
        const token = uuidv4();
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 30); // 30 days session

        await db.session.create({
            data: {
                userId: user.id,
                token,
                expiresAt,
            },
        });

        // Return session token (and user info)
        // In a real app, we might set an HTTP-only cookie here.
        // For simplicity with the existing AuthContext, we'll return the token and let client handle storage or header.

        return NextResponse.json({
            success: true,
            token,
            user: {
                id: user.id,
                phone: user.phone,
                role: user.role,
                name: user.name,
            }
        });

    } catch (error) {
        console.error('Login Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
