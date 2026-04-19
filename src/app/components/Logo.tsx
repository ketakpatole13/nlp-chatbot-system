import { Dna } from "lucide-react";

export function Logo() {
  return (
    <div className="flex items-center gap-2">
      <Dna className="w-6 h-6 text-primary" />
      <span className="text-xl font-semibold" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
        TextForensics
      </span>
    </div>
  );
}
