import { ChartCard } from "../components/ChartCard";
import { EmotionArcChart } from "../components/EmotionArcChart";
import { EmotionDonut } from "../components/EmotionDonut";
import { useAnalysis } from "../../contexts/AnalysisContext";

export function EmotionAnalysis() {
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
      <div>
        <h1 className="text-2xl font-semibold mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
          Emotion analysis
        </h1>
        <p className="text-muted-foreground">
          Deep dive into emotional patterns and intensity across your document
        </p>
      </div>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-8">
          <ChartCard title="Emotion intensity over time" subtitle="Track emotional changes sentence by sentence">
            <EmotionArcChart data={data.emotion_arc} />
          </ChartCard>
        </div>
        <div className="col-span-4">
          <ChartCard title="Emotion distribution" subtitle="Overall emotional breakdown">
            <EmotionDonut data={data.emotion_distribution} />
          </ChartCard>
        </div>
      </div>
    </div>
  );
}
