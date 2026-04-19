import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface EmotionArcData {
  sentence_index: number;
  sentence: string;
  emotion: string;
  score: number;
}

interface EmotionArcChartProps {
  data: EmotionArcData[];
}

export function EmotionArcChart({ data }: EmotionArcChartProps) {
  // Transform data for the chart: group by emotion
  const emotions = ["joy", "sadness", "anger", "fear", "surprise", "disgust"];
  const colorMap = {
    joy: "#06B6D4",
    sadness: "#3B82F6",
    anger: "#EF4444",
    fear: "#8B5CF6",
    surprise: "#F59E0B",
    disgust: "#10B981",
  };

  // Create data points for each sentence
  const chartData = data.map((item) => ({
    sentence: item.sentence_index,
    [item.emotion]: item.score,
    sentence_text: item.sentence,
  }));

  return (
    <ResponsiveContainer width="100%" height={280}>
      <LineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
        <XAxis
          dataKey="sentence"
          stroke="#9CA3AF"
          tick={{ fontSize: 12 }}
          label={{ value: 'Sentence number', position: 'insideBottom', offset: -5, fill: '#9CA3AF' }}
        />
        <YAxis
          stroke="#9CA3AF"
          tick={{ fontSize: 12 }}
          label={{ value: 'Intensity', angle: -90, position: 'insideLeft', fill: '#9CA3AF' }}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: '#161B22',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '8px',
          }}
          formatter={(value, name) => [value, name]}
          labelFormatter={(label) => `Sentence ${label}`}
        />
        {emotions.map((emotion) => (
          <Line
            key={emotion}
            type="monotone"
            dataKey={emotion}
            stroke={colorMap[emotion as keyof typeof colorMap]}
            strokeWidth={2}
            dot={false}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}