import { Button } from "@/components/ui/button"
import { Download, Plus, Settings } from "lucide-react"

export function SoaHeader() {
  return (
    <div className="bg-card border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Statement of Account</h1>
            <p className="text-muted-foreground">Generate and manage billing statements</p>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Bulk Export
            </Button>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Generate SOA
            </Button>
            <Button variant="outline" size="icon">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
