import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/layout/PageHeader";
import { WorkoutForm } from "../../components/layout/WorkoutForm";
import { WorkoutTable, type WorkoutItem } from "../../components/layout/WorkoutTable";
import type { WorkoutFormData } from "./schemas/workoutSchema";

export function WorkoutsPage() {
  const [workouts, setWorkouts] = useState<WorkoutItem[]>([ // deixei de exemplo, depois vou remover
    { id: "1", exercise: "Supino Reto", sets: 4, reps: 10, weight: 80 },
    { id: "2", exercise: "Desenvolvimento com Halteres", sets: 3, reps: 12, weight: 24 },
  ]);

  const handleAddWorkout = (data: WorkoutFormData) => {
    const newItem: WorkoutItem = {
      id: crypto.randomUUID(),
      ...data,
    };
    setWorkouts((prev) => [...prev, newItem]);
  };

  const handleDeleteWorkout = (id: string) => {
    setWorkouts((prev) => prev.filter((item) => item.id !== id));
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
              <WorkoutTable workouts={workouts} onDelete={handleDeleteWorkout} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}