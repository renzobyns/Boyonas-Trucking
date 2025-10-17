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
import { Search, MapPin, Home, User, Phone, MoreHorizontal, Package, Plus, Upload, FileText } from "lucide-react"
import { useState } from "react"

export function BookingManagement() {
  const [isNewBookingOpen, setIsNewBookingOpen] = useState(false)

  const bookings = [
    {
      id: "LB-045",
      customerName: "Maria Santos",
      customerPhone: "+63 917 123 4567",
      fromAddress: "123 Makati Ave, Makati City",
      toAddress: "456 Quezon Ave, Quezon City",
      truck: "XYZ-5678",
      driver: "Carlos Reyes",
      helpers: ["Pedro Cruz", "Juan Garcia"],
      status: "Completed",
      bookingDate: "2024-01-15",
      serviceDate: "2024-01-15",
      startTime: "08:00 AM",
      items: ["Living room set", "Bedroom furniture", "Kitchen appliances", "Boxes (15)"],
      rate: "₱4,200",
      notes: "3rd floor apartment, no elevator",
      documents: ["Contract", "Inventory List", "Receipt"],
    },
    {
      id: "LB-046",
      customerName: "Roberto Dela Cruz",
      customerPhone: "+63 918 987 6543",
      fromAddress: "789 Taguig Blvd, Taguig City",
      toAddress: "321 Antipolo St, Antipolo City",
      truck: "GHI-3456",
      driver: "Ana Garcia",
      helpers: ["Luis Santos", "Miguel Cruz"],
      status: "Loading",
      bookingDate: "2024-01-14",
      serviceDate: "2024-01-15",
      startTime: "10:00 AM",
      items: ["2-bedroom furniture", "Appliances", "Personal items", "Boxes (20)"],
      rate: "₱3,800",
      notes: "Ground floor to 2nd floor",
      documents: ["Contract", "Inventory List"],
    },
    {
      id: "LB-047",
      customerName: "Jennifer Lim",
      customerPhone: "+63 919 555 1234",
      fromAddress: "555 Pasig Rd, Pasig City",
      toAddress: "777 Marikina Ave, Marikina City",
      truck: "JKL-7890",
      driver: "Mark Santos",
      helpers: ["Tony Reyes", "Ben Garcia"],
      status: "OTW to Pickup",
      bookingDate: "2024-01-13",
      serviceDate: "2024-01-16",
      startTime: "09:00 AM",
      items: ["Studio apartment", "Small appliances", "Boxes (10)"],
      rate: "₱2,800",
      notes: "Condo unit, service elevator available",
      documents: ["Contract"],
    },
    {
      id: "LB-048",
      customerName: "David Chen",
      customerPhone: "+63 920 777 8888",
      fromAddress: "888 Manila St, Manila City",
      toAddress: "999 Caloocan Ave, Caloocan City",
      truck: "MNO-2468",
      driver: "Rosa Cruz",
      helpers: ["Alex Santos", "Joe Garcia"],
      status: "Confirmed",
      bookingDate: "2024-01-15",
      serviceDate: "2024-01-17",
      startTime: "07:00 AM",
      items: ["1-bedroom furniture", "Electronics", "Clothing", "Boxes (12)"],
      rate: "₱3,200",
      notes: "Early morning preferred",
      documents: [],
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "OTW to Pickup":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "Loading":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "OTW to Destination":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
      case "Unloading":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300"
      case "Confirmed":
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
      case "Incomplete":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Lipat Bahay Booking Management</CardTitle>
            <CardDescription>Manage household moving bookings and customer requests</CardDescription>
          </div>
          <Dialog open={isNewBookingOpen} onOpenChange={setIsNewBookingOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                New Booking
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create New Lipat Bahay Booking</DialogTitle>
                <DialogDescription>Fill in the booking details for household moving service</DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="service-date">Service Date</Label>
                  <Input id="service-date" type="date" defaultValue={new Date().toISOString().split("T")[0]} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="start-time">Start Time</Label>
                  <Input id="start-time" type="time" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="customer-name">Customer Name</Label>
                  <Input id="customer-name" placeholder="Full name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="customer-phone">Phone Number</Label>
                  <Input id="customer-phone" placeholder="+63 XXX XXX XXXX" />
                </div>
                <div className="col-span-2 space-y-2">
                  <Label htmlFor="from-address">From Address</Label>
                  <Textarea id="from-address" placeholder="Complete pickup address" />
                </div>
                <div className="col-span-2 space-y-2">
                  <Label htmlFor="to-address">To Address</Label>
                  <Textarea id="to-address" placeholder="Complete delivery address" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="truck-assign">Assign Truck</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select truck" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="XYZ-5678">XYZ-5678</SelectItem>
                      <SelectItem value="GHI-3456">GHI-3456</SelectItem>
                      <SelectItem value="JKL-7890">JKL-7890</SelectItem>
                      <SelectItem value="MNO-2468">MNO-2468</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="driver-assign">Assign Driver</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select driver" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="carlos">Carlos Reyes</SelectItem>
                      <SelectItem value="ana">Ana Garcia</SelectItem>
                      <SelectItem value="mark">Mark Santos</SelectItem>
                      <SelectItem value="rosa">Rosa Cruz</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="col-span-2 space-y-2">
                  <Label htmlFor="helpers">Helpers (Select multiple)</Label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      "Pedro Cruz",
                      "Juan Garcia",
                      "Luis Santos",
                      "Miguel Cruz",
                      "Tony Reyes",
                      "Ben Garcia",
                      "Alex Santos",
                      "Joe Garcia",
                    ].map((helper) => (
                      <label key={helper} className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded" />
                        <span className="text-sm">{helper}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="col-span-2 space-y-2">
                  <Label htmlFor="items">Items to Move</Label>
                  <Textarea id="items" placeholder="List all items and furniture to be moved" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rate">Service Rate</Label>
                  <Input id="rate" placeholder="₱0.00" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="estimated-duration">Estimated Duration</Label>
                  <Input id="estimated-duration" placeholder="e.g., 4-6 hours" />
                </div>
                <div className="col-span-2 space-y-2">
                  <Label htmlFor="special-notes">Special Notes</Label>
                  <Textarea id="special-notes" placeholder="Any special instructions or considerations" />
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsNewBookingOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsNewBookingOpen(false)}>Create Booking</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Search and Filter Controls */}
        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search by booking ID, customer name, or location..." className="pl-10" />
          </div>
          <Select>
            <SelectTrigger className="w-full sm:w-[150px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="confirmed">Confirmed</SelectItem>
              <SelectItem value="otw-pickup">OTW to Pickup</SelectItem>
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
        <div className="space-y-6">
          {bookings.map((booking) => (
            <div key={booking.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors space-y-4">
              {/* Header Row */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                    <Home className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold">{booking.id}</span>
                      <Badge variant="outline" className="text-xs">
                        Lipat Bahay
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Booked: {booking.bookingDate} | Service: {booking.serviceDate}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="text-right mr-2">
                    <div className="font-semibold text-accent">{booking.rate}</div>
                    <div className="text-xs text-muted-foreground">Total</div>
                  </div>
                  <Select defaultValue={booking.status.toLowerCase().replace(/\s+/g, "-")}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="confirmed">Confirmed</SelectItem>
                      <SelectItem value="otw-to-pickup">OTW to Pickup</SelectItem>
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

              {/* Customer and Location Info */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 text-sm">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Customer:</span>
                    <span>{booking.customerName}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Contact:</span>
                    <span>{booking.customerPhone}</span>
                  </div>
                  <div className="flex items-start space-x-2 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <div>
                      <div className="font-medium">From:</div>
                      <div className="text-muted-foreground">{booking.fromAddress}</div>
                      <div className="font-medium mt-1">To:</div>
                      <div className="text-muted-foreground">{booking.toAddress}</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center space-x-2 text-sm">
                    <span className="font-medium">Time:</span>
                    <span>{booking.startTime}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <span className="font-medium">Vehicle:</span>
                    <span>{booking.truck}</span>
                  </div>
                  <div className="flex items-start space-x-2 text-sm">
                    <span className="font-medium">Team:</span>
                    <div>
                      <div>Driver: {booking.driver}</div>
                      <div>Helpers: {booking.helpers.join(", ")}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Items and Notes */}
              <div className="space-y-3">
                <div className="flex items-start space-x-2 text-sm">
                  <Package className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <div>
                    <span className="font-medium">Items to move:</span>
                    <div className="text-muted-foreground mt-1">{booking.items.join(" • ")}</div>
                  </div>
                </div>
                {booking.notes && (
                  <div className="text-sm">
                    <span className="font-medium">Special Notes:</span>
                    <div className="text-muted-foreground mt-1 italic">{booking.notes}</div>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between pt-2 border-t">
                <div className="flex items-center space-x-2">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Documents:</span>
                  {booking.documents.length > 0 ? (
                    <div className="flex space-x-1">
                      {booking.documents.map((doc, index) => (
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
