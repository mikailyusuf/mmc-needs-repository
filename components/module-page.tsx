'use client';

import { ArrowLeft, ChevronDown, Plus, Search } from 'lucide-react';
import { useState } from 'react';

interface ModulePageProps {
  moduleId: string;
  onBack: () => void;
}

const NEEDS_DATA = [
  {
    id: 1,
    title: 'Water shortage in Jiddari ward',
    category: 'WASH',
    status: 'Pending',
    ward: 'Jiddari',
    date: '2024-02-05',
    urgency: 'Critical',
  },
  {
    id: 2,
    title: 'Malnutrition cases reported',
    category: 'Health',
    status: 'In Review',
    ward: 'Bolori',
    date: '2024-02-04',
    urgency: 'High',
  },
  {
    id: 3,
    title: 'School closure due to insecurity',
    category: 'Education',
    status: 'Verified',
    ward: 'Hausari',
    date: '2024-02-03',
    urgency: 'Medium',
  },
  {
    id: 4,
    title: 'Food distribution needed',
    category: 'Food Security',
    status: 'In Progress',
    ward: 'Shehuri',
    date: '2024-02-02',
    urgency: 'High',
  },
  {
    id: 5,
    title: 'Shelter reconstruction project',
    category: 'Shelter',
    status: 'Completed',
    ward: 'Gwange',
    date: '2024-02-01',
    urgency: 'Low',
  },
];

const PROJECTS_DATA = [
  {
    id: 1,
    title: 'Water Boreholes Installation',
    status: 'In Progress',
    progress: 65,
    budget: '$45,000',
    spent: '$28,500',
    partner: 'UNICEF',
  },
  {
    id: 2,
    title: 'Health Center Construction',
    status: 'Planning',
    progress: 20,
    budget: '$120,000',
    spent: '$24,000',
    partner: 'WHO',
  },
  {
    id: 3,
    title: 'School Rehabilitation',
    status: 'In Progress',
    progress: 45,
    budget: '$80,000',
    spent: '$36,000',
    partner: 'UNICEF',
  },
];

export default function ModulePage({ moduleId, onBack }: ModulePageProps) {
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
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <select
          value={selectedWard}
          onChange={(e) => setSelectedWard(e.target.value)}
          className="bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
        >
          {wards.map((ward) => (
            <option key={ward} value={ward}>
              {ward}
            </option>
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
              <tr
                key={item.id}
                className="hover:bg-slate-700/50 transition cursor-pointer"
              >
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
        <button className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg transition">
          <Plus className="w-5 h-5" />
          New Project
        </button>
      </div>

      <div className="grid gap-6">
        {PROJECTS_DATA.map((project) => (
          <div key={project.id} className="bg-slate-800 rounded-lg border border-slate-700 p-6">
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
      <div className="bg-slate-800 rounded-lg border border-slate-700 p-8 h-96 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400 mb-4">Ward Map Visualization</p>
          <div className="grid grid-cols-3 gap-4">
            {wards.slice(1).map((ward) => (
              <div key={ward} className="bg-slate-700 rounded-lg p-4 cursor-pointer hover:bg-slate-600 transition">
                <p className="text-white font-semibold">{ward}</p>
                <p className="text-emerald-400 text-sm mt-2">24 Reports</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Analytics & Reports</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {[
          { title: 'Monthly Trend Report', desc: 'Needs trends over the last 6 months' },
          { title: 'Ward Performance', desc: 'Comparative analysis by ward' },
          { title: 'Category Breakdown', desc: 'Distribution by sector' },
          { title: 'Response Time Analysis', desc: 'Average resolution time' },
        ].map((report, i) => (
          <div
            key={i}
            className="bg-slate-800 rounded-lg border border-slate-700 p-6 hover:border-emerald-500 transition cursor-pointer"
          >
            <h3 className="text-lg font-semibold text-white mb-2">{report.title}</h3>
            <p className="text-gray-400 text-sm mb-4">{report.desc}</p>
            <button className="text-emerald-400 hover:text-emerald-300 text-sm font-medium">
              View Report →
            </button>
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
      <div className="bg-slate-800 border-b border-slate-700 px-8 py-4 flex items-center gap-4">
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
