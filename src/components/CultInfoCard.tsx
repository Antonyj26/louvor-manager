import { Input } from "./Input";
import { Select } from "./Select";
import { typeOptions } from "../utils/typeOptions";
import type { CultData } from "../pages/NewScale";

type CultInfoCardProps = {
  cultData: CultData;
  setCultData: (data: CultData) => void;
};

export function CultInfoCard({ cultData, setCultData }: CultInfoCardProps) {
  const handleChange = (field: keyof CultData, value: string) => {
    setCultData({ ...cultData, [field]: value });
  };

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
        <Input
          legend="Nome do Culto"
          placeholder="Ex: Culto da Manhã"
          value={cultData.name}
          onChange={(e) => handleChange("name", e.target.value)}
        />
        <Input
          legend="Data"
          type="date"
          value={cultData.date}
          onChange={(e) => handleChange("date", e.target.value)}
        />
        <Input
          legend="Horário"
          type="time"
          value={cultData.time}
          onChange={(e) => handleChange("time", e.target.value)}
        />
        <Select
          legend="Tipo"
          options={typeOptions}
          defaultValue={cultData.type}
          onChange={(e) => handleChange("type", e.target.value)}
        />
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
              value={cultData.description}
              onChange={(e) => handleChange("description", e.target.value)}
            />
          </fieldset>
        </div>
      </div>
    </article>
  );
}
