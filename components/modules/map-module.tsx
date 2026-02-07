'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { MapPin, Users } from 'lucide-react'

interface Location {
  id: string
  name: string
  lat: number
  lng: number
  needs: number
  beneficiaries: number
  status: 'urgent' | 'active' | 'completed'
}

const mockLocations: Location[] = [
  { id: '1', name: 'Northern Region', lat: 12.5, lng: 45.2, needs: 5, beneficiaries: 2500, status: 'urgent' },
  { id: '2', name: 'Central Zone', lat: 10.2, lng: 44.8, needs: 8, beneficiaries: 1800, status: 'active' },
  { id: '3', name: 'Southern Area', lat: 8.5, lng: 46.1, needs: 3, beneficiaries: 3200, status: 'active' },
  { id: '4', name: 'Eastern District', lat: 11.3, lng: 47.5, needs: 2, beneficiaries: 450, status: 'completed' },
]

const statusStyles = {
  urgent: 'bg-red-500/10 text-red-500 border-red-500/20',
  active: 'bg-primary/10 text-primary border-primary/20',
  completed: 'bg-green-500/10 text-green-500 border-green-500/20',
}

export default function MapModule() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Geographic View</h1>
        <p className="text-muted-foreground">Map-based overview of needs and locations</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map Placeholder */}
        <div className="lg:col-span-2">
          <Card className="bg-card border-border h-[500px]">
            <CardHeader>
              <CardTitle>Location Map</CardTitle>
              <CardDescription>Interactive map of all active locations (Mapbox integration)</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex items-center justify-center h-full">
              <div className="text-center">
                <MapPin className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
                <p className="text-muted-foreground">Interactive map would display here</p>
                <p className="text-sm text-muted-foreground mt-2">Mapbox can be integrated with your API key</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Location List */}
        <div>
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle>Locations ({mockLocations.length})</CardTitle>
              <CardDescription>Active project areas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockLocations.map((location) => (
                  <div key={location.id} className="p-3 rounded-lg border border-border/50 hover:bg-secondary/30 transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-sm text-foreground">{location.name}</h4>
                      <Badge className={statusStyles[location.status]} variant="outline" className="text-xs">
                        {location.status}
                      </Badge>
                    </div>
                    <div className="space-y-1 text-xs">
                      <div className="flex gap-2 text-muted-foreground">
                        <span>Needs: {location.needs}</span>
                        <span>•</span>
                        <div className="flex gap-1 items-center">
                          <Users className="w-3 h-3" />
                          {location.beneficiaries.toLocaleString()}
                        </div>
                      </div>
                      <div className="text-muted-foreground">
                        Coordinates: {location.lat}, {location.lng}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
