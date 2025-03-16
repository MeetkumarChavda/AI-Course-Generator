"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="rounded-md p-2 bg-secondary text-secondary-foreground hover:bg-secondary/80 relative w-10 h-10 flex items-center justify-center overflow-hidden"
      aria-label="Toggle theme"
    >
      <div className="relative w-5 h-5">
        <Sun className="absolute inset-0 h-full w-full transition-all duration-300 ease-in-out transform rotate-0 scale-100 dark:rotate-90 dark:scale-0" />
        <Moon className="absolute inset-0 h-full w-full transition-all duration-300 ease-in-out transform -rotate-90 scale-0 dark:rotate-0 dark:scale-100" />
      </div>
      <span className="sr-only">Toggle theme</span>
    </button>
  )
} 