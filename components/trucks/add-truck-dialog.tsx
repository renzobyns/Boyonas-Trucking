"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, ChevronRight, ChevronLeft } from "lucide-react"
import { database } from "@/lib/db-utils"

export function AddTruckDialog() {
  const [open, setOpen] = useState(false)
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    plateNumber: "",
    model: "",
    capacity: "",
    year: "",
    status: "Okay to Use",
    imagePath: "",
    remarks: "",
  })
  const [documents, setDocuments] = useState<Array<{ type: "OR" | "CR"; file: File | null }>>([
    { type: "OR", file: null },
    { type: "CR", file: null },
  ])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const newTruck = {
      truckId: (database.trucks?.length || 0) + 1,
      plateNumber: formData.plateNumber,
      model: formData.model,
      capacity: Number.parseInt(formData.capacity),
      year: Number.parseInt(formData.year),
      operationalStatus: "Available",
      documentStatus: "Valid",
      status: formData.status,
      imagePath: formData.imagePath || "/classic-red-pickup.png",
      remarks: formData.remarks || null,
    }

    if (!database.trucks) database.trucks = []
    database.trucks.push(newTruck)

    // Add truck documents
    documents.forEach((doc) => {
      if (doc.file) {
        const newDoc = {
          documentId: (database.truckDocuments?.length || 0) + 1,
          truckId: newTruck.truckId,
          documentType: doc.type,
          filePath: `/documents/truck-${newTruck.truckId}-${doc.type.toLowerCase()}.pdf`,
          dateUploaded: new Date().toISOString().split("T")[0],
          expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
          status: "Valid",
        }
        if (!database.truckDocuments) database.truckDocuments = []
        database.truckDocuments.push(newDoc)
      }
    })

    console.log("[v0] New truck created:", newTruck)
    setFormData({
      plateNumber: "",
      model: "",
      capacity: "",
      year: "",
      status: "Okay to Use",
      imagePath: "",
      remarks: "",
    })
    setDocuments([
      { type: "OR", file: null },
      { type: "CR", file: null },
    ])
    setStep(1)
    setOpen(false)
  }

  const handleFileChange = (index: number, file: File | null) => {
    const newDocuments = [...documents]
    newDocuments[index].file = file
    setDocuments(newDocuments)
  }

  const isStep1Valid = formData.plateNumber && formData.model && formData.capacity && formData.year
  const isStep2Valid = documents.some((doc) => doc.file !== null)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add Truck
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Truck</DialogTitle>
          <DialogDescription>
            {step === 1 ? "Enter the truck details to add it to the fleet" : "Upload truck documents (OR, CR)"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {step === 1 ? (
            <>
              {/* Step 1: Truck Details */}
              <div>
                <label className="text-sm font-medium">Plate Number</label>
                <Input
                  placeholder="ABC-1234"
                  value={formData.plateNumber}
                  onChange={(e) => setFormData({ ...formData, plateNumber: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium">Model</label>
                <Input
                  placeholder="Isuzu Forward"
                  value={formData.model}
                  onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium">Capacity (kg)</label>
                <Input
                  type="number"
                  placeholder="5000"
                  value={formData.capacity}
                  onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium">Year</label>
                <Input
                  type="number"
                  placeholder="2024"
                  value={formData.year}
                  onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium">Status</label>
                <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Okay to Use">Okay to Use</SelectItem>
                    <SelectItem value="Not Okay to Use">Not Okay to Use</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium">Remarks (Optional)</label>
                <Input
                  placeholder="Any additional notes..."
                  value={formData.remarks}
                  onChange={(e) => setFormData({ ...formData, remarks: e.target.value })}
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1 bg-transparent"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="button" className="flex-1 gap-2" onClick={() => setStep(2)} disabled={!isStep1Valid}>
                  Next <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </>
          ) : (
            <>
              {/* Step 2: Document Upload */}
              <div className="space-y-4">
                {documents.map((doc, index) => (
                  <div key={doc.type} className="border rounded-lg p-4">
                    <label className="text-sm font-medium block mb-2">{doc.type} Document</label>
                    <input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => handleFileChange(index, e.target.files?.[0] || null)}
                      className="w-full text-sm"
                    />
                    {doc.file && <p className="text-xs text-green-600 mt-2">✓ {doc.file.name}</p>}
                  </div>
                ))}
              </div>

              <div className="flex gap-2 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1 gap-2 bg-transparent"
                  onClick={() => setStep(1)}
                >
                  <ChevronLeft className="h-4 w-4" /> Back
                </Button>
                <Button type="submit" className="flex-1" disabled={!isStep2Valid}>
                  Add Truck
                </Button>
              </div>
            </>
          )}
        </form>
      </DialogContent>
    </Dialog>
  )
}
