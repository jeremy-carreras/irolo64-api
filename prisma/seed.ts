import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create admin user
  const adminPasswordHash = await bcrypt.hash('irolo64', 10);
  const user = await prisma.user.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      username: 'admin',
      passwordHash: adminPasswordHash,
    },
  });
  console.log('✓ Admin user created:', user.username);

  // Create 11 departments
  const departmentCodes = [
    'GH1', 'GH2',
    '201', '202', '203',
    '301', '302', '303',
    'PH1', 'PH2', 'PH3',
  ];

  for (const code of departmentCodes) {
    const dept = await prisma.department.upsert({
      where: { code },
      update: {},
      create: {
        code,
        name: code,
        isActive: true,
      },
    });
    console.log('✓ Department created:', dept.code);
  }

  console.log('✅ Seeding complete');
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
