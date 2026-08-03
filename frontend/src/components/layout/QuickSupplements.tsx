import { Toggle } from "@/components/ui/toggle";
import { Check } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// fazer aquele esquema de loader...

// deixei uns mockados aqui -
const defaultSupplements = [
  { id: "whey", label: "Whey Protein" },
  { id: "creatine", label: "Creatina" },
  { id: "preworkout", label: "Pré-Treino" },
];

export function QuickSupplements() {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [customItem, setCustomItem] = useState(""); // para o estado de opcional

  const handleToggle = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const handleSubmit = () => {
    if (selectedIds.length === 0 && !customItem.trim()) return;

    const selectedPayload = defaultSupplements.filter((item) =>
      selectedIds.includes(item.id),
    );

    console.log("Enviando suplementos logados:", {
      supplements: selectedPayload,
      custom: customItem.trim() || null,
    });

    setSelectedIds([]);
    setCustomItem("");
  };

  return (
    <>
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
          />
        </div>

        <Button
          type="button"
          onClick={handleSubmit}
          disabled={selectedIds.length === 0 && !customItem.trim()}
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white h-9 text-sm"
        >
          Registrar Suplementação
        </Button>
      </div>
    </>
  );
}
