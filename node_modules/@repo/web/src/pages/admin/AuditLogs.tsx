import { Clock } from 'lucide-react';
import clsx from 'clsx';

const LOGS = [
  { id: 'LOG-0921', time: '10:45 AM, Aug 05', user: 'Super Admin', action: 'Complaint Reassigned', target: 'RD2026101 transferred to Priya Sharma', ip: '192.168.1.45', type: 'warning' },
  { id: 'LOG-0920', time: '10:12 AM, Aug 05', user: 'System AI', action: 'Complaint Assessed', target: 'RD2026105 processed (Confidence: 96%)', ip: 'internal-ml-svc', type: 'info' },
  { id: 'LOG-0919', time: '09:30 AM, Aug 05', user: 'Super Admin', action: 'Officer Created', target: 'OFC-004 (Vikram Reddy) added to DB', ip: '192.168.1.45', type: 'success' },
  { id: 'LOG-0918', time: '09:05 AM, Aug 05', user: 'Super Admin', action: 'Admin Login', target: 'Successful authentication', ip: '192.168.1.45', type: 'info' },
  { id: 'LOG-0917', time: '11:45 PM, Aug 04', user: 'System', action: 'Daily Backup', target: 'PostgreSQL DB backed up to S3', ip: 'internal-cron', type: 'success' },
];

export default function AuditLogs() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl font-display font-bold text-navy">System Audit Logs</h1>
        <p className="text-sm text-slate-500 mt-1">Immutable chronological record of all administrative and automated actions.</p>
      </div>

      <div className="bg-white rounded shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="text-sm font-semibold text-navy">Recent Activity</div>
          <button className="text-sm text-blue font-semibold hover:underline">Download CSV</button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-white border-b border-slate-200 text-slate-500 uppercase tracking-wider text-[11px] font-bold">
              <tr>
                <th className="px-6 py-4">Timestamp</th>
                <th className="px-6 py-4">Actor</th>
                <th className="px-6 py-4">Action</th>
                <th className="px-6 py-4">Target Details</th>
                <th className="px-6 py-4 text-right">IP Address</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {LOGS.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-slate-400" />
                      <span className="font-mono text-slate-600">{log.time}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-semibold text-navy">{log.user}</td>
                  <td className="px-6 py-4">
                    <span className={clsx(
                      "px-2.5 py-1 rounded text-xs font-bold border",
                      log.type === 'success' ? "bg-emerald-50 text-emerald-700 border-emerald-200" :
                      log.type === 'warning' ? "bg-yellow/20 text-navy border-yellow/50" :
                      "bg-blue/10 text-blue border-blue/30"
                    )}>
                      {log.action}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-600 truncate max-w-xs">{log.target}</td>
                  <td className="px-6 py-4 text-right font-mono text-slate-400 text-xs">{log.ip}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
