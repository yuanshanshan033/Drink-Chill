"use client";

import { useMemo, useState } from "react";
import { LocateFixed, MapPin, Navigation } from "lucide-react";

const venues = [
  {
    name: "Afterwork Bar",
    type: "酒吧",
    distance: "650m",
    mood: "适合低声聊天和 Highball",
    open: "18:00-02:00"
  },
  {
    name: "Blue Corner Bottle Shop",
    type: "便利店",
    distance: "820m",
    mood: "可买到烧酒、啤酒和冰块",
    open: "24 小时"
  },
  {
    name: "Small Batch Taproom",
    type: "酒吧",
    distance: "1.1km",
    mood: "精酿和应季水果酸啤",
    open: "17:30-01:00"
  },
  {
    name: "City Mart Select",
    type: "便利店",
    distance: "1.4km",
    mood: "低度梅酒与气泡水补给",
    open: "07:00-23:30"
  }
];

export function NearbyFinder() {
  const [status, setStatus] = useState("未获取定位");
  const [filter, setFilter] = useState("全部");
  const filteredVenues = useMemo(
    () => venues.filter((venue) => filter === "全部" || venue.type === filter),
    [filter]
  );

  function locate() {
    if (!navigator.geolocation) {
      setStatus("当前浏览器不支持定位");
      return;
    }

    setStatus("正在获取定位...");
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setStatus(
          `已获取：${position.coords.latitude.toFixed(3)}, ${position.coords.longitude.toFixed(3)}`
        );
      },
      () => setStatus("定位被拒绝，先展示示例点位")
    );
  }

  return (
    <div className="grid gap-5 xl:grid-cols-[0.9fr_1.1fr]">
      <section className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-xl font-black text-ink">当前位置</h2>
        <p className="mt-3 rounded-2xl bg-slate-50 p-4 text-sm font-semibold text-slate-600">
          {status}
        </p>
        <button
          type="button"
          onClick={locate}
          className="mt-4 inline-flex items-center gap-2 rounded-2xl bg-ink px-4 py-3 text-sm font-black text-white"
        >
          <LocateFixed className="h-4 w-4" />
          使用浏览器定位
        </button>
        <div className="mt-6 h-[360px] overflow-hidden rounded-[24px] bg-mist">
          <div className="relative h-full">
            <div className="absolute inset-8 rounded-[36px] border border-sky-200 bg-white/65" />
            {filteredVenues.map((venue, index) => (
              <div
                key={venue.name}
                className="absolute"
                style={{
                  left: `${24 + (index % 2) * 42}%`,
                  top: `${18 + index * 17}%`
                }}
              >
                <span className="grid h-12 w-12 place-items-center rounded-full bg-coral text-white shadow-lg ring-4 ring-white">
                  <MapPin className="h-5 w-5" />
                </span>
              </div>
            ))}
            <div className="absolute bottom-5 left-5 inline-flex items-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-bold text-ink shadow-sm">
              <Navigation className="h-4 w-4" />
              示例附近地图
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="mb-4 flex flex-wrap gap-2">
          {["全部", "酒吧", "便利店"].map((item) => (
            <button
              type="button"
              key={item}
              onClick={() => setFilter(item)}
              className={`rounded-full px-4 py-2 text-sm font-black transition ${
                filter === item ? "bg-ink text-white" : "bg-white text-slate-500"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {filteredVenues.map((venue) => (
            <article key={venue.name} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-lg font-black text-ink">{venue.name}</h3>
                  <p className="mt-1 text-sm font-semibold text-sky-700">{venue.type}</p>
                </div>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
                  {venue.distance}
                </span>
              </div>
              <p className="mt-4 text-sm leading-6 text-slate-600">{venue.mood}</p>
              <p className="mt-3 text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
                {venue.open}
              </p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
