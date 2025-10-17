import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Building2, Home, ArrowRight } from "lucide-react"
import Link from "next/link"

export function ServiceSelection() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Service Operations</h2>
        <p className="text-muted-foreground">Select a service type to manage deliveries and operations</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Partnership Deliveries */}
        <Link href="/partnership">
          <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-2 hover:border-primary/20 h-full">
            <CardHeader className="pb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Building2 className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-xl">Partnership Deliveries</CardTitle>
                  <CardDescription>B2B logistics operations</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Today's Routes</span>
                  <span className="font-medium">8 deliveries</span>
                </div>
              </div>
              <Button className="w-full group-hover:bg-primary group-hover:text-primary-foreground">
                Manage Partnership Operations
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </Link>

        {/* Lipat Bahay Services */}
        <Link href="/lipat-bahay">
          <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-2 hover:border-accent/20 h-full">
            <CardHeader className="pb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                  <Home className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <CardTitle className="text-xl">Lipat Bahay Services</CardTitle>
                  <CardDescription>Household moving & retail deliveries</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Bookings Today</span>
                  <span className="font-medium">4 scheduled</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Total Deliveries (Month)</span>
                  <span className="font-medium">87 deliveries</span>
                </div>
              </div>
              <Button
                variant="outline"
                className="w-full group-hover:bg-accent group-hover:text-accent-foreground group-hover:border-accent bg-transparent"
              >
                Manage Lipat Bahay Services
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  )
}
