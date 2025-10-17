"use client"

import type React from "react"

import { useSettings } from "@/contexts/settings-context"
import { SidebarNavigation } from "@/components/sidebar-navigation"
import { HorizontalNavigation } from "@/components/horizontal-navigation"
import { usePathname } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { cn } from "@/lib/utils"

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const { navigationStyle } = useSettings()
  const pathname = usePathname()
  const { user } = useAuth()

  const isLoginPage = pathname === "/login"
  const isDriverPage = pathname === "/driver" || (user?.roleId === 2 && pathname.startsWith("/driver"))

  if (isLoginPage || isDriverPage) {
    return <main className="min-h-screen bg-background">{children}</main>
  }

  if (navigationStyle === "horizontal") {
    return (
      <div className="min-h-screen bg-background">
        <HorizontalNavigation />
        <main className="container mx-auto px-6 py-8">{children}</main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <SidebarNavigation />
      <main className={cn("transition-all duration-300 md:ml-64", "min-h-screen p-6")}>{children}</main>
    </div>
  )
}
