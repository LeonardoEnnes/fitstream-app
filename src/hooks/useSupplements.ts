import { useState, useEffect, useCallback } from "react";
import { API_URL } from "@/lib/api";

export interface SupplementItem {
  id: string;
  name: string;
  dosage: string;
  unit: string;
  takenAt: string;
}

export function useSupplements() {
  const [supplements, setSupplements] = useState<SupplementItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchSupplements = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/supplements`);
      if (response.ok) {
        const data = await response.json();
        setSupplements(data);
      }
    } catch (error) {
      console.error("Falha ao buscar suplementos:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSupplements();
  }, [fetchSupplements]);

  const addSupplement = async (name: string) => {
    try {
      const response = await fetch(`${API_URL}/supplements`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          dosage: "1",
          unit: "dose"
        }),
      });

      if (response.ok) {
        const newSupplement = await response.json();
        setSupplements((prev) => [...prev, newSupplement]);
      }
    } catch (error) {
      console.error("Falha ao registrar suplemento:", error);
    }
  };

  const deleteSupplement = async (id: string) => {
    try {
      const response = await fetch(`${API_URL}/supplements/${id}`, {
        method: "DELETE",
      });

      if (response.status === 204) {
        setSupplements((prev) => prev.filter((item) => item.id !== id));
      }
    } catch (error) {
      console.error("Falha ao deletar suplemento:", error);
    }
  };

  return { supplements, isLoading, addSupplement, deleteSupplement };
}