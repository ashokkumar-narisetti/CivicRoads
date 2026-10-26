import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend } from 'recharts';

const trendData = [
  { name: 'Mon', new: 12, resolved: 8 },
  { name: 'Tue', new: 19, resolved: 15 },
  { name: 'Wed', new: 15, resolved: 22 },
  { name: 'Thu', new: 22, resolved: 18 },
  { name: 'Fri', new: 30, resolved: 25 },
  { name: 'Sat', new: 10, resolved: 5 },
  { name: 'Sun', new: 8, resolved: 12 },
];

const severityData = [
  { name: 'Critical', count: 24, fill: '#E63946' }, // Signal Red
  { name: 'High', count: 45, fill: '#F28F3B' },
  { name: 'Medium', count: 86, fill: '#FFC93C' }, // Road Marking Yellow
  { name: 'Low', count: 120, fill: '#2451B7' }, // Trust Blue
];

export default function AdminDashboard() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-navy">Analytics Overview</h1>
          <p className="text-sm text-slate-500 mt-1">Real-time metrics across all municipalities</p>
        </div>
        <div className="flex gap-2">
          <select className="border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue bg-white">
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
            <option>This Year</option>
          </select>
          <button className="bg-blue text-white px-4 py-2 rounded text-sm font-semibold hover:bg-blue/90 transition-colors shadow-sm focus-ring">
            Export Report
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded shadow-sm border border-slate-200">
          <p className="text-slate-500 text-sm font-semibold mb-1">Total Complaints</p>
          <p className="text-3xl font-display font-bold text-navy">1,245</p>
          <p className="text-xs text-emerald-600 mt-2 font-medium flex items-center gap-1">
            ↑ 12% vs last week
          </p>
        </div>
        <div className="bg-white p-6 rounded shadow-sm border border-slate-200">
          <p className="text-slate-500 text-sm font-semibold mb-1">Resolved (30d)</p>
          <p className="text-3xl font-display font-bold text-blue">892</p>
          <p className="text-xs text-slate-400 mt-2 font-medium">71% resolution rate</p>
        </div>
        <div className="bg-white p-6 rounded shadow-sm border border-slate-200">
          <p className="text-slate-500 text-sm font-semibold mb-1">Avg Resolution Time</p>
          <p className="text-3xl font-display font-bold text-navy font-mono">4.2 <span className="text-lg">days</span></p>
          <p className="text-xs text-emerald-600 mt-2 font-medium">↓ 0.5 days vs last month</p>
        </div>
        <div className="bg-white p-6 rounded shadow-sm border border-slate-200 border-t-4 border-t-red">
          <p className="text-slate-500 text-sm font-semibold mb-1">Critical Backlog</p>
          <p className="text-3xl font-display font-bold text-red">14</p>
          <p className="text-xs text-red mt-2 font-medium flex items-center gap-1">
            Requires immediate attention
          </p>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Trend Chart */}
        <div className="lg:col-span-2 bg-white rounded shadow-sm border border-slate-200 p-6">
          <h2 className="font-bold text-navy mb-6">Complaint Trends</h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '6px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  cursor={{stroke: '#e2e8f0', strokeWidth: 2}}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px' }} />
                <Line type="monotone" name="New Reports" dataKey="new" stroke="#1B2430" strokeWidth={3} dot={{r: 4, strokeWidth: 2}} activeDot={{r: 6}} />
                <Line type="monotone" name="Resolved" dataKey="resolved" stroke="#2451B7" strokeWidth={3} dot={{r: 4, strokeWidth: 2}} activeDot={{r: 6}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Severity Chart */}
        <div className="bg-white rounded shadow-sm border border-slate-200 p-6">
          <h2 className="font-bold text-navy mb-6">Severity Distribution</h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={severityData} margin={{ top: 5, right: 0, bottom: 5, left: -20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip 
                  cursor={{fill: '#f1f5f9'}}
                  contentStyle={{ borderRadius: '6px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="count" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Secondary Metrics */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
         <div className="bg-white p-6 rounded shadow-sm border border-slate-200">
          <p className="text-slate-500 text-sm font-semibold mb-1">Total Estimated Cost</p>
          <p className="text-2xl font-mono font-bold text-navy">₹4.2M</p>
        </div>
        <div className="bg-white p-6 rounded shadow-sm border border-slate-200">
          <p className="text-slate-500 text-sm font-semibold mb-1">Total Municipalities</p>
          <p className="text-2xl font-mono font-bold text-navy">128</p>
        </div>
        <div className="bg-white p-6 rounded shadow-sm border border-slate-200">
          <p className="text-slate-500 text-sm font-semibold mb-1">Active Officers</p>
          <p className="text-2xl font-mono font-bold text-navy">342</p>
        </div>
        <div className="bg-white p-6 rounded shadow-sm border border-slate-200">
          <p className="text-slate-500 text-sm font-semibold mb-1">AI Accuracy Rate</p>
          <p className="text-2xl font-mono font-bold text-navy">94.8%</p>
        </div>
      </div>
    </div>
  );
}
