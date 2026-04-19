import { ChartCard } from "../components/ChartCard";
import { MetricCard } from "../components/MetricCard";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useAnalysis } from "../../contexts/AnalysisContext";

export function SentimentTimeline() {
  const { data, loading, error } = useAnalysis();

  if (loading) {
    return <div className="p-6">Loading analysis...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-500">Error: {error}</div>;
  }

  if (!data) {
    return <div className="p-6">No data available. Please upload a document.</div>;
  }

  // Calculate sentiment ratios
  const avgPositive = data.sentiment_timeline.reduce((sum, s) => sum + s.positive, 0) / data.sentiment_timeline.length;
  const avgNegative = data.sentiment_timeline.reduce((sum, s) => sum + s.negative, 0) / data.sentiment_timeline.length;
  const overallPositive = avgPositive > avgNegative;

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
          Sentiment timeline
        </h1>
        <p className="text-muted-foreground">
          Track sentiment changes throughout the document
        </p>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <MetricCard label="Overall sentiment" value={overallPositive ? "Positive" : "Negative"} />
        <MetricCard label="Positive ratio" value={`${Math.round(avgPositive * 100)}%`} trend="up" />
        <MetricCard label="Negative ratio" value={`${Math.round(avgNegative * 100)}%`} trend="down" />
      </div>

      <ChartCard title="Sentiment progression" subtitle="Positive vs negative sentiment over time">
        <ResponsiveContainer width="100%" height={400}>
          <AreaChart data={data.sentiment_timeline}>
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
            <Legend />
            <Area
              type="monotone"
              dataKey="positive"
              stroke="#7C3AED"
              fill="#7C3AED"
              fillOpacity={0.3}
            />
            <Area
              type="monotone"
              dataKey="negative"
              stroke="#EF4444"
              fill="#EF4444"
              fillOpacity={0.3}
            />
          </AreaChart>
        </ResponsiveContainer>
      </ChartCard>
    </div>
  );
}
