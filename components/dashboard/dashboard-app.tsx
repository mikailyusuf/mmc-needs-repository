'use client'

import { useState } from 'react'
import { Menu, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Sidebar from '@/components/dashboard/sidebar'
import MainDashboard from '@/components/dashboard/main-dashboard'
import NeedsManager from '@/components/modules/needs-manager'
import MapModule from '@/components/modules/map-module'
import AnalyticsModule from '@/components/modules/analytics-module'
import UserManagement from '@/components/modules/user-management'
import ActivityLog from '@/components/modules/activity-log'
import Communications from '@/components/modules/communications'
import Reporting from '@/components/modules/reporting'
import AdminSettings from '@/components/modules/admin-settings'

interface DashboardAppProps {
  user: { name: string; role: string } | null
  onLogout: () => void
}

export default function DashboardApp({ user, onLogout }: DashboardAppProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [activeModule, setActiveModule] = useState('dashboard')

  const renderModule = () => {
    switch (activeModule) {
      case 'dashboard':
        return <MainDashboard user={user} />
      case 'needs':
        return <NeedsManager />
      case 'map':
        return <MapModule />
      case 'analytics':
        return <AnalyticsModule />
      case 'users':
        return <UserManagement />
      case 'activity':
        return <ActivityLog />
      case 'communications':
        return <Communications />
      case 'reporting':
        return <Reporting />
      case 'settings':
        return <AdminSettings />
      default:
        return <MainDashboard user={user} />
    }
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} activeModule={activeModule} onModuleSelect={setActiveModule} userRole={user?.role} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="bg-card border-b border-border px-6 py-4 flex items-center justify-between">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-foreground"
          >
            <Menu className="w-5 h-5" />
          </Button>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-semibold text-foreground capitalize">{user?.name}</p>
              <p className="text-xs text-muted-foreground capitalize">{user?.role.replace('_', ' ')}</p>
            </div>
            <Button variant="ghost" size="icon" onClick={onLogout} className="text-foreground hover:text-destructive">
              <LogOut className="w-5 h-5" />
            </Button>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-auto">
          <div className="p-6">{renderModule()}</div>
        </main>
      </div>
    </div>
  )
}
