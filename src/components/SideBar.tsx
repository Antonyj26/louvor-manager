import { NavLink } from "react-router-dom";
import { useSidebar } from "../hooks/useSidebar";
import { sideBarLinks } from "../utils/sideBarLinks";

const getNavLinkClass = ({
  isActive,
  isOpen,
}: {
  isActive: boolean;
  isOpen: boolean;
}) =>
  `flex items-center gap-3 p-2 rounded-md transition-colors cursor-pointer
  ${isOpen ? "" : "justify-center"}
  ${
    isActive
      ? "bg-(--accent-bg) text-(--accent)"
      : "text-(--text-secondary) hover:bg-(--bg-hover)"
  }
`;

export function SideBar() {
  const { isOpen, toggle } = useSidebar();

  return (
    <nav
      className={`flex flex-col gap-8 p-4 transition-all duration-300 ${
        isOpen ? "p-6" : "items-center"
      }`}
    >
      <button
        type="button"
        onClick={toggle}
        aria-label={isOpen ? "Fechar sidebar" : "Abrir sidebar"}
        title={isOpen ? "Fechar sidebar" : "Abrir sidebar"}
        className={`flex items-center rounded-md p-2 text-(--text-secondary) transition-colors hover:bg-(--bg-hover) cursor-pointer ${
          isOpen ? "self-end" : "self-center"
        }`}
      >
        <span className="text-lg leading-none">{isOpen ? "◀" : "▶"}</span>
      </button>

      <div className={isOpen ? "w-full" : "w-full flex flex-col items-center"}>
        {isOpen && (
          <p className="text-(--text-muted) text-xs font-bold uppercase tracking-wider mb-4">
            Principal
          </p>
        )}
        <ul className="flex flex-col gap-2">
          {sideBarLinks.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                title={link.label}
                className={({ isActive }) =>
                  getNavLinkClass({ isActive, isOpen })
                }
              >
                <span className="text-lg shrink-0">{link.icon}</span>
                {isOpen && <span>{link.label}</span>}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
