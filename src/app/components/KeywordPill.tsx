interface KeywordPillProps {
  keyword: string;
  count: number;
}

export function KeywordPill({ keyword, count }: KeywordPillProps) {
  return (
    <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full">
      <span className="text-sm text-foreground">{keyword}</span>
      <span className="text-xs text-primary font-medium">{count}</span>
    </div>
  );
}
