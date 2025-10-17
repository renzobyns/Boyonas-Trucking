"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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
  ComposedChart,
} from "recharts"
import { Package, Truck, TrendingUp } from "lucide-react"

// Mock data for statistical analysis
const dailyVolumeData = [
  { date: "Jan 1", partnership: 12, lipatBahay: 8, total: 20 },
  { date: "Jan 2", partnership: 15, lipatBahay: 6, total: 21 },
  { date: "Jan 3", partnership: 18, lipatBahay: 10, total: 28 },
  { date: "Jan 4", partnership: 14, lipatBahay: 7, total: 21 },
  { date: "Jan 5", partnership: 20, lipatBahay: 12, total: 32 },
  { date: "Jan 6", partnership: 16, lipatBahay: 15, total: 31 },
  { date: "Jan 7", partnership: 10, lipatBahay: 9, total: 19 },
  { date: "Jan 8", partnership: 22, lipatBahay: 11, total: 33 },
  { date: "Jan 9", partnership: 19, lipatBahay: 13, total: 32 },
  { date: "Jan 10", partnership: 17, lipatBahay: 8, total: 25 },
]

const revenueData = [
  { month: "Jan", revenue: 1130000 },
  { month: "Feb", revenue: 1245000 },
  { month: "Mar", revenue: 1380000 },
  { month: "Apr", revenue: 1290000 },
  { month: "May", revenue: 1450000 },
  { month: "Jun", revenue: 1520000 },
]

const peakHoursData = [
  { hour: "6AM", deliveries: 5 },
  { hour: "7AM", deliveries: 12 },
  { hour: "8AM", deliveries: 18 },
  { hour: "9AM", deliveries: 25 },
  { hour: "10AM", deliveries: 22 },
  { hour: "11AM", deliveries: 20 },
  { hour: "12PM", deliveries: 15 },
  { hour: "1PM", deliveries: 18 },
  { hour: "2PM", deliveries: 24 },
  { hour: "3PM", deliveries: 28 },
  { hour: "4PM", deliveries: 26 },
  { hour: "5PM", deliveries: 20 },
  { hour: "6PM", deliveries: 12 },
]

export function DeliveryAnalytics() {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-popover border border-border rounded-lg shadow-lg p-3">
          <p className="text-popover-foreground font-medium">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {entry.value}
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-foreground">Performance Analytics</h2>
        <p className="text-muted-foreground">Key operational metrics and trends</p>
      </div>

      {/* Summary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Deliveries</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,247</div>
            <p className="text-xs text-muted-foreground">All-time deliveries</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue This Month</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₱1.52M</div>
            <p className="text-xs text-muted-foreground">Current month total</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Revenue Per Month</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₱1.34M</div>
            <p className="text-xs text-muted-foreground">6-month average</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Truck Utilization</CardTitle>
            <Truck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">84.5%</div>
            <p className="text-xs text-muted-foreground">Fleet average</p>
          </CardContent>
        </Card>
      </div>

      {/* Graphs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Daily Delivery Volume</CardTitle>
            <CardDescription>Number of deliveries completed per day</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <ComposedChart data={dailyVolumeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="partnership" fill="hsl(var(--chart-1))" name="Partnership" />
                <Bar dataKey="lipatBahay" fill="hsl(var(--chart-2))" name="Lipat Bahay" />
                <Line type="monotone" dataKey="total" stroke="hsl(var(--chart-3))" strokeWidth={2} name="Total" />
              </ComposedChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Revenue Trends</CardTitle>
            <CardDescription>Monthly revenue performance</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  content={<CustomTooltip />}
                  formatter={(value) => [`₱${Number(value).toLocaleString()}`, "Revenue"]}
                />
                <Line type="monotone" dataKey="revenue" stroke="hsl(var(--chart-1))" strokeWidth={2} name="Revenue" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Peak Hours Analysis</CardTitle>
          <CardDescription>Delivery volume by hour of day</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={peakHoursData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="hour" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="deliveries" fill="hsl(var(--chart-1))" name="Deliveries" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
