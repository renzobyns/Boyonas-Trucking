"use client"

import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import {
  getEmployeeByUserId,
  getPendingAssignments,
  getCurrentAssignments,
  getCompletedAssignments,
  getBookingWithAssignment,
  getLipatBahayBookingWithAssignment,
  getLipatBahayPendingAssignments,
  getLipatBahayCurrentAssignments,
  getLipatBahayCompletedAssignments,
} from "@/lib/db-utils"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, CheckCircle, AlertCircle } from "lucide-react"
import { BookingDetailModal } from "@/components/driver/booking-detail-modal"
import database from "@/lib/database.json"

export default function DriverPortal() {
  const { user } = useAuth()
  const router = useRouter()
  const [employee, setEmployee] = useState<any>(null)
  const [pending, setPending] = useState<any[]>([])
  const [current, setCurrent] = useState<any[]>([])
  const [history, setHistory] = useState<any[]>([])
  const [selectedBooking, setSelectedBooking] = useState<any>(null)
  const [modalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    if (!user) {
      router.push("/login")
      return
    }

    if (user.roleId !== 2) {
      router.push("/")
      return
    }

    const emp = getEmployeeByUserId(user.userId)
    if (!emp) {
      router.push("/login")
      return
    }

    setEmployee(emp)

    const partnershipPending = getPendingAssignments(emp.employeeId)
    const partnershipCurrent = getCurrentAssignments(emp.employeeId)
    const partnershipCompleted = getCompletedAssignments(emp.employeeId)

    const lipatBahayPending = getLipatBahayPendingAssignments(emp.employeeId)
    const lipatBahayCurrent = getLipatBahayCurrentAssignments(emp.employeeId)
    const lipatBahayCompleted = getLipatBahayCompletedAssignments(emp.employeeId)

    // Combine both types
    setPending([...partnershipPending, ...lipatBahayPending])
    setCurrent([...partnershipCurrent, ...lipatBahayCurrent])
    setHistory([...partnershipCompleted, ...lipatBahayCompleted])
  }, [user, router])

  const handleOpenBooking = (assignment: any) => {
    setSelectedBooking(assignment)
    setModalOpen(true)
  }

  const handleStatusChange = (newStatus: string) => {
    if (!selectedBooking) return

    const isLipatBahay = selectedBooking.bookingType === "LipatBahay"
    const assignmentArray = isLipatBahay ? database.lipatBahayAssignments : database.deliveryAssignments

    const assignmentIndex = assignmentArray.findIndex((a: any) => a.assignmentId === selectedBooking.assignmentId)
    if (assignmentIndex !== -1) {
      assignmentArray[assignmentIndex].currentStatus = newStatus

      if (newStatus === "Pending") {
        setPending((prev) =>
          prev.map((a) => (a.assignmentId === selectedBooking.assignmentId ? { ...a, currentStatus: newStatus } : a)),
        )
      } else if (newStatus === "Completed" || newStatus === "Incomplete") {
        setCurrent((prev) => prev.filter((a) => a.assignmentId !== selectedBooking.assignmentId))
        setHistory((prev) => [...prev, { ...selectedBooking, currentStatus: newStatus }])
      } else {
        setPending((prev) => prev.filter((a) => a.assignmentId !== selectedBooking.assignmentId))
        setCurrent((prev) =>
          prev.some((a) => a.assignmentId === selectedBooking.assignmentId)
            ? prev.map((a) =>
                a.assignmentId === selectedBooking.assignmentId ? { ...a, currentStatus: newStatus } : a,
              )
            : [...prev, { ...selectedBooking, currentStatus: newStatus }],
        )
      }

      setSelectedBooking((prev: any) => ({ ...prev, currentStatus: newStatus }))
    }
  }

  if (!employee) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  return (
    <div className="space-y-4 md:space-y-8">
      {/* Driver Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 md:p-6 rounded-lg">
        <h1 className="text-2xl md:text-3xl font-bold">{employee.fullName}</h1>
        <p className="text-blue-100 text-sm md:text-base">
          {employee.position} - {employee.employeeCode}
        </p>
      </div>

      {/* Bookings Tabs */}
      <Tabs defaultValue="pending" className="w-full">
        <TabsList className="grid w-full grid-cols-3 gap-1 md:gap-0">
          <TabsTrigger value="pending" className="text-xs md:text-sm">
            Pending ({pending.length})
          </TabsTrigger>
          <TabsTrigger value="current" className="text-xs md:text-sm">
            Current ({current.length})
          </TabsTrigger>
          <TabsTrigger value="history" className="text-xs md:text-sm">
            History ({history.length})
          </TabsTrigger>
        </TabsList>

        {/* Pending Bookings */}
        <TabsContent value="pending" className="space-y-4">
          {pending.length === 0 ? (
            <Card>
              <CardContent className="pt-6 text-center text-muted-foreground">No pending bookings</CardContent>
            </Card>
          ) : (
            pending.map((assignment) => (
              <BookingCard
                key={assignment.assignmentId}
                assignment={assignment}
                type="pending"
                onOpen={() => handleOpenBooking(assignment)}
              />
            ))
          )}
        </TabsContent>

        {/* Current Bookings */}
        <TabsContent value="current" className="space-y-4">
          {current.length === 0 ? (
            <Card>
              <CardContent className="pt-6 text-center text-muted-foreground">No current bookings</CardContent>
            </Card>
          ) : (
            current.map((assignment) => (
              <BookingCard
                key={assignment.assignmentId}
                assignment={assignment}
                type="current"
                onOpen={() => handleOpenBooking(assignment)}
              />
            ))
          )}
        </TabsContent>

        {/* History */}
        <TabsContent value="history" className="space-y-4">
          {history.length === 0 ? (
            <Card>
              <CardContent className="pt-6 text-center text-muted-foreground">No completed deliveries</CardContent>
            </Card>
          ) : (
            history.map((assignment) => (
              <BookingCard
                key={assignment.assignmentId}
                assignment={assignment}
                type="history"
                onOpen={() => handleOpenBooking(assignment)}
              />
            ))
          )}
        </TabsContent>
      </Tabs>

      {/* Booking Detail Modal */}
      {selectedBooking && (
        <BookingDetailModal
          open={modalOpen}
          onOpenChange={setModalOpen}
          assignment={selectedBooking}
          booking={
            getBookingWithAssignment(selectedBooking.assignmentId)?.booking ||
            getLipatBahayBookingWithAssignment(selectedBooking.assignmentId)?.booking
          }
          truck={
            getBookingWithAssignment(selectedBooking.assignmentId)?.truck ||
            getLipatBahayBookingWithAssignment(selectedBooking.assignmentId)?.truck
          }
          helper={
            getBookingWithAssignment(selectedBooking.assignmentId)?.helper ||
            getLipatBahayBookingWithAssignment(selectedBooking.assignmentId)?.helper
          }
          onStatusChange={handleStatusChange}
        />
      )}
    </div>
  )
}

function BookingCard({
  assignment,
  type,
  onOpen,
}: {
  assignment: any
  type: string
  onOpen: () => void
}) {
  const bookingInfo =
    getBookingWithAssignment(assignment.assignmentId) || getLipatBahayBookingWithAssignment(assignment.assignmentId)

  if (!bookingInfo) return null

  const { booking, truck, helper } = bookingInfo
  const isPartnership = "drNumber" in booking
  const drNumber = isPartnership ? booking.drNumber : `LP-${booking.bookingId}`

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Pending":
        return <AlertCircle className="h-4 w-4 text-yellow-500" />
      case "Completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      default:
        return <Clock className="h-4 w-4 text-blue-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-800"
      case "OTW to SOC":
      case "OTW to Pickup":
        return "bg-blue-100 text-blue-800"
      case "Loading":
        return "bg-purple-100 text-purple-800"
      case "OTW to Destination":
        return "bg-indigo-100 text-indigo-800"
      case "Unloading":
        return "bg-orange-100 text-orange-800"
      case "Completed":
        return "bg-green-100 text-green-800"
      case "Incomplete":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={onOpen}>
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2">
          <div className="flex-1 min-w-0">
            <CardTitle className="flex items-center gap-2 text-lg md:text-xl truncate">
              {getStatusIcon(assignment.currentStatus)}
              <span className="truncate">{drNumber}</span>
            </CardTitle>
            <CardDescription className="truncate">
              {isPartnership ? booking.partnerName : booking.customerName}
            </CardDescription>
          </div>
          <Badge className={getStatusColor(assignment.currentStatus)}>{assignment.currentStatus}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-xs md:text-sm text-muted-foreground">Route</p>
            <p className="font-medium text-sm md:text-base truncate">
              {isPartnership
                ? `${booking.routeFrom} → ${booking.routeTo}`
                : `${booking.fromAddress} → ${booking.toAddress}`}
            </p>
          </div>
          <div>
            <p className="text-xs md:text-sm text-muted-foreground">Truck</p>
            <p className="font-medium text-sm md:text-base">{truck?.plateNumber}</p>
          </div>
          <div>
            <p className="text-xs md:text-sm text-muted-foreground">Weight</p>
            <p className="font-medium text-sm md:text-base">{booking.estimatedWeight} kg</p>
          </div>
          <div>
            <p className="text-xs md:text-sm text-muted-foreground">Helper</p>
            <p className="font-medium text-sm md:text-base">{helper?.fullName || "None"}</p>
          </div>
        </div>
        {assignment.remarks && (
          <div>
            <p className="text-xs md:text-sm text-muted-foreground">Remarks</p>
            <p className="font-medium text-sm md:text-base">{assignment.remarks}</p>
          </div>
        )}
        <Button variant="outline" className="w-full mt-4 bg-transparent">
          View Details
        </Button>
      </CardContent>
    </Card>
  )
}
