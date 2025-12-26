import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET(req: Request) {
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

        if (!session || session.user.role !== 'admin') {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        }

        const [totalUsers, totalMasters, totalRequests] = await Promise.all([
            db.user.count(),
            db.masterProfile.count(),
            db.request.count(),
        ]);

        const stats = {
            users: totalUsers,
            masters: totalMasters,
            requests: totalRequests,
            // Add more stats as needed
        };

        return NextResponse.json(stats);

    } catch (error) {
        console.error('Admin Stats Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
