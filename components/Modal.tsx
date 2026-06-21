"use client";

import { X } from "lucide-react";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

type ModalProps = {
  title: string;
  children: ReactNode;
  onClose: () => void;
};

export function Modal({ title, children, onClose }: ModalProps) {
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-ink/35 p-4 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, y: 22, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        className="max-h-[86vh] w-full max-w-3xl overflow-y-auto rounded-[28px] border border-slate-200 bg-white p-5 shadow-soft"
        role="dialog"
        aria-modal="true"
      >
        <div className="mb-4 flex items-center justify-between gap-4">
          <h2 className="text-xl font-black text-ink">{title}</h2>
          <button
            type="button"
            title="关闭"
            aria-label="关闭"
            onClick={onClose}
            className="grid h-10 w-10 place-items-center rounded-2xl bg-slate-100 text-ink transition hover:bg-slate-200"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        {children}
      </motion.div>
    </div>
  );
}
