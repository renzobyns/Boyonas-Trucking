"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Plus, Download, Send, MoreHorizontal, Eye } from "lucide-react"
import Link from "next/link"
import { SoaFilters } from "@/components/soa/soa-filters"
import { SoaPreview } from "@/components/soa/soa-preview"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function SoaPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("current-month")
  const [selectedClient, setSelectedClient] = useState("all")
  const [selectedService, setSelectedService] = useState("all")
  const [selectedSoaId, setSelectedSoaId] = useState<string | null>(null)

  const soaRecords = [
    {
      id: "SOA-2024-001",
      client: "Flash Express",
      clientAddress: "123 Business Ave, Makati City",
      period: "January 2024",
      service: "Partnership Deliveries",
      amount: 125450,
      status: "Paid",
      dueDate: "2024-02-15",
      generatedDate: "2024-01-31",
      deliveries: [
        {
          drNumber: "SPX-2025-0001",
          route: "Quezon City → Makati",
          plateNumber: "ABC-1234",
          date: "2025-01-20",
          amount: 2500,
        },
        {
          drNumber: "SPX-2025-0002",
          route: "Manila → Cavite",
          plateNumber: "DEF-9012",
          date: "2025-01-21",
          amount: 1800,
        },
        {
          drNumber: "SPX-2025-0003",
          route: "Pasig → Laguna",
          plateNumber: "ABC-1234",
          date: "2025-01-22",
          amount: 2200,
        },
      ],
    },
    {
      id: "SOA-2024-002",
      client: "Rodriguez Family",
      clientAddress: "456 Oak Ave, Quezon City",
      period: "January 2024",
      service: "Lipat Bahay Services",
      amount: 15000,
      status: "Not Yet Paid",
      dueDate: "2024-02-10",
      generatedDate: "2024-01-28",
      deliveries: [
        {
          drNumber: "LP-2025-0001",
          route: "Manila → Quezon City",
          plateNumber: "XYZ-5678",
          date: "2025-01-22",
          amount: 15000,
        },
      ],
    },
    {
      id: "SOA-2024-003",
      client: "LBC Express",
      clientAddress: "789 Pine Rd, Makati",
      period: "January 2024",
      service: "Partnership Deliveries",
      amount: 89200,
      status: "Paid",
      dueDate: "2024-02-05",
      generatedDate: "2024-01-31",
      deliveries: [
        {
          drNumber: "SPX-2025-0004",
          route: "Makati → Pasig",
          plateNumber: "GHI-3456",
          date: "2025-01-23",
          amount: 3500,
        },
        {
          drNumber: "SPX-2025-0005",
          route: "Laguna → Manila",
          plateNumber: "JKL-7890",
          date: "2025-01-24",
          amount: 4200,
        },
      ],
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Paid":
        return "bg-green-100 text-green-800"
      case "Not Yet Paid":
        return "bg-yellow-100 text-yellow-800"
      case "Overdue":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getServiceColor = (service: string) => {
    return service === "Partnership Deliveries" ? "bg-blue-100 text-blue-800" : "bg-orange-100 text-orange-800"
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
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
                <h1 className="text-2xl font-bold text-foreground">Statement of Account</h1>
                <p className="text-sm text-muted-foreground">Generate and manage billing statements</p>
              </div>
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Generate SOA
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8 space-y-6">
        {/* Filters */}
        <SoaFilters
          selectedPeriod={selectedPeriod}
          setSelectedPeriod={setSelectedPeriod}
          selectedClient={selectedClient}
          setSelectedClient={setSelectedClient}
          selectedService={selectedService}
          setSelectedService={setSelectedService}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* SOA List */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Statement of Account Records</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {soaRecords.map((soa) => (
                    <div
                      key={soa.id}
                      className={`border rounded-lg p-4 space-y-3 cursor-pointer transition-all ${
                        selectedSoaId === soa.id ? "border-primary bg-primary/5" : "hover:border-primary/50"
                      }`}
                      onClick={() => setSelectedSoaId(soa.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-semibold">{soa.id}</div>
                          <div className="text-sm text-muted-foreground">{soa.client}</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={getServiceColor(soa.service)}>{soa.service}</Badge>
                          <Badge className={getStatusColor(soa.status)}>{soa.status}</Badge>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <div className="text-muted-foreground">Period</div>
                          <div className="font-medium">{soa.period}</div>
                        </div>
                        <div>
                          <div className="text-muted-foreground">Amount</div>
                          <div className="font-medium text-lg">₱{soa.amount.toLocaleString()}</div>
                        </div>
                        <div>
                          <div className="text-muted-foreground">Due Date</div>
                          <div className="font-medium">{soa.dueDate}</div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t">
                        <div className="text-sm text-muted-foreground">Generated: {soa.generatedDate}</div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation()
                              setSelectedSoaId(soa.id)
                            }}
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            Preview
                          </Button>
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4 mr-1" />
                            Download
                          </Button>
                          <Button variant="outline" size="sm">
                            <Send className="h-4 w-4 mr-1" />
                            Send
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="outline" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              <DropdownMenuItem>Edit SOA</DropdownMenuItem>
                              <DropdownMenuItem>Duplicate</DropdownMenuItem>
                              <DropdownMenuItem>Mark as Paid</DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* SOA Preview */}
          <div className="lg:col-span-1">
            <SoaPreview soaId={selectedSoaId} soaRecords={soaRecords} />
          </div>
        </div>
      </main>
    </div>
  )
}
