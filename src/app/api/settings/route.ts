import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { jwtVerify } from 'jose';
import { COOKIE_NAME } from '@/lib/auth';
import { cookies } from 'next/headers';

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

export async function POST(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { username, password } = await request.json();
    
    if (!username || !password) {
      return NextResponse.json({ error: 'Username and password are required' }, { status: 400 });
    }

    const hashed = await bcrypt.hash(password, 12);
    
    // In this app, we only have one admin, so we just update the first one
    const admin = await prisma.admin.findFirst();
    if (!admin) {
      return NextResponse.json({ error: 'Admin not found' }, { status: 404 });
    }

    await prisma.admin.update({
      where: { id: admin.id },
      data: { username, password: hashed }
    });

    const response = NextResponse.json({ success: true }, { status: 200 });
    response.cookies.delete(COOKIE_NAME); // force re-login

    return response;
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update credentials' }, { status: 500 });
  }
}
