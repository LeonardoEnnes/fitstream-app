import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {PageHeader} from "@/components/layout/PageHeader";
import { MealForm } from "../../components/layout/MealForm";
import { QuickSupplements } from "@/components/layout/QuickSupplements";
import { MealTable } from "../../components/layout/MealTable";

export function NutritionPage() {
  return (
    <>
    <div className="space-y-6">
      <PageHeader title="Nutrição" description="Registre suas refeições e acompanhe seus macros diários." />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <div className="space-y-6 lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-extrabold tracking-tight">Nova Refeição</CardTitle> 
            </CardHeader>
            <CardContent>
              <MealForm />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-extrabold tracking-tight">Suplementação</CardTitle>
              <span className = "text-muted-foreground mt-1"> Registe os suplementos que você toma diariamente</span>
            </CardHeader>
            <CardContent>
                <QuickSupplements/>
            </CardContent>
          </Card>

        </div>

        <div className="lg:col-span-2">
          
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="text-lg">Diário de Consumo</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex h-110 items-center justify-center rounded-md border border-dashed border-border bg-muted/20">
                <MealTable meals={[]} onDelete={() => {}} />
              </div>
            </CardContent>
          </Card>

        </div>
        
      </div>
    </div>
    </>
  );
}