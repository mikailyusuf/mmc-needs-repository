'use client'

import { useState } from 'react'
import { Plus, Search, Filter } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'

interface Need {
  id: string
  title: string
  description: string
  location: string
  priority: 'urgent' | 'high' | 'medium' | 'low'
  status: 'open' | 'assigned' | 'in_progress' | 'completed'
  beneficiaries: number
  createdDate: string
  assignedTo?: string
}

const mockNeeds: Need[] = [
  {
    id: 'N001',
    title: 'Water Wells Installation',
    description: 'Need for fresh water access in Northern region',
    location: 'Northern Region',
    priority: 'urgent',
    status: 'in_progress',
    beneficiaries: 2500,
    createdDate: '2025-02-05',
    assignedTo: 'John Doe',
  },
  {
    id: 'N002',
    title: 'Medical Clinic Setup',
    description: 'Basic health services required',
    location: 'Central Zone',
    priority: 'high',
    status: 'assigned',
    beneficiaries: 1800,
    createdDate: '2025-02-04',
    assignedTo: 'Sarah Smith',
  },
  {
    id: 'N003',
    title: 'Food Distribution',
    description: 'Emergency food assistance needed',
    location: 'Southern Area',
    priority: 'high',
    status: 'open',
    beneficiaries: 3200,
    createdDate: '2025-02-03',
  },
]

const priorityStyles = {
  urgent: 'bg-red-500/10 text-red-500 border-red-500/20',
  high: 'bg-orange-500/10 text-orange-500 border-orange-500/20',
  medium: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
  low: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
}

const statusStyles = {
  open: 'bg-slate-500/10 text-slate-500',
  assigned: 'bg-cyan-500/10 text-cyan-500',
  in_progress: 'bg-primary/10 text-primary',
  completed: 'bg-green-500/10 text-green-500',
}

export default function NeedsManager() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterPriority, setFilterPriority] = useState<string | null>(null)

  const filteredNeeds = mockNeeds.filter((need) => {
    const matchesSearch = need.title.toLowerCase().includes(searchTerm.toLowerCase()) || need.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesPriority = !filterPriority || need.priority === filterPriority
    return matchesSearch && matchesPriority
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Needs Management</h1>
          <p className="text-muted-foreground">Track and manage community needs</p>
        </div>
        <Button className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
          <Plus className="w-4 h-4" />
          New Need
        </Button>
      </div>

      {/* Filters */}
      <Card className="bg-card border-border">
        <CardContent className="pt-6">
          <div className="flex gap-4 flex-wrap">
            <div className="flex-1 min-w-xs">
              <div className="relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Search needs..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10" />
              </div>
            </div>
            <Button variant="outline" className="gap-2 bg-transparent">
              <Filter className="w-4 h-4" />
              Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Needs Table */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle>All Needs ({filteredNeeds.length})</CardTitle>
          <CardDescription>Complete list of community needs</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {filteredNeeds.map((need) => (
              <div
                key={need.id}
                className="flex items-center justify-between p-4 rounded-lg border border-border/50 hover:bg-secondary/30 transition-colors"
              >
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground">{need.title}</h4>
                  <p className="text-sm text-muted-foreground mt-1">{need.description}</p>
                  <div className="flex gap-4 mt-2 text-xs">
                    <span className="text-muted-foreground">Location: {need.location}</span>
                    <span className="text-muted-foreground">Beneficiaries: {need.beneficiaries.toLocaleString()}</span>
                    {need.assignedTo && <span className="text-muted-foreground">Assigned to: {need.assignedTo}</span>}
                  </div>
                </div>
                <div className="flex gap-2 ml-4">
                  <Badge className={priorityStyles[need.priority]} variant="outline">
                    {need.priority}
                  </Badge>
                  <Badge className={statusStyles[need.status as keyof typeof statusStyles]} variant="outline">
                    {need.status.replace('_', ' ')}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
