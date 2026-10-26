import { Key, ShieldCheck } from 'lucide-react';

export default function Profile() {
  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div>
        <h1 className="text-2xl font-display font-bold text-navy">Administrator Profile</h1>
        <p className="text-sm text-slate-500 mt-1">Manage your account credentials and security.</p>
      </div>

      <div className="bg-white rounded shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-8 border-b border-slate-200 bg-navy text-white flex items-center gap-6">
          <div className="w-24 h-24 rounded-full bg-blue border-4 border-white/20 flex items-center justify-center text-3xl font-display font-bold">
            SA
          </div>
          <div>
            <h2 className="text-3xl font-display font-bold">Super Admin</h2>
            <div className="flex items-center gap-1 text-slate-300 mt-1 font-mono text-sm">
              <ShieldCheck className="w-4 h-4" /> Master Access Level
            </div>
          </div>
        </div>

        <div className="p-8 space-y-6">
          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-slate-500 mb-1">Full Name</label>
              <div className="font-semibold text-navy text-lg">System Administrator</div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-500 mb-1">Official Email</label>
              <div className="font-semibold text-navy text-lg">admin@civicroads.gov</div>
            </div>
          </div>

          <hr className="border-slate-100" />

          <div>
            <h3 className="font-bold text-navy mb-4 flex items-center gap-2">
              <Key className="w-5 h-5 text-blue" /> Change Password
            </h3>
            <form className="space-y-4 max-w-sm">
              <div>
                <label className="block text-sm font-semibold text-navy mb-1">Current Password</label>
                <input type="password" placeholder="••••••••" className="w-full border border-slate-300 rounded p-2 focus:outline-none focus:border-blue bg-slate-50" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-navy mb-1">New Password</label>
                <input type="password" placeholder="••••••••" className="w-full border border-slate-300 rounded p-2 focus:outline-none focus:border-blue bg-slate-50" />
              </div>
              <button type="button" className="bg-blue text-white px-6 py-2 rounded font-bold hover:bg-blue/90 transition-colors focus-ring">
                Update Security
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
