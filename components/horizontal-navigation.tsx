"use client"

import { Button } from "@/components/ui/button"
import { Bell, Settings, User, Menu } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const navigationItems = [
  { title: "Dashboard", href: "/" },
  { title: "Services", href: "/services" },
  { title: "Fleet", href: "/trucks" },
  { title: "Employees", href: "/employees" },
  { title: "Operations", href: "/operations" },
  { title: "SOA", href: "/soa" },
]

export function HorizontalNavigation() {
  const pathname = usePathname()

  return (
    <header className="border-b bg-card">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">B</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Boyonas Trucking</h1>
                <p className="text-sm text-muted-foreground">Service Management System</p>
              </div>
            </div>
          </div>

          <nav className="hidden md:flex items-center space-x-6">
            {navigationItems.map((item) => {
              const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "text-sm font-medium transition-colors",
                    isActive ? "text-primary" : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {item.title}
                </Link>
              )
            })}
            <Link
              href="/settings"
              className={cn(
                "text-sm font-medium transition-colors",
                pathname === "/settings" ? "text-primary" : "text-muted-foreground hover:text-foreground",
              )}
            >
              Settings
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <Link href="/settings">
              <Button variant="ghost" size="icon">
                <Settings className="h-5 w-5" />
              </Button>
            </Link>
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
