"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface ClassificationRecord {
  id: string
  breed: string
  confidence: number
  timestamp: Date
  imageUrl?: string
}

export function ClassificationHistory() {
  const [history] = useState<ClassificationRecord[]>([
    {
      id: "1",
      breed: "Holstein Friesian",
      confidence: 95,
      timestamp: new Date("2024-01-15T10:30:00"),
    },
    {
      id: "2",
      breed: "Jersey",
      confidence: 92,
      timestamp: new Date("2024-01-14T15:45:00"),
    },
    {
      id: "3",
      breed: "Angus",
      confidence: 88,
      timestamp: new Date("2024-01-13T09:15:00"),
    },
  ])

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Recent Classifications</CardTitle>
        <CardDescription>Your recent breed identification history</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {history.map((record) => (
            <div
              key={record.id}
              className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/30 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <span className="text-primary text-sm">🐄</span>
                </div>
                <div>
                  <h4 className="font-medium text-sm">{record.breed}</h4>
                  <p className="text-xs text-muted-foreground">{formatDate(record.timestamp)}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant="secondary" className="text-xs">
                  {record.confidence}%
                </Badge>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <span className="text-xs">↗</span>
                </Button>
              </div>
            </div>
          ))}
        </div>
        {history.length === 0 && (
          <div className="text-center py-8">
            <p className="text-muted-foreground text-sm">No classifications yet</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
