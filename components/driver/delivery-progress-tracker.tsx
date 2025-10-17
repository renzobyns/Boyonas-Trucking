"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, Circle } from "lucide-react"

interface DeliveryProgressTrackerProps {
  currentStatus: string
}

const DELIVERY_STEPS = [
  { status: "OTW to SOC", label: "TW to SOC", description: "On the way to warehouse" },
  { status: "Loading", label: "Loading", description: "Loading cargo" },
  { status: "OTW to Destination", label: "TW to Destination", description: "On the way to destination" },
  { status: "Unloading", label: "Unloading", description: "Unloading cargo" },
  { status: "Completed", label: "Completed", description: "Delivery completed" },
]

export function DeliveryProgressTracker({ currentStatus }: DeliveryProgressTrackerProps) {
  const currentStepIndex = DELIVERY_STEPS.findIndex((step) => step.status === currentStatus)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Delivery Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {DELIVERY_STEPS.map((step, index) => {
            const isCompleted = index < currentStepIndex
            const isCurrent = index === currentStepIndex
            const isPending = index > currentStepIndex

            return (
              <div key={step.status} className="flex gap-4">
                <div className="flex flex-col items-center">
                  {isCompleted ? (
                    <CheckCircle2 className="h-8 w-8 text-green-600" />
                  ) : isCurrent ? (
                    <Circle className="h-8 w-8 text-blue-600 fill-blue-600" />
                  ) : (
                    <Circle className="h-8 w-8 text-gray-300" />
                  )}
                  {index < DELIVERY_STEPS.length - 1 && (
                    <div className={`w-1 h-12 mt-2 ${isCompleted || isCurrent ? "bg-blue-600" : "bg-gray-300"}`} />
                  )}
                </div>
                <div className="flex-1 pt-1">
                  <p
                    className={`font-semibold ${isCurrent ? "text-blue-600" : isCompleted ? "text-green-600" : "text-gray-500"}`}
                  >
                    {step.label}
                  </p>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                  {isCurrent && <p className="text-xs text-blue-600 font-medium mt-1">Current status</p>}
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
