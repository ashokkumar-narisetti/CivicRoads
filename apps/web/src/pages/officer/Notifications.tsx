import { Megaphone, Target, Clock } from 'lucide-react';
import clsx from 'clsx';

const NOTIFICATIONS = [
  { id: 1, type: 'assignment', title: 'New High Priority Complaint Assigned', msg: 'RD2026101 (Deep Pothole) requires immediate engineer assignment.', time: '10 mins ago', read: false },
  { id: 2, type: 'alert', title: 'SLA Deadline Approaching', msg: 'RD2026095 is nearing its 48hr resolution SLA limit.', time: '2 hrs ago', read: false },
  { id: 3, type: 'update', title: 'Engineer Status Update', msg: 'Suresh Kumar updated RD2026088 status to "Repair Completed".', time: '5 hrs ago', read: true },
  { id: 4, type: 'announcement', title: 'Admin Announcement: Heavy Rainfall Alert', msg: 'Expect an influx of waterlogging complaints. Prioritize arterial roads.', time: '1 day ago', read: true },
];

export default function Notifications() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-display font-bold text-navy">Notification Center</h1>
          <p className="text-sm text-slate-500 mt-1">Alerts, assignments, and admin broadcasts.</p>
        </div>
        <button className="text-sm font-semibold text-blue hover:underline">Mark all as read</button>
      </div>

      <div className="bg-white rounded shadow-sm border border-slate-200 overflow-hidden divide-y divide-slate-100">
        {NOTIFICATIONS.map((notif) => (
          <div key={notif.id} className={clsx("p-4 sm:p-6 transition-colors hover:bg-slate-50", !notif.read ? "bg-blue/5" : "bg-white")}>
            <div className="flex gap-4">
              <div className="shrink-0 mt-1">
                {notif.type === 'assignment' && <div className="w-10 h-10 rounded-full bg-blue/10 text-blue flex items-center justify-center"><Target className="w-5 h-5"/></div>}
                {notif.type === 'alert' && <div className="w-10 h-10 rounded-full bg-red/10 text-red flex items-center justify-center"><Clock className="w-5 h-5"/></div>}
                {notif.type === 'update' && <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center"><Clock className="w-5 h-5"/></div>}
                {notif.type === 'announcement' && <div className="w-10 h-10 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center"><Megaphone className="w-5 h-5"/></div>}
              </div>
              <div className="flex-1">
                <div className="flex sm:items-center justify-between flex-col sm:flex-row gap-1">
                  <h3 className={clsx("font-bold", !notif.read ? "text-navy" : "text-slate-700")}>{notif.title}</h3>
                  <span className="text-xs font-mono text-slate-400 shrink-0">{notif.time}</span>
                </div>
                <p className={clsx("text-sm mt-1", !notif.read ? "text-slate-600 font-medium" : "text-slate-500")}>
                  {notif.msg}
                </p>
                {!notif.read && (
                  <button className="mt-3 text-xs font-bold text-blue hover:underline">Review Details →</button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
