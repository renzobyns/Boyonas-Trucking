import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Truck, Package, CheckCircle, AlertCircle } from "lucide-react"

export function OperationalMetrics() {
  const metrics = [
    {
      title: "Total Deliveries Today",
      value: "24",
      icon: Package,
      color: "text-blue-600",
    },
    {
      title: "Total Trucks Deployed",
      value: "8",
      icon: Truck,
      color: "text-green-600",
    },
    {
      title: "Completed Deliveries Today",
      value: "18",
      icon: CheckCircle,
      color: "text-green-600",
    },
    {
      title: "Pending Deliveries",
      value: "6",
      icon: AlertCircle,
      color: "text-yellow-600",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric) => (
        <Card key={metric.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{metric.title}</CardTitle>
            <metric.icon className={`h-4 w-4 ${metric.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metric.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
