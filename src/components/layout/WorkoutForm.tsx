import { useForm } from "react-hook-form";
import { workoutSchema, type WorkoutFormData } from "./../../features/workout/schemas/workoutSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface WorkoutFormProps {
  onSuccess?: (data: WorkoutFormData) => void;
}

export function WorkoutForm({ onSuccess }: WorkoutFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(workoutSchema),
    defaultValues: {
      exercise: "",
      sets: 3,
      reps: 12,
      weight: 0,
    },
  });

  const onSubmit = (data: any) => {
    if (onSuccess) onSuccess(data as WorkoutFormData);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-1.5">
        <label className="text-sm font-medium leading-none">Exercício</label>
        <Input placeholder="Ex: Supino Reto" {...register("exercise")} />
        {errors.exercise && <span className="text-xs text-red-500 block">{errors.exercise.message}</span>}
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="space-y-1.5">
          <label className="text-sm font-medium leading-none">Séries</label>
          <Input type="number" {...register("sets", { valueAsNumber: true })} />
          {errors.sets && <span className="text-xs text-red-500 block">{errors.sets.message}</span>}
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium leading-none">Reps</label>
          <Input type="number" {...register("reps", { valueAsNumber: true })} />
          {errors.reps && <span className="text-xs text-red-500 block">{errors.reps.message}</span>}
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium leading-none">Carga (kg)</label>
          <Input type="number" {...register("weight", { valueAsNumber: true })} />
          {errors.weight && <span className="text-xs text-red-500 block">{errors.weight.message}</span>}
        </div>
      </div>

      <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white mt-2" disabled={isSubmitting}>
        {isSubmitting ? "Adicionando..." : "Adicionar Exercício"}
      </Button>
    </form>
  );
}