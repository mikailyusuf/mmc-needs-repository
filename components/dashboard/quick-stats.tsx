'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface QuickStat {
  label: string
  value: string
  color: string
}

const stats: QuickStat[] = [
  { label: 'Urgent Needs', value: '18', color: 'bg-red-500/10 text-red-500' },
  { label: 'In Progress', value: '42', color: 'bg-primary/10 text-primary' },
  { label: 'Completed', value: '156', color: 'bg-green-500/10 text-green-500' },
  { label: 'Pending Review', value: '23', color: 'bg-blue-500/10 text-blue-500' },
  { label: 'Total Beneficiaries', value: '15.2K', color: 'bg-purple-500/10 text-purple-500' },
  { label: 'Active Volunteers', value: '89', color: 'bg-cyan-500/10 text-cyan-500' },
]

export default function QuickStats() {
  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle>Quick Stats</CardTitle>
        <CardDescription>System overview metrics</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg ${stat.color} border border-border/30`}
            >
              <p className="text-xs font-medium opacity-75">{stat.label}</p>
              <p className="text-2xl font-bold mt-1">{stat.value}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
