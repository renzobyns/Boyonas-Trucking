import database from "./database.json"

export { database }

export type User = (typeof database.users)[0]
export type Employee = (typeof database.employees)[0]
export type Truck = (typeof database.trucks)[0]
export type PartnershipBooking = (typeof database.partnershipBookings)[0]
export type DeliveryAssignment = (typeof database.deliveryAssignments)[0]
export type LipatBahayBooking = (typeof database.lipatBahayBookings)[0]

// Authentication utilities
export const authenticateUser = (email: string, password: string): User | null => {
  const user = database.users.find((u) => u.email === email && u.password === password)
  return user || null
}

export const getUserById = (userId: number): User | null => {
  return database.users.find((u) => u.userId === userId) || null
}

export const getEmployeeByUserId = (userId: number) => {
  return database.employees.find((e) => e.userId === userId) || null
}

// Truck utilities
export const getAllTrucks = () => database.trucks
export const getTruckById = (truckId: number) => database.trucks.find((t) => t.truckId === truckId)
export const getAvailableTrucks = () => database.trucks.filter((t) => t.operationalStatus === "Available")

// Employee utilities
export const getAllEmployees = () => database.employees
export const getEmployeeById = (employeeId: number) => database.employees.find((e) => e.employeeId === employeeId)
export const getDeployedEmployees = () => database.employees.filter((e) => e.status === "Deployed")
export const getIdleEmployees = () => database.employees.filter((e) => e.status === "Idle")
export const getOnLeaveEmployees = () => database.employees.filter((e) => e.status === "On Leave")

// Partnership booking utilities
export const getAllPartnershipBookings = () => database.partnershipBookings
export const getPartnershipBookingById = (bookingId: number) =>
  database.partnershipBookings.find((b) => b.bookingId === bookingId)

// Delivery assignment utilities
export const getAllDeliveryAssignments = () => database.deliveryAssignments
export const getDeliveryAssignmentsByDriver = (driverId: number) =>
  database.deliveryAssignments.filter((a) => a.driverId === driverId)

export const getPendingAssignments = (driverId: number) =>
  database.deliveryAssignments.filter((a) => a.driverId === driverId && a.currentStatus === "Pending")

export const getCurrentAssignments = (driverId: number) =>
  database.deliveryAssignments.filter(
    (a) =>
      a.driverId === driverId &&
      a.currentStatus !== "Pending" &&
      a.currentStatus !== "Completed" &&
      a.currentStatus !== "Incomplete",
  )

export const getCompletedAssignments = (driverId: number) =>
  database.deliveryAssignments.filter(
    (a) => a.driverId === driverId && (a.currentStatus === "Completed" || a.currentStatus === "Incomplete"),
  )

// Lipat Bahay utilities
export const getAllLipatBahayBookings = () => database.lipatBahayBookings
export const getLipatBahayBookingById = (bookingId: number) =>
  database.lipatBahayBookings.find((b) => b.bookingId === bookingId)

export const getLipatBahayAssignmentsByDriver = (driverId: number) =>
  database.lipatBahayAssignments.filter((a) => a.driverId === driverId)

// Lipat Bahay assignment filtering functions
export const getLipatBahayPendingAssignments = (driverId: number) =>
  database.lipatBahayAssignments.filter((a: any) => a.driverId === driverId && a.currentStatus === "Pending")

export const getLipatBahayCurrentAssignments = (driverId: number) =>
  database.lipatBahayAssignments.filter(
    (a: any) =>
      a.driverId === driverId &&
      a.currentStatus !== "Pending" &&
      a.currentStatus !== "Completed" &&
      a.currentStatus !== "Incomplete",
  )

export const getLipatBahayCompletedAssignments = (driverId: number) =>
  database.lipatBahayAssignments.filter(
    (a: any) => a.driverId === driverId && (a.currentStatus === "Completed" || a.currentStatus === "Incomplete"),
  )

// Helper function to get booking details with assignment info
export const getBookingWithAssignment = (assignmentId: number) => {
  const assignment = database.deliveryAssignments.find((a) => a.assignmentId === assignmentId)
  if (!assignment) return null

  const booking = database.partnershipBookings.find((b) => b.bookingId === assignment.bookingId)
  const truck = database.trucks.find((t) => t.truckId === assignment.truckId)
  const driver = database.employees.find((e) => e.employeeId === assignment.driverId)
  const helper = assignment.helperId ? database.employees.find((e) => e.employeeId === assignment.helperId) : null

  return { assignment, booking, truck, driver, helper }
}

export const getLipatBahayBookingWithAssignment = (assignmentId: number) => {
  const assignment = database.lipatBahayAssignments.find((a) => a.assignmentId === assignmentId)
  if (!assignment) return null

  const booking = database.lipatBahayBookings.find((b) => b.bookingId === assignment.bookingId)
  const truck = database.trucks.find((t) => t.truckId === assignment.truckId)
  const driver = database.employees.find((e) => e.employeeId === assignment.driverId)
  const helper = assignment.helperId ? database.employees.find((e) => e.employeeId === assignment.helperId) : null

  return { assignment, booking, truck, driver, helper }
}

// Role utility function
export const getRoleNameById = (roleId: number): string => {
  const role = database.roles.find((r) => r.roleId === roleId)
  return role?.roleName || "Unknown"
}
