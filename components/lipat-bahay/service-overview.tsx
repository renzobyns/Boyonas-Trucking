import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Home, Calendar, TrendingUp } from "lucide-react"

export function ServiceOverview() {
  const serviceTypes = [
    {
      type: "Studio/1BR",
      count: 12,
      avgRate: "₱2,800",
    },
    {
      type: "2-3 Bedroom",
      count: 8,
      avgRate: "₱3,800",
    },
    {
      type: "4+ Bedroom",
      count: 3,
      avgRate: "₱5,200",
    },
  ]

  const upcomingBookings = [
    {
      id: "LB-049",
      customer: "Sarah Martinez",
      date: "Jan 16",
      time: "09:00 AM",
      location: "Pasig → Marikina",
      rate: "₱3,200",
    },
    {
      id: "LB-050",
      customer: "Michael Tan",
      date: "Jan 17",
      time: "07:00 AM",
      location: "Manila → Caloocan",
      rate: "₱2,900",
    },
    {
      id: "LB-051",
      customer: "Lisa Wong",
      date: "Jan 18",
      time: "10:00 AM",
      location: "Makati → Paranaque",
      rate: "₱4,100",
    },
  ]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Home className="h-5 w-5" />
            <span>Service Types</span>
          </CardTitle>
          <CardDescription>Breakdown by household size</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {serviceTypes.map((service, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <div className="font-medium">{service.type}</div>
                  <div className="text-xs text-muted-foreground">{service.count} bookings this month</div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-sm">{service.avgRate}</div>
                  <div className="text-xs text-muted-foreground">Average rate</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="h-5 w-5" />
            <span>Upcoming Bookings</span>
          </CardTitle>
          <CardDescription>Next scheduled services</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {upcomingBookings.map((booking, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="space-y-1">
                  <div className="font-medium text-sm">{booking.customer}</div>
                  <div className="text-xs text-muted-foreground">{booking.id}</div>
                  <div className="text-xs text-muted-foreground">{booking.location}</div>
                </div>
                <div className="text-right space-y-1">
                  <div className="font-semibold text-sm text-accent">{booking.rate}</div>
                  <div className="text-xs text-muted-foreground">
                    {booking.date} • {booking.time}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5" />
            <span>Quick Stats</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Bookings Today</span>
              <span className="font-semibold">4</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Bookings Yesterday</span>
              <span className="font-semibold">6</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Bookings Tomorrow</span>
              <span className="font-semibold">3</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Monthly Total</span>
              <span className="font-semibold">23</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
