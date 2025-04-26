import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const db = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;

// Common JS for seeding templates
// const { PrismaClient } = require("@prisma/client");

// const globalForPrisma = global;

// if (!globalForPrisma.prisma) {
//   globalForPrisma.prisma = new PrismaClient();
// }

// const db = globalForPrisma.prisma;


// module.exports = { db };
