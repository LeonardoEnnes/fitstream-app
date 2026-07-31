import { z } from "zod";

export const mealSchema = 
  z.object({
    name: z.string()
    .trim() // tirando espaços em branco no inicio e no final da string
    .min(1, { message: "O nome da refeição é obrigatório"})
    .max(60)
    .regex(
      /^[a-zA-ZÀ-ÿ\s]+$/, // aceitar apenas letras e espaços
      { message: "O nome da refeição só pode conter letras e espaços" }
    ).transform(value => 
      value.toLowerCase()
      .replace(/\b\w/g, (match) => match.toUpperCase())  
    )
    ,

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
  }).refine( // serve para validar que o campo carbs seja maior que zero, se ele n for vai retornar um erro
      (data) => 
        data.calories > 0 || 
        data.protein > 0 || 
        data.carbs > 0 || 
        data.fat > 0,

      {
        message: "Informe pelo menos um valor nutricional maior que zero",
        path: ["calories"]
      }
   )

export type MealFormData = z.output<typeof mealSchema>; 