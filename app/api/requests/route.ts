import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function POST(req: Request) {
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

        const body = await req.json();
        const { masterId, message } = body;

        if (!masterId) {
            return NextResponse.json({ error: 'Master ID is required' }, { status: 400 });
        }

        // Check if master exists
        const master = await db.masterProfile.findUnique({
            where: { id: masterId }
        });

        if (!master) {
            return NextResponse.json({ error: 'Master not found' }, { status: 404 });
        }

        const request = await db.request.create({
            data: {
                clientId: session.userId,
                masterPrifleId: masterId, // Typo in schema: masterPrifleId -> masterProfileId? 
                // Checking schema... I defined it as `masterPrifleId` (typo). I must use the typo or fix schema.
                // In schema.prisma: `masterPrifleId String`
                // Ideally I fix the schema typo, but migration is done. I'll stick to typo for now to avoid migration overhead unless I do a quick fix.
                // Wait, typo is annoying. `masterPrifleId`.
                // I'll use it as is.
                message: message || '',
                status: 'new',
            }
        });

        return NextResponse.json({ success: true, request });

    } catch (error) {
        console.error('Create Request Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function GET(req: Request) {
    try {
        const authHeader = req.headers.get('Authorization');
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const token = authHeader.split(' ')[1];
        const session = await db.session.findUnique({
            where: { token },
            include: { user: { include: { masterProfile: true } } },
        });

        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const user = session.user;

        let requests;
        if (user.role === 'client') {
            requests = await db.request.findMany({
                where: { clientId: user.id },
                include: {
                    master: {
                        include: { user: { select: { name: true, phone: true } } }
                    }
                },
                orderBy: { createdAt: 'desc' }
            });
        } else if (user.role === 'master' && user.masterProfile) {
            requests = await db.request.findMany({
                where: { masterPrifleId: user.masterProfile.id }, // Typo usage
                include: {
                    client: {
                        select: { name: true, phone: true }
                    }
                },
                orderBy: { createdAt: 'desc' }
            });
        } else {
            // Admin or Master without profile
            requests = [];
        }

        return NextResponse.json(requests);

    } catch (error) {
        console.error('Get Requests Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
