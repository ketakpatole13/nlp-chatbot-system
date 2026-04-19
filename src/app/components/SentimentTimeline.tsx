import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface SentimentData {
  sentence_index: number;
  positive: number;
  negative: number;
  neutral: number;
  compound: number;
}

interface SentimentTimelineProps {
  data: SentimentData[];
}

export function SentimentTimeline({ data }: SentimentTimelineProps) {
  // Transform data for stacked area
  const chartData = data.map((item) => ({
    sentence: item.sentence_index,
    positive: item.positive,
    negative: item.negative,
  }));

  return (
    <ResponsiveContainer width="100%" height={240}>
      <AreaChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
        <XAxis dataKey="sentence" stroke="#9CA3AF" tick={{ fontSize: 12 }} />
        <YAxis stroke="#9CA3AF" tick={{ fontSize: 12 }} />
        <Tooltip
          contentStyle={{
            backgroundColor: '#161B22',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '8px',
          }}
        />
        <Area
          type="monotone"
          dataKey="positive"
          stackId="1"
          stroke="#7C3AED"
          fill="#7C3AED"
        />
        <Area
          type="monotone"
          dataKey="negative"
          stackId="1"
          stroke="#EF4444"
          fill="#EF4444"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}