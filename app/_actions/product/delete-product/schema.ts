import { z } from "zod";

export const deleteProductSchema = z.object({
  id: z.uuid({
    message: "O ID do produto é obrigatório"
  })
});

export type DeleteProductSchema = z.infer<typeof deleteProductSchema>;
