import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, MapPin, Truck } from "lucide-react"

export function RecentActivity() {
  const activities = [
    {
      id: "DEL-001",
      route: "Pasig → Laguna",
      truck: "ABC-1234",
      driver: "Juan Santos",
      status: "In Transit",
      time: "2 hours ago",
    },
    {
      id: "LB-045",
      route: "Makati → Quezon City",
      truck: "XYZ-5678",
      driver: "Maria Cruz",
      status: "Completed",
      time: "4 hours ago",
    },
    {
      id: "DEL-002",
      route: "Manila → Cavite",
      truck: "DEF-9012",
      driver: "Pedro Reyes",
      status: "Loading",
      time: "1 hour ago",
    },
    {
      id: "LB-046",
      route: "Taguig → Antipolo",
      truck: "GHI-3456",
      driver: "Ana Garcia",
      status: "Scheduled",
      time: "30 minutes ago",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "In Transit":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "Loading":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "Scheduled":
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Clock className="h-5 w-5" />
          <span>Recent Activity</span>
        </CardTitle>
        <CardDescription>Latest delivery operations and updates</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Truck className="h-5 w-5 text-primary" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">{activity.id}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    <span>{activity.route}</span>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {activity.truck} • {activity.driver}
                  </div>
                </div>
              </div>
              <div className="text-right space-y-1">
                <Badge className={getStatusColor(activity.status)}>{activity.status}</Badge>
                <div className="text-xs text-muted-foreground">{activity.time}</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
