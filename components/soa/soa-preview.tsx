import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileText, Download, Send, Edit } from "lucide-react"

interface SoaPreviewProps {
  soaId: string | null
  soaRecords: any[]
}

export function SoaPreview({ soaId, soaRecords }: SoaPreviewProps) {
  if (!soaId) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            SOA Preview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">Select an SOA to preview</div>
        </CardContent>
      </Card>
    )
  }

  const soaData = soaRecords.find((soa) => soa.id === soaId)

  if (!soaData) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            SOA Preview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">SOA not found</div>
        </CardContent>
      </Card>
    )
  }

  const subtotal = soaData.deliveries.reduce((sum: number, item: any) => sum + item.amount, 0)
  const tax = Math.round(subtotal * 0.1)
  const total = subtotal + tax

  return (
    <Card className="sticky top-6">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            SOA Preview
          </span>
          <Badge
            className={soaData.status === "Paid" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}
          >
            {soaData.status}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* SOA Header */}
        <div className="space-y-4">
          <div className="text-center border-b pb-4">
            <h2 className="text-lg font-bold">BOYONAS TRUCKING SERVICE</h2>
            <p className="text-xs text-muted-foreground">Statement of Account</p>
          </div>

          <div className="space-y-2 text-xs">
            <div>
              <span className="font-medium">Bill To:</span> {soaData.client}
            </div>
            <div className="text-muted-foreground">{soaData.clientAddress}</div>
            <div className="pt-2 space-y-1">
              <div>
                <span className="font-medium">SOA #:</span> {soaData.id}
              </div>
              <div>
                <span className="font-medium">Period:</span> {soaData.period}
              </div>
              <div>
                <span className="font-medium">Generated:</span> {soaData.generatedDate}
              </div>
              <div>
                <span className="font-medium">Due Date:</span> {soaData.dueDate}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="font-medium text-sm">Service Details:</div>
          <div className="border rounded-lg overflow-hidden">
            <table className="w-full text-xs">
              <thead className="bg-muted">
                <tr>
                  <th className="text-left p-2">DR Number</th>
                  <th className="text-left p-2">Route</th>
                  <th className="text-right p-2">Amount</th>
                </tr>
              </thead>
              <tbody>
                {soaData.deliveries.map((item: any, index: number) => (
                  <tr key={index} className="border-t">
                    <td className="p-2 font-medium">{item.drNumber}</td>
                    <td className="p-2 text-muted-foreground">{item.route}</td>
                    <td className="text-right p-2 font-medium">₱{item.amount.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* SOA Totals */}
        <div className="space-y-2 border-t pt-4 text-xs">
          <div className="flex justify-between">
            <span>Subtotal:</span>
            <span>₱{subtotal.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span>Tax (10%):</span>
            <span>₱{tax.toLocaleString()}</span>
          </div>
          <div className="flex justify-between font-bold text-sm border-t pt-2">
            <span>Total Amount:</span>
            <span>₱{total.toLocaleString()}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-2 pt-4">
          <Button size="sm" className="w-full">
            <Download className="h-3 w-3 mr-2" />
            Download PDF
          </Button>
          <Button variant="outline" size="sm" className="w-full bg-transparent">
            <Send className="h-3 w-3 mr-2" />
            Send to Client
          </Button>
          <Button variant="outline" size="sm" className="w-full bg-transparent">
            <Edit className="h-3 w-3 mr-2" />
            Edit SOA
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
