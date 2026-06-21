"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Compass,
  Home,
  Lightbulb,
  MapPinned,
  Sparkles,
  Tags
} from "lucide-react";
import type { ReactNode } from "react";

const navItems = [
  { href: "/", label: "首页", icon: Home },
  { href: "/recommendations", label: "推荐", icon: Sparkles },
  { href: "/categories", label: "分类", icon: Tags },
  { href: "/nearby", label: "附近", icon: MapPinned },
  { href: "/inspirations", label: "灵感", icon: Lightbulb }
];

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen lg:pl-[88px]">
      <aside className="fixed inset-x-3 bottom-3 z-40 rounded-2xl border border-slate-200 bg-white/95 px-3 py-2 shadow-soft backdrop-blur lg:inset-y-4 lg:left-4 lg:right-auto lg:w-[64px] lg:rounded-[28px] lg:px-2 lg:py-4">
        <nav className="flex items-center justify-between gap-1 lg:h-full lg:flex-col lg:justify-start lg:gap-3">
          <Link
            href="/"
            className="hidden h-11 w-11 place-items-center rounded-2xl bg-ink text-white transition hover:scale-105 lg:grid"
            aria-label="Drink&Chill 首页"
          >
            <Compass className="h-5 w-5" />
          </Link>
          {navItems.map((item) => {
            const Icon = item.icon;
            const active =
              item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-label={item.label}
                title={item.label}
                className={`grid h-12 min-w-12 place-items-center rounded-2xl text-xs font-semibold transition sm:min-w-[64px] lg:w-12 lg:min-w-0 ${
                  active
                    ? "bg-sky-100 text-ink"
                    : "text-slate-500 hover:bg-slate-100 hover:text-ink"
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="mt-0.5 leading-none lg:hidden">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>
      <div className="pb-24 lg:pb-0">{children}</div>
    </div>
  );
}
