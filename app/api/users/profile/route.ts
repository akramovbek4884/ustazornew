import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function PUT(req: Request) {
    try {
        const authHeader = req.headers.get('Authorization');
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const token = authHeader.split(' ')[1];

        const session = await db.session.findUnique({
            where: { token },
            include: { user: true },
        });

        if (!session || session.expiresAt < new Date()) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const userId = session.userId;
        const body = await req.json();

        // Separate User fields and MasterProfile fields
        const {
            firstName, lastName, phone, email,
            profession, region, city, bio, experience,
            // ... other fields
        } = body;

        // Update User
        const name = firstName || lastName ? `${firstName || ''} ${lastName || ''}`.trim() : undefined;

        await db.user.update({
            where: { id: userId },
            data: {
                name: name || undefined,
                // phone is usually immutable or requires verification
            }
        });

        // If Master, update MasterProfile
        if (session.user.role === 'master') {
            await db.masterProfile.upsert({
                where: { userId: userId },
                create: {
                    userId: userId,
                    profession: profession || 'Unspecified',
                    region: region || '',
                    city: city || '',
                    bio: bio,
                    experience: experience ? parseInt(experience) : 0,
                },
                update: {
                    profession: profession,
                    region: region,
                    city: city,
                    bio: bio,
                    experience: experience ? parseInt(experience) : undefined,
                }
            });
        }

        return NextResponse.json({ success: true });

    } catch (error) {
        console.error('Profile Update Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
