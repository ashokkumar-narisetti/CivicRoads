import { FileText, Download, FileSpreadsheet } from 'lucide-react';

export default function Reports() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-display font-bold text-navy">Report Generation</h1>
        <p className="text-sm text-slate-500 mt-1">Export structured system data for external analysis and auditing.</p>
      </div>

      <div className="bg-white rounded shadow-sm border border-slate-200 p-6 sm:p-8">
        <h2 className="font-bold text-navy mb-6 text-lg border-b border-slate-100 pb-4">Configure Report</h2>
        
        <div className="space-y-6">
          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-navy mb-2">Report Type</label>
              <select className="w-full border border-slate-300 rounded p-3 focus:outline-none focus:border-blue bg-white">
                <option>Municipality Performance Report</option>
                <option>Statewide Defect Summary</option>
                <option>Officer Resolution Times</option>
                <option>Financial Cost Estimates</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-navy mb-2">Date Range</label>
              <select className="w-full border border-slate-300 rounded p-3 focus:outline-none focus:border-blue bg-white">
                <option>Last 7 Days</option>
                <option>Last 30 Days</option>
                <option>Current Quarter</option>
                <option>Custom Range...</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-navy mb-2">Filter by Municipality (Optional)</label>
            <select className="w-full border border-slate-300 rounded p-3 focus:outline-none focus:border-blue bg-white">
              <option>All Municipalities</option>
              <option>Central District Admin</option>
              <option>South Zone</option>
            </select>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-slate-100">
          <h3 className="font-semibold text-navy mb-4">Export Format</h3>
          <div className="flex flex-wrap gap-4">
            <button className="flex-1 flex items-center justify-center gap-2 bg-red/10 text-red border border-red/20 px-6 py-4 rounded hover:bg-red/20 transition-colors font-bold focus-ring">
              <FileText className="w-5 h-5" /> Export PDF
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 bg-emerald-50 text-emerald-700 border border-emerald-200 px-6 py-4 rounded hover:bg-emerald-100 transition-colors font-bold focus-ring">
              <FileSpreadsheet className="w-5 h-5" /> Export Excel
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 bg-slate-100 text-slate-700 border border-slate-200 px-6 py-4 rounded hover:bg-slate-200 transition-colors font-bold focus-ring">
              <Download className="w-5 h-5" /> Export CSV
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
