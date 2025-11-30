import { PrismaClient } from "@prisma/client";

declare global {
  var cachedPrisma: ReturnType<typeof createPrismaClient>;
}

const createPrismaClient = () => {
  return new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query"] : []
  }).$extends({
    result: {
      product: {
        // campo status computed
        status: {
          needs: { stock: true },
          compute(product) {
            return product.stock > 0 ? "IN_STOCK" : "OUT_OF_STOCK";
          }
        }
      }
    }
  });
};

let prisma: ReturnType<typeof createPrismaClient>;

if (process.env.NODE_ENV === "production") {
  prisma = createPrismaClient();
} else {
  if (!global.cachedPrisma) {
    global.cachedPrisma = createPrismaClient();
  }
  prisma = global.cachedPrisma;
}

export const db = prisma;
