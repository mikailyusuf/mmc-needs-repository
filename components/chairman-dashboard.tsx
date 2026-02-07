'use client';

import { useState } from 'react';
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
} from 'recharts';
import {
  AlertCircle,
  CheckCircle,
  Clock,
  LogOut,
  Menu,
  X,
  TrendingUp,
  MapPin,
  FileText,
  Users,
  Zap,
  Award,
  Download,
  Eye,
  Lock,
  Bell,
} from 'lucide-react';

// Chairman's KPI Data
const CHAIRMAN_KPIs = [
  {
    label: 'Total Ward Reports This Month',
    value: '248',
    change: '+12%',
    icon: Bell,
    color: 'emerald',
  },
  {
    label: 'Urgent Needs (0-30 Days)',
    value: '24',
    change: '-5%',
    icon: AlertCircle,
    color: 'red',
  },
  {
    label: 'Avg Response Time',
    value: '4.2 days',
    change: '-18%',
    icon: Clock,
    color: 'blue',
  },
  {
    label: 'Projects Completed',
    value: '18/45',
    change: '+8%',
    icon: CheckCircle,
    color: 'emerald',
  },
];

// Simplified LGA-Friendly Categories
const NEED_CATEGORIES = [
  { name: 'Roads & Drainage', count: 45, color: '#3b82f6', icon: '🛣️' },
  { name: 'Primary Health', count: 32, color: '#10b981', icon: '🏥' },
  { name: 'Schools & Teachers', count: 28, color: '#f59e0b', icon: '🎓' },
  { name: 'Water & Sanitation', count: 52, color: '#8b5cf6', icon: '💧' },
  { name: 'Markets & Livelihoods', count: 18, color: '#ec4899', icon: '🏪' },
  { name: 'Security & Social', count: 8, color: '#ef4444', icon: '🔒' },
];

// Status Lifecycle Data
const STATUS_LIFECYCLE = [
  { stage: 'Reported', count: 248, color: '#94a3b8' },
  { stage: 'Reviewed', count: 189, color: '#3b82f6' },
  { stage: 'Approved', count: 156, color: '#8b5cf6' },
  { stage: 'Budgeted', count: 98, color: '#f59e0b' },
  { stage: 'Implementing', count: 45, color: '#10b981' },
  { stage: 'Completed', count: 18, color: '#06b6d4' },
];

// Ward Performance Data
const WARD_PERFORMANCE = [
  { ward: 'Jiddari', reporting: 85, responsive: 92, completion: 78, trust: 89 },
  { ward: 'Bolori', reporting: 76, responsive: 85, completion: 72, trust: 81 },
  { ward: 'Hausari', reporting: 68, responsive: 78, completion: 65, trust: 74 },
  { ward: 'Shehuri', reporting: 92, responsive: 88, completion: 82, trust: 90 },
  { ward: 'Gwange', reporting: 71, responsive: 79, completion: 68, trust: 75 },
];

export default function ChairmanDashboard({ onLogout }: { onLogout: () => void }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeView, setActiveView] = useState<'overview' | 'alerts' | 'performance' | 'budget'>('overview');

  const exportBriefing = () => {
    console.log('[v0] Exporting briefing PDF...');
    // In real implementation, this would generate a PDF
    alert('Briefing PDF exported (1-click feature)');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur border-b border-slate-700 shadow-lg">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-slate-800 rounded-lg transition"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <div>
              <h1 className="text-2xl font-bold text-white">Chairman's Delivery Dashboard</h1>
              <p className="text-sm text-gray-400">LGA Community Needs & Projects Overview</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={exportBriefing}
              className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition"
            >
              <Download className="w-4 h-4" />
              Export Briefing
            </button>
            <button
              onClick={onLogout}
              className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="flex gap-6 p-6">
        {/* Sidebar Navigation */}
        {sidebarOpen && (
          <aside className="w-56 bg-slate-800/50 backdrop-blur rounded-lg border border-slate-700 p-4 h-fit sticky top-24">
            <nav className="space-y-2">
              {[
                { id: 'overview', label: 'Dashboard Overview', icon: '📊' },
                { id: 'alerts', label: 'Urgent Alerts', icon: '🚨' },
                { id: 'performance', label: 'Ward Performance', icon: '⭐' },
                { id: 'budget', label: 'Budget & Committees', icon: '💰' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveView(item.id as any)}
                  className={`w-full text-left px-4 py-3 rounded-lg transition ${
                    activeView === item.id
                      ? 'bg-emerald-600 text-white'
                      : 'text-gray-300 hover:bg-slate-700'
                  }`}
                >
                  <span className="mr-2">{item.icon}</span>
                  {item.label}
                </button>
              ))}
            </nav>
          </aside>
        )}

        {/* Main Content */}
        <main className="flex-1 space-y-6">
          {activeView === 'overview' && (
            <>
              {/* KPI Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {CHAIRMAN_KPIs.map((kpi, i) => {
                  const Icon = kpi.icon;
                  return (
                    <div key={i} className="bg-slate-800 border border-slate-700 rounded-lg p-6 hover:border-emerald-500 transition">
                      <div className="flex items-center justify-between mb-4">
                        <Icon className={`w-8 h-8 text-${kpi.color}-400`} />
                        <span className="text-sm font-semibold text-emerald-400">{kpi.change}</span>
                      </div>
                      <p className="text-gray-400 text-sm mb-1">{kpi.label}</p>
                      <p className="text-3xl font-bold text-white">{kpi.value}</p>
                    </div>
                  );
                })}
              </div>

              {/* Top Row: Status Lifecycle & Category Distribution */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Status Lifecycle - What Needs Attention */}
                <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
                  <h2 className="text-lg font-semibold text-white mb-4">Ward Reports Status Flow</h2>
                  <p className="text-sm text-gray-400 mb-4">Track: Reported → Reviewed → Approved → Budgeted → Implementing → Completed</p>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={STATUS_LIFECYCLE}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                      <XAxis stroke="#9ca3af" angle={-45} textAnchor="end" height={80} />
                      <YAxis stroke="#9ca3af" />
                      <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569', borderRadius: '8px' }} />
                      <Bar dataKey="count" fill="#10b981" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* Category Distribution */}
                <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
                  <h2 className="text-lg font-semibold text-white mb-4">Needs by LGA Service Category</h2>
                  <div className="space-y-3">
                    {NEED_CATEGORIES.map((cat, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <span className="text-2xl">{cat.icon}</span>
                        <div className="flex-1">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-white font-medium">{cat.name}</span>
                            <span className="text-emerald-400 font-bold">{cat.count}</span>
                          </div>
                          <div className="w-full bg-slate-700 rounded-full h-2">
                            <div
                              className="h-2 rounded-full"
                              style={{ width: `${(cat.count / 52) * 100}%`, backgroundColor: cat.color }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Map: "What Needs My Attention Today?" */}
              <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
                <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-emerald-400" />
                  Ward Heat Map - What Needs Attention Today?
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  {WARD_PERFORMANCE.map((ward, i) => (
                    <div
                      key={i}
                      className="bg-slate-700/50 border border-slate-600 rounded-lg p-4 hover:border-emerald-400 transition cursor-pointer text-center"
                    >
                      <p className="text-white font-bold text-lg mb-2">{ward.ward}</p>
                      <div className="space-y-1 text-sm">
                        <p className="text-gray-300">
                          Reports: <span className="text-emerald-400 font-semibold">{ward.reporting}%</span>
                        </p>
                        <p className="text-gray-300">
                          Response: <span className="text-emerald-400 font-semibold">{ward.responsive}%</span>
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {activeView === 'alerts' && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-white">Urgent Alerts - 0 to 30 Days</h2>
              <div className="grid gap-4">
                {[
                  { id: 1, ward: 'Jiddari', issue: 'Critical water shortage - 3 communities', urgency: 'Critical', days: '2' },
                  { id: 2, ward: 'Shehuri', issue: 'School roof collapse - safety risk', urgency: 'Critical', days: '5' },
                  { id: 3, ward: 'Bolori', issue: 'Health center power outage', urgency: 'High', days: '12' },
                  { id: 4, ward: 'Hausari', issue: 'Road erosion - 4 bridges affected', urgency: 'High', days: '18' },
                ].map((alert) => (
                  <div key={alert.id} className="bg-slate-800 border border-slate-700 rounded-lg p-4 flex items-center justify-between hover:border-red-500 transition">
                    <div className="flex items-center gap-4">
                      <AlertCircle className={`w-6 h-6 ${alert.urgency === 'Critical' ? 'text-red-500' : 'text-amber-500'}`} />
                      <div>
                        <p className="text-white font-semibold">{alert.ward}: {alert.issue}</p>
                        <p className="text-sm text-gray-400">Reported {alert.days} days ago</p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${alert.urgency === 'Critical' ? 'bg-red-500/20 text-red-400' : 'bg-amber-500/20 text-amber-400'}`}>
                      {alert.urgency}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeView === 'performance' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white">Ward Performance Scorecard</h2>
              <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={WARD_PERFORMANCE}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                    <XAxis stroke="#9ca3af" dataKey="ward" />
                    <YAxis stroke="#9ca3af" />
                    <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569', borderRadius: '8px' }} />
                    <Legend />
                    <Line type="monotone" dataKey="reporting" stroke="#3b82f6" strokeWidth={2} name="Reporting Rate %" />
                    <Line type="monotone" dataKey="responsive" stroke="#10b981" strokeWidth={2} name="Response Time %" />
                    <Line type="monotone" dataKey="completion" stroke="#f59e0b" strokeWidth={2} name="Completion %" />
                    <Line type="monotone" dataKey="trust" stroke="#ec4899" strokeWidth={2} name="Community Trust %" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {activeView === 'budget' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white">Budget & Committee Alignment</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {[
                  { dept: 'Works Department', approved: 85, funded: 72, implementing: 45, status: 'On Track' },
                  { dept: 'Health Services', approved: 68, funded: 52, implementing: 28, status: 'Delayed' },
                  { dept: 'Education', approved: 54, funded: 42, implementing: 18, status: 'On Track' },
                  { dept: 'Water & Environment', approved: 92, funded: 78, implementing: 52, status: 'On Track' },
                ].map((dept, i) => (
                  <div key={i} className="bg-slate-800 border border-slate-700 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <p className="text-white font-semibold">{dept.dept}</p>
                      <span className={`text-xs px-2 py-1 rounded font-semibold ${dept.status === 'On Track' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'}`}>
                        {dept.status}
                      </span>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Approved:</span>
                        <span className="text-white font-semibold">{dept.approved} projects</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Funded:</span>
                        <span className="text-emerald-400 font-semibold">{dept.funded} projects</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Implementing:</span>
                        <span className="text-blue-400 font-semibold">{dept.implementing} projects</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
