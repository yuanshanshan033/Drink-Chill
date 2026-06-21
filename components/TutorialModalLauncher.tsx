"use client";

import { useState } from "react";
import { GraduationCap } from "lucide-react";
import { Modal } from "@/components/Modal";

export function TutorialModalLauncher() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-ink shadow-sm transition hover:bg-sky-50"
      >
        <GraduationCap className="h-4 w-4" />
        新手教程
      </button>
      {open ? (
        <Modal title="3 分钟调饮入门" onClose={() => setOpen(false)}>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              ["1", "先选心情", "用标签或自然语言描述今天的状态，系统会转成可推荐的风味意图。"],
              ["2", "控制酒精", "优先看 ABV 和杯量。低度调饮也能保留仪式感。"],
              ["3", "记录灵感", "把喜欢的比例、图片和心情备份到私密灵感空间。"]
            ].map(([step, title, body]) => (
              <div key={step} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <span className="grid h-8 w-8 place-items-center rounded-xl bg-ink text-sm font-black text-white">
                  {step}
                </span>
                <h3 className="mt-4 font-black text-ink">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{body}</p>
              </div>
            ))}
          </div>
        </Modal>
      ) : null}
    </>
  );
}
