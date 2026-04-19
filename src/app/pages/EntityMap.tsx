import { ChartCard } from "../components/ChartCard";
import { useAnalysis } from "../../contexts/AnalysisContext";

export function EntityMap() {
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

  // Group entities by label
  const people = data.entities.filter(e => e.label === 'PERSON').sort((a, b) => b.count - a.count);
  const places = data.entities.filter(e => e.label === 'GPE').sort((a, b) => b.count - a.count);
  const organizations = data.entities.filter(e => e.label === 'ORG').sort((a, b) => b.count - a.count);

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
          Entity map
        </h1>
        <p className="text-muted-foreground">
          Named entities extracted from your document
        </p>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <ChartCard title="People" subtitle="Individuals mentioned">
          <div className="space-y-3">
            {people.length > 0 ? (
              people.map((entity) => (
                <div
                  key={entity.text}
                  className="flex items-center justify-between p-3 bg-secondary/10 border border-secondary/20 rounded-lg"
                >
                  <span className="font-medium">{entity.text}</span>
                  <span className="text-secondary text-sm">{entity.count} mentions</span>
                </div>
              ))
            ) : (
              <p className="text-muted-foreground text-sm">No people found</p>
            )}
          </div>
        </ChartCard>

        <ChartCard title="Places" subtitle="Locations referenced">
          <div className="space-y-3">
            {places.length > 0 ? (
              places.map((entity) => (
                <div
                  key={entity.text}
                  className="flex items-center justify-between p-3 bg-primary/10 border border-primary/20 rounded-lg"
                >
                  <span className="font-medium">{entity.text}</span>
                  <span className="text-primary text-sm">{entity.count} mentions</span>
                </div>
              ))
            ) : (
              <p className="text-muted-foreground text-sm">No places found</p>
            )}
          </div>
        </ChartCard>

        <ChartCard title="Organizations" subtitle="Companies and institutions">
          <div className="space-y-3">
            {organizations.length > 0 ? (
              organizations.map((entity) => (
                <div
                  key={entity.text}
                  className="flex items-center justify-between p-3 bg-chart-5/10 border border-chart-5/20 rounded-lg"
                >
                  <span className="font-medium">{entity.text}</span>
                  <span className="text-chart-5 text-sm">{entity.count} mentions</span>
                </div>
              ))
            ) : (
              <p className="text-muted-foreground text-sm">No organizations found</p>
            )}
          </div>
        </ChartCard>
      </div>
    </div>
  );
}
