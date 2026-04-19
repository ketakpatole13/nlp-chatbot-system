import React, { createContext, useContext, useState, ReactNode } from 'react';
import { analyzeDocument } from '../api';

interface AnalysisData {
  metadata: {
    filename: string;
    total_sentences: number;
    total_words: number;
    unique_words: number;
    dominant_emotion: string;
  };
  emotion_arc: Array<{
    sentence_index: number;
    sentence: string;
    emotion: string;
    score: number;
  }>;
  emotion_distribution: Record<string, number>;
  sentiment_timeline: Array<{
    sentence_index: number;
    positive: number;
    negative: number;
    neutral: number;
    compound: number;
  }>;
  entities: Array<{
    text: string;
    label: string;
    count: number;
  }>;
  entity_cooccurrence: Array<{
    source: string;
    target: string;
    weight: number;
  }>;
  pos_distribution: Record<string, number>;
  keywords: Array<{
    word: string;
    score: number;
  }>;
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

interface AnalysisContextType {
  data: AnalysisData | null;
  loading: boolean;
  error: string | null;
  analyzeFile: (file: File) => Promise<void>;
}

const AnalysisContext = createContext<AnalysisContextType | undefined>(undefined);

export function AnalysisProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<AnalysisData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const analyzeFile = async (file: File) => {
    setLoading(true);
    setError(null);
    try {
      const result = await analyzeDocument(file);
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnalysisContext.Provider value={{ data, loading, error, analyzeFile }}>
      {children}
    </AnalysisContext.Provider>
  );
}

export function useAnalysis() {
  const context = useContext(AnalysisContext);
  if (context === undefined) {
    throw new Error('useAnalysis must be used within an AnalysisProvider');
  }
  return context;
}