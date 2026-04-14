import { Outlet } from "react-router";
import { SideBar } from "./SideBar";

export function AppLayout() {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-(--bg-base) text-(--text-primary)">
      {/* SIDEBAR */}
      <aside className="hidden md:flex md:w-(--sidebar-w) shrink-0 flex-col border-r border-(--border) bg-(--bg-surface)">
        <SideBar />
      </aside>

      {/* CONTAINER PRINCIPAL */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* HEADER */}
        <header className="h-(--topbar-h) flex items-center justify-between px-6 border-b border-(--border) bg-(--bg-base)">
          <div className="md:hidden">{/* Menu Mobile aqui */}</div>
        </header>

        {/* ÁREA DE CONTEÚDO */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-10 custom-scrollbar">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>

        {/* BOTTOM NAVIGATION */}
        <nav className="md:hidden h-(--bottom-nav-h) bg-(--bg-surface) border-t border-(--border) flex items-center justify-around px-4">
          <button className="text-(--accent) text-xs flex flex-col items-center">
            <span>Home</span>
          </button>
          <button className="text-(--text-secondary) text-xs flex flex-col items-center">
            <span>Músicas</span>
          </button>
        </nav>
      </div>
    </div>
  );
}
