import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

export interface WorkoutItem {
  id: string;
  exercise: string;
  sets: number;
  reps: number;
  weight: number;
}

interface WorkoutTableProps {
  workouts: WorkoutItem[];
  onDelete: (id: string) => void;
}

export function WorkoutTable({ workouts, onDelete }: WorkoutTableProps) {
  if (workouts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-48 border border-dashed border-border rounded-md bg-muted/10 text-center p-6">
        <p className="text-sm font-medium text-muted-foreground">Nenhum exercício registrado para hoje.</p>
        <p className="text-xs text-muted-foreground/70 mt-1">Adicione seus exercícios no formulário ao lado.</p>
      </div>
    );
  }

  return (
    <div className="rounded-md border border-border overflow-hidden">
      <Table>
        <TableHeader className="bg-secondary/40">
          <TableRow>
            <TableHead className="font-semibold">Exercício</TableHead>
            <TableHead className="text-right font-semibold">Séries</TableHead>
            <TableHead className="text-right font-semibold">Reps</TableHead>
            <TableHead className="text-right font-semibold">Carga (kg)</TableHead>
            <TableHead className="text-center font-semibold w-[80px]">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {workouts.map((item) => (
            <TableRow key={item.id} className="hover:bg-muted/30 transition-colors">
              <TableCell className="font-medium">{item.exercise}</TableCell>
              <TableCell className="text-right">{item.sets}</TableCell>
              <TableCell className="text-right">{item.reps}</TableCell>
              <TableCell className="text-right">{item.weight}</TableCell>
              <TableCell className="text-center">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onDelete(item.id)}
                  className="h-8 w-8 text-muted-foreground hover:text-red-500 transition-colors"
                >
                  <Trash2 size={16} />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}