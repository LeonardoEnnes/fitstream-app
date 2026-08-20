import { z } from "zod";

export const supplementSchema = 
    z.object({
        customName: z.string()
            .min(2, { message: "O nome do suplemento deve ter pelo menos 2 caracteres" })
            .max(40),
    }
)

export type supplementFormData = z.output<typeof supplementSchema>;