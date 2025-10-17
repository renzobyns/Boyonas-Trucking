"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Eye, Download, Send, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface SoaListProps {
  filters: {
    period: string
    client: string
    service: string
  }
  onPreview: (soaId: string) => void
}

export function SoaList({ filters, onPreview }: SoaListProps) {
  const soaRecords = [
    {
      id: "SOA-2024-001",
      client: "Flash Express",
      period: "January 2024",
      service: "Partnership Deliveries",
      amount: "₱125,450.00",
      status: "paid",
      dueDate: "2024-02-15",
      generatedDate: "2024-01-31",
      deliveries: 45,
    },
    {
      id: "SOA-2024-002",
      client: "Rodriguez Family",
      period: "January 2024",
      service: "Lipat Bahay Services",
      amount: "₱15,000.00",
      status: "pending",
      dueDate: "2024-02-10",
      generatedDate: "2024-01-28",
      deliveries: 1,
    },
    {
      id: "SOA-2024-003",
      client: "LBC Express",
      period: "January 2024",
      service: "Partnership Deliveries",
      amount: "₱89,200.00",
      status: "overdue",
      dueDate: "2024-02-05",
      generatedDate: "2024-01-31",
      deliveries: 32,
    },
    {
      id: "SOA-2024-004",
      client: "Dela Cruz Family",
      period: "February 2024",
      service: "Lipat Bahay Services",
      amount: "₱22,500.00",
      status: "draft",
      dueDate: "2024-03-15",
      generatedDate: "2024-02-28",
      deliveries: 1,
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "overdue":
        return "bg-red-100 text-red-800"
      case "draft":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getServiceColor = (service: string) => {
    return service === "Partnership Deliveries" ? "bg-blue-100 text-blue-800" : "bg-orange-100 text-orange-800"
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Statement of Account Records</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {soaRecords.map((soa) => (
            <div key={soa.id} className="border rounded-lg p-4 space-y-3">
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

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <div className="text-muted-foreground">Period</div>
                  <div className="font-medium">{soa.period}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Amount</div>
                  <div className="font-medium text-lg">{soa.amount}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Due Date</div>
                  <div className="font-medium">{soa.dueDate}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Deliveries</div>
                  <div className="font-medium">{soa.deliveries} items</div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t">
                <div className="text-sm text-muted-foreground">Generated: {soa.generatedDate}</div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={() => onPreview(soa.id)}>
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
  )
}
