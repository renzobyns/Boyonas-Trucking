import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Truck, Users, Package, DollarSign } from "lucide-react"

export function StatsCards() {
  const stats = [
    {
      title: "Active Trucks",
      value: "8",
      subtitle: "out of 10 total",
      icon: Truck,
      color: "text-chart-1",
    },
    {
      title: "Employees",
      value: "24",
      subtitle: "drivers & helpers",
      icon: Users,
      color: "text-chart-2",
    },
    {
      title: "Today's Deliveries",
      value: "12",
      subtitle: "3 pending",
      icon: Package,
      color: "text-chart-3",
    },
    {
      title: "Monthly Revenue",
      value: "₱485K",
      subtitle: "+12% from last month",
      icon: DollarSign,
      color: "text-chart-4",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <Card key={index} className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
            <stat.icon className={`h-5 w-5 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{stat.value}</div>
            <p className="text-xs text-muted-foreground mt-1">{stat.subtitle}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
