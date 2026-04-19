import { LucideIcon } from "lucide-react";
import { Link, useLocation } from "react-router";

interface SidebarNavItemProps {
  to: string;
  icon: LucideIcon;
  label: string;
}

export function SidebarNavItem({ to, icon: Icon, label }: SidebarNavItemProps) {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors relative ${
        isActive
          ? "text-primary bg-primary/10"
          : "text-muted-foreground hover:text-foreground hover:bg-muted"
      }`}
    >
      {isActive && (
        <div className="absolute left-0 top-1 bottom-1 w-1 bg-primary rounded-r-full" />
      )}
      <Icon className="w-4 h-4" />
      <span className="text-sm">{label}</span>
    </Link>
  );
}
