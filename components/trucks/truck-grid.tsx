"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Truck, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { TruckDetailsModal } from "./truck-details-modal"
import { database } from "@/lib/db-utils"

export function TruckGrid() {
  const [selectedTruck, setSelectedTruck] = useState<any>(null)
  const [showDetails, setShowDetails] = useState(false)

  const trucks = database.trucks || []

  const getDeliveryStatusColor = (status: string) => {
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

  const getTruckStatusColor = (status: string) => {
    switch (status) {
      case "Okay to Use":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "Not Okay to Use":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      case "Needs Document Renewal":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleStatusChange = (truck: any, newStatus: string) => {
    const truckIndex = database.trucks.findIndex((t: any) => t.truckId === truck.truckId)
    if (truckIndex !== -1) {
      database.trucks[truckIndex].operationalStatus = newStatus
      console.log("[v0] Truck status updated:", newStatus)
    }
  }

  const handleViewDetails = (truck: any) => {
    setSelectedTruck(truck)
    setShowDetails(true)
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Fleet Overview</CardTitle>
          <CardDescription>Monitor all trucks and their operational status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {trucks.map((truck: any) => (
              <Card key={truck.truckId} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Truck className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{truck.plateNumber}</CardTitle>
                        <CardDescription>
                          {truck.model} • {truck.capacity} kg • {truck.year}
                        </CardDescription>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleStatusChange(truck, "Available")}>
                          Available
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleStatusChange(truck, "On Delivery")}>
                          On Delivery
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleStatusChange(truck, "Maintenance")}>
                          Maintenance
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="text-sm font-medium text-muted-foreground">Operational Status</div>
                    <Badge className={getTruckStatusColor(truck.status)}>{truck.status}</Badge>
                  </div>

                  {/* Driver and Route Info */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="font-medium">Document Status</div>
                      <div className="text-muted-foreground">{truck.documentStatus}</div>
                    </div>
                    <div>
                      <div className="font-medium">Operational</div>
                      <div className="text-muted-foreground">{truck.operationalStatus}</div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-2 pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 bg-transparent"
                      onClick={() => handleViewDetails(truck)}
                    >
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {selectedTruck && <TruckDetailsModal truck={selectedTruck} open={showDetails} onOpenChange={setShowDetails} />}
    </>
  )
}
