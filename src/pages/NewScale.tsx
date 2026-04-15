import { Button } from "../components/Button";
import { CultInfoCard } from "../components/CultInfoCard";
import { EquipCard } from "../components/EquipCard";

export function NewScale() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Salvando escala...");
  };

  return (
    <div className="max-w-7xl mx-auto">
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-(--text-primary)">
            Nova Escala
          </h1>
          <p className="text-(--text-muted) text-sm mt-1">
            Preencha os dados da equipe e do culto
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="secondary">Salvar Rascunho</Button>
          <Button>
            <span className="text-lg">✓</span>
            Publicar Escala
          </Button>
        </div>
      </header>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col lg:flex-row gap-6 items-start"
      >
        <div className="w-full lg:w-1/2">
          <CultInfoCard />
        </div>

        <div className="w-full lg:w-1/2">
          <EquipCard />
        </div>
      </form>
    </div>
  );
}
