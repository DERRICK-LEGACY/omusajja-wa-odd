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
    const tickets = await prisma.freeTicket.findMany({
      where: { isActive: true },
      orderBy: { postedAt: 'desc' }
    });
    return NextResponse.json({ success: true, tickets });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch free tickets' }, { status: 500 });
  }
}



export async function POST(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { content, imageUrl } = await request.json();
    
    if (!content) {
      return NextResponse.json({ error: 'Content is required' }, { status: 400 });
    }

    const ticket = await prisma.freeTicket.create({
      data: { content, imageUrl }
    });

    return NextResponse.json({ success: true, ticket });
  } catch (error) {
    console.error('Failed to create ticket', error);
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

    await prisma.freeTicket.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id, content, imageUrl } = await request.json();
    
    if (!id || !content) return NextResponse.json({ error: 'Missing fields' }, { status: 400 });

    const ticket = await prisma.freeTicket.update({
      where: { id },
      data: { content, imageUrl }
    });

    return NextResponse.json({ success: true, ticket });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
