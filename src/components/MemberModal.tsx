import { Select } from "./Select";
import { Input } from "./Input";
import { Button } from "./Button";

// Opções simuladas (depois você puxa isso da sua API do Spring Boot)
const membrosMock = [
  { value: "am", label: "Ana Martins" },
  { value: "rs", label: "Rafael Silva" },
  { value: "lc", label: "Lucas Costa" },
];

const funcoesMock = [
  { value: "vocal", label: "Vocal" },
  { value: "violao", label: "Violão" },
  { value: "bateria", label: "Bateria" },
  { value: "teclado", label: "Teclado" },
];

type MemberModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function MemberModal({ isOpen, onClose }: MemberModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-md bg-(--bg-surface) border border-(--border) rounded-2xl p-6 shadow-2xl">
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-lg font-semibold text-(--text-primary)">
            Adicionar Membro à Escala
          </h1>
          <button
            className="w-8 h-8 flex items-center justify-center rounded-md bg-(--bg-card) border border-(--border) text-(--text-muted) hover:text-(--text-primary) hover:bg-(--bg-hover) transition-colors"
            onClick={onClose}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 13L13 1M1 1L13 13"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </header>

        <form className="flex flex-col gap-5">
          <Select legend="Membro" options={membrosMock} defaultValue="" />

          <Select
            legend="Função / Instrumento"
            options={funcoesMock}
            defaultValue=""
          />

          <Input
            legend="Observação (opcional)"
            placeholder="Ex: Confirmar disponibilidade"
          />

          <div className="flex justify-end gap-3 mt-3">
            <Button variant="secondary" type="button" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">Adicionar</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
