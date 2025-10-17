"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function CreateBookingPage() {
  const router = useRouter()
  const [serviceType, setServiceType] = useState<"partnership" | "lipat-bahay">("partnership")
  const [formData, setFormData] = useState({
    partnerName: "SPX Express",
    routeFrom: "",
    routeTo: "",
    scheduledStart: "",
    deadline: "",
    estimatedWeight: "",
    category: "",
    // Lipat Bahay fields
    customerName: "",
    phoneNumber: "",
    fromAddress: "",
    toAddress: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] Booking created:", { serviceType, ...formData })
    // Store booking data and redirect to assignment page
    sessionStorage.setItem("pendingBooking", JSON.stringify({ serviceType, ...formData }))
    router.push("/booking/assign")
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center space-x-4">
            <Link href="/partnership">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Create Booking</h1>
              <p className="text-sm text-muted-foreground">Step 1 of 2: Enter booking details</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Select Service Type</CardTitle>
              <CardDescription>Choose the type of booking you want to create</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={serviceType} onValueChange={(value: any) => setServiceType(value)}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="partnership">Partnership Delivery</TabsTrigger>
                  <TabsTrigger value="lipat-bahay">Lipat Bahay</TabsTrigger>
                </TabsList>

                {/* Partnership Booking Form */}
                <TabsContent value="partnership" className="space-y-4 mt-6">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Partner Name</label>
                      <Input value="SPX Express" disabled className="bg-muted" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium">Route From</label>
                        <Input
                          placeholder="SOC Warehouse - Quezon City"
                          value={formData.routeFrom}
                          onChange={(e) => setFormData({ ...formData, routeFrom: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Route To</label>
                        <Input
                          placeholder="Client Site - Makati"
                          value={formData.routeTo}
                          onChange={(e) => setFormData({ ...formData, routeTo: e.target.value })}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium">Scheduled Start</label>
                        <Input
                          type="datetime-local"
                          value={formData.scheduledStart}
                          onChange={(e) => setFormData({ ...formData, scheduledStart: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Deadline</label>
                        <Input
                          type="datetime-local"
                          value={formData.deadline}
                          onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium">Estimated Weight (kg)</label>
                        <Input
                          type="number"
                          placeholder="5000"
                          value={formData.estimatedWeight}
                          onChange={(e) => setFormData({ ...formData, estimatedWeight: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Category</label>
                        <Input
                          placeholder="Electronics"
                          value={formData.category}
                          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                          required
                        />
                      </div>
                    </div>

                    <div className="flex gap-4 pt-4">
                      <Button type="button" variant="outline" className="flex-1 bg-transparent">
                        Cancel
                      </Button>
                      <Button type="submit" className="flex-1">
                        Next: Assign Booking
                      </Button>
                    </div>
                  </form>
                </TabsContent>

                {/* Lipat Bahay Booking Form */}
                <TabsContent value="lipat-bahay" className="space-y-4 mt-6">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium">Customer Name</label>
                        <Input
                          placeholder="John Doe"
                          value={formData.customerName}
                          onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Phone Number</label>
                        <Input
                          placeholder="09123456789"
                          value={formData.phoneNumber}
                          onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium">From Address</label>
                      <Input
                        placeholder="123 Main St, Manila"
                        value={formData.fromAddress}
                        onChange={(e) => setFormData({ ...formData, fromAddress: e.target.value })}
                        required
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium">To Address</label>
                      <Input
                        placeholder="456 Oak Ave, Quezon City"
                        value={formData.toAddress}
                        onChange={(e) => setFormData({ ...formData, toAddress: e.target.value })}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium">Scheduled Start</label>
                        <Input
                          type="datetime-local"
                          value={formData.scheduledStart}
                          onChange={(e) => setFormData({ ...formData, scheduledStart: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Deadline</label>
                        <Input
                          type="datetime-local"
                          value={formData.deadline}
                          onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium">Estimated Weight (kg)</label>
                        <Input
                          type="number"
                          placeholder="2000"
                          value={formData.estimatedWeight}
                          onChange={(e) => setFormData({ ...formData, estimatedWeight: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Category</label>
                        <Input
                          placeholder="Household Items"
                          value={formData.category}
                          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="flex gap-4 pt-4">
                      <Button type="button" variant="outline" className="flex-1 bg-transparent">
                        Cancel
                      </Button>
                      <Button type="submit" className="flex-1">
                        Next: Assign Booking
                      </Button>
                    </div>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
