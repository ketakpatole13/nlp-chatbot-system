import { createBrowserRouter } from "react-router";
import { Landing } from "./pages/Landing";
import { Dashboard } from "./pages/Dashboard";
import { Overview } from "./pages/Overview";
import { EmotionAnalysis } from "./pages/EmotionAnalysis";
import { VocabularyProfile } from "./pages/VocabularyProfile";
import { SentimentTimeline } from "./pages/SentimentTimeline";
import { ReadabilityScore } from "./pages/ReadabilityScore";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Landing,
  },
  {
    path: "/dashboard",
    Component: Dashboard,
    children: [
      {
        index: true,
        Component: Overview,
      },
      {
        path: "overview",
        Component: Overview,
      },
      {
        path: "emotion",
        Component: EmotionAnalysis,
      },
      {
        path: "vocabulary",
        Component: VocabularyProfile,
      },
      {
        path: "sentiment",
        Component: SentimentTimeline,
      },
      {
        path: "readability",
        Component: ReadabilityScore,
      },
    ],
  },
]);
