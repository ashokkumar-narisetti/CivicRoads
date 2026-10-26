import { FileText, Download, FileSpreadsheet } from 'lucide-react';

export default function Reports() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-display font-bold text-navy">Generate Reports</h1>
        <p className="text-sm text-slate-500 mt-1">Export official data for Central District.</p>
      </div>

      <div className="bg-white rounded shadow-sm border border-slate-200 p-6 sm:p-8">
        <h2 className="font-bold text-navy mb-6 text-lg border-b border-slate-100 pb-4">Report Configuration</h2>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-navy mb-2">Select Template</label>
            <select className="w-full border border-slate-300 rounded p-3 focus:outline-none focus:border-blue bg-white">
              <option>Daily Operations Log</option>
              <option>Weekly Resolution Summary</option>
              <option>Monthly Performance Report</option>
              <option>Complaint Status Breakdown</option>
              <option>Repair Cost Estimates Summary</option>
            </select>
          </div>
          
          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-navy mb-2">Start Date</label>
              <input type="date" className="w-full border border-slate-300 rounded p-3 focus:outline-none focus:border-blue bg-white" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-navy mb-2">End Date</label>
              <input type="date" className="w-full border border-slate-300 rounded p-3 focus:outline-none focus:border-blue bg-white" />
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-slate-100">
          <h3 className="font-semibold text-navy mb-4">Export Format</h3>
          <div className="flex flex-wrap gap-4">
            <button className="flex-1 flex items-center justify-center gap-2 bg-red/10 text-red border border-red/20 px-6 py-4 rounded hover:bg-red/20 transition-colors font-bold focus-ring">
              <FileText className="w-5 h-5" /> Download PDF
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 bg-emerald-50 text-emerald-700 border border-emerald-200 px-6 py-4 rounded hover:bg-emerald-100 transition-colors font-bold focus-ring">
              <FileSpreadsheet className="w-5 h-5" /> Download Excel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
