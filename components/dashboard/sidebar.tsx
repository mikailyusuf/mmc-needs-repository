'use client'

import React from "react"

import {
  Home,
  FileText,
  MapPin,
  BarChart3,
  Users,
  Activity,
  MessageSquare,
  ClipboardList,
  Settings,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

interface SidebarProps {
  isOpen: boolean
  activeModule: string
  onModuleSelect: (module: string) => void
  userRole?: string
}

interface NavItem {
  id: string
  label: string
  icon: React.ReactNode
  roles: string[] // Which roles can access this
}

const navItems: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: <Home className="w-5 h-5" />, roles: ['admin', 'manager', 'field_officer'] },
  { id: 'needs', label: 'Needs Manager', icon: <FileText className="w-5 h-5" />, roles: ['admin', 'manager', 'field_officer'] },
  { id: 'map', label: 'Map View', icon: <MapPin className="w-5 h-5" />, roles: ['admin', 'manager', 'field_officer'] },
  { id: 'analytics', label: 'Analytics', icon: <BarChart3 className="w-5 h-5" />, roles: ['admin', 'manager'] },
  { id: 'communications', label: 'Communications', icon: <MessageSquare className="w-5 h-5" />, roles: ['admin', 'manager', 'field_officer'] },
  { id: 'activity', label: 'Activity Log', icon: <Activity className="w-5 h-5" />, roles: ['admin', 'manager'] },
  { id: 'reporting', label: 'Reporting', icon: <ClipboardList className="w-5 h-5" />, roles: ['admin', 'manager'] },
  { id: 'users', label: 'User Management', icon: <Users className="w-5 h-5" />, roles: ['admin'] },
  { id: 'settings', label: 'Settings', icon: <Settings className="w-5 h-5" />, roles: ['admin'] },
]

export default function Sidebar({ isOpen, activeModule, onModuleSelect, userRole = 'manager' }: SidebarProps) {
  const filteredItems = navItems.filter((item) => item.roles.includes(userRole))

  return (
    <aside
      className={cn(
        'bg-sidebar-background border-r border-sidebar-border transition-all duration-300',
        isOpen ? 'w-64' : 'w-0 overflow-hidden'
      )}
    >
      <div className="h-full flex flex-col">
        <div className="px-6 py-8 border-b border-sidebar-border">
          <h1 className="text-xl font-bold text-primary">Aid Dashboard</h1>
        </div>

        <nav className="flex-1 overflow-y-auto px-4 py-6">
          <div className="space-y-2">
            {filteredItems.map((item) => (
              <Button
                key={item.id}
                variant={activeModule === item.id ? 'default' : 'ghost'}
                className={cn(
                  'w-full justify-start gap-3',
                  activeModule === item.id
                    ? 'bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90'
                    : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                )}
                onClick={() => onModuleSelect(item.id)}
              >
                {item.icon}
                <span>{item.label}</span>
              </Button>
            ))}
          </div>
        </nav>

        <div className="p-4 border-t border-sidebar-border">
          <p className="text-xs text-sidebar-foreground/60">© 2025 Aid Organization</p>
        </div>
      </div>
    </aside>
  )
}
