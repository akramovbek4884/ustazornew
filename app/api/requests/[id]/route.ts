import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function PUT(
    req: Request,
    { params }: { params: { id: string } }
) {
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

        const id = params.id;
        const body = await req.json();
        const { status } = body;

        const request = await db.request.findUnique({ where: { id } });

        if (!request) {
            return NextResponse.json({ error: 'Request not found' }, { status: 404 });
        }

        // Authorization check: Only Master can Accept/Reject/Complete? 
        // Only Client can Cancel?

        // Simplification:
        // Master can set: accepted, rejected, completed, in_progress
        // Client can set: cancelled

        const isMaster = session.user.role === 'master' && session.user.masterProfile?.id === request.masterPrifleId;
        const isClient = session.user.id === request.clientId;

        if (!isMaster && !isClient) {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        }

        if (isMaster) {
            if (!['accepted', 'rejected', 'in_progress', 'completed'].includes(status)) {
                return NextResponse.json({ error: 'Invalid status for master' }, { status: 400 });
            }
        } else if (isClient) {
            if (status !== 'cancelled') {
                return NextResponse.json({ error: 'Invalid status for client' }, { status: 400 });
            }
        }

        const updatedRequest = await db.request.update({
            where: { id },
            data: { status }
        });

        return NextResponse.json({ success: true, request: updatedRequest });

    } catch (error) {
        console.error('Update Request Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
