import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Building2, TrendingUp } from "lucide-react"

export function PartnerOverview() {
  const partner = {
    name: "SPX Express (Shopee)",
    logo: "SPX",
    status: "Active",
    deliveriesToday: 5,
    deliveriesYesterday: 8,
    deliveriesTomorrow: 6,
    monthlyVolume: 120,
    revenue: "₱180K",
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Building2 className="h-5 w-5" />
            <span>Partner Overview</span>
          </CardTitle>
          <CardDescription>SPX Express partnership performance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <span className="text-sm font-bold text-primary">{partner.logo}</span>
                </div>
                <div>
                  <div className="font-medium">{partner.name}</div>
                  <Badge variant="outline" className="text-xs">
                    {partner.status}
                  </Badge>
                </div>
              </div>
              <div className="text-right">
                <div className="font-semibold text-sm">{partner.revenue}</div>
                <div className="text-xs text-muted-foreground">This month</div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Routes Today</span>
                <span className="font-medium">{partner.deliveriesToday}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Routes Yesterday</span>
                <span className="font-medium">{partner.deliveriesYesterday}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Routes Tomorrow</span>
                <span className="font-medium">{partner.deliveriesTomorrow}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Monthly Total</span>
                <span className="font-medium">{partner.monthlyVolume}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5" />
            <span>Quick Stats</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Active Partner</span>
              <span className="font-semibold">SPX Express</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Total Routes</span>
              <span className="font-semibold">
                {partner.deliveriesToday + partner.deliveriesYesterday + partner.deliveriesTomorrow}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Service Type</span>
              <span className="font-semibold">E-commerce</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
