import dotenv from "dotenv";
dotenv.config({ quiet: true });
import { PrismaClient } from "../../generated/prisma";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

// 1. Database er sathe connection pool
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

// 2. Prisma er jonno adapter
const adapter = new PrismaPg(pool);

declare global {
  var prisma: PrismaClient | undefined;
}

const prisma = global.prisma || new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") global.prisma = prisma;

export default prisma;
