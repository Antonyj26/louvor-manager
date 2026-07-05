export type EventScale = {
  id: string;
  eventId: string;
  user: {
    id: string;
    name: string;
  };
  function: string;
};

export type EventData = {
  id: string;
  name: string;
  date: string;
  time: string;
  type: string;
  description: string;
  scales: EventScale[];
};

type ScaleListProps = {
  events: EventData[];
  onDelete: (eventId: string) => void;
  onEdit: (event: EventData) => void;
};

function formatScaleDate(dateString: string) {
  const data = new Date(dateString + "T00:00:00");
  const dia = String(data.getDate()).padStart(2, "0");
  const mes = data
    .toLocaleString("pt-BR", { month: "short" })
    .toUpperCase()
    .replace(".", "");
  return { dia, mes };
}

function getInitials(name: string) {
  const parts = name.trim().split(" ");
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function formatTime(timeString: string) {
  if (!timeString) return "";
  return timeString.substring(0, 5).replace(":", "h");
}

function getUserColor(name: string) {
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

export function ScaleList({ events, onDelete, onEdit }: ScaleListProps) {
  if (events.length === 0) {
    return (
      <div className="text-center py-10 text-(--text-muted)">
        Nenhuma escala encontrada.
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto mt-8 flex flex-col gap-4">
      {events.map((event) => {
        const { dia, mes } = formatScaleDate(event.date);

        return (
          <article
            key={event.id}
            onClick={() => onEdit(event)}
            className="flex items-center justify-between p-5 bg-(--bg-surface) border border-(--border) rounded-2xl shadow-sm transition-hover hover:border-(--text-muted) cursor-pointer"
          >
            {/* Lado Esquerdo: Data + Infos */}
            <div className="flex items-center gap-6">
              <div className="flex flex-col items-center justify-center pr-6 border-r border-(--border) min-w-17.5">
                <span className="text-3xl font-black text-(--text-primary) leading-none">
                  {dia}
                </span>
                <span className="text-xs font-semibold text-(--text-muted) tracking-wider mt-1">
                  {mes}
                </span>
              </div>

              <div className="flex flex-col gap-1.5">
                <h3 className="text-lg font-bold text-(--text-primary)">
                  {event.name}
                </h3>

                <div className="flex items-center gap-4 text-sm text-(--text-muted) font-medium">
                  <span className="flex items-center gap-1.5">
                    <svg
                      width="14"
                      height="14"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z" />
                      <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0" />
                    </svg>
                    {formatTime(event.time)}
                  </span>

                  <span className="flex items-center gap-1.5">
                    <svg
                      width="14"
                      height="14"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.24 2.24 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.3 6.3 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5" />
                    </svg>
                    {event.scales.length} membros
                  </span>
                </div>
              </div>
            </div>

            {/* Lado Direito: Avatares*/}
            <div className="flex items-center gap-6">
              <div className="flex -space-x-2">
                {event.scales.map((member) => (
                  <div
                    key={member.user.id}
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold ring-2 ring-(--bg-surface) ${getUserColor(member.user.name)}`}
                    title={`${member.user.name} - ${member.function}`}
                  >
                    {getInitials(member.user.name)}
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation(); // <-- IMPORTANTE: Impede que o clique no botão acione um clique no "article" inteiro
                  onDelete(event.id);
                }}
                className="p-2 text-(--text-muted) hover:text-red-500 hover:bg-red-500/10 rounded-full transition-colors cursor-pointer"
                title="Excluir escala"
              >
                <svg
                  width="18"
                  height="18"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                  <path
                    fillRule="evenodd"
                    d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                  />
                </svg>
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
}
