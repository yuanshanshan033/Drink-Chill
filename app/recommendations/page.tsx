import { RecommendationWorkbench } from "@/components/RecommendationWorkbench";

export default function RecommendationsPage() {
  return (
    <main className="min-h-screen px-4 py-6 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-7xl">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4 xl:sticky xl:top-0 xl:z-30 xl:-mt-6 xl:mb-0 xl:h-[153px] xl:bg-white xl:pb-6 xl:pt-6">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-500">
              Recommend
            </p>
            <img
              src="/img/推荐标题.jpg"
              alt="推荐"
              className="inline-block h-auto w-1/2 max-w-[360px] sm:max-w-[480px]"
              draggable={false}
            />
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
