import { TruckHeader } from "@/components/trucks/truck-header"
import { FleetStats } from "@/components/trucks/fleet-stats"
import { TruckGrid } from "@/components/trucks/truck-grid"
import { NotAvailableTrucks } from "@/components/trucks/not-available-trucks"

export default function TrucksPage() {
  return (
    <div className="min-h-screen bg-background">
      <TruckHeader />

      <main className="container mx-auto px-6 py-8 space-y-8">
        <FleetStats />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <TruckGrid />
          </div>
          <div>
            <NotAvailableTrucks />
          </div>
        </div>
      </main>
    </div>
  )
}
