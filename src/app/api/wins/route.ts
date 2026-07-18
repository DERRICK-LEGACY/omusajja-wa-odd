import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { jwtVerify } from 'jose';
import { COOKIE_NAME } from '@/lib/auth';
import { cookies } from 'next/headers';

export const dynamic = "force-dynamic";

const prisma = new PrismaClient();
const SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'galactico-super-secret-jwt-2025-omusajja');

async function isAuthenticated() {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return false;
  try {
    await jwtVerify(token, SECRET);
    return true;
  } catch {
    return false;
  }
}

export async function GET() {
  try {
    const wins = await prisma.winReceipt.findMany({
      orderBy: { postedAt: 'desc' }
    });
    return NextResponse.json({ success: true, wins });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch wins' }, { status: 500 });
  }
}



export async function POST(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { imageUrl, amount, description } = await request.json();
    
    if (!imageUrl) {
      return NextResponse.json({ error: 'Image is required' }, { status: 400 });
    }

    const win = await prisma.winReceipt.create({
      data: { imageUrl, amount, description }
    });

    return NextResponse.json({ success: true, win });
  } catch (error) {
    console.error('Failed to create win receipt', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) return NextResponse.json({ error: 'Missing ID' }, { status: 400 });

    await prisma.winReceipt.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
