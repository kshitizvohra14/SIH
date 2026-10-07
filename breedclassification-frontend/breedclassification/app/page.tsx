"use client";

import { useState, useRef, useCallback } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL ;

const BREED_INFO: Record<string, { type: string; origin: string; note: string }> = {
  Gir_cow:             { type: "Cow",     origin: "Gujarat",   note: "High milk yield, heat tolerant" },
  Murrah_buffalo:      { type: "Buffalo", origin: "Haryana",   note: "Highest milk-fat buffalo breed" },
  Red_Sindhi_cow:      { type: "Cow",     origin: "Sindh",     note: "Excellent for hot climates" },
  Sahiwal_cow:         { type: "Cow",     origin: "Punjab",    note: "Best dairy breed in South Asia" },
  Tharparkar_cow:      { type: "Cow",     origin: "Rajasthan", note: "Dual-purpose, drought resistant" },
  amritmahal_cow:      { type: "Cow",     origin: "Karnataka", note: "Known for stamina and endurance" },
  banni_buffalo:       { type: "Buffalo", origin: "Gujarat",   note: "Adapted to harsh Rann terrain" },
  bhadwari_buffalo:    { type: "Buffalo", origin: "UP/MP",     note: "High fat content in milk" },
  dharwadi_buffalo:    { type: "Buffalo", origin: "Karnataka", note: "Good for draught and milk" },
  jafarabadi_buffalo:  { type: "Buffalo", origin: "Gujarat",   note: "Heaviest buffalo breed in India" },
};

export default function Home() {
  const [image, setImage] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<{ label: string; confidence: number } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback((f: File) => {
    if (!f.type.startsWith("image/")) {
      setError("Please upload a valid image file.");
      return;
    }
    setFile(f);
    setResult(null);
    setError(null);
    const reader = new FileReader();
    reader.onload = (e) => setImage(e.target?.result as string);
    reader.readAsDataURL(f);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const f = e.dataTransfer.files[0];
    if (f) handleFile(f);
  }, [handleFile]);

  const handlePredict = async () => {
    if (!file) return;
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const formData = new FormData();
      formData.append("image", file);
      const res = await fetch(`${API_URL}/predict`, { method: "POST", body: formData });
      if (!res.ok) throw new Error(`Server error: ${res.status}`);
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setResult(data);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Prediction failed.");
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setImage(null);
    setFile(null);
    setResult(null);
    setError(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  const breedInfo = result ? BREED_INFO[result.label] : null;
  const displayLabel = result?.label.replace(/_/g, " ") ?? "";
  const confidencePct = result ? Math.round(result.confidence * 100) : 0;

  return (
    <main className="min-h-screen bg-[#0d1117] text-white">
      {/* Header */}
      <header className="border-b border-white/10 px-4 py-4 flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-emerald-500/20 flex items-center justify-center text-lg">🐄</div>
        <div>
          <h1 className="text-sm font-semibold leading-none">BreedScan</h1>
          <p className="text-[11px] text-white/40 mt-0.5">Indian Cattle & Buffalo Recognition</p>
        </div>
        <span className="ml-auto text-[10px] bg-white/8 px-2.5 py-1 rounded-full text-white/40 border border-white/10">SIH 2024</span>
      </header>

      <div className="max-w-lg mx-auto px-4 py-6 space-y-4">

        {/* Hero — hide once image is loaded */}
        {!image && (
          <div className="space-y-1 pb-2">
            <h2 className="text-[26px] font-bold tracking-tight leading-tight">
              Identify any<br />
              <span className="text-emerald-400">Indian breed</span> instantly
            </h2>
            <p className="text-white/50 text-sm leading-relaxed">
              Upload a photo of a cow or buffalo — our AI identifies the breed in seconds.
            </p>
          </div>
        )}

        {/* Upload Zone */}
        {!image ? (
          <>
            <div
              onClick={() => inputRef.current?.click()}
              onDrop={handleDrop}
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              className={`
                rounded-2xl border-2 border-dashed cursor-pointer transition-all duration-200
                flex flex-col items-center justify-center gap-3 py-12 px-4 text-center
                ${dragOver ? "border-emerald-400 bg-emerald-400/5" : "border-white/15 bg-white/5 hover:border-white/30 hover:bg-white/8"}
              `}
            >
              <div className="w-14 h-14 rounded-2xl bg-white/8 border border-white/10 flex items-center justify-center text-2xl">📷</div>
              <div>
                <p className="text-sm font-medium text-white/80">Tap to upload a photo</p>
                <p className="text-xs text-white/40 mt-1">or drag and drop here</p>
                <p className="text-xs text-white/25 mt-1">JPG, PNG, WEBP supported</p>
              </div>
            </div>

            <button
              onClick={() => inputRef.current?.click()}
              className="w-full py-3 rounded-xl border border-white/12 text-sm text-white/50 hover:border-white/25 hover:text-white/70 transition-all flex items-center justify-center gap-2"
            >
              📸 Take a photo with camera
            </button>
          </>
        ) : (
          /* Image Preview */
          <div className="relative rounded-2xl overflow-hidden border border-white/10 aspect-[4/3]">
            <img src={image} alt="Uploaded preview" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            <button
              onClick={reset}
              className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 border border-white/20 flex items-center justify-center text-white/80 hover:bg-black/80 text-xs transition-all"
            >✕</button>
            <p className="absolute bottom-3 left-3 text-xs text-white/60">Tap ✕ to change</p>
          </div>
        )}

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          capture="environment"
          className="hidden"
          onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
        />

        {/* Error */}
        {error && (
          <div className="rounded-xl bg-red-500/10 border border-red-500/25 px-4 py-3 text-sm text-red-400">
            ⚠ {error}
          </div>
        )}

        {/* Predict Button */}
        {file && !result && (
          <button
            onClick={handlePredict}
            disabled={loading}
            className="w-full py-4 rounded-2xl bg-emerald-500 text-black font-semibold text-base
              hover:bg-emerald-400 active:scale-[0.98] transition-all duration-150
              disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                Analyzing...
              </>
            ) : "Identify Breed →"}
          </button>
        )}

        {/* Result Card */}
        {result && (
          <div className="rounded-2xl bg-white/5 border border-white/10 overflow-hidden">
            <div className="h-1 bg-white/8">
              <div className="h-full bg-emerald-500 transition-all duration-700" style={{ width: `${confidencePct}%` }} />
            </div>
            <div className="p-5 space-y-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-[10px] text-white/35 uppercase tracking-widest mb-1">Detected Breed</p>
                  <h3 className="text-xl font-bold capitalize">{displayLabel}</h3>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium mt-1 shrink-0 ${
                  breedInfo?.type === "Buffalo"
                    ? "bg-blue-500/15 text-blue-300 border border-blue-500/20"
                    : "bg-amber-500/15 text-amber-300 border border-amber-500/20"
                }`}>
                  {breedInfo?.type ?? "Cattle"}
                </span>
              </div>

              {/* Confidence */}
              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-white/40">Confidence</span>
                  <span className="text-emerald-400 font-semibold">{confidencePct}%</span>
                </div>
                <div className="h-2 rounded-full bg-white/8 overflow-hidden">
                  <div className="h-full rounded-full bg-emerald-500 transition-all duration-700" style={{ width: `${confidencePct}%` }} />
                </div>
              </div>

              {/* Info Grid */}
              {breedInfo && (
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-white/5 rounded-xl p-3">
                    <p className="text-[10px] text-white/35 uppercase tracking-wider mb-1">Origin</p>
                    <p className="text-sm font-medium">{breedInfo.origin}</p>
                  </div>
                  <div className="bg-white/5 rounded-xl p-3">
                    <p className="text-[10px] text-white/35 uppercase tracking-wider mb-1">Type</p>
                    <p className="text-sm font-medium">{breedInfo.type}</p>
                  </div>
                  <div className="bg-white/5 rounded-xl p-3 col-span-2">
                    <p className="text-[10px] text-white/35 uppercase tracking-wider mb-1">About</p>
                    <p className="text-sm text-white/65">{breedInfo.note}</p>
                  </div>
                </div>
              )}

              <button
                onClick={reset}
                className="w-full py-3 rounded-xl border border-white/12 text-sm text-white/50 hover:border-emerald-500/40 hover:text-emerald-400 transition-all"
              >
                Try another image
              </button>
            </div>
          </div>
        )}

        {/* Supported Breeds */}
        <div className="rounded-2xl border border-white/10 p-4">
          <p className="text-[10px] text-white/35 uppercase tracking-widest mb-3">Supported Breeds</p>
          <div className="flex flex-wrap gap-2">
            {Object.keys(BREED_INFO).map((breed) => (
              <span key={breed} className="text-xs bg-white/5 border border-white/10 px-2.5 py-1 rounded-full text-white/50 capitalize">
                {breed.replace(/_/g, " ")}
              </span>
            ))}
          </div>
        </div>

      </div>

      <footer className="text-center py-6 text-xs text-white/20">
        Smart India Hackathon · MIET 2024
      </footer>
    </main>
  );
}
