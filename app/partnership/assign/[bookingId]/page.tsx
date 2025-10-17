"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Check } from "lucide-react"
import { database } from "@/lib/db-utils"

export default function AssignDriverTruck() {
  const router = useRouter()
  const params = useParams()
  const bookingId = Number.parseInt(params.bookingId as string)

  const [selectedTruck, setSelectedTruck] = useState<number | null>(null)
  const [selectedDriver, setSelectedDriver] = useState<number | null>(null)
  const [selectedHelper, setSelectedHelper] = useState<number | null>(null)
  const [booking, setBooking] = useState<any>(null)

  useEffect(() => {
    const foundBooking = database.partnershipBookings?.find((b: any) => b.bookingId === bookingId)
    setBooking(foundBooking)
  }, [bookingId])

  const handleAssign = () => {
    if (!selectedTruck || !selectedDriver) {
      alert("Please select a truck and driver")
      return
    }

    // Create assignment
    const newAssignment = {
      assignmentId: (database.deliveryAssignments?.length || 0) + 1,
      bookingId: bookingId,
      bookingType: "Partnership",
      truckId: selectedTruck,
      driverId: selectedDriver,
      helperId: selectedHelper || null,
      assignedDate: new Date().toISOString(),
      currentStatus: "Pending",
      remarks: null,
    }

    if (!database.deliveryAssignments) {
      database.deliveryAssignments = []
    }
    database.deliveryAssignments.push(newAssignment)

    // Update booking status
    if (booking) {
      booking.status = "Assigned"
    }

    router.push("/partnership")
  }

  const availableTrucks = database.trucks?.filter((t: any) => t.operationalStatus === "Available") || []
  const drivers = database.employees?.filter((e: any) => e.position === "Driver") || []
  const helpers = database.employees?.filter((e: any) => e.position === "Helper") || []

  if (!booking) {
    return <div className="p-8 text-center">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Assign Driver & Truck</h1>
          <p className="text-muted-foreground">Booking: {booking.drNumber}</p>
        </div>

        {/* Booking Summary */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">Booking Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Partner:</span>
              <span className="font-medium">{booking.partnerName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Route:</span>
              <span className="font-medium">
                {booking.routeFrom} → {booking.routeTo}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Weight:</span>
              <span className="font-medium">{booking.estimatedWeight} kg</span>
            </div>
          </CardContent>
        </Card>

        {/* Assignment Form */}
        <Card>
          <CardHeader>
            <CardTitle>Select Resources</CardTitle>
            <CardDescription>Assign a truck and driver to this booking</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Truck Selection */}
            <div className="space-y-3">
              <Label>Select Truck *</Label>
              <div className="space-y-2">
                {availableTrucks.length > 0 ? (
                  availableTrucks.map((truck: any) => (
                    <div
                      key={truck.truckId}
                      onClick={() => setSelectedTruck(truck.truckId)}
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        selectedTruck === truck.truckId
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{truck.plateNumber}</p>
                          <p className="text-sm text-muted-foreground">
                            {truck.model} • {truck.capacity} kg capacity
                          </p>
                        </div>
                        {selectedTruck === truck.truckId && <Check className="h-5 w-5 text-primary" />}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-muted-foreground">No available trucks</p>
                )}
              </div>
            </div>

            {/* Driver Selection */}
            <div className="space-y-3">
              <Label>Select Driver *</Label>
              <div className="space-y-2">
                {drivers.length > 0 ? (
                  drivers.map((driver: any) => (
                    <div
                      key={driver.employeeId}
                      onClick={() => setSelectedDriver(driver.employeeId)}
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        selectedDriver === driver.employeeId
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{driver.fullName}</p>
                          <p className="text-sm text-muted-foreground">{driver.employeeCode}</p>
                        </div>
                        {selectedDriver === driver.employeeId && <Check className="h-5 w-5 text-primary" />}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-muted-foreground">No drivers available</p>
                )}
              </div>
            </div>

            {/* Helper Selection (Optional) */}
            <div className="space-y-3">
              <Label>Select Helper (Optional)</Label>
              <div className="space-y-2">
                <div
                  onClick={() => setSelectedHelper(null)}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    selectedHelper === null ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <p className="font-medium">No Helper</p>
                    {selectedHelper === null && <Check className="h-5 w-5 text-primary" />}
                  </div>
                </div>
                {helpers.length > 0 &&
                  helpers.map((helper: any) => (
                    <div
                      key={helper.employeeId}
                      onClick={() => setSelectedHelper(helper.employeeId)}
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        selectedHelper === helper.employeeId
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{helper.fullName}</p>
                          <p className="text-sm text-muted-foreground">{helper.employeeCode}</p>
                        </div>
                        {selectedHelper === helper.employeeId && <Check className="h-5 w-5 text-primary" />}
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            <div className="flex gap-4 pt-6">
              <Button variant="outline" className="flex-1 bg-transparent" onClick={() => router.back()}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
              <Button className="flex-1" onClick={handleAssign}>
                Confirm Assignment
                <Check className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
