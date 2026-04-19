import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

interface EmotionDonutProps {
  data: Record<string, number>;
}

export function EmotionDonut({ data }: EmotionDonutProps) {
  const emotions = ["joy", "sadness", "anger", "fear", "surprise", "disgust"];
  const colorMap = {
    joy: "#06B6D4",
    sadness: "#3B82F6",
    anger: "#EF4444",
    fear: "#8B5CF6",
    surprise: "#F59E0B",
    disgust: "#10B981",
  };

  const chartData = emotions.map((emotion) => ({
    name: emotion,
    value: data[emotion] || 0,
    color: colorMap[emotion as keyof typeof colorMap],
  }));

  return (
    <>
      <ResponsiveContainer width="100%" height={280}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={90}
            paddingAngle={2}
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: '#161B22',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '8px',
            }}
          />
        </PieChart>
      </ResponsiveContainer>
      <div className="mt-4 space-y-2">
        {chartData.map((emotion) => (
          <div key={emotion.name} className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: emotion.color }} />
              <span className="text-muted-foreground">{emotion.name}</span>
            </div>
            <span className="font-medium">{emotion.value.toFixed(1)}%</span>
          </div>
        ))}
      </div>
    </>
  );
}