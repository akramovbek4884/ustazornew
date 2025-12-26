import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        const id = params.id;

        const master = await db.masterProfile.findUnique({
            where: { id },
            include: {
                user: {
                    select: {
                        name: true,
                        phone: true,
                    }
                },
                services: true,
                portfolio: true,
                reviews: {
                    include: {
                        client: {
                            select: {
                                name: true
                            }
                        }
                    },
                    take: 10,
                }
            }
        });

        if (!master) {
            return NextResponse.json({ error: 'Master not found' }, { status: 404 });
        }

        // Map to frontend structure
        const mappedMaster = {
            id: master.id,
            name: master.user.name || 'Unknown',
            profession: master.profession,
            region: master.region,
            city: master.city,
            avatar: '/img/avatars/default.png', // Placeholder
            phone: master.user.phone,
            rating: master.rating,
            reviewCount: master.reviewCount,
            isVerified: master.isVerified,
            bio: master.bio,
            experience: master.experience,
            services: master.services,
            portfolio: master.portfolio,
            reviews: master.reviews.map(r => ({
                id: r.id,
                userName: r.client.name || 'Anonymous',
                rating: r.rating,
                comment: r.comment,
                createdAt: r.createdAt,
            })),
            // Add other fields as needed
            responseTime: '1 hour', // Mock
            completedJobs: 0, // Mock or add to schema
        };

        return NextResponse.json(mappedMaster);

    } catch (error) {
        console.error('Master Detail API Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
