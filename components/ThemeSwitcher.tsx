"use client";

import { useEffect, useState } from "react";

type ThemeKey = "default" | "cooler" | "warmer" | "dark";

// Keep all classes explicit so Tailwind includes them in the build
const THEME_CLASSES: Record<ThemeKey, string[]> = {
  default: [
    "bg-linear-to-br",
    "from-slate-50",
    "via-indigo-50",
    "to-pink-50",
    "text-gray-900",
  ],
  cooler: [
    "bg-linear-to-br",
    "from-slate-100",
    "via-sky-50",
    "to-blue-50",
    "text-gray-900",
  ],
  warmer: [
    "bg-linear-to-br",
    "from-rose-50",
    "via-orange-50",
    "to-amber-50",
    "text-gray-900",
  ],
  dark: [
    "bg-linear-to-br",
    "from-slate-900",
    "via-slate-800",
    "to-indigo-900",
    "text-white",
  ],
};

const ALL_THEME_TOKENS = Array.from(
  new Set(Object.values(THEME_CLASSES).flat())
);

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState<ThemeKey>("default");
  const [mounted, setMounted] = useState(false);

  // Apply theme to <body>
  const applyTheme = (key: ThemeKey) => {
    if (typeof document === "undefined") return;
    const body = document.body;
    const html = document.documentElement;
    // Remove all known theme tokens
    body.classList.remove(...ALL_THEME_TOKENS);
    // Add chosen theme tokens
    body.classList.add(...THEME_CLASSES[key]);
    // Toggle class-based dark mode for Tailwind
    if (key === "dark") {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
  };

  useEffect(() => {
    setMounted(true);
    const saved = (localStorage.getItem("saubh-theme") as ThemeKey) || "default";
    setTheme(saved);
    applyTheme(saved);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChange = (key: ThemeKey) => {
    setTheme(key);
    localStorage.setItem("saubh-theme", key);
    applyTheme(key);
  };

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <label className="inline-flex items-center gap-2 text-sm text-gray-600">
        <span className="hidden md:inline">Theme:</span>
        <select
          aria-label="Select theme"
          disabled
          className="rounded-md border border-gray-300 bg-white px-2 py-1 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option>Default</option>
        </select>
      </label>
    );
  }

  return (
    <label className="inline-flex items-center gap-2 text-sm text-gray-600">
      <span className="hidden md:inline">Theme:</span>
      <select
        aria-label="Select theme"
        value={theme}
        onChange={(e) => onChange(e.target.value as ThemeKey)}
        className="rounded-md border border-gray-300 bg-white px-2 py-1 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        <option value="default">Default</option>
        <option value="cooler">Cooler</option>
        <option value="warmer">Warmer</option>
        <option value="dark">Dark</option>
      </select>
    </label>
  );
}
