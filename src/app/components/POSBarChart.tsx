import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface POSBarChartProps {
  data: Record<string, number>;
}

export function POSBarChart({ data }: POSBarChartProps) {
  const posTags = ["NOUN", "VERB", "ADJ", "ADV", "PRON", "DET", "OTHER"];
  const colorMap = {
    NOUN: "#06B6D4",
    VERB: "#3B82F6",
    ADJ: "#EF4444",
    ADV: "#8B5CF6",
    PRON: "#F59E0B",
    DET: "#10B981",
    OTHER: "#6B7280",
  };

  const chartData = posTags.map((tag) => ({
    name: tag,
    value: data[tag] || 0,
    color: colorMap[tag as keyof typeof colorMap],
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={chartData} layout="horizontal">
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
        <XAxis type="number" stroke="#9CA3AF" tick={{ fontSize: 12 }} />
        <YAxis dataKey="name" type="category" stroke="#9CA3AF" tick={{ fontSize: 12 }} />
        <Tooltip
          contentStyle={{
            backgroundColor: '#161B22',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '8px',
          }}
        />
        <Bar dataKey="value" radius={[0, 8, 8, 0]}>
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}