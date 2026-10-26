import { Key, ShieldCheck, Camera } from 'lucide-react';

export default function Profile() {
  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div>
        <h1 className="text-2xl font-display font-bold text-navy">Officer Profile</h1>
        <p className="text-sm text-slate-500 mt-1">Manage your professional details and account security.</p>
      </div>

      <div className="bg-white rounded shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-8 border-b border-slate-200 bg-slate-50 flex flex-col sm:flex-row items-center gap-6">
          <div className="relative group cursor-pointer">
            <div className="w-24 h-24 rounded-full bg-blue/10 border-4 border-white flex items-center justify-center text-3xl font-display font-bold text-blue shadow-sm">
              RK
            </div>
            <div className="absolute inset-0 bg-navy/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Camera className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="text-center sm:text-left">
            <h2 className="text-3xl font-display font-bold text-navy">Rajesh Kumar</h2>
            <div className="flex items-center justify-center sm:justify-start gap-1 text-slate-500 mt-1 font-mono text-sm">
              <ShieldCheck className="w-4 h-4 text-blue" /> Field Officer (Central District)
            </div>
          </div>
        </div>

        <div className="p-8 space-y-8">
          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-slate-400 uppercase tracking-wider mb-1">Employee ID</label>
              <div className="font-semibold text-navy text-lg font-mono">OFC-001</div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-400 uppercase tracking-wider mb-1">Assigned Municipality</label>
              <div className="font-semibold text-navy text-lg">Central District Admin</div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-400 uppercase tracking-wider mb-1">Official Email</label>
              <div className="font-semibold text-navy text-lg">rajesh.k@civicroads.gov</div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-400 uppercase tracking-wider mb-1">Phone Number</label>
              <div className="font-semibold text-navy text-lg font-mono">+91 98765 11111</div>
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
                <input type="password" placeholder="••••••••" className="w-full border border-slate-300 rounded p-2 focus:outline-none focus:border-blue bg-white" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-navy mb-1">New Password</label>
                <input type="password" placeholder="••••••••" className="w-full border border-slate-300 rounded p-2 focus:outline-none focus:border-blue bg-white" />
              </div>
              <button type="button" className="bg-navy text-white px-6 py-2 rounded font-bold hover:bg-navy/90 transition-colors focus-ring">
                Update Security
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
