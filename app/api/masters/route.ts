import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const region = searchParams.get('region');
        const city = searchParams.get('city');
        const profession = searchParams.get('profession');
        const search = searchParams.get('search');

        // Build where clause dynamically
        const where: Record<string, unknown> = {
            // Only show verified or completed profiles if needed. For now show all.
        };

        if (region) where.region = region;
        if (city) where.city = city;
        if (profession) where.profession = profession;

        // Search by name (via User relation) or bio
        if (search) {
            where.OR = [
                { bio: { contains: search } }, // Case insensitive in SQLite usually depends on collation, but check Prisma docs
                { user: { name: { contains: search } } }
            ];
        }

        const masters = await db.masterProfile.findMany({
            where,
            include: {
                user: {
                    select: {
                        name: true,
                        phone: true,
                        // avatar? (not in User model yet, maybe store in MasterProfile or add to User)
                    }
                },
                services: true,
            }
        });

        // Map to frontend structure
        const mappedMasters = masters.map((m: (typeof masters)[number]) => ({
            id: m.id,
            name: m.user.name || 'Unknown Master',
            profession: m.profession,
            region: m.region,
            city: m.city,
            // Mock avatar for now or add to schema
            avatar: '/img/avatars/default.png',
            phone: m.user.phone,
            rating: m.rating,
            reviewCount: m.reviewCount,
            isVerified: m.isVerified,
            bio: m.bio,
            experience: m.experience,
        }));

        return NextResponse.json(mappedMasters);

    } catch (error) {
        console.error('Masters API Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
