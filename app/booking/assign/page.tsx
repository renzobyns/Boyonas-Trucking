"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getAllEmployees, getAvailableTrucks } from "@/lib/db-utils"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function AssignBookingPage() {
  const router = useRouter()
  const [bookingData, setBookingData] = useState<any>(null)
  const [trucks, setTrucks] = useState<any[]>([])
  const [employees, setEmployees] = useState<any[]>([])
  const [assignment, setAssignment] = useState({
    truckId: "defaultTruckId", // Updated default value
    driverId: "defaultDriverId", // Updated default value
    helperId: "",
  })

  useEffect(() => {
    // Get booking data from session storage
    const pending = sessionStorage.getItem("pendingBooking")
    if (!pending) {
      router.push("/booking/create")
      return
    }

    setBookingData(JSON.parse(pending))
    setTrucks(getAvailableTrucks())
    setEmployees(getAllEmployees())
  }, [router])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] Booking assigned:", { bookingData, assignment })
    // Clear session storage and redirect
    sessionStorage.removeItem("pendingBooking")
    router.push("/partnership")
  }

  if (!bookingData) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  const drivers = employees.filter((e) => e.position === "Driver")
  const helpers = employees.filter((e) => e.position === "Helper")

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center space-x-4">
            <Link href="/booking/create">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Assign Booking</h1>
              <p className="text-sm text-muted-foreground">Step 2 of 2: Assign truck and personnel</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Booking Summary */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Booking Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Service Type</p>
                  <p className="font-medium capitalize">{bookingData.serviceType.replace("-", " ")}</p>
                </div>

                {bookingData.serviceType === "partnership" ? (
                  <>
                    <div>
                      <p className="text-sm text-muted-foreground">Partner</p>
                      <p className="font-medium">{bookingData.partnerName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Route</p>
                      <p className="font-medium text-sm">
                        {bookingData.routeFrom} → {bookingData.routeTo}
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <p className="text-sm text-muted-foreground">Customer</p>
                      <p className="font-medium">{bookingData.customerName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Address</p>
                      <p className="font-medium text-sm">
                        {bookingData.fromAddress} → {bookingData.toAddress}
                      </p>
                    </div>
                  </>
                )}

                <div>
                  <p className="text-sm text-muted-foreground">Weight</p>
                  <p className="font-medium">{bookingData.estimatedWeight} kg</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Assignment Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Assign Resources</CardTitle>
                <CardDescription>Select truck and personnel for this booking</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="text-sm font-medium">Truck</label>
                    <Select
                      value={assignment.truckId}
                      onValueChange={(value) => setAssignment({ ...assignment, truckId: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a truck" />
                      </SelectTrigger>
                      <SelectContent>
                        {trucks.map((truck) => (
                          <SelectItem key={truck.truckId} value={truck.truckId.toString()}>
                            {truck.plateNumber} - {truck.model} ({truck.capacity} kg)
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium">Driver</label>
                    <Select
                      value={assignment.driverId}
                      onValueChange={(value) => setAssignment({ ...assignment, driverId: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a driver" />
                      </SelectTrigger>
                      <SelectContent>
                        {drivers.map((driver) => (
                          <SelectItem key={driver.employeeId} value={driver.employeeId.toString()}>
                            {driver.fullName} ({driver.employeeCode})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium">Helper (Optional)</label>
                    <Select
                      value={assignment.helperId}
                      onValueChange={(value) => setAssignment({ ...assignment, helperId: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a helper" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">None</SelectItem> {/* Updated value prop */}
                        {helpers.map((helper) => (
                          <SelectItem key={helper.employeeId} value={helper.employeeId.toString()}>
                            {helper.fullName} ({helper.employeeCode})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      className="flex-1 bg-transparent"
                      onClick={() => router.push("/booking/create")}
                    >
                      Back
                    </Button>
                    <Button type="submit" className="flex-1" disabled={!assignment.truckId || !assignment.driverId}>
                      Complete Booking
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
