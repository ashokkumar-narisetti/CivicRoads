import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const resolutionData = [
  { name: 'Resolved within SLA (48h)', value: 65, color: '#1B2430' },
  { name: 'Resolved outside SLA', value: 25, color: '#FFC93C' },
  { name: 'Unresolved/Stalled', value: 10, color: '#E63946' },
];

export default function Analytics() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl font-display font-bold text-navy">Deep Analytics</h1>
        <p className="text-sm text-slate-500 mt-1">Geospatial heatmaps and deep SLA resolution metrics.</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Mock Map Card */}
        <div className="bg-white rounded shadow-sm border border-slate-200 p-6 flex flex-col">
          <h2 className="font-bold text-navy mb-4">Complaint Heatmap (Simulated)</h2>
          <div className="flex-1 bg-slate-100 rounded border border-slate-200 min-h-[400px] flex items-center justify-center relative overflow-hidden">
             {/* Map placeholder pattern */}
             <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#1B2430 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
             <div className="relative z-10 flex flex-col items-center">
               <div className="w-16 h-16 rounded-full bg-red/30 animate-pulse flex items-center justify-center">
                 <div className="w-8 h-8 rounded-full bg-red"></div>
               </div>
               <p className="mt-4 font-mono font-bold text-slate-600 bg-white/80 px-2 py-1 rounded">Interactive Map Integration Pending</p>
             </div>
          </div>
        </div>

        {/* SLA Pie Chart */}
        <div className="bg-white rounded shadow-sm border border-slate-200 p-6 flex flex-col">
          <h2 className="font-bold text-navy mb-4">SLA Compliance Rate</h2>
          <div className="flex-1 min-h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={resolutionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={100}
                  outerRadius={140}
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
