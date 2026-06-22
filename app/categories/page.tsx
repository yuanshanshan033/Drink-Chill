import { CategoryExplorer } from "@/components/CategoryExplorer";

export default function CategoriesPage() {
  return (
    <main className="min-h-screen px-4 py-6 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-7xl">
        <div className="mb-6">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-500">
            Classify
          </p>
          <img
            src="/img/分类标题.jpg"
            alt="分类"
            className="inline-block h-auto w-40 max-w-[360px] sm:max-w-[480px]"
            draggable={false}
          />
        </div>
        <CategoryExplorer />
      </section>
    </main>
  );
}
