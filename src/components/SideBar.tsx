export function SideBar() {
  return (
    <nav className="flex flex-col gap-8 p-6">
      <div>
        <p className="text-(--text-muted) text-xs font-bold uppercase tracking-wider mb-4">
          Principal
        </p>
        <ul className="flex flex-col gap-2">
          <li className="text-(--accent) bg-(--accent-bg) p-2 rounded-md">
            ⊞ Dashboard
          </li>
          <li className="text-(--text-secondary) hover:bg-(--bg-hover) p-2 rounded-md cursor-pointer">
            Escalas do Mês
          </li>
        </ul>
      </div>
    </nav>
  );
}
