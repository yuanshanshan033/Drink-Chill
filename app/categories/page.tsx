import { CategoryExplorer } from "@/components/CategoryExplorer";

export default function CategoriesPage() {
  return (
    <main className="min-h-screen px-4 py-6 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-7xl">
        <div className="mb-6">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-500">
            Classify
          </p>
          <h1 className="mt-2 text-3xl font-black text-ink sm:text-4xl">分类</h1>
        </div>
        <CategoryExplorer />
      </section>
    </main>
  );
}
