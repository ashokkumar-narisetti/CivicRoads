import { useState } from 'react';
import { ArrowRight, Search, ShieldCheck, UserCheck } from 'lucide-react';
import clsx from 'clsx';

const MOCK_COMPLAINTS = [
  { id: 'RD2026101', defect: 'Deep Pothole', location: 'Main Street, Central', currentOfficer: 'Rajesh Kumar (Central)' },
  { id: 'RD2026105', defect: 'Broken Sidewalk', location: 'Market Road, South', currentOfficer: 'Priya Sharma (South)' },
];

const MOCK_OFFICERS = [
  { id: 'OFC-001', name: 'Rajesh Kumar', zone: 'Central District' },
  { id: 'OFC-002', name: 'Priya Sharma', zone: 'South Zone' },
  { id: 'OFC-003', name: 'Amit Singh', zone: 'East Delhi' },
  { id: 'OFC-004', name: 'Vikram Reddy', zone: 'Noida Authority' },
];

export default function Reassignment() {
  const [selectedComplaint, setSelectedComplaint] = useState(MOCK_COMPLAINTS[0]);
  const [selectedOfficer, setSelectedOfficer] = useState('');

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div>
        <h1 className="text-2xl font-display font-bold text-navy">Complaint Reassignment</h1>
        <p className="text-sm text-slate-500 mt-1">Transfer jurisdiction of complaints between municipal officers.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Step 1: Select Complaint */}
        <div className="bg-white rounded shadow-sm border border-slate-200 overflow-hidden flex flex-col h-[500px]">
          <div className="p-4 border-b border-slate-200 bg-slate-50 font-semibold text-navy flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-blue text-white flex items-center justify-center text-xs">1</span>
            Select Complaint
          </div>
          <div className="p-4 border-b border-slate-100">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search by Complaint ID..." 
                className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded text-sm focus:outline-none focus:border-blue focus:ring-1 focus:ring-blue"
              />
            </div>
          </div>
          <div className="overflow-y-auto flex-1 p-2 space-y-2 bg-slate-50">
            {MOCK_COMPLAINTS.map(c => (
              <button 
                key={c.id}
                onClick={() => setSelectedComplaint(c)}
                className={clsx(
                  "w-full text-left p-4 rounded border transition-all",
                  selectedComplaint.id === c.id 
                    ? "bg-blue/5 border-blue/50 ring-1 ring-blue" 
                    : "bg-white border-slate-200 hover:border-blue/30"
                )}
              >
                <div className="font-mono font-bold text-navy">{c.id}</div>
                <div className="text-sm text-slate-700 mt-1">{c.defect} - {c.location}</div>
                <div className="text-xs text-slate-500 mt-2 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> Current: {c.currentOfficer}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Step 2: Select New Officer */}
        <div className="bg-white rounded shadow-sm border border-slate-200 overflow-hidden flex flex-col h-[500px] relative">
          <div className="p-4 border-b border-slate-200 bg-slate-50 font-semibold text-navy flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-blue text-white flex items-center justify-center text-xs">2</span>
            Assign New Officer
          </div>
          <div className="p-4 border-b border-slate-100">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search officers by name or zone..." 
                className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded text-sm focus:outline-none focus:border-blue focus:ring-1 focus:ring-blue"
              />
            </div>
          </div>
          <div className="overflow-y-auto flex-1 p-2 space-y-2">
            {MOCK_OFFICERS.map(o => (
              <button 
                key={o.id}
                onClick={() => setSelectedOfficer(o.id)}
                className={clsx(
                  "w-full text-left p-3 rounded border transition-all flex items-center justify-between",
                  selectedOfficer === o.id 
                    ? "bg-blue/5 border-blue/50 ring-1 ring-blue" 
                    : "bg-white border-slate-200 hover:border-blue/30"
                )}
              >
                <div>
                  <div className="font-semibold text-navy">{o.name}</div>
                  <div className="text-xs text-slate-500">{o.zone}</div>
                </div>
                {selectedOfficer === o.id && <UserCheck className="w-5 h-5 text-blue" />}
              </button>
            ))}
          </div>
          
          <div className="p-4 border-t border-slate-200 bg-slate-50">
            <button 
              disabled={!selectedOfficer}
              className="w-full bg-blue text-white py-3 rounded font-bold hover:bg-blue/90 transition-colors focus-ring disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              Transfer Complaint <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
