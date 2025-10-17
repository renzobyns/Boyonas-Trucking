"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Download, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { database } from "@/lib/db-utils"

interface TruckDetailsModalProps {
  truck: any
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function TruckDetailsModal({ truck, open, onOpenChange }: TruckDetailsModalProps) {
  const truckDocuments = database.truckDocuments?.filter((doc: any) => doc.truckId === truck.truckId) || []

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{truck.plateNumber}</DialogTitle>
          <DialogDescription>{truck.model}</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Truck Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Truck Information</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Model</p>
                <p className="font-medium">{truck.model}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Year</p>
                <p className="font-medium">{truck.year}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Capacity</p>
                <p className="font-medium">{truck.capacity} kg</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Status</p>
                <Badge className="mt-1">{truck.status}</Badge>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Operational Status</p>
                <p className="font-medium">{truck.operationalStatus}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Document Status</p>
                <Badge variant={truck.documentStatus === "Valid" ? "default" : "destructive"} className="mt-1">
                  {truck.documentStatus}
                </Badge>
              </div>
              {truck.remarks && (
                <div className="col-span-2">
                  <p className="text-sm text-muted-foreground">Remarks</p>
                  <p className="font-medium">{truck.remarks}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Documents */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Documents</CardTitle>
              <CardDescription>Uploaded truck documents (OR, CR)</CardDescription>
            </CardHeader>
            <CardContent>
              {truckDocuments.length > 0 ? (
                <div className="space-y-3">
                  {truckDocuments.map((doc: any) => (
                    <div key={doc.documentId} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <FileText className="h-5 w-5 text-blue-600" />
                        <div>
                          <p className="font-medium">{doc.documentType} Document</p>
                          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                            <Calendar className="h-3 w-3" />
                            <span>Uploaded: {doc.dateUploaded}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                            <Calendar className="h-3 w-3" />
                            <span>Expires: {doc.expiryDate}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={doc.status === "Valid" ? "default" : "destructive"}>{doc.status}</Badge>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No documents uploaded yet</p>
              )}
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  )
}
