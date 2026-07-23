// import { Github, Instagram, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card py-6 mt-auto">
      <div className="container flex flex-col md:flex-row items-center justify-between gap-4 px-8">
        
        <div className="flex flex-col items-center md:items-start gap-1">
          <p className="text-sm font-semibold">FitStream © 2026</p>
          <button className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Sobre nós
          </button>
        </div>

        <div className="flex items-center gap-4">
          <a href="#" className="text-muted-foreground hover:text-emerald-500 transition-colors">
            Rede 1
          </a>
          <a href="#" className="text-muted-foreground hover:text-emerald-500 transition-colors">
            <a href="http://"></a>
          </a>
          <a href="#" className="text-muted-foreground hover:text-emerald-500 transition-colors">
            Rede 2
          </a>
        </div>
      </div>
    </footer>
  );
}