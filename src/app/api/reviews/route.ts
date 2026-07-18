import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

export const dynamic = "force-dynamic";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const reviews = await prisma.review.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json({ success: true, reviews });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch reviews' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { name, rating, comment } = await request.json();
    
    if (!name || !comment || !rating) {
      return NextResponse.json({ error: 'Name, rating, and comment are required' }, { status: 400 });
    }

    const review = await prisma.review.create({
      data: { name, rating: parseInt(rating, 10), comment }
    });

    return NextResponse.json({ success: true, review });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to submit review' }, { status: 500 });
  }
}
