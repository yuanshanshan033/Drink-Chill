"use client";

import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from "react";
import { Camera, Loader2, Pencil, Plus, Save, Trash2 } from "lucide-react";
import type { Inspiration } from "@/lib/types";

type FormState = {
  id?: number;
  title: string;
  note: string;
  moodTags: string;
  imageUrl: string;
  recipeBackup: string;
};

const emptyForm: FormState = {
  title: "",
  note: "",
  moodTags: "",
  imageUrl: "",
  recipeBackup: ""
};

export function InspirationBoard() {
  const [items, setItems] = useState<Inspiration[]>([]);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const isEditing = typeof form.id === "number";
  const canSave = useMemo(() => form.title.trim().length > 0, [form.title]);

  async function loadItems() {
    setLoading(true);
    const response = await fetch("/api/inspirations", { cache: "no-store" });
    const data = (await response.json()) as { inspirations: Inspiration[] };
    setItems(data.inspirations);
    setLoading(false);
  }

  useEffect(() => {
    loadItems();
  }, []);

  async function handleImage(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    if (file.size > 2.5 * 1024 * 1024) {
      alert("图片建议小于 2.5MB，方便本地 SQLite 保存。");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setForm((current) => ({
        ...current,
        imageUrl: typeof reader.result === "string" ? reader.result : ""
      }));
    };
    reader.readAsDataURL(file);
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canSave || saving) {
      return;
    }

    setSaving(true);
    const payload = {
      title: form.title,
      note: form.note,
      moodTags: form.moodTags
        .split(/[，,\s]+/)
        .map((tag) => tag.trim())
        .filter(Boolean),
      imageUrl: form.imageUrl,
      recipeBackup: form.recipeBackup
    };

    const endpoint = isEditing ? `/api/inspirations/${form.id}` : "/api/inspirations";
    const response = await fetch(endpoint, {
      method: isEditing ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      setForm(emptyForm);
      await loadItems();
    }
    setSaving(false);
  }

  async function remove(id: number) {
    await fetch(`/api/inspirations/${id}`, { method: "DELETE" });
    await loadItems();
  }

  function edit(item: Inspiration) {
    setForm({
      id: item.id,
      title: item.title,
      note: item.note,
      moodTags: item.moodTags.join(" "),
      imageUrl: item.imageUrl,
      recipeBackup: item.recipeBackup
    });
  }

  return (
    <div className="grid gap-5 xl:grid-cols-[0.85fr_1.15fr]">
      <form onSubmit={submit} className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-xl font-black text-ink">{isEditing ? "编辑灵感" : "新增灵感"}</h2>
          <button
            type="button"
            onClick={() => setForm(emptyForm)}
            title="新建"
            aria-label="新建"
            className="grid h-10 w-10 place-items-center rounded-2xl bg-slate-100 text-ink"
          >
            <Plus className="h-5 w-5" />
          </button>
        </div>
        <label className="block">
          <span className="text-sm font-black text-ink">标题</span>
          <input
            value={form.title}
            onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))}
            className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-sky-300"
            placeholder="例如：雨天的青梅 Highball"
          />
        </label>
        <label className="mt-4 block">
          <span className="text-sm font-black text-ink">心情标签</span>
          <input
            value={form.moodTags}
            onChange={(event) => setForm((current) => ({ ...current, moodTags: event.target.value }))}
            className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-sky-300"
            placeholder="放松 清爽 低度"
          />
        </label>
        <label className="mt-4 block">
          <span className="text-sm font-black text-ink">灵感内容</span>
          <textarea
            value={form.note}
            onChange={(event) => setForm((current) => ({ ...current, note: event.target.value }))}
            className="mt-2 min-h-28 w-full resize-y rounded-2xl border border-slate-200 px-4 py-3 text-sm leading-6 outline-none focus:border-sky-300"
            placeholder="记录场景、味道、想法..."
          />
        </label>
        <label className="mt-4 block">
          <span className="text-sm font-black text-ink">配方备份</span>
          <textarea
            value={form.recipeBackup}
            onChange={(event) =>
              setForm((current) => ({ ...current, recipeBackup: event.target.value }))
            }
            className="mt-2 min-h-24 w-full resize-y rounded-2xl border border-slate-200 px-4 py-3 text-sm leading-6 outline-none focus:border-sky-300"
            placeholder="材料、比例、步骤..."
          />
        </label>
        <div className="mt-4">
          <label className="inline-flex cursor-pointer items-center gap-2 rounded-2xl border border-slate-200 px-4 py-3 text-sm font-black text-ink hover:bg-slate-50">
            <Camera className="h-4 w-4" />
            上传图片
            <input type="file" accept="image/*" className="hidden" onChange={handleImage} />
          </label>
          {form.imageUrl ? (
            <img
              src={form.imageUrl}
              alt="灵感图片预览"
              className="mt-3 h-40 w-full rounded-2xl object-cover"
            />
          ) : null}
        </div>
        <button
          type="submit"
          disabled={!canSave || saving}
          className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-ink px-4 py-3 text-sm font-black text-white disabled:cursor-not-allowed disabled:opacity-50"
        >
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          保存
        </button>
      </form>

      <section className="grid content-start gap-4 md:grid-cols-2">
        {loading ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-6 text-slate-500">
            正在读取 SQLite...
          </div>
        ) : null}
        {!loading && !items.length ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-500 md:col-span-2">
            还没有灵感记录。写下第一杯吧。
          </div>
        ) : null}
        {items.map((item) => (
          <article key={item.id} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            {item.imageUrl ? (
              <img src={item.imageUrl} alt={item.title} className="h-44 w-full object-cover" />
            ) : (
              <div className="h-24 bg-mist" />
            )}
            <div className="p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-lg font-black text-ink">{item.title}</h3>
                  <p className="mt-1 text-xs font-bold text-slate-400">
                    {new Date(item.updatedAt).toLocaleString("zh-CN")}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    title="编辑"
                    aria-label="编辑"
                    onClick={() => edit(item)}
                    className="grid h-9 w-9 place-items-center rounded-xl bg-slate-100 text-ink"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    title="删除"
                    aria-label="删除"
                    onClick={() => remove(item.id)}
                    className="grid h-9 w-9 place-items-center rounded-xl bg-slate-100 text-ink"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {item.moodTags.map((tag) => (
                  <span key={tag} className="rounded-full bg-sky-100 px-2.5 py-1 text-xs font-bold text-ink">
                    {tag}
                  </span>
                ))}
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-600">{item.note}</p>
              {item.recipeBackup ? (
                <pre className="mt-4 whitespace-pre-wrap rounded-2xl bg-slate-50 p-3 text-xs leading-5 text-slate-600">
                  {item.recipeBackup}
                </pre>
              ) : null}
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
