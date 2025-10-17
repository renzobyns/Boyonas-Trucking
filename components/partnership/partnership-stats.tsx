import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Route, Clock, Calendar } from "lucide-react"

export function PartnershipStats() {
  const stats = [
    {
      title: "Routes Today",
      value: "5",
      subtitle: "3 completed, 2 ongoing",
      icon: Route,
      color: "text-chart-1",
    },
    {
      title: "Routes Yesterday",
      value: "8",
      subtitle: "All completed",
      icon: Clock,
      color: "text-chart-2",
    },
    {
      title: "Incoming Routes Tomorrow",
      value: "6",
      subtitle: "Scheduled for SPX Express",
      icon: Calendar,
      color: "text-chart-3",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
