"use client";

import { useEffect, useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import { drinks, moodPresets } from "@/lib/data/drinks";
import { DrinkRecipeCard } from "@/components/DrinkRecipeCard";
import { MoodInput } from "@/components/MoodInput";

export function RecommendationWorkbench() {
  const [activeTag, setActiveTag] = useState("清爽");
  const [season, setSeason] = useState("全部");
  const [filtered, setFiltered] = useState(drinks);

  useEffect(() => {
    setFiltered(
      drinks.filter((drink) => {
        const tagMatch = activeTag === "全部" || drink.moodTags.includes(activeTag);
        const seasonMatch = season === "全部" || drink.season.includes(season);
        return tagMatch && seasonMatch;
      })
    );
  }, [activeTag, season]);

  return (
    <div className="grid items-start gap-5 xl:grid-cols-[0.8fr_1.2fr]">
      <div className="space-y-5 xl:sticky xl:top-[153px] xl:self-start">
        <MoodInput />
        <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="inline-flex items-center gap-2 text-lg font-black text-ink">
            <SlidersHorizontal className="h-5 w-5" />
            目标口味筛选
          </h2>
          <div className="mt-4">
            <p className="mb-2 text-xs font-black uppercase tracking-[0.16em] text-slate-400">
              心情
            </p>
            <div className="flex flex-wrap gap-2">
              {["全部", ...moodPresets].map((tag) => (
                <button
                  type="button"
                  key={tag}
                  onClick={() => setActiveTag(tag)}
                  className={`rounded-full px-3 py-1.5 text-xs font-bold transition ${
                    activeTag === tag ? "bg-ink text-white" : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-4">
            <p className="mb-2 text-xs font-black uppercase tracking-[0.16em] text-slate-400">
              季节
            </p>
            <div className="flex flex-wrap gap-2">
              {["全部", "春", "夏", "秋", "冬", "四季"].map((item) => (
                <button
                  type="button"
                  key={item}
                  onClick={() => setSeason(item)}
                  className={`rounded-full px-3 py-1.5 text-xs font-bold transition ${
                    season === item ? "bg-sky-100 text-ink" : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-4">
        {filtered.map((drink) => (
          <DrinkRecipeCard key={drink.id} drink={drink} />
        ))}
        {!filtered.length ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-500">
            当前筛选没有结果，换一个心情或季节试试。
          </div>
        ) : null}
      </div>
    </div>
  );
}
