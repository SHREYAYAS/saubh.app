"use client";

import { useEffect, useState } from "react";

type ThemeKey = "system" | "light" | "dark";

// Keep all classes explicit so Tailwind includes them in the build
const THEME_CLASSES: Record<ThemeKey, string[]> = {
  system: [], // Will be determined by system preference
  light: [
    "bg-gradient-to-br",
    "from-indigo-50",
    "via-purple-50",
    "to-pink-50",
    "text-gray-900",
  ],
  dark: [
    "bg-gradient-to-br",
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
  const [theme, setTheme] = useState<ThemeKey>("system");
  const [mounted, setMounted] = useState(false);

  // Determine system preference
  const getSystemTheme = (): "light" | "dark" => {
    if (typeof window === "undefined") return "light";
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  };

  // Apply theme to <body>
  const applyTheme = (key: ThemeKey) => {
    if (typeof document === "undefined") return;
    const body = document.body;
    const html = document.documentElement;
    
    // Remove all known theme tokens
    body.classList.remove(...ALL_THEME_TOKENS);
    
    // Determine actual theme to apply
    const actualTheme = key === "system" ? getSystemTheme() : key;
    
    // Add chosen theme tokens
    body.classList.add(...THEME_CLASSES[actualTheme]);
    
    // Toggle class-based dark mode for Tailwind
    if (actualTheme === "dark") {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
  };

  useEffect(() => {
    setMounted(true);
    const saved = (localStorage.getItem("saubh-theme") as ThemeKey) || "system";
    setTheme(saved);
    applyTheme(saved);

    // Listen for system theme changes
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      if (saved === "system") {
        applyTheme("system");
      }
    };
    mediaQuery.addEventListener("change", handleChange);
    
    return () => mediaQuery.removeEventListener("change", handleChange);
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
      <label className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
        <span className="hidden md:inline">Theme:</span>
        <select
          aria-label="Select theme"
          disabled
          className="rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-800 dark:text-gray-200 px-2 py-1 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option>System</option>
        </select>
      </label>
    );
  }

  return (
    <label className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
      <span className="hidden md:inline">Theme:</span>
      <select
        aria-label="Select theme"
        value={theme}
        onChange={(e) => onChange(e.target.value as ThemeKey)}
        className="rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-800 dark:text-gray-200 px-2 py-1 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        <option value="system">System</option>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
    </label>
  );
}
