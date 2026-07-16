import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {PageHeader} from "@/components/layout/PageHeader";

export function NutritionPage() {
  return (
    <>
    <div className="space-y-6">
      <PageHeader title="Nutrição" description="Registre suas refeições e acompanhe seus macros diários." />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <div className="space-y-6 lg:col-span-1">
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Nova Refeição</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex h-48 items-center justify-center rounded-md border border-dashed border-border bg-muted/20">
                <span className="text-sm text-muted-foreground">[ Formulário  ]</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Suplementação Rápida</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex h-24 items-center justify-center rounded-md border border-dashed border-border bg-muted/20">
                <span className="text-sm text-muted-foreground">[ Toggles: Whey, Creatina ]</span>
              </div>
            </CardContent>
          </Card>

        </div>

        {/* a*/}
        <div className="lg:col-span-2">
          
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="text-lg">Diário de Consumo</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex h-80 items-center justify-center rounded-md border border-dashed border-border bg-muted/20">
                <span className="text-sm text-muted-foreground">[  DataTable  ]</span>
              </div>
            </CardContent>
          </Card>

        </div>
        
      </div>
    </div>
    </>
  );
}