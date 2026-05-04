import { useEffect, useState } from "react";
import { ScaleList, type EventData } from "../components/ScaleList";
import { Button } from "../components/Button"; // Ajuste o caminho se necessário
import { useNavigate } from "react-router-dom";
import { api } from "../services/api"; // Ajuste o caminho da sua config do Axios

export function Scales() {
  const navigate = useNavigate();
  const [events, setEvents] = useState<EventData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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
    // Uma janelinha de confirmação para evitar cliques acidentais
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
        <ScaleList events={events} onDelete={handleDelete} />
      )}
    </div>
  );
}
