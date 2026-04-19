import { Outlet, useNavigate } from "react-router";
import { Logo } from "../components/Logo";
import { SidebarNavItem } from "../components/SidebarNavItem";
import {
  LayoutDashboard,
  Heart,
  BookText,
  TrendingUp,
  Gauge,
  FileText,
} from "lucide-react";
import { useAnalysis } from "../../contexts/AnalysisContext";

export function Dashboard() {
  const navigate = useNavigate();
  const { data } = useAnalysis();

  const navItems = [
    { to: "/dashboard/overview", icon: LayoutDashboard, label: "Overview" },
    { to: "/dashboard/emotion", icon: Heart, label: "Emotion analysis" },
    { to: "/dashboard/vocabulary", icon: BookText, label: "Vocabulary profile" },
    { to: "/dashboard/sentiment", icon: TrendingUp, label: "Sentiment timeline" },
    { to: "/dashboard/readability", icon: Gauge, label: "Readability score" },
  ];

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-60 border-r border-border bg-sidebar flex flex-col">
        <div className="p-6 border-b border-border">
          <Logo />
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <SidebarNavItem key={item.to} {...item} />
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Top navbar */}
        <header className="h-16 border-b border-border bg-card px-6 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <FileText className="w-4 h-4" />
            <span>{data?.metadata.filename || "No document loaded"}</span>
          </div>
          <button
            onClick={() => navigate("/")}
            className="px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg transition-colors"
          >
            New analysis
          </button>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
