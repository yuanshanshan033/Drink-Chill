"use client";

import { useState } from "react";
import { Beaker, Gauge, Globe2, Tags } from "lucide-react";
import { categoryFacets } from "@/lib/data/drinks";
import { CountryMap } from "@/components/CountryMap";

const tabs = [
  { id: "ingredients", label: "原料", icon: Beaker },
  { id: "flavors", label: "味道", icon: Tags },
  { id: "abv", label: "度数", icon: Gauge },
  { id: "country", label: "国家", icon: Globe2 }
] as const;

type TabId = (typeof tabs)[number]["id"];

export function CategoryExplorer() {
  const [active, setActive] = useState<TabId>("country");

  return (
    <div>
      <div className="mb-5 flex flex-wrap gap-2 rounded-2xl border border-slate-200 bg-white p-2 shadow-sm">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              type="button"
              key={tab.id}
              onClick={() => setActive(tab.id)}
              className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-black transition ${
                active === tab.id
                  ? "bg-ink text-white"
                  : "text-slate-500 hover:bg-slate-100 hover:text-ink"
              }`}
            >
              <Icon className="h-4 w-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {active === "country" ? (
        <CountryMap />
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {categoryFacets[active].map((facet) => {
            const [title, body] = facet.split("：");
            return (
              <article key={facet} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <h2 className="text-xl font-black text-ink">{title}</h2>
                <p className="mt-3 leading-7 text-slate-600">{body}</p>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
