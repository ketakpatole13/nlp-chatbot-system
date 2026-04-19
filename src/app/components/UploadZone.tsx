import { Upload, Loader2 } from "lucide-react";
import { useState } from "react";

interface UploadZoneProps {
  onFileSelect: (file: File) => void;
  loading?: boolean;
}

export function UploadZone({ onFileSelect, loading = false }: UploadZoneProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && !loading) onFileSelect(file);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && !loading) onFileSelect(file);
  };

  return (
    <div
      className={`relative border-2 border-dashed rounded-2xl p-16 text-center transition-all ${
        isDragging
          ? "border-primary bg-primary/5 shadow-lg shadow-primary/20"
          : "border-border bg-card/50"
      } ${loading ? "opacity-50 pointer-events-none" : ""}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="flex flex-col items-center gap-6">
        <div className={`p-6 rounded-full ${isDragging ? "bg-primary/20" : "bg-primary/10"}`}>
          {loading ? (
            <Loader2 className="w-12 h-12 text-primary animate-spin" />
          ) : (
            <Upload className={`w-12 h-12 ${isDragging ? "text-primary" : "text-primary/70"}`} />
          )}
        </div>
        <div>
          <p className="text-xl mb-2">
            {loading ? "Analyzing your document..." : "Drop your PDF, DOCX, or TXT file"}
          </p>
          <p className="text-sm text-muted-foreground">
            {loading ? "This may take a few moments" : "or click to browse from your computer"}
          </p>
        </div>
        {!loading && (
          <label htmlFor="file-input">
            <div className="px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg cursor-pointer transition-colors">
              Browse files
            </div>
            <input
              id="file-input"
              type="file"
              accept=".pdf,.docx,.txt"
              className="hidden"
              onChange={handleFileInput}
            />
          </label>
        )}
      </div>
    </div>
  );
}
