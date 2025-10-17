import { Button } from "@/components/ui/button"
import { Bell, Settings, User, Menu } from "lucide-react"
import Link from "next/link"

export function DashboardHeader() {
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
            <Link
              href="/"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Dashboard
            </Link>
            <Link
              href="/partnership"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Partnership
            </Link>
            <Link
              href="/lipat-bahay"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Lipat Bahay
            </Link>
            <Link
              href="/trucks"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Fleet
            </Link>
            <Link
              href="/employees"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Employees
            </Link>
            <Link
              href="/operations"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Operations
            </Link>
            <Link
              href="/soa"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              SOA
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
