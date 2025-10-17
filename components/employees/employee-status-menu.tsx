"use client"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal, CheckCircle, Clock, AlertCircle, Pause } from "lucide-react"

interface EmployeeStatusMenuProps {
  employeeId: string
  currentStatus: string
  onStatusChange: (status: string) => void
}

export function EmployeeStatusMenu({ employeeId, currentStatus, onStatusChange }: EmployeeStatusMenuProps) {
  const statuses = [
    { value: "Deployed", label: "Deployed", icon: CheckCircle, color: "text-green-600" },
    { value: "Idle", label: "Idle", icon: Clock, color: "text-blue-600" },
    { value: "On Leave", label: "On Leave", icon: AlertCircle, color: "text-yellow-600" },
    { value: "Pending Assignment", label: "Pending Assignment", icon: Pause, color: "text-gray-600" },
  ]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Change Status</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {statuses.map((status) => {
          const Icon = status.icon
          return (
            <DropdownMenuItem
              key={status.value}
              onClick={() => onStatusChange(status.value)}
              className={currentStatus === status.value ? "bg-muted" : ""}
            >
              <Icon className={`h-4 w-4 mr-2 ${status.color}`} />
              <span>{status.label}</span>
              {currentStatus === status.value && <span className="ml-auto text-xs font-semibold">✓</span>}
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
