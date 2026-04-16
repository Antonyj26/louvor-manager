import { Input } from "./Input";
import { Select } from "./Select";
import { typeOptions } from "../utils/typeOptions";

export function CultInfoCard() {
  return (
    <article className="bg-(--bg-surface) border border-(--border) rounded-lg shadow-sm">
      <header className="flex items-center gap-2.5 p-6 pb-0 mb-6">
        <div className="w-5 h-5 bg-white text-xs flex items-center justify-center rounded-sm">
          📄
        </div>
        <h2 className="text-(--text-primary) font-semibold text-lg">
          Informações do Culto
        </h2>
      </header>

      <div className="px-6 pb-6 grid grid-cols-1 md:grid-cols-2 gap-5">
        <Input legend="Nome do Culto" placeholder="Ex: Culto da Manhã" />
        <Input legend="Data" type="date" />
        <Input legend="Horário" type="time" />
        <Select legend="Tipo" options={typeOptions} defaultValue="regular" />
        <div className="md:col-span-2">
          <fieldset className="flex flex-col gap-1.5 border-none p-0 m-0">
            <legend className="text-(--text-secondary) text-sm font-medium">
              Observações
            </legend>
            <textarea
              className="
                w-full min-h-\[100px\] p-4 
                bg-(--bg-base) 
                text-(--text-primary) 
                rounded-md 
                border border-(--border) 
                outline-none
                transition-all
                placeholder:text-(--text-muted)
                focus:border-(--accent) 
                focus:ring-2 
                focus:ring-(--accent-glow)
                resize-y
              "
              placeholder="Ex: Tema do culto, orientações especiais..."
            />
          </fieldset>
        </div>
      </div>
    </article>
  );
}
