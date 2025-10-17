"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowRight, ArrowLeft } from "lucide-react"
import { database } from "@/lib/db-utils"

export default function CreatePartnershipBooking() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    partnerName: "",
    routeFrom: "",
    routeTo: "",
    scheduledStart: "",
    deadline: "",
    estimatedWeight: "",
    category: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleNext = () => {
    if (step === 1) {
      if (!formData.partnerName || !formData.routeFrom || !formData.routeTo) {
        alert("Please fill in all required fields")
        return
      }
      setStep(2)
    }
  }

  const handleBack = () => {
    setStep(1)
  }

  const handleSubmit = () => {
    if (!formData.scheduledStart || !formData.deadline || !formData.estimatedWeight) {
      alert("Please fill in all required fields")
      return
    }

    // Create booking
    const newBooking = {
      bookingId: (database.partnershipBookings?.length || 0) + 1,
      drNumber: `SPX-2025-${String((database.partnershipBookings?.length || 0) + 1).padStart(4, "0")}`,
      partnerName: formData.partnerName,
      routeFrom: formData.routeFrom,
      routeTo: formData.routeTo,
      scheduledStart: formData.scheduledStart,
      deadline: formData.deadline,
      estimatedWeight: Number.parseFloat(formData.estimatedWeight),
      category: formData.category,
      dateCreated: new Date().toISOString(),
      createdBy: 1,
      status: "Pending Assignment",
    }

    if (!database.partnershipBookings) {
      database.partnershipBookings = []
    }
    database.partnershipBookings.push(newBooking)

    // Redirect to assignment page
    router.push(`/partnership/assign/${newBooking.bookingId}`)
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Create Partnership Booking</h1>
          <p className="text-muted-foreground">Step {step} of 2</p>
        </div>

        {/* Progress Bar */}
        <div className="flex gap-2 mb-8">
          <div className={`flex-1 h-2 rounded-full transition-colors ${step >= 1 ? "bg-primary" : "bg-muted"}`} />
          <div className={`flex-1 h-2 rounded-full transition-colors ${step >= 2 ? "bg-primary" : "bg-muted"}`} />
        </div>

        {/* Step 1: Booking Details */}
        {step === 1 && (
          <Card>
            <CardHeader>
              <CardTitle>Booking Information</CardTitle>
              <CardDescription>Enter the partnership booking details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="partnerName">Partner Name *</Label>
                <Input
                  id="partnerName"
                  name="partnerName"
                  placeholder="e.g., SPX Express"
                  value={formData.partnerName}
                  onChange={handleInputChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="routeFrom">Route From *</Label>
                <Input
                  id="routeFrom"
                  name="routeFrom"
                  placeholder="e.g., SOC Warehouse - Quezon City"
                  value={formData.routeFrom}
                  onChange={handleInputChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="routeTo">Route To *</Label>
                <Input
                  id="routeTo"
                  name="routeTo"
                  placeholder="e.g., Client Site - Makati"
                  value={formData.routeTo}
                  onChange={handleInputChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground"
                >
                  <option value="">Select a category</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Construction Materials">Construction Materials</option>
                  <option value="Furniture">Furniture</option>
                  <option value="Appliances">Appliances</option>
                  <option value="General Cargo">General Cargo</option>
                </select>
              </div>

              <div className="flex gap-4 pt-6">
                <Button variant="outline" className="flex-1 bg-transparent" onClick={() => router.back()}>
                  Cancel
                </Button>
                <Button className="flex-1" onClick={handleNext}>
                  Next
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Schedule & Weight */}
        {step === 2 && (
          <Card>
            <CardHeader>
              <CardTitle>Schedule & Cargo Details</CardTitle>
              <CardDescription>Set the delivery schedule and cargo information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="scheduledStart">Scheduled Start *</Label>
                <Input
                  id="scheduledStart"
                  name="scheduledStart"
                  type="datetime-local"
                  value={formData.scheduledStart}
                  onChange={handleInputChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="deadline">Deadline *</Label>
                <Input
                  id="deadline"
                  name="deadline"
                  type="datetime-local"
                  value={formData.deadline}
                  onChange={handleInputChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="estimatedWeight">Estimated Weight (kg) *</Label>
                <Input
                  id="estimatedWeight"
                  name="estimatedWeight"
                  type="number"
                  placeholder="e.g., 5000"
                  value={formData.estimatedWeight}
                  onChange={handleInputChange}
                />
              </div>

              <div className="flex gap-4 pt-6">
                <Button variant="outline" className="flex-1 bg-transparent" onClick={handleBack}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
                <Button className="flex-1" onClick={handleSubmit}>
                  Create & Assign Driver
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
