import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed script...');

  const superAdminEmail = 'superadmin@school.edu';
  const defaultPassword = process.env.INITIAL_SUPERADMIN_PASSWORD || 'superpassword123';

  // 1. Check if Super Admin already exists
  const existingUser = await prisma.users.findUnique({
    where: { email: superAdminEmail }
  });

  if (existingUser) {
    console.log('✅ Super Admin record already exists in database.');
    return;
  }

  // 2. Hash default password
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(defaultPassword, salt);

  // 3. Create Super Admin user record
  // Note: school_id is NULL for Super Admins
  const newSuperAdmin = await prisma.users.create({
    data: {
      email: superAdminEmail,
      password_hash: passwordHash,
      role: 'super_admin',
      first_name: 'System',
      last_name: 'Administrator',
      phone_number: '+10000000000',
      avatar_url: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100',
      is_active: true
    }
  });

  console.log(`🚀 Default Super Admin account bootstrapped successfully:`);
  console.log(`   - Email:    ${newSuperAdmin.email}`);
  console.log(`   - Role:     ${newSuperAdmin.role}`);
  console.log(`   - Password: ${defaultPassword}`);
  console.log(`   ⚠️  Change this default password immediately after first login.`);
  console.log(``);
  console.log(`   Reminder: if you haven't already, run 'npm run db:rls' to enable`);
  console.log(`   Row-Level Security policies. Without that, tenant isolation is off.`);
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed with error:');
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
