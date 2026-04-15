import { Button } from "./Button"; // Importe o seu componente de Button

export function EquipCard() {
  return (
    <article className="bg-(--bg-surface) border border-(--border) rounded-lg shadow-sm">
      <header className="flex items-center justify-between p-6 pb-0 mb-6">
        <div className="flex items-center gap-2.5">
          <span className="text-xl text-(--text-muted)">👥</span>
          <h2 className="text-(--text-secondary) font-semibold text-lg">
            Equipe
          </h2>
        </div>

        <Button
          variant="secondary"
          className="h-9 px-3 text-sm border-(--border) text-(--text-primary)"
        >
          <span className="text-base font-medium">+</span> Adicionar
        </Button>
      </header>

      <div className="px-6 pb-6"></div>
    </article>
  );
}
