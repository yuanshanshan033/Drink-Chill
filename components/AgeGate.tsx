"use client";

import { useEffect, useState } from "react";
import { ShieldCheck, XCircle } from "lucide-react";
import { motion } from "framer-motion";

const STORAGE_KEY = "drink_chill_age_verified";

export function AgeGate() {
  const [visible, setVisible] = useState(false);
  const [blocked, setBlocked] = useState(false);

  useEffect(() => {
    const verified = window.localStorage.getItem(STORAGE_KEY);
    setVisible(verified !== "true");
  }, []);

  if (!visible) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-white/86 p-4 backdrop-blur-xl">
      <motion.div
        initial={{ opacity: 0, y: 18, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        className="w-full max-w-[520px] rounded-[28px] border border-slate-200 bg-white p-6 shadow-soft"
        role="dialog"
        aria-modal="true"
        aria-labelledby="age-gate-title"
      >
        <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-100 text-ink">
          {blocked ? <XCircle className="h-6 w-6" /> : <ShieldCheck className="h-6 w-6" />}
        </div>
        <h2 id="age-gate-title" className="text-2xl font-black text-ink">
          法定饮酒年龄验证
        </h2>
        <p className="mt-3 leading-7 text-slate-600">
          Drink&Chill 仅面向达到所在地法定饮酒年龄的用户。请确认你已达到法定饮酒年龄，并理性饮酒。
        </p>
        {blocked ? (
          <p className="mt-4 rounded-2xl bg-slate-100 p-4 text-sm font-semibold text-slate-600">
            你需要达到法定饮酒年龄后才能继续浏览本平台内容。
          </p>
        ) : null}
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <button
            type="button"
            className="rounded-2xl bg-ink px-5 py-3 font-bold text-white transition hover:translate-y-[-1px]"
            onClick={() => {
              window.localStorage.setItem(STORAGE_KEY, "true");
              setVisible(false);
            }}
          >
            我已达到法定年龄
          </button>
          <button
            type="button"
            className="rounded-2xl border border-slate-200 px-5 py-3 font-bold text-ink transition hover:bg-slate-50"
            onClick={() => setBlocked(true)}
          >
            未达到
          </button>
        </div>
      </motion.div>
    </div>
  );
}
