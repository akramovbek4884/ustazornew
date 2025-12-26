import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function POST(req: Request) {
    try {
        const { phone } = await req.json();

        if (!phone) {
            return NextResponse.json({ error: 'Phone number is required' }, { status: 400 });
        }

        // In a real app, generate a specific OTP and store it (e.g. in Redis or DB) with expiration.
        // For this MVP/Demo, we will use a fixed OTP '123456' or just log it.
        // To support "rate limiting", we could check if an OTP was recently sent.

        console.log(`[OTP] Sending OTP to ${phone}: 123456`);

        // We can allow any phone number to "register" via this flow if they verify OTO.
        // Or we check if user exists. 
        // The requirement says "Phone number registration and login using SMS OTP".

        return NextResponse.json({ success: true, message: 'OTP sent' });
    } catch (error) {
        console.error('OTP Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
