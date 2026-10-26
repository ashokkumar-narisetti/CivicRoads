import { useState } from 'react';
import { Plus, Search, ShieldCheck, Edit2, Mail, Phone } from 'lucide-react';
import clsx from 'clsx';

// Mock Data
const OFFICERS = [
  { id: 'OFC-001', name: 'Rajesh Kumar', email: 'rajesh.k@civicroads.gov', phone: '+91 98765 11111', municipality: 'Central District Admin', status: 'Active', lastLogin: '2 hrs ago' },
  { id: 'OFC-002', name: 'Priya Sharma', email: 'priya.s@civicroads.gov', phone: '+91 98765 22222', municipality: 'South Zone Municipality', status: 'Active', lastLogin: '5 mins ago' },
  { id: 'OFC-003', name: 'Amit Singh', email: 'amit.singh@civicroads.gov', phone: '+91 98765 33333', municipality: 'East Delhi Municipal Corp', status: 'On Leave', lastLogin: '3 days ago' },
  { id: 'OFC-004', name: 'Vikram Reddy', email: 'v.reddy@civicroads.gov', phone: '+91 98765 44444', municipality: 'Noida Authority', status: 'Active', lastLogin: '1 hr ago' },
];

export default function Officers() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-navy">Officer Roster</h1>
          <p className="text-sm text-slate-500 mt-1">Manage municipal officers, reset passwords, and assign jurisdictions.</p>
        </div>
        <button className="bg-blue text-white px-4 py-2 rounded text-sm font-semibold hover:bg-blue/90 transition-colors shadow-sm focus-ring flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add Officer
        </button>
      </div>

      <div className="bg-white rounded shadow-sm border border-slate-200 overflow-hidden flex flex-col">
        {/* Table Header/Toolbar */}
        <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by name, ID, or municipality..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded text-sm focus:outline-none focus:border-blue focus:ring-1 focus:ring-blue"
            />
          </div>
          <div className="flex gap-2">
            <select className="border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue bg-white">
              <option>All Statuses</option>
              <option>Active</option>
              <option>Inactive</option>
              <option>On Leave</option>
            </select>
          </div>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-white border-b border-slate-200 text-slate-500 uppercase tracking-wider text-xs font-semibold">
              <tr>
                <th className="px-6 py-4">Officer Details</th>
                <th className="px-6 py-4">Contact</th>
                <th className="px-6 py-4">Assigned Municipality</th>
                <th className="px-6 py-4">Status & Activity</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {OFFICERS.map((officer) => (
                <tr key={officer.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue/10 flex items-center justify-center text-blue font-bold">
                        {officer.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-navy">{officer.name}</p>
                        <p className="text-xs text-slate-500 font-mono mt-0.5">{officer.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 text-slate-600 text-xs">
                        <Mail className="w-3.5 h-3.5 text-slate-400" /> {officer.email}
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-600 text-xs">
                        <Phone className="w-3.5 h-3.5 text-slate-400" /> {officer.phone}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-blue" />
                      <span className="font-medium text-slate-700">{officer.municipality}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <span className={clsx(
                        "inline-block px-2 py-0.5 rounded text-xs font-semibold",
                        officer.status === 'Active' ? "bg-emerald-100 text-emerald-700" :
                        officer.status === 'On Leave' ? "bg-yellow/20 text-navy" :
                        "bg-slate-100 text-slate-600"
                      )}>
                        {officer.status}
                      </span>
                      <p className="text-xs text-slate-400 font-mono">Login: {officer.lastLogin}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button className="text-xs font-semibold text-blue border border-blue/30 bg-blue/5 hover:bg-blue/10 px-3 py-1.5 rounded transition-colors focus-ring">
                        Manage
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
