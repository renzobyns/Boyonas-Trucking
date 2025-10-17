"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowRight, ArrowLeft } from "lucide-react"
import { database } from "@/lib/db-utils"

export default function CreateLipatBahayBooking() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    customerName: "",
    phoneNumber: "",
    fromAddress: "",
    toAddress: "",
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
      if (!formData.customerName || !formData.phoneNumber || !formData.fromAddress || !formData.toAddress) {
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
    if (!formData.scheduledStart || !formData.deadline) {
      alert("Please fill in all required fields")
      return
    }

    // Create booking
    const newBooking = {
      bookingId: (database.lipatBahayBookings?.length || 0) + 1,
      customerName: formData.customerName,
      phoneNumber: formData.phoneNumber,
      fromAddress: formData.fromAddress,
      toAddress: formData.toAddress,
      scheduledStart: formData.scheduledStart,
      deadline: formData.deadline,
      estimatedWeight: formData.estimatedWeight ? Number.parseFloat(formData.estimatedWeight) : null,
      category: formData.category,
      status: "Pending Assignment",
      dateCreated: new Date().toISOString(),
      createdBy: 1,
    }

    if (!database.lipatBahayBookings) {
      database.lipatBahayBookings = []
    }
    database.lipatBahayBookings.push(newBooking)

    // Redirect to assignment page
    router.push(`/lipat-bahay/assign/${newBooking.bookingId}`)
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Create Lipat Bahay Booking</h1>
          <p className="text-muted-foreground">Step {step} of 2</p>
        </div>

        {/* Progress Bar */}
        <div className="flex gap-2 mb-8">
          <div className={`flex-1 h-2 rounded-full transition-colors ${step >= 1 ? "bg-accent" : "bg-muted"}`} />
          <div className={`flex-1 h-2 rounded-full transition-colors ${step >= 2 ? "bg-accent" : "bg-muted"}`} />
        </div>

        {/* Step 1: Customer & Address Details */}
        {step === 1 && (
          <Card>
            <CardHeader>
              <CardTitle>Customer Information</CardTitle>
              <CardDescription>Enter the customer and address details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="customerName">Customer Name *</Label>
                <Input
                  id="customerName"
                  name="customerName"
                  placeholder="e.g., John Doe"
                  value={formData.customerName}
                  onChange={handleInputChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phoneNumber">Phone Number *</Label>
                <Input
                  id="phoneNumber"
                  name="phoneNumber"
                  placeholder="e.g., 09123456789"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="fromAddress">From Address *</Label>
                <Textarea
                  id="fromAddress"
                  name="fromAddress"
                  placeholder="e.g., 123 Main St, Manila"
                  value={formData.fromAddress}
                  onChange={handleInputChange}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="toAddress">To Address *</Label>
                <Textarea
                  id="toAddress"
                  name="toAddress"
                  placeholder="e.g., 456 Oak Ave, Quezon City"
                  value={formData.toAddress}
                  onChange={handleInputChange}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category (Optional)</Label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground"
                >
                  <option value="">Select a category</option>
                  <option value="Household Items">Household Items</option>
                  <option value="Furniture">Furniture</option>
                  <option value="Appliances">Appliances</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="flex gap-4 pt-6">
                <Button variant="outline" className="flex-1 bg-transparent" onClick={() => router.back()}>
                  Cancel
                </Button>
                <Button className="flex-1 bg-accent hover:bg-accent/90" onClick={handleNext}>
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
              <CardTitle>Schedule & Details</CardTitle>
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
                <Label htmlFor="estimatedWeight">Estimated Weight (kg) (Optional)</Label>
                <Input
                  id="estimatedWeight"
                  name="estimatedWeight"
                  type="number"
                  placeholder="e.g., 2000"
                  value={formData.estimatedWeight}
                  onChange={handleInputChange}
                />
              </div>

              <div className="flex gap-4 pt-6">
                <Button variant="outline" className="flex-1 bg-transparent" onClick={handleBack}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
                <Button className="flex-1 bg-accent hover:bg-accent/90" onClick={handleSubmit}>
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
