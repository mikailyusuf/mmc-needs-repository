'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface Need {
  id: string
  title: string
  location: string
  status: 'urgent' | 'high' | 'medium' | 'low'
  date: string
  beneficiaries: number
}

const mockNeeds: Need[] = [
  {
    id: '1',
    title: 'Water Access - Wells Needed',
    location: 'Northern Region',
    status: 'urgent',
    date: '2025-02-05',
    beneficiaries: 2500,
  },
  {
    id: '2',
    title: 'Medical Supplies Distribution',
    location: 'Central Zone',
    status: 'high',
    date: '2025-02-04',
    beneficiaries: 1800,
  },
  {
    id: '3',
    title: 'Food Assistance Program',
    location: 'Southern Area',
    status: 'high',
    date: '2025-02-03',
    beneficiaries: 3200,
  },
  {
    id: '4',
    title: 'Education Materials',
    location: 'Eastern District',
    status: 'medium',
    date: '2025-02-02',
    beneficiaries: 450,
  },
  {
    id: '5',
    title: 'Shelter Reconstruction',
    location: 'Western Zone',
    status: 'medium',
    date: '2025-02-01',
    beneficiaries: 380,
  },
]

const statusStyles = {
  urgent: 'bg-red-500/10 text-red-500 border-red-500/20',
  high: 'bg-orange-500/10 text-orange-500 border-orange-500/20',
  medium: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
  low: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
}

export default function RecentNeeds() {
  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle>Recent Needs</CardTitle>
        <CardDescription>Latest community needs tracked in the system</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockNeeds.map((need) => (
            <div
              key={need.id}
              className="flex items-start justify-between p-4 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors border border-border/50"
            >
              <div className="flex-1">
                <h4 className="font-semibold text-foreground">{need.title}</h4>
                <p className="text-sm text-muted-foreground mt-1">{need.location}</p>
                <p className="text-xs text-muted-foreground mt-2">
                  Beneficiaries: <span className="font-semibold text-foreground">{need.beneficiaries.toLocaleString()}</span>
                </p>
              </div>
              <div className="text-right space-y-2">
                <Badge className={statusStyles[need.status]} variant="outline">
                  {need.status.charAt(0).toUpperCase() + need.status.slice(1)}
                </Badge>
                <p className="text-xs text-muted-foreground">{need.date}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
