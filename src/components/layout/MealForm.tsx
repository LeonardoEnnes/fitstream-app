import { useForm } from "react-hook-form";
import { mealSchema, type MealFormData } from "../../features/nutrition/schemas/mealSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input} from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LoaderIcon } from "lucide-react";
import {
  FieldLabel,
} from "@/components/ui/field"

interface MealFormProps {
    onSuccess?: (data: MealFormData) => Promise<void> | void;
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

    const onSubmit = async (data: MealFormData) => {
        // console.log("Dados do formulário:", data); // dps apagar isso 
        // await createMeal(data); dps

        await new Promise((resolve) => setTimeout(resolve, 3000));

        if (onSuccess) onSuccess(data);
    }

    return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" >

        <div className="space-y-1.5">
            <FieldLabel htmlFor="input-required" className="text-sm font-light">
                Nome da Refeição <span className="text-destructive">*</span> {/*talvez eu remova essa bolinha*/}
            </FieldLabel>

            <Input 
                placeholder="Ex: Almoço" 
                aria-invalid={!!errors.name}
                {...register("name")}
                required
                autoComplete="off"
            />
            
            {errors.name && 
                <span className="text-xs text-red-500">
                        {errors.name.message}
                </span>
            }
        </div>

        <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
                <FieldLabel htmlFor="input-required" className="text-sm font-light">
                    Calorias <span className="text-destructive">*</span>
                </FieldLabel>

                <Input 
                    placeholder="Ex: 150" 
                    aria-invalid={!!errors.calories}
                    {...register("calories", { valueAsNumber: true })} 
                    required
                    autoComplete="off" // retira as recomendações de input do navegador
                />

                {errors.calories && 
                    <span className="text-xs text-red-500">
                        {errors.calories.message}
                    </span>}
            </div>

            <div className="space-y-1.5">
                <FieldLabel htmlFor="input-required" className="text-sm font-light">
                    Proteínas <span className="text-destructive">*</span>
                </FieldLabel>
                
                <Input 
                    placeholder="Ex: 20" 
                    aria-invalid={!!errors.protein}
                    {...register("protein", { valueAsNumber: true })} 
                    required
                    autoComplete="off"
                />

                {errors.protein && 
                    <span className="text-xs text-red-500">
                        {errors.protein.message}
                    </span>
                }

            </div>

            <div className="space-y-1.5">
                <FieldLabel htmlFor="input-required" className="text-sm font-light">
                    Carboidratos <span className="text-destructive">*</span>
                </FieldLabel>

                <Input 
                    placeholder="Ex: 90" 
                    aria-invalid={!!errors.carbs}
                    {...register("carbs", { valueAsNumber: true })} 
                    required
                    autoComplete="off"
                />
                
                {errors.carbs && 
                    <span className="text-xs text-red-500">
                        {errors.carbs.message}
                    </span>
                }
            </div>

            <div className="space-y-1.5">
                <FieldLabel htmlFor="input-required" className="text-sm font-light">
                    Gorduras <span className="text-destructive">*</span>
                </FieldLabel>

                <Input 
                    placeholder="Ex: 50" 
                    aria-invalid={!!errors.fat}
                    {...register("fat", { valueAsNumber: true })} 
                    required
                    autoComplete="off"
                />

                {errors.fat && 
                    <span className="text-xs text-red-500">
                        {errors.fat.message}
                    </span>
                }
            </div>
        </div>

        <Button 
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
            type="submit" 
            disabled={isSubmitting}
        >

                {isSubmitting && (
                    <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />
                )}

            {isSubmitting ? "Salvando..." : "Salvar Refeição"}
      </Button>
    </form>
    );
}