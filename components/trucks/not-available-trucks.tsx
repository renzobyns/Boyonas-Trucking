import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle } from "lucide-react"

export function NotAvailableTrucks() {
  const unavailableTrucks = [
    {
      plateNumber: "GHI-3456",
      reason: "Under Maintenance",
      details: "Engine service in progress",
    },
    {
      plateNumber: "MNO-2468",
      reason: "Expired Documents",
      details: "Insurance renewal needed",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <AlertTriangle className="h-5 w-5 text-yellow-600" />
          <span>Not Available</span>
        </CardTitle>
        <CardDescription>Trucks currently unavailable for operations</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {unavailableTrucks.map((truck) => (
            <div key={truck.plateNumber} className="p-3 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">{truck.plateNumber}</span>
                <Badge variant="destructive">{truck.reason}</Badge>
              </div>
              <p className="text-sm text-muted-foreground">{truck.details}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
