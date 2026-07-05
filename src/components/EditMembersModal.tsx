import { useState, useEffect } from "react";
import type { EventData, EventScale } from "./ScaleList";
import { api } from "../services/api";
import { Select } from "./Select";

type EditMembersModalProps = {
  isOpen: boolean;
  onClose: () => void;
  event: EventData | null;
  onSave: (eventId: string, updatedMembers: EventScale[]) => void;
};

function getInitials(name: string) {
  if (!name) return ""; // Proteção caso o nome venha vazio
  const parts = name.trim().split(" ");
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function getUserColor(name: string) {
  if (!name) return "bg-gray-500";
  const colors = [
    "bg-orange-500",
    "bg-emerald-500",
    "bg-teal-500",
    "bg-green-500",
    "bg-lime-500",
    "bg-blue-500",
    "bg-rose-500",
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
}

export function EditMembersModal({
  isOpen,
  onClose,
  event,
  onSave,
}: EditMembersModalProps) {
  const [members, setMembers] = useState<EventScale[]>([]);

  const [isAdding, setIsAdding] = useState(false);
  const [usersList, setUsersList] = useState<{ id: string; name: string }[]>(
    [],
  );

  const [selectedUserId, setSelectedUserId] = useState("");
  const [selectedUserName, setSelectedUserName] = useState("");
  const [selectedFunction, setSelectedFunction] = useState("");

  useEffect(() => {
    if (event) {
      setMembers(event.scales);
    }
  }, [event]);

  if (!isOpen || !event) return null;

  const handleOpenAdd = async () => {
    setIsAdding(true);
    try {
      const response = await api.get("/v1/users");
      setUsersList(response.data);
    } catch (error) {
      console.error("Erro ao carregar usuários:", error);
    }
  };

  const handleConfirmAdd = () => {
    if (!selectedUserId || !selectedFunction) {
      alert("Por favor, selecione o usuário e a função.");
      return;
    }

    const newMember: EventScale = {
      id: crypto.randomUUID(),
      eventId: event.id,
      function: selectedFunction,
      // <-- AJUSTE AQUI: Em vez de userId e userName soltos,
      // criamos o objeto 'user' aninhado exatamente como a API espera
      user: {
        id: selectedUserId,
        name: selectedUserName, // Lembre-se de confirmar se o seu DTO chama "name" ou "userName"
      },
    };

    setMembers([...members, newMember]);

    setIsAdding(false);
    setSelectedUserId("");
    setSelectedUserName("");
    setSelectedFunction("");
  };

  const handleRemoveMember = (scaleIdToRemove: string) => {
    setMembers(members.filter((member) => member.id !== scaleIdToRemove));
  };

  const handleSave = () => {
    onSave(event.id, members);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/70 backdrop-blur-sm p-4">
      <div className="bg-(--bg-surface) border border-(--border) w-full max-w-lg rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <header className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <svg
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 16 16"
              className="text-(--text-primary)"
            >
              <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4-1 1-1 1zm-4-4a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-9.784 6A2.24 2.24 0 0 1 1 13c0-1.355.68-2.75 1.936-3.72A6.3 6.3 0 0 0 1 9c-4 0-5 3-5 4s1 1 1 1zM3 3.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0" />
            </svg>
            <h2 className="text-xl font-bold text-(--text-primary)">Equipe</h2>
          </div>

          <button
            className="flex items-center gap-2 px-4 py-2 border-2 border-dashed border-(--border) text-(--text-muted) rounded-lg hover:border-green-500 hover:text-green-400 transition-colors text-sm font-medium"
            onClick={handleOpenAdd}
          >
            <svg width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
              <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
            </svg>
            Adicionar
          </button>
        </header>

        <div className="mb-4">
          <p className="text-sm text-(--text-muted) mb-4">
            Escala: <strong>{event.name}</strong>
          </p>

          {isAdding && (
            <div className="bg-(--bg-base) p-4 rounded-xl border border-green-500/30 mb-4 animate-in fade-in slide-in-from-top-2">
              <h3 className="text-sm font-semibold text-(--text-primary) mb-3">
                Novo Membro
              </h3>

              <div className="flex flex-col gap-3">
                <Select
                  legend="Usuário"
                  value={selectedUserId}
                  onChange={(e) => {
                    const userId = e.target.value;
                    setSelectedUserId(userId);

                    const user = usersList.find((u) => u.id === userId);
                    if (user) setSelectedUserName(user.name);
                  }}
                  options={[
                    { value: "", label: "Selecione um usuário..." },
                    ...usersList.map((user) => ({
                      value: user.id,
                      label: user.name,
                    })),
                  ]}
                />

                <Select
                  legend="Função"
                  value={selectedFunction}
                  onChange={(e) => setSelectedFunction(e.target.value)}
                  options={[
                    { value: "", label: "Selecione a função..." },
                    { value: "VOCAL", label: "Vocal" },
                    { value: "VIOLAO", label: "Violão" },
                    { value: "GUITARRA", label: "Guitarra" },
                    { value: "BAIXO", label: "Baixo" },
                    { value: "BATERIA", label: "Bateria" },
                    { value: "TECLADO", label: "Teclado" },
                  ]}
                />
              </div>

              <div className="flex justify-end gap-2 mt-4">
                <button
                  onClick={() => setIsAdding(false)}
                  className="px-3 py-1.5 text-xs font-medium text-(--text-muted) hover:text-(--text-primary)"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleConfirmAdd}
                  className="px-3 py-1.5 bg-green-600/20 text-green-400 hover:bg-green-600/30 text-xs font-bold uppercase tracking-wide rounded-md transition-colors"
                >
                  Confirmar
                </button>
              </div>
            </div>
          )}

          <div className="flex flex-col gap-3 max-h-75 overflow-y-auto pr-2">
            {members.map((member) => (
              <article
                key={member.id}
                className="flex items-center justify-between bg-(--bg-base) p-4 rounded-lg border border-(--border)"
              >
                <div className="flex items-center gap-4">
                  <span className="text-xs font-semibold text-(--text-muted) uppercase tracking-wide w-24 text-right">
                    {member.function}
                  </span>

                  {/* <-- AJUSTE AQUI: Mudado para member.user.name nas chamadas de função */}
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold ${getUserColor(member.user.name)}`}
                    title={member.user.name}
                  >
                    {getInitials(member.user.name)}
                  </div>

                  {/* <-- AJUSTE AQUI: Mudado para member.user.name na renderização do texto */}
                  <span className="text-sm font-semibold text-(--text-primary)">
                    {member.user.name}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveMember(member.id)}
                  className="p-2 text-(--text-muted) hover:text-red-500 hover:bg-red-500/10 rounded-full transition-colors"
                  title="Remover membro"
                >
                  <svg
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                  </svg>
                </button>
              </article>
            ))}

            {members.length === 0 && (
              <p className="text-xs text-center text-(--text-muted) py-4">
                Nenhum membro na equipe.
              </p>
            )}
          </div>
        </div>

        <footer className="flex justify-end gap-3 mt-8 pt-4 border-t border-(--border)">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-(--text-muted) hover:text-(--text-primary)"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg"
          >
            Salvar Alterações
          </button>
        </footer>
      </div>
    </div>
  );
}
