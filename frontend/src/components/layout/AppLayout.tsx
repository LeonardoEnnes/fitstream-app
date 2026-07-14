import type { ReactNode } from "react";
import { Activity, Apple, Dumbbell, LayoutDashboard } from "lucide-react"; 

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="flex h-screen w-full bg-background text-foreground overflow-hidden">
      
      {/* SIDEBAR */}
      <aside className="w-64 border-r border-border bg-card flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-border">
          <Activity className="w-6 h-6 text-emerald-500 mr-2" />
          <span className="font-bold text-xl tracking-wider uppercase">FitStream</span>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <button className="flex w-full items-center gap-3 px-3 py-2 rounded-md bg-secondary text-secondary-foreground transition-colors">
            <LayoutDashboard className="w-5 h-5" />
            Dashboard
          </button>
          <button className="flex w-full items-center gap-3 px-3 py-2 rounded-md hover:bg-secondary/50 transition-colors text-muted-foreground">
            <Apple className="w-5 h-5" />
            Nutrição
          </button>
          <button className="flex w-full items-center gap-3 px-3 py-2 rounded-md hover:bg-secondary/50 transition-colors text-muted-foreground">
            <Dumbbell className="w-5 h-5" />
            Treinos
          </button>
        </nav>
      </aside>

      {/* ÁREA PRINCIPAL */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto p-8">
          {children}
        </div>
      </main>
      
    </div>
  );
}