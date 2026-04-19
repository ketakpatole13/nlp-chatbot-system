import { useNavigate } from "react-router";
import { Logo } from "../components/Logo";
import { UploadZone } from "../components/UploadZone";
import { Brain, Users, Fingerprint } from "lucide-react";
import { useAnalysis } from "../../contexts/AnalysisContext";

export function Landing() {
  const navigate = useNavigate();
  const { analyzeFile, loading } = useAnalysis();

  const handleFileSelect = async (file: File) => {
    await analyzeFile(file);
    navigate("/dashboard/overview");
  };

  const features = [
    {
      icon: Brain,
      title: "Emotion analysis",
      description: "Detect emotional patterns throughout your document",
    },
    {
      icon: Users,
      title: "Entity detection",
      description: "Identify people, places, and organizations",
    },
    {
      icon: Fingerprint,
      title: "Linguistic fingerprint",
      description: "Analyze writing style and vocabulary patterns",
    },
  ];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(124, 58, 237, 0.15) 1px, transparent 1px)`,
          backgroundSize: '32px 32px',
        }}
      />

      <div className="relative z-10">
        {/* Header */}
        <header className="px-8 py-6">
          <Logo />
        </header>

        {/* Main content */}
        <main className="container mx-auto px-8 pt-20 pb-16 max-w-5xl">
          <div className="mb-16">
            <UploadZone onFileSelect={handleFileSelect} loading={loading} />
          </div>

          {/* Feature cards */}
          <div className="grid grid-cols-3 gap-6">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="bg-card border border-border rounded-xl p-6 hover:border-primary/30 transition-colors"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <feature.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-base font-medium">{feature.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
