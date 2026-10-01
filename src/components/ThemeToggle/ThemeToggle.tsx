"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

function ThemeToggle({ label }: { label: string }) {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      className="inline-flex size-7 items-center justify-center rounded-lg text-ink-soft transition-colors duration-200 hover:bg-paper-shade hover:text-dye"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
    >
      <Sun className="size-4 dark:hidden" />
      <Moon className="hidden size-4 dark:block" />
    </button>
  );
}

export default ThemeToggle;
