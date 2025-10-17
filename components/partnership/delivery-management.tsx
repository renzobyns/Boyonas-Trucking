"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Search, MapPin, Truck, User, MoreHorizontal, Plus, Upload, FileText } from "lucide-react"
import { useState } from "react"

export function DeliveryManagement() {
  const [isNewDeliveryOpen, setIsNewDeliveryOpen] = useState(false)

  const deliveries = [
    {
      id: "DEL-001",
      partner: "SPX Express (Shopee)",
      route: "Pasig → Laguna → Batangas",
      truck: "ABC-1234",
      driver: "Juan Santos",
      helper: "Pedro Cruz",
      status: "OTW to Destination",
      drNumber: "DR-2024-001",
      date: "2024-01-15",
      time: "08:00 AM",
      documents: ["POD", "DR Copy"],
    },
    {
      id: "DEL-002",
      partner: "SPX Express (Shopee)",
      route: "Manila → Cavite",
      truck: "DEF-9012",
      driver: "Maria Garcia",
      helper: "Ana Reyes",
      status: "Loading",
      drNumber: "DR-2024-002",
      date: "2024-01-15",
      time: "09:30 AM",
      documents: ["DR Copy"],
    },
    {
      id: "DEL-003",
      partner: "SPX Express (Shopee)",
      route: "Quezon City → Bulacan",
      truck: "GHI-3456",
      driver: "Carlos Santos",
      helper: null,
      status: "Completed",
      drNumber: "DR-2024-003",
      date: "2024-01-14",
      time: "07:00 AM",
      documents: ["POD", "DR Copy", "Receipt"],
    },
    {
      id: "DEL-004",
      partner: "SPX Express (Shopee)",
      route: "Makati → Rizal → Antipolo",
      truck: "JKL-7890",
      driver: "Roberto Dela Cruz",
      helper: "Miguel Santos",
      status: "OTW to SOC",
      drNumber: "DR-2024-004",
      date: "2024-01-15",
      time: "01:00 PM",
      documents: [],
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "OTW to Destination":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "Loading":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "OTW to SOC":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
      case "Unloading":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300"
      case "Incomplete":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>SPX Express Delivery Operations</CardTitle>
            <CardDescription>Manage Shopee partnership delivery assignments and tracking</CardDescription>
          </div>
          <Dialog open={isNewDeliveryOpen} onOpenChange={setIsNewDeliveryOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                New Delivery
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Delivery</DialogTitle>
                <DialogDescription>Fill in the delivery details for SPX Express</DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input id="date" type="date" defaultValue={new Date().toISOString().split("T")[0]} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">Time</Label>
                  <Input id="time" type="time" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dr-number">DR Number</Label>
                  <Input id="dr-number" placeholder="DR-2024-XXX" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="truck">Assign Truck</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select truck" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ABC-1234">ABC-1234</SelectItem>
                      <SelectItem value="DEF-9012">DEF-9012</SelectItem>
                      <SelectItem value="GHI-3456">GHI-3456</SelectItem>
                      <SelectItem value="JKL-7890">JKL-7890</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="driver">Assign Driver</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select driver" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="juan">Juan Santos</SelectItem>
                      <SelectItem value="maria">Maria Garcia</SelectItem>
                      <SelectItem value="carlos">Carlos Santos</SelectItem>
                      <SelectItem value="roberto">Roberto Dela Cruz</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="helper">Helper (Optional)</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select helper" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      <SelectItem value="pedro">Pedro Cruz</SelectItem>
                      <SelectItem value="ana">Ana Reyes</SelectItem>
                      <SelectItem value="luis">Luis Cruz</SelectItem>
                      <SelectItem value="miguel">Miguel Santos</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="col-span-2 space-y-2">
                  <Label htmlFor="route">Route</Label>
                  <Textarea id="route" placeholder="Origin → Destination (e.g., Manila → Cavite → Laguna)" />
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsNewDeliveryOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsNewDeliveryOpen(false)}>Create Delivery</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Search and Filter Controls */}
        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search by DR number, route, or driver..." className="pl-10" />
          </div>
          <Select>
            <SelectTrigger className="w-full sm:w-[150px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="otw-soc">OTW to SOC</SelectItem>
              <SelectItem value="loading">Loading</SelectItem>
              <SelectItem value="otw-destination">OTW to Destination</SelectItem>
              <SelectItem value="unloading">Unloading</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="incomplete">Incomplete</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {deliveries.map((delivery) => (
            <div key={delivery.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors space-y-3">
              {/* Header Row */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Truck className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold">{delivery.id}</span>
                      <Badge variant="outline" className="text-xs">
                        SPX Express
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">{delivery.drNumber}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Select defaultValue={delivery.status.toLowerCase().replace(/\s+/g, "-")}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="otw-to-soc">OTW to SOC</SelectItem>
                      <SelectItem value="loading">Loading</SelectItem>
                      <SelectItem value="otw-to-destination">OTW to Destination</SelectItem>
                      <SelectItem value="unloading">Unloading</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="incomplete">Incomplete</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Route and Vehicle Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Route:</span>
                    <span>{delivery.route}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Truck className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Vehicle:</span>
                    <span>{delivery.truck}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-sm">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Team:</span>
                    <span>
                      {delivery.driver}
                      {delivery.helper ? ` & ${delivery.helper}` : " (No helper)"}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <span className="font-medium">Date & Time:</span>
                    <span>
                      {delivery.date} at {delivery.time}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t">
                <div className="flex items-center space-x-2">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Documents:</span>
                  {delivery.documents.length > 0 ? (
                    <div className="flex space-x-1">
                      {delivery.documents.map((doc, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {doc}
                        </Badge>
                      ))}
                    </div>
                  ) : (
                    <span className="text-sm text-muted-foreground">No documents uploaded</span>
                  )}
                </div>
                <Button variant="outline" size="sm">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
