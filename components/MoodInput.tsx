"use client";

import { useMemo, useState, useRef, useEffect } from "react";
import { Loader2, Send, WandSparkles } from "lucide-react";
import { motion } from "framer-motion";
import { moodPresets } from "@/lib/data/drinks";
import type { DrinkRecommendation } from "@/lib/types";
import { DrinkRecipeCard } from "@/components/DrinkRecipeCard";

type RecommendationResponse = {
  detectedTags: string[];
  recommendations: DrinkRecommendation[];
};

export function MoodInput({ compact = false }: { compact?: boolean }) {
  const [moodText, setMoodText] = useState("");
  const [tags, setTags] = useState<string[]>(["放松", "清爽"]);
  const [result, setResult] = useState<RecommendationResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const canSubmit = useMemo(
    () => moodText.trim().length > 0 || tags.length > 0,
    [moodText, tags]
  );

  async function submit() {
    if (!canSubmit || loading) {
      return;
    }

    setLoading(true);
    const response = await fetch("/api/recommendations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ moodText, tags })
    });
    const data = (await response.json()) as RecommendationResponse;
    setResult(data);
    setLoading(false);
  }

  useEffect(() => {
    if (result) setOpen(true);
  }, [result]);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
        setResult(null);
      }
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        setResult(null);
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative z-50 rounded-[26px] border border-slate-200 bg-white/94 p-3 shadow-soft backdrop-blur ${compact ? "" : "p-5"
        }`}
    >
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
        <div className="flex min-w-0 flex-1 items-center gap-3 rounded-2xl bg-slate-50 px-4 py-3">
          <WandSparkles className="h-5 w-5 shrink-0 text-sky-500" />
          <input
            value={moodText}
            onChange={(event) => setMoodText(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                submit();
              }
            }}
            onFocus={() => {
              setResult(null);
              setOpen(true);
            }}
            onClick={() => {
              setResult(null);
              setOpen(true);
            }}
            placeholder="例如：今天有点累，想喝清爽低度、不要太甜"
            className="min-w-0 flex-1 bg-transparent text-sm font-semibold text-ink outline-none placeholder:text-slate-400"
          />
        </div>
        <button
          type="button"
          onClick={submit}
          disabled={!canSubmit || loading}
          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-ink px-5 py-3 text-sm font-black text-white transition hover:translate-y-[-1px] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          推荐
        </button>
      </div>
      {open ? (
        <div className="absolute left-0 top-full mt-2 w-full z-50">
          <div className="rounded-lg bg-white p-3 shadow-lg">
            <div className="flex flex-wrap gap-2">
              {moodPresets.map((tag) => {
                const active = tags.includes(tag);
                return (
                  <button
                    type="button"
                    key={tag}
                    onClick={() =>
                      setTags((current) =>
                        current.includes(tag)
                          ? current.filter((item) => item !== tag)
                          : [...current, tag]
                      )
                    }
                    className={`rounded-full border px-3 py-1.5 text-xs font-bold transition ${active
                      ? "border-ink bg-ink text-white"
                      : "border-slate-200 bg-white text-slate-500 hover:bg-slate-50"
                      }`}
                  >
                    {tag}
                  </button>
                );
              })}
            </div>

            {result ? (
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-4">
                <div className="mb-3 flex flex-wrap items-center gap-2 text-sm text-slate-500">
                  <span className="font-bold text-ink">识别心情：</span>
                  {result.detectedTags.map((tag) => (
                    <span key={tag} className="rounded-full bg-sky-100 px-2.5 py-1 text-xs font-bold text-ink">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="grid max-h-[520px] gap-3 overflow-y-auto pr-1">
                  {result.recommendations.map((drink) => (
                    <DrinkRecipeCard key={drink.id} drink={drink} />
                  ))}
                </div>
              </motion.div>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}
