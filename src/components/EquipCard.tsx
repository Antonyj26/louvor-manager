import { useState } from "react";
import { Button } from "./Button";
import { MemberModal } from "./MemberModal";

export function EquipCard() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
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
            onClick={() => setIsModalOpen(true)}
          >
            <span className="text-base font-medium">+</span> Adicionar
          </Button>
        </header>

        <div className="px-6 pb-6">
          <p className="text-(--text-muted) text-sm py-4 text-center border border-dashed border-(--border) rounded-md">
            Nenhum membro adicionado ainda.
          </p>
        </div>
      </article>
      <MemberModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
