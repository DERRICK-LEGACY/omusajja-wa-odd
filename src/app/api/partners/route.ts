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
    const partners = await prisma.partner.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json({ success: true, partners });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch partners' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { name, imageUrl, url } = await request.json();
    
    if (!name || !imageUrl) {
      return NextResponse.json({ error: 'Name and imageUrl are required' }, { status: 400 });
    }

    const partner = await prisma.partner.create({
      data: { name, imageUrl, url }
    });

    return NextResponse.json({ success: true, partner });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create partner' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id, name, imageUrl, url } = await request.json();
    if (!id || !name || !imageUrl) return NextResponse.json({ error: 'Missing fields' }, { status: 400 });

    const partner = await prisma.partner.update({
      where: { id },
      data: { name, imageUrl, url }
    });

    return NextResponse.json({ success: true, partner });
  } catch (error) {
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

    await prisma.partner.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
