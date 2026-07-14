import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function Dashboard() {
  return (
    <div className="space-y-8">
      
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Sexta-feira, 10 de Julho de 2026
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Calorias Consumidas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,850 kcal</div>
            <p className="text-xs text-muted-foreground mt-1">
              Faltam 650 kcal para a meta
            </p>
          </CardContent>
        </Card>
        
        <Card><CardContent className="pt-6"><div className="text-2xl font-bold text-muted-foreground">Proteína (Mock)</div></CardContent></Card>
        <Card><CardContent className="pt-6"><div className="text-2xl font-bold text-muted-foreground">Carbo (Mock)</div></CardContent></Card>
        <Card><CardContent className="pt-6"><div className="text-2xl font-bold text-muted-foreground">Gordura (Mock)</div></CardContent></Card>
      </div>

      <div className="grid gap-4 md:grid-cols-7">
        <Card className="col-span-4 md:col-span-5 h-[400px]">
          <CardHeader>
            <CardTitle>Consumo ao longo do dia</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center h-64 text-muted-foreground border-dashed border-2 m-4 rounded-lg">
            [ Área do Gráfico ]
          </CardContent>
        </Card>

        <Card className="col-span-3 md:col-span-2 h-[400px] border-l-4 border-l-emerald-500">
          <CardHeader>
            <CardTitle>Eventos em Tempo Real</CardTitle>
            <p className="text-xs text-muted-foreground">Live Feed (Kafka)</p>
          </CardHeader>
          <CardContent className="flex items-center justify-center h-64 text-muted-foreground">
            [ Lista de Alertas ]
          </CardContent>
        </Card>
      </div>
    </div>
  );
}