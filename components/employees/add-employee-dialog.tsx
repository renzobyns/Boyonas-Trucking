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
import { Plus, Upload, X } from "lucide-react"

export function AddEmployeeDialog() {
  const [open, setOpen] = useState(false)
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    fullName: "",
    position: "Driver",
    employeeCode: "",
    contactNumber: "",
    licenseInfo: "",
    emergencyContactName: "",
    emergencyContactNumber: "",
  })
  const [documents, setDocuments] = useState<{ type: string; file: File | null }[]>([
    { type: "License", file: null },
    { type: "ID", file: null },
  ])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (step === 1) {
      setStep(2)
    } else {
      console.log("[v0] New employee data:", formData)
      console.log("[v0] Documents:", documents)
      setFormData({
        fullName: "",
        position: "Driver",
        employeeCode: "",
        contactNumber: "",
        licenseInfo: "",
        emergencyContactName: "",
        emergencyContactNumber: "",
      })
      setDocuments([
        { type: "License", file: null },
        { type: "ID", file: null },
      ])
      setStep(1)
      setOpen(false)
    }
  }

  const handleFileChange = (index: number, file: File | null) => {
    const newDocuments = [...documents]
    newDocuments[index].file = file
    setDocuments(newDocuments)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add Employee
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Employee</DialogTitle>
          <DialogDescription>
            {step === 1 ? "Enter the employee details to add them to the system" : "Upload employee documents"}
          </DialogDescription>
        </DialogHeader>

        <div className="flex gap-2 mb-6">
          <div className={`flex-1 h-2 rounded-full ${step >= 1 ? "bg-primary" : "bg-muted"}`} />
          <div className={`flex-1 h-2 rounded-full ${step >= 2 ? "bg-primary" : "bg-muted"}`} />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {step === 1 ? (
            <>
              <div>
                <label className="text-sm font-medium">Full Name</label>
                <Input
                  placeholder="Juan Dela Cruz"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium">Position</label>
                <Select
                  value={formData.position}
                  onValueChange={(value) => setFormData({ ...formData, position: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Driver">Driver</SelectItem>
                    <SelectItem value="Helper">Helper</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium">Employee Code</label>
                <Input
                  placeholder="DRV-001"
                  value={formData.employeeCode}
                  onChange={(e) => setFormData({ ...formData, employeeCode: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium">Contact Number</label>
                <Input
                  placeholder="09123456789"
                  value={formData.contactNumber}
                  onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
                  required
                />
              </div>
              {formData.position === "Driver" && (
                <div>
                  <label className="text-sm font-medium">License Info</label>
                  <Input
                    placeholder="License No. D123456"
                    value={formData.licenseInfo}
                    onChange={(e) => setFormData({ ...formData, licenseInfo: e.target.value })}
                  />
                </div>
              )}
              <div>
                <label className="text-sm font-medium">Emergency Contact Name</label>
                <Input
                  placeholder="Maria Dela Cruz"
                  value={formData.emergencyContactName}
                  onChange={(e) => setFormData({ ...formData, emergencyContactName: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium">Emergency Contact Number</label>
                <Input
                  placeholder="09123456789"
                  value={formData.emergencyContactNumber}
                  onChange={(e) => setFormData({ ...formData, emergencyContactNumber: e.target.value })}
                  required
                />
              </div>
            </>
          ) : (
            <>
              <div className="space-y-4">
                {documents.map((doc, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <label className="text-sm font-medium block mb-2">{doc.type} Document</label>
                    <div className="flex items-center gap-2">
                      <label className="flex-1 flex items-center justify-center border-2 border-dashed rounded-lg p-4 cursor-pointer hover:bg-muted/50 transition-colors">
                        <div className="flex flex-col items-center gap-2">
                          <Upload className="h-5 w-5 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">
                            {doc.file ? doc.file.name : "Click to upload"}
                          </span>
                        </div>
                        <input
                          type="file"
                          className="hidden"
                          onChange={(e) => handleFileChange(index, e.target.files?.[0] || null)}
                          accept=".pdf,.jpg,.jpeg,.png"
                        />
                      </label>
                      {doc.file && (
                        <Button type="button" variant="ghost" size="icon" onClick={() => handleFileChange(index, null)}>
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          <div className="flex gap-2 pt-4">
            {step === 2 && (
              <Button type="button" variant="outline" onClick={() => setStep(1)} className="flex-1">
                Back
              </Button>
            )}
            <Button type="submit" className="flex-1">
              {step === 1 ? "Next" : "Add Employee"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
