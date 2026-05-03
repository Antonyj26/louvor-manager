import { useState } from "react";
import { Button } from "./Button";
import { MemberModal } from "./MemberModal";
import type { ScaleMember } from "../pages/NewScale";

type EquipCardProps = {
  equipe: ScaleMember[];
  setEquipe: React.Dispatch<React.SetStateAction<ScaleMember[]>>;
};

export function EquipCard({ equipe, setEquipe }: EquipCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddMember = (newMember: ScaleMember) => {
    setEquipe([...equipe, newMember]);
    setIsModalOpen(false);
  };

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
            type="button"
          >
            <span className="text-base font-medium">+</span> Adicionar
          </Button>
        </header>

        <div className="px-6 pb-6 flex flex-col gap-3">
          {equipe.length === 0 ? (
            <p className="text-(--text-muted) text-sm py-4 text-center border border-dashed border-(--border) rounded-md">
              Nenhum membro adicionado ainda.
            </p>
          ) : (
            equipe.map((member, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 border border-(--border) rounded-md bg-(--bg-base)"
              >
                <div className="flex flex-col">
                  <span className="text-(--text-primary) text-sm font-medium">
                    Nome: {member.userName}
                  </span>
                  <span className="text-(--text-muted) text-xs">
                    Função: {member.function}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setEquipe(equipe.filter((_, i) => i !== index))
                  }
                  className="text-red-500 hover:text-red-400 text-sm font-medium cursor-pointer"
                >
                  X
                </button>
              </div>
            ))
          )}
        </div>
      </article>
      <MemberModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddMember}
      />
    </>
  );
}
