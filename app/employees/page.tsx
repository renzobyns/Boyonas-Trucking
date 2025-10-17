import { EmployeeHeader } from "@/components/employees/employee-header"
import { EmployeeStats } from "@/components/employees/employee-stats"
import { EmployeeGrid } from "@/components/employees/employee-grid"
import { ScheduleOverview } from "@/components/employees/schedule-overview"

export default function EmployeesPage() {
  return (
    <div className="min-h-screen bg-background">
      <EmployeeHeader />

      <main className="container mx-auto px-6 py-8 space-y-8">
        <EmployeeStats />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <EmployeeGrid />
          </div>
          <div>
            <ScheduleOverview />
          </div>
        </div>
      </main>
    </div>
  )
}
