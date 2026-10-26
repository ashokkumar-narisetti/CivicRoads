import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  BarChart, Bar, PieChart, Pie, Cell, Legend 
} from 'recharts';

const trendData = [
  { month: 'Jan', complaints: 65, resolved: 40 },
  { month: 'Feb', complaints: 85, resolved: 55 },
  { month: 'Mar', complaints: 120, resolved: 90 },
  { month: 'Apr', complaints: 95, resolved: 85 },
  { month: 'May', complaints: 140, resolved: 110 },
  { month: 'Jun', complaints: 115, resolved: 105 },
];

const severityAreasData = [
  { area: 'Sector 4', count: 45 },
  { area: 'Market Road', count: 32 },
  { area: 'Civil Lines', count: 28 },
  { area: 'Station Rd', count: 18 },
  { area: 'Metro Pillar 42', count: 15 },
];

const resolutionData = [
  { name: 'Within SLA', value: 78, color: '#10b981' },
  { name: 'Breached SLA', value: 22, color: '#ef4444' },
];

export default function Analytics() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl font-display font-bold text-navy">Municipality Analytics</h1>
        <p className="text-sm text-slate-500 mt-1">Deep insights exclusively for Central District.</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        
        {/* Trend Area Chart */}
        <div className="bg-white rounded shadow-sm border border-slate-200 p-6 lg:col-span-2">
          <h2 className="font-bold text-navy mb-6">6-Month Trend: Incoming vs Resolved</h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData} margin={{ top: 5, right: 0, bottom: 5, left: -20 }}>
                <defs>
                  <linearGradient id="colorComp" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1B2430" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#1B2430" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorRes" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2451B7" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#2451B7" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip contentStyle={{ borderRadius: '6px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Legend iconType="circle" />
                <Area type="monotone" name="Incoming Complaints" dataKey="complaints" stroke="#1B2430" strokeWidth={3} fillOpacity={1} fill="url(#colorComp)" />
                <Area type="monotone" name="Resolved Complaints" dataKey="resolved" stroke="#2451B7" strokeWidth={3} fillOpacity={1} fill="url(#colorRes)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* High Severity Areas */}
        <div className="bg-white rounded shadow-sm border border-slate-200 p-6">
          <h2 className="font-bold text-navy mb-6">High Severity Hotspots</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={severityAreasData} layout="vertical" margin={{ top: 5, right: 20, bottom: 5, left: 10 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                <XAxis type="number" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <YAxis dataKey="area" type="category" axisLine={false} tickLine={false} tick={{fill: '#1B2430', fontSize: 12, fontWeight: 500}} />
                <Tooltip cursor={{fill: '#f1f5f9'}} contentStyle={{ borderRadius: '6px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Bar dataKey="count" fill="#E63946" radius={[0, 4, 4, 0]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Resolution Rate */}
        <div className="bg-white rounded shadow-sm border border-slate-200 p-6 flex flex-col">
          <h2 className="font-bold text-navy mb-4">SLA Resolution Rate</h2>
          <div className="flex-1 min-h-[250px] relative">
            <div className="absolute inset-0 flex items-center justify-center flex-col z-10 pointer-events-none">
              <span className="text-3xl font-display font-bold text-navy">78%</span>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Compliance</span>
            </div>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={resolutionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {resolutionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: '6px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Legend verticalAlign="bottom" height={36} iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
}
