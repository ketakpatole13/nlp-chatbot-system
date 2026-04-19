interface Keyword {
  word: string;
  score: number;
}

interface KeywordsCloudProps {
  data: Keyword[];
}

export function KeywordsCloud({ data }: KeywordsCloudProps) {
  // Sort by score descending
  const sortedKeywords = [...data].sort((a, b) => b.score - a.score);

  // Scale font size based on score
  const maxScore = Math.max(...data.map(k => k.score));
  const minScore = Math.min(...data.map(k => k.score));
  const scale = (score: number) => {
    if (maxScore === minScore) return 14;
    return 12 + ((score - minScore) / (maxScore - minScore)) * 16; // 12 to 28
  };

  return (
    <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto">
      {sortedKeywords.map((keyword) => (
        <span
          key={keyword.word}
          className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm border border-primary/20"
          style={{ fontSize: `${scale(keyword.score)}px` }}
        >
          {keyword.word}
        </span>
      ))}
    </div>
  );
}