import { Button } from "../components/Button";
import { CultInfoCard } from "../components/CultInfoCard";
import { EquipCard } from "../components/EquipCard";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";
import { z } from "zod";
import { AxiosError } from "axios";

export const cultSchema = z.object({
  name: z.string().min(3, "O nome do culto deve ter pelo menos 3 letras."),
  date: z.string().min(1, "A data é obrigatória."),
  time: z.string().min(1, "O horário é obrigatório."),
  type: z.string().min(1, "O tipo de culto é obrigatório."),
  description: z.string().optional(), // Opcional!
});

export type CultData = z.infer<typeof cultSchema>;

export type ScaleMember = {
  userId: string;
  userName: string;
  function: string;
};

export function NewScale() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [cultData, setCultData] = useState<CultData>({
    name: "",
    date: "",
    time: "",
    type: "",
    description: "",
  });
  const [equipe, setEquipe] = useState<ScaleMember[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const validacao = cultSchema.safeParse(cultData);

    if (!validacao.success) {
      const firstError = validacao.error.issues[0].message;
      alert(firstError);
      return;
    }

    if (equipe.length === 0) {
      alert("Adicione pelo menos um membro na escala.");
      return;
    }

    try {
      setIsLoading(true);

      const payload = {
        ...validacao.data,
        scales: equipe,
      };

      if (confirm("Tem certeza que deseja criar essa escala?")) {
        api.post("v1/event", payload);
      }

      navigate("/scales");
    } catch (error) {
      if (error instanceof AxiosError) {
        alert(error.response?.data.message);
      }
    } finally {
      setIsLoading(false);
    }
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
          <Button onClick={handleSubmit} isLoading={isLoading}>
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
          <CultInfoCard cultData={cultData} setCultData={setCultData} />
        </div>

        <div className="w-full lg:w-1/2">
          <EquipCard equipe={equipe} setEquipe={setEquipe} />
        </div>
      </form>
    </div>
  );
}
