import { MetricCard } from "./MetricCard";

interface Metadata {
  filename: string;
  total_sentences: number;
  total_words: number;
  unique_words: number;
  dominant_emotion: string;
}

interface MetricCardsProps {
  metadata: Metadata;
}

export function MetricCards({ metadata }: MetricCardsProps) {
  return (
    <div className="grid grid-cols-4 gap-6">
      <MetricCard label="Total sentences" value={metadata.total_sentences} trend="up" />
      <MetricCard label="Unique words" value={metadata.unique_words} trend="up" />
      <MetricCard label="Readability score" value={Math.round(metadata.total_sentences / metadata.total_words * 100) || 0} trend="neutral" />
      <MetricCard label="Dominant emotion" value={metadata.dominant_emotion} />
    </div>
  );
}