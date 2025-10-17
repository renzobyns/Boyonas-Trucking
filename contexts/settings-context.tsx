"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"

type Theme = "light" | "dark"
type NavigationStyle = "sidebar" | "horizontal"

interface SettingsContextType {
  theme: Theme
  navigationStyle: NavigationStyle
  toggleTheme: () => void
  setNavigationStyle: (style: NavigationStyle) => void
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined)

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light")
  const [navigationStyle, setNavigationStyle] = useState<NavigationStyle>("sidebar")

  useEffect(() => {
    // Load settings from localStorage
    const savedTheme = localStorage.getItem("boyonas-theme") as Theme
    const savedNavStyle = localStorage.getItem("boyonas-nav-style") as NavigationStyle

    if (savedTheme) {
      setTheme(savedTheme)
      document.documentElement.classList.toggle("dark", savedTheme === "dark")
    }

    if (savedNavStyle) {
      setNavigationStyle(savedNavStyle)
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light"
    setTheme(newTheme)
    localStorage.setItem("boyonas-theme", newTheme)
    document.documentElement.classList.toggle("dark", newTheme === "dark")
  }

  const handleSetNavigationStyle = (style: NavigationStyle) => {
    setNavigationStyle(style)
    localStorage.setItem("boyonas-nav-style", style)
  }

  return (
    <SettingsContext.Provider
      value={{
        theme,
        navigationStyle,
        toggleTheme,
        setNavigationStyle: handleSetNavigationStyle,
      }}
    >
      {children}
    </SettingsContext.Provider>
  )
}

export function useSettings() {
  const context = useContext(SettingsContext)
  if (context === undefined) {
    throw new Error("useSettings must be used within a SettingsProvider")
  }
  return context
}
