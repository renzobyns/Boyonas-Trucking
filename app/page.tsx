import { StatsCards } from "@/components/stats-cards"
import { ServiceSelection } from "@/components/service-selection"
import { RecentActivity } from "@/components/recent-activity"
import { FleetOverview } from "@/components/fleet-overview"

export default function Dashboard() {
  return (
    <div className="space-y-8">
      {/* Stats Overview */}
      <StatsCards />

      {/* Service Selection */}
      <ServiceSelection />

      {/* Dashboard Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <RecentActivity />
        </div>
        <div>
          <FleetOverview />
        </div>
      </div>
    </div>
  )
}
