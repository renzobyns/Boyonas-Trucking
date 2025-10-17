"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Navigation, Phone } from "lucide-react"

export function LiveTracking() {
  const activeDeliveries = [
    {
      id: "DEL-001",
      driver: "Juan Santos",
      truck: "ABC-1234",
      route: "Pasig → Laguna",
      status: "OTW to Destination",
      customer: "Flash Express Hub",
      contact: "+63 917 123 4567",
    },
    {
      id: "LB-045",
      driver: "Maria Cruz",
      truck: "XYZ-5678",
      route: "Makati → Quezon City",
      status: "Loading",
      customer: "Rodriguez Family",
      contact: "+63 918 234 5678",
    },
    {
      id: "DEL-002",
      driver: "Pedro Reyes",
      truck: "DEF-9012",
      route: "Manila → Cavite",
      status: "OTW to SOC",
      customer: "LBC Branch",
      contact: "+63 919 345 6789",
    },
    {
      id: "LB-046",
      driver: "Ana Garcia",
      truck: "GHI-3456",
      route: "Taguig → Antipolo",
      status: "Unloading",
      customer: "Dela Cruz Family",
      contact: "+63 920 456 7890",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "OTW to SOC":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "Loading":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "OTW to Destination":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
      case "Unloading":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300"
      case "Completed":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "Incomplete":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Navigation className="h-5 w-5" />
          Live Tracking
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activeDeliveries.map((delivery) => (
            <div key={delivery.id} className="border rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div>
                    <div className="font-semibold">{delivery.id}</div>
                    <div className="text-sm text-muted-foreground">{delivery.customer}</div>
                  </div>
                </div>
                <Badge className={getStatusColor(delivery.status)}>{delivery.status}</Badge>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>{delivery.route}</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm">
                  <span className="text-muted-foreground">Driver:</span> {delivery.driver} • {delivery.truck}
                </div>
                <Button variant="outline" size="sm" onClick={() => alert(`Contacting: ${delivery.contact}`)}>
                  <Phone className="h-4 w-4 mr-1" />
                  Contact
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
