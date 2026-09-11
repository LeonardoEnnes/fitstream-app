import { z } from "zod";

export const workoutSchema = z.object({
    exercise: z.string().min(1, { message: "O nome do exercicio é obrigatório."}),
    sets: z.coerce.number().min(1, { message: "Mínimo de 1 série" }),
    reps: z.coerce.number().min(1, { message: "Mínimo de 1 repetição" }),
    weight: z.coerce.number().min(0, { message: "A carga não pode ser negativa" }),
});

export type WorkoutFormData = z.infer<typeof workoutSchema>;