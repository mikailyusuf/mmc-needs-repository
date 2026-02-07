'use client'

import React from "react"

import { ArrowUp, ArrowDown } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface StatCardProps {
  title: string
  value: string
  change: string
  icon: React.ReactNode
  trend: 'up' | 'down'
}

export default function StatCard({ title, value, change, icon, trend }: StatCardProps) {
  const isPositive = trend === 'up'

  return (
    <Card className="bg-card border-border">
      <CardContent className="pt-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-sm text-muted-foreground font-medium">{title}</p>
            <h3 className="text-3xl font-bold text-foreground mt-2">{value}</h3>
          </div>
          <div className="p-2 bg-primary/10 rounded-lg text-primary">{icon}</div>
        </div>

        <div className={cn('flex items-center gap-1 text-sm', isPositive ? 'text-green-500' : 'text-red-500')}>
          {isPositive ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
          <span className="font-semibold">{change}</span>
          <span className="text-muted-foreground">from last month</span>
        </div>
      </CardContent>
    </Card>
  )
}
