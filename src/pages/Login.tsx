import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { Link } from "react-router-dom";

export function Login() {
  return (
    <div className="w-full max-w-[400px] bg-(--bg-surface) border border-(--border) p-8 md:p-10 rounded-2xl shadow-2xl">
      <div className="flex flex-col items-center mb-8">
        <div className="w-14 h-14 bg-(--accent) rounded-xl flex items-center justify-center text-white text-2xl shadow-lg shadow-(--accent-glow) mb-4">
          🎵
        </div>

        <h1 className="text-3xl font-serif font-bold text-(--text-primary)">
          Louvor
        </h1>
        <p className="text-(--text-muted) text-sm mt-2">
          Acesse sua escala e repertório
        </p>
      </div>

      {/* FORMULÁRIO */}
      <form className="flex flex-col gap-5">
        <Input
          legend="E-mail ou Usuário"
          type="email"
          placeholder="seuemail@email.com"
          required
        />

        <Input legend="Senha" type="password" placeholder="••••••" required />

        <div className="flex items-center justify-between text-sm mt-1 mb-2">
          <label className="flex items-center gap-2 cursor-pointer text-(--text-secondary) hover:text-(--text-primary) transition-colors">
            <input
              type="checkbox"
              className="w-4 h-4 rounded border-(--border) bg-(--bg-base) text-(--accent) focus:ring-(--accent) accent-(--accent) cursor-pointer"
            />
            Lembrar-me
          </label>

          <Link
            to="/esqueci-senha"
            className="text-(--accent) hover:text-(--accent-soft) transition-colors"
          >
            Esqueci a senha
          </Link>
        </div>

        <Button type="submit" className="w-full h-12 text-base cursor-pointer">
          Entrar no Sistema
        </Button>
      </form>

      <div className="mt-8 text-center text-sm text-(--text-muted)">
        Não tem conta?{" "}
        <Link
          to="/solicitar-acesso"
          className="text-(--accent) hover:text-(--accent-soft) transition-colors font-medium"
        >
          Solicitar acesso
        </Link>
      </div>
    </div>
  );
}
