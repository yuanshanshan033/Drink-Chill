import { RecommendationWorkbench } from "@/components/RecommendationWorkbench";

export default function RecommendationsPage() {
  return (
    <main className="min-h-screen px-4 py-6 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-7xl">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-500">
              Recommend
            </p>
            <h1 className="mt-2 text-3xl font-black text-ink sm:text-4xl">推荐</h1>
          </div>
          <p className="max-w-xl text-sm leading-6 text-slate-500">
            支持心情、目标口味、季节和新品维度。每个推荐都附带材料与制作过程，方便直接复刻。
          </p>
        </div>
        <RecommendationWorkbench />
      </section>
    </main>
  );
}
