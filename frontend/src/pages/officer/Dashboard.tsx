import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  LineChart, Line, PieChart, Pie, Cell, Legend 
} from 'recharts';
import { 
  AlertTriangle, Clock, Target, Wallet, Activity, CheckCircle2, TrendingUp
} from 'lucide-react';

const dailyTrendData = [
  { name: 'Mon', count: 12 }, { name: 'Tue', count: 19 }, { name: 'Wed', count: 15 },
  { name: 'Thu', count: 22 }, { name: 'Fri', count: 30 }, { name: 'Sat', count: 10 }, { name: 'Sun', count: 8 },
];

const severityData = [
  { name: 'Critical', count: 14, fill: '#E63946' },
  { name: 'High', count: 32, fill: '#F28F3B' },
  { name: 'Medium', count: 45, fill: '#FFC93C' },
  { name: 'Low', count: 20, fill: '#2451B7' },
];

const statusData = [
  { name: 'New', value: 15, color: '#94a3b8' },
  { name: 'In Progress', value: 35, color: '#3b82f6' },
  { name: 'Under Review', value: 20, color: '#8b5cf6' },
  { name: 'Completed', value: 30, color: '#10b981' },
];

const defectData = [
  { name: 'Pothole', count: 60 }, { name: 'Cracks', count: 45 }, 
  { name: 'Waterlog', count: 25 }, { name: 'Manhole', count: 15 },
];

export default function OfficerDashboard() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-navy">Central District Overview</h1>
          <p className="text-sm text-slate-500 mt-1">Real-time metrics for your assigned municipality.</p>
        </div>
        <div className="flex gap-2">
          <select className="border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue bg-white">
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
            <option>This Quarter</option>
          </select>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-white p-5 rounded shadow-sm border border-slate-200">
          <div className="flex items-center gap-2 mb-2 text-slate-500">
            <Activity className="w-4 h-4" /> <span className="text-xs font-bold uppercase tracking-wider">Total Active</span>
          </div>
          <p className="text-3xl font-display font-bold text-navy">124</p>
        </div>
        
        <div className="bg-white p-5 rounded shadow-sm border border-slate-200">
          <div className="flex items-center gap-2 mb-2 text-blue">
            <Target className="w-4 h-4" /> <span className="text-xs font-bold uppercase tracking-wider">In Progress</span>
          </div>
          <p className="text-3xl font-display font-bold text-navy">42</p>
        </div>

        <div className="bg-white p-5 rounded shadow-sm border border-slate-200">
          <div className="flex items-center gap-2 mb-2 text-emerald-600">
            <CheckCircle2 className="w-4 h-4" /> <span className="text-xs font-bold uppercase tracking-wider">Completed</span>
          </div>
          <p className="text-3xl font-display font-bold text-navy">89</p>
        </div>

        <div className="bg-white p-5 rounded shadow-sm border border-slate-200 border-l-4 border-l-red">
          <div className="flex items-center gap-2 mb-2 text-red">
            <AlertTriangle className="w-4 h-4" /> <span className="text-xs font-bold uppercase tracking-wider">Critical</span>
          </div>
          <p className="text-3xl font-display font-bold text-red">14</p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-slate-50 p-4 rounded border border-slate-200 text-center">
          <p className="text-xs font-semibold text-slate-500">New Reports</p>
          <p className="text-xl font-bold text-navy mt-1">28</p>
        </div>
        <div className="bg-slate-50 p-4 rounded border border-slate-200 text-center">
          <p className="text-xs font-semibold text-slate-500">Under Review</p>
          <p className="text-xl font-bold text-navy mt-1">15</p>
        </div>
        <div className="bg-slate-50 p-4 rounded border border-slate-200 text-center">
          <p className="text-xs font-semibold text-slate-500">High Severity</p>
          <p className="text-xl font-bold text-navy mt-1">32</p>
        </div>
        <div className="bg-slate-50 p-4 rounded border border-slate-200 text-center flex flex-col items-center">
          <p className="text-xs font-semibold text-slate-500 flex items-center gap-1"><Wallet className="w-3 h-3"/> Est. Cost</p>
          <p className="text-xl font-bold text-navy mt-1 font-mono">₹4.2L</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded shadow-sm border border-slate-200 p-6">
          <h2 className="font-bold text-navy mb-6 flex items-center gap-2"><TrendingUp className="w-4 h-4" /> Daily Inflow</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dailyTrendData} margin={{ top: 5, right: 10, bottom: 5, left: -20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip contentStyle={{ borderRadius: '6px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Line type="monotone" dataKey="count" stroke="#2451B7" strokeWidth={3} dot={{r: 4, strokeWidth: 2}} activeDot={{r: 6}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded shadow-sm border border-slate-200 p-6">
          <h2 className="font-bold text-navy mb-6 flex items-center gap-2"><Clock className="w-4 h-4" /> Status Distribution</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={statusData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={2} dataKey="value">
                  {statusData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: '6px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Legend verticalAlign="bottom" height={36} iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded shadow-sm border border-slate-200 p-6">
          <h2 className="font-bold text-navy mb-6">Severity Breakdown</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={severityData} margin={{ top: 5, right: 0, bottom: 5, left: -20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip cursor={{fill: '#f1f5f9'}} contentStyle={{ borderRadius: '6px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Bar dataKey="count" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded shadow-sm border border-slate-200 p-6">
          <h2 className="font-bold text-navy mb-6">Top Defect Types</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={defectData} layout="vertical" margin={{ top: 5, right: 20, bottom: 5, left: 10 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                <XAxis type="number" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fill: '#1B2430', fontSize: 12, fontWeight: 500}} />
                <Tooltip cursor={{fill: '#f1f5f9'}} contentStyle={{ borderRadius: '6px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Bar dataKey="count" fill="#1B2430" radius={[0, 4, 4, 0]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
