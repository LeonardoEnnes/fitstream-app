import { Activity, Apple, Dumbbell, LayoutDashboard, ChevronLeft, ChevronRight } from "lucide-react";
import { NavLink } from "react-router-dom";

interface SidebarProps {
  isMinimized: boolean;
  onToggle: () => void;
}

export function Sidebar({ isMinimized, onToggle }: SidebarProps) {
  return (
    <aside className={`${isMinimized ? "w-20" : "w-64"} border-r border-border bg-card flex flex-col transition-all duration-300 ease-in-out`}>
      
      <div className={`h-16 flex items-center border-b border-border transition-all duration-300 ${isMinimized ? "justify-center px-0" : "px-6 justify-between"}`}>
        <div className={`flex items-center ${isMinimized ? "justify-center" : "gap-2"}`}>
          <Activity className="w-6 h-6 text-emerald-500 shrink-0" />
          {!isMinimized && <span className="font-bold text-xl uppercase whitespace-nowrap">FitStream</span>}
        </div>
        {!isMinimized && (
          <button onClick={onToggle} className="p-1 hover:bg-secondary rounded">
            <ChevronLeft size={16} />
          </button>
        )}
      </div>

      {isMinimized && (
        <button onClick={onToggle} className="w-full flex justify-center py-2 hover:bg-secondary border-b border-border">
          <ChevronRight size={16} />
        </button>
      )}

      {/* navegacao */}
      <nav className="flex-1 p-4 space-y-2">
        <SidebarItem to="/dashboard" icon={<LayoutDashboard size={20}/>} label="Dashboard" isMinimized={isMinimized} />
        <SidebarItem to="/nutricao" icon={<Apple size={20}/>} label="Nutrição" isMinimized={isMinimized} />
        <SidebarItem to="/treinos" icon={<Dumbbell size={20}/>} label="Treinos" isMinimized={isMinimized} />
      </nav>
    </aside>
  );
}

// Sub-componente auxiliar
function SidebarItem({ to, icon, label, isMinimized }: { to: string, icon: any, label: string, isMinimized: boolean }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex w-full items-center gap-3 px-3 py-2 rounded-md transition-all ${
          isActive 
            ? "bg-primary/10 text-primary font-medium" 
            : "hover:bg-secondary/50 text-muted-foreground"
        }`
      }
    >
      {icon}
      {!isMinimized && <span>{label}</span>}
    </NavLink>
  );
}