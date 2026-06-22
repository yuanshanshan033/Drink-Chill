import { InspirationBoard } from "@/components/InspirationBoard";

export default function InspirationsPage() {
  return (
    <main className="min-h-screen px-4 py-6 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-7xl">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-500">
              Private Notes
            </p>
            <img
              src="/img/灵感标题.jpg"
              alt="灵感"
              className="inline-block h-auto w-1/3 max-w-[360px] sm:max-w-[480px]"
              draggable={false}
            />
          </div>
          <p className="max-w-xl text-sm leading-6 text-slate-500">
            记录灵机一动的味道、场景、图片和配方备份。数据写入本机 SQLite，不上传到外部服务。
          </p>
        </div>
        <InspirationBoard />
      </section>
    </main>
  );
}
