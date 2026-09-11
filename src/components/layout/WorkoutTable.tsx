import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, Check, Pencil, X, Save } from "lucide-react";
import type { WorkoutFormData } from "@/features/workout/schemas/workoutSchema";

export interface WorkoutItem {
  id: string;
  exercise: string;
  sets: number;
  reps: number;
  weight: number;
  completed: boolean;
}

interface WorkoutTableProps {
  workouts: WorkoutItem[];
  onDelete: (id: string) => void;
  onComplete?: (id: string) => void;
  onEdit?: (id: string, data: WorkoutFormData) => void;
}

export function WorkoutTable({ workouts, onDelete, onComplete, onEdit }: WorkoutTableProps) {
  // Estados para controlar a edição inline
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<WorkoutFormData | null>(null);

  if (workouts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-48 border border-dashed border-border rounded-md bg-muted/10 text-center p-6">
        <p className="text-sm font-medium text-muted-foreground">Nenhum exercício registrado para hoje.</p>
        <p className="text-xs text-muted-foreground/70 mt-1">Adicione seus exercícios no formulário ao lado.</p>
      </div>
    );
  }

  // Ativa o modo de edição carregando os dados da linha
  const handleEditClick = (item: WorkoutItem) => {
    setEditingId(item.id);
    setEditData({
      exercise: item.exercise,
      sets: item.sets,
      reps: item.reps,
      weight: item.weight,
    });
  };

  // Dispara a mutação do Hook e fecha a edição
  const handleSave = (id: string) => {
    if (onEdit && editData) {
      onEdit(id, editData);
    }
    setEditingId(null);
    setEditData(null);
  };

  return (
    <div className="rounded-md border border-border overflow-hidden">
      <Table>
        <TableHeader className="bg-secondary/40">
          <TableRow>
            <TableHead className="font-semibold">Exercício</TableHead>
            <TableHead className="text-right font-semibold">Séries</TableHead>
            <TableHead className="text-right font-semibold">Reps</TableHead>
            <TableHead className="text-right font-semibold">Carga (kg)</TableHead>
            <TableHead className="text-center font-semibold w-[140px]">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {workouts.map((item) => {
            const isEditing = editingId === item.id;

            if (isEditing && editData) {
              return (
                <TableRow key={item.id} className="bg-muted/50">
                  <TableCell>
                    <Input 
                      value={editData.exercise} 
                      onChange={(e) => setEditData({ ...editData, exercise: e.target.value })} 
                      className="h-8 text-sm min-w-[120px]"
                    />
                  </TableCell>
                  <TableCell>
                    <Input 
                      type="number" 
                      value={editData.sets} 
                      onChange={(e) => setEditData({ ...editData, sets: Number(e.target.value) })} 
                      className="h-8 text-sm w-16 ml-auto text-right"
                    />
                  </TableCell>
                  <TableCell>
                    <Input 
                      type="number" 
                      value={editData.reps} 
                      onChange={(e) => setEditData({ ...editData, reps: Number(e.target.value) })} 
                      className="h-8 text-sm w-16 ml-auto text-right"
                    />
                  </TableCell>
                  <TableCell>
                    <Input 
                      type="number" 
                      value={editData.weight} 
                      onChange={(e) => setEditData({ ...editData, weight: Number(e.target.value) })} 
                      className="h-8 text-sm w-20 ml-auto text-right"
                    />
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex items-center justify-center gap-1">
                      <Button variant="ghost" size="icon" onClick={() => handleSave(item.id)} className="h-8 w-8 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-100" title="Salvar">
                        <Save size={16} />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => setEditingId(null)} className="h-8 w-8 text-muted-foreground hover:text-red-500 hover:bg-red-100" title="Cancelar">
                        <X size={16} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            }

            return (
              <TableRow 
                key={item.id} 
                className={`transition-colors hover:bg-muted/30 ${item.completed ? "bg-emerald-50/50 opacity-70" : ""}`}
              >
                <TableCell className={`font-medium ${item.completed ? "line-through text-muted-foreground" : ""}`}>
                  {item.exercise}
                </TableCell>
                <TableCell className="text-right">{item.sets}</TableCell>
                <TableCell className="text-right">{item.reps}</TableCell>
                <TableCell className="text-right">{item.weight}</TableCell>
                <TableCell className="text-center">
                  <div className="flex items-center justify-center gap-1">
                    
                    {!item.completed && onComplete && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          console.log(">>> Botão de concluir clicado para o ID:", item.id);
                          onComplete(item.id);
                        }}
                        className="h-8 w-8 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-100 transition-colors"
                        title="Concluir exercício"
                      >
                        <Check size={16} />
                      </Button>
                  )}

                    {onEdit && !item.completed && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEditClick(item)}
                        className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-100 transition-colors"
                        title="Editar exercício"
                      >
                        <Pencil size={16} />
                      </Button>
                    )}

                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onDelete(item.id)}
                      className="h-8 w-8 text-muted-foreground hover:text-red-500 hover:bg-red-100 transition-colors"
                      title="Remover exercício"
                    >
                      <Trash2 size={16} />
                    </Button>
                    
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}