import { z } from "zod";

export const mealSchema = 
  z.object({
    name: z.string()
    .max(60)
    .min(1, { message: "O nome da refeição é obrigatório"})
    .nonempty({ message: "O nome da refeição não pode ser vazio" }), // será que faz sentido nesse contexto? 

    calories: z.number({
        error: "O número de calorias é obrigatório"
      }).min(0, { message: "O numero de calorias não pode ser negativo"}),

    protein: z.number({
      error: "O número de proteínas é obrigatório"
    }).min(0, { message: "O numero de proteínas não pode ser negativo"}),

    carbs: z.number({
      error: "O numero de carboidratos é obrigatorio"
    }).min(0, { message: "O numero de carbos não pode ser negativo"}),

    fat: z.number({
      error: "O numero de gorduras é obrigatorio"
    }).min(0, { message: "O numero de gorduras não pode ser negativo"}),
  })

export type MealFormData = z.output<typeof mealSchema>; // isso serve para tipar o formState do react-hook-form, garantindo que os tipos de dados do formulário estejam corretos e consistentes com o esquema definido.