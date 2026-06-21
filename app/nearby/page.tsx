import { NearbyFinder } from "@/components/NearbyFinder";

export default function NearbyPage() {
  return (
    <main className="min-h-screen px-4 py-6 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-7xl">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-500">
              Nearby
            </p>
            <h1 className="mt-2 text-3xl font-black text-ink sm:text-4xl">附近</h1>
          </div>
          <p className="max-w-xl text-sm leading-6 text-slate-500">
            当前位置只在浏览器中使用。可先查看示例酒吧和便利店点位，后续接入真实 POI 服务。
          </p>
        </div>
        <NearbyFinder />
      </section>
    </main>
  );
}
