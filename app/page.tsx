import { InteractiveGlobe } from "@/components/InteractiveGlobe";
import { MoodInput } from "@/components/MoodInput";
import { TutorialModalLauncher } from "@/components/TutorialModalLauncher";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white px-4 pb-8 pt-5 sm:px-6 lg:px-8">
      <section className="mx-auto grid min-h-[calc(100vh-2rem)] max-w-7xl grid-rows-[auto_1fr_auto] gap-5">
        <header className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4 flex-1 min-w-0">
            <div className="min-w-0">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-500">
                Be yourself, be unique, be free.
              </p>
              <h1 className="mt-2 max-w-3xl text-3xl font-black leading-tight text-ink sm:text-5xl">
                Drink&Chill
              </h1>
            </div>

            <div className="ml-4 shrink-0 w-[min(640px,48vw)]">
              <MoodInput compact />
            </div>
          </div>

          <TutorialModalLauncher />
        </header>

        <div className="relative grid min-h-[680px] place-items-center overflow-visible bg-white">
          <InteractiveGlobe />
        </div>

        <footer className="grid gap-3 text-sm text-slate-500 sm:grid-cols-3">
          <p>推荐覆盖心情、目标口味、应季产品与低度选择。</p>
          <p>国家地图已预置中、日、韩、英、法、德六个起源节点。</p>
          <p>灵感空间为本地 SQLite 私密记录，支持图片与配方备份。</p>
        </footer>
      </section>
    </main>
  );
}
