import "dotenv/config";

import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

console.log("DB URL:", process.env.DATABASE_URL);

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  const hashed = await bcrypt.hash("admin123", 10);

  const user = await prisma.user.create({
    data: {
      email: "do.earljan@gmail.com",
      password: hashed,
      name: "Admin",
    },
  });

  console.log("Admin created:", user);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());