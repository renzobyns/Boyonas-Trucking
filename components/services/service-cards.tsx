"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Package, Home, CheckCircle, Clock, TrendingUp } from "lucide-react"

export function ServiceCards() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Service Categories</h2>
        <p className="text-muted-foreground">Performance breakdown by service type</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Link href="/partnership" className="group">
          <Card className="relative overflow-hidden border-2 cursor-pointer transition-all duration-300 hover:shadow-lg hover:border-primary/50 group-hover:scale-105">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-transparent rounded-full -translate-y-16 translate-x-16" />
            <CardHeader className="relative">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Package className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">Partnership Deliveries</CardTitle>
                    <CardDescription>B2B logistics operations</CardDescription>
                  </div>
                </div>
                <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                  SPX
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">156</div>
                  <div className="text-xs text-muted-foreground">Total Deliveries (Month)</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">12</div>
                  <div className="text-xs text-muted-foreground">Deliveries Today</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">₱2.1M</div>
                  <div className="text-xs text-muted-foreground">Monthly Revenue</div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="space-y-3">
                <p className="text-sm font-medium text-muted-foreground">Recent Activity</p>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>12 deliveries completed today</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Clock className="h-4 w-4 text-blue-500" />
                    <span>8 deliveries in progress</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <TrendingUp className="h-4 w-4 text-green-500" />
                    <span>15% increase from last week</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/lipat-bahay" className="group">
          <Card className="relative overflow-hidden border-2 cursor-pointer transition-all duration-300 hover:shadow-lg hover:border-accent/50 group-hover:scale-105">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-accent/10 to-transparent rounded-full -translate-y-16 translate-x-16" />
            <CardHeader className="relative">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                    <Home className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">Lipat Bahay Services</CardTitle>
                    <CardDescription>Household moving & retail deliveries</CardDescription>
                  </div>
                </div>
                <Badge variant="secondary" className="bg-accent/10 text-accent border-accent/20">
                  Retail
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent">87</div>
                  <div className="text-xs text-muted-foreground">Total Bookings (Month)</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">4</div>
                  <div className="text-xs text-muted-foreground">Bookings Today</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">₱850K</div>
                  <div className="text-xs text-muted-foreground">Monthly Revenue</div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="space-y-3">
                <p className="text-sm font-medium text-muted-foreground">Recent Activity</p>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>3 moves completed today</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Clock className="h-4 w-4 text-blue-500" />
                    <span>5 bookings scheduled</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <TrendingUp className="h-4 w-4 text-green-500" />
                    <span>8% increase from last week</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  )
}
