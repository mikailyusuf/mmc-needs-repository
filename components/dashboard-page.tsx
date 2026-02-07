'use client';

import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  AreaChart,
  Area,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ComposedChart,
} from 'recharts';
import {
  AlertCircle,
  CheckCircle,
  Clock,
  LogOut,
  Menu,
  MessageSquare,
  TrendingUp,
  MapPin,
  Layers,
  BarChart3,
  FileText,
  ChevronRight,
  Map,
  Users,
  Target,
} from 'lucide-react';
import { useState } from 'react';

const URGENCY_DATA = [
  { name: 'Critical', value: 24, fill: '#ef4444' },
  { name: 'High', value: 68, fill: '#f59e0b' },
  { name: 'Medium', value: 156, fill: '#fbbf24' },
  { name: 'Low', value: 412, fill: '#10b981' },
];

const TREND_DATA = [
  { month: 'Jan', reports: 120, resolved: 45 },
  { month: 'Feb', reports: 180, resolved: 68 },
  { month: 'Mar', reports: 230, resolved: 95 },
  { month: 'Apr', reports: 280, resolved: 142 },
  { month: 'May', reports: 340, resolved: 198 },
  { month: 'Jun', reports: 420, resolved: 256 },
];

const CATEGORY_DATA = [
  { name: 'WASH', value: 145 },
  { name: 'Health', value: 128 },
  { name: 'Education', value: 96 },
  { name: 'Food Security', value: 156 },
  { name: 'Shelter', value: 85 },
  { name: 'Protection', value: 50 },
];

const RECENT_REPORTS = [
  { id: 1, title: 'Water shortage in Jiddari ward', status: 'Pending', category: 'WASH' },
  { id: 2, title: 'Malnutrition cases reported', status: 'In Review', category: 'Health' },
  { id: 3, title: 'School closure due to insecurity', status: 'Verified', category: 'Education' },
  { id: 4, title: 'Food distribution needed', status: 'In Progress', category: 'Food Security' },
  { id: 5, title: 'Shelter reconstruction project', status: 'Completed', category: 'Shelter' },
];

const WARD_DISTRIBUTION = [
  { ward: 'Jiddari', reports: 145, x: 1, y: 145 },
  { ward: 'Bolori', reports: 128, x: 2, y: 128 },
  { ward: 'Hausari', reports: 112, x: 3, y: 112 },
  { ward: 'Shehuri', reports: 156, x: 4, y: 156 },
  { ward: 'Gwange', reports: 98, x: 5, y: 98 },
  { ward: 'Konduga', reports: 21, x: 6, y: 21 },
];

const GEOGRAPHIC_HEATMAP = [
  { zone: 'North Zone', pending: 45, verified: 65, resolved: 89 },
  { zone: 'South Zone', pending: 28, verified: 52, resolved: 76 },
  { zone: 'East Zone', pending: 32, verified: 48, resolved: 68 },
  { zone: 'West Zone', pending: 19, verified: 41, resolved: 56 },
];

const RESPONSE_TIME_DATA = [
  { period: 'Week 1', avgTime: 2.4, target: 2 },
  { period: 'Week 2', avgTime: 1.8, target: 2 },
  { period: 'Week 3', avgTime: 2.1, target: 2 },
  { period: 'Week 4', avgTime: 1.5, target: 2 },
  { period: 'Week 5', avgTime: 1.2, target: 2 },
];

const BUDGET_DATA = [
  { category: 'WASH', allocated: 150000, spent: 98000 },
  { category: 'Health', allocated: 200000, spent: 165000 },
  { category: 'Education', allocated: 120000, spent: 89000 },
  { category: 'Food Security', allocated: 250000, spent: 210000 },
  { category: 'Shelter', allocated: 180000, spent: 145000 },
];

const SECTOR_PERFORMANCE = [
  { sector: 'WASH', completion: 75, quality: 82, satisfaction: 88 },
  { sector: 'Health', completion: 68, quality: 80, satisfaction: 85 },
  { sector: 'Education', completion: 72, quality: 85, satisfaction: 82 },
  { sector: 'Food Security', completion: 80, quality: 78, satisfaction: 87 },
  { sector: 'Shelter', completion: 65, quality: 81, satisfaction: 80 },
];

const TIMELINE_DATA = [
  { month: 'Jan', newReports: 120, resolved: 45, pending: 75 },
  { month: 'Feb', newReports: 180, resolved: 68, pending: 187 },
  { month: 'Mar', newReports: 230, resolved: 95, pending: 322 },
  { month: 'Apr', newReports: 280, resolved: 142, pending: 460 },
  { month: 'May', newReports: 340, resolved: 198, pending: 602 },
  { month: 'Jun', newReports: 420, resolved: 256, pending: 766 },
];

interface DashboardPageProps {
  role: string;
  onLogout: () => void;
  onNavigate: (module: string) => void;
}

export default function DashboardPage({
  role,
  onLogout,
  onNavigate,
}: DashboardPageProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const getRoleLabel = (r: string) => {
    const labels: Record<string, string> = {
      admin: 'MMC Administrator',
      'ward-manager': 'Ward Manager',
      'field-officer': 'Field Officer',
      partner: 'Partner Organization',
    };
    return labels[r] || r;
  };

  const modules = [
    { id: 'needs-table', label: 'Needs Management', icon: Layers, active: false },
    { id: 'map', label: 'Geographic Map', icon: MapPin, active: false },
    { id: 'projects', label: 'Project Tracker', icon: BarChart3, active: false },
    { id: 'analytics', label: 'Analytics & Reports', icon: FileText, active: false },
  ];

  return (
    <div className="flex h-screen bg-slate-900">
      {/* Sidebar */}
      <div
        className={`${sidebarOpen ? 'w-72' : 'w-24'} bg-slate-800 border-r border-slate-700 transition-all duration-300 flex flex-col`}
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-700">
          <div className="flex items-center justify-between">
            {sidebarOpen && (
              <div>
                <div className="text-emerald-400 font-bold text-lg">MMC</div>
                <div className="text-gray-400 text-xs font-medium">Needs Repository</div>
              </div>
            )}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-slate-700 rounded-lg transition text-gray-400 hover:text-white"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-3">
          {sidebarOpen && (
            <div className="text-xs uppercase tracking-widest text-gray-500 font-semibold px-3 py-2 mb-2">
              Modules
            </div>
          )}
          {modules.map((module) => {
            const Icon = module.icon;
            return (
              <button
                key={module.id}
                onClick={() => onNavigate(module.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition group ${
                  sidebarOpen
                    ? 'text-gray-300 hover:bg-emerald-500/20 hover:text-emerald-400 border border-transparent hover:border-emerald-500/30'
                    : 'justify-center text-gray-400 hover:bg-slate-700 hover:text-emerald-400'
                }`}
                title={module.label}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {sidebarOpen && (
                  <div className="flex items-center justify-between flex-1">
                    <span className="text-sm font-medium">{module.label}</span>
                    <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                )}
              </button>
            );
          })}
        </nav>

        {/* User Section */}
        <div className="border-t border-slate-700 p-4">
          {sidebarOpen ? (
            <div className="space-y-3">
              <div className="px-3 py-2">
                <p className="text-sm font-medium text-white">{getRoleLabel(role)}</p>
                <p className="text-xs text-gray-400 mt-1">Logged in</p>
              </div>
              <button
                onClick={onLogout}
                className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-gray-300 hover:bg-red-500/20 hover:text-red-400 transition border border-transparent"
              >
                <LogOut className="w-5 h-5" />
                <span className="text-sm font-medium">Sign Out</span>
              </button>
            </div>
          ) : (
            <button
              onClick={onLogout}
              className="w-full flex items-center justify-center p-2 rounded-lg text-gray-400 hover:bg-slate-700 hover:text-red-400 transition"
              title="Sign Out"
            >
              <LogOut className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Top Bar */}
        <div className="bg-slate-800 border-b border-slate-700 px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Dashboard</h1>
            <p className="text-gray-400 text-sm mt-1">{getRoleLabel(role)}</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-gray-300">Last Updated</p>
              <p className="text-sm text-gray-500">Today at 14:32</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 space-y-8">
          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              {
                label: 'Total Reports',
                value: '660',
                icon: AlertCircle,
                color: 'text-blue-400',
                bg: 'bg-blue-500/10',
              },
              {
                label: 'Pending Verification',
                value: '124',
                icon: Clock,
                color: 'text-amber-400',
                bg: 'bg-amber-500/10',
              },
              {
                label: 'Resolved Issues',
                value: '256',
                icon: CheckCircle,
                color: 'text-emerald-400',
                bg: 'bg-emerald-500/10',
              },
              {
                label: 'Active Projects',
                value: '24',
                icon: TrendingUp,
                color: 'text-purple-400',
                bg: 'bg-purple-500/10',
              },
            ].map((kpi, i) => {
              const Icon = kpi.icon;
              return (
                <div
                  key={i}
                  className="bg-slate-800 rounded-lg border border-slate-700 p-6 hover:border-slate-600 transition"
                >
                  <div className={`${kpi.bg} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                    <Icon className={`w-6 h-6 ${kpi.color}`} />
                  </div>
                  <p className="text-gray-400 text-sm">{kpi.label}</p>
                  <p className="text-3xl font-bold text-white mt-1">{kpi.value}</p>
                </div>
              );
            })}
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Urgency Distribution */}
            <div className="bg-slate-800 rounded-lg border border-slate-700 p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Urgency Distribution</h3>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={URGENCY_DATA}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {URGENCY_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1e293b',
                      border: '1px solid #475569',
                      borderRadius: '8px',
                    }}
                    labelStyle={{ color: '#f1f5f9' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Trend Analysis */}
            <div className="bg-slate-800 rounded-lg border border-slate-700 p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Trend Analysis</h3>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={TREND_DATA}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                  <XAxis stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1e293b',
                      border: '1px solid #475569',
                      borderRadius: '8px',
                    }}
                    labelStyle={{ color: '#f1f5f9' }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="reports"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    dot={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="resolved"
                    stroke="#10b981"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Geographic Distribution */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Ward Distribution Map */}
            <div className="bg-slate-800 rounded-lg border border-slate-700 p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-emerald-400" />
                Reports by Ward
              </h3>
              <ResponsiveContainer width="100%" height={250}>
                <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                  <XAxis type="number" dataKey="x" stroke="#9ca3af" label={{ value: 'Ward', position: 'insideBottomRight', offset: -10 }} />
                  <YAxis type="number" dataKey="y" stroke="#9ca3af" label={{ value: 'Report Count', angle: -90, position: 'insideLeft' }} />
                  <Tooltip
                    cursor={{ strokeDasharray: '3 3' }}
                    contentStyle={{
                      backgroundColor: '#1e293b',
                      border: '1px solid #475569',
                      borderRadius: '8px',
                    }}
                    labelStyle={{ color: '#f1f5f9' }}
                    formatter={(value) => value}
                    labelFormatter={(label) => `Count: ${label}`}
                  />
                  <Scatter name="Reports" data={WARD_DISTRIBUTION} fill="#10b981" />
                </ScatterChart>
              </ResponsiveContainer>
              <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                {WARD_DISTRIBUTION.map((w) => (
                  <div key={w.ward} className="flex items-center justify-between p-2 bg-slate-700/50 rounded">
                    <span className="text-gray-300">{w.ward}</span>
                    <span className="text-emerald-400 font-semibold">{w.reports}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Zone Heatmap */}
            <div className="bg-slate-800 rounded-lg border border-slate-700 p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Layers className="w-5 h-5 text-emerald-400" />
                Geographic Zone Heatmap
              </h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={GEOGRAPHIC_HEATMAP}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                  <XAxis stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1e293b',
                      border: '1px solid #475569',
                      borderRadius: '8px',
                    }}
                    labelStyle={{ color: '#f1f5f9' }}
                  />
                  <Legend />
                  <Bar dataKey="pending" stackId="a" fill="#f59e0b" />
                  <Bar dataKey="verified" stackId="a" fill="#3b82f6" />
                  <Bar dataKey="resolved" stackId="a" fill="#10b981" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Category Distribution */}
          <div className="bg-slate-800 rounded-lg border border-slate-700 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Needs by Category</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={CATEGORY_DATA}>
                <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                <XAxis stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    border: '1px solid #475569',
                    borderRadius: '8px',
                  }}
                  labelStyle={{ color: '#f1f5f9' }}
                />
                <Bar dataKey="value" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Timeline/Cumulative Reports */}
          <div className="bg-slate-800 rounded-lg border border-slate-700 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Reports Timeline & Pending Queue</h3>
            <ResponsiveContainer width="100%" height={280}>
              <ComposedChart data={TIMELINE_DATA}>
                <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                <XAxis stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    border: '1px solid #475569',
                    borderRadius: '8px',
                  }}
                  labelStyle={{ color: '#f1f5f9' }}
                />
                <Legend />
                <Area type="monotone" dataKey="pending" fill="#8b5cf6" stroke="#8b5cf6" fillOpacity={0.6} />
                <Bar dataKey="newReports" fill="#3b82f6" />
                <Line type="monotone" dataKey="resolved" stroke="#10b981" strokeWidth={3} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>

          {/* Budget Analysis */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-slate-800 rounded-lg border border-slate-700 p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Budget Allocation vs Spending</h3>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={BUDGET_DATA}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                  <XAxis stroke="#9ca3af" angle={-45} textAnchor="end" height={80} />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1e293b',
                      border: '1px solid #475569',
                      borderRadius: '8px',
                    }}
                    labelStyle={{ color: '#f1f5f9' }}
                    formatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                  />
                  <Legend />
                  <Bar dataKey="allocated" fill="#3b82f6" />
                  <Bar dataKey="spent" fill="#f59e0b" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Response Time Performance */}
            <div className="bg-slate-800 rounded-lg border border-slate-700 p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Response Time Performance (Days)</h3>
              <ResponsiveContainer width="100%" height={280}>
                <LineChart data={RESPONSE_TIME_DATA}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                  <XAxis stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1e293b',
                      border: '1px solid #475569',
                      borderRadius: '8px',
                    }}
                    labelStyle={{ color: '#f1f5f9' }}
                    formatter={(value) => `${value.toFixed(1)} days`}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="avgTime" stroke="#10b981" strokeWidth={3} name="Avg Response Time" />
                  <Line type="monotone" dataKey="target" stroke="#ef4444" strokeWidth={2} strokeDasharray="5 5" name="Target" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Sector Performance Radar */}
          <div className="bg-slate-800 rounded-lg border border-slate-700 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Sector Performance Metrics</h3>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={SECTOR_PERFORMANCE}>
                <PolarGrid stroke="#475569" />
                <PolarAngleAxis dataKey="sector" stroke="#9ca3af" />
                <PolarRadiusAxis angle={90} domain={[0, 100]} stroke="#9ca3af" />
                <Radar name="Completion Rate" dataKey="completion" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.25} />
                <Radar name="Quality Score" dataKey="quality" stroke="#10b981" fill="#10b981" fillOpacity={0.25} />
                <Radar name="Satisfaction" dataKey="satisfaction" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.25} />
                <Legend />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    border: '1px solid #475569',
                    borderRadius: '8px',
                  }}
                  labelStyle={{ color: '#f1f5f9' }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { label: 'Create Report', action: () => onNavigate('needs-table'), color: 'from-blue-600 to-blue-400' },
              { label: 'View Map', action: () => onNavigate('map'), color: 'from-emerald-600 to-emerald-400' },
              { label: 'Track Projects', action: () => onNavigate('projects'), color: 'from-purple-600 to-purple-400' },
              { label: 'Analytics', action: () => onNavigate('analytics'), color: 'from-amber-600 to-amber-400' },
            ].map((item, i) => (
              <button
                key={i}
                onClick={item.action}
                className={`bg-gradient-to-r ${item.color} text-white font-semibold py-3 px-4 rounded-lg hover:shadow-lg transition transform hover:scale-105`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Recent Reports */}
          <div className="bg-slate-800 rounded-lg border border-slate-700 p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              Recent Reports
            </h3>
            <div className="space-y-3">
              {RECENT_REPORTS.map((report) => (
                <div
                  key={report.id}
                  onClick={() => onNavigate('needs-table')}
                  className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg hover:bg-slate-700 transition cursor-pointer"
                >
                  <div className="flex-1">
                    <p className="text-white font-medium">{report.title}</p>
                    <p className="text-sm text-gray-400">{report.category}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span
                      className={`text-xs px-3 py-1 rounded-full font-medium ${
                        report.status === 'Completed'
                          ? 'bg-emerald-500/20 text-emerald-400'
                          : report.status === 'Verified'
                            ? 'bg-blue-500/20 text-blue-400'
                            : report.status === 'In Progress'
                              ? 'bg-amber-500/20 text-amber-400'
                              : 'bg-gray-500/20 text-gray-400'
                      }`}
                    >
                      {report.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
