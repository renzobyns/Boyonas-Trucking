"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin, Package, Truck, Clock, CheckCircle, XCircle } from "lucide-react"
import { DeliveryProgressTracker } from "./delivery-progress-tracker"
import { ProofOfDeliveryUpload } from "./proof-of-delivery-upload"

interface BookingDetailModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  assignment: any
  booking: any
  truck: any
  helper: any
  onStatusChange: (newStatus: string) => void
}

const DELIVERY_STATUSES = [
  "Pending",
  "OTW to SOC",
  "Loading",
  "OTW to Destination",
  "Unloading",
  "Completed",
  "Incomplete",
]

export function BookingDetailModal({
  open,
  onOpenChange,
  assignment,
  booking,
  truck,
  helper,
  onStatusChange,
}: BookingDetailModalProps) {
  const [selectedStatus, setSelectedStatus] = useState(assignment.currentStatus)
  const isPartnership = "drNumber" in booking
  const drNumber = isPartnership ? booking.drNumber : `LP-${booking.bookingId}`

  const handleStartDelivery = () => {
    onStatusChange("OTW to SOC")
    setSelectedStatus("OTW to SOC")
  }

  const handleStatusChange = (newStatus: string) => {
    onStatusChange(newStatus)
    setSelectedStatus(newStatus)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-800"
      case "OTW to SOC":
      case "OTW to Pickup":
        return "bg-blue-100 text-blue-800"
      case "Loading":
        return "bg-purple-100 text-purple-800"
      case "OTW to Destination":
        return "bg-indigo-100 text-indigo-800"
      case "Unloading":
        return "bg-orange-100 text-orange-800"
      case "Completed":
        return "bg-green-100 text-green-800"
      case "Incomplete":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between gap-4">
            <div>
              <DialogTitle className="text-2xl">{drNumber}</DialogTitle>
              <p className="text-sm text-muted-foreground mt-1">
                {isPartnership ? booking.partnerName : booking.customerName}
              </p>
            </div>
            <Badge className={getStatusColor(selectedStatus)}>{selectedStatus}</Badge>
          </div>
        </DialogHeader>

        <Tabs defaultValue="details" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="progress">Progress</TabsTrigger>
            <TabsTrigger value="proof">Proof</TabsTrigger>
          </TabsList>

          {/* Details Tab */}
          <TabsContent value="details" className="space-y-4">
            {/* Booking Details Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Booking Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex gap-3">
                    <MapPin className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs text-muted-foreground">Origin</p>
                      <p className="font-medium text-sm">{isPartnership ? booking.routeFrom : booking.fromAddress}</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <MapPin className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs text-muted-foreground">Destination</p>
                      <p className="font-medium text-sm">{isPartnership ? booking.routeTo : booking.toAddress}</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Package className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs text-muted-foreground">Cargo</p>
                      <p className="font-medium text-sm">{booking.category}</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Package className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs text-muted-foreground">Weight</p>
                      <p className="font-medium text-sm">{booking.estimatedWeight} kg</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Truck className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs text-muted-foreground">Truck</p>
                      <p className="font-medium text-sm">{truck?.plateNumber}</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Clock className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs text-muted-foreground">Scheduled</p>
                      <p className="font-medium text-sm">{new Date(booking.scheduledStart).toLocaleString()}</p>
                    </div>
                  </div>
                </div>

                {assignment.remarks && (
                  <div className="pt-4 border-t">
                    <p className="text-xs text-muted-foreground mb-2">Notes</p>
                    <p className="text-sm bg-muted p-3 rounded">{assignment.remarks}</p>
                  </div>
                )}

                {helper && (
                  <div className="pt-4 border-t">
                    <p className="text-xs text-muted-foreground mb-2">Helper</p>
                    <p className="font-medium text-sm">{helper.fullName}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="space-y-2">
              {selectedStatus === "Pending" && (
                <Button onClick={handleStartDelivery} className="w-full bg-blue-600 hover:bg-blue-700">
                  Start Delivery
                </Button>
              )}

              {selectedStatus !== "Pending" && selectedStatus !== "Completed" && selectedStatus !== "Incomplete" && (
                <div className="space-y-2">
                  <p className="text-xs text-muted-foreground">Update Status</p>
                  <div className="grid grid-cols-2 gap-2">
                    {DELIVERY_STATUSES.filter((s) => s !== "Pending" && s !== selectedStatus).map((status) => (
                      <Button
                        key={status}
                        variant="outline"
                        size="sm"
                        onClick={() => handleStatusChange(status)}
                        className="text-xs"
                      >
                        {status}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {(selectedStatus === "Completed" || selectedStatus === "Incomplete") && (
                <div className="p-3 bg-muted rounded-lg flex items-center gap-2">
                  {selectedStatus === "Completed" ? (
                    <>
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span className="text-sm font-medium">Delivery Completed</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="h-5 w-5 text-red-600" />
                      <span className="text-sm font-medium">Delivery Incomplete</span>
                    </>
                  )}
                </div>
              )}
            </div>
          </TabsContent>

          {/* Progress Tab */}
          <TabsContent value="progress">
            <DeliveryProgressTracker currentStatus={selectedStatus} />
          </TabsContent>

          {/* Proof Tab */}
          <TabsContent value="proof">
            <ProofOfDeliveryUpload assignmentId={assignment.assignmentId} />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
