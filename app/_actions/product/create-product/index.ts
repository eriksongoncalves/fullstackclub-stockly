"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/app/_lib/prisma";
import { CreateProductSchema } from "./schema";

export const createProduct = async (data: CreateProductSchema) => {
  await db.product.create({
    data
  });

  revalidatePath("/products");
};