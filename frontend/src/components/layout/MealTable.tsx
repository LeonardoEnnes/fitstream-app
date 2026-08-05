import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

export interface MealItem {
    id: string;
    name: string;
    calories: number; 
    protein: number;
    carbs: number;
    fat: number;
}

interface MealTableProps {
    meals: MealItem[];
    onDelete: (id: string) => void; // Callback para deletar uma refeição
}

///

export function MealTable({ meals, onDelete }: MealTableProps) {
    if (meals.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-48 border border-dashed border-border rounded-md bg-muted/10 text-center p-6">
                <p className="text-sm font-medium text-muted-foreground">Nenhuma refeição registrada hoje.</p>
                <p className="text-xs text-muted-foreground/70 mt-1">Utilize o formulário ao lado para adicionar sua primeira refeição.</p>
            </div>
        );
    }

    return (
    <div className="rounded-md border border-border overflow-hidden">
      <Table>
        <TableHeader className="bg-secondary/40">
          <TableRow>
            <TableHead className="font-semibold">Refeição</TableHead>
            <TableHead className="text-right font-semibold">Kcal</TableHead>
            <TableHead className="text-right font-semibold">P (g)</TableHead>
            <TableHead className="text-right font-semibold">C (g)</TableHead>
            <TableHead className="text-right font-semibold">G (g)</TableHead>
            <TableHead className="text-center font-semibold w-[80px]">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {meals.map((meal) => (
            <TableRow key={meal.id} className="hover:bg-muted/30 transition-colors">
              <TableCell className="font-medium">{meal.name}</TableCell>
              <TableCell className="text-right">{meal.calories}</TableCell>
              <TableCell className="text-right">{meal.protein}</TableCell>
              <TableCell className="text-right">{meal.carbs}</TableCell>
              <TableCell className="text-right">{meal.fat}</TableCell>
              <TableCell className="text-center">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onDelete(meal.id)}
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

