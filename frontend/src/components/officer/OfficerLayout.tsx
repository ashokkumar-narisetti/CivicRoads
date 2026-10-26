import { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  PieChart,
  BarChart3,
  Bell,
  Menu,
  X,
  Search,
  ShieldCheck
} from 'lucide-react';
import clsx from 'clsx';

const navItems = [
  { name: 'Dashboard', path: '/officer/dashboard', icon: LayoutDashboard },
  { name: 'Complaints', path: '/officer/complaints', icon: FileText },
  { name: 'Analytics', path: '/officer/analytics', icon: PieChart },
  { name: 'Reports', path: '/officer/reports', icon: BarChart3 },
];

export default function OfficerLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="min-h-screen bg-concrete flex flex-col md:flex-row">
      {/* Mobile Header */}
      <div className="md:hidden bg-navy text-white h-16 flex items-center justify-between px-4 sticky top-0 z-50">
        <div className="font-display font-bold text-lg">Officer Workspace</div>
        <button onClick={() => setSidebarOpen(true)} className="p-2">
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Sidebar Navigation - Light Theme */}
      <aside className={clsx(
        "fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 transition-transform duration-300 ease-in-out md:static md:translate-x-0 flex flex-col",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="h-16 flex items-center justify-between px-6 border-b border-slate-200 shrink-0">
          <div className="font-display font-bold text-xl text-navy flex items-center gap-2">
            <div className="w-6 h-6 bg-blue rounded flex items-center justify-center">
              <div className="w-3 h-0.5 bg-white"></div>
            </div>
            CivicRoads
          </div>
          <button onClick={() => setSidebarOpen(false)} className="md:hidden">
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        <div className="p-4 border-b border-slate-100 bg-slate-50 flex items-center gap-3">
          <ShieldCheck className="w-8 h-8 text-blue" />
          <div>
            <p className="text-sm font-bold text-navy">Central District</p>
            <p className="text-[10px] uppercase font-mono text-slate-500 tracking-wider">Assigned Jurisdiction</p>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4 px-2">Operations</div>
          {navItems.map((item) => {
            const isActive = location.pathname.startsWith(item.path);
            return (
              <Link
                key={item.name}
                to={item.path}
                className={clsx(
                  "flex items-center gap-3 px-3 py-2.5 rounded-md font-medium transition-colors focus-ring outline-none",
                  isActive 
                    ? "bg-blue/10 text-blue font-semibold" 
                    : "text-slate-600 hover:bg-slate-50 hover:text-navy"
                )}
              >
                <item.icon className={clsx("w-5 h-5", isActive ? "text-blue" : "text-slate-400")} />
                {item.name}
              </Link>
            )
          })}
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Topbar Navigation */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 sm:px-6 lg:px-8 shrink-0 z-40">
          <div className="flex-1 flex items-center">
            <div className="relative w-full max-w-md hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search complaints by ID or citizen..." 
                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:border-blue focus:ring-1 focus:ring-blue transition-all"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <Link to="/officer/notifications" className="relative p-2 text-slate-500 hover:text-navy transition-colors focus-ring rounded-full outline-none">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red rounded-full"></span>
            </Link>
            <div className="w-px h-6 bg-slate-200 hidden sm:block"></div>
            <Link to="/officer/profile" className="flex items-center gap-2 focus-ring rounded-md outline-none p-1 hover:bg-slate-50 transition-colors">
              <div className="w-8 h-8 rounded-full bg-blue/10 text-blue flex items-center justify-center font-bold text-sm">
                RK
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-sm font-semibold text-navy leading-none">Rajesh Kumar</p>
                <p className="text-xs text-slate-500 mt-1">Field Officer</p>
              </div>
            </Link>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-navy/50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
}
