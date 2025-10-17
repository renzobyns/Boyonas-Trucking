import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Truck, Wrench, CheckCircle } from "lucide-react"

export function FleetOverview() {
  const fleetData = [
    { plate: "ABC-1234", status: "Active", route: "Pasig → Laguna" },
    { plate: "XYZ-5678", status: "Available", route: "N/A" },
    { plate: "DEF-9012", status: "Active", route: "Manila → Cavite" },
    { plate: "GHI-3456", status: "Maintenance", route: "N/A" },
    { plate: "JKL-7890", status: "Active", route: "Quezon City → Laguna" },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Active":
        return <Truck className="h-4 w-4 text-blue-600" />
      case "Available":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "Maintenance":
        return <Wrench className="h-4 w-4 text-yellow-600" />
      default:
        return <Truck className="h-4 w-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "text-blue-600"
      case "Available":
        return "text-green-600"
      case "Maintenance":
        return "text-yellow-600"
      default:
        return "text-gray-600"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Fleet Overview</CardTitle>
        <CardDescription>Current status of all trucks</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {fleetData.map((truck) => (
            <div key={truck.plate} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {getStatusIcon(truck.status)}
                  <span className="font-medium">{truck.plate}</span>
                </div>
                <span className={`text-sm ${getStatusColor(truck.status)}`}>{truck.status}</span>
              </div>
              <div className="text-xs text-muted-foreground">Route: {truck.route}</div>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-green-600">8</div>
              <div className="text-xs text-muted-foreground">Active</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600">1</div>
              <div className="text-xs text-muted-foreground">Available</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-yellow-600">1</div>
              <div className="text-xs text-muted-foreground">Maintenance</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
