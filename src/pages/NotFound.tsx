import { Button } from "../components/Button";
import { useNavigate } from "react-router-dom";

export function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[70vh] text-center px-4">
      <div className="relative flex items-center justify-center w-24 h-24 mb-6 bg-(--bg-card) border border-(--border) rounded-full shadow-lg">
        <span className="text-5xl">🔕</span>
        <div className="absolute inset-0 border-4 border-red-500/80 rounded-full rotate-45">
          <div className="absolute top-1/2 left-0 w-full h-1 bg-red-500/80 -translate-y-1/2"></div>
        </div>
      </div>

      <h1 className="text-8xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-orange-300 to-yellow-500 mb-2 tracking-wider">
        404
      </h1>

      <h2 className="text-2xl font-bold text-(--text-primary) mb-3">
        Ops! O som parou por aqui...
      </h2>
      <p className="text-(--text-muted) max-w-md mb-8 leading-relaxed">
        Parece que essa página saiu do tom ou ainda não foi composta. Que tal
        voltar para o início e conferir a próxima escala?
      </p>

      <div className="flex flex-col sm:flex-row items-center gap-4">
        <Button onClick={() => navigate("/")}>Voltar ao Dashboard</Button>

        <Button
          variant="secondary"
          onClick={() => navigate("/musicas")}
          className="bg-transparent border border-(--border-light) hover:bg-(--bg-hover)"
        >
          Ver Repertório
        </Button>
      </div>
    </div>
  );
}
