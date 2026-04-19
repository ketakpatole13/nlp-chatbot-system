// Mock data for charts and visualizations

export const emotionArcData = Array.from({ length: 50 }, (_, i) => ({
  sentence: i + 1,
  joy: Math.random() * 0.8 + 0.1,
  sadness: Math.random() * 0.6 + 0.05,
  anger: Math.random() * 0.4 + 0.05,
  fear: Math.random() * 0.5 + 0.05,
}));

export const emotionDistribution = [
  { name: "Joy", value: 35, color: "#06B6D4" },
  { name: "Sadness", value: 25, color: "#3B82F6" },
  { name: "Anger", value: 15, color: "#EF4444" },
  { name: "Fear", value: 20, color: "#A855F7" },
  { name: "Neutral", value: 5, color: "#9CA3AF" },
];

export const sentimentTimelineData = Array.from({ length: 40 }, (_, i) => ({
  sentence: i + 1,
  positive: Math.random() * 0.8 + 0.1,
  negative: Math.random() * 0.5 + 0.05,
}));

export const posDistribution = [
  { name: "Nouns", value: 450, color: "#7C3AED" },
  { name: "Verbs", value: 320, color: "#06B6D4" },
  { name: "Adjectives", value: 180, color: "#3B82F6" },
  { name: "Adverbs", value: 120, color: "#A855F7" },
  { name: "Pronouns", value: 90, color: "#F59E0B" },
];

export const vocabularyRadarData = [
  { category: "Lexical Diversity", value: 85 },
  { category: "Rare Words", value: 72 },
  { category: "Avg Sentence Length", value: 65 },
  { category: "Readability", value: 78 },
  { category: "Complexity", value: 68 },
];

export const topKeywords = [
  { keyword: "analysis", count: 42 },
  { keyword: "document", count: 38 },
  { keyword: "data", count: 35 },
  { keyword: "research", count: 31 },
  { keyword: "methodology", count: 28 },
  { keyword: "results", count: 26 },
  { keyword: "framework", count: 24 },
  { keyword: "approach", count: 22 },
  { keyword: "system", count: 20 },
  { keyword: "evaluation", count: 19 },
  { keyword: "performance", count: 18 },
  { keyword: "implementation", count: 17 },
  { keyword: "validation", count: 16 },
  { keyword: "metrics", count: 15 },
  { keyword: "patterns", count: 14 },
  { keyword: "intelligence", count: 13 },
  { keyword: "processing", count: 12 },
  { keyword: "algorithm", count: 11 },
  { keyword: "optimization", count: 10 },
  { keyword: "integration", count: 9 },
];

export const entities = {
  people: [
    { name: "Dr. Sarah Chen", count: 12 },
    { name: "Prof. James Miller", count: 8 },
    { name: "Michael Roberts", count: 6 },
  ],
  places: [
    { name: "Stanford University", count: 15 },
    { name: "New York", count: 9 },
    { name: "London", count: 7 },
  ],
  organizations: [
    { name: "OpenAI", count: 18 },
    { name: "MIT", count: 14 },
    { name: "Google Research", count: 11 },
  ],
};
