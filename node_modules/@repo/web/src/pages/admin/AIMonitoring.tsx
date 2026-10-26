import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Cpu, AlertCircle, CheckCircle2, Target } from 'lucide-react';

const accuracyData = [
  { date: '08/01', accuracy: 92 },
  { date: '08/02', accuracy: 93 },
  { date: '08/03', accuracy: 91 },
  { date: '08/04', accuracy: 95 },
  { date: '08/05', accuracy: 94.8 },
];

const defectFreqData = [
  { name: 'Pothole', count: 450 },
  { name: 'Cracks', count: 320 },
  { name: 'Waterlog', count: 150 },
  { name: 'Manhole', count: 80 },
];

export default function AIMonitoring() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl font-display font-bold text-navy">AI Model Monitoring</h1>
        <p className="text-sm text-slate-500 mt-1">Real-time performance metrics of the computer vision microservice.</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded shadow-sm border border-slate-200 flex items-start gap-4">
          <div className="p-3 bg-blue/10 text-blue rounded-lg"><Cpu className="w-6 h-6" /></div>
          <div>
            <p className="text-slate-500 text-sm font-semibold mb-1">Total Processed</p>
            <p className="text-2xl font-mono font-bold text-navy">15,420</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded shadow-sm border border-slate-200 flex items-start gap-4">
          <div className="p-3 bg-emerald-100 text-emerald-600 rounded-lg"><CheckCircle2 className="w-6 h-6" /></div>
          <div>
            <p className="text-slate-500 text-sm font-semibold mb-1">Successful Detections</p>
            <p className="text-2xl font-mono font-bold text-navy">14,950</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded shadow-sm border border-slate-200 flex items-start gap-4">
          <div className="p-3 bg-red/10 text-red rounded-lg"><AlertCircle className="w-6 h-6" /></div>
          <div>
            <p className="text-slate-500 text-sm font-semibold mb-1">Failed/Uncertain</p>
            <p className="text-2xl font-mono font-bold text-red">470</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded shadow-sm border border-slate-200 flex items-start gap-4">
          <div className="p-3 bg-yellow/20 text-yellow-600 rounded-lg"><Target className="w-6 h-6" /></div>
          <div>
            <p className="text-slate-500 text-sm font-semibold mb-1">Avg Confidence</p>
            <p className="text-2xl font-mono font-bold text-navy">92.4%</p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded shadow-sm border border-slate-200 p-6">
          <h2 className="font-bold text-navy mb-6">Detection Accuracy Trend (Last 5 Days)</h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={accuracyData} margin={{ top: 5, right: 0, bottom: 5, left: -20 }}>
                <defs>
                  <linearGradient id="colorAcc" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2451B7" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#2451B7" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                <YAxis domain={['dataMin - 5', 100]} axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip contentStyle={{ borderRadius: '6px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Area type="monotone" dataKey="accuracy" stroke="#2451B7" strokeWidth={3} fillOpacity={1} fill="url(#colorAcc)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded shadow-sm border border-slate-200 p-6">
          <h2 className="font-bold text-navy mb-6">Identified Defect Frequency</h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={defectFreqData} layout="vertical" margin={{ top: 5, right: 20, bottom: 5, left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                <XAxis type="number" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fill: '#1B2430', fontSize: 12, fontWeight: 500}} />
                <Tooltip cursor={{fill: '#f1f5f9'}} contentStyle={{ borderRadius: '6px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Bar dataKey="count" fill="#1B2430" radius={[0, 4, 4, 0]} barSize={30} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
