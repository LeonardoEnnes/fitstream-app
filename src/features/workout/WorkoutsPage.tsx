import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/layout/PageHeader";
import { WorkoutForm } from "../../components/layout/WorkoutForm";
import { WorkoutTable } from "../../components/layout/WorkoutTable";
import { useWorkouts } from "../../hooks/useWorkouts";
import type { WorkoutFormData } from "./schemas/workoutSchema";

export function WorkoutsPage() {
  const { workouts, isLoading, addWorkout, deleteWorkout, completeWorkout, updateWorkout } = useWorkouts();

  const handleAddWorkout = async (data: WorkoutFormData) => {
    await addWorkout(data);
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Treinos" description="Monitore sua rotina de musculação, séries e progressão de cargas." />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-extrabold tracking-tight">Novo Exercício</CardTitle>
            </CardHeader>
            <CardContent>
              <WorkoutForm onSuccess={handleAddWorkout} />
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="text-lg">Registro de Treino de Hoje</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex justify-center text-muted-foreground p-4">Carregando treinos...</div>
              ) : (
                <WorkoutTable 
                  workouts={workouts} 
                  onDelete={deleteWorkout} 
                  onComplete={completeWorkout}
                  onEdit={updateWorkout}
                />
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}