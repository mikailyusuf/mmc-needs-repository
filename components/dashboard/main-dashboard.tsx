'use client'

import { TrendingUp, Users, AlertCircle, MapPin } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import StatCard from '@/components/dashboard/stat-card'
import RecentNeeds from '@/components/dashboard/recent-needs'
import QuickStats from '@/components/dashboard/quick-stats'

interface MainDashboardProps {
  user: { name: string; role: string } | null
}

export default function MainDashboard({ user }: MainDashboardProps) {
  const stats = [
    {
      title: 'Total Needs',
      value: '2,847',
      change: '+12%',
      icon: <AlertCircle className="w-5 h-5" />,
      trend: 'up',
    },
    {
      title: 'Active Cases',
      value: '1,234',
      change: '+8%',
      icon: <Users className="w-5 h-5" />,
      trend: 'up',
    },
    {
      title: 'Completed Programs',
      value: '156',
      change: '+23%',
      icon: <TrendingUp className="w-5 h-5" />,
      trend: 'up',
    },
    {
      title: 'Active Locations',
      value: '42',
      change: '+5%',
      icon: <MapPin className="w-5 h-5" />,
      trend: 'up',
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back, {user?.name}. Here's your overview.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Main Content Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Needs */}
        <div className="lg:col-span-2">
          <RecentNeeds />
        </div>

        {/* Quick Stats */}
        <div>
          <QuickStats />
        </div>
      </div>
    </div>
  )
}
