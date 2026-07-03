import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();
const DEMO_PASSWORD = process.env.DEMO_USER_PASSWORD || '123456';

const DEMO_USERS = [
  { email: 'superadmin@school.edu', role: 'super_admin', firstName: 'System', lastName: 'Administrator' },
  { email: 'schooladmin@school.edu', role: 'school_admin', firstName: 'Sarah', lastName: 'Mitchell' },
  { email: 'principal@school.edu', role: 'principal', firstName: 'James', lastName: 'Carter' },
  { email: 'teacher@school.edu', role: 'teacher', firstName: 'Christopher', lastName: 'Vance' },
  { email: 'student@school.edu', role: 'student', firstName: 'Liam', lastName: 'Sterling' },
  { email: 'parent@school.edu', role: 'parent', firstName: 'Marcus', lastName: 'Sterling' },
];

async function main() {
  console.log('🌱 Seeding demo school and users…');

  const passwordHash = await bcrypt.hash(DEMO_PASSWORD, 10);

  let school = await prisma.school.findFirst({ where: { subdomain: 'edukids' } });
  if (!school) {
    school = await prisma.school.create({
      data: {
        name: 'Edukids Academy',
        subdomain: 'edukids',
        contactEmail: 'contact@edukids.edu',
        logoUrl: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=100&auto=format&fit=crop&q=60',
        subscriptionStatus: 'active',
      },
    });
    console.log(`✅ Created default school: ${school.name}`);
  } else {
    console.log(`✅ Using existing school: ${school.name}`);
  }

  for (const demo of DEMO_USERS) {
    const email = demo.email.toLowerCase();
    const schoolId = demo.role === 'super_admin' ? null : school.id;

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      await prisma.user.update({
        where: { email },
        data: { passwordHash, isActive: true, role: demo.role, schoolId },
      });
      console.log(`🔄 Reset demo account: ${email} (${demo.role})`);
      continue;
    }

    const user = await prisma.user.create({
      data: {
        email,
        passwordHash,
        role: demo.role,
        firstName: demo.firstName,
        lastName: demo.lastName,
        schoolId,
        isActive: true,
      },
    });

    if (demo.role === 'teacher') {
      await prisma.teacherProfile.create({
        data: {
          userId: user.id,
          specialization: 'Computer Science',
          joinedDate: new Date(),
        },
      });
    }

    if (demo.role === 'parent') {
      await prisma.parentProfile.create({
        data: {
          userId: user.id,
          emergencyContactPhone: '+10000000000',
        },
      });
    }

    if (demo.role === 'student') {
      await prisma.studentProfile.create({
        data: {
          userId: user.id,
          dateOfBirth: new Date('2010-05-15'),
          gender: 'Male',
        },
      });
    }

    console.log(`✅ Created ${demo.role}: ${email}`);
  }

  console.log('\n🚀 Demo accounts ready (password for all):', DEMO_PASSWORD);
  console.log('   superadmin@school.edu  → Super Admin');
  console.log('   schooladmin@school.edu → School Admin');
  console.log('   principal@school.edu   → Principal');
  console.log('   teacher@school.edu     → Teacher');
  console.log('   student@school.edu     → Student');
  console.log('   parent@school.edu      → Parent');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
