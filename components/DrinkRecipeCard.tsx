import { Beaker, Sparkles } from "lucide-react";
import type { DrinkRecommendation } from "@/lib/types";

export function DrinkRecipeCard({ drink }: { drink: DrinkRecommendation }) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-xl font-black text-ink">{drink.name}</h3>
            {drink.isNew ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-sky-100 px-3 py-1 text-xs font-black text-ink">
                <Sparkles className="h-3.5 w-3.5" />
                最新
              </span>
            ) : null}
          </div>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            {drink.country} / {drink.category} / {drink.abv} / {drink.flavor}
          </p>
        </div>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
          {drink.season}
        </span>
      </div>
      <p className="mt-4 rounded-2xl bg-mist p-4 text-sm leading-6 text-slate-700">
        {drink.note}
      </p>
      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <div>
          <h4 className="mb-2 inline-flex items-center gap-2 text-sm font-black text-ink">
            <Beaker className="h-4 w-4" />
            材料
          </h4>
          <ul className="space-y-2 text-sm text-slate-600">
            {drink.ingredients.map((ingredient) => (
              <li key={ingredient} className="rounded-xl bg-slate-50 px-3 py-2">
                {ingredient}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="mb-2 text-sm font-black text-ink">制作过程</h4>
          <ol className="space-y-2 text-sm leading-6 text-slate-600">
            {drink.steps.map((step, index) => (
              <li key={step} className="flex gap-2">
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-ink text-xs font-black text-white">
                  {index + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </article>
  );
}
