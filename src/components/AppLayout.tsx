import { Outlet } from "react-router";
import { SidebarProvider } from "../context/SidebarContext";
import { useSidebar } from "../hooks/useSidebar";
import { SideBar } from "./SideBar";

function AppLayoutContent() {
  const { isOpen } = useSidebar();

  return (
    <div className="flex h-screen w-full overflow-hidden bg-(--bg-base) text-(--text-primary)">
      <aside
        className={`hidden md:flex shrink-0 flex-col border-r border-(--border) bg-(--bg-surface) transition-all duration-300 overflow-hidden ${
          isOpen ? "w-(--sidebar-w)" : "w-(--sidebar-w-collapsed)"
        }`}
      >
        <SideBar />
      </aside>

      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="h-(--topbar-h) flex items-center justify-between px-6 border-b border-(--border) bg-(--bg-base)">
          <div className="md:hidden">{/* Menu Mobile aqui */}</div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-10 custom-scrollbar">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>

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

export function AppLayout() {
  return (
    <SidebarProvider>
      <AppLayoutContent />
    </SidebarProvider>
  );
}
