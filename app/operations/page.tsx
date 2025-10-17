"use client"

import { useState } from "react"
import { OperationsHeader } from "@/components/operations/operations-header"
import { LiveTracking } from "@/components/operations/live-tracking"
import { OperationalMetrics } from "@/components/operations/operational-metrics"
import { AlertsPanel } from "@/components/operations/alerts-panel"
import { DeliveryHistory } from "@/components/operations/delivery-history"
import { DeliveryAnalytics } from "@/components/operations/delivery-analytics"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function OperationsPage() {
  const [timeRange, setTimeRange] = useState("today")

  return (
    <div className="space-y-6">
      <OperationsHeader timeRange={timeRange} setTimeRange={setTimeRange} />

      <Tabs defaultValue="monitoring" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="monitoring">Live Monitoring</TabsTrigger>
          <TabsTrigger value="history">Delivery History</TabsTrigger>
          <TabsTrigger value="analytics">Performance Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="monitoring" className="space-y-6">
          {/* Real-time metrics */}
          <OperationalMetrics />

          {/* Live tracking and alerts */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <LiveTracking />
            </div>
            <div>
              <AlertsPanel />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <DeliveryHistory />
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <DeliveryAnalytics />
        </TabsContent>
      </Tabs>
    </div>
  )
}
