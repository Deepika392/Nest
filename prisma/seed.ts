// prisma/seed.ts

import { PrismaClient } from '@prisma/client';

// initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
    await prisma.user.deleteMany();

    console.log('Seeding...');

  // create two dummy users
  const user1 = await prisma.user.upsert({
    where: { email: 'admin@gmail.com' },
    update: {},
    create: {
      email: 'admin@gmail.com',
      password: '$2b$10$EpRnTzVlqHNP0.fUbXUwSOyuiXe/QLSUG6xNekdHgTGmrpHEfIoxm', // secret42
      phone:"+913234567891",
      address: "Super Admin Address Line 1",
      dob:new Date(),
      profession:"",
      firstname:"",
      lastname: "",
      role:"SUPERADMIN",
      status: true
    },
  });

  const user2 = await prisma.user.upsert({
    where: { email: "support@gmail.com" },
    update: {},
    create: {
        email: 'support@gmail.com',
        password: '$2b$10$EpRnTzVlqHNP0.fUbXUwSOyuiXe/QLSUG6xNekdHgTGmrpHEfIoxm', // secret42
        phone:"+913234567891",
        address: "Support Address Line 1",
        dob:new Date(),
        profession:"",
        firstname:"",
        lastname: "",
        role:"SUPPORT",
        status: true
    },
  });

  console.log({ user1, user2 });
}

// execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });