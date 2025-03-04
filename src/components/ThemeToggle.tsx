
import React from "react";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "./ThemeProvider";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="rounded-full w-9 h-9 relative"
      aria-label="Toggle theme"
    >
      <Sun className={`h-5 w-5 transition-all ${theme !== 'dark' ? 'scale-100 rotate-0' : 'scale-0 -rotate-90 absolute'}`} />
      <Moon className={`h-5 w-5 transition-all ${theme === 'dark' ? 'scale-100 rotate-0' : 'scale-0 rotate-90 absolute'}`} />
    </Button>
  );
}
