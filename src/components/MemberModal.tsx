import { Select } from "./Select";
import { Button } from "./Button";
import { useState, useEffect } from "react";
import { api } from "../services/api";
import { AxiosError } from "axios";
import type { ScaleMember } from "../pages/NewScale";

const funcoes = [
  { value: "VOCAL", label: "Vocal" },
  { value: "VIOLAO", label: "Violão" },
  { value: "GUITARRA", label: "Guitarra" },
  { value: "BATERIA", label: "Bateria" },
  { value: "TECLADO", label: "Teclado" },
  { value: "BAIXO", label: "Baixo" },
  { value: "BACKING_VOCAL", label: "Backing Vocal" },
  { value: "MESA", label: "Mesa" },
  { value: "DATA_SHOW", label: "Data Show" },
];

type MemberModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (membro: ScaleMember) => void;
};

type OptionType = {
  value: string;
  label: string;
};

export function MemberModal({ isOpen, onClose, onAdd }: MemberModalProps) {
  const [members, setMembers] = useState<OptionType[]>([]);
  const [isLoadingMembers, setIsLoadingMembers] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [selectedUserName, setSelectedUserName] = useState("");
  const [selectedFunction, setSelectedFunction] = useState("");

  useEffect(() => {
    async function fetchUsers() {
      try {
        setIsLoadingMembers(true);

        const response = await api.get("/v1/users");

        const formattedMembers = response.data.map((user: any) => ({
          value: String(user.id),
          label: user.name,
        }));

        setMembers(formattedMembers);
      } catch (error) {
        if (error instanceof AxiosError) {
          alert(error.response?.data.message);
        }
      } finally {
        setIsLoadingMembers(false);
      }
    }

    if (isOpen) {
      fetchUsers();
    } else {
      setSelectedUserId("");
      setSelectedFunction("");
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedUserId || !selectedFunction) {
      alert("Por favor, selecione um membro e uma função.");
      return;
    }

    onAdd({
      userId: selectedUserId,
      userName: selectedUserName,
      function: selectedFunction,
    });
  };

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

        <div className="flex flex-col gap-5">
          <Select
            legend={isLoadingMembers ? "Carregando membros" : "Membro"}
            options={members}
            value={selectedUserId}
            disabled={isLoadingMembers}
            onChange={(e) => {
              const idSelecionado = e.target.value;
              setSelectedUserId(idSelecionado);

              const membroEncontrado = members.find(
                (m) => m.value === idSelecionado,
              );
              if (membroEncontrado) {
                setSelectedUserName(membroEncontrado.label);
              }
            }}
          />

          <Select
            legend="Função / Instrumento"
            options={funcoes}
            value={selectedFunction}
            onChange={(e) => setSelectedFunction(e.target.value)}
          />

          <div className="flex justify-end gap-3 mt-3">
            <Button variant="secondary" type="button" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="button" onClick={handleSubmit}>
              Adicionar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
