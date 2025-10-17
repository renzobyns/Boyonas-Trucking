"use client"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle as CardTitleComponent } from "@/components/ui/card"
import { Phone, Mail, FileText, Download } from "lucide-react"
import { Button } from "@/components/ui/button"

interface EmployeeProfileModalProps {
  employee: any
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function EmployeeProfileModal({ employee, open, onOpenChange }: EmployeeProfileModalProps) {
  if (!employee) return null

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Deployed":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "Idle":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "On Leave":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "Pending Assignment":
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Employee Profile</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Header Section */}
          <div className="flex items-start justify-between pb-4 border-b">
            <div>
              <h2 className="text-2xl font-bold">{employee.name}</h2>
              <p className="text-muted-foreground">{employee.id}</p>
            </div>
            <Badge className={getStatusColor(employee.status)}>{employee.status}</Badge>
          </div>

          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitleComponent className="text-lg">Personal Information</CardTitleComponent>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Full Name</label>
                  <p className="text-base">{employee.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Position</label>
                  <p className="text-base">{employee.role}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Employee Code</label>
                  <p className="text-base">{employee.id}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Status</label>
                  <p className="text-base">{employee.status}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitleComponent className="text-lg">Contact Information</CardTitleComponent>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="text-base">{employee.phone}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="text-base">{employee.email}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Employment Details */}
          <Card>
            <CardHeader>
              <CardTitleComponent className="text-lg">Employment Details</CardTitleComponent>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Date Started</label>
                  <p className="text-base">{employee.dateStarted}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Years on Team</label>
                  <p className="text-base">{employee.yearsOnTeam} years</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Current Assignment</label>
                  <p className="text-base">{employee.currentAssignment}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Assigned Truck</label>
                  <p className="text-base">{employee.truck}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* License Information (for Drivers) */}
          {employee.role === "Driver" && (
            <Card>
              <CardHeader>
                <CardTitleComponent className="text-lg">License Information</CardTitleComponent>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">License Number</label>
                    <p className="text-base">{employee.licenseNumber}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Expiry Date</label>
                    <p className="text-base">{employee.licenseExpiry}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Emergency Contact */}
          <Card>
            <CardHeader>
              <CardTitleComponent className="text-lg">Emergency Contact</CardTitleComponent>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Contact Name</label>
                <p className="text-base">{employee.emergencyContact.split(" - ")[0]}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Contact Number</label>
                <p className="text-base">{employee.emergencyContact.split(" - ")[1]}</p>
              </div>
            </CardContent>
          </Card>

          {/* Documents Section */}
          <Card>
            <CardHeader>
              <CardTitleComponent className="text-lg">Documents</CardTitleComponent>
              <CardDescription>Uploaded employee documents</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-center space-x-3">
                    <FileText className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Driver's License</p>
                      <p className="text-sm text-muted-foreground">Uploaded: Jan 15, 2024</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-center space-x-3">
                    <FileText className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">National ID</p>
                      <p className="text-sm text-muted-foreground">Uploaded: Jan 15, 2024</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  )
}
