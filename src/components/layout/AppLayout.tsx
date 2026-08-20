import { useState, type ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { Footer } from "./Footer";

export function AppLayout({ children }: { children: ReactNode }) {
  const [isMinimized, setIsMinimized] = useState(false);

  return (
    <div className="flex h-screen w-full bg-background text-foreground overflow-hidden">

      <Sidebar isMinimized={isMinimized} onToggle={() => setIsMinimized(!isMinimized)} />
    
      <main className="flex-1 flex flex-col overflow-y-auto">
        
        <div className="flex-1 p-8">
          {children}
        </div>
        
        
        <Footer />
      </main>
    </div>
  );
}