import { useState, useEffect, useCallback } from "react";
import { API_URL } from "@/lib/api";
import type { MealFormData } from "../features/nutrition/schemas/mealSchema";

export interface MealItem {
  id: string;
  name: string;
  description: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  consumedAt: string;
}

export function useMeals() {
  const [meals, setMeals] = useState<MealItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchMeals = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/meals`);
      if (response.ok) {
        const data = await response.json();
        setMeals(data);
      }
    } catch (error) {
      console.error("Falha ao buscar refeições:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMeals();
  }, [fetchMeals]);

  const addMeal = async (data: MealFormData) => {
    try {
      const payload = {
        name: data.name,
        calories: data.calories,
        protein: data.protein,
        carbs: data.carbs,
        fat: data.fat
      };

      const response = await fetch(`${API_URL}/meals`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const newMeal = await response.json();
        setMeals((prev) => [...prev, newMeal]);
      }
    } catch (error) {
      console.error("Falha ao salvar refeição:", error);
    }
  };

  const deleteMeal = async (id: string) => {
    try {
      const response = await fetch(`${API_URL}/meals/${id}`, {
        method: "DELETE",
      });

      if (response.status === 204) {
        setMeals((prev) => prev.filter((meal) => meal.id !== id));
      }
    } catch (error) {
      console.error("Falha ao deletar refeição:", error);
    }
  };

  return { meals, isLoading, addMeal, deleteMeal };
}