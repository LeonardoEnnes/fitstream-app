import { useState, useEffect, useCallback } from "react";
import { API_URL } from "@/lib/api";
import type { WorkoutItem } from "@/components/layout/WorkoutTable";
import type { WorkoutFormData } from "../features/workout/schemas/workoutSchema";

export function useWorkouts() {
  const [workouts, setWorkouts] = useState<WorkoutItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchWorkouts = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/workouts`);
      if (response.ok) {
        const data = await response.json();
        setWorkouts(data);
      }
    } catch (error) {
      console.error("Falha ao buscar treinos:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchWorkouts();
  }, [fetchWorkouts]);

  const addWorkout = async (data: WorkoutFormData) => {
    try {
      const response = await fetch(`${API_URL}/workouts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const newWorkout = await response.json();
        setWorkouts((prev) => [...prev, newWorkout]);
      }
    } catch (error) {
      console.error("Falha de rede ao salvar treino:", error);
    }
  };

  const deleteWorkout = async (id: string) => {
    try {
      const response = await fetch(`${API_URL}/workouts/${id}`, {
        method: "DELETE",
      });

      if (response.status === 204) {
        setWorkouts((prev) => prev.filter((item) => item.id !== id));
      }
    } catch (error) {
      console.error("Falha ao deletar treino:", error);
    }
  };

  const completeWorkout = async (id: string) => {
    try {
      const response = await fetch(`${API_URL}/workouts/${id}/complete`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        setWorkouts((prev) => 
          prev.map((item) => (item.id === id ? { ...item, completed: true } : item))
        );
      }
    } catch (error) {
      console.error("Erro crítico na requisição PATCH:", error);
    }
  };

  const updateWorkout = async (id: string, data: WorkoutFormData) => {
    try {
      const response = await fetch(`${API_URL}/workouts/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const updatedWorkout = await response.json();
        setWorkouts((prev) => 
          prev.map((item) => (item.id === id ? updatedWorkout : item))
        );
      }
    } catch (error) {
      console.error("Falha de rede ao editar treino:", error);
    }
  };

  return { workouts, isLoading, addWorkout, deleteWorkout, completeWorkout, updateWorkout };
}