import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const existing = await prisma.admin.findFirst();
  if (existing) {
    console.log('Admin already seeded. Skipping.');
    return;
  }

  const hashed = await bcrypt.hash('omusajja1234', 12);
  await prisma.admin.create({
    data: {
      username: 'galactico',
      password: hashed,
    },
  });

  console.log('✅ Admin seeded: username=galactico password=omusajja1234');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
