import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET(req: Request) {
    try {
        const authHeader = req.headers.get('Authorization');
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return NextResponse.json({ user: null });
        }

        const token = authHeader.split(' ')[1];

        const session = await db.session.findUnique({
            where: { token },
            include: {
                user: {
                    include: {
                        masterProfile: true
                    }
                }
            },
        });

        if (!session || session.expiresAt < new Date()) {
            return NextResponse.json({ user: null });
        }

        const user = session.user;

        // Construct user object matching AuthContext interface
        const userResponse = {
            id: user.id,
            phone: user.phone,
            role: user.role,
            name: user.name,
            profileCompleted: user.role === 'master' ? !!(user.masterProfile?.profession) : !!user.name,
            // Add master specific fields if needed
            profession: user.masterProfile?.profession,
            region: user.masterProfile?.region,
            city: user.masterProfile?.city,
            experience: user.masterProfile?.experience,
            bio: user.masterProfile?.bio,
        };

        return NextResponse.json({ user: userResponse });

    } catch (error) {
        console.error('Me Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
