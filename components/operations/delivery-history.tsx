"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Filter, CalendarIcon, Download, Eye, MapPin, Clock, Package, Home } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

interface DeliveryRecord {
  id: string
  drNumber: string
  serviceType: "partnership" | "lipat-bahay"
  customer: string
  partner?: string
  origin: string
  destination: string
  status: "completed" | "in-progress" | "cancelled" | "pending"
  driver: string
  truck: string
  date: Date
  completedDate?: Date
  items?: string
}

const mockDeliveryData: DeliveryRecord[] = [
  {
    id: "1",
    drNumber: "SPX-2025-0001",
    serviceType: "partnership",
    customer: "Flash Express Hub",
    partner: "SPX",
    origin: "Quezon City",
    destination: "Makati City",
    status: "completed",
    driver: "Juan Dela Cruz",
    truck: "ABC-123",
    date: new Date(2024, 0, 15),
    completedDate: new Date(2024, 0, 15),
  },
  {
    id: "2",
    drNumber: "LP-2025-0001",
    serviceType: "lipat-bahay",
    customer: "Maria Santos",
    origin: "Pasig City",
    destination: "Taguig City",
    status: "completed",
    driver: "Pedro Garcia",
    truck: "XYZ-456",
    date: new Date(2024, 0, 14),
    completedDate: new Date(2024, 0, 14),
    items: "3-bedroom house",
  },
  {
    id: "3",
    drNumber: "SPX-2025-0002",
    serviceType: "partnership",
    customer: "LBC Express Center",
    partner: "SPX",
    origin: "Manila",
    destination: "Caloocan",
    status: "in-progress",
    driver: "Carlos Reyes",
    truck: "DEF-789",
    date: new Date(2024, 0, 16),
  },
  {
    id: "4",
    drNumber: "LP-2025-0002",
    serviceType: "lipat-bahay",
    customer: "John Smith",
    origin: "Mandaluyong",
    destination: "Ortigas",
    status: "pending",
    driver: "Miguel Torres",
    truck: "GHI-012",
    date: new Date(2024, 0, 17),
    items: "Office relocation",
  },
  {
    id: "5",
    drNumber: "SPX-2025-0003",
    serviceType: "partnership",
    customer: "J&T Express Hub",
    partner: "SPX",
    origin: "Antipolo",
    destination: "Marikina",
    status: "cancelled",
    driver: "Roberto Cruz",
    truck: "JKL-345",
    date: new Date(2024, 0, 13),
  },
]

export function DeliveryHistory() {
  const [searchTerm, setSearchTerm] = useState("")
  const [serviceFilter, setServiceFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [driverFilter, setDriverFilter] = useState("all")
  const [dateFrom, setDateFrom] = useState<Date>()
  const [dateTo, setDateTo] = useState<Date>()
  const [filteredData, setFilteredData] = useState(mockDeliveryData)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-800 border-green-200">Completed</Badge>
      case "in-progress":
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">In Progress</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Pending</Badge>
      case "cancelled":
        return <Badge className="bg-red-100 text-red-800 border-red-200">Cancelled</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getServiceIcon = (serviceType: string) => {
    return serviceType === "partnership" ? (
      <Package className="h-4 w-4 text-primary" />
    ) : (
      <Home className="h-4 w-4 text-accent" />
    )
  }

  const handleSearch = () => {
    let filtered = mockDeliveryData

    if (searchTerm) {
      filtered = filtered.filter(
        (record) =>
          record.drNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
          record.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
          record.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
          record.truck.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (serviceFilter !== "all") {
      filtered = filtered.filter((record) => record.serviceType === serviceFilter)
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((record) => record.status === statusFilter)
    }

    if (driverFilter !== "all") {
      filtered = filtered.filter((record) => record.driver === driverFilter)
    }

    if (dateFrom) {
      filtered = filtered.filter((record) => record.date >= dateFrom)
    }

    if (dateTo) {
      filtered = filtered.filter((record) => record.date <= dateTo)
    }

    setFilteredData(filtered)
  }

  const clearFilters = () => {
    setSearchTerm("")
    setServiceFilter("all")
    setStatusFilter("all")
    setDriverFilter("all")
    setDateFrom(undefined)
    setDateTo(undefined)
    setFilteredData(mockDeliveryData)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Delivery History</h2>
          <p className="text-muted-foreground">Complete record of all deliveries across both services</p>
        </div>
        <Button className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Export Data
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters & Search
          </CardTitle>
          <CardDescription>Filter and search through delivery records</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search Bar */}
          <div className="flex items-center space-x-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by DR number, customer, destination, or truck..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button onClick={handleSearch}>Search</Button>
            <Button variant="outline" onClick={clearFilters}>
              Clear
            </Button>
          </div>

          {/* Filter Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <Select value={serviceFilter} onValueChange={setServiceFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Service Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Services</SelectItem>
                <SelectItem value="partnership">Partnership</SelectItem>
                <SelectItem value="lipat-bahay">Lipat Bahay</SelectItem>
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>

            <Select value={driverFilter} onValueChange={setDriverFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Driver" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Drivers</SelectItem>
                <SelectItem value="Juan Dela Cruz">Juan Dela Cruz</SelectItem>
                <SelectItem value="Pedro Garcia">Pedro Garcia</SelectItem>
                <SelectItem value="Carlos Reyes">Carlos Reyes</SelectItem>
                <SelectItem value="Miguel Torres">Miguel Torres</SelectItem>
                <SelectItem value="Roberto Cruz">Roberto Cruz</SelectItem>
              </SelectContent>
            </Select>

            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn("justify-start text-left font-normal", !dateFrom && "text-muted-foreground")}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dateFrom ? format(dateFrom, "PPP") : "From Date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={dateFrom} onSelect={setDateFrom} initialFocus />
              </PopoverContent>
            </Popover>

            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn("justify-start text-left font-normal", !dateTo && "text-muted-foreground")}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dateTo ? format(dateTo, "PPP") : "To Date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={dateTo} onSelect={setDateTo} initialFocus />
              </PopoverContent>
            </Popover>
          </div>
        </CardContent>
      </Card>

      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing {filteredData.length} of {mockDeliveryData.length} delivery records
        </p>
        <div className="flex items-center space-x-4 text-sm">
          <span className="flex items-center gap-1">
            <div className="w-2 h-2 bg-green-500 rounded-full" />
            Completed: {filteredData.filter((r) => r.status === "completed").length}
          </span>
          <span className="flex items-center gap-1">
            <div className="w-2 h-2 bg-blue-500 rounded-full" />
            In Progress: {filteredData.filter((r) => r.status === "in-progress").length}
          </span>
          <span className="flex items-center gap-1">
            <div className="w-2 h-2 bg-yellow-500 rounded-full" />
            Pending: {filteredData.filter((r) => r.status === "pending").length}
          </span>
        </div>
      </div>

      {/* Delivery Records Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>DR Number</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Route</TableHead>
                <TableHead>Driver & Truck</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((record) => (
                <TableRow key={record.id}>
                  <TableCell className="font-medium">{record.drNumber}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getServiceIcon(record.serviceType)}
                      <span className="capitalize">{record.serviceType.replace("-", " ")}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{record.customer}</p>
                      {record.items && <p className="text-xs text-muted-foreground">{record.items}</p>}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-sm">
                      <MapPin className="h-3 w-3 text-muted-foreground" />
                      <span>
                        {record.origin} → {record.destination}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <p className="font-medium">{record.driver}</p>
                      <p className="text-muted-foreground">{record.truck}</p>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(record.status)}</TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <p>{format(record.date, "MMM dd, yyyy")}</p>
                      {record.completedDate && (
                        <p className="text-muted-foreground flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {format(record.completedDate, "HH:mm")}
                        </p>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
