import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Clock, Fuel, Wrench, X } from "lucide-react"

export function AlertsPanel() {
  const alerts = [
    {
      id: 1,
      type: "urgent",
      icon: AlertTriangle,
      title: "Truck BOY-002 Breakdown",
      message: "Engine overheating reported on EDSA",
      time: "5 min ago",
      action: "Dispatch Mechanic",
    },
    {
      id: 2,
      type: "warning",
      icon: Fuel,
      title: "Low Fuel Alert",
      message: "BOY-005 fuel level below 20%",
      time: "12 min ago",
      action: "Refuel Soon",
    },
    {
      id: 3,
      type: "info",
      icon: Clock,
      title: "Delivery Delay",
      message: "DEL-003 delayed due to traffic",
      time: "18 min ago",
      action: "Notify Customer",
    },
    {
      id: 4,
      type: "warning",
      icon: Wrench,
      title: "Maintenance Due",
      message: "BOY-001 scheduled maintenance overdue",
      time: "1 hour ago",
      action: "Schedule Service",
    },
  ]

  const getAlertColor = (type: string) => {
    switch (type) {
      case "urgent":
        return "border-red-200 bg-red-50"
      case "warning":
        return "border-yellow-200 bg-yellow-50"
      case "info":
        return "border-blue-200 bg-blue-50"
      default:
        return "border-gray-200 bg-gray-50"
    }
  }

  const getIconColor = (type: string) => {
    switch (type) {
      case "urgent":
        return "text-red-600"
      case "warning":
        return "text-yellow-600"
      case "info":
        return "text-blue-600"
      default:
        return "text-gray-600"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Active Alerts</span>
          <Badge variant="destructive">4</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {alerts.map((alert) => (
            <div key={alert.id} className={`border rounded-lg p-3 ${getAlertColor(alert.type)}`}>
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <alert.icon className={`h-5 w-5 mt-0.5 ${getIconColor(alert.type)}`} />
                  <div className="space-y-1">
                    <div className="font-medium text-sm">{alert.title}</div>
                    <div className="text-xs text-muted-foreground">{alert.message}</div>
                    <div className="text-xs text-muted-foreground">{alert.time}</div>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                  <X className="h-3 w-3" />
                </Button>
              </div>
              <div className="mt-2 flex justify-end">
                <Button variant="outline" size="sm" className="text-xs bg-transparent">
                  {alert.action}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
