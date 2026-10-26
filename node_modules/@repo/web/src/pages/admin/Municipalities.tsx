import { useState } from 'react';
import { Plus, Search, MoreVertical, Edit2, Trash2, MapPin } from 'lucide-react';
import clsx from 'clsx';

// Mock Data
const MUNICIPALITIES = [
  { id: 1, name: 'Central District Admin', district: 'Central', state: 'Delhi', officerCount: 12, activeComplaints: 45, status: 'Active' },
  { id: 2, name: 'South Zone Municipality', district: 'South', state: 'Delhi', officerCount: 8, activeComplaints: 28, status: 'Active' },
  { id: 3, name: 'East Delhi Municipal Corp', district: 'East', state: 'Delhi', officerCount: 15, activeComplaints: 89, status: 'Active' },
  { id: 4, name: 'Noida Authority', district: 'Gautam Buddha Nagar', state: 'Uttar Pradesh', officerCount: 22, activeComplaints: 112, status: 'Active' },
  { id: 5, name: 'Gurugram Metro', district: 'Gurugram', state: 'Haryana', officerCount: 18, activeComplaints: 67, status: 'Inactive' },
];

export default function Municipalities() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-navy">Municipality Management</h1>
          <p className="text-sm text-slate-500 mt-1">Manage jurisdictions and view active complaint loads.</p>
        </div>
        <button className="bg-blue text-white px-4 py-2 rounded text-sm font-semibold hover:bg-blue/90 transition-colors shadow-sm focus-ring flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add Municipality
        </button>
      </div>

      <div className="bg-white rounded shadow-sm border border-slate-200 overflow-hidden flex flex-col">
        {/* Table Header/Toolbar */}
        <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by name or district..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded text-sm focus:outline-none focus:border-blue focus:ring-1 focus:ring-blue"
            />
          </div>
          <div className="text-sm text-slate-500 hidden sm:block">
            Showing {MUNICIPALITIES.length} municipalities
          </div>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-white border-b border-slate-200 text-slate-500 uppercase tracking-wider text-xs font-semibold">
              <tr>
                <th className="px-6 py-4">Municipality Name</th>
                <th className="px-6 py-4">Location</th>
                <th className="px-6 py-4 text-center">Officers</th>
                <th className="px-6 py-4 text-center">Active Complaints</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {MUNICIPALITIES.map((mun) => (
                <tr key={mun.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-semibold text-navy">{mun.name}</p>
                    <p className="text-xs text-slate-500 font-mono mt-0.5">ID: MUN-{mun.id.toString().padStart(4, '0')}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 text-slate-600">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      {mun.district}, {mun.state}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center font-mono text-navy">{mun.officerCount}</td>
                  <td className="px-6 py-4 text-center">
                    <span className={clsx(
                      "font-mono font-semibold",
                      mun.activeComplaints > 100 ? "text-red" : "text-navy"
                    )}>
                      {mun.activeComplaints}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={clsx(
                      "px-2.5 py-1 rounded-full text-xs font-semibold border",
                      mun.status === 'Active' 
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200" 
                        : "bg-slate-100 text-slate-600 border-slate-200"
                    )}>
                      {mun.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button className="p-1.5 text-slate-400 hover:text-blue hover:bg-blue/5 rounded transition-colors focus-ring">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-slate-400 hover:text-red hover:bg-red/5 rounded transition-colors focus-ring">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination placeholder */}
        <div className="p-4 border-t border-slate-200 flex items-center justify-between text-sm text-slate-500">
          <div>Page 1 of 1</div>
          <div className="flex gap-1">
            <button className="px-3 py-1 border border-slate-200 rounded hover:bg-slate-50 disabled:opacity-50">Prev</button>
            <button className="px-3 py-1 border border-slate-200 rounded hover:bg-slate-50 disabled:opacity-50">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
