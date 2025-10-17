import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users } from "lucide-react"

export function ScheduleOverview() {
  const onLeaveEmployees = [
    {
      name: "Ana Garcia",
      position: "Driver",
      phone: "+63 920 456 7890",
    },
    {
      name: "Rosa Santos",
      position: "Helper",
      phone: "+63 922 543 2109",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Users className="h-5 w-5" />
          <span>On Leave</span>
        </CardTitle>
        <CardDescription>Employees currently unavailable</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {onLeaveEmployees.map((employee, index) => (
            <div key={index} className="p-3 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <div className="font-medium">{employee.name}</div>
                  <div className="text-sm text-muted-foreground">{employee.position}</div>
                </div>
                <Badge variant="secondary">On Leave</Badge>
              </div>
              <div className="text-sm text-muted-foreground">{employee.phone}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
