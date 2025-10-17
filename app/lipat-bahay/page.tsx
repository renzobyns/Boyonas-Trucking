import { LipatBahayHeader } from "@/components/lipat-bahay/lipat-bahay-header"
import { LipatBahayStats } from "@/components/lipat-bahay/lipat-bahay-stats"
import { BookingManagement } from "@/components/lipat-bahay/booking-management"
import { ServiceOverview } from "@/components/lipat-bahay/service-overview"

export default function LipatBahayPage() {
  return (
    <div className="min-h-screen bg-background">
      <LipatBahayHeader />

      <main className="container mx-auto px-6 py-8 space-y-8">
        <LipatBahayStats />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <BookingManagement />
          </div>
          <div>
            <ServiceOverview />
          </div>
        </div>
      </main>
    </div>
  )
}
