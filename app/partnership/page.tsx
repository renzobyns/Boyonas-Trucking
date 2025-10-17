import { PartnershipHeader } from "@/components/partnership/partnership-header"
import { PartnershipStats } from "@/components/partnership/partnership-stats"
import { DeliveryManagement } from "@/components/partnership/delivery-management"
import { PartnerOverview } from "@/components/partnership/partner-overview"

export default function PartnershipPage() {
  return (
    <div className="min-h-screen bg-background">
      <PartnershipHeader />

      <main className="container mx-auto px-6 py-8 space-y-8">
        <PartnershipStats />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <DeliveryManagement />
          </div>
          <div>
            <PartnerOverview />
          </div>
        </div>
      </main>
    </div>
  )
}
