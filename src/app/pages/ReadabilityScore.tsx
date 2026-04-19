import { ChartCard } from "../components/ChartCard";
import { MetricCard } from "../components/MetricCard";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { useAnalysis } from "../../contexts/AnalysisContext";

export function ReadabilityScore() {
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

  const readabilityMetrics = [
    { name: "Flesch Reading Ease", value: Math.round(data.readability.flesch_reading_ease), color: "#06B6D4" },
    { name: "Flesch-Kincaid Grade", value: Math.round(data.readability.flesch_kincaid_grade * 10), color: "#7C3AED" },
    { name: "Gunning Fog", value: Math.round(data.readability.gunning_fog * 10), color: "#3B82F6" },
    { name: "Avg Sentence Length", value: Math.round(data.readability.avg_sentence_length), color: "#A855F7" },
    { name: "Avg Word Length", value: Math.round(data.readability.avg_word_length * 10), color: "#F59E0B" },
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
          Readability score
        </h1>
        <p className="text-muted-foreground">
          Comprehensive readability assessment across multiple metrics
        </p>
      </div>

      <div className="grid grid-cols-4 gap-6">
        <MetricCard label="Overall readability" value={Math.round(data.readability.flesch_reading_ease)} trend="up" />
        <MetricCard label="Grade level" value={Math.round(data.readability.flesch_kincaid_grade)} />
        <MetricCard label="Avg sentence length" value={`${Math.round(data.readability.avg_sentence_length)} words`} />
        <MetricCard label="Avg word length" value={data.readability.avg_word_length.toFixed(1)} />
      </div>

      <ChartCard title="Readability metrics comparison" subtitle="Multiple readability formulas applied">
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={readabilityMetrics}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
            <XAxis dataKey="name" stroke="#9CA3AF" tick={{ fontSize: 11 }} angle={-15} textAnchor="end" height={80} />
            <YAxis stroke="#9CA3AF" tick={{ fontSize: 12 }} domain={[0, 100]} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#161B22',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '8px',
              }}
            />
            <Bar dataKey="value" radius={[8, 8, 0, 0]}>
              {readabilityMetrics.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      <div className="grid grid-cols-2 gap-6">
        <ChartCard title="Reading ease interpretation" subtitle="What the score means">
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-secondary/10 border border-secondary/20 rounded-lg">
              <span className="text-sm">Flesch Reading Ease</span>
              <span className="font-medium text-secondary">{data.readability.flesch_reading_ease.toFixed(1)}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-primary/10 border border-primary/20 rounded-lg">
              <span className="text-sm">Flesch-Kincaid Grade</span>
              <span className="font-medium text-primary">{data.readability.flesch_kincaid_grade.toFixed(1)}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-chart-5/10 border border-chart-5/20 rounded-lg">
              <span className="text-sm">Gunning Fog Index</span>
              <span className="font-medium text-chart-5">{data.readability.gunning_fog.toFixed(1)}</span>
            </div>
          </div>
        </ChartCard>

        <ChartCard title="Recommendations" subtitle="Improve readability">
          <div className="space-y-3 text-sm text-muted-foreground">
            <div className="p-3 bg-muted/30 rounded-lg">
              • Consider shortening sentences averaging over 25 words
            </div>
            <div className="p-3 bg-muted/30 rounded-lg">
              • Replace complex words with simpler alternatives where possible
            </div>
            <div className="p-3 bg-muted/30 rounded-lg">
              • Break down long paragraphs into smaller chunks
            </div>
            <div className="p-3 bg-muted/30 rounded-lg">
              • Use active voice instead of passive voice when appropriate
            </div>
          </div>
        </ChartCard>
      </div>
    </div>
  );
}
