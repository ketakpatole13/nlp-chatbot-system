import { LucideIcon, TrendingUp, TrendingDown, Minus } from "lucide-react";

interface MetricCardProps {
  label: string;
  value: string | number;
  trend?: "up" | "down" | "neutral";
  icon?: LucideIcon;
}

export function MetricCard({ label, value, trend, icon: Icon }: MetricCardProps) {
  const TrendIcon = trend === "up" ? TrendingUp : trend === "down" ? TrendingDown : Minus;
  const trendColor = trend === "up" ? "text-secondary" : trend === "down" ? "text-destructive" : "text-muted-foreground";

  return (
    <div className="bg-card border border-border rounded-xl p-5">
      <div className="flex items-start justify-between mb-3">
        <div className="text-sm text-muted-foreground">{label}</div>
        {trend && <TrendIcon className={`w-4 h-4 ${trendColor}`} />}
      </div>
      <div className="flex items-end gap-3">
        <div className="text-4xl font-semibold" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
          {value}
        </div>
        {Icon && <Icon className="w-5 h-5 text-primary mb-1" />}
      </div>
    </div>
  );
}
