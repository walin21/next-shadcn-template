import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

const connectionString = process.env.DATABASE_URL;

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  // Use environment variable for admin password, fallback to default for development
  const adminPassword = process.env.ADMIN_PASSWORD || "admin123";
  const hashedPassword = await bcrypt.hash(adminPassword, 10);

  // Crear usuario administrador (puede tener officeId null)
  const adminUser = await prisma.user.upsert({
    where: { email: "admin@app.com" },
    update: {},
    create: {
      email: "admin@app.com",
      password: hashedPassword,
      name: "Admin",
      role: "ADMIN",
      // officeId: null (explícitamente null para admin)
    },
  });

  const office1 = await prisma.office.upsert({
    where: { officeId: "office-1" },
    update: {},
    create: {
      officeId: "office-1",
      name: "Oficina Principal",
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
