import { useEffect, useState } from "react";
import { ScaleList, type EventData } from "../components/ScaleList";
import { Button } from "../components/Button";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";
import { EditMembersModal } from "../components/EditMembersModal";
import type { EventScale } from "../components/ScaleList";
import { AxiosError } from "axios";

export function Scales() {
  const navigate = useNavigate();
  const [events, setEvents] = useState<EventData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  // Estados para controlar o Modal de Edição
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [eventToEdit, setEventToEdit] = useState<EventData | null>(null);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await api.get("/v1/event");

        setEvents(response.data);
      } catch (error) {
        console.error("Erro ao buscar as escalas:", error);
        alert("Não foi possível carregar as escalas.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchEvents();
  }, []);

  const handleDelete = async (eventId: string) => {
    const confirm = window.confirm(
      "Tem certeza que deseja excluir esta escala?",
    );
    if (!confirm) return;

    try {
      await api.delete(`/v1/event/${eventId}`);

      setEvents(events.filter((event) => event.id !== eventId));

      alert("Escala excluída com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir:", error);
      alert("Não foi possível excluir a escala.");
    }
  };

  const handleOpenEdit = (event: EventData) => {
    setEventToEdit(event);
    setIsEditModalOpen(true);
  };

  // Função que recebe a lista nova do Modal e salva
  const handleSaveMembers = async (
    eventId: string,
    updatedMembers: EventScale[],
  ) => {
    try {
      const eventToUpdate = events.find((ev) => ev.id === eventId);

      if (!eventToUpdate) {
        throw new Error("Evento não encontrado");
      }

      const payload = {
        id: eventToUpdate?.id,
        name: eventToUpdate.name,
        date: eventToUpdate.date,
        time: eventToUpdate.time,
        type: eventToUpdate.type,
        description: eventToUpdate.description,
        scales: updatedMembers.map((member) => ({
          userId: member.user.id,
          function: member.function,
        })),
      };

      await api.put("/v1/event", payload);

      setEvents(
        events.map((ev) =>
          ev.id === eventId ? { ...ev, scales: updatedMembers } : ev,
        ),
      );

      alert("Escala atualizada com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar escala:", error);
      if (error instanceof AxiosError) {
        return alert(error.message ?? "Erro ao atualizar escala");
      }
    }
  };

  return (
    <div className="min-h-screen bg-(--bg-base) p-8">
      <header className="max-w-5xl mx-auto flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-(--text-primary)">
            Próximas Escalas
          </h1>
          <p className="text-(--text-muted) text-sm mt-1">
            Gerencie e visualize todas as escalas de culto.
          </p>
        </div>

        <Button onClick={() => navigate("/newScale")}>+ Nova Escala</Button>
      </header>

      {isLoading ? (
        <div className="text-center py-10 text-(--text-muted)">
          Carregando escalas...
        </div>
      ) : (
        <ScaleList
          events={events}
          onDelete={handleDelete}
          onEdit={handleOpenEdit}
        />
      )}
      <EditMembersModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        event={eventToEdit}
        onSave={handleSaveMembers}
      />
    </div>
  );
}
