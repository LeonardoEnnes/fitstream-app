import { useState, type ReactNode } from "react";
import { Sidebar } from "./Sidebar";

export function AppLayout({ children }: { children: ReactNode }) {
  const [isMinimized, setIsMinimized] = useState(false);

  return (
    <div className="flex h-screen w-full bg-background text-foreground overflow-hidden">
      <Sidebar isMinimized={isMinimized} onToggle={() => setIsMinimized(!isMinimized)} />
      <main className="flex-1 overflow-y-auto p-8">{children}</main>
    </div>
  );
}