import { useState } from 'react';
import { Search, Filter, Eye, AlertTriangle, Truck, CheckCircle2, Clock, FileSearch } from 'lucide-react';
import clsx from 'clsx';

// Mock Data
const COMPLAINTS = [
  { id: 'RD2026101', date: '2026-08-05 09:30', citizen: 'Aarav Patel', mobile: '+9198***432', municipality: 'Central District Admin', officer: 'Rajesh Kumar', defectType: 'Pothole', severity: 'CRITICAL', cost: '₹4,500', status: 'SUBMITTED' },
  { id: 'RD2026102', date: '2026-08-04 14:15', citizen: 'Neha Gupta', mobile: '+9198***112', municipality: 'South Zone Municipality', officer: 'Priya Sharma', defectType: 'Cracked Road', severity: 'MEDIUM', cost: '₹12,000', status: 'IN_PROGRESS' },
  { id: 'RD2026103', date: '2026-08-03 11:45', citizen: 'Rahul Verma', mobile: '+9198***999', municipality: 'Central District Admin', officer: 'Rajesh Kumar', defectType: 'Waterlogging', severity: 'HIGH', cost: '₹8,500', status: 'ASSIGNED' },
  { id: 'RD2026104', date: '2026-08-01 16:20', citizen: 'Kiran Desai', mobile: '+9198***777', municipality: 'Noida Authority', officer: 'Vikram Reddy', defectType: 'Pothole', severity: 'LOW', cost: '₹2,000', status: 'COMPLETED' },
];

const StatusBadge = ({ status }: { status: string }) => {
  switch (status) {
    case 'SUBMITTED': return <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-600 flex items-center gap-1 w-fit"><Clock className="w-3 h-3"/> Submitted</span>;
    case 'UNDER_REVIEW': return <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-purple-50 text-purple-700 flex items-center gap-1 w-fit"><FileSearch className="w-3 h-3"/> Under Review</span>;
    case 'ASSIGNED': return <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue/10 text-blue flex items-center gap-1 w-fit"><AlertTriangle className="w-3 h-3"/> Assigned</span>;
    case 'IN_PROGRESS': return <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-yellow/20 text-navy flex items-center gap-1 w-fit"><Truck className="w-3 h-3"/> In Progress</span>;
    case 'COMPLETED': return <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 flex items-center gap-1 w-fit"><CheckCircle2 className="w-3 h-3"/> Completed</span>;
    default: return null;
  }
};

export default function Complaints() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="space-y-6 max-w-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-navy">Master Complaint Registry</h1>
          <p className="text-sm text-slate-500 mt-1">Global view of all road defect reports across the state.</p>
        </div>
        <button className="bg-white border border-slate-300 text-navy px-4 py-2 rounded text-sm font-semibold hover:bg-slate-50 transition-colors shadow-sm focus-ring flex items-center gap-2">
          Export Selection
        </button>
      </div>

      <div className="bg-white rounded shadow-sm border border-slate-200 overflow-hidden flex flex-col">
        {/* Toolbar & Filters */}
        <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between bg-slate-50 gap-4">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search ID, Citizen, or Phone..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded text-sm focus:outline-none focus:border-blue focus:ring-1 focus:ring-blue"
            />
          </div>
          <div className="flex flex-wrap gap-2 w-full sm:w-auto">
            <button className="flex items-center gap-2 px-3 py-2 border border-slate-300 rounded text-sm bg-white hover:bg-slate-50 font-medium text-slate-600 focus-ring">
              <Filter className="w-4 h-4" /> Filters
            </button>
            <select className="border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue bg-white hidden md:block">
              <option>All Municipalities</option>
            </select>
            <select className="border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue bg-white hidden md:block">
              <option>All Statuses</option>
            </select>
          </div>
        </div>

        {/* Advanced Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-white border-b border-slate-200 text-slate-500 uppercase tracking-wider text-[11px] font-bold">
              <tr>
                <th className="px-6 py-4">Complaint ID & Date</th>
                <th className="px-6 py-4">Citizen</th>
                <th className="px-6 py-4">Jurisdiction & Officer</th>
                <th className="px-6 py-4">AI Assessment</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {COMPLAINTS.map((complaint) => (
                <tr key={complaint.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-bold font-mono text-navy text-base">{complaint.id}</p>
                    <p className="text-xs text-slate-400 font-mono mt-0.5">{complaint.date}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-semibold text-slate-700">{complaint.citizen}</p>
                    <p className="text-xs text-slate-400 font-mono mt-0.5">{complaint.mobile}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-medium text-navy text-xs">{complaint.municipality}</p>
                    <p className="text-xs text-blue font-semibold mt-0.5">OFC: {complaint.officer}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1">
                      <p className="font-medium text-slate-700 text-xs">{complaint.defectType}</p>
                      <div className="flex gap-2 items-center">
                        <span className={clsx("text-[10px] font-bold font-mono uppercase", 
                          complaint.severity === 'CRITICAL' ? 'text-red' : 
                          complaint.severity === 'HIGH' ? 'text-[#F28F3B]' : 
                          complaint.severity === 'MEDIUM' ? 'text-yellow' : 'text-blue'
                        )}>
                          {complaint.severity}
                        </span>
                        <span className="text-[10px] font-mono text-slate-400">{complaint.cost}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={complaint.status} />
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue border border-blue/30 bg-blue/5 hover:bg-blue/10 px-3 py-1.5 rounded transition-colors focus-ring">
                      <Eye className="w-3.5 h-3.5" /> View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="p-4 border-t border-slate-200 flex items-center justify-between text-sm text-slate-500 bg-slate-50">
          <div>Showing 1 to 4 of 1,245 entries</div>
          <div className="flex gap-1">
            <button className="px-3 py-1.5 border border-slate-300 rounded bg-white hover:bg-slate-50 disabled:opacity-50 focus-ring font-medium">Previous</button>
            <button className="px-3 py-1.5 border border-slate-300 rounded bg-white hover:bg-slate-50 disabled:opacity-50 focus-ring font-medium">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
