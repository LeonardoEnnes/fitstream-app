import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "../../components/layout/PageHeader";
import { API_URL } from "@/lib/api";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useLiveFeed } from "@/context /LiveFeedContext";

interface TimelinePoint {
  time: string;
  calories: number;
}

interface DashboardSummary {
  totalCalories: number;
  calorieGoal: number;
  totalProtein: number;
  totalCarbs: number;
  totalFat: number;
  timeline: TimelinePoint[];
}

export function Dashboard() {
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { liveFeed } = useLiveFeed();
  
  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const response = await fetch(`${API_URL}/dashboard/summary`);
        if (!response.ok) throw new Error("Falha ao carregar o resumo");
        const data = await response.json();
        setSummary(data);
      } catch (err) {
        console.error(err);
        setError("Não foi possível carregar os dados do dashboard.");
      }
    };

    fetchSummary();
  }, []);

  return (
    <div className="space-y-8">
      <PageHeader title="Dashboard" description="Visão geral do seu progresso e estatísticas em tempo real." />

      {error && <div className="text-red-500 font-medium">{error}</div>}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Calorias Consumidas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {summary ? `${summary.totalCalories} kcal` : "Carregando..."}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {summary ? `Meta diária: ${summary.calorieGoal} kcal` : ""}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Proteínas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-600">
              {summary ? `${summary.totalProtein}g` : "..."}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Carboidratos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {summary ? `${summary.totalCarbs}g` : "..."}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Gorduras</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">
              {summary ? `${summary.totalFat}g` : "..."}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-7">
        <Card className="col-span-4 md:col-span-5 h-[400px] flex flex-col">
          <CardHeader>
            <CardTitle>Consumo ao longo do dia</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 min-h-0 pb-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={summary?.timeline || []} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorCalories" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '8px', color: '#fff' }}
                  itemStyle={{ color: '#10b981' }}
                />
                <Area type="monotone" dataKey="calories" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorCalories)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="col-span-3 md:col-span-2 h-[400px] border-l-4 border-l-emerald-500 overflow-hidden flex flex-col">
          <CardHeader className="pb-2">
            <CardTitle>Eventos em Tempo Real</CardTitle>
            <p className="text-xs text-muted-foreground">Live Feed Global</p>
          </CardHeader>
          <CardContent className="flex-1 overflow-y-auto px-4 py-2 space-y-3">
            {liveFeed.length === 0 ? (
              <div className="flex items-center justify-center h-full text-sm text-muted-foreground">
                Aguardando ações no sistema...
              </div>
            ) : (
              liveFeed.map((event) => (
                <div key={event.id} className="text-sm border-b border-border pb-2 last:border-0">
                  <span className="block font-semibold text-foreground">{event.type}</span>
                  <span className="block text-muted-foreground">{event.message}</span>
                  <span className="block text-xs text-muted-foreground/70 mt-1">
                    {new Date(event.timestamp).toLocaleTimeString()}
                  </span>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}