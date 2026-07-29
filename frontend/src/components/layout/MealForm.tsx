import { useForm } from "react-hook-form";
import { mealSchema, type MealFormData } from "../../features/nutrition/schemas/mealSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input} from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface MealFormProps {
    onSuccess?: () => void;
}

export function MealForm({ onSuccess } : MealFormProps) {
    const { register, 
            handleSubmit, 
            formState: { errors , isSubmitting} } = useForm<MealFormData>({
                resolver: zodResolver(mealSchema),
                defaultValues: {
                    name: "",
                    calories: 0,
                    protein: 0,
                    carbs: 0,
                    fat: 0
                }
    });

    const onSubmit = (data: MealFormData) => {
        console.log("Dados do formulário:", data); // dps apagar isso 

        if (onSuccess) onSuccess();
    }

    return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" >

        <div className="space-y-1.5">
            <label className= "text-sm font-light leading-none">Nome da Refeição</label>
            <Input placeholder="Ex: Almoço" {...register("name")} />
            {errors.name && <span className="text-xs text-red-500">{errors.name.message}</span>}
        </div>

        <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
                <label className="text-sm font-light">Calorias</label>
                <Input placeholder="Ex: 150" {...register("calories", { valueAsNumber: true })} />
                {errors.calories && <span className="text-xs text-red-500">{errors.calories.message}</span>}
            </div>

            <div className="space-y-1.5">
                <label className="text-sm font-light">Proteínas</label>
                <Input placeholder="20g" {...register("protein", { valueAsNumber: true })} />
                {errors.protein && <span className="text-xs text-red-500">{errors.protein.message}</span>}
            </div>

            <div className="space-y-1.5">
                <label className="text-sm font-light">Carboidratos</label>
                <Input placeholder="90g" {...register("carbs", { valueAsNumber: true })} />
                {errors.carbs && <span className="text-xs text-red-500">{errors.carbs.message}</span>}
            </div>
            
            <div className="space-y-1.5">
                <label className="text-sm font-light">Gorduras</label>
                <Input placeholder="50g" {...register("fat", { valueAsNumber: true })} />
                {errors.fat && <span className="text-xs text-red-500">{errors.fat.message}</span>}
            </div>
        </div>

      <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white" disabled={isSubmitting}>
        {isSubmitting ? "Salvando..." : "Salvar Refeição"}
      </Button>
    </form>
    );
}