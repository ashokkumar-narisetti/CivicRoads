import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Create Municipality
  const municipality = await prisma.municipality.upsert({
    where: { id: 'muni-1' },
    update: {},
    create: {
      id: 'muni-1',
      name: 'Central District Municipality',
      district: 'Central',
      boundaryData: { type: 'Polygon', coordinates: [] }
    },
  });

  // Create Admin
  const admin = await prisma.admin.upsert({
    where: { email: 'admin@system.com' },
    update: {},
    create: {
      name: 'Super Admin',
      email: 'admin@system.com',
      passwordHash: '$2a$10$Xm3t0J4oQ4H5Z2hC.l1QqeH8P9/Rz7X2m5N4.9I7M4Y7Yv5H3hG8i', // 'password' (bcrypt)
    },
  });

  // Create Officer
  const officer = await prisma.officer.upsert({
    where: { email: 'officer@muni1.com' },
    update: {},
    create: {
      name: 'John Officer',
      email: 'officer@muni1.com',
      passwordHash: '$2a$10$Xm3t0J4oQ4H5Z2hC.l1QqeH8P9/Rz7X2m5N4.9I7M4Y7Yv5H3hG8i', // 'password' (bcrypt)
      municipalityId: municipality.id,
      role: 'OFFICER'
    },
  });

  console.log('Seeding completed.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
