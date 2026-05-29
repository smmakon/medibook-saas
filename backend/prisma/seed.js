import "dotenv/config";

import pkg from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcrypt";

const { PrismaClient } = pkg;

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Seeding database...");

  const adminExists = await prisma.user.findUnique({
    where: {
      email: "admin@medibook.com",
    },
  });

  if (adminExists) {
    console.log("ℹ️ Admin already exists");
    return;
  }

  const hashedPassword = await bcrypt.hash(
    "Password123!",
    10
  );

  await prisma.user.create({
    data: {
      firstName: "System",
      lastName: "Administrator",
      email: "admin@medibook.com",
      password: hashedPassword,
      role: "ADMIN",
      status: "ACTIVE",
    },
  });

  console.log("✅ Admin created");
  console.log("");
  console.log("================================");
  console.log("ADMIN LOGIN");
  console.log("Email: admin@medibook.com");
  console.log("Password: Password123!");
  console.log("================================");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
