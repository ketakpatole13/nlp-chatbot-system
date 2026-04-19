import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";

interface VocabRadarProps {
  readability: {
    flesch_reading_ease: number;
    flesch_kincaid_grade: number;
    gunning_fog: number;
    avg_sentence_length: number;
    avg_word_length: number;
  };
  lexical_diversity: {
    ttr: number;
    unique_words: number;
    total_words: number;
    rare_word_count: number;
  };
}

export function VocabRadar({ readability, lexical_diversity }: VocabRadarProps) {
  // Normalize values to 0-100 scale
  const normalize = (value: number, min: number, max: number) => {
    return ((value - min) / (max - min)) * 100;
  };

  const data = [
    {
      axis: "Lexical Diversity",
      value: normalize(lexical_diversity.ttr, 0, 1) * 100, // TTR as percentage
    },
    {
      axis: "Readability",
      value: normalize(readability.flesch_reading_ease, 0, 100), // Flesch is already 0-100
    },
    {
      axis: "Complexity",
      value: normalize(readability.gunning_fog, 0, 20), // Gunning Fog typically 0-20
    },
    {
      axis: "Rare Words",
      value: normalize(lexical_diversity.rare_word_count, 0, lexical_diversity.total_words),
    },
    {
      axis: "Avg Length",
      value: normalize(readability.avg_word_length, 0, 10), // Avg word length
    },
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <RadarChart data={data}>
        <PolarGrid stroke="rgba(255,255,255,0.05)" />
        <PolarAngleAxis
          dataKey="axis"
          tick={{ fill: '#9CA3AF', fontSize: 12 }}
        />
        <PolarRadiusAxis
          angle={90}
          domain={[0, 100]}
          tick={{ fill: '#9CA3AF', fontSize: 10 }}
        />
        <Radar
          name="Score"
          dataKey="value"
          stroke="#06B6D4"
          fill="#06B6D4"
          fillOpacity={0.3}
          strokeWidth={2}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
}