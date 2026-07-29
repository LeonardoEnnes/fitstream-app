import { FaInstagram, FaFacebook, FaXTwitter } from "react-icons/fa6";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
 } from "@/components/ui/dialog";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card py-2 mt-auto">
      <div className="container flex flex-col md:flex-row items-center justify-between gap-4 px-8">
        
        <div className="flex flex-col items-center md:items-start gap-1">
          <p className="text-sm font-semibold">FitStream © 2026</p>
          <Dialog>
            <DialogTrigger className="text-sm text-muted-foreground hover:text-foreground transition-colors">Sobre nós</DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Somos um sistema de streaming de treinamento</DialogTitle>
                <DialogDescription>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores cum excepturi eum nam, necessitatibus, autem suscipit odio incidunt ullam commodi deserunt eius quas facere, aspernatur impedit alias nemo rem! Sint.
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>


        <div className="flex items-center gap-4">
          <a href="#" className="text-muted-foreground hover:text-emerald-500 transition-colors">
            <FaInstagram />
          </a>
          <a href="#" className="text-muted-foreground hover:text-emerald-500 transition-colors">
            <FaFacebook />
          </a>
          <a href="#" className="text-muted-foreground hover:text-emerald-500 transition-colors">
            <FaXTwitter />
          </a>
        </div>
      </div>
    </footer>
  );
}