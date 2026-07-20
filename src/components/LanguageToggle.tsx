"use client";

import { useLanguage } from "@/lib/language";

export default function LanguageToggle() {
  const { lang, setLang } = useLanguage();

  return (
    <div className="flex gap-1 rounded-full border border-[var(--border)] bg-[var(--surface)] p-1">
      <button
        onClick={() => setLang("en")}
        style={lang === "en" ? { backgroundColor: "#2d4a3e", color: "#fff" } : {}}
        className="rounded-full px-3 py-1 text-xs font-bold text-[var(--muted)] transition"
      >
        EN
      </button>
      <button
        onClick={() => setLang("haw")}
        style={lang === "haw" ? { backgroundColor: "#2d4a3e", color: "#fff" } : {}}
        className="rounded-full px-3 py-1 text-xs font-bold text-[var(--muted)] transition"
      >
        ʻŌH
      </button>
    </div>
  );
}