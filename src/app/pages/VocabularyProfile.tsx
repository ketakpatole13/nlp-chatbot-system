import { ChartCard } from "../components/ChartCard";
import { MetricCard } from "../components/MetricCard";
import { KeywordPill } from "../components/KeywordPill";
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from "recharts";
import { useAnalysis } from "../../contexts/AnalysisContext";

export function VocabularyProfile() {
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

  // Prepare radar data
  const radarData = [
    { axis: "Lexical Diversity", value: Math.round(data.lexical_diversity.ttr * 100) },
    { axis: "Readability", value: Math.round(data.readability.flesch_reading_ease) },
    { axis: "Complexity", value: Math.round(data.readability.gunning_fog * 5) },
    { axis: "Rare Words", value: Math.round((data.lexical_diversity.rare_word_count / data.lexical_diversity.total_words) * 100) },
    { axis: "Avg Length", value: Math.round(data.readability.avg_word_length * 10) },
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
          Vocabulary profile
        </h1>
        <p className="text-muted-foreground">
          Analyze lexical diversity and writing complexity
        </p>
      </div>

      <div className="grid grid-cols-4 gap-6">
        <MetricCard label="Lexical diversity" value={`${Math.round(data.lexical_diversity.ttr * 100)}%`} trend="up" />
        <MetricCard label="Avg word length" value={data.readability.avg_word_length.toFixed(1)} />
        <MetricCard label="Unique words" value={data.lexical_diversity.unique_words} />
        <MetricCard label="Vocabulary size" value={data.metadata.total_words} trend="up" />
      </div>

      <div className="grid grid-cols-2 gap-6">
        <ChartCard title="Vocabulary richness radar" subtitle="Multi-dimensional lexical analysis">
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="rgba(255,255,255,0.1)" />
              <PolarAngleAxis dataKey="category" stroke="#9CA3AF" tick={{ fontSize: 11 }} />
              <PolarRadiusAxis stroke="#9CA3AF" tick={{ fontSize: 11 }} />
              <Radar
                dataKey="value"
                stroke="#7C3AED"
                fill="#7C3AED"
                fillOpacity={0.3}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#161B22',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '8px',
                }}
              />
            </RadarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Top keywords" subtitle="Most frequently used terms">
          <div className="flex flex-wrap gap-3 max-h-[300px] overflow-y-auto">
            {data.keywords.slice(0, 12).map((item) => (
              <KeywordPill key={item.word} keyword={item.word} count={Math.round(item.score * 100)} />
            ))}
          </div>
        </ChartCard>
      </div>
    </div>
  );
}
