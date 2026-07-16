import { useState, type ReactNode } from "react";
import { Activity, Apple, Dumbbell, LayoutDashboard, ChevronLeft, ChevronRight } from "lucide-react";

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const [isMinimized, setIsMinimized] = useState(false);

  return (
    <div className="flex h-screen w-full bg-background text-foreground overflow-hidden">
      
      <aside className={`${isMinimized ? "w-20" : "w-64"} border-r border-border bg-card flex flex-col transition-all duration-300 ease-in-out`}>
        
        <div className={`h-16 flex items-center border-b border-border transition-all duration-300 ${isMinimized ? "justify-center px-0" : "px-6 justify-between"}`}>
          
          <div className={`flex items-center ${isMinimized ? "justify-center" : "gap-2"}`}>
            <Activity className="w-6 h-6 text-emerald-500 shrink-0" />
            {!isMinimized && (
              <span className="font-bold text-xl uppercase whitespace-nowrap">
                FitStream
              </span>
            )}
          </div>

          {!isMinimized && (
            <button onClick={() => setIsMinimized(!isMinimized)} className="p-1 hover:bg-secondary rounded">
              <ChevronLeft size={16} />
            </button>
          )}
        </div>

        {isMinimized && (
          <button onClick={() => setIsMinimized(!isMinimized)} className="w-full flex justify-center py-2 hover:bg-secondary border-b border-border">
            <ChevronRight size={16} />
          </button>
        )}
        
        <nav className="flex-1 p-4 space-y-2">
          <button className="flex w-full items-center gap-3 px-3 py-2 rounded-md bg-secondary text-secondary-foreground transition-all">
            <LayoutDashboard className="w-5 h-5 shrink-0" />
            {!isMinimized && <span>Dashboard</span>}
          </button>
          <button className="flex w-full items-center gap-3 px-3 py-2 rounded-md hover:bg-secondary/50 transition-all text-muted-foreground">
            <Apple className="w-5 h-5 shrink-0" />
            {!isMinimized && <span>Nutrição</span>}
          </button>
          <button className="flex w-full items-center gap-3 px-3 py-2 rounded-md hover:bg-secondary/50 transition-all text-muted-foreground">
            <Dumbbell className="w-5 h-5 shrink-0" />
            {!isMinimized && <span>Treinos</span>}
          </button>
        </nav>
      </aside>

      <main className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto p-8">
          {children}
        </div>
      </main>
      
    </div>
  );
}