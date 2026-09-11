import { useState } from "react";
import { Toggle } from "@/components/ui/toggle";
import { Check, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSupplements } from "@/hooks/useSupplements";

const defaultSupplements = [
  { id: "whey", label: "Whey Protein" },
  { id: "creatine", label: "Creatina" },
  { id: "preworkout", label: "Pré-Treino" },
];

export function QuickSupplements() {
  const { supplements, addSupplement, deleteSupplement } = useSupplements();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [customItem, setCustomItem] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleToggle = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const handleSubmit = async () => {
    if (selectedIds.length === 0 && !customItem.trim()) return;

    setIsSubmitting(true);

    try {
      // Dispara o cadastro para cada item selecionado nos toggles
      for (const id of selectedIds) {
        const found = defaultSupplements.find((item) => item.id === id);
        if (found) {
          await addSupplement(found.label);
        }
      }

      // Se houver um item customizado digitado
      if (customItem.trim()) {
        await addSupplement(customItem.trim());
      }

      setSelectedIds([]);
      setCustomItem("");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {defaultSupplements.map((item) => {
          const isPressed = selectedIds.includes(item.id);

          return (
            <Toggle
              key={item.id}
              pressed={isPressed}
              onPressedChange={() => handleToggle(item.id)}
              className={`border px-3 py-2 text-sm transition-all ${
                isPressed
                  ? "border-emerald-500 bg-emerald-500/10 text-emerald-500 font-medium"
                  : "border-border hover:bg-secondary text-muted-foreground"
              }`}
            >
              <Check
                className={`mr-1.5 h-4 w-4 transition-opacity ${
                  isPressed ? "opacity-100" : "opacity-0 w-0 mr-0"
                }`}
              />
              {item.label}
            </Toggle>
          );
        })}
      </div>

      <div className="space-y-1">
        <Input
          placeholder="Não encontrou o seu suplemento? Digite aqui..."
          value={customItem}
          onChange={(e) => setCustomItem(e.target.value)}
          className="h-9 text-sm"
          autoComplete="off"
        />
      </div>

      <Button
        type="button"
        onClick={handleSubmit}
        disabled={
          isSubmitting || (selectedIds.length === 0 && !customItem.trim())
        }
        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white h-9 text-sm"
      >
        {isSubmitting ? "Registrando..." : "Registrar Suplementação"}
      </Button>

      {/* Lista rápida dos suplementos tomados no dia */}
      {supplements.length > 0 && (
        <div className="mt-4 space-y-2 border-t border-border pt-3">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Registrados hoje:</p>
          <div className="space-y-1.5 max-h-32 overflow-y-auto pr-1">
            {supplements.map((item) => (
              <div key={item.id} className="flex items-center justify-between bg-muted/30 px-3 py-1.5 rounded-md text-sm">
                <span className="font-medium text-foreground">{item.name}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => deleteSupplement(item.id)}
                  className="h-7 w-7 text-muted-foreground hover:text-red-500 transition-colors"
                  title="Remover suplemento"
                >
                  <Trash2 size={14} />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}