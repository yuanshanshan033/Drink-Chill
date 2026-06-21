"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import mapboxgl from "mapbox-gl";
import { ChevronRight, Globe2, Radio, Sparkles, Wine } from "lucide-react";
import { countries } from "@/lib/data/countries";
import type { CountryProfile } from "@/lib/types";

const defaultMapboxApiUrl = mapboxgl.config.API_URL;

const fallbackPositions: Record<string, { left: string; top: string }> = {
  CN: { left: "64%", top: "52%" },
  JP: { left: "73%", top: "50%" },
  KR: { left: "69%", top: "51%" },
  GB: { left: "46%", top: "43%" },
  FR: { left: "49%", top: "50%" },
  DE: { left: "53%", top: "47%" }
};

const metrics = [
  { label: "国家节点", value: "06" },
  { label: "代表基酒", value: "12+" },
  { label: "产品线索", value: "30+" }
];

export function CountryMap() {
  const mapNode = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const [selected, setSelected] = useState<CountryProfile>(countries[0]);
  const [mapStatus, setMapStatus] = useState<"loading" | "ready" | "degraded">("loading");
  const activeDrink = selected.drinks[0];
  const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
  const productCount = useMemo(
    () => selected.drinks.reduce((total, drink) => total + drink.products.length, 0),
    [selected]
  );

  useEffect(() => {
    if (!mapNode.current || mapRef.current) {
      return;
    }

    mapboxgl.accessToken = token || "";
    mapboxgl.config.API_URL = token ? defaultMapboxApiUrl : "";

    if (!mapboxgl.supported({ failIfMajorPerformanceCaveat: false })) {
      setMapStatus("degraded");
      return;
    }

    const graticuleFeatures = [];
    for (let lng = -180; lng <= 180; lng += 30) {
      graticuleFeatures.push({
        type: "Feature" as const,
        properties: {},
        geometry: {
          type: "LineString" as const,
          coordinates: Array.from({ length: 73 }, (_, index) => [
            lng,
            -90 + index * 2.5
          ])
        }
      });
    }
    for (let lat = -60; lat <= 60; lat += 30) {
      graticuleFeatures.push({
        type: "Feature" as const,
        properties: {},
        geometry: {
          type: "LineString" as const,
          coordinates: Array.from({ length: 145 }, (_, index) => [
            -180 + index * 2.5,
            lat
          ])
        }
      });
    }

    const landFeatures = [
      {
        type: "Feature" as const,
        properties: { name: "North America" },
        geometry: {
          type: "Polygon" as const,
          coordinates: [[
            [-168, 72], [-140, 58], [-126, 49], [-122, 34], [-103, 23],
            [-86, 15], [-75, 20], [-68, 46], [-52, 55], [-60, 70],
            [-96, 74], [-135, 72], [-168, 72]
          ]]
        }
      },
      {
        type: "Feature" as const,
        properties: { name: "South America" },
        geometry: {
          type: "Polygon" as const,
          coordinates: [[
            [-82, 12], [-66, 8], [-52, -8], [-40, -22], [-48, -55],
            [-66, -52], [-76, -28], [-82, 12]
          ]]
        }
      },
      {
        type: "Feature" as const,
        properties: { name: "Europe" },
        geometry: {
          type: "Polygon" as const,
          coordinates: [[
            [-11, 36], [2, 44], [12, 36], [29, 41], [40, 55],
            [24, 70], [0, 61], [-10, 54], [-11, 36]
          ]]
        }
      },
      {
        type: "Feature" as const,
        properties: { name: "Africa" },
        geometry: {
          type: "Polygon" as const,
          coordinates: [[
            [-18, 35], [12, 37], [35, 31], [50, 10], [43, -30],
            [21, -35], [5, -24], [-14, 0], [-18, 35]
          ]]
        }
      },
      {
        type: "Feature" as const,
        properties: { name: "Asia" },
        geometry: {
          type: "Polygon" as const,
          coordinates: [[
            [35, 6], [52, 31], [70, 44], [92, 50], [122, 48],
            [150, 61], [170, 50], [146, 20], [122, 8], [105, -6],
            [78, 8], [58, 18], [35, 6]
          ]]
        }
      },
      {
        type: "Feature" as const,
        properties: { name: "Australia" },
        geometry: {
          type: "Polygon" as const,
          coordinates: [[
            [112, -12], [152, -12], [154, -36], [132, -44],
            [113, -34], [112, -12]
          ]]
        }
      },
      {
        type: "Feature" as const,
        properties: { name: "Greenland" },
        geometry: {
          type: "Polygon" as const,
          coordinates: [[
            [-54, 59], [-24, 66], [-30, 82], [-62, 82], [-72, 70],
            [-54, 59]
          ]]
        }
      }
    ];

    const localGlobeStyle: mapboxgl.StyleSpecification = {
      version: 8,
      sources: {
        graticule: {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: graticuleFeatures
          }
        },
        land: {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: landFeatures
          }
        }
      },
      layers: [
        {
          id: "ocean",
          type: "background",
          paint: {
            "background-color": "#dff3ff"
          }
        },
        {
          id: "graticule",
          type: "line",
          source: "graticule",
          paint: {
            "line-color": "rgba(255,255,255,0.76)",
            "line-width": 1
          }
        },
        {
          id: "land",
          type: "fill",
          source: "land",
          paint: {
            "fill-color": "#9bdcc9",
            "fill-opacity": 0.82
          }
        },
        {
          id: "land-outline",
          type: "line",
          source: "land",
          paint: {
            "line-color": "rgba(255,255,255,0.95)",
            "line-width": 1.4
          }
        }
      ]
    };

    let map: mapboxgl.Map;
    try {
      map = new mapboxgl.Map({
        container: mapNode.current,
        style: token ? "mapbox://styles/mapbox/streets-v12" : localGlobeStyle,
        center: [34, 35],
        zoom: 1.55,
        minZoom: 1.1,
        maxZoom: 5,
        projection: "globe",
        attributionControl: false,
        cooperativeGestures: true,
        performanceMetricsCollection: false,
        testMode: !token
      });
    } catch {
      setMapStatus("degraded");
      return;
    }

    mapRef.current = map;

    map.addControl(
      new mapboxgl.NavigationControl({ showCompass: false, visualizePitch: false }),
      "bottom-right"
    );
    map.addControl(new mapboxgl.AttributionControl({ compact: true }), "bottom-left");

    map.on("style.load", () => {
      map.setFog({
        color: "rgb(255, 255, 255)",
        "high-color": "rgb(155, 220, 255)",
        "horizon-blend": 0.08,
        "space-color": "rgb(248, 252, 255)",
        "star-intensity": 0
      });
      setMapStatus("ready");
      requestAnimationFrame(() => map.resize());
    });

    map.on("load", () => {
      setMapStatus("ready");
      requestAnimationFrame(() => map.resize());
    });

    map.on("error", () => {
      setMapStatus((current) => (current === "ready" ? current : "degraded"));
    });

    countries.forEach((country) => {
      const markerNode = document.createElement("button");
      markerNode.type = "button";
      markerNode.className = "drink-map-marker";
      markerNode.dataset.countryMarker = country.code;
      markerNode.dataset.active = country.code === countries[0].code ? "true" : "false";
      markerNode.setAttribute("aria-label", `查看${country.name}起源酒库`);
      markerNode.innerHTML = `
        <span class="drink-map-marker-dot">${country.code}</span>
        <span class="drink-map-marker-label">
          <span class="drink-map-marker-pin">⌖</span>${country.name}
        </span>
      `;
      markerNode.addEventListener("click", () => {
        setSelected(country);
        map.easeTo({
          center: country.coordinates,
          zoom: Math.max(map.getZoom(), 2.05),
          duration: 900
        });
      });

      new mapboxgl.Marker({
        element: markerNode,
        anchor: "center"
      })
        .setLngLat(country.coordinates)
        .addTo(map);
    });

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, [token]);

  useEffect(() => {
    document.querySelectorAll<HTMLElement>("[data-country-marker]").forEach((node) => {
      node.dataset.active = node.dataset.countryMarker === selected.code ? "true" : "false";
    });

    if (mapRef.current) {
      mapRef.current.easeTo({
        center: selected.coordinates,
        zoom: Math.max(mapRef.current.getZoom(), 2.05),
        duration: 850
      });
    }
  }, [selected]);

  return (
    <section className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-sm">
      <div className="grid min-h-[720px] xl:grid-cols-[minmax(0,1.25fr)_440px]">
        <div className="relative isolate min-h-[620px] overflow-hidden bg-[linear-gradient(180deg,#ffffff_0%,#f4fbff_52%,#ffffff_100%)] px-5 py-6 sm:px-8">
          <div
            aria-hidden
            className="absolute inset-0 opacity-70"
            style={{
              backgroundImage:
                "linear-gradient(rgba(13,17,23,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(13,17,23,0.045) 1px, transparent 1px)",
              backgroundSize: "56px 56px"
            }}
          />
          <div className="relative z-10 flex flex-wrap items-start justify-between gap-4">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-3 py-1.5 text-xs font-black uppercase tracking-[0.16em] text-slate-500 shadow-sm backdrop-blur">
                <Radio className="h-3.5 w-3.5 text-sky-500" />
                Origin live atlas
              </span>
              <h2 className="mt-4 max-w-xl text-3xl font-black leading-tight text-ink sm:text-4xl">
                世界酒源地球仪
              </h2>
              <p className="mt-3 max-w-lg text-sm leading-7 text-slate-600">
                点击地球上的国家节点，查看代表基酒、产品库和风味起源故事。
              </p>
            </div>
            <div className="grid grid-cols-3 gap-2 rounded-[22px] border border-slate-200 bg-white/80 p-2 shadow-sm backdrop-blur">
              {metrics.map((metric) => (
                <div key={metric.label} className="min-w-20 rounded-2xl bg-slate-50 px-3 py-2 text-center">
                  <p className="text-lg font-black text-ink">{metric.value}</p>
                  <p className="mt-1 text-[11px] font-bold text-slate-500">{metric.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative z-10 mx-auto mt-4 grid min-h-[560px] max-w-[860px] place-items-center">
            <div aria-hidden className="absolute inset-x-8 bottom-10 h-16 rounded-[50%] bg-slate-900/10 blur-xl" />
            <motion.div
              aria-hidden
              className="absolute h-[min(640px,86vw)] w-[min(640px,86vw)] rounded-full border border-sky-200/80"
              animate={{ rotate: 360 }}
              transition={{ duration: 34, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              aria-hidden
              className="absolute h-[min(520px,72vw)] w-[min(760px,100vw)] rounded-[50%] border border-slate-300/70"
              animate={{ rotate: -360 }}
              transition={{ duration: 46, repeat: Infinity, ease: "linear" }}
            />

            <div className="relative aspect-square w-[min(640px,84vw)] overflow-hidden rounded-full border border-white bg-sky-50 shadow-[0_36px_100px_rgba(43,151,214,0.22),inset_-34px_-42px_80px_rgba(13,17,23,0.10),inset_28px_28px_72px_rgba(255,255,255,0.90)]">
              <div
                className={`absolute inset-0 overflow-hidden rounded-full transition-opacity duration-300 ${
                  mapStatus === "ready" ? "opacity-0" : "opacity-100"
                } ${mapStatus === "degraded" ? "z-20" : "z-0"}`}
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_32%_22%,rgba(255,255,255,0.68),transparent_31%),linear-gradient(115deg,transparent_0_18%,rgba(113,201,176,0.72)_18%_32%,rgba(255,255,255,0.54)_32%_42%,rgba(113,201,176,0.78)_42%_55%,rgba(222,242,255,0.72)_55%_64%,rgba(113,201,176,0.76)_64%_77%,rgba(222,242,255,0.72)_77%_88%,rgba(113,201,176,0.68)_88%_100%)]" />
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.24)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.24)_1px,transparent_1px)] bg-[length:56px_56px]" />
                <div className="absolute inset-[16%] rounded-full border border-white/45" />
                <div className="absolute inset-[32%] rounded-full border border-white/35" />
                {countries.map((country) => {
                  const position = fallbackPositions[country.code] ?? { left: "50%", top: "50%" };

                  return (
                    <div
                      key={country.code}
                      className="absolute -translate-x-1/2 -translate-y-1/2"
                      style={{ left: position.left, top: position.top }}
                    >
                      <button
                        type="button"
                        className="drink-map-marker"
                        data-country-marker={country.code}
                        data-active={country.code === selected.code ? "true" : "false"}
                        aria-label={`查看${country.name}起源酒库`}
                        onClick={() => setSelected(country)}
                      >
                        <span className="drink-map-marker-dot">{country.code}</span>
                        <span className="drink-map-marker-label">
                          <span className="drink-map-marker-pin">⌖</span>
                          {country.name}
                        </span>
                      </button>
                    </div>
                  );
                })}
              </div>
              <div
                ref={mapNode}
                className={`relative z-10 h-full w-full rounded-full ${
                  mapStatus === "degraded" ? "pointer-events-none opacity-0" : ""
                }`}
                aria-label="国家起源地图"
              />
              <div aria-hidden className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(circle_at_32%_20%,rgba(255,255,255,0.36),transparent_31%),radial-gradient(circle_at_70%_70%,transparent_52%,rgba(255,255,255,0.28)_100%)]" />
              <div aria-hidden className="pointer-events-none absolute inset-[12%] rounded-full border border-white/45" />
              <div aria-hidden className="pointer-events-none absolute inset-[28%] rounded-full border border-white/35" />
              {mapStatus !== "ready" ? (
                <div className="absolute left-1/2 top-5 z-20 -translate-x-1/2 rounded-full border border-slate-200 bg-white/88 px-4 py-2 text-xs font-black text-ink shadow-sm backdrop-blur">
                  {mapStatus === "loading" ? "正在渲染地球..." : "地图瓦片加载中"}
                </div>
              ) : null}
            </div>

            <motion.div
              key={selected.code}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute bottom-3 left-1/2 z-30 w-[min(520px,calc(100%-1rem))] -translate-x-1/2 rounded-[24px] border border-slate-200 bg-white/88 p-4 shadow-soft backdrop-blur"
            >
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-sky-600">
                    Selected origin
                  </p>
                  <h3 className="mt-1 text-xl font-black text-ink">
                    {selected.name} / {selected.localName}
                  </h3>
                </div>
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-sky-100 text-lg font-black text-ink">
                  {selected.code}
                </span>
              </div>
              <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-600">
                {selected.summary}
              </p>
            </motion.div>
          </div>
        </div>

        <aside className="border-t border-slate-200 bg-white xl:border-l xl:border-t-0">
          <div className="relative h-56 overflow-hidden">
            <img
              src={selected.image}
              alt={`${selected.name} 风景`}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/65 via-ink/15 to-transparent" />
            <div className="absolute bottom-5 left-5 text-white">
              <p className="text-sm font-semibold opacity-85">{selected.localName}</p>
              <h2 className="text-3xl font-black">{selected.name}</h2>
            </div>
          </div>

          <div className="p-5">
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-400">
                  主推基酒
                </p>
                <p className="mt-2 text-lg font-black text-ink">{activeDrink.name}</p>
              </div>
              <div className="rounded-2xl bg-sky-50 p-4">
                <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-400">
                  产品线索
                </p>
                <p className="mt-2 text-lg font-black text-ink">{productCount} 款</p>
              </div>
            </div>

            <div className="mt-5 space-y-3">
              {selected.drinks.map((drink) => (
                <article key={drink.name} className="rounded-[22px] border border-slate-200 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-black text-ink">{drink.name}</h3>
                      <p className="mt-1 text-sm font-semibold text-sky-700">
                        {drink.flavor}
                      </p>
                    </div>
                    <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
                      <Wine className="h-3.5 w-3.5" />
                      {drink.abv}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{drink.story}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {drink.products.map((product) => (
                      <span
                        key={product}
                        className="inline-flex items-center gap-1 rounded-full bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-500"
                      >
                        <Sparkles className="h-3 w-3 text-sky-500" />
                        {product}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-5 rounded-[22px] bg-ink p-4 text-white">
              <div className="flex items-center gap-2 text-sm font-black">
                <Globe2 className="h-4 w-4 text-sky-300" />
                下一步可扩展
              </div>
              <p className="mt-2 text-sm leading-6 text-white/72">
                可把更多国家、酒款库存和酒吧 POI 接入同一地球节点，形成探索式酒源地图。
              </p>
              <div className="mt-3 inline-flex items-center gap-1 text-xs font-black uppercase tracking-[0.16em] text-sky-200">
                Explore origin graph
                <ChevronRight className="h-4 w-4" />
              </div>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
