'use client';

import { ArrowLeft, Search } from 'lucide-react';
import { useState } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface ModulePageProps {
  moduleId: string;
  onBack: () => void;
}

const NEEDS_DATA = [
  { id: 1, title: 'Water shortage in Jiddari ward', category: 'WASH', status: 'Pending', ward: 'Jiddari', date: '2024-02-05', urgency: 'Critical' },
  { id: 2, title: 'Malnutrition cases reported', category: 'Health', status: 'In Review', ward: 'Bolori', date: '2024-02-04', urgency: 'High' },
  { id: 3, title: 'School closure due to insecurity', category: 'Education', status: 'Verified', ward: 'Hausari', date: '2024-02-03', urgency: 'Medium' },
  { id: 4, title: 'Food distribution needed', category: 'Food Security', status: 'In Progress', ward: 'Shehuri', date: '2024-02-02', urgency: 'High' },
  { id: 5, title: 'Shelter reconstruction project', category: 'Shelter', status: 'Completed', ward: 'Gwange', date: '2024-02-01', urgency: 'Low' },
];

const PROJECTS_DATA = [
  { id: 1, title: 'Water Boreholes Installation', status: 'In Progress', progress: 65, budget: '₦45,000,000', spent: '₦28,500,000', partner: 'UNICEF' },
  { id: 2, title: 'Health Center Construction', status: 'Planning', progress: 20, budget: '₦120,000,000', spent: '₦24,000,000', partner: 'WHO' },
  { id: 3, title: 'School Rehabilitation', status: 'In Progress', progress: 45, budget: '₦80,000,000', spent: '₦36,000,000', partner: 'UNICEF' },
];

const WARD_DATA = {
  'Jiddari': { reports: 145, needs: 28, status: 'Critical', lat: 11.8, lng: 13.2 },
  'Bolori': { reports: 128, needs: 24, status: 'High', lat: 11.85, lng: 13.15 },
  'Hausari': { reports: 112, needs: 22, status: 'High', lat: 11.75, lng: 13.25 },
  'Shehuri': { reports: 156, needs: 31, status: 'Critical', lat: 11.9, lng: 13.3 },
  'Gwange': { reports: 98, needs: 19, status: 'Medium', lat: 11.7, lng: 13.1 },
};

const TREND_CHART_DATA = [
  { month: 'Jan', reports: 120, resolved: 45 },
  { month: 'Feb', reports: 180, resolved: 68 },
  { month: 'Mar', reports: 230, resolved: 95 },
  { month: 'Apr', reports: 280, resolved: 142 },
  { month: 'May', reports: 340, resolved: 198 },
  { month: 'Jun', reports: 420, resolved: 256 },
];

export default function ModuleEnhanced({ moduleId, onBack }: ModulePageProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedWard, setSelectedWard] = useState('All');

  const categories = ['All', 'WASH', 'Health', 'Education', 'Food Security', 'Shelter', 'Protection'];
  const wards = ['All', 'Jiddari', 'Bolori', 'Hausari', 'Shehuri', 'Gwange'];

  const getUrgencyColor = (urgency: string) => {
    const colors: Record<string, string> = {
      Critical: 'bg-red-500/20 text-red-400',
      High: 'bg-amber-500/20 text-amber-400',
      Medium: 'bg-yellow-500/20 text-yellow-400',
      Low: 'bg-emerald-500/20 text-emerald-400',
    };
    return colors[urgency] || 'bg-gray-500/20 text-gray-400';
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      Pending: 'bg-gray-500/20 text-gray-400',
      'In Review': 'bg-blue-500/20 text-blue-400',
      Verified: 'bg-blue-500/20 text-blue-400',
      'In Progress': 'bg-amber-500/20 text-amber-400',
      Completed: 'bg-emerald-500/20 text-emerald-400',
      Planning: 'bg-gray-500/20 text-gray-400',
    };
    return colors[status] || 'bg-gray-500/20 text-gray-400';
  };

  const renderNeedsManagement = () => (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-500" />
            <input
              type="text"
              placeholder="Search reports..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-700 border border-slate-600 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <select
          value={selectedWard}
          onChange={(e) => setSelectedWard(e.target.value)}
          className="bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
        >
          {wards.map((ward) => (
            <option key={ward} value={ward}>{ward}</option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="bg-slate-800 rounded-lg border border-slate-700 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-700 bg-slate-700/50">
              <th className="px-6 py-4 text-left font-semibold text-white">Report</th>
              <th className="px-6 py-4 text-left font-semibold text-white">Category</th>
              <th className="px-6 py-4 text-left font-semibold text-white">Ward</th>
              <th className="px-6 py-4 text-left font-semibold text-white">Status</th>
              <th className="px-6 py-4 text-left font-semibold text-white">Urgency</th>
              <th className="px-6 py-4 text-left font-semibold text-white">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700">
            {NEEDS_DATA.filter(
              (item) =>
                (selectedCategory === 'All' || item.category === selectedCategory) &&
                (selectedWard === 'All' || item.ward === selectedWard) &&
                (searchTerm === '' || item.title.toLowerCase().includes(searchTerm.toLowerCase()))
            ).map((item) => (
              <tr key={item.id} className="hover:bg-slate-700/50 transition cursor-pointer">
                <td className="px-6 py-4 text-white hover:text-emerald-400">{item.title}</td>
                <td className="px-6 py-4 text-gray-400">{item.category}</td>
                <td className="px-6 py-4 text-gray-400">{item.ward}</td>
                <td className="px-6 py-4">
                  <span className={`text-xs px-3 py-1 rounded-full font-medium ${getStatusColor(item.status)}`}>
                    {item.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`text-xs px-3 py-1 rounded-full font-medium ${getUrgencyColor(item.urgency)}`}>
                    {item.urgency}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-400">{item.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderProjectTracker = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Active Projects</h2>
        <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg transition font-medium">
          + New Project
        </button>
      </div>

      <div className="grid gap-6">
        {PROJECTS_DATA.map((project) => (
          <div key={project.id} className="bg-slate-800 rounded-lg border border-slate-700 p-6 hover:border-slate-600 transition">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-white">{project.title}</h3>
                <p className="text-gray-400 text-sm mt-1">Lead Partner: {project.partner}</p>
              </div>
              <span className={`text-xs px-3 py-1 rounded-full font-medium ${getStatusColor(project.status)}`}>
                {project.status}
              </span>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400">Progress</span>
                  <span className="text-white font-semibold">{project.progress}%</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div
                    className="bg-emerald-500 h-2 rounded-full transition-all"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-700/50 rounded p-3">
                  <p className="text-gray-400 text-xs">Total Budget</p>
                  <p className="text-white font-semibold mt-1">{project.budget}</p>
                </div>
                <div className="bg-slate-700/50 rounded p-3">
                  <p className="text-gray-400 text-xs">Spent</p>
                  <p className="text-emerald-400 font-semibold mt-1">{project.spent}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderMap = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Geographic Distribution</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map Container */}
        <div className="lg:col-span-2">
          <div className="bg-slate-800 rounded-lg border border-slate-700 p-8 h-96 flex items-center justify-center relative overflow-hidden">
            {/* Interactive SVG Map */}
            <svg width="100%" height="100%" className="absolute inset-0" viewBox="0 0 500 400">
              <defs>
                <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                  <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#475569" strokeWidth="0.5" />
                </pattern>
                <linearGradient id="mapGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#1e293b" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#0f172a" stopOpacity="0.5" />
                </linearGradient>
              </defs>
              <rect width="500" height="400" fill="url(#mapGrad)" />
              <rect width="500" height="400" fill="url(#grid)" />
              
              {/* Connection lines */}
              <line x1="250" y1="150" x2="280" y2="140" stroke="#3b82f6" strokeWidth="1" opacity="0.5" strokeDasharray="5,5" />
              <line x1="250" y1="150" x2="220" y2="170" stroke="#3b82f6" strokeWidth="1" opacity="0.5" strokeDasharray="5,5" />
              <line x1="250" y1="150" x2="300" y2="180" stroke="#3b82f6" strokeWidth="1" opacity="0.5" strokeDasharray="5,5" />
              
              {/* Ward markers */}
              {Object.entries(WARD_DATA).map(([ward, data]) => {
                const isHot = data.status === 'Critical';
                const size = isHot ? 28 : data.status === 'High' ? 24 : 20;
                return (
                  <g key={ward} opacity="0.85" className="transition-opacity hover:opacity-100">
                    {/* Glow */}
                    <circle 
                      cx={(data.lng - 13) * 200 + 250} 
                      cy={(12 - data.lat) * 200 + 100}
                      r={size + 8}
                      fill={data.status === 'Critical' ? '#ef4444' : data.status === 'High' ? '#f59e0b' : '#10b981'}
                      opacity="0.2"
                    />
                    {/* Main circle */}
                    <circle 
                      cx={(data.lng - 13) * 200 + 250} 
                      cy={(12 - data.lat) * 200 + 100}
                      r={size}
                      fill={data.status === 'Critical' ? '#ef4444' : data.status === 'High' ? '#f59e0b' : '#10b981'}
                      opacity="0.85"
                    />
                    {/* Border */}
                    <circle 
                      cx={(data.lng - 13) * 200 + 250} 
                      cy={(12 - data.lat) * 200 + 100}
                      r={size}
                      fill="none"
                      stroke="white"
                      strokeWidth="2"
                    />
                    {/* Label */}
                    <text
                      x={(data.lng - 13) * 200 + 250}
                      y={(12 - data.lat) * 200 + 115}
                      textAnchor="middle"
                      fill="white"
                      fontSize="13"
                      fontWeight="bold"
                    >
                      {data.reports}
                    </text>
                  </g>
                );
              })}
              
              {/* Compass */}
              <g transform="translate(450, 50)">
                <circle r="15" fill="none" stroke="#9ca3af" strokeWidth="1" />
                <line x1="0" y1="-12" x2="0" y2="-18" stroke="#ef4444" strokeWidth="2" />
                <text x="0" y="-22" textAnchor="middle" fill="#9ca3af" fontSize="10" fontWeight="bold">N</text>
              </g>
            </svg>
            <div className="absolute bottom-4 left-4 text-xs text-gray-400">
              <p className="font-semibold">Maiduguri Metropolitan Council</p>
              <p>Borno State, Nigeria</p>
            </div>
          </div>
        </div>

        {/* Ward List */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">Ward Summary</h3>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {Object.entries(WARD_DATA).map(([ward, data]) => (
              <div key={ward} className="bg-slate-700/50 rounded-lg p-4 border border-slate-600 hover:border-emerald-500 transition cursor-pointer">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-white font-semibold">{ward}</p>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                    data.status === 'Critical' ? 'bg-red-500/20 text-red-400' :
                    data.status === 'High' ? 'bg-amber-500/20 text-amber-400' :
                    'bg-emerald-500/20 text-emerald-400'
                  }`}>
                    {data.status}
                  </span>
                </div>
                <div className="space-y-1 text-sm text-gray-300">
                  <p>📊 Reports: <span className="text-emerald-400 font-semibold">{data.reports}</span></p>
                  <p>🔴 Active Needs: <span className="text-amber-400 font-semibold">{data.needs}</span></p>
                  <p className="text-xs text-gray-400 mt-2">Lat: {data.lat}, Lng: {data.lng}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Wards', value: Object.keys(WARD_DATA).length, color: 'blue' },
          { label: 'Total Reports', value: Object.values(WARD_DATA).reduce((sum, w) => sum + w.reports, 0), color: 'emerald' },
          { label: 'Active Needs', value: Object.values(WARD_DATA).reduce((sum, w) => sum + w.needs, 0), color: 'amber' },
          { label: 'Critical Areas', value: Object.values(WARD_DATA).filter(w => w.status === 'Critical').length, color: 'red' },
        ].map((stat, i) => (
          <div key={i} className={`bg-slate-800 rounded-lg border border-slate-700 p-4 text-center`}>
            <p className={`text-${stat.color}-400 text-2xl font-bold`}>{stat.value}</p>
            <p className="text-gray-400 text-sm mt-1">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Analytics & Reports</h2>
      
      {/* Report Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {[
          { title: 'Monthly Trend Report', desc: 'Needs trends over the last 6 months', icon: '📈' },
          { title: 'Ward Performance', desc: 'Comparative analysis by ward', icon: '🗺️' },
          { title: 'Category Breakdown', desc: 'Distribution by sector', icon: '📊' },
          { title: 'Response Time Analysis', desc: 'Average resolution time', icon: '⏱️' },
        ].map((report, i) => (
          <div key={i} className="bg-slate-800 rounded-lg border border-slate-700 p-6 hover:border-emerald-500 transition cursor-pointer">
            <div className="flex items-start gap-3 mb-2">
              <span className="text-2xl">{report.icon}</span>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white">{report.title}</h3>
              </div>
            </div>
            <p className="text-gray-400 text-sm mb-4">{report.desc}</p>
            <button className="text-emerald-400 hover:text-emerald-300 text-sm font-medium">
              View Report →
            </button>
          </div>
        ))}
      </div>

      {/* Trend Chart */}
      <div className="bg-slate-800 rounded-lg border border-slate-700 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Monthly Trend Analysis</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={TREND_CHART_DATA}>
            <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
            <XAxis stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />
            <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569', borderRadius: '8px' }} labelStyle={{ color: '#f1f5f9' }} />
            <Legend />
            <Line type="monotone" dataKey="reports" stroke="#3b82f6" strokeWidth={2} name="Reports" />
            <Line type="monotone" dataKey="resolved" stroke="#10b981" strokeWidth={2} name="Resolved" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: 'Avg Response Time', value: '1.2 days', trend: '↓ 15%' },
          { label: 'Resolution Rate', value: '81%', trend: '↑ 8%' },
          { label: 'Customer Satisfaction', value: '4.5/5', trend: '↑ 12%' },
        ].map((metric, i) => (
          <div key={i} className="bg-slate-800 rounded-lg border border-slate-700 p-6">
            <p className="text-gray-400 text-sm">{metric.label}</p>
            <div className="flex items-baseline gap-3 mt-2">
              <p className="text-2xl font-bold text-white">{metric.value}</p>
              <span className="text-emerald-400 text-sm font-semibold">{metric.trend}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const getModuleContent = () => {
    switch (moduleId) {
      case 'needs-table':
        return { title: 'Needs Management', content: renderNeedsManagement() };
      case 'map':
        return { title: 'Geographic Map', content: renderMap() };
      case 'projects':
        return { title: 'Project Tracker', content: renderProjectTracker() };
      case 'analytics':
        return { title: 'Analytics & Reports', content: renderAnalytics() };
      default:
        return { title: 'Module', content: <p className="text-white">Module not found</p> };
    }
  };

  const moduleInfo = getModuleContent();

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <div className="bg-slate-800 border-b border-slate-700 px-8 py-4 flex items-center gap-4 sticky top-0 z-20">
        <button
          onClick={onBack}
          className="p-2 hover:bg-slate-700 rounded-lg transition flex items-center gap-2 text-gray-400 hover:text-white"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Dashboard
        </button>
        <div>
          <h1 className="text-2xl font-bold text-white">{moduleInfo.title}</h1>
        </div>
      </div>

      {/* Content */}
      <div className="p-8">
        {moduleInfo.content}
      </div>
    </div>
  );
}
