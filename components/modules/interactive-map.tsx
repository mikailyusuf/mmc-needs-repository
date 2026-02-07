'use client';

import { useState } from 'react';
import { MapPin, AlertCircle, Users, TrendingUp } from 'lucide-react';

interface Ward {
  id: string;
  name: string;
  lat: number;
  lng: number;
  reports: number;
  needs: number;
  status: 'Critical' | 'High' | 'Medium' | 'Low';
  population: number;
  color: string;
}

const WARDS: Ward[] = [
  {
    id: 'jiddari',
    name: 'Jiddari',
    lat: 11.8,
    lng: 13.2,
    reports: 145,
    needs: 28,
    status: 'Critical',
    population: 45000,
    color: '#ef4444',
  },
  {
    id: 'bolori',
    name: 'Bolori',
    lat: 11.85,
    lng: 13.15,
    reports: 128,
    needs: 24,
    status: 'High',
    population: 38000,
    color: '#f59e0b',
  },
  {
    id: 'hausari',
    name: 'Hausari',
    lat: 11.75,
    lng: 13.25,
    reports: 112,
    needs: 22,
    status: 'High',
    population: 32000,
    color: '#f59e0b',
  },
  {
    id: 'shehuri',
    name: 'Shehuri',
    lat: 11.9,
    lng: 13.3,
    reports: 156,
    needs: 31,
    status: 'Critical',
    population: 52000,
    color: '#ef4444',
  },
  {
    id: 'gwange',
    name: 'Gwange',
    lat: 11.7,
    lng: 13.1,
    reports: 98,
    needs: 19,
    status: 'Medium',
    population: 28000,
    color: '#fbbf24',
  },
];

export default function InteractiveMap() {
  const [selectedWard, setSelectedWard] = useState<string | null>(null);
  const [hoveredWard, setHoveredWard] = useState<string | null>(null);

  const selectedWardData = selectedWard ? WARDS.find((w) => w.id === selectedWard) : null;
  const totalReports = WARDS.reduce((sum, w) => sum + w.reports, 0);
  const totalNeeds = WARDS.reduce((sum, w) => sum + w.needs, 0);
  const criticalAreas = WARDS.filter((w) => w.status === 'Critical').length;

  return (
    <div className="space-y-6">
      {/* Map Container */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <div className="bg-slate-800 rounded-lg border border-slate-700 p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-emerald-400" />
              Interactive Ward Map
            </h3>
            
            {/* SVG Map */}
            <div className="bg-slate-900 rounded-lg overflow-hidden border border-slate-700 relative h-96">
              <svg width="100%" height="100%" className="w-full h-full" viewBox="0 0 500 400">
                {/* Grid background */}
                <defs>
                  <pattern id="grid-pattern" width="50" height="50" patternUnits="userSpaceOnUse">
                    <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#334155" strokeWidth="0.5" />
                  </pattern>
                  <linearGradient id="mapGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#1e293b', stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: '#0f172a', stopOpacity: 1 }} />
                  </linearGradient>
                </defs>
                
                {/* Background */}
                <rect width="500" height="400" fill="url(#mapGradient)" />
                <rect width="500" height="400" fill="url(#grid-pattern)" />
                
                {/* Ward zones */}
                {WARDS.map((ward) => {
                  const x = (ward.lng - 13) * 200 + 250;
                  const y = (12 - ward.lat) * 200 + 100;
                  const isSelected = selectedWard === ward.id;
                  const isHovered = hoveredWard === ward.id;
                  const radius = 15 + (ward.reports / 156) * 10;
                  
                  return (
                    <g key={ward.id}>
                      {/* Main marker circle */}
                      <circle
                        cx={x}
                        cy={y}
                        r={radius}
                        fill={ward.color}
                        opacity={isHovered || isSelected ? 0.9 : 0.6}
                        stroke={isSelected ? '#10b981' : '#fff'}
                        strokeWidth={isSelected ? 3 : 1}
                        style={{ cursor: 'pointer', transition: 'all 0.3s ease' }}
                        onMouseEnter={() => setHoveredWard(ward.id)}
                        onMouseLeave={() => setHoveredWard(null)}
                        onClick={() => setSelectedWard(ward.id)}
                      />
                      
                      {/* Report count label */}
                      <text
                        x={x}
                        y={y}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fill="white"
                        fontSize={isSelected ? '14' : '12'}
                        fontWeight={isSelected ? 'bold' : 'normal'}
                        style={{ cursor: 'pointer', pointerEvents: 'none' }}
                      >
                        {ward.reports}
                      </text>
                      
                      {/* Ward name label below */}
                      {(isHovered || isSelected) && (
                        <text
                          x={x}
                          y={y + radius + 20}
                          textAnchor="middle"
                          fill="#f1f5f9"
                          fontSize="13"
                          fontWeight="bold"
                          style={{ pointerEvents: 'none' }}
                        >
                          {ward.name}
                        </text>
                      )}
                    </g>
                  );
                })}
              </svg>
              
              {/* Map legend */}
              <div className="absolute bottom-4 left-4 bg-slate-900/90 border border-slate-700 rounded-lg p-3 backdrop-blur">
                <p className="text-xs font-semibold text-gray-300 mb-2">Status Legend</p>
                <div className="space-y-1 text-xs">
                  {[
                    { status: 'Critical', color: '#ef4444' },
                    { status: 'High', color: '#f59e0b' },
                    { status: 'Medium', color: '#fbbf24' },
                  ].map((item) => (
                    <div key={item.status} className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-gray-400">{item.status}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Panel */}
        <div className="space-y-4">
          <div className="bg-slate-800 rounded-lg border border-slate-700 p-4">
            <div className="space-y-4">
              {[
                { icon: AlertCircle, label: 'Total Reports', value: totalReports, color: 'text-blue-400' },
                { icon: TrendingUp, label: 'Active Needs', value: totalNeeds, color: 'text-amber-400' },
                { icon: MapPin, label: 'Critical Areas', value: criticalAreas, color: 'text-red-400' },
              ].map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <div key={i} className="border-b border-slate-700 pb-4 last:border-b-0 last:pb-0">
                    <div className="flex items-center gap-2 mb-2">
                      <Icon className={`w-4 h-4 ${stat.color}`} />
                      <p className="text-xs text-gray-400">{stat.label}</p>
                    </div>
                    <p className="text-2xl font-bold text-white">{stat.value}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Selected Ward Details */}
          {selectedWardData && (
            <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-white mb-3">{selectedWardData.name}</h4>
              <div className="space-y-2 text-sm">
                <p className="text-gray-400">
                  <span className="text-emerald-400 font-semibold">{selectedWardData.reports}</span> Reports
                </p>
                <p className="text-gray-400">
                  <span className="text-amber-400 font-semibold">{selectedWardData.needs}</span> Active Needs
                </p>
                <p className="text-gray-400">
                  Population: <span className="text-white font-semibold">{selectedWardData.population.toLocaleString()}</span>
                </p>
                <div className="mt-3 pt-3 border-t border-slate-700">
                  <button className="w-full bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 text-xs font-semibold py-2 rounded transition">
                    View Details →
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Ward List Table */}
      <div className="bg-slate-800 rounded-lg border border-slate-700 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Ward Summary</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-700 bg-slate-700/50">
                <th className="px-6 py-3 text-left font-semibold text-white">Ward</th>
                <th className="px-6 py-3 text-left font-semibold text-white">Reports</th>
                <th className="px-6 py-3 text-left font-semibold text-white">Needs</th>
                <th className="px-6 py-3 text-left font-semibold text-white">Population</th>
                <th className="px-6 py-3 text-left font-semibold text-white">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {WARDS.map((ward) => (
                <tr
                  key={ward.id}
                  className="hover:bg-slate-700/50 transition cursor-pointer"
                  onClick={() => setSelectedWard(ward.id)}
                >
                  <td className="px-6 py-3 text-white font-medium">{ward.name}</td>
                  <td className="px-6 py-3 text-emerald-400">{ward.reports}</td>
                  <td className="px-6 py-3 text-amber-400">{ward.needs}</td>
                  <td className="px-6 py-3 text-gray-400">{ward.population.toLocaleString()}</td>
                  <td className="px-6 py-3">
                    <span
                      className={`text-xs px-3 py-1 rounded-full font-semibold ${
                        ward.status === 'Critical'
                          ? 'bg-red-500/20 text-red-400'
                          : ward.status === 'High'
                            ? 'bg-amber-500/20 text-amber-400'
                            : 'bg-yellow-500/20 text-yellow-400'
                      }`}
                    >
                      {ward.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
