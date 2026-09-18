"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

// Both icons are always rendered and CSS decides which one shows, so server and
// client render the same markup: no flash, no hydration mismatch.
export function ThemeToggle({ label }: { label: string }) {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label={label}
      title={label}
      className="size-7 text-ink-soft hover:bg-paper-shade hover:text-dye"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
    >
      <Sun className="size-4 dark:hidden" />
      <Moon className="hidden size-4 dark:block" />
    </Button>
  );
}
