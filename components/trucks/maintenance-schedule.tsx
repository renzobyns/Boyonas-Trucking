import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Wrench, AlertTriangle } from "lucide-react"

export function MaintenanceSchedule() {
  const maintenanceItems = [
    {
      truck: "ABC-1234",
      type: "Regular Service",
      dueDate: "Jan 25, 2024",
      daysLeft: 15,
      priority: "Medium",
      description: "Oil change, filter replacement",
      cost: "₱3,500",
    },
    {
      truck: "DEF-9012",
      type: "Tire Replacement",
      dueDate: "Jan 20, 2024",
      daysLeft: 10,
      priority: "High",
      description: "Front tires showing wear",
      cost: "₱8,000",
    },
    {
      truck: "GHI-3456",
      type: "Engine Repair",
      dueDate: "In Progress",
      daysLeft: 0,
      priority: "Critical",
      description: "Engine overheating issue",
      cost: "₱15,000",
    },
    {
      truck: "MNO-2468",
      type: "Brake Service",
      dueDate: "Jan 28, 2024",
      daysLeft: 18,
      priority: "Medium",
      description: "Brake pad replacement",
      cost: "₱4,200",
    },
    {
      truck: "JKL-7890",
      type: "Regular Service",
      dueDate: "Feb 15, 2024",
      daysLeft: 36,
      priority: "Low",
      description: "Scheduled maintenance",
      cost: "₱3,500",
    },
  ]

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Critical":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      case "High":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300"
      case "Medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "Low":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getUrgencyIcon = (daysLeft: number) => {
    if (daysLeft === 0) return <Wrench className="h-4 w-4 text-red-600" />
    if (daysLeft <= 7) return <AlertTriangle className="h-4 w-4 text-red-600" />
    if (daysLeft <= 14) return <AlertTriangle className="h-4 w-4 text-yellow-600" />
    return <Calendar className="h-4 w-4 text-green-600" />
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Wrench className="h-5 w-5" />
            <span>Maintenance Schedule</span>
          </CardTitle>
          <CardDescription>Upcoming and ongoing maintenance tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {maintenanceItems.map((item, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {getUrgencyIcon(item.daysLeft)}
                    <span className="font-semibold">{item.truck}</span>
                  </div>
                  <Badge className={getPriorityColor(item.priority)}>{item.priority}</Badge>
                </div>

                <div className="space-y-2">
                  <div className="font-medium text-sm">{item.type}</div>
                  <div className="text-xs text-muted-foreground">{item.description}</div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Due:</span>
                    <span className="font-medium">{item.dueDate}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Est. Cost:</span>
                    <span className="font-medium">{item.cost}</span>
                  </div>
                </div>

                {item.daysLeft > 0 && (
                  <div className="text-xs text-muted-foreground">{item.daysLeft} days remaining</div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button variant="outline" className="w-full justify-start bg-transparent">
            <Calendar className="h-4 w-4 mr-2" />
            Schedule Maintenance
          </Button>
          <Button variant="outline" className="w-full justify-start bg-transparent">
            <Wrench className="h-4 w-4 mr-2" />
            Service History
          </Button>
          <Button variant="outline" className="w-full justify-start bg-transparent">
            <AlertTriangle className="h-4 w-4 mr-2" />
            Report Issue
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Fleet Health</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Operational</span>
              <span className="font-semibold text-green-600">90%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Avg. Age</span>
              <span className="font-semibold">4.2 years</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Maintenance Cost</span>
              <span className="font-semibold">₱34,200/month</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Fuel Efficiency</span>
              <span className="font-semibold">8.5 km/L</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
