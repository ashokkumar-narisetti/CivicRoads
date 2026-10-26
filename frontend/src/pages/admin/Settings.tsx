import { Save } from 'lucide-react';

export default function Settings() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-display font-bold text-navy">System Settings</h1>
        <p className="text-sm text-slate-500 mt-1">Configure global AI parameters and cost estimation thresholds.</p>
      </div>

      <div className="bg-white rounded shadow-sm border border-slate-200 p-6 sm:p-8 space-y-10">
        
        <section>
          <h2 className="font-bold text-navy mb-4 border-b border-slate-100 pb-2">AI Configuration</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-navy mb-2">Minimum Confidence Threshold (%)</label>
              <input type="number" defaultValue={85} className="w-full border border-slate-300 rounded p-3 focus:outline-none focus:border-blue bg-slate-50 font-mono" />
              <p className="text-xs text-slate-500 mt-1">Detections below this are marked for manual review.</p>
            </div>
            <div>
              <label className="block text-sm font-semibold text-navy mb-2">Microservice Endpoint URL</label>
              <input type="text" defaultValue="http://ml-engine:8000/predict" className="w-full border border-slate-300 rounded p-3 focus:outline-none focus:border-blue bg-slate-50 font-mono" />
            </div>
          </div>
        </section>

        <section>
          <h2 className="font-bold text-navy mb-4 border-b border-slate-100 pb-2">Cost Estimation Engine</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-navy mb-2">Base Dispatch Cost (₹)</label>
              <input type="number" defaultValue={1500} className="w-full border border-slate-300 rounded p-3 focus:outline-none focus:border-blue bg-slate-50 font-mono" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-navy mb-2">Cost per Sq. Meter (₹)</label>
              <input type="number" defaultValue={850} className="w-full border border-slate-300 rounded p-3 focus:outline-none focus:border-blue bg-slate-50 font-mono" />
            </div>
          </div>
        </section>

        <div className="pt-6 border-t border-slate-200 flex justify-end">
          <button className="bg-blue text-white px-8 py-3 rounded font-bold hover:bg-blue/90 transition-colors focus-ring flex items-center gap-2">
            <Save className="w-5 h-5" /> Save Configuration
          </button>
        </div>
      </div>
    </div>
  );
}
