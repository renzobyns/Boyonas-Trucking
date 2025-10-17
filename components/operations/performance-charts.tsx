import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"

interface PerformanceChartsProps {
  timeRange: string
}

export function PerformanceCharts({ timeRange }: PerformanceChartsProps) {
  const deliveryData = [
    { day: "Mon", partnership: 12, lipatBahay: 8 },
    { day: "Tue", partnership: 15, lipatBahay: 6 },
    { day: "Wed", partnership: 18, lipatBahay: 10 },
    { day: "Thu", partnership: 14, lipatBahay: 7 },
    { day: "Fri", partnership: 20, lipatBahay: 12 },
    { day: "Sat", partnership: 16, lipatBahay: 15 },
    { day: "Sun", partnership: 10, lipatBahay: 9 },
  ]

  const efficiencyData = [
    { time: "6AM", efficiency: 85 },
    { time: "9AM", efficiency: 92 },
    { time: "12PM", efficiency: 88 },
    { time: "3PM", efficiency: 90 },
    { time: "6PM", efficiency: 87 },
    { time: "9PM", efficiency: 82 },
  ]

  const serviceDistribution = [
    { name: "Partnership Deliveries", value: 65, color: "#3b82f6" },
    { name: "Lipat Bahay Services", value: 35, color: "#f97316" },
  ]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Daily Deliveries */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Daily Deliveries by Service Type</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={deliveryData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="partnership" fill="#3b82f6" name="Partnership" />
              <Bar dataKey="lipatBahay" fill="#f97316" name="Lipat Bahay" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Service Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Service Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={serviceDistribution}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                dataKey="value"
                label={({ name, value }) => `${value}%`}
              >
                {serviceDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {serviceDistribution.map((item) => (
              <div key={item.name} className="flex items-center gap-2 text-sm">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                <span>{item.name}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Operational Efficiency */}
      <Card className="lg:col-span-3">
        <CardHeader>
          <CardTitle>Operational Efficiency Throughout the Day</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={efficiencyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis domain={[75, 100]} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="efficiency"
                stroke="#10b981"
                strokeWidth={3}
                dot={{ fill: "#10b981", strokeWidth: 2, r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
