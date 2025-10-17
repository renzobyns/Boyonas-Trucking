import { Button } from "@/components/ui/button"
import { ArrowLeft, Download, Filter } from "lucide-react"
import Link from "next/link"
import { AddTruckDialog } from "./add-truck-dialog"

export function TruckHeader() {
  return (
    <header className="border-b bg-card">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Fleet Management</h1>
              <p className="text-sm text-muted-foreground">Manage trucks and their operational status</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <AddTruckDialog />
          </div>
        </div>
      </div>
    </header>
  )
}
