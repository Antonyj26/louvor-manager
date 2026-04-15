import { NavLink } from "react-router-dom";
import { sideBarLinks } from "../utils/sideBarLinks";

const getNavLinkClass = ({
  isActive,
}: {
  isActive: boolean;
}) => `flex items-center gap-3 p-2 rounded-md transition-colors cursor-pointer
  ${
    isActive
      ? "bg-(--accent-bg) text-(--accent)"
      : "text-(--text-secondary) hover:bg-(--bg-hover)"
  }
`;

export function SideBar() {
  return (
    <nav className="flex flex-col gap-8 p-6">
      <div>
        <p className="text-(--text-muted) text-xs font-bold uppercase tracking-wider mb-4">
          Principal
        </p>
        <ul className="flex flex-col gap-2">
          {sideBarLinks.map((link) => (
            <li key={link.to}>
              <NavLink to={link.to} className={getNavLinkClass}>
                <span className="text-lg">{link.icon}</span>
                <span>{link.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
