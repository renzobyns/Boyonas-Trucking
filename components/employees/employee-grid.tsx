"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Search, Phone, User, Truck } from "lucide-react"
import { EmployeeStatusMenu } from "./employee-status-menu"
import { EmployeeProfileModal } from "./employee-profile-modal"

export function EmployeeGrid() {
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null)
  const [profileOpen, setProfileOpen] = useState(false)
  const [employees, setEmployees] = useState([
    {
      id: "EMP-001",
      name: "Juan Santos",
      role: "Driver",
      phone: "+63 917 123 4567",
      email: "juan.santos@boyonas.com",
      licenseNumber: "N01-12-345678",
      licenseExpiry: "Dec 2025",
      status: "Deployed",
      currentAssignment: "DEL-001 - Flash Express",
      truck: "ABC-1234",
      dateStarted: "Jan 15, 2021",
      yearsOnTeam: 3,
      emergencyContact: "Maria Santos - +63 918 987 6543",
    },
    {
      id: "EMP-002",
      name: "Maria Cruz",
      role: "Driver",
      phone: "+63 918 234 5678",
      email: "maria.cruz@boyonas.com",
      licenseNumber: "N01-23-456789",
      licenseExpiry: "Mar 2026",
      status: "Idle",
      currentAssignment: "None",
      truck: "XYZ-5678",
      dateStarted: "Mar 20, 2022",
      yearsOnTeam: 2,
      emergencyContact: "Pedro Cruz - +63 919 876 5432",
    },
    {
      id: "EMP-003",
      name: "Pedro Reyes",
      role: "Driver",
      phone: "+63 919 345 6789",
      email: "pedro.reyes@boyonas.com",
      licenseNumber: "N01-34-567890",
      licenseExpiry: "Aug 2025",
      status: "Deployed",
      currentAssignment: "DEL-002 - LBC",
      truck: "DEF-9012",
      dateStarted: "Jun 10, 2020",
      yearsOnTeam: 4,
      emergencyContact: "Ana Reyes - +63 920 765 4321",
    },
    {
      id: "EMP-004",
      name: "Ana Garcia",
      role: "Driver",
      phone: "+63 920 456 7890",
      email: "ana.garcia@boyonas.com",
      licenseNumber: "N01-45-678901",
      licenseExpiry: "Jan 2026",
      status: "On Leave",
      currentAssignment: "N/A",
      truck: "GHI-3456",
      dateStarted: "Sep 05, 2022",
      yearsOnTeam: 2,
      emergencyContact: "Luis Garcia - +63 921 654 3210",
    },
    {
      id: "EMP-005",
      name: "Carlos Santos",
      role: "Driver",
      phone: "+63 921 567 8901",
      email: "carlos.santos@boyonas.com",
      licenseNumber: "N01-56-789012",
      licenseExpiry: "Nov 2025",
      status: "Deployed",
      currentAssignment: "LB-046 - Lipat Bahay",
      truck: "JKL-7890",
      dateStarted: "Feb 12, 2021",
      yearsOnTeam: 3,
      emergencyContact: "Rosa Santos - +63 922 543 2109",
    },
    {
      id: "EMP-006",
      name: "Pedro Cruz",
      role: "Helper",
      phone: "+63 922 678 9012",
      email: "pedro.cruz@boyonas.com",
      licenseNumber: "N/A",
      licenseExpiry: "N/A",
      status: "Deployed",
      currentAssignment: "DEL-001 - Flash Express",
      truck: "ABC-1234",
      dateStarted: "Aug 18, 2022",
      yearsOnTeam: 2,
      emergencyContact: "Carmen Cruz - +63 923 432 1098",
    },
    {
      id: "EMP-007",
      name: "Luis Santos",
      role: "Helper",
      phone: "+63 923 789 0123",
      email: "luis.santos@boyonas.com",
      licenseNumber: "N/A",
      licenseExpiry: "N/A",
      status: "Deployed",
      currentAssignment: "LB-046 - Lipat Bahay",
      truck: "JKL-7890",
      dateStarted: "Nov 22, 2023",
      yearsOnTeam: 1,
      emergencyContact: "Elena Santos - +63 924 321 0987",
    },
    {
      id: "EMP-008",
      name: "Miguel Cruz",
      role: "Helper",
      phone: "+63 924 890 1234",
      email: "miguel.cruz@boyonas.com",
      licenseNumber: "N/A",
      licenseExpiry: "N/A",
      status: "Pending Assignment",
      currentAssignment: "Awaiting assignment",
      truck: "N/A",
      dateStarted: "Dec 01, 2023",
      yearsOnTeam: 1,
      emergencyContact: "Sofia Cruz - +63 925 210 9876",
    },
  ])

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

  const getRoleColor = (role: string) => {
    switch (role) {
      case "Driver":
        return "bg-primary/10 text-primary"
      case "Helper":
        return "bg-accent/10 text-accent"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "Driver":
        return <Truck className="h-4 w-4" />
      case "Helper":
        return <User className="h-4 w-4" />
      default:
        return <User className="h-4 w-4" />
    }
  }

  const handleStatusChange = (employeeId: string, newStatus: string) => {
    setEmployees(employees.map((emp) => (emp.id === employeeId ? { ...emp, status: newStatus } : emp)))
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Employee Directory</CardTitle>
          <CardDescription>Manage employee information and assignments</CardDescription>

          {/* Search and Filter Controls */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search by name, ID, or phone..." className="pl-10" />
            </div>
            <Select>
              <SelectTrigger className="w-full sm:w-[150px]">
                <SelectValue placeholder="Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="driver">Drivers</SelectItem>
                <SelectItem value="helper">Helpers</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-full sm:w-[150px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="deployed">Deployed</SelectItem>
                <SelectItem value="idle">Idle</SelectItem>
                <SelectItem value="leave">On Leave</SelectItem>
                <SelectItem value="pending">Pending Assignment</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {employees.map((employee) => (
              <Card key={employee.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                          {employee.name
                            .split(" ")
                            .map((n: string) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg">{employee.name}</CardTitle>
                        <CardDescription>{employee.id}</CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={getRoleColor(employee.role)}>
                        {getRoleIcon(employee.role)}
                        <span className="ml-1">{employee.role}</span>
                      </Badge>
                      <EmployeeStatusMenu
                        employeeId={employee.id}
                        currentStatus={employee.status}
                        onStatusChange={(newStatus) => handleStatusChange(employee.id, newStatus)}
                      />
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Status */}
                  <Badge className={getStatusColor(employee.status)}>{employee.status}</Badge>

                  {/* Contact Info */}
                  <div className="grid grid-cols-1 gap-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>{employee.phone}</span>
                    </div>
                    <div className="text-muted-foreground truncate">{employee.email}</div>
                  </div>

                  {/* Current Assignment */}
                  <div className="text-sm">
                    <div className="font-medium">Current Assignment</div>
                    <div className="text-muted-foreground">{employee.currentAssignment}</div>
                  </div>

                  {/* License Info (for drivers) */}
                  {employee.role === "Driver" && (
                    <div className="text-sm">
                      <div className="font-medium">License Info</div>
                      <div className="text-muted-foreground">
                        {employee.licenseNumber} • Expires: {employee.licenseExpiry}
                      </div>
                    </div>
                  )}

                  {/* Date Started and Years on Team */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="font-medium">Date Started</div>
                      <div className="text-muted-foreground">{employee.dateStarted}</div>
                    </div>
                    <div>
                      <div className="font-medium">Years on Team</div>
                      <div className="text-muted-foreground">{employee.yearsOnTeam} years</div>
                    </div>
                  </div>

                  {/* Emergency Contact */}
                  <div className="text-xs text-muted-foreground">
                    <div className="font-medium">Emergency Contact</div>
                    <div>{employee.emergencyContact}</div>
                  </div>

                  {/* Action Button */}
                  <div className="flex space-x-2 pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 bg-transparent"
                      onClick={() => {
                        setSelectedEmployee(employee)
                        setProfileOpen(true)
                      }}
                    >
                      View Profile
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <EmployeeProfileModal employee={selectedEmployee} open={profileOpen} onOpenChange={setProfileOpen} />
    </>
  )
}
