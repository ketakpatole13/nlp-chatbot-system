import { MetricCards } from "../components/MetricCards";
import { ChartCard } from "../components/ChartCard";
import { EmotionArcChart } from "../components/EmotionArcChart";
import { EmotionDonut } from "../components/EmotionDonut";
import { SentimentTimeline } from "../components/SentimentTimeline";
import { useAnalysis } from "../../contexts/AnalysisContext";

export function Overview() {
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

  return (
    <div className="p-6 space-y-6">
      {/* Metric cards */}
      <MetricCards metadata={data.metadata} />

      {/* Emotion Arc Chart */}
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-8">
          <ChartCard
            title="Emotion arc"
            subtitle="Emotional intensity across the document"
          >
            <EmotionArcChart data={data.emotion_arc} />
          </ChartCard>
        </div>

        {/* Emotion Distribution */}
        <div className="col-span-4">
          <ChartCard title="Emotion distribution" subtitle="Percentage breakdown">
            <EmotionDonut data={data.emotion_distribution} />
          </ChartCard>
        </div>
      </div>

      {/* Sentiment Timeline and Keywords */}
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-8">
          <ChartCard
            title="Sentiment timeline"
            subtitle="Positive vs negative sentiment across the document"
          >
            <SentimentTimeline data={data.sentiment_timeline} />
          </ChartCard>
        </div>

        <div className="col-span-4">
          <ChartCard title="Top keywords" subtitle="TF-IDF weighted terms">
            <div className="space-y-3">
              {data.keywords.slice(0, 10).map((keyword) => (
                <div key={keyword.word} className="flex items-center justify-between">
                  <span className="text-sm">{keyword.word}</span>
                  <span className="text-xs text-muted-foreground">{keyword.score.toFixed(3)}</span>
                </div>
              ))}
            </div>
          </ChartCard>
        </div>
      </div>
    </div>
  );
}
