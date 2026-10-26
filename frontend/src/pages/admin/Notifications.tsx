import { Megaphone, Send } from 'lucide-react';

export default function Notifications() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-display font-bold text-navy">Notification Center</h1>
        <p className="text-sm text-slate-500 mt-1">Broadcast alerts and operational updates to municipal officers.</p>
      </div>

      <div className="bg-white rounded shadow-sm border border-slate-200 p-6 sm:p-8">
        <div className="flex items-center gap-3 mb-6 bg-blue/5 p-4 rounded border border-blue/20">
          <Megaphone className="w-6 h-6 text-blue" />
          <p className="text-sm text-blue font-semibold">Messages sent here will appear on officer dashboards instantly.</p>
        </div>

        <form className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-navy mb-2">Target Audience</label>
            <select className="w-full border border-slate-300 rounded p-3 focus:outline-none focus:border-blue bg-white">
              <option>All Officers (Statewide Broadcast)</option>
              <option>Central District Only</option>
              <option>South Zone Only</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-navy mb-2">Alert Priority</label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="priority" defaultChecked className="text-blue focus:ring-blue" />
                <span className="text-sm font-medium">Standard Notice</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-red font-semibold">
                <input type="radio" name="priority" className="text-red focus:ring-red" />
                <span>Emergency Alert</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-navy mb-2">Message Content</label>
            <textarea 
              rows={4}
              placeholder="Enter your announcement here..."
              className="w-full border border-slate-300 rounded p-3 focus:outline-none focus:border-blue bg-white resize-none"
            ></textarea>
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end">
            <button type="button" className="bg-blue text-white px-8 py-3 rounded font-bold hover:bg-blue/90 transition-colors focus-ring flex items-center gap-2">
              <Send className="w-4 h-4" /> Broadcast Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
